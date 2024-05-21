// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
	typescript: {
    typeCheck: true
  },
	app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: './icon/icon.ico' }
      ]
    }
  },
})
