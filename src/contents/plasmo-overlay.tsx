import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
}



const PlasmoOverlay = ({ anchor }: PlasmoCSUIProps) => {

    return (
        <iframe
            id="x-card-ai"
            src="http://localhost:1947"
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
