<template>
  <v-container id="members-list">
    <v-row
      v-for="role in roles"
      :key="role.id"
      no-gutters
      class="d-flex flex-column"
    >
      <div v-if="role.hoist" class="role-name mt-3">
        {{ role.name.toUpperCase() }}
        <user
          v-for="j in 2"
          :key="j"
          :color="
            role.color !== 0
              ? '#' + role.color.toString(16).padStart(6, '0')
              : 'rgb(212,212,212)'
          "
        />
      </div>
    </v-row>
    <div class="role-name mt-3">{{ $t('preview.ONLINE') }}</div>
    <v-row
      v-for="role in roles"
      :key="role.id"
      no-gutters
      class="d-flex flex-column"
    >
      <div v-if="!role.hoist">
        <user
          v-for="j in 2"
          :key="j"
          :color="
            role.color !== 0
              ? '#' + role.color.toString(16).padStart(6, '0')
              : 'rgb(212,212,212)'
          "
        />
      </div>
    </v-row>
  </v-container>
</template>

<script>
import User from '~/components/preview/User.vue'

export default {
  components: {
    User
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    roles: null
  }
}
</script>

<style>
#members-list {
  width: -webkit-fill-available;
  color: #8e9297;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  overflow-y: auto;
  height: 750px;
  font-size: 12px;
  font-weight: 500;
}

#members-list:hover {
  padding-right: 4px !important;
}

#members-list::-webkit-scrollbar {
  width: 0px !important;
}

#members-list:hover::-webkit-scrollbar {
  width: 4px !important;
}

#members-list:hover::-webkit-scrollbar-thumb {
  background: #202225aa !important;
  border-radius: 2px !important;
}
</style>
