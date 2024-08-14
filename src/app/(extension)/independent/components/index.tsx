"use client"
import { useEffect, useRef } from "react";
import { useCardStore, type XConfig } from "@src/hooks/useCardStore";
import { generateImage } from "@src/app/utils";
import { CardGenerator } from "../../../(app)/components/card-generator";
import * as _ from "lodash-es"
import { create } from "zustand";



export async function generateStaticParams() {
    return [{ slug: 'independent' }]
}

const Index = () => {

    useEffect(() => {
        const fn = async (event) => {
            // if (event.origin !== 'https://x-cards.net') return;
            const actionName = 'generate-card-local'
            if (event.data.action === actionName) {
                console.log('收到消息来自', event.data, event.origin);

                const body = event.data.body as {
                    tweetInfo: XConfig[],
                    cardConfig: any,
                }
                const { tweetInfo, cardConfig } = body;
                useCardStore.getState().setXConfig(tweetInfo)

                if (cardConfig?.colorIndex) {
                    useCardStore.getState().setColorIndex(cardConfig.colorIndex);
                }
                if (cardConfig?.style) {
                    useCardStore.getState().updateCardStyles({
                        style: cardConfig.style || 'posts',
                    });
                }
                if (cardConfig?.width) {
                    useCardStore.getState().updateCardStyles({
                        width: cardConfig.width,
                        // height: cardConfig.height
                    });
                }

                const loadedImages = useCardStore.getState().loadedImages;
                const images = _.flatten(tweetInfo.map((tweet) => tweet.images));
                let allImagesLoaded = _.every(images, (src) => loadedImages[src] === 'success' || loadedImages[src] === 'error');
                // console.log('本次等待加载的图片', images);
                while (!allImagesLoaded) {
                    // console.log('等待图片加载完成', loadedImages);
                    allImagesLoaded = _.every(images, (src) => loadedImages[src] === 'success' || loadedImages[src] === 'error');
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }

                requestAnimationFrame(async () => {
                    const dataUrl = await generateImage({
                        data: tweetInfo,
                        format: cardConfig?.format || 'png',
                    });
                    if (event.source && event.source.postMessage) {
                        event.source.postMessage({
                            action: 'generate-card-local', value: {
                                dataUrl: dataUrl
                            } 
                        }, event.origin);
                    }
                });
            }
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('message', fn);

            return () => {
                window.removeEventListener('message', fn);
            }
        }
    }, [])

    return (
        <CardGenerator></CardGenerator>
    );
}

export default Index;