import { useEffect, useState } from "react";
import { Carousel } from "./Utils";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(process.env.REACT_APP_PRODUCTS);
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
