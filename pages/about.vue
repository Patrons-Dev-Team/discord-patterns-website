<template>
  <component :is="markdownContent" class="mt-10" />
</template>

<script>
export default {
  data() {
    return {
      markdownContent: null,
      attributes: null,
      title: '',
      description: '',
    }
  },
  created() {
    this.markdownContent = async () => {
      let md = null
      try {
        md = await import(`~/content/${this.$i18n.locale}/about.md`)
      } catch (e) {
        md = await import(`~/content/us/about.md`)
      }
      this.attributes = md.attributes
      return {
        extends: md.vue.component,
        data: () => {
          return {}
        },
      }
    }
  },
  head() {
    return {
      title: this.$t('about.TITLE'),
      titleTemplate: '%s',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.DESCRIPTION'),
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: './',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: process.env.APP_TITLE,
        },
        {
          hid: 'og:image:type',
          name: 'og:image:type',
          content: 'image/png',
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: '1280',
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: '800',
        },
      ],
    }
  },
}
</script>

<style>
.frontmatter-markdown img {
  max-width: 1300px;
}
</style>
