<template>
  <div class="extended d-flex flex-column align-center">
    <div
      class="mt-1 d-flex justify-center align-center discord-avatar dcolor-bg-user"
    >
      <img alt="D-Patterns Logo" src="~static/discord-logo.png" width="32" />
    </div>
    <div class="separator my-2 mx-auto"></div>
  </div>
</template>

<style scoped>
.extended {
  height: 100%;
  width: 100%;
}

.dcolor-bg-guild {
  background-color: #2f3136;
}

.dcolor-bg-content {
  background-color: #36393f;
}

.dcolor-bg-user {
  background-color: #36393f;
}

.tl-rounded {
  border-top-left-radius: 12px;
}

.separator {
  height: 2px;
  width: 45%;
  background-color: #2d2f32;
  border-radius: 1px;
}

.discord-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>
