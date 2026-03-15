# Firom's Blog

这是这个站点的日常使用说明。

重点不是介绍模板，而是告诉你：

- 平时怎么启动和构建
- 博客文章写在哪里
- About / Projects / Links 这些页面改哪里
- 站点标题、导航、评论、搜索这些功能在哪配

## 1. 环境要求

- Node.js 18+
- Bun

安装依赖：

```bash
bun install
```

## 2. 常用命令

```bash
# 本地开发
bun dev

# 开发时同时跑 Astro 检查
bun run dev:check

# 同步 Astro 内容与类型
bun sync

# 类型检查
bun check

# 自动修复可修复 lint 问题
bun lint

# 格式化
bun format

# 完整构建
bun run build

# 预览构建结果
bun preview

# 清理构建产物
bun run clean

# 生成新文章模板
bun new
```

日常改完内容后，至少建议跑：

```bash
bun check
bun run build
```

如果改了结构、组件或配置，建议再加上：

```bash
bun lint
```

## 3. 目录总览

最常用的目录和文件：

```text
src/
  assets/              站点资源，比如头像
  components/          组件
  content/blog/        博客文章
  layouts/             页面布局
  pages/               页面路由
  site.config.ts       站点主配置
  content.config.ts    博客 frontmatter schema

public/
  favicon/             favicon
  images/              公共图片，比如社交分享图
  links.json           友情链接数据

astro.config.ts        Astro / 部署配置
package.json           脚本命令
AGENTS.md              给代码代理的仓库说明
```

## 4. 首页改哪里

首页文件：

```text
src/pages/index.astro
```

当前首页主要包含：

- 头像
- 简介
- 关注方向标签
- 最新文章列表

如果你想改首页文案、按钮、模块顺序，直接改这个文件。

首页头像目前来自：

```text
src/assets/avatar.png
```

## 5. 博客文章怎么写

博客文章都放在：

```text
src/content/blog/
```

推荐每篇文章单独建一个目录，例如：

```text
src/content/blog/my-first-post/index.md
```

如果文章需要封面图或正文图片，就把图片也放在同一个目录里，例如：

```text
src/content/blog/my-first-post/
  index.md
  cover.jpg
  figure-1.png
```

### 文章 frontmatter

博客文章的字段规则定义在：

```text
src/content.config.ts
```

当前支持的主要字段：

```md
---
title: My First Post
description: A short summary of the post.
publishDate: 2026-03-15
updatedDate: 2026-03-16
tags:
  - astro
  - notes
language: en
draft: false
comment: false
heroImage:
  src: ./cover.jpg
  alt: cover
  color: '#7aa2f7'
---
```

字段说明：

- `title`：标题，必填，最多 60 字符
- `description`：摘要，必填，最多 160 字符
- `publishDate`：发布日期，必填
- `updatedDate`：更新日期，可选
- `tags`：标签数组，可选；会自动转小写并去重
- `language`：语言标记，可选
- `draft`：是否草稿，默认 `false`
- `comment`：是否启用评论，默认 `true`，但当前站点整体 Waline 关闭，所以暂时不会显示
- `heroImage`：头图，可选

### Markdown 还是 MDX

都可以：

- 普通文章：`index.md`
- 需要 JSX/组件时：`index.mdx`

### 图片怎么写

如果图片在文章目录里，可以这样写：

```md
![说明](./figure-1.png)
```

RSS 也会尝试处理文章目录内的图片路径。

### 草稿文章

如果文章还不想公开：

```md
draft: true
```

## 6. 博客列表、文章页、标签、归档分别在哪里

这些页面基本不需要日常改，但知道位置会方便很多：

- 博客列表页：`src/pages/blog/[...page].astro`
- 单篇文章页：`src/pages/blog/[...id].astro`
- 归档页：`src/pages/archives/index.astro`
- 标签页：`src/pages/tags/`
- 搜索页：`src/pages/search/index.astro`
- RSS：`src/pages/rss.xml.ts`

如果你只是写文章，不需要动这些文件。

## 7. About 页面改哪里

About 页面文件：

```text
src/pages/about/index.astro
```

适合放：

- 个人简介
- 研究/兴趣方向
- 站点说明

如果你要把它改成更详细的个人介绍页，直接改这个文件即可。

## 8. Projects 页面改哪里

Projects 页面文件：

```text
src/pages/projects/index.astro
```

现在这页是轻量占位版，你可以把它改成：

- 项目列表
- 开源仓库导航
- 课程项目
- 实验记录入口

如果项目变多，建议把结构拆成组件，比如：

```text
src/components/projects/
```

然后在 `src/pages/projects/index.astro` 里引用。

## 9. Links 页面改哪里

Links 页面的模板文件：

```text
src/pages/links/index.astro
```

友情链接数据文件：

```text
public/links.json
```

当前 `links.json` 结构示例：

```json
{
  "friends": [
    {
      "id_name": "friends",
      "desc": "Sites I read and recommend",
      "link_list": []
    },
    {
      "id_name": "special-links",
      "desc": "Useful places around the indie web",
      "link_list": []
    }
  ]
}
```

每个链接项可以写成：

```json
{
  "name": "Example Blog",
  "intro": "A blog about chips and notes",
  "link": "https://example.com",
  "avatar": "https://example.com/avatar.png"
}
```

如果只是维护友链，通常只需要改 `public/links.json`。

## 10. Site Policy 页面改哪里

页面文件：

```text
src/pages/terms/list.astro
```

目前它只是一个轻量说明页。

如果以后你要补完整的：

- 隐私政策
- 转载说明
- 使用条款

可以继续在 `src/pages/terms/` 下增加新页面，并从 `list.astro` 链过去。

## 11. 站点标题、描述、导航、页脚改哪里

主配置文件：

```text
src/site.config.ts
```

这里最常改的是：

- `theme.title`：站点标题
- `theme.author`：作者名
- `theme.description`：站点描述
- `theme.header.menu`：顶部导航
- `theme.footer.links`：页脚链接
- `theme.footer.social`：社交链接
- `theme.content.blogPageSize`：博客分页大小

例如导航就是这里控制的：

```ts
header: {
  menu: [
    { title: 'Blog', link: '/blog' },
    { title: 'Projects', link: '/projects' },
    { title: 'Links', link: '/links' },
    { title: 'About', link: '/about' }
  ]
}
```

## 12. 搜索、评论、图片放大这些功能在哪开关

也是在：

```text
src/site.config.ts
```

### 搜索

```ts
integ.pagefind
```

- `true`：启用搜索
- `false`：关闭搜索

搜索页本身在：`src/pages/search/index.astro`

### 评论系统 Waline

```ts
integ.waline
```

当前是关闭状态：

```ts
waline: {
  enable: false,
  server: ''
}
```

如果以后要启用：

- 把 `enable` 改成 `true`
- 把 `server` 改成你自己的 Waline 服务地址

### 图片缩放

```ts
integ.mediumZoom
```

当前已经启用。

如果想让文章里的图片支持放大，正文图片通常加 `zoomable` 类即可。

## 13. 站点地址和部署配置改哪里

文件：

```text
astro.config.ts
```

当前站点地址：

```ts
site: 'https://firommao.top'
```

如果以后换自定义域名，记得这里也要一起改。

当前项目走的是 Vercel 方案，并使用：

- `@astrojs/vercel`
- `output: 'server'`

所以它不是 GitHub Pages 的静态导出配置。

## 14. 社交分享图、favicon、头像改哪里

- 头像：`src/assets/avatar.png`
- 社交分享图：`public/images/social-card.png`
- favicon：`public/favicon/`

这三个是最值得优先换成你自己素材的。

## 15. RSS 和外部订阅

RSS 文件入口：

```text
src/pages/rss.xml.ts
```

一般不需要手改；只要博客文章内容正常，RSS 会自动生成。

## 16. 日常维护建议

最常见的工作流大概就是：

### 写新文章

1. 在 `src/content/blog/` 下新建文章目录
2. 写 `index.md` 或 `index.mdx`
3. 补 frontmatter
4. 本地运行 `bun dev`
5. 提交前跑 `bun check && bun run build`

### 改首页或导航

1. 改 `src/pages/index.astro` 或 `src/site.config.ts`
2. 本地看效果
3. 跑 `bun check && bun run build`

### 加友情链接

1. 改 `public/links.json`
2. 本地打开 `/links` 看显示是否正常
3. 提交

### 改个人介绍 / 项目页

1. 改 `src/pages/about/index.astro` 或 `src/pages/projects/index.astro`
2. 本地预览
3. 提交

## 17. 当前站点状态

目前仓库已经做过一轮清理：

- 模板示例文章已删除
- 模板 docs 已删除
- 演示赞助/占位资源已删除
- About / Projects / Links / Site Policy 这些功能页保留，但内容已改成轻量自用版
- README 已改成站点使用说明

如果后面继续定制，最优先的通常是：

- 把首页文案进一步改成你自己的风格
- 给 Projects 页面补真实内容
- 给 Links 页面填真实友链
- 替换头像和分享图
