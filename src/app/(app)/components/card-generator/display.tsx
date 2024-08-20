import { CommonLayouts, useCardStore } from "@src/hooks/useCardStore"
import { useMemo } from "react"


import { presets } from "./color"
import { TwitterCard } from "./twitter-card"
import { WeChatCard } from "./wechat-card"

export const Display = () => {
    const colorIndex = useCardStore((state) => state.colorIndex)
    const cardStyles = useCardStore((state) => state.cardStyles)
    const tabConfig = useCardStore((state) => state.tabConfig);
    const backgroundStyles = useCardStore((state) => state.backgroundStyles)
    const xConfig = useCardStore((state) => state.xConfig)

    const finalBackgroundStyles = useMemo(() => {
        const color = presets[colorIndex]

        let borderRadius = cardStyles.borderRadius;
        if (backgroundStyles.padding === 0) {
            borderRadius = 0;
        }

        if (backgroundStyles?.useGradient) {
            return {
                ...backgroundStyles,
                borderRadius,
                backgroundImage: `linear-gradient(${backgroundStyles.backgroundGradientAngle}deg, ${backgroundStyles.backgroundStartColor}, ${backgroundStyles.backgroundEndColor})`,
            }
        }

        if (tabConfig.openCustomColor) {
            return {
                ...backgroundStyles,
                borderRadius,
                backgroundColor: backgroundStyles.backgroundColor,
            }

        }
        if (color.backgroundFillType === "Linear") {
            return {
                ...backgroundStyles,
                borderRadius,
                backgroundImage: `linear-gradient(${color.backgroundAngle}deg, ${color.backgroundStartColor}, ${color.backgroundEndColor})`,
                backgroundRepeat: "no-repeat",
            }
        } else if (color.backgroundFillType === "Radial") {
            return {
                ...backgroundStyles,
                borderRadius,
                backgroundImage: `radial-gradient(${color.backgroundStartColor}, ${color.backgroundEndColor})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: color.backgroundPosition,

            }
        } else {
            return {
                ...backgroundStyles,
                borderRadius,
            }
        }
    }, [colorIndex, backgroundStyles, tabConfig.openCustomColor])

    const calculateScale = (width, height) => {
        const maxWidth = 1920 / 2; // Maximum width of the card in the display
        const maxHeight = 1080 / 2; // Maximum height of the card in the display
        const widthScale = maxWidth / width;
        const heightScale = maxHeight / height;
        return Math.min(widthScale, heightScale);
    };

    return (
        <div
            className="w-full  justify-center  flex  gap-x-4 relative mt-0">

            <TwitterCard
                xConfig={xConfig}
                cardStyles={{
                    ...cardStyles,
                    // aspectRatio: "16/9",
                    // width: '1920px',
                    // height: '1080px',
                }}
                backgroundStyles={finalBackgroundStyles}
            ></TwitterCard>

            {/* <WeChatCard xConfig={xConfig}></WeChatCard> */}
        </div>
    )
}



