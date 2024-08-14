import { useCardStore } from '@src/hooks/useCardStore';
import React, { useEffect, useRef, useState } from 'react';

const imageCache: { [key: string]: string } = {};

const ImageLayout: React.FC<{
    images: string[],
    layout: 'vertical' | 'grid2' | 'grid4',
    onAllImagesLoaded?: () => void

}> = ({ images, layout }) => {
    if (images.length === 0) return null;


    const [loadedImages, setLoadedImages] = useState<string[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const loadImages = async () => {
            const loadPromises = images.map(src =>
                new Promise<string>(async (resolve, reject) => {
                    if (imageCache[src]) {
                        console.log('Image loaded from cache:', src);
                        resolve(src);
                        return;
                    }
                    try {
                        // 使用 fetch 来利用浏览器的缓存机制
                        const response = await fetch(src, { cache: 'force-cache' });
                        const blob = await response.blob();
                        const objectURL = URL.createObjectURL(blob);

                        // 将图片添加到内存缓存
                        imageCache[src] = objectURL;

                        const img = new Image();
                        img.src = objectURL;
                        img.onload = () => {
                            useCardStore.getState().addLoadedImage(src, 'success');
                            resolve(src);
                        }
                        img.onerror = () => {
                            useCardStore.getState().addLoadedImage(src, 'error');
                            reject();
                        };
                    } catch (error) {
                        reject(error);
                        useCardStore.getState().addLoadedImage(src, 'error');
                    }
                })
            );

            try {
                const loaded = await Promise.all(loadPromises);
                if (isMounted.current) {
                    setLoadedImages(loaded);
                }
            } catch (error) {
                console.error('Failed to load one or more images:', error);
            }
        };

        loadImages();
    }, [images]);

    if (loadedImages.length === 0) return <div>Loading...</div>;


    const renderImage = (src: string, index: number, className: string = "w-full h-full object-contain") => (
        <img
            key={index}
            src={imageCache[src] || src}
            alt={`Image ${index + 1}`}
            className={className}
        />
    );


    const layoutStyles = {
        vertical: "flex flex-col space-y-2",
        grid2: "grid grid-cols-2 gap-2",
        grid4: "grid grid-cols-2 grid-rows-2 gap-2"
    };

    if (images.length === 2) {
        return (
            <div className="w-full flex flex-row gap-2 ">
                <div className="w-1/2">
                    {renderImage(images[0], 0)}
                </div>
                <div className="w-1/2">
                    {renderImage(images[1], 1)}
                </div>
            </div>
        );
    }

    if (images.length === 3) {
        return (
            <div className="w-full flex flex-row gap-2 ">
                <div className="w-1/2">
                    {renderImage(images[0], 0)}
                </div>
                <div className="w-1/4 flex flex-col gap-2">
                    <div className="h-1/2">
                        {renderImage(images[1], 1)}
                    </div>
                    <div className="h-1/2">
                        {renderImage(images[2], 2)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full ${layoutStyles[layout]}`}>
            {images.slice(0, layout === 'vertical' ? undefined : (layout === 'grid2' ? 2 : 4))
                .map((src, index) => renderImage(src, index))}
        </div>
    );
};

export default ImageLayout;