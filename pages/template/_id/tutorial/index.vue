<template>
  <component :is="markdownContent" class="mt-10" />
</template>

<script>
export default {
  layout: 'dense',
  async asyncData({
    params,
    error,
    payload,
    route: { path },
    app: { $templatesApi, router, i18n },
  }) {
    const templateData =
      payload || (await $templatesApi.getTemplateById(i18n.locale, params.id))

    if (!templateData) {
      error({ statusCode: 404, message: 'Template not found' })
      return
    }
    return {
      templateData,
      roles: templateData.dprops.serialized_source_guild.roles.reverse(),
    }
  },
  data() {
    return {
      markdownContent: null,
      attributes: null,
      templateName: 'Test',
      title: '',
      description: '',
    }
  },
  created() {
    this.markdownContent = async () => {
      let md = null
      try {
        md = await import(`~/content/${this.$i18n.locale}/template-guide.md`)
      } catch (e) {
        md = await import(`~/content/us/template-guide.md`)
      }
      this.attributes = md.attributes
      return {
        extends: md.vue.component,
        data: () => {
          return {
            templateName: this.templateData.title,
            creationLink: `https://discord.new/${this.templateData.dprops.code}`,
            exampleRole: this.roles[0].name,
            templateMainTag: this.$t(`listing.tags.${this.templateData.mtag}`),
            createAccountImgSrc: this.$t(
              'template.tutorial.CREATE_ACCOUNT_IMG'
            ),
            setupCommunityImgSrc: this.$t(
              'template.tutorial.SETUP_COMMUNITY_IMG'
            ),
          }
        },
      }
    }
  },
  head() {
    const vars = {
      templateName: this.templateData.title,
      templateMainTag: this.$t(`listing.tags.${this.templateData.mtag}`),
    }
    const thumbnailsUrl =
      this.$router.options.base +
      `thumbnails/${this.$templatesLangs.getFallbackLang(
        this.$i18n.locale
      )}-template.${this.templateData.id}.png`
    return {
      title: this.$t('template.tutorial.TITLE', vars),
      titleTemplate: '%s',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.$t('template.tutorial.DESCRIPTION', vars),
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.$t('template.tutorial.TITLE', vars),
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.$t('template.tutorial.DESCRIPTION', vars),
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: thumbnailsUrl,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.$t('template.tutorial.TITLE', vars),
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: './',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.templateData.description,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: process.env.APP_TITLE,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: thumbnailsUrl,
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
