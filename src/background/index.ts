import { sendToContentScript } from "@plasmohq/messaging"


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkInstallation") {
        // 直接回复 content script
        sendResponse({ isInstalled: true });
    }
});



// console.log('background script loaded');

// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         console.log(details.url);
//         if (details.url.includes('video.twimg.com/amplify_video')) {
//             // 解析 URL,提取视频片段信息
//             // 下载视频片段
//             // 存储视频片段
//         }
//     },
//     { urls: ["https://video.twimg.com/amplify_video/*"] }
// );