<template>
  <v-menu top offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="btnLocaleActivation" text v-on="on">
        <v-icon>mdi-earth</v-icon>
        &nbsp;{{ displayLocale }}
      </v-btn>
    </template>
    <v-list dense max-width="82">
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        :href="switchLocalePath(locale.code)"
        class="px-1"
      >
        <v-layout>
          <v-flex>
            <country-flag
              :country="locale.iso.split('-')[1]"
              size="small"
              rounded
            />
          </v-flex>
          <v-flex>{{ locale.iso.split('-')[1].toUpperCase() }}</v-flex>
        </v-layout>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'LocaleChanger',
  components: {
    CountryFlag
  },
  data() {
    return {}
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    displayLocale() {
      return this.$i18n.locale
    }
  }
}
</script>
