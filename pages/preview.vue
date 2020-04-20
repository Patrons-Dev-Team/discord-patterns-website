<template>
  <v-layout>
    <v-flex xs-none md2>
      <preview-guild />
    </v-flex>
    <v-flex xs12 md8>
      <preview-content />
    </v-flex>
    <v-flex xs-none md2>
      <preview-members />
    </v-flex>
  </v-layout>
</template>

<script>
import PreviewContent from '~/components/preview/Content.vue'
import PreviewGuild from '~/components/preview/Guild.vue'
import PreviewMembers from '~/components/preview/Members.vue'

export default {
  components: {
    PreviewContent,
    PreviewGuild,
    PreviewMembers
  }
}
</script>
