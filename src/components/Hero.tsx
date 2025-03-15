import React, { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";

interface Media {
  type: 'image' | 'iframe';
  src: string;
  thumbnailSrc?: string;
  iframeId?: string;
}

interface HeroItem {
  id: string;
  title: string;
  description: string;
  media: Media;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroProps {
  items: HeroItem[];
  registerIframeRef?: (id: string, ref: HTMLIFrameElement | null) => void;
}

const Hero: React.FC<HeroProps> = ({ items, registerIframeRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];
  const [iframeLoading, setIframeLoading] = useState(true);
  
  // Auto-rotate items every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [items.length]);

  // Reset loading state when active item changes
  useEffect(() => {
    if (activeItem.media.type === 'iframe') {
      setIframeLoading(true);
    }
  }, [activeIndex, activeItem.media.type]);

  // Handle manual navigation
  const goToItem = (index: number) => {
    setActiveIndex(index);
  };

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <section className="w-full h-[50vh] bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {activeItem.media.type === 'image' ? (
          <img 
            src={activeItem.media.src} 
            alt={activeItem.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            {iframeLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-3" />
                <p className="text-gray-700 font-medium text-lg">Loading 3D experience...</p>
              </div>
            )}
            <iframe
              ref={(ref) => registerIframeRef && registerIframeRef(activeItem.id, ref)}
              src={activeItem.media.src}
              title={activeItem.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          </div>
        )}
      </div>
      
      {/* Text overlay - only covers part of the hero section */}
      {activeItem.media.type === 'image' ? (
        // For images, we can cover the entire section
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{activeItem.title}</h1>
            <p className="text-lg md:text-xl mb-6">{activeItem.description}</p>
            {activeItem.ctaText && activeItem.ctaLink && (
              <a 
                href={activeItem.ctaLink} 
                className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeItem.ctaText}
              </a>
            )}
          </div>
        </div>
      ) : (
        // For iframes, only cover the bottom portion to allow interaction
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 py-4">
          <div className="text-center text-white max-w-3xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{activeItem.title}</h1>
            <p className="text-sm md:text-base mb-3">{activeItem.description}</p>
            {activeItem.ctaText && activeItem.ctaLink && (
              <a 
                href={activeItem.ctaLink} 
                className="inline-block bg-white text-black px-4 py-2 text-sm rounded-md font-medium hover:bg-opacity-90 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeItem.ctaText}
              </a>
            )}
          </div>
        </div>
      )}
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => goToItem(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero; 