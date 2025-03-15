import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MediaItem } from "../types/product";
import { Loader2 } from "lucide-react";

interface ImageGalleryProps {
  media: MediaItem[];
  productId: string;
  registerIframeRef?: (productId: string, ref: HTMLIFrameElement | null) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  media, 
  productId,
  registerIframeRef 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Register the iframe ref when it changes or when the active media item changes
  useEffect(() => {
    if (media[activeIndex]?.type === "iframe" && registerIframeRef) {
      registerIframeRef(productId, iframeRef.current);
      // Reset loading state when iframe source changes
      setIframeLoading(true);
    }
  }, [activeIndex, media, productId, registerIframeRef]);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  return (
    <Card className="image-gallery">
      <CardContent className="p-4">
        <div className="main-media mb-4 w-[550px] h-[550px] mx-auto overflow-hidden rounded-lg relative">
          {media[activeIndex]?.type === "image" ? (
            <img
              src={media[activeIndex].src}
              alt={`Product image ${activeIndex + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full">
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-2" />
                  <p className="text-gray-700 font-medium">Loading 3D model...</p>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={media[activeIndex].src}
                title={`Product iframe ${activeIndex + 1}`}
                className="w-full h-full"
                allowFullScreen
                onLoad={handleIframeLoad}
              />
            </div>
          )}
          <div className="absolute top-16 -left-20 bg-red-600 text-white py-2 px-32 transform -rotate-45 shadow-lg">
            <span className="text-2xl font-bold">Sale</span>
          </div>
        </div>
        <div className="thumbnail-list grid grid-cols-4 gap-2 w-[550px] mx-auto">
          {media.map((item, index) => (
            <div
              key={index}
              className={`thumbnail cursor-pointer w-[132px] h-[132px] overflow-hidden rounded ${
                index === activeIndex ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {item.thumbnailSrc ? (
                <img
                  src={item.thumbnailSrc}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="iframe-thumbnail bg-gray-200 w-full h-full flex items-center justify-center">
                  <span className="text-sm">iframe</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;
