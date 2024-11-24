"use client";
import ProductGrid from "./components/ProductGrid";
import MainSlider from "./components/Slider";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    
      <main className="flex flex-col gap-3">
        <Navbar/>
        <MainSlider />
        <ProductGrid />
      </main>
    
  );
}
