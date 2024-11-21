"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

type Product = {
  id: number;
  image: string;
  title: string;
}

export default function Home() {

  const [data, setData] = useState<Product[]>([])
  useEffect(() => {
    axios.get<Product[]>(`https://fakestoreapi.com/products?limit=10`).then(res => setData(res.data))
  }, [])


  console.log(data)


  return (
    <main className="grid grid-cols-5 gap-5">
      {data.map((product) => {
        return(
            <ProductCard key={product.id} image={product.image} title={product.title}/>
        )
      })}

    </main>
  );
}
