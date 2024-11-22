"use client"
import ProductGrid from "./components/ProductGrid";
import MainSlider from "./components/Slider";



export default function Home() {

  return (
    <main className="flex flex-col gap-3" >
      <MainSlider/>
      <ProductGrid/>
    </main>
  );
}
