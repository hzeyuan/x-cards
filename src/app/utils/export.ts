import type {XConfig} from "@src/hooks/useCardStore";

import JSZip from 'jszip';
import {saveAs} from 'file-saver';


export const tweet2Markdown = (tweetData: XConfig[]) => {
    const mdArray = tweetData.map((tweet) => {
        const {
            authorUrl,
            username,
            time,
            text,
            url,
            likes,
            shares,
            replies,
            video,
            images
        } = tweet;

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

        //账号URL
        markdownContent += `[${username}](${authorUrl})\n\n`;

        //帖子URL
        const displayText = text.replace(/\n/g, '').length > 100
            ? `${text.replace(/\n/g, '').substring(0, 100)}...`
            : text.replace(/\n/g, '');
        markdownContent += `[${displayText}](${url})\n\n`;

        markdownContent += `--- \n\n`;
        markdownContent += `**Stats**\n\n`;
        markdownContent += `Likes: ${likes}\n`;
        markdownContent += `Shares: ${shares}\n`;
        markdownContent += `Replies: ${replies}\n\n`;

        // 创建并下载 Markdown 文件

        return markdownContent;
    });
    return mdArray.join('\n\n');
};


export const exportAsAsset = async (tweetData: XConfig) => {

    const {username, images, video, text} = tweetData;

    // 创建一个新的 JSZip 实例
    const zip = new JSZip();

    // 辅助函数：获取高清图片URL
    const getHighQualityImageUrl = (url) => {
        // 移除已有的尺寸参数
        let baseUrl = url.split('?')[0];
        // 添加 'large' 参数来获取高质量版本
        return `${baseUrl}?format=jpg&name=large`;
    };

    try {
        // 添加文本内容到 zip
        zip.file("tweet_text.txt", text);

        // 下载并添加图片到 zip
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                const highQualityUrl = getHighQualityImageUrl(images[i]);
                const response = await fetch(highQualityUrl);
                if (!response.ok) {
                    console.warn(`Failed to fetch high quality image, falling back to original URL for image ${i + 1}`);
                    // 如果高清版获取失败，尝试原始URL
                    const fallbackResponse = await fetch(images[i]);
                    if (!fallbackResponse.ok) throw new Error(`HTTP error! status: ${fallbackResponse.status}`);
                    const blob = await fallbackResponse.blob();
                    zip.file(`image_${i + 1}.jpg`, blob);
                } else {
                    const blob = await response.blob();
                    zip.file(`image_${i + 1}.jpg`, blob);
                }
            }
        }

        // 下载并添加视频到 zip
        if (video?.src) {
            const response = await fetch(video.src);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const blob = await response.blob();
            zip.file("video.mp4", blob);
        }

        // 生成 zip 文件
        const content = await zip.generateAsync({type: "blob"});

        const zipName = '' || `twwet_assets_${username || 'none'}_${text.slice(0, 15)}`;
        // 使用 file-saver 保存文件
        saveAs(content, `${zipName}.zip`);

        console.log('Export completed successfully');
    } catch (error) {
        console.error('Export failed', error);
        throw error; // 重新抛出错误，允许调用者处理它
    }
};


export const exportAsJSON = async (data: Object) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tweetInfo.json'; // 设置下载的文件名
    document.body.appendChild(a); // 必须将a元素添加到文档中才能触发点击
    a.click();
    document.body.removeChild(a); // 下载后从文档中移除a元素
    URL.revokeObjectURL(url); // 清理创建的URL对象
}