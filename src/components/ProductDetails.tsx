import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, StarHalf } from "lucide-react";
import { ColorOption } from "../types/product";

interface ProductDetailsProps {
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  colors?: string[]; // Keep for backward compatibility
  colorOptions?: ColorOption[]; // Make optional for backward compatibility
  sizes: string[];
  onAddToCart?: () => void;
  productId?: string; // Add product ID for iframe messaging
  onSizeChange?: (productId: string, size: string) => void; // Add size change handler
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  price,
  description,
  rating,
  reviewCount,
  colors = [],
  colorOptions = [],
  sizes,
  onAddToCart,
  productId,
  onSizeChange,
}) => {
  // Use colorOptions if provided, otherwise convert colors to colorOptions
  const finalColorOptions: ColorOption[] = colorOptions.length > 0 
    ? colorOptions 
    : colors.map(color => ({ color }));
    
  const [selectedColor, setSelectedColor] = useState(
    finalColorOptions.length > 0 ? finalColorOptions[0].color : ""
  );
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);

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

  const handleColorChange = (colorValue: string) => {
    setSelectedColor(colorValue);
    
    // Find the color option and execute its onClick function if it exists
    const selectedOption = finalColorOptions.find(option => option.color === colorValue);
    if (selectedOption?.onClick) {
      selectedOption.onClick();
    }
  };

  const handleSizeChange = (sizeValue: string) => {
    setSelectedSize(sizeValue);
    
    // Notify parent component about size change if handler is provided
    if (onSizeChange && productId) {
      onSizeChange(productId, sizeValue);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
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
        {finalColorOptions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <RadioGroup
              value={selectedColor}
              onValueChange={handleColorChange}
              className="flex space-x-3"
            >
              {finalColorOptions.map((colorOption) => (
                <div key={colorOption.color}>
                  <RadioGroupItem
                    value={colorOption.color}
                    id={`color-${colorOption.color}`}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={`color-${colorOption.color}`}
                    className={`w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center ${
                      selectedColor === colorOption.color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colorOption.color }}
                  >
                    {selectedColor === colorOption.color && (
                      <div className="w-6 h-6 rounded-full bg-white opacity-30"></div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <RadioGroup
            value={selectedSize}
            onValueChange={handleSizeChange}
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

        <div>
          <h3 className="text-sm font-medium mb-2">Quantity</h3>
          <div className="flex items-center">
            <button 
              onClick={decrementQuantity}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
            >
              -
            </button>
            <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
              {quantity}
            </div>
            <button 
              onClick={incrementQuantity}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default ProductDetails;
