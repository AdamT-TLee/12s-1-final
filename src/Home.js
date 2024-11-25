import { Carousel } from "./Utils";

export default function Home() {
  return (
    <div className="bg-dark-subtle">
      <h1 className="text-center mt-3">Popular Products</h1>
      <Carousel id={"popularProducts"} />

      <h1 className="text-center mt-3">Top Selling Products</h1>
      <Carousel id={"topSellingProducts"} />
    </div>
  );
}
