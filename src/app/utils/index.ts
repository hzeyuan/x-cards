import * as _ from 'lodash-es';

import { domToPng, domToJpeg, domToSvg, type Options, createContext, destroyContext } from 'modern-screenshot'
import type { XConfig } from '@src/hooks/useCardStore';
import { iframeMessageSystem } from './IFrameMessageSystem';
import { checkAppliedStyle, getAdjacentCellDiv, traverseAndCheck } from './element';



export function checkTheVerticalLine(element) {
  if (!element) return false;
  const styleProperties = [['width', '2px'], ['flex-grow', '1']];
  if (checkAppliedStyle(element, styleProperties)) return true;
  return false;
}


export const checkPostIsThread = (postElement) => {

  function isElementVisible(element) {
    const style = window.getComputedStyle(element);
    return style.height !== '0px';
  }

  const isThread = traverseAndCheck(postElement, (element) => { return checkTheVerticalLine(element) });
  let prePostIsThread = false;
  let prePost = getAdjacentCellDiv(postElement, 'previous');
  while (true) {
    if (!prePost) break;
    if (isElementVisible(prePost)) {
      // console.log('prePost', prePost);
      prePostIsThread = traverseAndCheck(prePost, (element) => { return checkTheVerticalLine(element) });
      break;
    }
    prePost = getAdjacentCellDiv(prePost, 'previous');
  }
  return isThread || prePostIsThread;
}

export const getPostThread = (postElement) => {
  // function isElementVisible(element) {
  //   const style = window.getComputedStyle(element);
  //   return style.height !== '0px';
  // }
  const isElementVisible = element => element.offsetHeight !== 0;


  // if (!isThread) return [postElement];

  const postThread = [postElement];
  let prePost = getAdjacentCellDiv(postElement, 'previous');

  while (true) {
    if (!prePost) break;
    if (isElementVisible(prePost)) {
      const prePostIsThread = traverseAndCheck(prePost, (element) => { return checkTheVerticalLine(element) });
      if (prePostIsThread) {
        postThread.unshift(prePost);
      } else {
        break
      }
    }
    prePost = getAdjacentCellDiv(prePost, 'previous');
  }

  // let nextPost = getAdjacentCellDiv(postElement, 'next');
  let nextPost = getAdjacentCellDiv(postElement, 'next');
  const isEndThread = !traverseAndCheck(postElement, (element) => { return checkTheVerticalLine(element) });
  console.log('isEndThread', isEndThread, postElement);
  if (isEndThread) {
    return postThread;
  }
  while (true) {
    if (!nextPost) break;
    if (isElementVisible(nextPost)) {
      const nextPostIsThread = traverseAndCheck(nextPost, (element) => { return checkTheVerticalLine(element) });
      console.log('nextPostIsThread', nextPostIsThread, nextPost);
      postThread.push(nextPost);
      if (!nextPostIsThread) {
        break;
      }
    }
    nextPost = getAdjacentCellDiv(nextPost, 'next');
  }

  return postThread;
}



export type CopyImage = (tweetInfo: XConfig | XConfig[], cardConfig: any) => Promise<string>;
export const copyImage: CopyImage = async (tweetInfo, cardConfig = {}) => {
  const format2Array = _.isArray(tweetInfo) ? tweetInfo : [tweetInfo];
  const value = await sendMessageToIframe('generate-card-local', {
    tweetInfo: format2Array,
    cardConfig
  }, 3000);

  const imageDataUrl = value.dataUrl;

  try {
    // Extract MIME type and base64 data from the data URL
    const [, mimeType, base64Data] = imageDataUrl.match(/^data:(.+);base64,(.+)$/);

    // Convert base64 to Blob more efficiently
    const blob = await fetch(imageDataUrl).then(res => res.blob());

    // Copy to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({
        [mimeType]: blob
      })
    ]);

    console.log('Image copied to clipboard successfully');
    return imageDataUrl;
  } catch (err) {
    console.error('Failed to copy image:', err);
  }
}


export const downloadImage = async (tweetInfo: XConfig | XConfig[], cardConfig = {}) => {

  const format2Array = _.isArray(tweetInfo) ? tweetInfo : [tweetInfo];

  const value = await sendMessageToIframe('generate-card-local', {
    tweetInfo: format2Array,
    cardConfig,
  }, 3000);
  const { url, dataUrl } = value;
  const xName = 'x-card'
  //  tweetInfo.username || 'x-card';
  const link = document.createElement('a');
  link.download = `${xName}.${cardConfig?.format || 'png'}`
  link.href = dataUrl;
  link.click();
}



export const sendMessageToIframe = async (name: string, data: any, timeout: number = 10000): Promise<any> => {
  const iframe = findXCardsIframe();
  if (!iframe || !iframe.contentWindow) {
    throw new Error('Invalid iframe');
  }
  try {
    const value = await iframeMessageSystem.publish(iframe, name, data, timeout);
    return value;
  } catch (error) {
    console.error('Error sending message to iframe:', error);
    throw error;
  }
};




export function extractTweetInfo(postElement) {
  const tweet: XConfig = {
    authorUrl: '',
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
  };

  // 提取头像
  tweet.avatar = postElement.querySelector('img[draggable="true"]')?.src;

  // 提取用户信息和时间
  const userInfoDiv = postElement.querySelector('[data-testid="User-Name"]');
  if (!userInfoDiv) return;

  const authorUrls = Array.from(userInfoDiv.querySelectorAll('[data-testid="User-Name"] a'))?.map(e => e.href);
  //console.log('authorUrls', authorUrls);

  //账号URL
  tweet.authorUrl = authorUrls.length > 0 ? authorUrls[0] : null;

  //帖子URL
  const xPostStatusUrls = Array.from(postElement.querySelectorAll('a[href*="/status/"]')).map(a => a.href);
  //console.log('xPostStatusUrls', xPostStatusUrls);
  tweet.url = xPostStatusUrls.length > 0 ? xPostStatusUrls[0] : null;

  tweet.username = userInfoDiv.querySelector('div[dir="ltr"]').textContent;
  let timeStr = userInfoDiv.querySelector('time')?.getAttribute('datetime');
  // console.log('timeStr', timeStr, postElement.querySelector('time'));
  tweet.time = new Date(timeStr).getTime() / 1000;
  if (/\/status\/\d+$/.test(window.location.href)) {
    timeStr = postElement.querySelector('time')?.getAttribute('datetime');
    console.log('timeStr', timeStr);
    if (timeStr) {
      tweet.time = new Date(timeStr).getTime() / 1000;
    }
  }


  // 提取文本内容
  // tweet.text = postElement.querySelector('[data-testid="tweetText"]').textContent;
  const tweetTextElement = postElement.querySelector('[data-testid="tweetText"]');
  tweet.text = tweetTextElement?.textContent || '';
  tweet.tags = [];
  tweetTextElement?.querySelectorAll('a[href^="/hashtag/"]').forEach(tag => {
    const tagText = tag.textContent;
    tweet.tags.push(tagText);
    tweet.text = tweet.text.replace(tagText, ''); // 从文本中移除标签
  });
  tweet.text = tweet.text.trim(); // 移除可能的多余空格


  // 提取图片（如果有）
  const images = _.compact([
    ...postElement.querySelectorAll('[data-testid="tweetPhoto"] img'),
    // ...postElement.querySelectorAll('[data-testid="tweetPhoto"] video')
  ]);
  tweet.images = Array.from(images).map(img => img.src);



  // 图片换成高清图，
  // https://pbs.twimg.com/media/GUjKHbca8AEeT7e?format=jpg&name=small
  // https://pbs.twimg.com/media/GUjKHbca8AEeT7e?format=jpg&name=large
  tweet.images = tweet.images.map(img => img.replace(/name=\w+/, 'name=large'));

  // console.log('tweet.images', tweet.images);

  // 提取视频（如果有）
  const video = postElement.querySelector('video');
  if (video) {
    tweet.video = {
      poster: video.poster,
      src: video.querySelector('source').src
    };
  }

  // 提取链接（如果有）
  const links = postElement.querySelectorAll('a[href^="https://"]') as NodeListOf<HTMLAnchorElement>;
  tweet.links = Array.from(links).map(link => ({
    href: link.href,
    text: link.textContent,
    src: link?.querySelector('img')?.src
  }));

  // 提取统计信息
  const stats = postElement.querySelector('[role="group"]');
  tweet.replies = stats.querySelector('[data-testid="reply"]').textContent || 0;
  tweet.shares = stats.querySelector('[data-testid="retweet"]').textContent || 0;
  tweet.likes = stats.querySelector('[data-testid="like"]').textContent || 0;
  // tweet.views = stats.querySelector('a[href$="/analytics"]').textContent;

  return tweet;
}

export const findXCardsIframe = () => {
  const shadowRoot = document.querySelector("xcards-ui")?.shadowRoot;
  if (!shadowRoot) throw new Error('Shadow root not found');

  const iframe = shadowRoot.getElementById('x-card-ai') as HTMLIFrameElement;
  if (!iframe) throw new Error('Iframe not found');
  return iframe;

}



