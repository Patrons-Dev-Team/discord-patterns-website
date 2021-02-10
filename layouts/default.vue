<template>
  <v-app dark>
    <navbar />
    <v-main>
      <parallax-header />
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <d-footer class="mt-10" />
  </v-app>
</template>

<script>
import Navbar from '~/components/core/Navbar.vue'
import DFooter from '~/components/core/DFooter.vue'
import ParallaxHeader from '~/components/HeaderParallax.vue'

export default {
  components: {
    Navbar,
    DFooter,
    ParallaxHeader,
  },
}
</script>
