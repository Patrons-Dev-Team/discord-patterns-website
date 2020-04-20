<template>
  <v-menu top offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="btnLocaleActivation" text v-on="on">
        <v-icon>mdi-earth</v-icon>
        &nbsp;{{ displayLocale }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        <v-list-item-icon>
          <div>
            <country-flag class="v-icon" :country="locale.code" size="medium" />
          </div>
        </v-list-item-icon>
        <v-list-item-title>{{ locale.code.toUpperCase() }}</v-list-item-title>
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
