# Astro Theme Pure

[English](./README.md) | 简体中文

一个由 Astro 构建的，轻便简洁、快速强大的博客 & 文档主题。

[![GitHub deployments](https://img.shields.io/github/deployments/cworld1/astro-theme-pure/production?style=flat&logo=vercel&label=vercel)](https://astro-pure.js.org/)
[![NPM Version](https://img.shields.io/npm/v/astro-pure?logo=npm&style=flat)](https://www.npmjs.com/package/astro-pure)
[![GitHub Release](https://img.shields.io/github/v/release/cworld1/astro-theme-pure?include_prereleases&style=flat&label=template)](https://github.com/cworld1/astro-theme-pure/releases)
[![GitHub License](https://img.shields.io/github/license/cworld1/astro-theme-pure?style=flat)](https://github.com/cworld1/astro-theme-pure/blob/main/LICENSE)

![image](./.github/assets/header.webp)
![image](./.github/assets/body.webp)

> [!NOTE]
> 已知问题：1. Head 标签和自定义选项仍在开发中（已经暴露模板直接改）；2. 主题模板 v4.0.5^ CSS 预设被换到 PresetMini。如有任何问题，请及时反馈。

## 简介

查看 [预览 →](https://astro-pure.js.org/)

### :fire: 特性

- [x] :rocket: 快速高性能
- [x] :star: 简单干净的设计
- [x] :iphone: 响应式设计
- [x] :mag: 使用 [pagefind](https://pagefind.app/) 构建的全站搜索
- [x] :world_map: 站点地图和 RSS 订阅
- [x] :spider_web: 友好的 SEO
- [x] :book: 目录（table of contents）
- [x] :framed_picture: 动态为文章生成可供三方媒体预览的分享图像
- [x] :framed_picture: Mediumzoom 图像灯箱

### :package: 组件

主题包含了许多组件，不仅可以在主题中使用，还可以在其他 Astro 项目中使用。

> 其他 Astro 项目使用需要 UnoCSS。更多详情请查阅 [Package README](https://github.com/cworld1/astro-theme-pure/blob/main/packages/pure/README.md#use-with-common-astro-project)。

- 基础组件：`Aside`、`Tabs`、`Timeline`、`Steps`、`Spoiler`...
- 高级组件：`GithubCard`、`LinkPreview`、`Quote`、`QRCode`...

### :white_check_mark: Lighthouse 分数

[![lighthouse-score](./.github/assets/lighthouse-score.png)](https://pagespeed.web.dev/analysis/https-cworld-top/o229zrt5o4?form_factor=mobile&hl=en)

## 📚 目录

- [快速开始](#快速开始)
- [基本配置](#基本配置)
- [创建博客文章](#创建博客文章)
- [常用命令](#常用命令)
- [目录结构说明](#目录结构说明)
- [自定义配置](#自定义配置)
- [部署](#部署)
- [常见问题](#常见问题)
- [更多资源](#更多资源)

---

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/): 18.0.0+
- 推荐使用 [Bun](https://bun.sh/) 作为包管理器

### 安装依赖

```bash
bun install
# 或使用 npm
npm install
```

### 启动开发服务器

```bash
bun dev
# 或
npm run dev
```

访问 `http://localhost:4321` 查看你的博客。

### 构建生产版本

```bash
bun run build
# 或
npm run build
```

构建完成后，可以使用以下命令预览：

```bash
bun preview
```

---

## 基本配置

主要配置文件：`src/site.config.ts`

### 基础信息配置

```typescript
export const theme: ThemeUserConfig = {
  // 网站标题
  title: 'Firom\'s Blog',
  
  // 作者名称
  author: 'Firom Mao',
  
  // 网站描述
  description: 'Stay active, stay clear',
  
  // 网站图标
  favicon: '/favicon/favicon.ico',
  
  // 语言设置
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
  
  // Logo 图片
  logo: {
    src: 'src/assets/avatar.png',
    alt: 'Avatar'
  }
}
```

### 导航菜单配置

```typescript
header: {
  menu: [
    { title: 'Blog', link: '/blog' },
    { title: 'Projects', link: '/projects' },
    { title: 'Links', link: '/links' },
    { title: 'About', link: '/about' }
  ]
}
```

### 页脚配置

```typescript
footer: {
  year: `© ${new Date().getFullYear()}`,
  // year: `© 2019 - ${new Date().getFullYear()}`, // 也可以设置起始年份
  links: [
    {
      title: 'Moe ICP 114514',
      link: 'https://icp.gov.moe/?keyword=114514',
      style: 'text-sm' // UnoCSS 样式类
    },
    {
      title: 'Site Policy',
      link: '/terms/list',
      pos: 2 // position 设置为 2 会追加到版权行
    }
  ],
  credits: true, // 显示 "Astro & Pure theme powered" 链接
  social: { 
    github: 'https://github.com/FiromMao' 
  }
}
```

### 内容配置

```typescript
content: {
  // 外部链接配置
  externalLinks: {
    content: ' ↗',
    properties: {
      style: 'user-select:none'
    }
  },
  // 博客分页大小
  blogPageSize: 8,
  // 分享按钮（支持 weibo, x, bluesky）
  share: ['weibo', 'x', 'bluesky']
}
```

---

## 创建博客文章

### 方法一：使用命令行工具（推荐）

```bash
bun new
# 或
npm run new
```

这会自动创建一个新的博客文章模板。

### 方法二：手动创建

1. 在 `src/content/blog/` 目录下创建一个新文件夹，例如 `my-first-post`
2. 在该文件夹中创建 `index.md` 文件
3. 添加以下 frontmatter：

```markdown
---
title: '我的第一篇文章'
publishDate: '2025-01-20'
description: '这是文章的简短描述'
tags:
  - 技术
  - 教程
language: 'Chinese'
---

这里是文章内容，使用 Markdown 格式编写。
```

### 文章 Frontmatter 说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 文章标题（最多60字符） |
| `description` | string | ✅ | 文章描述（最多160字符） |
| `publishDate` | date | ✅ | 发布日期 |
| `updatedDate` | date | ❌ | 更新日期 |
| `heroImage` | object | ❌ | 文章封面图 |
| `tags` | array | ❌ | 标签数组 |
| `language` | string | ❌ | 文章语言 |
| `draft` | boolean | ❌ | 是否为草稿（默认 false） |
| `comment` | boolean | ❌ | 是否启用评论（默认 true） |

### 文章示例

查看 `src/content/blog/工具纪元/index.md` 作为参考。

---

## 常用命令

```bash
# 开发服务器
bun dev

# 构建生产版本
bun run build

# 预览构建后的网站
bun preview

# 创建新文章
bun new

# 代码检查
bun check

# 格式化代码
bun format

# 代码检查并修复
bun lint

# 同步 Astro 配置
bun sync

# 清理构建文件
bun clean
```

---

## 目录结构说明

```
blog/
├── src/
│   ├── assets/          # 静态资源（图片、图标等）
│   ├── components/      # Astro 组件
│   ├── content/         # 内容文件
│   │   └── blog/        # 博客文章
│   ├── layouts/         # 页面布局
│   ├── pages/           # 页面路由
│   └── site.config.ts   # 网站配置文件 ⭐
├── public/              # 公共静态文件
│   ├── favicon/         # 网站图标
│   ├── fonts/           # 字体文件
│   └── images/          # 图片资源
└── package.json         # 项目依赖
```

---

## 自定义配置

### 1. 修改主题颜色

编辑 `public/styles/global.css` 或创建自定义 CSS 文件，并在 `site.config.ts` 中引入：

```typescript
customCss: [
  '/styles/custom.css'
]
```

### 2. 配置评论系统

在 `src/site.config.ts` 中配置 Waline：

```typescript
waline: {
  enable: true,
  server: 'https://your-waline-server.com/',
  emoji: ['bmoji', 'weibo'],
  additionalConfigs: {
    pageview: true,
    comment: true,
    locale: {
      reaction0: 'Like',
      placeholder: '欢迎评论...'
    }
  }
}
```

### 3. 配置搜索功能

搜索功能使用 Pagefind，在配置中启用：

```typescript
pagefind: true
```

### 4. 添加自定义页面

在 `src/pages/` 目录下创建新的 `.astro` 文件即可自动生成路由。

例如：创建 `src/pages/custom.astro` 会生成 `/custom` 页面。

### 5. 配置友情链接

在 `src/site.config.ts` 中配置：

```typescript
links: {
  logbook: [
    { date: '2025-01-20', content: '友链日志内容' }
  ],
  applyTip: [
    { name: 'Name', val: '你的网站名称' },
    { name: 'Desc', val: '网站描述' },
    { name: 'Link', val: 'your-domain.com' },
    { name: 'Avatar', val: 'https://example.com/avatar.png' }
  ],
  cacheAvatar: false // 是否缓存头像到 public/avatars/
}
```

### 6. 配置随机名言

在页脚显示随机名言：

```typescript
quote: {
  // Hitokoto API
  server: 'https://v1.hitokoto.cn/?c=i',
  target: `(data) => (data.hitokoto || 'Error')`
  
  // 或使用 DummyJSON
  // server: 'https://dummyjson.com/quotes/random',
  // target: `(data) => (data.quote.length > 80 ? \`\${data.quote.slice(0, 80)}...\` : data.quote || 'Error')`
}
```

### 7. 配置图片灯箱

使用 Mediumzoom 为图片添加缩放效果：

```typescript
mediumZoom: {
  enable: true,
  selector: '.prose .zoomable',
  options: {
    className: 'zoomable'
  }
}
```

在 Markdown 中使用时，为图片添加 `zoomable` class：

```markdown
![图片描述](./image.jpg){.zoomable}
```

---

## 部署

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 构建命令：`bun run build`
4. 输出目录：`dist`
5. 安装命令：`bun install`

### 部署到其他平台

构建命令和输出目录与 Vercel 相同，根据平台要求配置即可。

---

## 常见问题

### Q: 如何修改网站图标？

将新的图标文件放在 `public/favicon/` 目录下，并在 `site.config.ts` 中更新 `favicon` 路径。

### Q: 文章不显示怎么办？

检查以下几点：
1. frontmatter 格式是否正确
2. `draft` 是否为 `false`（草稿不会显示）
3. 文件路径是否正确（应在 `src/content/blog/` 下）
4. 文件扩展名是否为 `.md` 或 `.mdx`

### Q: 如何禁用某篇文章的评论？

在文章的 frontmatter 中设置：

```markdown
---
comment: false
---
```

### Q: 如何添加文章封面图？

在 frontmatter 中配置：

```markdown
---
heroImage:
  src: ./thumbnail.jpg
  alt: 封面图描述
---
```

### Q: 如何修改博客分页大小？

在 `src/site.config.ts` 中：

```typescript
content: {
  blogPageSize: 8  // 每页显示的文章数量
}
```

### Q: 如何添加新的导航菜单项？

在 `src/site.config.ts` 的 `header.menu` 中添加：

```typescript
header: {
  menu: [
    { title: '新页面', link: '/new-page' }
  ]
}
```

然后在 `src/pages/` 下创建对应的页面文件。

---

## 更多资源

- 📖 [官方文档](https://astro-pure.js.org/docs)
- 💬 [GitHub Issues](https://github.com/cworld1/astro-theme-pure/issues)
- 🌟 [示例展示](https://github.com/cworld1/astro-theme-pure/issues/10)
- 📦 [NPM 包](https://www.npmjs.com/package/astro-pure)

---

## 贡献

为了花更多时间编写代码，减少在空白上纠结的时间，本项目使用代码约定和样式来鼓励一致性。风格一致的代码更容易（且更不容易出错）进行审查、维护和理解。

## 鸣谢

- [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus)
- [Astro Resume](https://github.com/srleom/astro-theme-resume)
- [Starlight](https://github.com/withastro/starlight)

其他第三方参考资料在 [Docs#Contributions](https://astro-pure.js.org/docs/advanced/thanks) 上。感谢所有开源库。

## 许可证

本项目基于 Apache 2.0 许可证。

[![Star History Chart](https://api.star-history.com/svg?repos=cworld1/astro-theme-pure&type=Date)](https://star-history.com/#cworld1/astro-theme-pure&Date)
