<template>
  <v-treeview
    id="channels-list"
    expand-icon="mdi-chevron-down"
    class="caption mx-3 pa-2"
    open-all
    open-on-click
    :items="channels"
    activatable
  >
    <template v-slot:prepend="{ item }">
      <v-icon v-if="item.type !== 4" dense color="#72767d">
        {{ channelsIcons[item.type] }}
      </v-icon>
    </template>
    <template v-slot:label="{ item }">
      {{ item.type === 4 ? item.name.toUpperCase() : item.name }}
    </template>
  </v-treeview>
</template>

<script>
import { arrayToTree } from 'performant-array-to-tree'

export default {
  name: 'GuildChannels',
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      channels: arrayToTree(
        this.template.dprops.serialized_source_guild.channels,
        { dataField: null, parentId: 'parent_id' }
      ),
      channelsIcons: {
        0: 'mdi-pound',
        2: 'mdi-volume-high',
        5: 'mdi-bullhorn'
      },
      treeOptions: {
        propertyNames: {
          text: 'name'
        }
      }
    }
  }
}
</script>

<style>
.extended {
  width: 100%;
  height: 100%;
}

#channels-list {
  width: -webkit-fill-available;
  color: #72767d;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.v-treeview-node:not(.v-treeview-node--leaf) {
  margin-top: 20px !important;
}

.v-treeview-node.v-treeview-node--leaf {
  margin-top: 4px !important;
}

.v-treeview-node .v-treeview-node__root {
  padding: 4px 0 !important;
}

.v-treeview-node .v-treeview-node__label {
  font-size: 14px;
  font-weight: 500;
}

.v-treeview-node > .v-treeview-node__root:hover .v-treeview-node__label,
.v-treeview-node:not(.v-treeview-node--leaf)
  > .v-treeview-node__root:hover
  .v-treeview-node__toggle {
  color: #dcddde !important;
}

.v-treeview-node:not(.v-treeview-node--leaf)
  > .v-treeview-node__root
  .v-treeview-node__prepend {
  min-width: 0 !important;
  width: 0 !important;
}

.v-treeview-node:not(.v-treeview-node--leaf)
  > .v-treeview-node__root
  .v-treeview-node__content {
  margin-left: 0;
}

.v-treeview-node:not(.v-treeview-node--leaf)
  > .v-treeview-node__root
  .v-treeview-node__label {
  font-size: 12px;
}

.v-treeview-node:not(.v-treeview-node--leaf)
  > .v-treeview-node__root:hover::before {
  background-color: unset !important;
}

.v-treeview-node__root .v-treeview-node__toggle {
  width: 0 !important;
  margin-right: 2px !important;
  color: #72767d;
}

.v-treeview-node__level {
  width: 0 !important;
}

.v-treeview-node__root .v-treeview-node__toggle::before {
  background-color: unset !important;
  transition: unset !important;
}

.v-treeview-node__root .v-treeview-node__toggle::after {
  background-color: unset !important;
  transition: unset !important;
}

.v-treeview-node__prepend:nth-child(1) {
  min-width: 20px !important;
  width: 20px !important;
}

.v-icon.v-icon.v-icon--link {
  font-size: 12px !important;
}

.v-application .primary--text .v-treeview-node__label {
  color: #f9f6f9 !important;
}

.v-application .primary--text {
  background-color: rgba(250, 247, 250, 0.07) !important;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0) !important;
  caret-color: rgba(0, 0, 0, 0);
}
</style>
