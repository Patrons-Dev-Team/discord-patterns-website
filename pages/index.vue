<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12">
      <div class="my-7">
        <h3 class="display-2">{{ $t('listing.index.TITLE') }}</h3>
        <p>{{ $t('listing.index.DESCRIPTION') }}</p>
      </div>
      <d-search-template class="my-10"></d-search-template>
      <v-btn id="sort-btn" class="grey--text" text rounded>
        <v-icon left>mdi-clock</v-icon
        >{{ $t('listing.sort.MOST_RECENT') }}</v-btn
      >
      <v-menu bottom offset-y activator="#sort-btn">
        <v-list dense rounded>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-sort-alphabetical-descending-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('listing.sort.ALPHABETICAL')
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('listing.sort.MOST_RECENT')
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('listing.sort.MOST_POPULAR')
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-row v-resize="onResize">
        <v-col
          v-for="template in dTemplates"
          :key="template.dprops.code"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <d-card-template :template="template"></d-card-template>
        </v-col>
      </v-row>
      <v-btn block x-large color="primary" class="mt-2">
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
import DSearchTemplate from '~/components/DSearchTemplate'
import templatesApi from '~/services/api/templates'
export default {
  components: {
    DCardTemplate,
    DSearchTemplate
  },
  async asyncData() {
    const { templates } = await templatesApi.getAllTemplates('us')
    for (let i = 0; i < 9; i++) {
      templates[String(i)] = templates['0']
    }
    return {
      templates: Object.values(templates),
      dTemplates: Object.values(templates)
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
    }
  }
}
</script>
