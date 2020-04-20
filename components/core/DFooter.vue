<template>
  <v-footer>
    <v-layout class="d-flex flex-column flex-md-row align-center">
      <v-flex class="caption d-flex justify-start mb-3 mb-md-0" xs12 md5>
        Discord Patterns &copy; {{ new Date().getFullYear() }}
        | Not affiliated with Discord App.
      </v-flex>
      <v-flex class="caption d-flex justify-center" xs12 md2>
        <locale-changer />
      </v-flex>
      <v-flex class="caption d-flex justify-end" xs12 md5>
        {{ $t('footer.MADE_WITH') }}
        <v-icon small class="red--text">mdi-cards-heart</v-icon>
        &nbsp;{{ $t('footer.BY') }}: Patrons Dev Team
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import LocaleChanger from '~/components/core/LocaleChanger.vue'

export default {
  name: 'DFooter',
  components: {
    LocaleChanger
  }
}
</script>
