import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';
import { useTweetsStore } from '../use-tweet-collection';

const AdvancedImagePreview = ({ alt = "Preview" }) => {
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

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

export default React.memo(AdvancedImagePreview);