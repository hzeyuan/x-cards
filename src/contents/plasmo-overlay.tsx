import React, { useEffect, useRef } from 'react'
import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo"
import 'tippy.js/dist/tippy.css';
// import '@src/app/globals.css';
export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
}


// export const getStyle = () => {
//     const style = document.createElement("style")
//     style.textContent = cssText
//     return style
// }


const PlasmoOverlay: React.FC<PlasmoCSUIProps> = ({ anchor }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (iframeRef.current) {
                iframeRef.current.style.height = `${document.documentElement.scrollHeight}px`
            }
        }

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
            localStorage.removeItem('x-card-ai')
        }
    }, [])

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: -1,
        }}>
            <iframe
                ref={iframeRef}
                id="x-card-ai"
                src="https://x-cards.net/independent"
                // src="http://localhost:1947/independent"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    opacity: 0,
                }}
            />
        </div>
    )
}

export default PlasmoOverlay