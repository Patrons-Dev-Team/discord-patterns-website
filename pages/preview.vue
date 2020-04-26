<template>
  <v-card tile xs12>
    <client-only>
      <v-container id="preview-container" class="ma-0 pa-0">
        <v-row id="preview-header" class="ma-0 dcolor-bg-servers">
          <v-col id="preview-title" cols="1" class="pa-0 ml-2">
            <img
              src="~static/d-patterns.png"
              alt="discord-logo-font"
              height="10"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col id="preview-buttons" cols="1"></v-col>
        </v-row>
        <v-row id="preview-body" class="dcolor-bg-servers" no-gutters>
          <v-col id="preview-guilds" cols="2">
            <v-row no-gutters class="extended">
              <v-col id="preview-guilds-list" cols="3">
                <guilds-list />
              </v-col>
              <v-col
                id="preview-guild"
                cols="9"
                class="dcolor-bg-guild tl-rounded"
              >
                <v-row id="preview-guild-bar" no-gutters>
                  <guild-bar />
                </v-row>
                <v-row id="preview-guild-channels mx-0">
                  <guild-channels :template="templates['0']" />
                </v-row>
                <v-row id="preview-member-info"></v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col id="preview-guild-content" cols="8">
            <guild-content />
          </v-col>
          <v-col id="preview-guild-members" cols="2"></v-col>
        </v-row>
      </v-container>
    </client-only>
  </v-card>
</template>

<script>
import GuildBar from '~/components/preview/GuildBar.vue'
import GuildChannels from '~/components/preview/GuildChannels.vue'
import GuildContent from '~/components/preview/GuildContent.vue'
import GuildsList from '~/components/preview/Guilds.vue'
import templatesApi from '~/services/api/templates'

export default {
  components: {
    GuildBar,
    GuildChannels,
    GuildContent,
    GuildsList
  },
  async asyncData() {
    const { templates } = await templatesApi.getAllTemplates('us')
    return {
      templates
    }
  }
}
</script>

<style scoped>
.extended {
  height: 100%;
  width: 100%;
}

.dcolor-bg-servers {
  background-color: #202225;
}

.dcolor-bg-guild {
  background-color: #2f3136;
}

.dcolor-bg-content {
  background-color: #36393f;
}

.dcolor-bg-user {
  background-color: #36393f;
}

.tl-rounded {
  border-top-left-radius: 8px;
}

.separator {
  height: 2px;
  width: 45%;
  background-color: #2d2f32;
  border-radius: 1px;
}
</style>
