import React from 'react';

const ImageLayout: React.FC<{ images: string[], layout: 'vertical' | 'grid2' | 'grid4' }> = ({ images, layout }) => {
    if (images.length === 0) return null;

    const renderImage = (src: string, index: number, className: string = "w-full h-full object-cover") => (
        <img
            key={index}
            src={src}
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
            <div className="w-full flex flex-row gap-2 h-64">
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
            <div className="w-full flex flex-row gap-2 h-64">
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