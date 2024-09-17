import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, StarHalf } from "lucide-react";

interface ProductDetailsProps {
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  colors: string[];
  sizes: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  price,
  description,
  rating,
  reviewCount,
  colors,
  sizes,
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="fill-yellow-400 text-yellow-400" />
      );
    }

    return stars;
  };

  return (
    <div className="product-details space-y-6">
      <h1 className="text-3xl font-bold">{name}</h1>
      <div className="flex items-center space-x-2">
        <div className="flex">{renderStars(rating)}</div>
        <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
      </div>
      <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
      <p className="text-gray-600">{description}</p>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Color</h3>
          <RadioGroup
            value={selectedColor}
            onValueChange={setSelectedColor}
            className="flex space-x-3"
          >
            {colors.map((color) => (
              <div key={color}>
                <RadioGroupItem
                  value={color}
                  id={`color-${color}`}
                  className="sr-only"
                />
                <Label
                  htmlFor={`color-${color}`}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <div className="w-6 h-6 rounded-full bg-white opacity-30"></div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <RadioGroup
            value={selectedSize}
            onValueChange={setSelectedSize}
            className="flex flex-wrap gap-3"
          >
            {sizes.map((size) => (
              <div key={size}>
                <RadioGroupItem
                  value={size}
                  id={`size-${size}`}
                  className="sr-only"
                />
                <Label
                  htmlFor={`size-${size}`}
                  className={`w-10 h-10 flex items-center justify-center border-2 rounded-full cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <Button className="w-full">Add to Cart</Button>
    </div>
  );
};

export default ProductDetails;
