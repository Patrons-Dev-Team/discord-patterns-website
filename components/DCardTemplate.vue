<template>
  <v-card outlined>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          <span style="white-space: normal;"> {{ template.title }} </span>
        </v-list-item-title>
        <v-list-item-subtitle>{{ template.description }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar size="70" class="display-1 accent text-center "
        ><v-img
          :src="emojiSrc"
          contain
          height="35"
          :alt="template.emoji"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>
    <div>
      <v-chip
        v-for="tag in tags"
        :key="tag.id"
        :to="localePath({ name: 'browse', query: { tags: [tag.id] } })"
        active-class="no-active"
        nuxt
        small
        outlined
        class="ma-1"
      >
        <v-icon left x-small>{{ tag.icon }}</v-icon
        >{{ $t(`listing.tags.${tag.id}`) }}</v-chip
      >
    </div>
    <v-card-actions>
      <v-btn :id="`desc-acti-${id}`" icon><v-icon>mdi-eye</v-icon></v-btn>
      <v-menu open-on-hover offset-x left :activator="`#desc-acti-${id}`">
        <v-list max-width="300" dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('listing.pophover.ROLES') }}
              </v-list-item-title>
              <v-sheet
                color="#121212"
                class="pa-1 overflow-y-auto"
                max-height="20vh"
              >
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
                >
                  <v-icon left x-small>mdi-circle</v-icon>
                  <span class="white--text"> {{ role.name }}</span></v-chip
                >
              </v-sheet>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                $t('listing.pophover.CHANNELS')
              }}</v-list-item-title>
              <v-sheet
                color="#121212"
                class="pa-1 overflow-y-auto"
                max-height="50vh"
              >
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
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn text to="template/0">{{
        $t('listing.card.DETAILS_BUTTON')
      }}</v-btn>
      <v-btn text outlined>{{ $t('listing.card.CREATE_BUTTON') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { arrayToTree } from 'performant-array-to-tree'
import { parse } from 'twemoji-parser'
import tagsIcons from '~/data/tags'
export default {
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  data() {
    const emojiEntities = parse(this.template.emoji, { assetType: 'png' })
    const emojiSrc =
      emojiEntities.length > 0
        ? emojiEntities[0].url
        : 'https://horsehead.me/72/72'
    return {
      id: this._uid,
      tags: this.template.tags.map((tag) => {
        return {
          id: tag,
          icon: tagsIcons[tag]
        }
      }),
      emojiSrc,
      roles: this.template.dprops.serialized_source_guild.roles
        .filter((role) => role.id !== 0)
        .reverse(),
      channels: arrayToTree(
        this.template.dprops.serialized_source_guild.channels,
        { dataField: null, parentId: 'parent_id' }
      ),
      channelsIcons: {
        0: 'mdi-pound',
        2: 'mdi-volume-high',
        5: 'mdi-bullhorn'
      }
    }
  }
}
</script>
<style scoped>
.d-tree-normalized-level {
  display: inline-block;
  width: 24px;
}

.v-chip--active.no-active::before {
  opacity: 0 !important;
}
</style>
