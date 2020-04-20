<template>
  <v-card
    class="nav-fixed d-flex justify-lg-space-around justify-space-between"
    tile
    dark
  >
    <v-card-title>
      <nuxt-link to="/" class="reset-css white--text">
        Discord Patterns
      </nuxt-link>
    </v-card-title>
    <v-card-actions>
      <v-btn to="/preview" nuxt text>{{ $t('header.PREVIEW') }}</v-btn>
      <v-btn to="/browse?recent" nuxt text>{{ $t('header.BROWSE') }}</v-btn>
      <v-btn to="/browse?popular" nuxt text>{{ $t('header.POPULAR') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      appTitle: 'Discord Patterns'
    }
  }
}
</script>

<style scoped>
.reset-css {
  text-decoration: none;
}

.nav-fixed {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
