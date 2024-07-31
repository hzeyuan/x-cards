import type { ImageLayoutProps } from '@src/app/(app)/components/ImageLayout';
import { create } from 'zustand'


type Frame = 'none' | 'macos' | 'windows'

export interface XConfig {
    url: string;
    avatar: string,
    username: string,
    text: string,
    links?: {
        href: string,
        text: string,
    }[],
    video?: {
        src: string,
        poster: string,
    },
    tags?: string[],
    images: string[],
    replies: number,
    likes: number,
    shares: number,
    time: number,
}

export interface CardStore {
    xConfig: XConfig,
    setXConfig: (config: Partial<XConfig>) => void;
    colorIndex: number;
    setColorIndex: (colorIndex: number) => void;
    frame: Frame;
    setFrame: (frame: Frame) => void;
    noise: number;
    setNoise: (noise: number) => void;
    backgroundStyles: {
        backgroundWidth: 100,
        backgroundImage?: string,
        backgroundOpacity?: number,
        backgroundBlur?: number,
        backgroundColor?: string,
        backgroundRepeat?: string,
        backgroundGradientAngle?: number,
        backgroundStartColor?: string,
        backgroundEndColor?: string,
        useGradient?: boolean,

        backgroundFilter: {
            brightness: number,
            contrast: number,
            saturate: number,
            hueRotate: number,
            invert: number,
        }
    },
    cardStyles: {
        width: number,
        imageLayout?: ImageLayoutProps['layout'],
        scale: number,
        fontSize: number,
        borderRadius: number,
        hasNoiseTexture: boolean,
        noiseTextureOpacity: number,
        texturePosition: string,
        texture: string,
        borderWidth: number,
        // borderColor: string,
        // borderStyle: string,

    },
    fontStyles: {
        fontFamily?: string,
    }
    setFontStyles: (fontStyles: any) => void;
    tabConfig: {
        openCustomColor: boolean,
    }
    setTabConfig: (tab: {
        openCustomColor?: boolean,
    }) => void;
    updateCardStyles: (cardStyles: any) => void;
    updateBackgroundStyles: (backgroundStyles: any) => void;
    resetAll: () => void;

}

export const useCardStore = create<CardStore>(
    (set, get) => ({
        xConfig: {
            username: '@FeigelC35583',
            images: [],
            // images: ['https://pbs.twimg.com/media/GTzQPUhbQAA0mwk?format=jpg&name=small'],
            // images: ['https://pbs.twimg.com/media/GTzQPUhbQAA0mwk?format=jpg&name=small', 'https://pbs.twimg.com/media/GTzQPUhbQAA0mwk?format=jpg&name=small'],
            url: '',
            avatar: 'https://pbs.twimg.com/profile_images/1742189088244121600/GGSioEt-_400x400.jpg',
            text: 'Capture and share Twitter posts as beautiful images. makes sharing Twitter posts on other platforms more visual and attention-grabbing.',
            replies: 6,
            likes: 6,
            shares: 6,
            time: 1722090490
        },
        setXConfig: (config) => {
            set({
                xConfig: {
                    ...get().xConfig,
                    ...config
                }
            })
        },
        colorIndex: 0,
        setColorIndex: (colorIndex) => set({ colorIndex }),
        fontStyles: {
            fontFamily: 'sans-serif',
        },
        setFontStyles: (fontStyles) => {
            set({
                fontStyles: {
                    ...get().fontStyles,
                    ...fontStyles
                }
            })
        },
        tabConfig: {
            openCustomColor: false
        },
        setTabConfig: (tab) => {
            set({
                tabConfig: {
                    ...get().tabConfig,
                    ...tab
                }
            })
        },
        frame: 'none',
        setFrame: (frame) => set({ frame }),
        noise: 0,
        setNoise: (noise) => set({ noise }),
        backgroundStyles: {
            backgroundColor: '',
            backgroundWidth: 100,
            backgroundImage: '',
            // 透明度和模糊
            backgroundOpacity: 1,
            backgroundBlur: 0,
            // 混合模式
            backgroundBlendMode: 'normal', // 'multiply', 'screen', 'overlay'等
            // 渐变
            backgroundGradient: '',
            backgroundGradientAngle: 0,
            backgroundStartColor: '#fff',
            backgroundEndColor: '#fff',
            backgroundRepeat: 'no-repeat',

            // 滤镜
            backgroundFilter: {
                brightness: 100,
                contrast: 100,
                saturate: 100,
                hueRotate: 0,
                invert: 0,
            },
        },
        cardStyles: {
            // backgroundColor: 'rgba(255, 255, 255, 1)',
            width: 582.547,
            // height: 100,
            borderRadius: 20,
            fontSize: 16,
            scale: 100,
            texture: '',
            // boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.1)',
            // padding: 20,
            hasNoiseTexture: false,
            noiseTextureOpacity: 0.05,
            texturePosition: 'center',
            borderWidth: 0,

        },
        updateCardStyles: (partCardStyles) => {
            set({
                cardStyles: {
                    ...get().cardStyles,
                    ...partCardStyles
                }
            })
        },
        updateBackgroundStyles: (partBackgroundStyles) => {
            set({
                backgroundStyles: {
                    ...get().backgroundStyles,
                    ...partBackgroundStyles
                }
            })
        },
        resetAll: () => set({
            colorIndex: 0,

            fontStyles: {
                fontFamily: 'sans-serif',
            },

            tabConfig: {
                openCustomColor: false
            },
            backgroundStyles: {
                backgroundColor: '',
                backgroundWidth: 100,
                backgroundImage: '',
                // 透明度和模糊
                backgroundOpacity: 1,
                backgroundBlur: 0,
                backgroundGradientAngle: 0,
                backgroundStartColor: '#fff',
                backgroundEndColor: '#fff',
                backgroundRepeat: 'no-repeat',

                // 滤镜
                backgroundFilter: {
                    brightness: 100,
                    contrast: 100,
                    saturate: 100,
                    hueRotate: 0,
                    invert: 0,
                },
            },
            cardStyles: {
                width: 582.547,
                // height: 100,
                borderRadius: 20,
                fontSize: 16,
                scale: 100,
                texture: '',
                hasNoiseTexture: false,
                noiseTextureOpacity: 0.05,
                texturePosition: 'center',
                borderWidth: 0,

            },
        })
    })
)