<template>
  <v-card outlined>
    <v-list>
      <v-list-item>
        <v-list-item-avatar left size="60">
          <v-img :src="$t(`partners.list[${partnerId}].IMG_LINK`)"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <div class="overline">{{ $t('partners.TITLE') }}</div>
          <v-list-item-title>{{
            $t(`partners.list[${partnerId}].TITLE`)
          }}</v-list-item-title>
          <v-list-item-subtitle
            :title="$t(`partners.list[${partnerId}].DESCRIPTION`)"
          >
            <span class="text-wrap overflow-auto">
              {{ $t(`partners.list[${partnerId}].DESCRIPTION`) }}
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn
            rel="noopener"
            target="blank"
            :href="$t(`partners.list[${partnerId}].LINK`)"
            icon
          >
            <v-icon color="grey lighten-1">mdi-open-in-new</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      partnerId: 0
    }
  },
  beforeMount() {
    let date = null
    let id = null
    const list = this.$t('partners.list')
    const listLength = Array.isArray(list) ? list.length : 0
    const partnerJson = window.sessionStorage.getItem('partner')

    if (partnerJson) {
      const partnerObj = JSON.parse(partnerJson)
      date = partnerObj.date
      id = partnerObj.id

      if (Date.now() - date > 1000 * 60 * 2) {
        id++
        id = id >= listLength ? 0 : id

        window.sessionStorage.setItem(
          'partner',
          JSON.stringify({
            date: Date.now(),
            id
          })
        )
      }
    } else {
      const partnerId = Math.floor(Math.random() * listLength) + 0
      date = Date.now()
      id = partnerId
      window.sessionStorage.setItem(
        'partner',
        JSON.stringify({
          date,
          id
        })
      )
    }
    this.partnerId = id
  }
}
</script>
