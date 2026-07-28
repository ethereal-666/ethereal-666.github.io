# Ethereal's Blog

[![Blog](https://img.shields.io/badge/Blog-ethereal--666.github.io-6f8fc9?style=flat-square)](https://ethereal-666.github.io/)
[![Hexo](https://img.shields.io/badge/Hexo-8.1.2-0e83cd?style=flat-square&logo=hexo&logoColor=white)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-NexT.Gemini-333333?style=flat-square)](https://theme-next.js.org/)

这是我的个人技术博客，也是一个持续更新的公开学习档案。

我希望把零散的阅读、实验和项目经历整理成可以回顾、验证和复用的知识：不仅记录“做出了什么”，也尽量说明问题如何被发现、思路如何形成，以及结论为什么成立。随着学习逐步深入，这个仓库也会持续呈现我的技术兴趣、思考方式和成长轨迹。

访问博客：[https://ethereal-666.github.io/](https://ethereal-666.github.io/)

## 关注方向

- 计算机基础、程序设计与系统原理
- 工具链、开发环境与工程效率
- 项目实践、实验记录与问题排查
- 技术资料阅读、概念梳理与方法总结
- 阶段复盘，以及对新方向的探索

博客也会保留少量安全实践和竞赛记录。它们是检验知识、训练分析能力的具体场景，而不是这个博客的全部。

## 写作原则

- 从真实问题出发，交代必要的背景和约束
- 保留分析过程、失败尝试和关键判断
- 尽量提供可复现的步骤，而不只给出最终结论
- 对不确定的内容保持克制，并在理解变化后持续修订

## 最新记录

<!-- recent-posts:start -->
- [H&NCTF2026 Reverse Writeup](https://ethereal-666.github.io/2026/07/16/H-NCTF2026-Reverse/)
- [H&NCTF2026 Pwn Writeup](https://ethereal-666.github.io/2026/07/15/H-NCTF2026-Pwn/)
- [关于这份长期技术记录](https://ethereal-666.github.io/2026/07/15/about-this-blog/)
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
