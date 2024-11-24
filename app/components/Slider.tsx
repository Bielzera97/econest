"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper e SwiperSlide
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import dos módulos
import "swiper/css"; // Estilos básicos do Swiper
import "swiper/css/navigation"; // Estilos do módulo de navegação
import "swiper/css/pagination"; // Estilos do módulo de paginação
import Image from "next/image";
import { Typography, Button } from "@mui/material";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Banner = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const MainSlider: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
        const data = response.data.map((item: Product) => ({
          id: item.id,
          image: item.image,
          title: item.title,
          description: item.description,
        }));
        setBanners(data.slice(0, 5)); // Limita a 5 banners
      } catch (error) {
        console.error("Erro ao buscar banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Módulos habilitados
      navigation // Botões de navegação
      pagination={{ clickable: true }} // Paginador clicável
      autoplay={{ delay: 4000 }} // Transição automática
      loop // Loop infinito
      style={{ width: "100%", height: "400px", marginTop: 80 }} // Estilização do Swiper
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
            <Image
              src={banner.image}
              alt={banner.title}
              layout="fill"
              objectFit="contain"
              priority
            />
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: 20,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px 20px",
                borderRadius: 8,
              }}
            >
              <Typography variant="h5" gutterBottom>
                {banner.title}
              </Typography>
              <Typography variant="body1">{banner.description}</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                <a href={`/product/${banner.id}`}>Saiba Mais</a>
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
