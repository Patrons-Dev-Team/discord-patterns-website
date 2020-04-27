<template>
  <div>
    <v-row>
      <v-list-item two-line>
        <v-list-item-avatar size="70" class="display-1 accent text-center "
          ><v-img
            :src="emojiSrc"
            contain
            height="35"
            :alt="templateData.emoji"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <span style="white-space: normal;">
              {{ templateData.title }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              v-for="tag in tags"
              :key="tag.id"
              small
              outlined
              class="mt-1 mr-1"
            >
              <v-icon left x-small>{{ tag.icon }}</v-icon
              >{{ $t(`listing.tags.${tag.id}`) }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <h3>Description</h3>
        <p>{{ templateData.description }}</p>
        <span class="font-italic grey--text"
          >Created on {{ createdDate }}. Updated on {{ updatedDate }}.</span
        >
      </v-col>
      <v-col cols="12" md="4">
        <v-btn to="/" width="100%" class="mb-1 primary">
          Use this template
        </v-btn>
        <v-btn to="/" width="100%" class="mb-1">
          How do I proceed ?
        </v-btn>
        <v-btn to="/" width="100%" class="mb-1">
          Preview
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-sheet color="#121212" class="pa-1 overflow-y-auto" max-height="35vh">
          <v-treeview
            expand-icon="mdi-chevron-down"
            class="caption"
            open-all
            dense
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
      <v-col cols="12" md="4">
        <v-sheet color="#121212" class="pa-1 overflow-y-auto" max-height="35vh">
          <v-chip
            v-for="role in roles"
            :key="role.id"
            :color="
              role.color !== 0
                ? '#' + role.color.toString(16).padStart(6, '0')
                : 'rgb(212,212,212)'
            "
            small
            outlined
            class="ma-1"
            @click.stop="openModalRole(role)"
          >
            <v-icon left x-small>mdi-circle</v-icon>
            <span class="white--text"> {{ role.name }}</span></v-chip
          >
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>Not important info</h3>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="modalRoleIsOn" max-width="80%">
        <v-card>
          <v-row class="mx-0">
            <v-col md="3" class="pa-0 accent">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon @click="closeModalrole">mdi-close</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Roles</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list dense nav class="accent scroll-y" max-height="80%">
                <template v-for="(role, index) in roles">
                  <v-list-item :key="role.id" @click="setActualRole(role)">
                    {{ role.name }}
                  </v-list-item>
                  <v-divider
                    v-if="index + 1 < roles.length"
                    :key="role.id"
                  ></v-divider>
                </template>
              </v-list>
            </v-col>
            <v-col md="9">
              <v-list two-line>
                <h3>{{ modalRoleName }}</h3>
                <v-list-item
                  v-for="(value, index) in modalRoleData"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$t('perms.' + value[0] + '.title')"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="$t('perms.' + value[0] + '.content')"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-icon v-if="value[1]" right class="green">mdi-check</v-icon>
                  <v-icon v-else right class="red">mdi-close</v-icon>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { parse } from 'twemoji-parser'
import { arrayToTree } from 'performant-array-to-tree'
import { format } from 'date-fns'
import { convertPerms } from '~/lib/discordperms'
import tagsIcons from '~/data/tags'
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ params, redirect, app: { $templatesApi } }) {
    const templateData = await $templatesApi.getTemplateById('us', params.id)
    if (templateData !== undefined) {
      const emojiEntities = parse(templateData.emoji, { assetType: 'png' })
      const emojiSrc =
        emojiEntities.length > 0
          ? emojiEntities[0].url
          : 'https://horsehead.me/72/72'
      return {
        templateData,
        emojiSrc,
        tags: templateData.tags.map((tag) => {
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
        roles: templateData.dprops.serialized_source_guild.roles
          .filter((role) => role.id !== 0)
          .reverse(),
        createdDate: format(
          new Date(templateData.dprops.created_at),
          'MM/dd/yy'
        ),
        updatedDate: format(
          new Date(templateData.dprops.updated_at),
          'MM/dd/yy'
        )
      }
    } else {
      redirect('/')
    }
  },
  data() {
    return {
      modalRoleIsOn: false,
      modalRoleData: null,
      modalRoleName: ''
    }
  },
  methods: {
    openModalRole(role) {
      this.modalRoleIsOn = true
      this.modalRoleData = Object.entries(convertPerms(role.permissions))
      this.modalRoleName = role.name
    },
    closeModalrole() {
      this.modalRoleIsOn = false
    },
    setActualRole(role) {
      this.modalRoleData = Object.entries(convertPerms(role.permissions))
      this.modalRoleName = role.name
    }
  }
}
</script>

<style scoped>
.d-tree-normalized-level {
  display: inline-block;
  width: 24px;
}
</style>
