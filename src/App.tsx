import React from "react";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";

const App: React.FC = () => {
  const product = {
    name: "Example Product",
    price: 99.99,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    media: [
      {
        type: "image" as const,
        src: "https://via.placeholder.com/550x550",
        thumbnailSrc: "https://via.placeholder.com/132x132",
      },
      {
        type: "image" as const,
        src: "https://via.placeholder.com/550x550",
        thumbnailSrc: "https://via.placeholder.com/132x132",
      },
      {
        type: "iframe" as const,
        src: "https://www.cyango.com/story/66d8a563c4d35de3f73ff3c6?scene=scene_9f69e9d9-645f-479e-92a0-49ffa7c41562",
        thumbnailSrc: "/item3.png",
      },
    ],
    specifications: [
      { key: "Color", value: "Black" },
      { key: "Size", value: "Medium" },
      { key: "Material", value: "Cotton" },
    ],
    rating: 4.5,
    reviewCount: 123,
    colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF"],
    sizes: ["XS", "S", "M", "L", "XL"],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <ProductPage product={product} />
        </div>
      </main>
    </div>
  );
};

export default App;
