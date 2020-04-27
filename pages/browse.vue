<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12">
      <div class="my-7">
        <h3 class="display-2">{{ $t('listing.browse.TITLE') }}</h3>
        <p>{{ $t('listing.browse.DESCRIPTION') }}</p>
      </div>
      <v-row class="my-10">
        <v-col cols="12" md="6" class="py-0 my-0">
          <v-text-field
            v-model="search"
            rounded
            outlined
            :label="$t('listing.SEARCH')"
            append-icon="mdi-magnify"
            single-line
            clearable
            clear-icon="mdi-close"
            hide-details
            autofocus
            dense
            @click:append="performSearch"
            @keydown.enter="performSearch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0 my-0">
          <v-chip-group
            v-model="selectedTags"
            multiple
            column
            @change="changeTags"
          >
            <v-chip v-for="(icon, id) in tags" :key="id" outlined filter nuxt>
              <v-icon left>{{ icon }}</v-icon>
              {{ $t(`listing.tags.${id}`) }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-data-iterator
        :loading="$fetchState.pending"
        :page.sync="options.page"
        :items="templates"
        :items-per-page="options.itemsPerPage"
        :no-data-text="$t('dataTable.NO_DATA')"
        :no-results-text="$t('dataTable.NO_RESULTS')"
        :loading-text="$t('dataTable.LOADING')"
      >
        <template v-slot:header="">
          <v-row>
            <v-select
              v-model="options.sortBy"
              dense
              rounded
              :items="sortItems"
              :prepend-icon="sortSelectedIcon"
              class="ml-4"
              @change="changeSort"
            >
              <template v-slot:item="{ item, on, attrs }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="options.sortDesc"
              mandatory
              @change="performSearch"
            >
              <v-btn depressed outlined :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn depressed outlined :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-row>
        </template>
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="template in props.items"
              :key="template.id"
              cols="12"
              sm="6"
              lg="4"
              xl="3"
            >
              <d-card-template :template="template"></d-card-template>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-col>
    <v-col cols="12" class="mt-10">
      <v-card outlined>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://discord.fr/user/themes/discordfr/images/logo/500.png"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <div class="overline">{{ $t('partners.TITLE') }}</div>
              <v-list-item-title>Discord.fr</v-list-item-title>
              <v-list-item-subtitle
                >Rejoignez discord.fr, la plus grosse communauté
                française</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-open-in-new</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DCardTemplate from '~/components/DCardTemplate'
import templatesApi from '~/services/api/templates'
import tags from '~/data/tags'
import { getDefaultBrowseOrder, validateBrowseQuery } from '~/utils/utils'
export default {
  components: {
    DCardTemplate
  },
  async fetch() {
    const res = await templatesApi.search(
      'us',
      this.search,
      this.selectedTags.map(String),
      {
        itemsPerPage: 300
      }
    )
    this.templates = res.result
  },
  asyncData({ query }) {
    return {
      selectedTags: (query.tags ? [...query.tags] : []).map(Number),
      search: query.q || '',
      options: {
        sortBy: query.sort || 'most-recent',
        sortDesc: !!Number(
          typeof query.order !== 'undefined'
            ? query.order
            : getDefaultBrowseOrder(query.sort || 'most-recent')
        ),
        itemsPerPage: 9,
        page: Number(typeof query.page !== 'undefined' ? query.page : 0)
      }
    }
  },
  validate({ query }) {
    return validateBrowseQuery(query)
  },
  data() {
    return {
      tags,
      templates: [],
      selectedTags: [],
      options: {
        page: 0,
        sortBy: 'most-recent',
        sortDesc: true
      },
      search: '',
      sortSelectedIcon: 'mdi-clock',
      timeout: null
    }
  },
  computed: {
    sortItems() {
      return [
        {
          text: this.$t('listing.sort.ALPHABETICAL'),
          icon: 'mdi-sort-alphabetical-descending-variant',
          value: 'alphabetical'
        },
        {
          text: this.$t('listing.sort.MOST_RECENT'),
          icon: 'mdi-clock',
          value: 'most-recent'
        },
        {
          text: this.$t('listing.sort.MOST_POPULAR'),
          icon: 'mdi-star',
          value: 'most-popular'
        }
      ]
    }
  },
  watch: {
    '$route.query': '$fetch',
    'options.page'() {
      // eslint-disable-next-line no-console
      console.log(this.page)
      this.performSearch()
    }
  },
  watchQuery: ['q', 'tags', 'sort', 'order'],
  methods: {
    performSearch() {
      this.$router
        .replace(
          this.localePath({
            name: 'browse',
            query: {
              q: this.search,
              tags: this.selectedTags,
              sort: this.options.sortBy,
              order: Number(this.options.sortDesc),
              page: this.options.page
            }
          })
        )
        .catch(() => {
          this.$fetch()
        })
    },
    changeSort() {
      this.sortSelectedIcon = this.sortItems.filter(
        (item) => item.value === this.options.sortBy
      )[0].icon
      this.performSearch()
    },
    changeTags() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.performSearch()
      }, 700)
    }
  }
}
</script>
