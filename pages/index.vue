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
            dense
            @click:append="performSearch"
            @keydown.enter="performSearch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="py-0 my-0">
          <div>
            <v-chip
              v-for="id in order"
              :key="id"
              outlined
              class="mr-2 my-2"
              nuxt
              :to="localePath({ name: 'browse', query: { tags: [id] } })"
            >
              <v-icon left>{{ tags[id] }}</v-icon>
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
      <v-row>
        <v-col
          v-for="template in dTemplates"
          :key="template.id"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <v-lazy min-height="195">
            <d-card-template :template="template"></d-card-template>
          </v-lazy>
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
      <d-partners></d-partners>
    </v-col>
  </v-row>
</template>

<script>
import DPartners from '~/components/DPartners'
import DCardTemplate from '~/components/DCardTemplate'
import { tags, order } from '~/data/tags'
export default {
  components: {
    DCardTemplate,
    DPartners,
  },
  async asyncData({
    payload,
    getPayload,
    route: { path },
    app: { $templatesApi, router, i18n },
  }) {
    const templates =
      payload ||
      (await getPayload(router.options.base + path)) ||
      (await $templatesApi.getLatestTemplates(i18n.locale))
    return {
      templates,
      dTemplates: templates,
    }
  },
  data() {
    return {
      tags,
      order,
      search: '',
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
              sort: 'alphabetical',
            },
          },
        },
        {
          title: this.$t('listing.sort.MOST_RECENT'),
          icon: 'mdi-clock',
          link: {
            name: 'browse',
            query: {
              sort: 'most-recent',
            },
          },
        },
        {
          title: this.$t('listing.sort.MOST_POPULAR'),
          icon: 'mdi-star',
          link: {
            name: 'browse',
            query: {
              sort: 'most-popular',
            },
          },
        },
      ]
    },
  },
  watch: {
    '$vuetify.breakpoint.smOnly'() {
      if (this.$vuetify.breakpoint.smOnly) {
        this.dTemplates = this.templates.slice(0, 8)
      }
    },
    '$vuetify.breakpoint.mdOnly'() {
      if (this.$vuetify.breakpoint.mdOnly) {
        this.dTemplates = this.templates.slice(0, 8)
      }
    },
    '$vuetify.breakpoint.xlOnly'() {
      if (this.$vuetify.breakpoint.xlOnly) {
        this.dTemplates = this.templates.slice(0, 8)
      }
    },
    '$vuetify.breakpoint.lgOnly'() {
      if (this.$vuetify.breakpoint.lgOnly) {
        this.dTemplates = this.templates
      }
    },
    '$vuetify.breakpoint.xsOnly'() {
      if (this.$vuetify.breakpoint.xsOnly) {
        this.dTemplates = this.templates
      }
    },
  },
  beforeMount() {
    this.setItems()
  },
  methods: {
    setItems() {
      if (
        this.$vuetify.breakpoint.smOnly ||
        this.$vuetify.breakpoint.mdOnly ||
        this.$vuetify.breakpoint.xlOnly
      ) {
        this.dTemplates = this.templates.slice(0, 8)
      }
    },
    performSearch() {
      this.$router.push(
        this.localePath({
          name: 'browse',
          query: { q: this.search },
        })
      )
    },
  },
  head() {
    return {
      title: this.$t('index.TITLE'),
      titleTemplate: process.env.APP_TITLE + ' - %s',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('index.DESCRIPTION'),
        },
      ],
    }
  },
}
</script>
