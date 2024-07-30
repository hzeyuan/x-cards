import * as _ from 'lodash-es';

import { toPng, toJpeg, toSvg } from 'html-to-image';




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

export  const generateImage = async (type: string) => {
  const cardEle = document.querySelector('#card') as HTMLElement;

  try {
    let dataUrl;
    switch (type) {
      case 'png':
        dataUrl = await toPng(cardEle, { quality: 0.95 });
        break;
      case 'jpeg':
        dataUrl = await toJpeg(cardEle, { quality: 0.95 });
        break;
      case 'svg':
        dataUrl = await toSvg(cardEle);
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

export  const copyImage = async () => {
  try {
    const dataUrl = await generateImage('png');
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

export  const exportImage = async (type) => {
  // if (!ref.current) return;


  try {
    const dataUrl = await generateImage(type);
    const link = document.createElement('a');
    link.download = `export.${type}`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Error exporting image:', err);
  }
};