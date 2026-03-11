const siteUrl = process.env.SITE_URL || 'https://schedule.gameassistants.ru'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  site: {
    url: siteUrl,
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Schedule I — Mix Simulator',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '256x256', href: '/game-icon.png' },
        { rel: 'apple-touch-icon', href: '/game-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Dela+Gothic+One&display=swap' },
      ],
      meta: [
        { name: 'theme-color', content: '#070709' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'description', content: 'Schedule I Mix Simulator — симулятор миксов с точной механикой из игры. Подбирайте ингредиенты, эффекты и рецепты для максимальной прибыли.' },
        { name: 'keywords', content: 'Schedule I, mix simulator, симулятор миксов, Schedule 1, mixing guide, рецепты, эффекты, ингредиенты, калькулятор миксов' },
        { name: 'author', content: 'ZuckerigProd' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Schedule I — Mix Simulator' },
        { property: 'og:description', content: 'Симулятор миксов для Schedule I — подбирайте ингредиенты, эффекты и рецепты с точной игровой механикой.' },
        { property: 'og:image', content: `${siteUrl}/social-preview.png` },
        { property: 'og:url', content: siteUrl },
        { property: 'og:site_name', content: 'Schedule I Mix Simulator' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:locale:alternate', content: 'en_US' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Schedule I — Mix Simulator' },
        { name: 'twitter:description', content: 'Симулятор миксов для Schedule I с точной игровой механикой.' },
        { name: 'twitter:image', content: `${siteUrl}/social-preview.png` },
      ],
    },
  },
  i18n: {
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'ru',
    langDir: 'locales',
    strategy: 'no_prefix',
  },
})
