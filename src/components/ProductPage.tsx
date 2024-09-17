import React from "react";
import ImageGallery from "./ImageGallery";
import ProductDetails from "./ProductDetails";
import SpecificationTable from "./SpecificationTable";
import { Card, CardContent } from "@/components/ui/card";

interface MediaItem {
  type: "image" | "iframe";
  src: string;
  thumbnailSrc?: string;
}

interface ProductPageProps {
  product: {
    name: string;
    price: number;
    description: string;
    media: MediaItem[];
    specifications: Array<{ key: string; value: string }>;
    rating: number;
    reviewCount: number;
    colors: string[];
    sizes: string[];
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <Card className="product-page">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageGallery media={product.media} />
          <ProductDetails
            name={product.name}
            price={product.price}
            description={product.description}
            rating={product.rating}
            reviewCount={product.reviewCount}
            colors={product.colors}
            sizes={product.sizes}
          />
        </div>
        <SpecificationTable specifications={product.specifications} />
      </CardContent>
    </Card>
  );
};

export default ProductPage;
