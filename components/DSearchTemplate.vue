<template>
  <div>
    <v-text-field :rules="rules" label="Search bar"></v-text-field>
    <v-row>
      <v-chip
        v-for="(tag, index) in tags"
        :key="index"
        close
        outlined
        @click:close="deleteTag(tag)"
      >
        {{ tag.icon + ' ' + tag.content }}
      </v-chip>
    </v-row>
    <v-divider></v-divider>
    <h3>Tags :</h3>
    <v-row>
      <v-chip
        v-for="(tag, index) in tagsToSelect"
        :key="index"
        @click="addToTag(tag)"
      >
        {{ tag.icon + ' ' + tag.content }}
      </v-chip>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DSearchTemplate',
  data: () => ({
    rules: [(value) => (value || '').length <= 20 || 'Max 20 characters'],
    tags: [],
    tagsToSelect: [
      {
        icon: '🕹️',
        content: 'Gaming'
      },
      {
        icon: '👨‍🎓',
        content: 'School'
      },
      {
        icon: '🎲',
        content: 'RP'
      },
      {
        icon: '🎵',
        content: 'Music'
      },
      {
        icon: '🇫🇷',
        content: 'FR'
      },
      {
        icon: '🇬🇧',
        content: 'EN'
      }
    ]
  }),
  methods: {
    addToTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag)
      }
    },
    deleteTag(tag) {
      this.tags = this.tags.filter((t) => t !== tag)
    }
  }
}
</script>
