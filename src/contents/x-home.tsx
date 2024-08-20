import cssText from "data-text:@src/contents/x.css"

import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoGetInlineAnchorList } from "plasmo"

import { CardButton } from "../components/extension/card-button";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
    run_at: 'document_end'
}


export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => { // document.querySelector(`h1`)
    const targetSVGList = document.querySelectorAll('path[d^="M12 2.59l5.7 5.7-1.41 1"]');
    // console.log('getInlineAnchorList', targetSVGList)
    const l = [];
    targetSVGList.forEach((svg) => {
        const buttonElement = svg.closest('button')
        const li = buttonElement?.parentNode?.parentNode
        l.push({
            element: li,
            position: 'afterend',
        })
    });
    return l;
}


const PlasmoInline: React.FC<PlasmoCSUIProps> = ({ anchor, }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardButtonRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // 一旦可见就停止观察
                }
            },
            { threshold: 0.1 } // 当10%的元素可见时触发
        );

        if (cardButtonRef.current) {
            observer.observe(cardButtonRef.current);
        }

        return () => observer.disconnect();
    }, []);


    // useEffect(() => {
    //     if (isVisible && cardButtonRef.current) {
    //         const root = createRoot(cardButtonRef.current);
    //         root.render(<CardButton anchor={anchor} />);
    //     }
    // }, [isVisible]);

    // // return (
    // //     <div className="x-cards-button-group">
    // //         <CardButton anchor={anchor} />
    // //     </ div>
    // // )
    // return <div ref={cardButtonRef} style={{ minHeight: '20px' }} />
    return <CardButton anchor={anchor} />
}

export default PlasmoInline



