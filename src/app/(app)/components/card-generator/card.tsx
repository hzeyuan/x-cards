import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names
import { formatTimestamp } from '@src/app/utils';
import ImageLayout from '../ImageLayout';
import XLogo from '@assets/x-logo.svg';

export const TwitterCard = ({ xConfig, backgroundStyles, cardStyles, fontStyles }) => {
    return (
        <div
            id="card"
            className="w-full h-full flex justify-center mx-auto"
            style={{
                width: `${backgroundStyles.backgroundWidth}%`,
            }}
        >
            <div className="relative w-full grid place-items-center mobile-scaling pointer-events-none">
                {/* Resize handles */}
                {/* <ResizeHandles /> */}

                <div className="rounded-lg overflow-hidden w-full h-full relative content-shadow">
                    <div
                        id="content"
                        className="grid place-items-center content-container transition-colors h-full w-full"
                        style={{ padding: 50, fontSize: 14, perspective: 1000 }}
                    >
                        {/* Background layers */}
                        <BackgroundLayers backgroundStyles={backgroundStyles} cardStyles={cardStyles} />

                        {/* Card container */}
                        <div
                            className="relative z-20 transition-all w-full card-holder"
                            style={{
                                transform: `scale(${cardStyles.scale}%)`,
                                maxWidth: `${cardStyles.width}px`,
                                fontFamily: fontStyles?.fontFamily && `'${fontStyles?.fontFamily}', sans-serif`,
                            }}
                        >
                            {/* Card body */}
                            <div
                                className={cn(
                                    "select-none relative transition-all",
                                    "h-full w-full backdrop-blur-[18px] backdrop-saturate-[177%] pt-[2em] pb-[1.5em] px-[2em]"
                                )}
                                style={{
                                    overflow: 'visible',
                                    //  minHeight: '274px',
                                    borderRadius: `${cardStyles.borderRadius}px`,
                                }}
                            >
                                {/* Card background */}
                                <CardBackground cardStyles={cardStyles} />

                                {/* Card content */}
                                <div className="flex flex-col h-full">
                                    <CardHeader xConfig={xConfig} />
                                    <CardBody xConfig={xConfig} cardStyles={cardStyles} />
                                    <CardFooter xConfig={xConfig} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResizeHandles = () => (
    <div className="absolute left-0 top-0 w-full h-full z-10">
        {/* Left, right, and bottom resize handles */}
        {['left', 'right', 'bottom'].map((position) => (
            <div
                key={position}
                className={`${position === 'bottom' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize' :
                    position === 'left' ? 'top-1/2 left-0 -translate-y-1/2 -translate-x-1/2' :
                        'top-1/2 right-0 -translate-y-1/2 translate-x-1/2'} 
          cursor-ew-resize absolute flex items-center justify-center w-8 h-8 group pointer-events-auto mobile-resize-toggle-click-area`}
                style={{ touchAction: "none" }}
            >
                <div className={`w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform shadow-md mobile-resize-toggle ${position !== 'right' ? 'scale-x-125 scale-y-125' : ''}`} />
            </div>
        ))}
    </div>
);

const BackgroundLayers = ({ backgroundStyles, cardStyles }) => (
    <>
        <div
            className="absolute inset-0"
            style={{
                ...backgroundStyles,
                backgroundRepeat: "no-repeat",
            }}
        />
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
        {cardStyles.hasNoiseTexture && (
            <div
                className="absolute inset-0 mix-blend-overlay"
                style={{
                    backgroundImage: `url(/noise1.png)`, // Assuming noise1 is now a public asset
                    backgroundRepeat: "repeat",
                    opacity: cardStyles.noiseTextureOpacity,
                    backgroundPosition: cardStyles.texturePosition,
                    zIndex: 10,
                    borderRadius: `${cardStyles.borderRadius}px`,
                }}
            />
        )}
    </>
);

const CardBackground = ({ cardStyles }) => (
    <div
        className="card-background-light transition-colors absolute inset-0 rounded-[inherit]"
        style={{
            zIndex: -1,
            background: `linear-gradient(150deg, rgba(255,255,255,0.5), rgba(255,255,255,0.95) 80%)`,
            boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.15)',
            borderRadius: `${cardStyles.borderRadius}px`,
            borderWidth: `${cardStyles.borderWidth}px`,
        }}
    />
);

const CardHeader = ({ xConfig }) => (
    <div className='flex w-full'>
        <div className="flex  flex-grow items-center pb-3">
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
                <div className="flex text-secondary-foreground" style={{ fontWeight: 600, lineHeight: "1.2" }}>
                    <div className="whitespace-nowrap" style={{ paddingRight: "0.375em", fontSize: 18 }}>
                        {xConfig.username}
                    </div>
                </div>
                <div className="whitespace-nowrap text-secondary" style={{ fontSize: "1em", fontWeight: 400, lineHeight: "1.2" }} />

            </div>

        </div>
        <CardLogo xConfig={xConfig}></CardLogo>
    </div>
);

const CardLogo = ({ xConfig }) => {
    return (<div className='flex justify-center'>
        <img
            id="x-logo"
            src={XLogo.src}
            alt=""
            className=" h-[20px] w-[20px] right-4 top-4 opacity-30 dark:invert saturate-0 cursor-alias active:scale-90 transition-all ease-in-out"
        />
    </div>
    )
}


const Watermark = () => {

}

const CardBody = ({ xConfig, cardStyles }) => {
    const layout = cardStyles.imageLayout || xConfig.images.length >= 2 ? 'grid4' : 'vertical';
    return (
        <div className="flex-grow flex flex-col justify-center">
            <div className={cn("tweet-content text-lg leading-normal pointer-events-none mb-[1em]")} style={{ fontSize: cardStyles.fontSize }}>
                <div className="content whitespace-pre-wrap" dir="auto">
                    {xConfig.text}
                </div>
            </div>
            {xConfig?.images && xConfig.images.length > 0 && (
                <ImageLayout images={xConfig.images} layout={layout} />
            )}
        </div>
    )
}

const CardFooter = ({ xConfig }) => (
    <div>
        <div className="text-secondary-foreground flex items-center " style={{ paddingBottom: "0.5em", paddingTop: '0.5rem' }}>
            <span>{formatTimestamp(xConfig.time)}</span>
            <p style={{
                // fontSize: '12px',
                color: '#7b7b7b',
                // textAlign: 'right',
                marginLeft: '1em',
                // marginTop: '1em'
            }}> {'∙ Made with x-cards.net'}</p>
        </div>
        <div className='flex  items-center justify-between'>
            <div className="flex">
                {['replies', 'shares', 'likes'].map((stat) => (
                    <div key={stat} className="whitespace-nowrap text-secondary-foreground" style={{ marginRight: "1em" }}>
                        <span className="font-medium" style={{ color: "var(--textPrimary)" }}>
                            {xConfig[stat]}
                        </span>{" "}
                        {stat}
                    </div>
                ))}
            </div>
            {/* <div
                style={{
                    fontSize: '14px',
                    color: '#7b7b7b',
                    textAlign: 'right',
                }}> {'留下你的推广文案'}</div> */}
        </div>
    </div>
);