"use client";
import ProductGrid from "./components/ProductGrid";
import MainSlider from "./components/Slider";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      {/* Navbar responsiva e estilizada */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="flex flex-col gap-6 p-4 bg-gray-100 min-h-screen">
        {/* Slider principal */}
        <section className="w-full max-w-screen-xl mx-auto">
          <MainSlider />
        </section>

        {/* Grid de produtos */}
        <section className="w-full max-w-screen-xl mx-auto">
          <ProductGrid />
        </section>
      </main>
    </div>
  );
}
