import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Rating, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Importando os estilos do Swiper
import { Navigation } from "swiper/modules"; // Para habilitar a navegação
import "swiper/css/navigation"; // Importando os estilos de navegação

type Product = {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: { rate: number; count: number }; // Avaliação do produto
};

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Buscar produtos da API Fake Store
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

  return (
    <Swiper
      modules={[Navigation]} // Habilitando o módulo de navegação
      spaceBetween={20} // Espaçamento entre os cards
      slidesPerView={4} // Exibir 4 cards por vez
      navigation // Adicionando os botões de navegação
      loop={true} // Fazendo o loop dos cards
      style={{ padding: "20px 0", width: "100%", boxSizing: "border-box" }} // Garantir que o Swiper tenha 100% de largura
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Card
            sx={{
              width: "100%",
              height: "320px", // Altura fixa para uniformidade
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <CardMedia
              component="img"
              alt={product.title}
              sx={{ height: "150px", objectFit: "contain" }} // Imagem consistente
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
              />
            </CardContent>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Comprar
            </Button>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductGrid;
