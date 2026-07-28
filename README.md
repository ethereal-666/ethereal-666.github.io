# Ethereal's Blog

[![Blog](https://img.shields.io/badge/Blog-ethereal--666.github.io-6f8fc9?style=flat-square)](https://ethereal-666.github.io/)
[![Hexo](https://img.shields.io/badge/Hexo-8.1.2-0e83cd?style=flat-square&logo=hexo&logoColor=white)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-NexT.Gemini-333333?style=flat-square)](https://theme-next.js.org/)

这是我的个人技术博客，记录学习、实践与思考。

我希望把零散的经验整理成清楚、可信、可以再次验证的内容，也借此保留自己理解问题和持续成长的轨迹。

访问博客：[https://ethereal-666.github.io/](https://ethereal-666.github.io/)

## 写作方式

- 从真实问题出发，记录必要的过程与依据
- 尽量让结论清楚、可信并能够复现
- 对不确定保持克制，在理解变化后继续修订

## 最新记录

<!-- recent-posts:start -->
- [H&NCTF2026 Reverse Writeup](https://ethereal-666.github.io/2026/07/16/H-NCTF2026-Reverse/)
- [H&NCTF2026 Pwn Writeup](https://ethereal-666.github.io/2026/07/15/H-NCTF2026-Pwn/)
- [写在博客开始之前](https://ethereal-666.github.io/2026/07/15/about-this-blog/)
<!-- recent-posts:end -->

该列表由 Hexo 在生成网站时自动读取并更新，展示最近发布的 5 篇文章。

## 博客工程

博客基于 [Hexo](https://hexo.io/) 与 [NexT](https://theme-next.js.org/) 构建，使用 GitHub Pages 托管，并加入了文章分类、站点地图、搜索引擎验证、访问统计和基于 GitHub Issues 的评论功能。

主要内容位于 `source/_posts/`，站点配置位于 `_config.yml` 与 `_config.next.yml`，自定义样式和页面片段位于 `source/_data/`。

本地预览：

```bash
npm run server
```

完成写作后，一键生成并部署：

```bash
npm run publish
```

也可以使用对应的 Hexo 命令：

```bash
hexo clean
hexo generate
hexo deploy
```

生成网站时会同步更新 README 的最新文章列表与站点地图，无需手动维护。
