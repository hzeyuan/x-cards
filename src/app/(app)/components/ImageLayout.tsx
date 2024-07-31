import React from 'react';

const ImageLayout: React.FC<{ images: string[], layout: 'vertical' | 'grid2' | 'grid4' }> = ({ images, layout }) => {
    if (images.length === 0) return null;

    const renderImage = (src: string, index: number) => (
        <img 
            key={index} 
            src={src} 
            alt={`Image ${index + 1}`} 
            className="w-full h-full object-cover"
        />
    );

    const layoutStyles = {
        vertical: "flex flex-col space-y-2",
        grid2: "grid grid-cols-2 gap-2",
        grid4: "grid grid-cols-2 grid-rows-2 gap-2"
    };

    return (
        <div className={`w-full ${layoutStyles[layout]}`}>
            {images.slice(0, layout === 'vertical' ? undefined : (layout === 'grid2' ? 2 : 4))
                .map((src, index) => renderImage(src, index))}
        </div>
    );
};

export default ImageLayout;