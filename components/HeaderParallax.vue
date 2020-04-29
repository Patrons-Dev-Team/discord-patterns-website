<template>
  <v-parallax
    class="blue-grey darken-4"
    :height="height"
    src="parallax_background.png"
  >
    <v-row justify="space-around" align="center">
      <div>
        <h1 class="display-1">{{ appTitle }}</h1>
        <p>{{ $t('parallax.CONTENT') }}</p>
      </div>
      <div>
        <v-btn href="https://discord.gg/MFMXamv" target="_blank" outlined>{{
          $t('parallax.JOIN')
        }}</v-btn>
      </div>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '300'
    }
  },
  data() {
    return {
      appTitle: process.env.APP_TITLE
    }
  }
}
</script>
