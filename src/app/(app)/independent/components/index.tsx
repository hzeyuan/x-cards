"use client"
import { useEffect } from "react";
import { useCardStore, type XConfig } from "@src/hooks/useCardStore";
import { generateImage } from "@src/app/utils";
import { CardGenerator } from "../../components/card-generator";

export async function generateStaticParams() {
    return [{ slug: 'independent' }]
}

const Index = () => {
    useEffect(() => {
        const fn = async (event) => {

            // if (event.origin !== 'https://x-cards.net') return;
            const actionName = 'generate-card-local-request'
            if (event.data.action === actionName) {
                console.log('收到消息来自', event.data, event.origin);

                const body = event.data.body as XConfig;
                console.log('body', body);

                let XConfig = {
                    ...body,
                }
                // if has video ,extract video cover 
                if (body?.video) {
                    XConfig.images.push(body.video.poster)
                }
                useCardStore.getState().setXConfig({
                    ...body,
                })
                const dataUrl = await generateImage({
                    data: body,
                    format: 'png'
                });
                event.source.postMessage({
                    action: 'generate-card-local-response', value: {
                        url: body.url,
                        dataUrl: dataUrl
                    }
                }, event.origin);
            }
        }
        window.addEventListener('message', fn);

        return () => {
            window.removeEventListener('message', fn);
        }

    }, [])

    return (
        <CardGenerator></CardGenerator>
    );
}

export default Index;