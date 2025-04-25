import React, { useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Product } from "./types/product";
import ProductPage from "./components/ProductPage";
import ProductList from "./components/ProductList";
import item3 from "./images/item3.png";
import item4 from "./images/item4.png";
const App: React.FC = () => {
  // Create a ref to store iframe references
  const iframeRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

  // Hero items for the gallery
  const heroItems = [
    {
      id: "hero-3",
      title: "Explore our 3D shop",
      description: "Use the keyboard, mouse or touch to navigate through the shop",
      media: {
        type: "iframe" as const,
        src: "https://story.cyango.com/66b9ca9aefd30bd7f6327350?scene=scene_16195997-8df7-4a7a-9ebb-ac2dcc73d407",
        iframeId: "hero-iframe",
      },
      ctaText: "Try Now",
      ctaLink: "https://story.cyango.com/66b9ca9aefd30bd7f6327350?scene=scene_16195997-8df7-4a7a-9ebb-ac2dcc73d407",
    },
  ];

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
      name: "Decorative Flower",
      price: 59.99,
      description:
        "A warm and stylish hoodie perfect for cooler weather. Features a soft inner lining and durable outer material.",
      media: [
        {
          type: "iframe",
          src: "https://story.cyango.com/66b9ca9aefd30bd7f6327350/?entity=entity_666b5496-7ee4-4014-b724-4ad14f8e2e15",
          thumbnailSrc: item3,
          iframeId: "hoodie-iframe"
        },
        {
          type: "image",
          src: item3,
          thumbnailSrc: item3,
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
      iframeConfig: {
        defaultScene: "default_hoodie_scene",
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
      id: "product-2",
      name: "Gaussian Flower",
      price: 59.99,
      description:
        "A beautiful flower scanned with Gaussian Splatting",
      media: [
        {
          type: "iframe",
          src: "https://story.cyango.com/66b9ca9aefd30bd7f6327350/?entity=entity_ac547d82-48ff-440c-8d93-d3a37fc0f117",
          thumbnailSrc: item4,
          iframeId: "hoodie-iframe"
        },
        {
          type: "image",
          src: item4,
          thumbnailSrc: item4,
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
      iframeConfig: {
        defaultScene: "default_hoodie_scene",
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
      name: "Decorative Flower",
      price: 59.99,
      description:
        "A warm and stylish hoodie perfect for cooler weather. Features a soft inner lining and durable outer material.",
      media: [
        {
          type: "iframe",
          src: "https://story.cyango.com/66b9ca9aefd30bd7f6327350/?entity=entity_666b5496-7ee4-4014-b724-4ad14f8e2e15",
          thumbnailSrc: item3,
          iframeId: "hoodie-iframe"
        },
        {
          type: "image",
          src: item3,
          thumbnailSrc: item3,
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
      iframeConfig: {
        defaultScene: "default_hoodie_scene",
        sizeScenes: {
          "S": "s_hoodie_scene",
          "M": "m_hoodie_scene",
          "L": "l_hoodie_scene",
          "XL": "xl_hoodie_scene",
          "XXL": "xxl_hoodie_scene"
        }
      }
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
    
    // For hero iframes, we need special handling
    if (ref && productId.startsWith('hero-')) {
      // Wait a bit for the iframe to load
      setTimeout(() => {
        console.log(`Hero iframe registered: ${productId}`);
        // You can send custom messages to the hero iframe here if needed
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
      
      {!selectedProduct && (
        <Hero 
          items={heroItems} 
          registerIframeRef={registerIframeRef}
        />
      )}

      <main className="flex-grow">
        <div className={`container mx-auto p-4 ${!selectedProduct ? 'mt-4' : ''}`}>
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
            <>
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
              <ProductList products={products} onSelectProduct={handleProductSelect} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
