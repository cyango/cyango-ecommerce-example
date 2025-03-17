import React from "react";
import ImageGallery from "./ImageGallery";
import ProductDetails from "./ProductDetails";
import SpecificationTable from "./SpecificationTable";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "../types/product";

interface ProductPageProps {
  product: Product;
  onAddToCart?: () => void;
  registerIframeRef?: (productId: string, ref: HTMLIFrameElement | null) => void;
  onSizeChange?: (productId: string, size: string) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ 
  product, 
  onAddToCart,
  registerIframeRef,
  onSizeChange
}) => {
  // Convert colors array to colorOptions if colorOptions is not provided
  const colorOptions = product.colorOptions || product.colors.map(color => ({ color }));

  return (
    <Card className="product-page w-full">
      <CardContent className="p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <ImageGallery 
            media={product.media} 
            productId={product.id}
            registerIframeRef={registerIframeRef}
          />
          <ProductDetails
            name={product.name}
            price={product.price}
            description={product.description}
            rating={product.rating}
            reviewCount={product.reviewCount}
            colorOptions={colorOptions}
            sizes={product.sizes}
            onAddToCart={onAddToCart}
            productId={product.id}
            onSizeChange={onSizeChange}
          />
        </div>
        <div className="mt-6 overflow-x-auto">
          <SpecificationTable specifications={product.specifications} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPage; 