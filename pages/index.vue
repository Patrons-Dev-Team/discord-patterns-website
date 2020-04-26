<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12">
      <div class="my-7">
        <h3 class="display-2">{{ $t('listing.index.TITLE') }}</h3>
        <p>{{ $t('listing.index.DESCRIPTION') }}</p>
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
          <div>
            <v-chip
              v-for="(icon, id) in tags"
              :key="id"
              outlined
              class="mr-2 my-2"
              nuxt
              :to="localePath({ name: 'browse', query: { tags: [id] } })"
            >
              <v-icon left>{{ icon }}</v-icon>
              {{ $t(`listing.tags.${id}`) }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-btn id="sort-btn" class="grey--text" text rounded>
        <v-icon left>mdi-clock</v-icon
        >{{ $t('listing.sort.MOST_RECENT') }}</v-btn
      >
      <v-menu bottom offset-y activator="#sort-btn">
        <v-list dense rounded>
          <v-list-item
            v-for="sortItem in sortItems"
            :key="sortItem.title"
            nuxt
            :to="localePath(sortItem.link)"
          >
            <v-list-item-icon>
              <v-icon>{{ sortItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ sortItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-row v-resize="onResize">
        <v-col
          v-for="template in dTemplates"
          :key="template.id"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <d-card-template :template="template"></d-card-template>
        </v-col>
      </v-row>
      <v-btn
        nuxt
        :to="localePath('browse')"
        block
        x-large
        color="primary"
        class="mt-2"
      >
        <v-icon left large class="mr-3">mdi-compass</v-icon
        >{{ $t('listing.BROWSE_ALL') }}</v-btn
      >
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
export default {
  components: {
    DCardTemplate
  },
  async asyncData() {
    const templates = await templatesApi.getLatestTemplates('us')
    return {
      templates,
      dTemplates: [...templates]
    }
  },
  data() {
    return {
      tags,
      search: ''
    }
  },
  computed: {
    sortItems() {
      return [
        {
          title: this.$t('listing.sort.ALPHABETICAL'),
          icon: 'mdi-sort-alphabetical-descending-variant',
          link: {
            name: 'browse',
            query: {
              sort: 'alphabetical'
            }
          }
        },
        {
          title: this.$t('listing.sort.MOST_RECENT'),
          icon: 'mdi-clock',
          link: {
            name: 'browse',
            query: {
              sort: 'most-recent'
            }
          }
        },
        {
          title: this.$t('listing.sort.MOST_POPULAR'),
          icon: 'mdi-star',
          link: {
            name: 'browse',
            query: {
              sort: 'most-popular'
            }
          }
        }
      ]
    }
  },
  mounted() {
    this.onResize()
  },
  methods: {
    onResize() {
      if (window.innerWidth > 1904) {
        this.dTemplates = this.templates.slice(0, 8)
      } else {
        this.dTemplates = this.templates
      }
    },
    performSearch() {
      this.$router.push(
        this.localePath({
          name: 'browse',
          query: { q: this.search, tags: [1, 2, 3] }
        })
      )
    }
  }
}
</script>
