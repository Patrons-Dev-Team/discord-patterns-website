<template>
  <v-card>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          <span style="white-space: normal"> {{ template.title }} </span>
        </v-list-item-title>
        <v-list-item-subtitle>{{ template.description }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar size="140" class="display-1 accent text-center"
        ><v-img :src="template.pfpSrc"></v-img>
      </v-list-item-avatar>
    </v-list-item>
    <div class="px-2 pb-4">
      <v-chip
        v-for="tag in template.tags"
        :key="tag.id"
        active-class="no-active"
        small
        :href="tag.link"
        outlined
        class="ma-1"
      >
        {{ tag.text }}</v-chip
      >
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    template: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this._uid,
    }
  },
}
</script>
<style scoped>
.v-chip--active.no-active::before {
  opacity: 0 !important;
}
</style>
