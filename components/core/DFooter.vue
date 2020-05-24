<template>
  <div>
    <v-footer app absolute padless>
      <v-container class="pt-3 px-7 pb-0">
        <v-row>
          <v-col cols="12" lg="6">
            <h3>{{ appTitle }}</h3>
            <p>
              {{ $t('footer.DESCRIPTION') }}
            </p>
          </v-col>
          <v-col lg="4" offset-lg="1" cols="6">
            <h3>{{ $t('footer.TITLE_LINKS') }}</h3>
            <ul>
              <li>
                <nuxt-link to="#" class="footerLink--text">{{
                  $t('footer.ABOUT_LINK')
                }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="#" class="footerLink--text">{{
                  $t('footer.TEAM_LINK')
                }}</nuxt-link>
              </li>
              <li>
                <a
                  class="footerLink--text"
                  rel="noopener"
                  href="https://gitlab.com/patrons-dev-team/discord-patterns-website"
                  >{{ $t('footer.GITLAB_LINK') }}</a
                >
              </li>
              <li>
                <a
                  class="success--text"
                  rel="noopener"
                  href="https://discord.gg/MFMXamv"
                  >Discord</a
                >
              </li>
            </ul>
          </v-col>
          <v-col lg="1" cols="6">
            <LocaleChanger v-bind="localeChangerProps"
          /></v-col>
        </v-row>
      </v-container>
      <v-container class="caption py-3 px-7">
        <v-divider></v-divider>

        <div class="d-flex pt-2 flex-sm-row flex-column">
          <span
            >v{{ version }}, {{ commitHash.substring(0, 7) }} ({{ branch }})
          </span>
          <span>
            <span class="hidden-sm-and-down">&nbsp;- </span>
            {{ $t('footer.MADE_WITH') }}
            <v-icon small class="red--text">mdi-cards-heart</v-icon>, Copyright
            2020 Patrons Dev Team
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
  props: {
    localeChangerProps: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
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
