<template>
  <component :is="markdownContent" class="mt-10" />
</template>

<script>
export default {
  layout: 'dense',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({
    params,
    error,
    payload,
    getPayload,
    route: { path },
    app: { $templatesApi }
  }) {
    const templateData =
      payload ||
      (await getPayload(path)) ||
      (await $templatesApi.getTemplateById('us', params.id))

    if (!templateData) {
      error({ statusCode: 404, message: 'Template not found' })
      return
    }
    return {
      templateData,
      roles: templateData.dprops.serialized_source_guild.roles.reverse()
    }
  },
  data() {
    return {
      markdownContent: null,
      attributes: null,
      templateName: 'Test',
      title: '',
      description: ''
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
            )
          }
        }
      }
    }
  },
  head() {
    const vars = {
      templateName: this.templateData.title,
      templateMainTag: this.$t(`listing.tags.${this.templateData.mtag}`)
    }
    return {
      title: this.$t('template.tutorial.TITLE', vars),
      titleTemplate: '%s',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.$t('template.tutorial.DESCRIPTION', vars)
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [
        {
          type: 'application/json+oembed',
          href: `oembeds/${this.$templatesLangs.getFallbackLang(
            this.$i18n.locale
          )}-template.${this.templateData.id}.json`
        }
      ]
    }
  }
}
</script>

<style>
.frontmatter-markdown img {
  max-width: 1300px;
}
</style>
