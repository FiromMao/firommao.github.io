# Firom's Blog

这是我的个人博客，基于 Astro 和 `astro-pure` 搭建。

这份 README 不再介绍模板特性，而是直接说明这个站点怎么使用、怎么写文章、怎么部署。

## 1. 环境要求

- Node.js 18+
- Bun

安装依赖：

```bash
bun install
```

## 2. 本地开发

启动开发服务器：

```bash
bun dev
```

如果想一边开发一边看类型检查：

```bash
bun run dev:check
```

默认本地地址通常是：

```text
http://localhost:4321
```

## 3. 常用命令

```bash
# 启动开发服务器
bun dev

# 同步 Astro 类型和内容索引
bun sync

# 仅做类型检查
bun check

# 自动修复可修复的 lint 问题
bun lint

# 格式化常见源码文件
bun format

# 完整构建
bun run build

# 预览构建结果
bun preview

# 清理构建产物
bun run clean

# 新建文章模板
bun new
```

## 4. 文章写在哪里

博客文章放在：

```text
src/content/blog/
```

目前仓库里只保留了实际需要的内容，示例文章和模板文档已经清掉了。

你可以直接新建一个目录，再放 `index.md` 或 `index.mdx`，例如：

```text
src/content/blog/my-first-post/index.md
```

## 5. 文章 Frontmatter 怎么写

最常用字段如下：

```md
---
title: My First Post
description: A short summary of the post.
publishDate: 2026-03-14
tags:
  - note
  - astro
draft: false
comment: false
---
```

说明：

- `title`：标题，必填
- `description`：摘要，必填
- `publishDate`：发布日期，必填
- `tags`：标签，可选
- `draft`：是否草稿，默认 `false`
- `comment`：是否显示评论，当前站点默认关闭 Waline，所以这个字段暂时不会生效

如果你要加头图，也可以用：

```md
heroImage:
  src: ./cover.jpg
  alt: cover
  color: '#7aa2f7'
```

## 6. 站点信息在哪里改

主要配置文件：

```text
src/site.config.ts
```

这里可以修改：

- 网站标题
- 作者名
- 网站描述
- 顶部导航
- 页脚社交链接
- 搜索、图片放大、评论等集成开关

另外，站点地址在：

```text
astro.config.ts
```

我已经把它改成：

```ts
site: 'https://firommao.github.io'
```

如果你之后换域名，记得一起改掉。

## 7. 静态资源放哪里

- 站点资源：`src/assets/`
- 公共文件：`public/`

常见例子：

- 头像：`src/assets/avatar.png`
- favicon：`public/favicon/`
- 社交分享图：`public/images/social-card.png`

## 8. 首页现在是什么结构

首页文件在：

```text
src/pages/index.astro
```

现在首页只保留了几块必要内容：

- 头像和简介
- 关注方向标签
- 最新文章列表

原模板里的示例项目、赞助、友链、占位文案、演示文章都已经移除了。

## 9. 评论系统说明

当前 `Waline` 已经默认关闭，避免直接连到模板里留下的第三方服务。

如果你以后要启用评论，需要去 `src/site.config.ts` 里把：

```ts
waline: {
  enable: false,
  server: ''
}
```

改成你自己的 Waline 服务地址。

## 10. 部署前建议检查

提交前建议至少运行：

```bash
bun lint
bun check
bun run build
```

如果三步都通过，基本就可以部署了。

## 11. 部署

这个项目目前适合直接部署到 Vercel。

最简单流程：

1. 把仓库推到 GitHub
2. 在 Vercel 导入这个仓库
3. 构建命令使用默认配置即可
4. 部署完成后检查首页、文章页、归档页、搜索页是否正常

如果你用自己的域名，记得同步修改 `astro.config.ts` 里的 `site`。

## 12. 现在仓库里还保留了什么

保留的主要是博客真正需要的部分：

- 文章系统
- 标签页和归档页
- RSS
- 搜索
- UnoCSS / Astro / TypeScript 配置
- 站点基础布局和样式

如果你后面还想继续瘦身，优先看这几个地方：

- `src/components/waline/`：如果确定永远不用评论，可以继续删
- `public/images/social-card.png`：换成你自己的分享图
- `src/site.config.ts`：补全更准确的站点信息
