<template>
  <v-row>
    <v-col cols="12" md="6" class="py-0 my-0">
      <v-text-field
        rounded
        outlined
        :label="$t('listing.SEARCH')"
        append-icon="mdi-magnify"
        single-line
        clearable
        clear-icon="mdi-close"
        hide-details
        autofocus
        dense
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="py-0 my-0">
      <v-chip-group column multiple :model="selectedTag">
        <v-chip v-for="(tag, index) in tags" :key="index" outlined filter>
          <v-icon left>{{ tag.icon }}</v-icon>
          {{ tag.content }}
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DSearchTemplate',
  data: () => ({
    tags: [
      {
        icon: 'mdi-youtube-gaming',
        content: 'Gaming'
      },
      {
        icon: 'mdi-school',
        content: 'School'
      },
      {
        icon: 'mdi-dice-6',
        content: 'RP'
      },
      {
        icon: 'mdi-music',
        content: 'Music'
      },
      {
        icon: 'mdi-flag',
        content: 'FR'
      },
      {
        icon: 'mdi-flag',
        content: 'EN'
      },
      {
        icon: 'mdi-fire',
        content: 'Explore tags'
      }
    ],
    selectedTag: []
  }),
  methods: {}
}
</script>
