<template>
  <div>
    <v-row>
      <v-list-item two-line>
        <v-list-item-avatar size="70" class="display-1 accent text-center"
          ><v-img
            :src="emojiSrc"
            contain
            height="35"
            :alt="templateData.emoji"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            <span style="white-space: normal">
              {{ templateData.title }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="tag in tags"
                :key="tag.id"
                outlined
                class="mt-1 mr-1"
              >
                <v-icon left x-small>{{ tag.icon }}</v-icon
                >{{ $t(`listing.tags.${tag.id}`) }}
              </v-chip>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <h3>{{ $t('template.details.DESC_TITLE') }}</h3>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="compiledMarkdown"></div>
        <span class="font-italic grey--text"
          >{{ $t('template.details.CREATED_ON') }}
          <strong>{{ createdDate }}</strong
          >.</span
        ><span
          v-if="createdDate !== updatedDate"
          class="font-italic grey--text"
        >
          {{ $t('template.details.UPDATED_ON') }}
          <strong>{{ updatedDate }}</strong
          >.
        </span>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          rel="noopener"
          target="blank"
          :href="creationLink"
          block
          x-large
          class="mb-1 primary"
        >
          <v-icon left>mdi-open-in-new</v-icon
          >{{ $t('template.details.USE_TEMPLATE_BTN') }}</v-btn
        >
        <v-btn
          nuxt
          :to="
            localePath({
              name: 'template-id-tutorial',
              params: { id: templateData.id },
            })
          "
          block
          class="mb-1"
          >{{ $t('template.details.HOW_TO_PROCEED_BTN') }}</v-btn
        >
        <!--v-btn to="/" block class="mb-1">
          <v-icon left>mdi-play</v-icon
          >{{ $t('template.details.RUN_PREVIEW_BTN') }}</!--v-btn
        -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <h4>{{ $t('template.details.CHANNELS_TITLE') }}</h4>
        <p class="caption">{{ $t('template.details.CHANNELS_DESCRIPTION') }}</p>
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
        <h4>{{ $t('template.details.ROLES_TITLE') }}</h4>
        <p class="caption">{{ $t('template.details.ROLES_DESCRIPTION') }}</p>
        <v-sheet color="#121212" class="pa-1 overflow-y-auto" max-height="500">
          <v-chip
            v-for="(role, index) in roles"
            :key="'role' + role.id"
            :color="
              role.color !== 0
                ? '#' + role.color.toString(16).padStart(6, '0')
                : 'rgb(212,212,212)'
            "
            small
            outlined
            class="ma-1"
            @click.stop="openModalRole(role, index)"
          >
            <v-icon left x-small>mdi-circle</v-icon>
            <span class="white--text"> {{ role.name }}</span></v-chip
          >
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col
        ><d-template-details :template-data="templateData"></d-template-details
      ></v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="modalRoleIsOn"
        max-width="80%"
        transition="slide-x-reverse-transition"
      >
        <v-card>
          <v-row class="mx-0">
            <v-col md="3" class="pa-0 roleModal role-dialog-col">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon @click="closeModalrole">mdi-close</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Roles</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list dense nav class="roleModal scroll-y" max-height="80%">
                <v-list-item-group :model="modalRoleModel">
                  <template v-for="(role, index) in roles">
                    <v-list-item
                      :key="role.id"
                      :color="
                        role.color !== 0
                          ? '#' +
                            role.color.toString(16).padStart(6, '0') +
                            ' !important'
                          : 'rgb(212,212,212) !important'
                      "
                      @click="setActualRole(role, index)"
                    >
                      {{ role.name }}
                    </v-list-item>
                    <v-divider
                      v-if="index + 1 < roles.length"
                      :key="'list-role-' + role.id"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col md="9" class="role-dialog-col">
              <v-fade-transition>
                <v-list two-line>
                  <h3 :style="'color: ' + modalRoleColor + ';'">
                    {{ modalRoleName }}
                  </h3>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$t('perms.HOIST.title')"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="$t('perms.HOIST.content')"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-icon v-if="modalRoleData.hoist" right class="green"
                      >mdi-check</v-icon
                    >
                    <v-icon v-else right class="red">mdi-close</v-icon>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$t('perms.MENTIONABLE.title')"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="$t('perms.MENTIONABLE.content')"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-icon v-if="modalRoleData.mentionable" right class="green"
                      >mdi-check</v-icon
                    >
                    <v-icon v-else right class="red">mdi-close</v-icon>
                  </v-list-item>
                  <v-list-item
                    v-for="(value, index) in modalRoleData.perms"
                    :key="'perm-' + index"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="$t('perms.' + value[0] + '.title')"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-text="$t('perms.' + value[0] + '.content')"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-icon v-if="value[1]" right class="green"
                      >mdi-check</v-icon
                    >
                    <v-icon v-else right class="red">mdi-close</v-icon>
                  </v-list-item>
                </v-list>
              </v-fade-transition>
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
import { tags as tagsIcons } from '~/data/tags'
import DTemplateDetails from '~/components/DTemplateDetails'
const localesDateFns = {
  fr,
}
export default {
  components: {
    DTemplateDetails,
  },
  layout: 'dense',
  async asyncData({
    params,
    error,
    payload,
    route: { path },
    app: { $templatesApi, router, i18n },
  }) {
    const templateData =
      payload || (await $templatesApi.getTemplateById(i18n.locale, params.id))
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
      tags: templateData.tags.sort().map((tag) => {
        return {
          id: tag,
          icon: tagsIcons[tag],
        }
      }),
      channels: arrayToTree(
        templateData.dprops.serialized_source_guild.channels,
        { dataField: null, parentId: 'parent_id' }
      ),
      channelsIcons: {
        0: 'mdi-pound',
        2: 'mdi-volume-high',
        5: 'mdi-bullhorn',
      },
      creationLink: `https://discord.new/${templateData.dprops.code}`,
      roles: templateData.dprops.serialized_source_guild.roles.reverse(),
    }
  },
  data() {
    return {
      modalRoleIsOn: false,
      modalRoleData: {
        perms: null,
        mentionable: null,
        hoist: null,
      },
      modalRoleName: '',
      modalRoleColor: '',
      modalRoleModel: 0,
    }
  },
  computed: {
    createdDate() {
      return format(
        new Date(this.templateData.dprops.created_at),
        'iii, MMMM d yyyy, h:mm a',
        {
          locale: localesDateFns[this.$i18n.locale],
        }
      )
    },
    updatedDate() {
      return format(
        new Date(this.templateData.dprops.updated_at),
        'iii, MMMM d yyyy, h:mm a',
        {
          locale: localesDateFns[this.$i18n.locale],
        }
      )
    },
  },
  methods: {
    openModalRole(role, index) {
      this.modalRoleIsOn = true
      this.modalRoleData = {
        perms: convertPerms(role.permissions, {
          ordered: true,
          readableNames: false,
        }),
        mentionable: role.mentionable,
        hoist: role.hoist,
      }
      this.modalRoleName = role.name
      this.modalRoleColor =
        role.color !== 0
          ? '#' + role.color.toString(16).padStart(6, '0') + ' !important'
          : 'rgb(212,212,212) !important'
      this.modalRoleModel = index
    },
    closeModalrole() {
      this.modalRoleIsOn = false
    },
    setActualRole(role, index) {
      this.modalRoleData = {
        perms: convertPerms(role.permissions, {
          ordered: true,
          readableNames: false,
        }),
        mentionable: role.mentionable,
        hoist: role.hoist,
      }
      this.modalRoleName = role.name
      this.modalRoleColor =
        role.color !== 0
          ? '#' + role.color.toString(16).padStart(6, '0') + ' !important'
          : 'rgb(212,212,212) !important'
      this.modalRoleModel = index
    },
  },
  head() {
    const vars = {
      templateName: this.templateData.title,
      templateMainTag: this.$t(`listing.tags.${this.templateData.mtag}`),
    }
    const thumbnailsUrl =
      this.$router.options.base +
      `thumbnails/${this.$templatesLangs.getFallbackLang(
        this.$i18n.locale
      )}-template.${this.templateData.id}.png`
    return {
      title: this.templateData.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('template.details.DESCRIPTION', vars),
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.templateData.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.templateData.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: thumbnailsUrl,
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: `${this.templateData.dprops.creator.username}#${this.templateData.dprops.creator.discriminator}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.templateData.title,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: './',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.templateData.description,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: process.env.APP_TITLE,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: thumbnailsUrl,
        },
        {
          hid: 'og:image:type',
          name: 'og:image:type',
          content: 'image/png',
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: '1280',
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: '800',
        },
      ],
    }
  },
}
</script>

<style scoped>
.d-tree-normalized-level {
  display: inline-block;
  width: 24px;
}
.role-dialog-col {
  height: 80vh;
  overflow-y: auto;
}
</style>
