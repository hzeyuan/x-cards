import cssText from "data-text:@src/contents/x.css"

import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoGetInlineAnchorList } from "plasmo"
// import sonner from "sonner"
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@components/ui/use-toast";
import type { XConfig } from "@src/hooks/useCardStore";
import { exportAsMarkdown, extractTweetInfo } from "@src/app/utils";
import pRetry from 'p-retry';

import { sendToBackground } from "@plasmohq/messaging";
import { DynamicStyleTippyComponent } from "@src/app/(app)/components/dynamic-style-tippy";
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
    const l = [];
    targetSVGList.forEach((svg) => {
        const buttonElement = svg.closest('button')
        const li = buttonElement?.parentNode?.parentNode
        l.push(li)
    });
    return l;
}

const PlasmoInline: React.FC<PlasmoCSUIProps> = ({ anchor }) => {

    const [isLoading, setIsLoading] = useState(false);
    const tweetInfoRef = useRef<XConfig>(null);
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


    const handleGetCardTemplates = useCallback(async () => {
        const templates = await sendToBackground({
            name: 'tweet',
            body: {
                action: 'get-card-templates'
            }
        });
        console.log('templates', templates);
    }, []);

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        handleGetCardTemplates();

        return () => window.removeEventListener('message', handleMessage);

    }, [handleMessage]);

    const downloadImage = (dataUrl) => {
        const link = document.createElement('a');
        const xName = tweetInfoRef.current.text.slice(0, 10) || 'x-card';
        link.download = `${xName}.png`
        link.href = dataUrl;
        link.click();
    };


    const exportAsJSON = async () => {
        const articleElement = anchor.element.closest('article[data-testid="tweet"]');
        const tweetInfo = extractTweetInfo(articleElement);
        const jsonContent = JSON.stringify(tweetInfo, null, 2); // 使用2个空格进行缩进
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tweetInfo.json'; // 设置下载的文件名
        document.body.appendChild(a); // 必须将a元素添加到文档中才能触发点击
        a.click();
        document.body.removeChild(a); // 下载后从文档中移除a元素
        URL.revokeObjectURL(url); // 清理创建的URL对象
    }

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
        console.log('click');
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

        } catch (error) {
            console.error("Error generating card:", error);
            setIsLoading(false);
        }
    }


    const menuContent = (
        <div className="dropdown-menu">
            <ul className="dropdown-menu-list">
                <li className="dropdown-menu-item"
                    onClick={() => {
                        alert('coming soon')
                    }}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                    >
                        <path
                            d="M843.7 263.4l-157-99.4c-2.9-1.9-6-3.5-9-5-11.5-20.7-31.2-36.6-56-42.6L459.2 77.3C445.8 68.9 429.9 64 412.8 64H227c-48.3 0-87.4 39.2-87.4 87.4V785c0 48.3 39.1 87.4 87.4 87.4h67.4l116.8 74c40.8 25.8 94.8 13.7 120.6-27.1l339-535.4c25.9-40.7 13.7-94.7-27.1-120.5zM205.1 680.3v-507c0-24.1 19.6-43.7 43.7-43.7H338c-.9 2.6-1.7 5.2-2.3 8L205.1 680.3zm189.2-506.2c5.6-23.5 29.2-37.9 52.7-32.3l133.4 32.1c-5.3 5-10.1 10.7-14.2 17.2L282.5 639.2l111.8-465.1zm409.5 193.3L488.2 865.9c-12.9 20.4-39.9 26.4-60.3 13.5l-120.1-76c-20.4-12.9-26.5-39.9-13.5-60.3l315.6-498.4c12.9-20.4 39.9-26.5 60.3-13.6l120.1 76c20.3 12.9 26.4 39.9 13.5 60.3zM428.7 716.6h-8.1c-21.5 0-39 17.4-39 39v8.1c0 21.5 17.5 39 39 39h8.1c21.5 0 39-17.4 39-39v-8.1c0-21.6-17.5-39-39-39z"
                            fill="white"
                        />
                    </svg>
                    make card  template
                </li>
                <div className="dropdown-menu-separator" />
                <li className="dropdown-menu-item"
                    onClick={() => {
                        const articleElement = anchor.element.closest('article[data-testid="tweet"]');
                        const tweetInfo = extractTweetInfo(articleElement);
                        exportAsMarkdown(tweetInfo)
                    }}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        width={256}
                        height={256}
                    >
                        <path
                            d="M901.689 227.556H122.31a65.82 65.82 0 00-65.422 65.422v437.475a65.934 65.934 0 0065.422 65.991H901.12a65.422 65.422 0 0065.422-65.422V292.978a64.967 64.967 0 00-64.853-65.422zm-332.8 455.11H455.11V512l-85.333 109.227L284.444 512v170.667H170.667V341.333h113.777l85.334 113.778 85.333-113.778H568.89v341.334zm170.098 28.445L597.333 512h85.334V341.333h113.777V512h85.334z"
                            fill="#EA7130"
                        />
                    </svg>
                    Export as Markdown
                </li>
                <li className="dropdown-menu-item"
                    onClick={exportAsJSON}
                >
                    <svg
                        className="icon"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        width={256}
                        height={256}
                    >
                        <path
                            d="M384 190.976V128h-5.76c-20.032 0-39.424 3.968-58.176 11.84a149.12 149.12 0 00-49.6 33.92 142.72 142.72 0 00-31.552 48.192v.064a226.688 226.688 0 00-12.672 53.12v.128a389.12 389.12 0 00-1.536 55.232c.768 18.56 1.152 37.12 1.152 55.616 0 12.992-2.56 25.152-7.488 36.608v.064a96.256 96.256 0 01-48.96 50.368 88.064 88.064 0 01-35.712 7.36H128v62.976h5.76c12.48 0 24.32 2.56 35.584 7.744l.064.064c11.392 4.992 21.056 11.776 29.12 20.352l.128.128c8.32 8.32 14.912 18.24 19.648 29.76l.064.128c4.992 11.52 7.488 23.552 7.488 36.224 0 18.56-.384 37.12-1.152 55.616-.768 18.944-.256 37.44 1.536 55.68v.064a228.771 228.771 0 0012.608 52.736v.064c6.784 17.472 17.344 33.536 31.616 48.192 14.272 14.72 30.848 26.048 49.6 33.92 18.752 7.872 38.144 11.84 58.24 11.84H384v-62.976h-5.76c-12.736 0-24.768-2.432-35.968-7.36a103.232 103.232 0 01-29.248-20.48 106.176 106.176 0 01-19.776-29.888c-4.736-11.52-7.04-23.68-7.04-36.672 0-14.592.192-28.992.704-43.008.512-14.592.512-28.8 0-42.56a296.896 296.896 0 00-3.52-40.96 171.648 171.648 0 00-10.752-38.976A146.176 146.176 0 00225.408 512a146.176 146.176 0 0047.232-61.12c5.12-12.288 8.64-25.152 10.752-38.528 2.112-13.44 3.264-27.072 3.52-40.96.512-14.08.512-28.288 0-42.624-.512-14.336-.768-28.8-.768-43.392a94.08 94.08 0 0156.128-86.656 85.12 85.12 0 0136.032-7.744H384zm256 642.048V896h5.76c20.032 0 39.424-3.968 58.176-11.84 18.752-7.872 35.328-19.2 49.6-33.92 14.272-14.72 24.832-30.72 31.552-48.192v-.064c6.4-17.024 10.56-34.752 12.672-53.12v-.128c1.792-17.92 2.304-36.288 1.536-55.232-.768-18.56-1.152-37.12-1.152-55.616 0-12.992 2.56-25.152 7.488-36.608v-.064a96.256 96.256 0 0148.96-50.368c11.264-4.928 23.168-7.36 35.712-7.36H896v-62.976h-5.76c-12.48 0-24.32-2.56-35.584-7.744l-.064-.064a88.064 88.064 0 01-29.12-20.352l-.128-.128a90.496 90.496 0 01-19.648-29.76l-.064-.128a89.92 89.92 0 01-7.488-36.224c0-18.56.384-37.12 1.152-55.616a396.16 396.16 0 00-1.536-55.68v-.064a226.688 226.688 0 00-12.608-52.736v-.064a142.72 142.72 0 00-31.616-48.192 149.12 149.12 0 00-49.6-33.92 148.8 148.8 0 00-58.24-11.84H640v62.976h5.76c12.8 0 24.704 2.432 35.968 7.36 11.136 5.248 20.864 12.032 29.248 20.48 8.128 8.576 14.72 18.56 19.776 29.888 4.736 11.52 7.04 23.68 7.04 36.672 0 14.592-.192 28.928-.704 43.008-.512 14.592-.512 28.8 0 42.56.256 14.208 1.408 27.84 3.52 40.96 2.112 13.696 5.696 26.624 10.752 38.976A146.048 146.048 0 00798.592 512a146.048 146.048 0 00-47.232 61.12 172.8 172.8 0 00-10.752 38.528c-2.112 13.44-3.264 27.072-3.52 40.96a591.588 591.588 0 000 42.624c.512 14.336.768 28.8.768 43.392a94.08 94.08 0 01-26.88 66.24 93.824 93.824 0 01-29.248 20.416 85.12 85.12 0 01-36.032 7.744H640z"
                            fill="#1296db"
                        />
                    </svg>
                    Export as JSON
                </li>
                <li className="dropdown-menu-item"
                    onClick={handleClick}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        width={256}
                        height={256}
                    >
                        <path
                            fill="white"
                            d="M839.68 787.2V148.685A71.68 71.68 0 00768 77.005H270.438a71.68 71.68 0 00-71.68 71.68v638.464zm-641.382 33.075v45.261a71.68 71.68 0 0071.68 71.68h497.561a71.68 71.68 0 0071.68-71.68v-45.26z" />
                    </svg>
                    Export as Card
                </li>
            </ul>
        </div>

    );

    return (

        <DynamicStyleTippyComponent content={menuContent}>

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

        </DynamicStyleTippyComponent>
    )
}

export default PlasmoInline



