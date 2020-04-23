export default {
  // eslint-disable-next-line require-await
  async getAllTemplates(lang) {
    switch (lang) {
      case 'us':
      default:
        return await import('~/data/templates/templates.us')
    }
  }
}
