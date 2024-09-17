import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MediaItem {
  type: "image" | "iframe";
  src: string;
  thumbnailSrc?: string;
}

interface ImageGalleryProps {
  media: MediaItem[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Card className="image-gallery">
      <CardContent className="p-4">
        <div className="main-media mb-4 w-[550px] h-[550px] mx-auto overflow-hidden rounded-lg relative">
          {media[activeIndex].type === "image" ? (
            <img
              src={media[activeIndex].src}
              alt={`Product image ${activeIndex + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe
              src={media[activeIndex].src}
              title={`Product iframe ${activeIndex + 1}`}
              className="w-full h-full"
              allowFullScreen
            />
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
