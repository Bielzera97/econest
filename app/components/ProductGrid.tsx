import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: { rate: number; count: number };
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products?limit=5");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <Typography
        variant="h6"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        Nenhum produto encontrado.
      </Typography>
    );
  }

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={4}
      navigation
      loop
      style={{ padding: "20px 0", width: "100%", boxSizing: "border-box" }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        960: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
            <a style={{ textDecoration: "none" }} href={`/product/${product.id}`}>
              <Card
                sx={{
                  width: "100%",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  alt={`Imagem do produto: ${product.title}`}
                  sx={{
                    height: "150px",
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                  }}
                  image={product.image}
                  title={product.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={product.rating.rate}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: "auto", alignSelf: "center", width: "80%" }}
                >
                  Ver Detalhes
                </Button>
              </Card>
            </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductGrid;
