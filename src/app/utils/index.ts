import * as _ from 'lodash-es';

import { toPng, toJpeg, toSvg } from 'html-to-image';
import type { XConfig } from '@src/hooks/useCardStore';
import { sendToBackground } from '@plasmohq/messaging';




export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000); // 将秒转换为毫秒

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // 转换为12小时制
  const formattedHours = hours % 12 || 12;

  // 确保分钟是两位数
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${formattedHours}:${formattedMinutes} ${ampm} · ${day} ${month}, ${year}`;
}


export const generateImage = async (options: {
  data?: XConfig,
  format: string
}) => {

  const { format, data } = options;
  //await all images to load
  if (data?.images.length > 0) {
    await Promise.all(data.images.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
    );
  }

  const cardEle = document.querySelector('#card') as HTMLElement;
  console.log('cardEle', cardEle, format);
  try {
    let dataUrl;
    switch (format) {
      case 'png':
        dataUrl = await toPng(cardEle, { quality: 0.95, pixelRatio: 2, width: cardEle.offsetWidth, height: cardEle.offsetHeight });
        break;
      case 'jpeg':
        dataUrl = await toJpeg(cardEle, { quality: 0.95, width: cardEle.offsetWidth, height: cardEle.offsetHeight });
        break;
      case 'svg':
        dataUrl = await toSvg(cardEle, { quality: 0.95, width: cardEle.offsetWidth, height: cardEle.offsetHeight });
        break;
      default:
        throw new Error('Unsupported format');
    }
    return dataUrl;
  } catch (err) {
    console.error('Error exporting image:', err);
    return 'error' + err.message
  }
}

export const copyImage = async (format: string) => {
  try {
    const dataUrl = await generateImage({
      format: format,
    });
    const img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img);
    document.execCommand('copy');
    document.body.removeChild(img);
  } catch (err) {

    console.error('Error copying image:', err
    );
  }
}

export const exportImage = async (format: string) => {
  try {
    const dataUrl = await generateImage({
      format: format,
    });
    const link = document.createElement('a');
    link.download = `export.${format}`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Error exporting image:', err);
  }
};


export function extractTweetInfo(articleElement) {
  const tweet: XConfig = {
    url: '',
    avatar: "",
    username: "",
    time: 0,
    text: "",
    tags: [],
    images: [],
    links: [],
    shares: 0,
    replies: 0,
    likes: 0,
    // views: 0,
  };

  // 提取头像
  tweet.avatar = articleElement.querySelector('img[draggable="true"]').src;

  // 提取用户信息和时间
  const userInfoDiv = articleElement.querySelector('[data-testid="User-Name"]');


  const urls = Array.from(userInfoDiv.querySelectorAll('[data-testid="User-Name"] a'))?.map(e => e.href);
  const XPostUrl = urls.find((url) => url.includes('status'));
  tweet.url = XPostUrl;
  tweet.username = userInfoDiv.querySelector('div[dir="ltr"]').textContent;
  // tweet.handle = userInfoDiv.querySelector('div[dir="ltr"] + div[dir="ltr"]').textContent;
  const timeStr = userInfoDiv.querySelector('time').getAttribute('datetime');
  if (timeStr) {
    tweet.time = new Date(timeStr).getTime() / 1000;
  }

  // 提取文本内容
  // tweet.text = articleElement.querySelector('[data-testid="tweetText"]').textContent;
  const tweetTextElement = articleElement.querySelector('[data-testid="tweetText"]');
  tweet.text = tweetTextElement?.textContent || '';
  tweet.tags = [];
  tweetTextElement.querySelectorAll('a[href^="/hashtag/"]').forEach(tag => {
    const tagText = tag.textContent;
    tweet.tags.push(tagText);
    tweet.text = tweet.text.replace(tagText, ''); // 从文本中移除标签
  });
  tweet.text = tweet.text.trim(); // 移除可能的多余空格


  // 提取图片（如果有）
  const images = articleElement.querySelectorAll('[data-testid="tweetPhoto"] img');
  tweet.images = Array.from(images).map(img => img.src);

  // 提取视频（如果有）
  const video = articleElement.querySelector('video');
  if (video) {
    tweet.video = {
      poster: video.poster,
      src: video.querySelector('source').src
    };
  }

  // 提取链接（如果有）
  const links = articleElement.querySelectorAll('a[href^="https://"]');
  tweet.links = Array.from(links).map(link => ({
    href: link.href,
    text: link.textContent
  }));

  // 提取统计信息
  const stats = articleElement.querySelector('[role="group"]');
  tweet.replies = stats.querySelector('[data-testid="reply"]').textContent || 0;
  tweet.shares = stats.querySelector('[data-testid="retweet"]').textContent || 0;
  tweet.likes = stats.querySelector('[data-testid="like"]').textContent || 0;
  // tweet.views = stats.querySelector('a[href$="/analytics"]').textContent;

  return tweet;
}

export const exportAsMarkdown = (tweetData) => {
  const {
    username,
    time,
    text,
    likes,
    shares,
    replies,
    video,
    images
  } = tweetData;

  const formattedDate = new Date(time * 1000).toLocaleString();

  let markdownContent = `# Tweet by ${username}\n\n`;
  markdownContent += `*Posted on ${formattedDate}*\n\n`;
  markdownContent += `${text}\n\n`;

  if (video && video.poster) {
    markdownContent += `![Video Thumbnail](${video.poster})\n\n`;
    markdownContent += `*This tweet contains a video*\n\n`;
  }

  if (images && images.length > 0) {
    images.forEach((img, index) => {
      markdownContent += `![Image ${index + 1}](${img})\n\n`;
    });
  }

  markdownContent += `--- \n\n`;
  markdownContent += `**Stats**\n\n`;
  markdownContent += `Likes: ${likes}\n`;
  markdownContent += `Shares: ${shares}\n`;
  markdownContent += `Replies: ${replies}\n\n`;

  // 创建并下载 Markdown 文件
  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tweet_${username}_${time}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return markdownContent; // 返回生成的Markdown内容，以便在需要时使用
};


// const getTweetUrl = async (cardHeaderPanelNode) => {
//   const tweetUrlsEle = cardHeaderPanelNode.querySelectorAll('a');
//   const urls = Array.from(tweetUrlsEle).map((ele) => ele.href);
//   console.log('tweetUrls', urls);
//   return urls.find((url) => url.includes('status'));
// };

// export async function requestTweetForServer(root: HTMLElement) {
//   const cardFooterPanelNode = anchor.element.parentNode.parentNode.parentNode;
//   const cardInfoPanelNodeList = cardFooterPanelNode.parentNode.childNodes;
//   const cardHeaderPanelNode = cardInfoPanelNodeList[0];

//   const tweetUrl = getTweetUrl(cardHeaderPanelNode);
//   if (!tweetUrl) throw new Error('Tweet URL not found');
//   console.log('tweetUrl', tweetUrl);
//   const res = await sendToBackground({
//     name: 'tweet',
//     body: {
//       action: 'get-tweet',
//       url: tweetUrl
//     }
//   });

//   if (res.error) throw new Error(res.error);
//   // tweetUrlRef.current = tweetUrl;
//   // tweetInfoRef.current = res;
//   console.log('Background response:', res);
// }