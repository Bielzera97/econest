"use client";   
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper e SwiperSlide
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import dos módulos
import "swiper/css"; // Estilos básicos do Swiper
import "swiper/css/navigation"; // Estilos do módulo de navegação
import "swiper/css/pagination"; // Estilos do módulo de paginação
import Image from "next/image";
import { Typography, Button } from "@mui/material";

type Banner = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const banners: Banner[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/1200x400?text=Banner+1",
    title: "Banner 1",
    description: "Descrição do primeiro banner.",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/1200x400?text=Banner+2",
    title: "Banner 2",
    description: "Descrição do segundo banner.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/1200x400?text=Banner+3",
    title: "Banner 3",
    description: "Descrição do terceiro banner.",
  },
];

const MainSlider: React.FC = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Módulos habilitados
      navigation // Botões de navegação
      pagination={{ clickable: true }} // Paginador clicável
      autoplay={{ delay: 4000 }} // Transição automática
      loop // Loop infinito
      style={{ width: "100%", height: "400px" }} // Estilização do Swiper
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
            <Image
              src={banner.image}
              alt={banner.title}
              layout="fill"
              objectFit="cover"
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
                Saiba Mais
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
