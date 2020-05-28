const { join } = require('path')
const axios = require('axios')
const rateLimit = require('axios-rate-limit')
const fs = require('fs-extra')
const http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 1500
})
if (process.argv.length !== 3) {
  throw new Error('invalid args')
}
const jsonPath = join(__dirname, '../data/templates/', process.argv[2])

async function main() {
  const templates = await fs.readJSON(jsonPath)

  for (const template of templates) {
    // eslint-disable-next-line no-console
    console.log(template.id)
    const { data } = await http.get(
      `https://discordapp.com/api/v6/guilds/templates/${template.dprops.code}`
    )
    template.dprops = data
  }
  await fs.writeJSON(jsonPath, templates, { spaces: 2 })
}

main()
