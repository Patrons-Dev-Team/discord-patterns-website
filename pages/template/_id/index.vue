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
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="compiledMarkdown"></div>
        <span class="font-italic grey--text"
          >Created on <strong>{{ createdDate }}</strong
          >.</span
        ><span
          v-if="createdDate !== updatedDate"
          class="font-italic grey--text"
        >
          Updated on <strong>{{ updatedDate }}</strong
          >.
        </span>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn to="/" block x-large class="mb-1 primary">
          <v-icon left>mdi-open-in-new</v-icon>
          Use this template
        </v-btn>
        <v-btn to="/" block class="mb-1">
          How do I proceed ?
        </v-btn>
        <v-btn to="/" block class="mb-1">
          <v-icon left>mdi-play</v-icon>
          Run template in preview mode
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <h4>Channels</h4>
        <p class="caption">
          Hover a channel to show its permissions and more
        </p>
        <v-sheet color="#121212" class="pa-1 overflow-y-auto" max-height="500">
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
        <h4>Roles</h4>
        <p class="caption">Click on a role to show permissions</p>
        <v-sheet color="#121212" class="pa-1 overflow-y-auto" max-height="500">
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
    <v-row class="mt-4">
      <v-col>
        <v-card>
          <v-card-text>
            <v-list-group
              no-action
              active-class="white--text"
              prepend-icon="mdi-information"
              value="true"
            >
              <template v-slot:activator>
                <v-list-item-title>General information</v-list-item-title>
              </template>
              <v-list dense>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Code:</v-list-item-title>
                        <v-list-item-subtitle
                          >Template discord code</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-col>
                    <kbd>{{ templateData.dprops.code }}</kbd>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Name:</v-list-item-title>
                        <v-list-item-subtitle
                          >Original template name</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-col>
                    <p>{{ templateData.dprops.name }}</p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Description:</v-list-item-title>
                        <v-list-item-subtitle
                          >Original template description</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-col>
                    <p>{{ templateData.dprops.description }}</p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Number of uses:</v-list-item-title>
                        <v-list-item-subtitle
                          >At crawl time</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-col>
                    <p>{{ templateData.dprops.usage_count }}</p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Created by:</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <kbd
                      >{{ templateData.dprops.creator.username }}#{{
                        templateData.dprops.creator.discriminator
                      }}</kbd
                    >
                  </v-row>
                </v-list-item>
              </v-list>
            </v-list-group>
            <v-list-group
              active-class="white--text"
              no-action
              prepend-icon="mdi-forum"
            >
              <template v-slot:activator>
                <v-list-item-title>Source guild</v-list-item-title>
              </template>
              <v-list dense>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Name:</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{ templateData.dprops.serialized_source_guild.name }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Source guild id</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <kbd>{{ templateData.dprops.source_guild_id }}</kbd>
                  </v-row>
                </v-list-item>
                <v-list-item
                  v-if="templateData.dprops.serialized_source_guild.description"
                >
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Description:</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild.description
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Region:</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <kbd>{{
                      templateData.dprops.serialized_source_guild.region
                    }}</kbd>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title
                          >Verification level:</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild
                          .verification_level
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title
                          >Default message notifications:</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild
                          .default_message_notifications
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title
                          >Explicit content filter</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild
                          .explicit_content_filter
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Preferred locale</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <kbd>{{
                      templateData.dprops.serialized_source_guild
                        .preferred_locale
                    }}</kbd>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>AFK timeout</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild.afk_timeout
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item
                  v-if="
                    templateData.dprops.serialized_source_guild.afk_channel_id
                  "
                >
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>AFK channel id</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild
                          .afk_channel_id
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item
                  v-if="
                    templateData.dprops.serialized_source_guild
                      .system_channel_id
                  "
                >
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>System channel id</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild
                          .system_channel_id
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item
                  v-if="
                    templateData.dprops.serialized_source_guild
                      .system_channel_flags
                  "
                >
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title
                          >System channel flags</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-col>
                    <p>
                      {{
                        templateData.dprops.serialized_source_guild
                          .system_channel_flags
                      }}
                    </p>
                  </v-row>
                </v-list-item>
                <v-list-item
                  v-if="templateData.dprops.serialized_source_guild.icon_hash"
                >
                  <v-row no-gutters align="center">
                    <v-col>
                      <v-list-item-content>
                        <v-list-item-title>Icon hash</v-list-item-title>
                      </v-list-item-content>
                    </v-col>
                    <kbd>
                      {{
                        templateData.dprops.serialized_source_guild.icon_hash
                      }}
                    </kbd>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-list-group>
          </v-card-text>
        </v-card>
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
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
import { fr } from 'date-fns/locale'
import { convertPerms } from '~/lib/discordperms'
import tagsIcons from '~/data/tags'
const localesDateFns = {
  fr
}
export default {
  layout: 'dense',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ params, error, app: { $templatesApi } }) {
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
      compiledMarkdown: sanitizeHtml(
        marked(templateData.longDescription || templateData.description)
      ),
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
      roles: templateData.dprops.serialized_source_guild.roles.reverse()
    }
  },
  data() {
    return {
      modalRoleIsOn: false,
      modalRoleData: null,
      modalRoleName: ''
    }
  },
  computed: {
    createdDate() {
      return format(
        new Date(this.templateData.dprops.created_at),
        'iii, MMMM d yyyy, h:mm a',
        {
          locale: localesDateFns[this.$i18n.locale]
        }
      )
    },
    updatedDate() {
      return format(
        new Date(this.templateData.dprops.updated_at),
        'iii, MMMM d yyyy, h:mm a',
        {
          locale: localesDateFns[this.$i18n.locale]
        }
      )
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