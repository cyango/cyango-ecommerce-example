import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "../types/product";

interface ProductListProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelectProduct }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectProduct(product.id)}
          >
            <CardContent className="p-4">
              <div className="aspect-square w-full overflow-hidden mb-4">
                {product.media[0]?.type === "image" ? (
                  <img 
                    src={product.media[0].src} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>Preview not available</span>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <div className="flex space-x-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div 
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList; 