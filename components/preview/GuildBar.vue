<template>
  <v-menu bottom offset-y class="pa-2">
    <template v-slot:activator="{ on }">
      <v-card color="rgba(0,0,0,0)" class="extended">
        <v-btn
          tile
          text
          class="d-flex align-center extended px-3"
          height="48"
          v-on="on"
        >
          <div class="d-flex justify-start extended">{{ guildName }}</div>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-card>
    </template>

    <v-list class="ma-2 shadow" nav dense>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Server Boost</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-1"></v-divider>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Inviter des gens</v-list-item-title>
      </v-list-item>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Paramètres du serveur</v-list-item-title>
      </v-list-item>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Créer un salon</v-list-item-title>
      </v-list-item>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Créer une catégorie</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-1"></v-divider>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Paramètres de notification</v-list-item-title>
      </v-list-item>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Paramètres de confidentialité</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-1"></v-divider>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Changer le pseudo</v-list-item-title>
      </v-list-item>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Masuqer les salons muets</v-list-item-title>
      </v-list-item>
      <v-divider class="mb-1"></v-divider>
      <v-list-item class="height-for-list" dense @click="() => {}">
        <v-list-item-title>Quitter le serveur</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'Guilds',
  data() {
    return {
      guildName: 'Template 1'
    }
  }
}
</script>

<style scoped>
.extended {
  width: 100%;
  height: 100%;
}

.v-menu__content {
  box-shadow: none;
}

.shadow {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.08), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.height-for-list {
  min-height: 30px;
  height: 30px;
  margin-bottom: 0;
}
</style>
