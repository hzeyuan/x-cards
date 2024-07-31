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



function extractNodeInfo(node) {
  let results = [];

  // 递归函数，用于处理单个节点
  function traverse(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node;

      // 如果节点是图片，提取src
      if (element.tagName === "IMG") {
        const img = element as HTMLImageElement;
        results.push({ type: "image", src: img.src, alt: img.alt || "" });
      }

      // 遍历并处理所有子节点
      element.childNodes.forEach(child => traverse(child));
    } else if (node.nodeType === Node.TEXT_NODE) {
      // 提取文本节点的内容
      const textContent = node.textContent?.trim();
      if (textContent) {
        results.push({ type: "text", content: textContent });
      }
    }
  }

  // 开始遍历传入的节点
  traverse(node);

  return results;
}

export const generateImage = async (options: {
  data?: XConfig,
  format: string
}) => {

  const { format, data } = options;
  //await all images to load
  console.log('data', data);
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
        dataUrl = await toPng(cardEle, { quality: 0.95, pixelRatio: 2 });
        break;
      case 'jpeg':
        dataUrl = await toJpeg(cardEle, { quality: 0.95, pixelRatio: 2 });
        break;
      case 'svg':
        dataUrl = await toSvg(cardEle, { quality: 0.95, pixelRatio: 2 });
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