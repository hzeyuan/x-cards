<a name="readme-top"></a>

<div align="center">
<img src="assets/icon.png" width="32" >
<h1>Bookmarks AI</h1>

[Youtube](https://youtu.be/N_WBvHpVFQU)

[![][vercel-shield]][vercel-link]

[![][share-x-shield]][share-x-link]
[![][share-whatsapp-shield]][share-whatsapp-link]
[![][share-reddit-shield]][share-reddit-link]
[![][share-weibo-shield]][share-weibo-link]

[![][share-linkedin-shield]][share-linkedin-link]


[github-issues-link]: https://github.com/hzeyuan/bookmarksAI/issues
[github-contributors-shield]: https://img.shields.io/github/contributors/hzeyuan/OpenGPTS?color=c4f042&labelColor=black&style=flat-square
[github-contributors-link]: https://github.com/hzeyuan/OpenGPTS/graphs/contributors


[vercel-link]: https://bookmarks-ai.vercel.app
[vercel-shield]: https://img.shields.io/website?down_message=offline&label=vercel&labelColor=black&logo=vercel&style=flat-square&up_message=online&url=https://bookmarks-ai.vercel.app
[share-linkedin-link]: https://linkedin.com/feed
[share-linkedin-shield]: https://img.shields.io/badge/-share%20on%20linkedin-black?labelColor=black&logo=linkedin&logoColor=white&style=flat-square


[share-reddit-link]: https://www.reddit.com/submit?title=bookmarksAI&url=https://github.com/hzeyuan/bookmarksAI
[share-reddit-shield]: https://img.shields.io/badge/-share%20on%20reddit-black?labelColor=black&logo=reddit&logoColor=white&style=flat-square
[share-telegram-link]: https://t.me/share/url?text=bookmarksAI&url=https://github.com/hzeyuan/bookmarksAI
[share-telegram-shield]: https://img.shields.io/badge/-share%20on%20telegram-black?labelColor=black&logo=telegram&logoColor=white&style=flat-square
[share-weibo-link]: http://service.weibo.com/share/share.php?sharesource=weibo&title=bookmarksAI
[share-weibo-shield]: https://img.shields.io/badge/-share%20on%20weibo-black?labelColor=black&logo=sinaweibo&logoColor=white&style=flat-square
[share-whatsapp-link]: https://api.whatsapp.com/send?text=bookmarksAI
[share-whatsapp-shield]: https://img.shields.io/badge/-share%20on%20whatsapp-black?labelColor=black&logo=whatsapp&logoColor=white&style=flat-square
[share-x-link]: https://x.com/intent/tweet?hashtags=chatbot%2CchatGPT%2CopenAI&url=https://github.com/hzeyuan/bookmarksAI
[share-x-shield]: https://img.shields.io/badge/-share%20on%20x-black?labelColor=black&logo=x&logoColor=white&style=flat-square

</div>


⚡ **Bookmarks AI** is a tool that uses AI to organize and record your bookmarks. 

## Project Background

<div align="center">
<img src="assets/ai-auto-organize-bookmarks.gif" width="600" >
</div>






1. Messy bookmarks? Struggle is real!
2. too many websites to remember and find later!
3. chat ui and Chrome history are separate, and it's a hassle to toggle between them, I hope AI can know what website I looked at a minute ago。
4. Integrating your browser history, ensuring your data is yours alone, and creating a personalized AI just for you.



<strong>If you also face these challenges:</strong>
<br/>
a tool is required to organize bookmarks, keep track of daily websites, and provide easy access to desired sites



## How to Works

1. Obtain your bookmark list through a plugin.
2. Use AI(gpt4o-mini) to analyze and create an outline, establishing a new directory structure.

3. For each bookmark, perform the following operations:
   a. Use AI analysis to add tags to the bookmark.
   b. Use AI analysis to categorize the bookmark.

This process continues until all bookmarks are organized.

4. Synchronize the organized bookmark list to your browser through the plugin.

5. Display: Use beautiful charts to show various information analyzed from the bookmarks.

This information is known only to you and won't be leaked. In the future, you can feed it to your own AI, making the AI understand you better, rather than being generic.

## [How to Use ](https://bookmarks-ai.vercel.app/extension)

1. Install the plugin
2. Fill in your key,we use gpt4o-mini
3. Click run

## Roadmap

1. Analyze daily browsing history and provide a daily reading report.
2. Query function to quickly find the website you want.
3. Data export, allowing export in Q&A format for easy model training.
4. chrome history graph RAG

## Development Guide

1. The project uses the Plasmo framework for rapid Chrome extension development.
2. Uses Next.js for frontend development.
3. Tailwind CSS and Shadcn as CSS frameworks.
4. Langchain for developing agents.
5. Deployed on Vercel.

Local development:

```bash
pnpm install

# Run frontend
npm run dev:next
# Run plugin
npm run dev:plasmo
```



## References

* Bookmarks Manager from [pintree](https://github.com/Pintree-io/pintree)


## Starchart

[![Star History Chart](https://api.star-history.com/svg?repos=hzeyuan/bookmarksAI&type=Date)](https://star-history.com/#hzeyuan/bookmarksAI&Date)

