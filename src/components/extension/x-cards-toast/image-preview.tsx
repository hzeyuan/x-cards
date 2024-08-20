import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';
import { useTweetsStore } from '../use-tweet-collection';

const ImagePreview = ({ alt = "Preview" }) => {
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const format = useTweetsStore(state => state.cardConfig.format);
  const imageSrc = useTweetsStore(state => state.imageSrc);

  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  }, []);

  const handleImageError = useCallback(() => {
    setError('Failed to load image');
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale(prevScale => Math.min(prevScale + 0.1, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const scaledImageWidth = imageDimensions.width * scale;
      const scaledImageHeight = imageDimensions.height * scale;

      const maxX = Math.max(0, (scaledImageWidth - containerRect.width) / 2);
      const maxY = Math.max(0, (scaledImageHeight - containerRect.height) / 2);

      setPosition(prevPosition => {
        const newX = prevPosition.x + e.movementX;
        const newY = prevPosition.y + e.movementY;

        return {
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        };
      });
    }
  }, [isDragging, scale, imageDimensions]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="relative w-full  h-full rounded-lg overflow-hidden  object-cover" ref={containerRef}>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          {error}
        </div>
      )}
      <div
        className="w-full h-full overflow-hidden cursor-move pb-3"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {
          format === 'md' && (
            <div className="w-full flex-col gap-y-2  h-full p-4 justify-center flex  items-center rounded-lg shadow">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width={64}
                height={64}
              >
                <path
                  d="M601.216 85.333a42.667 42.667 0 0130.485 12.822l209.451 213.973a42.667 42.667 0 0112.181 29.867v511.338A85.333 85.333 0 01768 938.667H256a85.333 85.333 0 01-85.333-85.334V170.667A85.333 85.333 0 01256 85.333h345.216zm49.579 421.035c-4.992-29.675-45.995-36.693-60.075-8.79l-78.805 156.225-77.291-156.011c-14.379-29.013-57.813-20.779-60.565 11.477l-21.952 256a32 32 0 0029.162 34.624l3.072.107a32 32 0 0031.552-29.27l12.182-142.015 54.89 110.826 1.515 2.731c12.864 20.864 44.33 20.075 55.744-2.517l56.341-111.723 11.52 142.55a32 32 0 0063.808-5.163l-20.714-256zM629.61 187.541v143.872h140.8l-140.8-143.872z"
                  fill="#323847"
                />
              </svg>
              Copy the markdown and paste to see the preview
            </div>
          )
        }
        {
          format !== 'md' && (
            <img
              ref={imageRef}
              src={imageSrc}
              alt={alt}
              draggable={false}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: 'transform 0.1s ease-out'
              }}
              className="w-full h-full object-contain"
            />
          )
        }

      </div>
      <div className="  absolute  top-0 pt-4 pl-4  w-full  flex space-x-2">
        <button onClick={handleZoomIn} className="p-2 bg-white rounded-full shadow-md">
          <ZoomIn className="w-5 h-5 text-gray-600" />
        </button>
        <button onClick={handleZoomOut} className="p-2 bg-white rounded-full shadow-md">
          <ZoomOut className="w-5 h-5 text-gray-600" />
        </button>
        <button onClick={handleReset} className="p-2 bg-white rounded-full shadow-md">
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ImagePreview);