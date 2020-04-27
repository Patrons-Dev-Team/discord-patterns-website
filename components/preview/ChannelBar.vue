<template>
  <v-card class="extended height-for-bar" tile color="#36393f">
    <v-container>
      <v-row no-gutters>
        <v-col id="channel-title">
          <v-icon v-if="channel.type !== 4" dense color="#72767d">
            {{ channelsIcons[channel.type] }}
          </v-icon>
          <span id="channel-name">{{ channel.name }}</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          id="channel-buttons"
          cols="3"
          class="pl-2 d-flex justify-space-between"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn id="bellBtn" icon @click="bellOn = !bellOn" v-on="on">
                <v-icon id="bell" color="#b9bbbe">
                  mdi-bell
                </v-icon>
                <div v-if="!bellOn" id="bellOff"></div>
              </v-btn>
            </template>
            <span>{{ $t('preview.BELL') }}</span>
          </v-tooltip>
          <v-tooltip :disabled="pinOn" bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                bottom
                dot
                offset-x="8"
                offset-y="13"
                color="#f04747"
                bordered
              >
                <v-btn icon @click="pinOn = !pinOn" v-on="on">
                  <v-icon id="pin" :color="pinOn ? '#fff' : '#b9bbbe'">
                    mdi-pin
                  </v-icon>
                </v-btn>
              </v-badge>
            </template>
            <span>{{ $t('preview.PIN') }}</span>
          </v-tooltip>
          <v-card v-if="pinOn" id="pinned" color="#2f3136">
            <v-card-title id="pinned-title" class="px-4 py-2">
              {{ $t('preview.PIN') }}
            </v-card-title>
            <v-card-text id="pinned-text" class="pa-2">
              <discord-messages>
                <discord-message
                  author="D-Patterns"
                  avatar="_nuxt/static/discord-logo.png"
                  role-color="#0099ff"
                >
                  Hey <mention :highlight="true">everyone</mention>
                  ! Don't forget to join our discord server
                  <b>Discord Patterns</b>.
                </discord-message>
              </discord-messages>
            </v-card-text>
          </v-card>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon @click="openMembers" v-on="on">
                <v-icon id="members" :color="membersOn ? '#fff' : '#b9bbbe'">
                  mdi-account-multiple
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('preview.MEMBERS') }}</span>
          </v-tooltip>
          <div
            id="research"
            class="px-1 d-inline-flex justify-space-between align-center"
          >
            <span>{{ $t('preview.RESEARCH') }}</span>
            <v-icon id="magnify" color="#72767d" size="18">mdi-magnify</v-icon>
          </div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon>
                <v-icon id="memtions" color="#b9bbbe" v-on="on">mdi-at</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('preview.AT') }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon>
                <v-icon id="help" color="#b9bbbe" v-on="on">
                  mdi-help-circle
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('preview.HELP') }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'ChannelBar',
  plugins: ['~/plugins/vue-discord-message.js'],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    channel: Object
  },
  data() {
    return {
      bellOn: true,
      pinOn: false,
      membersOn: true,
      channelsIcons: {
        0: 'mdi-pound',
        2: 'mdi-volume-high',
        5: 'mdi-bullhorn'
      }
    }
  },
  methods: {
    openMembers() {
      this.membersOn = !this.membersOn
      this.$emit('open-members', this.membersOn)
    }
  }
}
</script>

<style>
.extended {
  width: 100%;
  height: 100%;
}

.v-menu__content {
  box-shadow: none;
}

.shadow {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.08), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.height-for-bar {
  min-height: 48px;
  height: 48px;
}

#channel-name {
  font-size: 14px;
  font-weight: 500;
}

#pin {
  transform: rotate(+45deg);
}

#research {
  width: 150px;
  background-color: #202225;
  border-radius: 4px;
  color: #72767d;
  font-size: 14px;
}

.theme--dark.v-badge .v-badge__badge::after {
  border-color: #36393f !important;
}

.v-badge--dot .v-badge__badge::after {
  border-width: 1px !important;
}

div.v-tooltip__content {
  max-width: 175px !important;
}

#channel-buttons button {
  height: 24px;
  width: 24px;
}

#channel-buttons button:hover .v-btn__content .v-icon {
  color: #ddd !important;
}

#channel-buttons button::before,
#channel-buttons button .v-ripple__container {
  background-color: unset;
  opacity: 0;
}

div#bellOff {
  position: absolute;
  height: 6px;
  width: 30px;
  background-color: #f04747;
  border: 2px solid #36393f;
  border-radius: 1px;
  transform: rotate(-45deg);
}

#pinned {
  position: absolute;
  top: 45px;
  right: 300px;
  width: 400px;
  z-index: 999;
}

#pinned #pinned-title {
  font-size: 14px;
  background-color: #202225;
  border-radius: 5px 5px 0 0;
}

#pinned #pinned-text {
  border: 1px solid #202225;
}

#pinned #pinned-text .discord-author-avatar {
  display: flex;
  justify-content: center;
}

#pinned #pinned-text .discord-author-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 0;
}
</style>
