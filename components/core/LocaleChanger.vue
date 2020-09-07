<template>
  <v-menu auto top offset-y>
    <template v-slot:activator="{ on }">
      <v-btn class="btnLocaleActivation" text v-on="on">
        <v-icon>mdi-earth</v-icon>
        &nbsp;{{ displayLocale }}
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="getLocalSwitchPath(locale.code)"
      >
        <v-list-item-icon dense>
          <div class="d-flex justify-center align-center">
            <country-flag size="small" class="v-icon" :country="locale.code" />
          </div>
        </v-list-item-icon>
        <v-list-item-title class="body-1">{{
          locale.code.toUpperCase()
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'LocaleChanger',
  components: {
    CountryFlag,
  },
  props: {
    fallbackToIndex: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    displayLocale() {
      return this.$i18n.locale
    },
  },
  methods: {
    getLocalSwitchPath(code) {
      return this.fallbackToIndex
        ? this.localePath('index', code)
        : this.switchLocalePath(code)
    },
  },
}
</script>
