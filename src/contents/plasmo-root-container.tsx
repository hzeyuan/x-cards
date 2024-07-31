import cssText from "data-text:@src/contents/x.css"

import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetInlineAnchorList, PlasmoGetOverlayAnchor } from "plasmo"
import sonner from "sonner"
import { sendToBackground } from '@plasmohq/messaging';
import { useCallback, useEffect, useRef, useState } from "react";

export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
}



export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}



// export const getInlineAnchor: PlasmoGetInlineAnchor = async () => { // document.querySelector(`h1`)
//     const targetSVG = document.querySelectorAll('path[d^="M12 2.59l5.7 5.7-1.41 1"]');
//     // console.log('targetSVG', targetSVG)
//     // 往上找到第一个父类的button
//     const buttonElement = targetSVG && targetSVG.closest('button')
//     // console.log('buttonElement', buttonElement);
//     const li = buttonElement?.parentNode?.parentNode
//     //在li的统层级下添加一个div

//     // console.log('li', li);
//     return li
// }

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => { // document.querySelector(`h1`)
    const targetSVGList = document.querySelectorAll('path[d^="M12 2.59l5.7 5.7-1.41 1"]');
    // console.log('targetSVG', targetSVG)
    // 往上找到第一个父类的button
    // const buttonElement = targetSVG && targetSVG.closest('button')
    // console.log('buttonElement', buttonElement);
    // const li = buttonElement?.parentNode?.parentNode
    //在li的统层级下添加一个div
    const l = [];
    targetSVGList.forEach((svg) => {
        const buttonElement = svg.closest('button')
        const li = buttonElement?.parentNode?.parentNode
        l.push(li)
    });
    // console.log('li', li);
    return l;
}

// export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () => { // document.querySelector(`h1`)
//     const targetSVG = document.querySelector('path[d^="M12 2.59l5.7 5.7-1.41 1"]');
//     // console.log('targetSVG', targetSVG)
//     // 往上找到第一个父类的button
//     const buttonElement = targetSVG && targetSVG.closest('button')
//     // console.log('buttonElement', buttonElement);
//     const li = buttonElement?.parentNode?.parentNode
//     //在li的统层级下添加一个div

//     // console.log('li', li);
//     return li
// }




const PlasmoInline = ({ anchor }) => {

    const [isLoading, setIsLoading] = useState(false);
    const tweetUrlRef = useRef(null);
    const handleMessage = useCallback((event) => {
        try {
            const { url, dataUrl } = event.data?.value || {};
            // console.log('tweetUrlRef.current', tweetUrlRef.current, url);
            if (event.data.action === 'generate-card-local-response' && tweetUrlRef.current === url) {
                console.log('Received data from iframe:', event.data.value);
                downloadImage(dataUrl);
                setIsLoading(false);
            }
        } catch (error) {

        }

    }, []);

    useEffect(() => {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [handleMessage]);

    const downloadImage = (dataUrl) => {
        const link = document.createElement('a');
        link.download = `export.png`;
        link.href = dataUrl;
        link.click();
    };

    const getTweetUrl = (cardHeaderPanelNode) => {
        const tweetUrlsEle = cardHeaderPanelNode.querySelectorAll('a');
        const urls = Array.from(tweetUrlsEle).map((ele) => ele.href);
        console.log('tweetUrls', urls);
        return urls.find((url) => url.includes('status'));
    };

    const sendMessageToIframe = (iframe, data) => {
        iframe.contentWindow.postMessage({
            action: 'generate-card-local-request',
            body: data,
        }, '*');
    };

    const handleClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);

        try {
            console.log('click');
            const shadowRoot = document.querySelector("plasmo-csui")?.shadowRoot;
            if (!shadowRoot) throw new Error('Shadow root not found');

            const iframe = shadowRoot.getElementById('x-card-ai') as HTMLIFrameElement;
            if (!iframe) throw new Error('Iframe not found');

            const cardFooterPanelNode = anchor.element.parentNode.parentNode.parentNode;
            const cardInfoPanelNodeList = cardFooterPanelNode.parentNode.childNodes;
            const cardHeaderPanelNode = cardInfoPanelNodeList[0];

            const tweetUrl = getTweetUrl(cardHeaderPanelNode);
            tweetUrlRef.current = tweetUrl;
            console.log('tweetUrl', tweetUrl);
            if (!tweetUrl) throw new Error('Tweet URL not found');
            const res = await sendToBackground({
                name: 'tweet',
                body: {
                    action: 'get-tweet',
                    url: tweetUrl
                }
            });

            if (res.error) throw new Error(res.error);

            console.log('Background response:', res);
            sendMessageToIframe(iframe, {
                url: tweetUrl,
                ...res,
            });
        } catch (error) {
            console.error("Error generating card:", error);
            setIsLoading(false);
        }
    }



    return (
        <div
            className="x"
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log('click');
                handleClick(e);
                // sonner.toast('click');
            }}
            style={{
                justifyContent: "inherit",
                display: "inline-grid",
                padding: "4px",
                transform: "rotate(0deg) scale(1) translate3d(0px, 0px, 0px)"
            }}
        >
            <button className="x card-button"
            >
                <div
                    dir="ltr"
                    style={{ textOverflow: "unset" }}
                >
                    {isLoading ? (
                        <svg className="animate-spin" width="22.5" height="22.5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg
                            style={{
                                width: '22.5px',
                                height: '22.5px',
                                verticalAlign: 'text-bottom',

                            }}
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            width={22.5}
                            height={22.5}
                        >
                            <path
                                d="M843.7 263.4l-157-99.4c-2.9-1.9-6-3.5-9-5-11.5-20.7-31.2-36.6-56-42.6L459.2 77.3C445.8 68.9 429.9 64 412.8 64H227c-48.3 0-87.4 39.2-87.4 87.4V785c0 48.3 39.1 87.4 87.4 87.4h67.4l116.8 74c40.8 25.8 94.8 13.7 120.6-27.1l339-535.4c25.9-40.7 13.7-94.7-27.1-120.5zM205.1 680.3v-507c0-24.1 19.6-43.7 43.7-43.7H338c-.9 2.6-1.7 5.2-2.3 8L205.1 680.3zm189.2-506.2c5.6-23.5 29.2-37.9 52.7-32.3l133.4 32.1c-5.3 5-10.1 10.7-14.2 17.2L282.5 639.2l111.8-465.1zm409.5 193.3L488.2 865.9c-12.9 20.4-39.9 26.4-60.3 13.5l-120.1-76c-20.4-12.9-26.5-39.9-13.5-60.3l315.6-498.4c12.9-20.4 39.9-26.5 60.3-13.6l120.1 76c20.3 12.9 26.4 39.9 13.5 60.3zM428.7 716.6h-8.1c-21.5 0-39 17.4-39 39v8.1c0 21.5 17.5 39 39 39h8.1c21.5 0 39-17.4 39-39v-8.1c0-21.6-17.5-39-39-39z"
                                fill="rgb(113, 118, 123)"
                            />
                        </svg>
                    )}

                </div>
            </button>
        </div>

    )
}

export default PlasmoInline
