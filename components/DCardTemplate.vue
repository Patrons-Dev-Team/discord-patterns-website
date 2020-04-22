<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{
          template.title
        }}</v-list-item-title>
        <v-list-item-subtitle>{{ template.description }}</v-list-item-subtitle>
        <div>
          <v-chip
            v-for="tag in tags"
            :key="tag.id"
            x-small
            outlined
            class="ma-1"
          >
            <v-icon left x-small>{{ tag.icon }}</v-icon
            >{{ $t(`listing.tags.${tag.id}`) }}</v-chip
          >
        </div>
      </v-list-item-content>

      <v-list-item-avatar
        size="70"
        class="display-1 grey darken-3 text-center white"
        >{{ template.emoji }}</v-list-item-avatar
      >
    </v-list-item>

    <v-card-actions>
      <v-menu open-on-hover offset-x eager left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on"><v-icon>mdi-eye</v-icon></v-btn>
        </template>
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
                  x-small
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
                      style="display: inline-block; width: 24px"
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
      <v-btn text>{{ $t('listing.card.DETAILS_BUTTON') }}</v-btn>
      <v-btn text outlined>{{ $t('listing.card.CREATE_BUTTON') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { arrayToTree } from 'performant-array-to-tree'
import tagsIcons from '~/data/tags-icons'
export default {
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tags: this.template.tags.map((tag) => {
        return {
          id: tag,
          icon: tagsIcons[tag]
        }
      }),
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
