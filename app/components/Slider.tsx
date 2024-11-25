"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
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
        setBanners(data.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop
      className="w-full h-[400px] mt-8"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative h-full overflow-hidden">
            <Image
              src={banner.image}
              alt={banner.title}
              layout="fill"
              objectFit="contain"
              priority

            />
            <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-4 rounded-md">
              <Typography variant="h5" className="font-bold">
                {banner.title}
              </Typography>
              <Typography variant="body1" className="text-sm">
                {banner.description}
              </Typography>
              <Link href={`/product/${banner.id}`}>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-2"
                >
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
