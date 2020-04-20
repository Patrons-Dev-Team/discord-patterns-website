<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ appTitle }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('header.SERVICE_DESCRIPTION') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="localePath(item.link)"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense app hide-on-scroll>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </span>

      <v-toolbar-title class="ml-0"
        ><nuxt-link
          :to="localePath('index')"
          tag="span"
          style="cursor: pointer"
          >{{ appTitle }}</nuxt-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn
        v-for="item in menuItems"
        :key="item.title"
        :to="localePath(item.link)"
        class="hidden-sm-and-down"
        nuxt
        text
        >{{ item.title }}</v-btn
      >
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      appTitle: process.env.APP_TITLE,
      drawer: false
    }
  },
  computed: {
    menuItems() {
      return [
        {
          title: this.$t('header.PREVIEW'),
          link: 'preview'
        },
        {
          title: this.$t('header.BROWSE'),
          link: 'about'
        },
        {
          title: this.$t('header.POPULAR'),
          link: { name: 'browse', query: { sort: 'most-popular' } }
        }
      ]
    }
  }
}
</script>
