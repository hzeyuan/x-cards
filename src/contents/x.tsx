import cssText from "data-text:@src/contents/x.css"

import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetInlineAnchorList, PlasmoGetOverlayAnchor } from "plasmo"
// import sonner from "sonner"
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@components/ui/use-toast";
import type { XConfig } from "@src/hooks/useCardStore";
import { extractTweetInfo } from "@src/app/utils";
import pRetry from 'p-retry';
export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
}



export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}


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



const PlasmoInline = ({ anchor }) => {

    const [isLoading, setIsLoading] = useState(false);
    const tweetInfoRef = useRef<XConfig>(null);
    const iframeLoadedCompletedRef = useRef(false);
    const { toast } = useToast()
    const handleMessage = useCallback((event) => {
        try {
            const { url, dataUrl } = event.data?.value || {};
            if (event.data.action === 'generate-card-local-response' && tweetInfoRef.current?.url === url) {
                console.log('Received data from iframe:', event.data.value);
                downloadImage(dataUrl);
                toast({
                    style: {
                        border: 'none',
                        background: '#07bc0c',
                        color: '#fff',
                    },
                    title: 'Card generated',
                    description: 'The card has been generated and downloaded.',
                });
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
        const xName = tweetInfoRef.current.text.slice(0, 10) || 'x-card';
        link.download = `${xName}.png`
        link.href = dataUrl;
        link.click();
    };


    const sendMessageToIframe = (iframe, data, timeout = 10000) => {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error('Iframe message timeout'));
            }, timeout);

            const handleResponse = (event) => {
                const url = tweetInfoRef.current.url;
                if (event.data.action === 'generate-card-local-response' && tweetInfoRef.current?.url === url) {
                    clearTimeout(timeoutId);
                    window.removeEventListener('message', handleResponse);
                    resolve(event.data.value);
                }
            };

            window.addEventListener('message', handleResponse);

            iframe.contentWindow.postMessage({
                action: 'generate-card-local-request',
                body: {
                    ...data,
                }
            }, '*');
        });
    };



    const handleClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const articleElement = anchor.element.closest('article[data-testid="tweet"]');
        const tweetInfo = extractTweetInfo(articleElement);
        console.log(tweetInfo);
        tweetInfoRef.current = tweetInfo;

        if (isLoading) return;
        setIsLoading(true);
        try {
            const shadowRoot = document.querySelector("plasmo-csui")?.shadowRoot;
            if (!shadowRoot) throw new Error('Shadow root not found');

            const iframe = shadowRoot.getElementById('x-card-ai') as HTMLIFrameElement;
            if (!iframe) throw new Error('Iframe not found');


            console.log('Sending message to iframe:', tweetInfo);
            await pRetry(async () => {
                await sendMessageToIframe(iframe, {
                    ...tweetInfo,
                }, 5000)
            }, {
                retries: 3,
            }).catch(err => {
                console.error('Error sending message to iframe:', err);
                toast({
                    title: 'Card generation failed',
                    description: 'An error occurred while generating the card.',
                    variant: 'destructive'
                });
                setIsLoading(false);
            })


            // sendMessageToIframe(iframe, {
            //     ...tweetInfo,
            // }, 10000)
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
                        <svg
                            className="animate-spin"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                            width={22.5}
                            height={22.5}
                        >
                            <path
                                d="M512 128a384 384 0 01384 384 384 384 0 01-384 384 384 384 0 01-384-384 384 384 0 01384-384zm0 115.2a268.8 268.8 0 100 537.6 268.8 268.8 0 000-537.6z"
                                fillOpacity={0.05}
                            />
                            <path
                                d="M781.696 794.24A390.272 390.272 0 00229.76 242.304a58.539 58.539 0 0082.773 82.773 273.195 273.195 0 11386.39 386.39 58.539 58.539 0 0082.773 82.773z"
                                fill="#768294"
                            />
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


