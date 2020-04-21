<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1"
          >The college funk template</v-list-item-title
        >
        <v-list-item-subtitle
          >That's an awesome french template, for awesome rp times ! Try to join
          "rooms" and make weird things in them. Raid the server, and fuck up
          everything ! What a way to enjoy life !</v-list-item-subtitle
        >
        <v-chip-group column max="0">
          <v-chip x-small outlined>
            <v-icon left x-small>mdi-brightness-5</v-icon> gaming</v-chip
          >

          <v-chip x-small outlined>
            <v-icon left x-small>mdi-brightness-5</v-icon> social</v-chip
          >

          <v-chip x-small outlined
            ><v-icon left x-small>mdi-brightness-5</v-icon> roleplay</v-chip
          >

          <v-chip x-small outlined
            ><v-icon left x-small>mdi-brightness-5</v-icon> sampling</v-chip
          >
          ...
        </v-chip-group>
      </v-list-item-content>

      <v-list-item-avatar
        size="70"
        class="display-1 grey darken-3 text-center white"
        >🕹️</v-list-item-avatar
      >
    </v-list-item>

    <v-card-actions>
      <v-menu open-on-hover top offset-x>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on"><v-icon>mdi-eye</v-icon></v-btn>
        </template>
        <v-list max-width="300" dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Roles</v-list-item-title>
              <v-sheet color="#121212" class="pa-1">
                <v-chip-group column max="0">
                  <v-chip x-small outlined>
                    <v-icon left x-small>mdi-brightness-5</v-icon>
                    gaming</v-chip
                  >

                  <v-chip x-small outlined>
                    <v-icon left x-small>mdi-brightness-5</v-icon>
                    social</v-chip
                  >

                  <v-chip x-small outlined
                    ><v-icon left x-small>mdi-brightness-5</v-icon>
                    roleplay</v-chip
                  >

                  <v-chip x-small outlined
                    ><v-icon left x-small>mdi-brightness-5</v-icon>
                    sampling</v-chip
                  >
                  <v-chip x-small outlined
                    ><v-icon left x-small>mdi-brightness-5</v-icon>
                    sampling</v-chip
                  >
                  <v-chip x-small outlined
                    ><v-icon left x-small>mdi-brightness-5</v-icon>
                    sampling</v-chip
                  >
                  <v-chip x-small outlined
                    ><v-icon left x-small>mdi-brightness-5</v-icon>
                    sampling</v-chip
                  >
                  <v-chip x-small outlined
                    ><v-icon left x-small>mdi-brightness-5</v-icon>
                    sampling</v-chip
                  >
                  <v-chip x-small outlined
                    ><v-icon left x-small>mdi-brightness-5</v-icon>
                    sampling</v-chip
                  >
                </v-chip-group>
              </v-sheet>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Channels</v-list-item-title>
              <v-sheet color="#121212" class="pa-1">
                <v-treeview
                  class="caption"
                  open-all
                  dense
                  :items="items"
                ></v-treeview>
              </v-sheet>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn text>Details</v-btn>
      <v-btn text outlined>Create my server</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    template: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' }
          ]
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' }
                  ]
                }
              ]
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' }
          ]
        },
        {
          id: 19,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' }
              ]
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss">
@import '~assets/variables.scss';
$treeview-node-height: 20px;
$treeview-node-height-dense: 20px;
$treeview-node-padding: 0px;
</style>
