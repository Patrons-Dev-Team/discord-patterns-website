<template>
  <div id="user" class="d-flex align-center pa-1 mb-1">
    <v-badge bottom offset-x="13" offset-y="13" color="#43b581" bordered>
      <img
        src="https://cdn.discordapp.com/attachments/654503812593090602/665721745466195978/blue.png"
        alt="D-Patterns"
        width="36"
      />
    </v-badge>
    <div
      id="user-text"
      class="ml-2"
      :style="'color: ' + (color ? color : '#fff') + ';'"
    >
      <div id="user-name">User</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    color: String
  }
}
</script>

<style>
#user {
  font-size: 14px;
}

#user img {
  border-radius: 50%;
}

#user .v-badge__badge {
  height: 12px;
  min-width: 12px;
}
</style>
