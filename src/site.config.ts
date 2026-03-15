import type { Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  title: 'Firom\'s Blog',
  author: 'Firom Mao',
  description: 'Notes on microelectronics, tools, study, and writing.',
  favicon: '/favicon/favicon.ico',
  locale: {
    lang: 'en-US',
    attrs: 'en_US',
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  logo: {
    src: 'src/assets/avatar.png',
    alt: 'Avatar'
  },

  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',
  head: [],
  customCss: [],

  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Archives', link: '/archives' },
      { title: 'Search', link: '/search' }
    ]
  },

  footer: {
    year: `© ${new Date().getFullYear()}`,
    links: [],
    credits: true,
    social: {
      github: 'https://github.com/FiromMao'
    }
  },

  content: {
    externalLinks: {
      content: ' ↗',
      properties: {
        style: 'user-select:none'
      }
    },
    blogPageSize: 8,
    share: ['weibo', 'x', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    cacheAvatar: false
  },
  pagefind: true,
  typography: {
    class: 'prose text-base',
    blockquoteStyle: 'italic',
    inlineCodeBlockStyle: 'modern'
  },
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  waline: {
    enable: false,
    server: '',
    emoji: ['bmoji', 'weibo'],
    additionalConfigs: {
      pageview: false,
      comment: false,
      locale: {
        reaction0: 'Like',
        placeholder: 'Welcome to comment.'
      },
      imageUploader: false
    }
  }
}

const config = { ...theme, integ } as Config

export default config
