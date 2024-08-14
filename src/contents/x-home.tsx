import cssText from "data-text:@src/contents/x.css"

import type { PlasmoCSConfig, PlasmoCSUIProps, PlasmoGetInlineAnchorList } from "plasmo"

import { CardButton } from "../components/extension/card-button";
import { useEffect, useRef } from "react";
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
    const l = [];
    targetSVGList.forEach((svg) => {
        const buttonElement = svg.closest('button')
        const li = buttonElement?.parentNode?.parentNode
        l.push(li)
    });
    return l;
}

const PlasmoInline: React.FC<PlasmoCSUIProps> = ({ anchor, }) => {

    const cardButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardButtonRef.current) {
            cardButtonRef.current.innerHTML = '';
            const newCardButton = document.createElement('div');
            cardButtonRef.current.appendChild(newCardButton);
            const root = createRoot(newCardButton);
            root.render(<CardButton anchor={anchor} />);
        }
    }, [anchor]);


    return (
        <div className="x-cards-button-group">
            <div ref={cardButtonRef}></div>
        </ div>
    )
}

export default PlasmoInline



