import { create } from 'zustand'


type Frame = 'none' | 'macos' | 'windows'

type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'whatsapp' | 'youtube' | 'common'

type PostType = 'landscape' | 'square' | 'portrait' | 'post' | 'story' | 'thumbnail';

type AspectRatio = '16:9' | '3:2' | '4:3' | '5:4' | '1:1' | '4:5' | '3:4' | '2:3' | '9:16' | '3:1'


interface ImageDimensions {
    width: number;
    height: number;

}

// 各大社交平台的卡片比例
type ImageLayoutProps = {
    social: SocialPlatform;
    layoutOptions: LayoutOption[];

}


export interface LayoutOption {
    ratio: AspectRatio;
    dimensions: ImageDimensions;
    name: string;
    scale?: number;
}


const instagramLayouts: ImageLayoutProps = {
    social: 'instagram',
    layoutOptions: [
        { ratio: '1:1', name: '', dimensions: { width: 1080, height: 1080 } },
        { ratio: '4:5', name: '', dimensions: { width: 1080, height: 1350 } },
    ]
};

const twitterLayouts: ImageLayoutProps = {
    social: 'facebook',
    layoutOptions: [
        { ratio: '16:9', name: '', dimensions: { width: 1080, height: 1920 } },
        { ratio: '3:1', name: '', dimensions: { width: 1500, height: 500 } },
    ]
};

const YoutubeLayouts: ImageLayoutProps = {
    social: 'youtube',
    layoutOptions: [
        { ratio: '16:9', name: 'Banner', dimensions: { width: 2560, height: 1440 } },
        { ratio: '16:9', name: 'Thumbnail', dimensions: { width: 1280, height: 720 } },
        { ratio: '16:9', name: 'video', dimensions: { width: 1280, height: 720 } },
    ]
};

export const CommonLayouts: ImageLayoutProps = {
    social: 'common',
    layoutOptions: [
        { ratio: '16:9', name: '', dimensions: { width: 1920, height: 1080, } },
        { ratio: '3:2', name: '', dimensions: { width: 1920, height: 1280 } },
        { ratio: '4:3', name: '', dimensions: { width: 1920, height: 1440 } },
        { ratio: '5:4', name: '', dimensions: { width: 1920, height: 1536 } },
        { ratio: '1:1', name: '', dimensions: { width: 1920, height: 1920 } },
        { ratio: '4:5', name: '', dimensions: { width: 1080, height: 1350 } },
        { ratio: '3:4', name: '', dimensions: { width: 1080, height: 1440 } },
        { ratio: '2:3', name: '', dimensions: { width: 1080, height: 1620 } },
        { ratio: '9:16', name: '', dimensions: { width: 1080, height: 1920 } },
    ]
};


export const CardWidths = {
    sm: 440,
    md: 582.547,
    lg: 768,
    xl: 1024
};

export interface XConfig {
    url: string;
    avatar: string,
    username: string,
    text: string,
    links?: {
        href: string,
        text: string,
        src?: string,
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
    loadedImages: {
        [key: string]: 'success' | 'error'
    },
    setLoadedImages: (loadedImages: CardStore['loadedImages']) => void;
    addLoadedImage: (src: string, status: 'success' | 'error') => void;
    xConfig: XConfig[],
    setXConfig: (config: XConfig[]) => void;
    colorIndex: number;
    setColorIndex: (colorIndex: number) => void;
    frame: Frame;
    setFrame: (frame: Frame) => void;
    noise: number;
    setNoise: (noise: number) => void;
    backgroundStyles: {
        borderRadius: number,
        padding: number,
        backgroundWidth: number,
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
        style: 'posts' | 'article'
        width: number,
        height: number,
        aspectRatio?: AspectRatio,
        // imageLayout?: ImageLayoutProps['layout'],
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
    updateCardStyles: (cardStyles: Partial<CardStore['cardStyles']>) => void;
    updateBackgroundStyles: (backgroundStyles: any) => void;
    resetAll: () => void;

}

export const useCardStore = create<CardStore>(
    (set, get) => ({
        loadedImages: {},
        setLoadedImages: (loadedImages) => set({ loadedImages }),
        addLoadedImage: (src, status) => {
            set({
                loadedImages: {
                    ...get().loadedImages,
                    [src]: status
                }
            })
        },
        xConfig: [{
            username: '@FeigelC35583',
            // images: [],
            images: ['https://pbs.twimg.com/media/GTzQPUhbQAA0mwk?format=jpg&name=large', 'https://pbs.twimg.com/media/GUa0UwYaoAAYPCY?format=jpg'],
            // images: ['https://pbs.twimg.com/media/GUa0UwYaoAAYPCY?format=jpg'],
            url: '',
            avatar: 'https://pbs.twimg.com/media/GUa0UwYaoAAYPCY?format=jpg',
            text: `隐私协议生成器，准备上架的时候非常有用，直接一个url贴到app Store。
https://app.privacypolicies.com/wizard/privacy-policy…`,
            replies: 6,
            likes: 6,
            shares: 6,
            time: 1722090490
        },
        ],
        setXConfig: (config) => {
            set({
                xConfig: [...config]
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
            padding: 16,
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
            style: 'posts',
            // backgroundColor: 'rgba(255, 255, 255, 1)',
            width: 582.547,
            // width: 1920,
            height: 1080,
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
        })
    })
)