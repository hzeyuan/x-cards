import noise1 from "@assets/noise1.png"
import { cn } from "@lib/utils"
import { useCardStore } from "@src/hooks/useCardStore"
import { useMemo } from "react"

import { presets } from "./color"
import { formatTimestamp } from "@src/app/utils"

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


    return (
        <div
            id="card"
            className="w-full flex h-full justify-center mx-auto"
            style={{
                width: `${backgroundStyles.backgroundWidth}%`,
                // height: 492
            }}
        >
            <div
                className="relative w-full grid place-items-center mobile-scaling pointer-events-none"
            >
                <div className="absolute left-0 top-0 w-full h-full z-10">
                    <div
                        className="top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 cursor-ew-resize cursor-ew-resize mobile-hidden absolute flex items-center justify-center w-8 h-8 group pointer-events-auto mobile-resize-toggle-click-area"
                        style={{ touchAction: "none" }}>
                        <div className=" scale-x-125 scale-y-125 w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform shadow-md mobile-resize-toggle"></div>
                    </div>
                    <div
                        className="top-1/2 right-0 -translate-y-1/2 translate-x-1/2 cursor-ew-resize cursor-ew-resize absolute flex items-center justify-center w-8 h-8 group pointer-events-auto mobile-resize-toggle-click-area"
                    // style="touch-action: none;"
                    >
                        <div className=" w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform shadow-md mobile-resize-toggle"></div>
                    </div>
                    <div
                        className="bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 cursor-ew-resize cursor-ns-resize absolute flex items-center justify-center w-8 h-8 group pointer-events-auto mobile-resize-toggle-click-area"
                    // style="touch-action: none;"
                    >
                        <div className="scale-x-125 scale-y-125 w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform shadow-md mobile-resize-toggle"></div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden w-full h-full relative content-shadow">
                    <div
                        id="content"
                        className="grid place-items-center content-container  transition-colors h-full w-full"
                        style={{ padding: 50, fontSize: 14, perspective: 1000 }}
                    >
                        {/* 背景层 */}

                        <div
                            className="absolute inset-0"
                            style={{
                                ...finalBackgroundStyles,
                                backgroundRepeat: "no-repeat",
                            }}
                        />

                        {/* Background layer */}
                        {backgroundStyles?.backgroundImage && (
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundRepeat: backgroundStyles.backgroundRepeat,
                                    backgroundImage: `url(${backgroundStyles.backgroundImage})`,
                                    filter: `blur(${backgroundStyles.backgroundBlur}px)`,
                                    opacity: backgroundStyles.backgroundOpacity,
                                }}
                            />
                        )}

                        {/* 噪点纹理层 */}
                        {cardStyles.hasNoiseTexture && (
                            <div
                                className="absolute inset-0 mix-blend-overlay"
                                style={{
                                    backgroundImage: `url(${noise1.src})`,
                                    backgroundRepeat: "repeat",
                                    opacity: cardStyles.noiseTextureOpacity,
                                    backgroundPosition: cardStyles.texturePosition,
                                    zIndex: 10,
                                    borderRadius: `${cardStyles.borderRadius}px`, // 确保噪点纹理也有圆角
                                }}
                            />
                        )}

                        {/* 卡片容器 */}
                        <div
                            className="relative z-20 transition-all w-full card-holder "
                            style={{
                                transform: `scale(${cardStyles.scale}%)`,
                                maxWidth: `${cardStyles.width}px`,
                                fontFamily: fontStyles?.fontFamily && `'${fontStyles?.fontFamily}', sans-serif`,
                            }}
                        >
                            {/* 卡片主体 */}
                            <div
                                className={cn(
                                    "select-none relative transition-all",
                                    " w-full backdrop-blur-[18px] backdrop-saturate-[177%] pt-[2em] pb-[1.5em] px-[2em]"
                                )}
                                style={{
                                    overflow: "visible",
                                    borderRadius: `${cardStyles.borderRadius}px`,
                                }}
                            >
                                {/* 卡片背景 */}
                                <div
                                    className={cn(
                                        "card-background-light transition-colors absolute inset-0 rounded-[inherit]"
                                    )}
                                    style={{
                                        zIndex: -1,
                                        background: `linear-gradient(150deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95) 80%)`,
                                        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.15)',
                                        borderRadius: `${cardStyles.borderRadius}px`,
                                        borderWidth: `${cardStyles.borderWidth}px`,
                                        // borderColor: cardStyles.borderColor,
                                    }}
                                />

                                {/* 卡片内容 */}
                                <div className="flex items-center pb-3 ">
                                    <img
                                        src={xConfig.avatar}
                                        className="inline object-cover rounded-full transition-all duration-150"
                                        alt="Profile image"
                                        style={{
                                            width: "3em",
                                            height: "3em",
                                            marginRight: "0.75em"
                                        }}
                                    />
                                    <div>
                                        <div
                                            className="flex text-secondary-foreground"
                                            style={{
                                                fontWeight: 600,
                                                lineHeight: "1.2"
                                            }}>
                                            <div
                                                className="whitespace-nowrap"
                                                style={{ paddingRight: "0.375em", fontSize: 18 }}>
                                                {xConfig.username}
                                            </div>
                                        </div>
                                        <div
                                            className="whitespace-nowrap text-secondary"
                                            style={{
                                                fontSize: "1em",
                                                fontWeight: 400,
                                                lineHeight: "1.2"
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={cn(
                                        "tweet-content  text-lg leading-normal pointer-events-none mb-[1em]"
                                    )}
                                    style={{ fontSize: cardStyles.fontSize }}>
                                    <div className="content whitespace-pre-wrap" dir="auto" >
                                        {xConfig.text}
                                    </div>
                                </div>

                                {xConfig?.imgUrl && <img height={269} src={xConfig.imgUrl} className="max-w-full max-h-[480px] h-max w-full rounded-xl mt-4 object-cover" />}

                                <div>
                                    <div
                                        className="text-secondary-foreground"
                                        style={{ paddingBottom: "0.5em", paddingTop: '0.5rem' }}>
                                        <span>{formatTimestamp(xConfig.time)}</span>
                                    </div>
                                    <div className="flex">
                                        <div
                                            className="whitespace-nowrap text-secondary-foreground"
                                            style={{ marginRight: "1em" }}>
                                            <span
                                                className="font-medium"
                                                style={{ color: "var(--textPrimary)" }}>
                                                {xConfig.replies}
                                            </span>{" "}
                                            replies
                                        </div>
                                        <div
                                            className="whitespace-nowrap text-secondary-foreground"
                                            style={{ marginRight: "1em" }}>
                                            <span
                                                className="font-medium"
                                                style={{ color: "var(--textPrimary)" }}>
                                                {xConfig.shares}
                                            </span>{" "}
                                            shares
                                        </div>
                                        <div
                                            className="whitespace-nowrap text-secondary-foreground"
                                            style={{ marginRight: "1em" }}>
                                            <span
                                                className="font-medium"
                                                style={{ color: "var(--textPrimary)" }}>
                                                {xConfig.likes}
                                            </span>{" "}
                                            likes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



