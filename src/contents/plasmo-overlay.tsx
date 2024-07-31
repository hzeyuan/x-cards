import React, { useEffect, useRef } from 'react'
import type { PlasmoCSConfig, PlasmoCSUIProps } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
}

const PlasmoOverlay: React.FC<PlasmoCSUIProps> = ({ anchor }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (iframeRef.current) {
                iframeRef.current.style.height = `${document.documentElement.scrollHeight}px`
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize() // Initial resize

        return () => {
            window.removeEventListener('resize', handleResize)
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
                src="https://x-cards.net"
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