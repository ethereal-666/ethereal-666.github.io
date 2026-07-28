# Ethereal's Blog

[![Blog](https://img.shields.io/badge/Blog-ethereal--666.github.io-7863a4?style=flat-square)](https://ethereal-666.github.io/)
[![Hexo](https://img.shields.io/badge/Hexo-8.1.2-0e83cd?style=flat-square&logo=hexo&logoColor=white)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-Ethereal-b7a2df?style=flat-square)](./themes/ethereal/)

这是我的个人技术博客，用于整理学习、实践与思考，让零散经验逐渐形成清晰、可信并可再次验证的记录。

访问博客：[https://ethereal-666.github.io/](https://ethereal-666.github.io/)

## 联系方式

- GitHub：[@ethereal-666](https://github.com/ethereal-666)
- QQ 邮箱：[2366956317@qq.com](mailto:2366956317@qq.com)
- 学校邮箱：[2024311311@stu.hit.edu.cn](mailto:2024311311@stu.hit.edu.cn)

## 最新记录

<!-- recent-posts:start -->
- [H&NCTF2026 Reverse Writeup](https://ethereal-666.github.io/2026/07/16/H-NCTF2026-Reverse/)
- [H&NCTF2026 Pwn Writeup](https://ethereal-666.github.io/2026/07/15/H-NCTF2026-Pwn/)
- [写在博客开始之前](https://ethereal-666.github.io/2026/07/15/about-this-blog/)
<!-- recent-posts:end -->

该列表由 Hexo 在生成网站时自动更新，默认展示最近发布的 5 篇文章。

## 博客工程

博客使用 [Hexo](https://hexo.io/) 生成静态页面，并由 GitHub Pages 托管。前端使用仓库内自建的 `ethereal` 主题，不依赖 NexT 或其他第三方 Hexo 主题。

项目保留了文章分类与标签、归档、站点地图、搜索引擎验证、访问统计以及基于 GitHub Issues 的 Utterances 评论功能。

```text
blog/
├─ _config.yml                 # Hexo 站点、链接、生成和部署配置
├─ source/
│  ├─ _posts/                  # Markdown 文章及文章图片
│  ├─ about/                   # 关于页面
│  ├─ categories/              # 分类入口页面
│  ├─ tags/                    # 标签入口页面
│  └─ images/                  # 头像等公共图片
├─ themes/ethereal/
│  ├─ _config.yml              # 联系方式、导航、评论和主题功能配置
│  ├─ layout/                  # EJS 页面模板
│  └─ source/
│     ├─ css/main.css          # 明暗配色、布局与响应式样式
│     └─ js/theme.js           # 主题切换、目录、动画和图片预览
├─ scripts/copy-readme.js      # 自动更新 README 的最新文章
└─ package.json                # 构建命令与 Hexo 依赖
```

## 常用修改

| 修改内容 | 文件 |
| --- | --- |
| 首页标题、首页各区域文字 | `themes/ethereal/layout/index.ejs` |
| 首页联系方式、导航、评论仓库 | `themes/ethereal/_config.yml` |
| 顶部导航结构 | `themes/ethereal/layout/_partial/header.ejs` |
| 页脚文字 | `themes/ethereal/layout/_partial/footer.ejs` |
| 文章页面与右侧目录 | `themes/ethereal/layout/post.ejs` |
| 分类、标签和归档页面 | `themes/ethereal/layout/page.ejs`、`category.ejs`、`tag.ejs`、`archive.ejs` |
| 淡紫色变量、字号、间距和手机布局 | `themes/ethereal/source/css/main.css` |
| 目录折叠、主题切换和页面动画 | `themes/ethereal/source/js/theme.js` |
| 博客名称、描述、网址和部署分支 | `_config.yml` |

修改 CSS 配色时，优先调整 `main.css` 顶部 `:root` 和 `html[data-theme='dark']` 中的变量，避免逐项查找颜色。

## 使用方式

本地预览：

```bash
npm run server
```

清理、生成并部署：

```bash
npm run publish
```

也可以使用对应的 Hexo 命令：

```bash
hexo clean
hexo generate
hexo deploy
```

`public/`、`db.json`、`node_modules/` 和 `.deploy_git/` 都是生成目录或本地缓存，不应直接修改。
