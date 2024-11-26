import { useEffect, useState } from "react";
import { Carousel } from "./Utils";

export default function Home() {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8081/products");
      const data = await response.json();

      setProducts(data);
      console.log(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-dark-subtle">
      <h1 className="text-center mt-3">Popular Products</h1>
      <Carousel id={"popularProducts"} products={products} />

      <h1 className="text-center mt-3">Top Selling Products</h1>
      <Carousel id={"topSellingProducts"} products={products} />
    </div>
  );
}
