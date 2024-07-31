import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
}



const PlasmoOverlay = ({ anchor }: PlasmoCSUIProps) => {

    return (
        <iframe
            id="x-card-ai"
            src="https://x-cards.vercel.app"
            width={window.outerWidth} height={'99999px'}
            style={{
                position: 'absolute',
                visibility: 'hidden',
                // display: 'none'
            }}
        ></iframe>
    )
}

export default PlasmoOverlay
