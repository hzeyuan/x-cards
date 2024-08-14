import React, { useEffect, useRef } from 'react'
import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo"
import 'tippy.js/dist/tippy.css';
import cssText from "data-text:@src/contents/plasmo-overlay.css"
import { Toaster } from 'react-hot-toast';
import { iframeMessageSystem } from '@src/app/utils/IFrameMessageSystem';
import { sendToBackground } from '@plasmohq/messaging';
import { useTweetsStore } from '@src/components/extension/use-tweet-collection';
export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
}


export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const getShadowHostId = () => "x-cards-overlay"

const PlasmoOverlay: React.FC<PlasmoCSUIProps> = ({ anchor }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const setIsActivated = useTweetsStore((state) => state.setIsActivated);

    const websiteURL = "https://x-cards.net/independent";
    // const websiteURL = "http://127.0.0.1:1947/independent";

    // console.log('websiteURL', websiteURL, process.env);

    useEffect(() => {
        console.log('PlasmoOverlay mounted');
        sendToBackground({
            name: 'code',
            body: {
                action: 'check',
            }
        }).then((data) => {
            if (!data) {
                setIsActivated(false);
                return;
            }
            const isNotActivated = data?.subscription_ended_at || data?.subscription_cancelled_at || data?.subscription_failed_at
            setIsActivated(!isNotActivated);
        }
        );
    }, [])

    useEffect(() => {
        const unsubscribe = iframeMessageSystem.subscribe('generate-card-local', (value: any) => {
        });

        return () => unsubscribe();
    }, []);


    return (
        <div>
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        display: "flex",
                        alignItems: "center",
                        background: "#333",
                        color: "#fff",
                        lineHeight: 1.3,
                        willChange: "transform",
                        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)",
                        maxWidth: "350px",
                        pointerEvents: "auto",
                        padding: "8px 10px",
                        borderRadius: "10px"
                    },
                }}
            />



            <iframe
                ref={iframeRef}
                id="x-card-ai"
                src={websiteURL}
                style={{
                    width: '100vw',
                    height: '0px',
                    border: 'none',
                    opacity: 0,
                }}
            />
        </div>
    )
}

export default PlasmoOverlay