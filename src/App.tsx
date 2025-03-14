import React, { useState, useRef } from "react";
import Header from "./components/Header";
import { Product } from "./types/product";
import ProductPage from "./components/ProductPage";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  // Create a ref to store iframe references
  const iframeRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

  const sendMessageToIframe = (productId: string, data: any) => {
    console.log(`Sending message to iframe for product ${productId}:`, data);
    const iframe = iframeRefs.current[productId];
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify(data), "*");
    } else {
      console.warn(`Iframe for product ${productId} not found or not ready`);
    }
  };

  function updateIframeScene(productId: string, color: string) {
    // Format the code as a properly escaped string
    const codeString = `
      /**
       * Recursively searches for an entity with a specific property
       * @param entities - Array of entities to search through
       * @param predicate - Function that returns true when the desired entity is found
       * @returns The found entity or undefined
       */
      const findEntityRecursive = (entities, predicate) => {
        if (!entities || !Array.isArray(entities)) return undefined;
        
        for (const entity of entities) {
          // Check if current entity matches the predicate
          if (predicate(entity)) {
            return entity;
          }
          
          // Check if entity has children
          if (entity.children && Array.isArray(entity.children) && entity.children.length > 0) {
            console.log("entity.children", entity.children);
          // Recursively search in children
            const foundInChildren = findEntityRecursive(entity.children, predicate);
            if (foundInChildren) {
              return foundInChildren;
            }
          }
        }
        
        return undefined;
      };

      const teste = () => {
        const updatedScene = structuredClone(cyango.story.storyJson.scenes.find((scene) => scene.id === "scene_e9442bea-5fab-439b-8f97-5e99479142e5"));
        
        // Example usage: find entity with a specific tag
        const foundEntity = findEntityRecursive(updatedScene?.entities, (entity) => {
          console.log("entity", entity);
        if (!entity.tags) return false;
          return entity.tags.some(tag => tag.name === "Vase");
        });
        
        if (foundEntity) {
          console.log("Found entity:", foundEntity);
          // Use the color passed directly from the function parameter
          const colorToApply = "${color}";
          console.log("Applying color:", colorToApply);
          foundEntity.material.currentValue.color = colorToApply;
        } else {
          console.log("Entity not found");
        }
        
        console.log(updatedScene);
        
        cyango.story.mutateActiveScene(updatedScene);
      };
      
      teste();
    `;

    // Send the message with properly formatted code
    sendMessageToIframe(productId, { 
      type: "CUSTOM_CODE", 
      customCode: {
        code: codeString
      }
    });
  }

  // Define custom color click handlers with scene IDs
  const handleBlackColorClick = () => {
    console.log("Black color selected");
    if (selectedProduct) {
      updateIframeScene(selectedProduct.id, "#000000");
    }
  };

  const handleWhiteColorClick = () => {
    console.log("White color selected");
    if (selectedProduct) {
      updateIframeScene(selectedProduct.id, "#FFFFFF");
    }
  };

  const handleRedColorClick = () => {
    console.log("Red color selected");
    if (selectedProduct) {
      updateIframeScene(selectedProduct.id, "#FF0000");
    }
  };

  const handleBlueColorClick = () => {
    console.log("Blue color selected");
    if (selectedProduct) {
      updateIframeScene(selectedProduct.id, "#0000FF");
    }
  };

  const colorOptions = [
    { color: "#000000", onClick: handleBlackColorClick },
    { color: "#FFFFFF", onClick: handleWhiteColorClick },
    { color: "#FF0000", onClick: handleRedColorClick },
    { color: "#0000FF", onClick: handleBlueColorClick },
  ];

  // Create an array of products with iframe configuration
  const products: Product[] = [
    {
      id: "product-1",
      name: "Classic T-Shirt",
      price: 29.99,
      description:
        "A comfortable and versatile t-shirt made from premium cotton. Perfect for everyday wear and available in multiple colors.",
      media: [
        {
          type: "image" as const,
          src: "/item1.png",
          thumbnailSrc: "/item1.png",
        },
        {
          type: "image" as const,
          src: "/item2.png",
          thumbnailSrc: "/item2.png",
        },
      ],
      specifications: [
        { key: "Color", value: "Multiple options" },
        { key: "Size", value: "XS to XL" },
        { key: "Material", value: "100% Cotton" },
        { key: "Care", value: "Machine wash cold" },
      ],
      rating: 4.5,
      reviewCount: 123,
      colors: colorOptions.map(option => option.color),
      colorOptions: colorOptions,
      sizes: ["XS", "S", "M", "L", "XL"],
      iframeConfig: {
        defaultScene: "default_scene",
        colorScenes: {
          "#000000": "black_tshirt_scene",
          "#FFFFFF": "white_tshirt_scene",
          "#FF0000": "red_tshirt_scene",
          "#0000FF": "blue_tshirt_scene"
        },
        sizeScenes: {
          "XS": "xs_tshirt_scene",
          "S": "s_tshirt_scene",
          "M": "m_tshirt_scene",
          "L": "l_tshirt_scene",
          "XL": "xl_tshirt_scene"
        }
      }
    },
    {
      id: "product-2",
      name: "Premium Hoodie",
      price: 59.99,
      description:
        "A warm and stylish hoodie perfect for cooler weather. Features a soft inner lining and durable outer material.",
      media: [
        {
          type: "iframe" as const,
          src: "https://www.cyango.com/story/66b9ca9aefd30bd7f6327350/?entity=entity_ea00e8a6-9343-4b70-8223-4340606504d8",
          thumbnailSrc: "/item3.png",
          iframeId: "hoodie-iframe"
        },
        {
          type: "image" as const,
          src: "/item2.png",
          thumbnailSrc: "/item2.png",
        },
      ],
      specifications: [
        { key: "Color", value: "Multiple options" },
        { key: "Size", value: "S to XXL" },
        { key: "Material", value: "80% Cotton, 20% Polyester" },
        { key: "Care", value: "Machine wash cold, tumble dry low" },
      ],
      rating: 4.8,
      reviewCount: 87,
      colors: colorOptions.map(option => option.color),
      colorOptions: colorOptions,
      sizes: ["S", "M", "L", "XL", "XXL"],
      iframeConfig: {
        defaultScene: "default_hoodie_scene",
        colorScenes: {
          "#000000": "black_hoodie_scene",
          "#FFFFFF": "white_hoodie_scene",
          "#FF0000": "red_hoodie_scene",
          "#0000FF": "blue_hoodie_scene"
        },
        sizeScenes: {
          "S": "s_hoodie_scene",
          "M": "m_hoodie_scene",
          "L": "l_hoodie_scene",
          "XL": "xl_hoodie_scene",
          "XXL": "xxl_hoodie_scene"
        }
      }
    },
    {
      id: "product-3",
      name: "Slim Fit Jeans",
      price: 49.99,
      description:
        "Modern slim fit jeans with a comfortable stretch. These jeans offer both style and comfort for everyday wear.",
      media: [
        {
          type: "image" as const,
          src: "/item3.png",
          thumbnailSrc: "/item3.png",
        },
      ],
      specifications: [
        { key: "Color", value: "Blue Denim" },
        { key: "Size", value: "28 to 38" },
        { key: "Material", value: "95% Cotton, 5% Elastane" },
        { key: "Care", value: "Machine wash cold, inside out" },
      ],
      rating: 4.3,
      reviewCount: 56,
      colors: ["#000080", "#0000FF", "#1E90FF"],
      colorOptions: [
        { color: "#000080" },
        { color: "#0000FF" },
        { color: "#1E90FF" },
      ],
      sizes: ["28", "30", "32", "34", "36", "38"],
    },
  ];

  // State to track the currently selected product
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // State to track cart items
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Find the selected product or default to the first one
  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) 
    : null;

  // Function to handle product selection
  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
  };

  // Function to go back to product list
  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  // Function to handle adding items to cart
  const handleAddToCart = () => {
    setCartItemCount(prevCount => prevCount + 1);
    // Show a success message
    alert(`${selectedProduct?.name} added to cart!`);
  };

  // Function to handle size changes
  const handleSizeChange = (productId: string, size: string) => {
    console.log(`Size changed for product ${productId}: ${size}`);
    
    // Find the product
    const product = products.find(p => p.id === productId);
    if (!product || !product.iframeConfig?.sizeScenes) return;
    
    // Get the scene ID for this size
    const sceneId = product.iframeConfig.sizeScenes[size];
    if (sceneId) {
      updateIframeScene(productId, sceneId);
    }
  };

  // Function to register an iframe reference
  const registerIframeRef = (productId: string, ref: HTMLIFrameElement | null) => {
    iframeRefs.current[productId] = ref;
    
    // If we have a valid iframe and a selected product with a default scene, send it
    if (ref && selectedProduct?.iframeConfig?.defaultScene) {
      // Wait a bit for the iframe to load
      setTimeout(() => {
        updateIframeScene(productId, selectedProduct.iframeConfig!.defaultScene!);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        productCount={cartItemCount}
        onHomeClick={handleBackToList}
        onProductsClick={handleBackToList}
      />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          {selectedProduct ? (
            <>
              <button 
                onClick={handleBackToList}
                className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                ← Back to Products
              </button>
              <ProductPage 
                product={selectedProduct} 
                onAddToCart={handleAddToCart}
                registerIframeRef={registerIframeRef}
                onSizeChange={handleSizeChange}
              />
            </>
          ) : (
            <ProductList products={products} onSelectProduct={handleProductSelect} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
