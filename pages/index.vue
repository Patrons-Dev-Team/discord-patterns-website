<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on: menu }">
          <v-tooltip open-delay="1000" top>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                class="grey--text"
                text
                rounded
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon left>mdi-clock</v-icon
                >{{ $t('listing.sort.MOST_RECENT') }}</v-btn
              >
            </template>
            <span>{{ $t('listing.SORT_BY_TOOLTIP') }}</span>
          </v-tooltip>
        </template>
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
      <v-row>
        <v-col
          v-for="template in templates"
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
        <v-icon left dark large class="mr-3">mdi-compass</v-icon
        >{{ $t('listing.BROWSE_ALL') }}</v-btn
      >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a href="https://vuetifyjs.com" target="_blank"> documentation </a>.
          </p>
          <p>
            If you have questions, please join the official
            <a href="https://chat.vuetifyjs.com/" target="_blank" title="chat">
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a href="https://nuxtjs.org/" target="_blank">
            Nuxt Documentation
          </a>
          <br />
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import DCardTemplate from '~/components/DCardTemplate'
import templatesApi from '~/services/api/templates'
export default {
  components: {
    Logo,
    VuetifyLogo,
    DCardTemplate
  },
  async asyncData() {
    const { templates } = await templatesApi.getAllTemplates('us')
    for (let i = 0; i < 9; i++) {
      templates[String(i)] = templates['0']
    }
    return {
      templates: Object.values(templates)
    }
  }
}
</script>
