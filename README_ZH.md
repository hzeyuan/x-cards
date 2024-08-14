<a name="readme-top"></a>

<div align="center">
<img src="assets/icon.png" width="32" >
<h1>X Cards</h1>

[English](README.md) | [中文](README_ZH.md)

[![x-cards intro](https://img.youtube.com/vi/v8iQV8ZoVBk/0.jpg)](https://www.youtube.com/watch?v=v8iQV8ZoVBk)

轻松的X平台上使用x-cards


[![][vercel-shield]][vercel-link]

[![][share-x-shield]][share-x-link]
[![][share-whatsapp-shield]][share-whatsapp-link]
[![][share-reddit-shield]][share-reddit-link]
[![][share-weibo-shield]][share-weibo-link]

[![][share-linkedin-shield]][share-linkedin-link]

[github-issues-link]: https://github.com/hzeyuan/x-cards/issues
[github-contributors-shield]: https://img.shields.io/github/contributors/hzeyuan/OpenGPTS?color=c4f042&labelColor=black&style=flat-square
[github-contributors-link]: https://github.com/hzeyuan/OpenGPTS/graphs/contributors
[vercel-link]: https://x-cards.net
[vercel-shield]: https://img.shields.io/website?down_message=offline&label=vercel&labelColor=black&logo=vercel&style=flat-square&up_message=online&url=https://x-cards.net
[share-linkedin-link]: https://linkedin.com/feed
[share-linkedin-shield]: https://img.shields.io/badge/-share%20on%20linkedin-black?labelColor=black&logo=linkedin&logoColor=white&style=flat-square
[share-reddit-link]: https://www.reddit.com/submit?title=x-cards&url=https://github.com/hzeyuan/x-cards
[share-reddit-shield]: https://img.shields.io/badge/-share%20on%20reddit-black?labelColor=black&logo=reddit&logoColor=white&style=flat-square
[share-telegram-link]: https://t.me/share/url?text=x-cards&url=https://github.com/hzeyuan/x-cards
[share-telegram-shield]: https://img.shields.io/badge/-share%20on%20telegram-black?labelColor=black&logo=telegram&logoColor=white&style=flat-square
[share-weibo-link]: http://service.weibo.com/share/share.php?sharesource=weibo&title=x-cards
[share-weibo-shield]: https://img.shields.io/badge/-share%20on%20weibo-black?labelColor=black&logo=sinaweibo&logoColor=white&style=flat-square
[share-whatsapp-link]: https://api.whatsapp.com/send?text=x-cards
[share-whatsapp-shield]: https://img.shields.io/badge/-share%20on%20whatsapp-black?labelColor=black&logo=whatsapp&logoColor=white&style=flat-square
[share-x-link]: https://x.com/intent/tweet?hashtags=chatbot%2CchatGPT%2CopenAI&url=https://github.com/hzeyuan/x-cards
[share-x-shield]: https://img.shields.io/badge/-share%20on%20x-black?labelColor=black&logo=x&logoColor=white&style=flat-square

</div>

⚡ **X Cards** Share X anywhere ,any format,

## 项目背景

X是许多平台的信息来源，因此产生了这个项目。


## Changelog

<details>
<summary><strong>v0.0.2</strong></summary>

* 新增实时预览功能，现在右上角有个toast可以观察到生成的卡片。
* 引入了自定义卡片背景颜色。
* 可自定义卡片宽度。
* 改进：现在点击默认复制图片，而不是下载图片。
* 修复了视频获取封面图的问题。
* 增加了连续帖子获取的支持。
* 实现了帖子的动态添加、删除、拖拽和管理。

</details>

<details>
<summary><strong>v0.0.1</strong></summary>

* 点击即可轻松访问。
* 获取视频、图片、文本、点赞等。
* 导出多种格式，包括JSON、Markdown、PNG、JPEG和SVG。

</details>


## features

* 简单易用，只需点击一下即生成卡片。
* 轻松获取视频、图片、文字、点赞和浏览历史。
* 支持多种格式导出，包括JSON、Markdown、PNG、JPEG和SVG。
* 模板功能，保存您经常使用的卡片样式。


<br/>

## How to Use

1. 点击下载插件
![Download Extension](./assets/install_guide/1.download.png)

2. 浏览器输入 chrome://extensions/ 并打开开发者模式

3. 解压并，拖动整个文件夹到页面，如图：
![Drag the extension file to the page](./assets/install_guide/2.install.png)

4. 打开x.com并浏览帖子，您将在右下角找到您的卡片按钮，参考上方视频。


## 开发指南

本项目使用 Plasmo 框架进行快速 Chrome 扩展开发。
使用 Next.js 进行前端开发。
采用 Tailwind CSS 和 Shadcn 作为 CSS 框架。
使用 Langchain 开发智能代理。
部署在 Vercel 平台上。

Local development:

```bash
pnpm install

# Run frontend
npm run dev:next
# Run plugin
npm run dev:plasmo
```


## Starchart

[![Star History Chart](https://api.star-history.com/svg?repos=hzeyuan/x-cards&type=Date)](https://star-history.com/#hzeyuan/x-cards&Date)
