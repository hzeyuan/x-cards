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
            // 安全性检查：确保消息来自预期的源
            // if (event.origin !== 'https://x-cards.net') return;
            const actionName = 'generate-card-local-request'
            if (event.data.action === actionName) {
                console.log('收到消息来自', event.data, event.origin);
                // console.log('event.data.messageId', event.data.messageId, lastProcessedMessageId)
                // lastProcessedMessageId = event.data.messageId;
                const body = event.data.body as XConfig;
                console.log('body', body);
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