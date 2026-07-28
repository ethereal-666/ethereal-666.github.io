# Ethereal's Blog

[![Blog](https://img.shields.io/badge/Blog-ethereal--666.github.io-6f8fc9?style=flat-square)](https://ethereal-666.github.io/)
[![Hexo](https://img.shields.io/badge/Hexo-8.1.2-0e83cd?style=flat-square&logo=hexo&logoColor=white)](https://hexo.io/)
[![Theme](https://img.shields.io/badge/Theme-NexT.Gemini-333333?style=flat-square)](https://theme-next.js.org/)

我的个人博客源码，用来整理学习过程中的技术笔记、CTF 题解、项目实践、环境配置和日常随笔。

博客地址：[https://ethereal-666.github.io/](https://ethereal-666.github.io/)

## 内容方向

- CTF 比赛题解与复盘
- Pwn、Reverse 等安全技术学习记录
- 项目实践与环境配置
- 学习总结和日常随笔

## 近期文章

- [H&NCTF2026 Reverse Writeup：Hexgate、PatrolNote、ezvm 等题解](https://ethereal-666.github.io/2026/07/16/H-NCTF2026-Reverse/)
- [H&NCTF2026 Pwn Writeup：ezstack、expz1、ezpz2 等题解](https://ethereal-666.github.io/2026/07/15/H-NCTF2026-Pwn/)
- [写在博客开始之前](https://ethereal-666.github.io/2026/07/15/about-this-blog/)

## 技术栈

- [Hexo](https://hexo.io/)：静态博客生成器
- [NexT](https://theme-next.js.org/)：博客主题，使用 Gemini 布局
- [GitHub Pages](https://pages.github.com/)：网站托管
- [Utterances](https://utteranc.es/)：基于 GitHub Issues 的评论系统
- Busuanzi：文章与站点访问量统计

## 本地运行

安装依赖：

```bash
npm install
```

启动本地预览：

```bash
npm run server
```

默认访问地址为 `http://localhost:4000/`。

## 写作与发布

新建文章：

```bash
npx hexo new post "文章标题"
```

文章文件位于 `source/_posts/`。完成写作后，清理缓存并重新生成网站：

```bash
npm run clean
npm run build
```

确认本地显示正常后部署：

```bash
npm run deploy
```

以上命令分别等价于常用的：

```bash
hexo clean
hexo generate
hexo deploy
```

其中 `hexo generate` 可以简写为 `hexo g`，`hexo deploy` 可以简写为 `hexo d`。

## 项目结构

```text
.
|-- source/
|   |-- _posts/          # 博客文章
|   |-- _data/           # 自定义页面、样式和页脚
|   `-- images/          # 站点图片
|-- scaffolds/           # Hexo 文章模板
|-- _config.yml          # Hexo 站点配置
|-- _config.next.yml     # NexT 主题配置
`-- package.json         # 项目依赖与常用命令
```

站点地图会在生成网站时自动更新，无需手动编辑。发布重要新文章后，可以在 Google Search Console 和 Bing Webmaster Tools 中提交文章地址，以便搜索引擎更快发现内容。
