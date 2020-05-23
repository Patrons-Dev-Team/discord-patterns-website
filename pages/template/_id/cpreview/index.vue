<template>
  <div class="pa-10">
    <v-row>
      <v-col cols="12">
        <v-img
          width="200px"
          :transition="false"
          :src="$router.options.base + 'd-patterns.png'"
        ></v-img>
      </v-col>
      <v-list-item two-line>
        <v-list-item-avatar size="100" class="display-1 accent text-center "
          ><v-img
            :src="emojiSrc"
            :transition="false"
            contain
            height="72"
            :alt="templateData.emoji"
            @load="loaded"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="display-2 mb-1">
            <span style="white-space: normal;">
              {{ templateData.title }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              v-for="tag in tags"
              :key="tag.id"
              outlined
              class="mt-1 mr-1"
            >
              <v-icon left>{{ tag.icon }}</v-icon
              >{{ $t(`listing.tags.${tag.id}`) }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <v-row>
      <v-col cols="6">
        <h4 class="display-1">Channels</h4>
        <v-sheet
          color="#121212"
          class="shadowed pa-1 overflow-hidden"
          height="420"
        >
          <v-treeview
            expand-icon="mdi-chevron-down"
            class="dchannels subtitle-1"
            open-all
            :items="channels"
          >
            <template v-slot:prepend="{ item }">
              <div
                v-if="!item.parent_id && item.type !== 4"
                class="d-tree-normalized-level"
              ></div>
              <v-icon v-if="item.type !== 4">
                {{ channelsIcons[item.type] }}
              </v-icon>
            </template>
            <template v-slot:label="{ item }">
              {{ item.type === 4 ? item.name.toUpperCase() : item.name }}
            </template>
          </v-treeview>
        </v-sheet>
      </v-col>
      <v-col>
        <h4 class="display-1">Roles</h4>
        <v-sheet
          color="#121212"
          class="shadowed pa-1 overflow-hidden"
          height="420"
        >
          <v-chip
            v-for="role in roles"
            :key="'role' + role.id"
            :color="
              role.color !== 0
                ? '#' + role.color.toString(16).padStart(6, '0')
                : 'rgb(212,212,212)'
            "
            outlined
            class="ma-1"
          >
            <v-icon left x-small>mdi-circle</v-icon>
            <span class="white--text"> {{ role.name }}</span></v-chip
          >
        </v-sheet>
      </v-col>
    </v-row>
    <div v-if="imgLoaded" id="loaded-trigger" style="opacity: 0;">
      LOADED
    </div>
  </div>
</template>

<script>
import { parse } from 'twemoji-parser'
import { arrayToTree } from 'performant-array-to-tree'
import tagsIcons from '~/data/tags'

export default {
  layout: 'content-only',
  async asyncData({
    params,
    error,
    payload,
    route: { path },
    app: { $templatesApi }
  }) {
    const templateData = await $templatesApi.getTemplateById('us', params.id)
    if (!templateData) {
      error({ statusCode: 404, message: 'Template not found' })
      return
    }
    const emojiEntities = parse(templateData.emoji, { assetType: 'png' })
    const emojiSrc =
      emojiEntities.length > 0
        ? emojiEntities[0].url
        : 'https://horsehead.me/72/72'
    return {
      templateData,
      emojiSrc,
      tags: templateData.tags.sort().map((tag) => {
        return {
          id: tag,
          icon: tagsIcons[tag]
        }
      }),
      channels: arrayToTree(
        templateData.dprops.serialized_source_guild.channels,
        { dataField: null, parentId: 'parent_id' }
      ),
      channelsIcons: {
        0: 'mdi-pound',
        2: 'mdi-volume-high',
        5: 'mdi-bullhorn'
      },
      roles: templateData.dprops.serialized_source_guild.roles.reverse()
    }
  },
  data() {
    return {
      imgLoaded: false
    }
  },
  methods: {
    loaded() {
      this.imgLoaded = true
    }
  }
}
</script>

<style scoped>
.d-tree-normalized-level {
  display: inline-block;
  width: 24px;
}
.shadowed {
  background: /* Shadow covers */ linear-gradient(
      black 30%,
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(rgba(255, 255, 255, 0), black 70%) 0 100%,
    /* Shadows */
      radial-gradient(
        farthest-side at 50% 0,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
    radial-gradient(
        farthest-side at 50% 100%,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background: /* Shadow covers */ linear-gradient(
      black 30%,
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(rgba(255, 255, 255, 0), black 70%) 0 100%,
    /* Shadows */
      radial-gradient(
        farthest-side at 50% 0,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      ),
    radial-gradient(
        farthest-side at 50% 100%,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
}
</style>
<style>
.dchannels .v-treeview-node__root {
  min-height: 20px;
}

.dchannels .v-treeview--dense .v-treeview-node__root {
  min-height: 20px;
}
</style>
