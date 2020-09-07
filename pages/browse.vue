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
            dense
            @click:append="performSearch"
            @keydown.enter="performSearch"
            @click:clear="clearSearch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0 my-0">
          <v-chip-group
            v-model="selectedTags"
            multiple
            column
            @change="changeTags"
          >
            <v-chip v-for="id in order" :key="id" outlined filter nuxt>
              <v-icon left>{{ tags[id] }}</v-icon>
              {{ $t(`listing.tags.${id}`) }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
      <v-data-iterator
        :footer-props="footerProps"
        :loading="$fetchState.pending"
        :page.sync="options.page"
        :items="templates"
        :locale="
          $i18n.locales.find((locale) => locale.code === $i18n.locale).iso
        "
        :items-per-page.sync="options.itemsPerPage"
        :no-data-text="$t('dataTable.NO_DATA')"
        :no-results-text="$t('dataTable.NO_RESULTS')"
        :loading-text="$t('dataTable.LOADING')"
      >
        <template v-slot:header="">
          <v-row no-gutters>
            <v-select
              v-model="options.sortBy"
              dense
              rounded
              :items="sortItems"
              :prepend-icon="sortSelectedIcon"
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
              <v-lazy min-height="195">
                <d-card-template :template="template"></d-card-template
              ></v-lazy>
            </v-col>
            <v-col
              class="hidden-sm-only hidden-md-only hidden-xl-only hidden-xs-only"
              cols="12"
              sm="6"
              lg="4"
              xl="3"
            >
              <d-partners></d-partners>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-col>
    <v-col cols="12" class="hidden-lg-only mt-10">
      <d-partners></d-partners>
    </v-col>
  </v-row>
</template>

<script>
import DPartners from '~/components/DPartners'
import DCardTemplate from '~/components/DCardTemplate'
import { tags, order } from '~/data/tags'
import { getDefaultBrowseOrder, validateBrowseQuery } from '~/utils/utils'
export default {
  components: {
    DCardTemplate,
    DPartners,
  },
  async fetch() {
    const res = await this.$templatesApi.search(
      this.$i18n.locale,
      this.search,
      this.selectedTagsIds,
      {
        itemsPerPage: 300,
        sortDesc: this.options.sortDesc,
        sortBy: this.options.sortBy,
      }
    )
    this.templates = res.result
    this.updateSortIcon()
  },
  asyncData({ query }) {
    return {
      selectedTags: (query.tags ? [...query.tags] : []).map((num) =>
        Number(order.indexOf(num))
      ),
      search: query.q || '',
      options: {
        sortBy: query.sort || 'most-recent',
        sortDesc: !!Number(
          typeof query.order !== 'undefined'
            ? query.order
            : getDefaultBrowseOrder(query.sort || 'most-recent')
        ),
        itemsPerPage: Number(
          typeof query.items !== 'undefined' ? query.items : 8
        ),
        page: Number(typeof query.page !== 'undefined' ? query.page : 1),
      },
    }
  },
  validate({ query }) {
    return validateBrowseQuery(query)
  },
  data() {
    return {
      tags,
      order,
      templates: [],
      selectedTags: [],
      options: {
        page: 1,
        sortBy: 'most-recent',
        sortDesc: true,
      },
      search: '',
      sortSelectedIcon: 'mdi-clock',
      timeout: null,
    }
  },
  computed: {
    sortItems() {
      return [
        {
          text: this.$t('listing.sort.ALPHABETICAL'),
          icon: 'mdi-sort-alphabetical-descending-variant',
          value: 'alphabetical',
        },
        {
          text: this.$t('listing.sort.MOST_RECENT'),
          icon: 'mdi-clock',
          value: 'most-recent',
        },
        {
          text: this.$t('listing.sort.MOST_POPULAR'),
          icon: 'mdi-star',
          value: 'most-popular',
        },
      ]
    },
    footerProps() {
      return {
        'items-per-page-options': [8, 20],
        'page-text': this.$t('dataTable.PAGE_TEXT'),
        'items-per-page-text': this.$t('dataTable.ITEMS_PER_PAGE_TEXT'),
        'items-per-page-all-text': this.$t('dataTable.ITEMS_PER_PAGE_ALL_TEXT'),
      }
    },
    selectedTagsIds() {
      return this.selectedTags.map((num) => order[num])
    },
  },
  watchQuery: ['q', 'tags', 'sort', 'order'],
  watch: {
    ...['$route.query.q', '$route.query.sort', '$route.query.order'].reduce(
      (watchers, key) => ({
        ...watchers,
        [key]() {
          this.$fetch()
        },
      }),
      {}
    ),
    '$route.query.tags'(newVal, oldVal) {
      if (String(newVal) !== String(oldVal)) {
        this.selectedTags = (this.$route.query.tags
          ? [...this.$route.query.tags]
          : []
        ).map((num) => Number(order.indexOf(num)))
        this.performSearch()
      }
    },
    'options.page'() {
      this.$router
        .replace(
          this.localePath({
            name: 'browse',
            query: {
              ...this.$route.query,
              page: this.options.page,
            },
          })
        )
        .catch(() => {})
    },
    'options.itemsPerPage'() {
      this.$router
        .replace(
          this.localePath({
            name: 'browse',
            query: {
              ...this.$route.query,
              page: 1,
              items: this.options.itemsPerPage,
            },
          })
        )
        .catch(() => {})
    },
  },
  mounted() {
    this.updateSortIcon()
  },
  methods: {
    clearSearch() {
      this.search = ''
      this.$nextTick(() => this.performSearch())
    },
    performSearch() {
      return this.$router
        .replace(
          this.localePath({
            name: 'browse',
            query: {
              q: this.search,
              tags: this.selectedTagsIds,
              sort: this.options.sortBy,
              order: Number(this.options.sortDesc),
              page: 1,
              items: this.options.itemsPerPage,
            },
          })
        )
        .catch(() => {
          this.$fetch()
        })
    },
    updateSortIcon() {
      this.sortSelectedIcon = this.sortItems.filter(
        (item) => item.value === this.options.sortBy
      )[0].icon
    },
    changeSort() {
      this.updateSortIcon()
      this.performSearch()
    },
    changeTags() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.performSearch()
      }, 1000)
    },
  },
  head() {
    return {
      title: this.$t('listing.TITLE'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('listing.DESCRIPTION'),
        },
      ],
    }
  },
}
</script>
