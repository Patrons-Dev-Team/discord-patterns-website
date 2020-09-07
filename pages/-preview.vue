<template>
  <v-card id="preview-card" tile xs12>
    <client-only>
      <v-container id="preview-container" class="ma-0 pa-0 extended">
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
                  <guild-channels
                    v:bind:current-selection
                    :template="templates['0']"
                    @select-channel="receiveChannel"
                  />
                </v-row>
                <v-row id="preview-member-info"></v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col id="preview-guild-content">
            <v-row id="preview-channel-bar" no-gutters>
              <channel-bar
                :channel="
                  templates[0].dprops.serialized_source_guild.channels[
                    channel - 1
                  ]
                "
                @open-members="openRightPannel"
              />
            </v-row>
            <v-row id="preview-channel-content mx-0" no-gutters>
              <v-col>
                <guild-content />
              </v-col>
              <v-col
                v-if="membersOn"
                id="preview-guild-members"
                cols="2"
                class="dcolor-bg-user"
              >
                <guild-members
                  :roles="
                    templates[0].dprops.serialized_source_guild.roles
                      .filter((role) => role.id !== 0)
                      .reverse()
                  "
                />
              </v-col>
            </v-row>
            <v-row id="preview-channel-input"></v-row>
          </v-col>
        </v-row>
      </v-container>
    </client-only>
  </v-card>
</template>

<script>
import ChannelBar from '~/components/preview/ChannelBar.vue'
import GuildBar from '~/components/preview/GuildBar.vue'
import GuildChannels from '~/components/preview/GuildChannels.vue'
import GuildContent from '~/components/preview/GuildContent.vue'
import GuildMembers from '~/components/preview/GuildMembers.vue'
import GuildsList from '~/components/preview/Guilds.vue'

export default {
  components: {
    ChannelBar,
    GuildBar,
    GuildChannels,
    GuildContent,
    GuildMembers,
    GuildsList,
  },
  async asyncData({ app: { $templatesApi } }) {
    const templates = await $templatesApi.getLatestTemplates('us')
    return {
      templates,
      dTemplates: [...templates],
    }
  },
  data() {
    return {
      channel: 1,
      membersOn: true,
    }
  },
  methods: {
    receiveChannel(ch) {
      if (
        this.templates[0].dprops.serialized_source_guild.channels[ch - 1]
          .type === 0
      ) {
        this.channel = ch
      }
    },
    openRightPannel(membersOn) {
      this.membersOn = membersOn
    },
  },
}
</script>

<style>
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
  background-color: #2f3136;
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

#preview-card {
  height: 800px;
}
</style>
