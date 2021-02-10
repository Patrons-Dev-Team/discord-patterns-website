<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12">
      <div class="my-7">
        <thanos-snap-effect
          :page-ready="ready"
          :start-animation="elAnimation.includes('title')"
          ><h3 class="display-2">
            {{ $t('theTeam.TITLE') }}
          </h3></thanos-snap-effect
        >
        <thanos-snap-effect
          :page-ready="ready"
          :start-animation="elAnimation.includes('p')"
          ><p>{{ $t('theTeam.DESCRIPTION') }}</p></thanos-snap-effect
        >
      </div>
      <v-row>
        <v-col
          v-for="creator in creators"
          :key="creator.id"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <thanos-snap-effect
            :page-ready="ready"
            :start-animation="elAnimation.includes(creator.id)"
            ><d-card-creator :template="creator"></d-card-creator
          ></thanos-snap-effect>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" class="mt-10">
      <thanos-snap-effect
        :page-ready="ready"
        :start-animation="elAnimation.includes('partners')"
        ><d-partners></d-partners
      ></thanos-snap-effect>
    </v-col>
  </v-row>
</template>

<script>
import ThanosSnapEffect from '~/components/thanos/ThanosSnapEffect'
import { tags } from '~/data/tags'
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export default {
  components: {
    DCardCreator: () => import('~/components/DCardCreator'),
    DPartners: () => import('~/components/DPartners'),
    ThanosSnapEffect,
  },
  data() {
    return {
      tags,
      ready: false,
      elAnimation: [],
      creators: [
        {
          id: 'loscate',
          title: 'Loscate',
          description: 'Vue developer',
          pfpSrc: 'https://i.imgur.com/sC79rrQ.jpg',
          tags: [
            {
              text: 'Loscate#6984',
            },
          ],
        },
        {
          id: 'orhell',
          title: 'Orhell',
          description: 'Vue developer',
          pfpSrc: 'https://i.imgur.com/GruIXpK.jpg',
          tags: [
            {
              text: 'Orhell#3058',
            },
          ],
        },
        {
          id: 'mxb',
          title: 'Maxerbox',
          description: 'NuxtJS developer, <3 Vue',
          pfpSrc: 'https://avatars.githubusercontent.com/u/12765875?s=400',
          tags: [
            {
              text: '[EU/PC]maxerbox#1389',
            },
            {
              text: 'Github',
              link: 'https://github.com/maxerbox',
            },
          ],
        },
      ],
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(async () => {
      this.ready = true
      const turnOrder = ['mxb', 'loscate', 'orhell', 'p', 'title', 'partners']
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
        .splice(0, 3)
      while (turnOrder.length > 0) {
        await timeout(6000)
        this.elAnimation.push(turnOrder.pop())
      }
    })
  },
  methods: {},
  head() {
    return {
      title: this.$t('theTeam.TITLE'),
      titleTemplate: process.env.APP_TITLE + ' - %s',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('theTeam.DESCRIPTION'),
        },
      ],
    }
  },
}
</script>
