import noise1 from "@assets/noise1.png"
import { cn } from "@lib/utils"
import { useCardStore } from "@src/hooks/useCardStore"
import { useMemo } from "react"

import { presets } from "./color"
import { formatTimestamp } from "@src/app/utils"
import { TwitterCard } from "./card"

export const Display = () => {
    const colorIndex = useCardStore((state) => state.colorIndex)
    const cardStyles = useCardStore((state) => state.cardStyles)
    const tabConfig = useCardStore((state) => state.tabConfig);
    const fontStyles = useCardStore((state) => state.fontStyles);
    const backgroundStyles = useCardStore((state) => state.backgroundStyles)
    const xConfig = useCardStore((state) => state.xConfig)
    const finalBackgroundStyles = useMemo(() => {
        const color = presets[colorIndex]

        console.log('backgroundStyles?.useGradient', backgroundStyles?.useGradient);
        if (backgroundStyles?.useGradient) {
            return {
                backgroundImage: `linear-gradient(${backgroundStyles.backgroundGradientAngle}deg, ${backgroundStyles.backgroundStartColor}, ${backgroundStyles.backgroundEndColor})`,
            }
        }

        if (tabConfig.openCustomColor) {
            return {
                backgroundColor: backgroundStyles.backgroundColor,
            }

        }
        if (color.backgroundFillType === "Linear") {
            return {
                backgroundImage: `linear-gradient(${color.backgroundAngle}deg, ${color.backgroundStartColor}, ${color.backgroundEndColor})`,
                backgroundRepeat: "no-repeat",
            }
        } else if (color.backgroundFillType === "Radial") {
            return {
                backgroundImage: `radial-gradient(${color.backgroundStartColor}, ${color.backgroundEndColor})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: color.backgroundPosition
            }
        } else {
            return {}
        }
    }, [colorIndex, backgroundStyles, tabConfig.openCustomColor])

    console.log('xConfig', xConfig);

    return (
        <TwitterCard
            xConfig={xConfig}
            cardStyles={cardStyles}
            fontStyles={fontStyles}
            backgroundStyles={finalBackgroundStyles}
        ></TwitterCard>
    )
}



