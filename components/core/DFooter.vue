<template>
  <div>
    <v-footer app absolute padless>
      <v-container fluid class="py-4 px-7">
        <v-row>
          <v-col cols="12" lg="6">
            <h2>{{ appTitle }}</h2>
            <p>
              {{ $t('footer.DESCRIPTION') }}
            </p>
          </v-col>
          <v-col lg="4" offset-lg="1" cols="6">
            <h2>{{ $t('footer.TITLE_LINKS') }}</h2>
            <ul>
              <li>
                <nuxt-link to="#">{{ $t('footer.ABOUT_LINK') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="#">{{ $t('footer.TEAM_LINK') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="#">{{ $t('footer.GITLAB_LINK') }}</nuxt-link>
              </li>
            </ul>
          </v-col>
          <v-col lg="1" cols="6"> <LocaleChanger /></v-col>
        </v-row>
      </v-container>
      <v-container class="primary py-4 px-7" fluid background-color="secondary">
        <div class="d-flex flex-sm-row flex-column">
          <span
            >v{{ version }}, {{ commitHash.substring(0, 7) }} ({{ branch }}) -
          </span>
          <span>
            &nbsp;{{ $t('footer.MADE_WITH') }}
            <v-icon small class="red--text">mdi-cards-heart</v-icon>
            &nbsp;{{ $t('footer.BY') }} Patrons Dev Team
          </span>
        </div>
      </v-container>
    </v-footer>
  </div>
</template>
<script>
import LocaleChanger from '~/components/core/LocaleChanger'
export default {
  components: { LocaleChanger },
  data() {
    return {
      version: process.env.VERSION,
      commitHash: process.env.COMMITHASH,
      branch: process.env.BRANCH,
      appTitle: process.env.APP_TITLE
    }
  }
}
</script>
