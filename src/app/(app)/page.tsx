"use client"
import React, { useEffect } from "react"
import * as _ from 'lodash-es';
import Hero from "./components/hero";
import { CardGenerator } from "./components/card-generator";
import { XForm } from "./components/x-form";

import { useCardStore, type XConfig } from "@src/hooks/useCardStore";
import { generateImage } from "../utils";


const HomePage = () => {

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
        <div className="relative h-full w-full bg-white">
            {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div> */}

            <div className="relative mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
                <div className="pt-8">
                    <Hero />
                </div>
                <XForm></XForm>
            </div>
            <div className="pt-12 ">
                <CardGenerator></CardGenerator>
            </div>
        </div>
    );
};

export default HomePage;