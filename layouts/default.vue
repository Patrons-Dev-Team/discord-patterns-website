<template>
  <v-app dark>
    <navbar />
    <v-content>
      <parallax-header />
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <d-footer />
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
    ParallaxHeader
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
