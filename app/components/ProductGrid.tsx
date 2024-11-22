import React from "react";
import { Card, CardContent, CardMedia, Typography, Rating, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Importando os estilos do Swiper
import { Navigation } from "swiper/modules"; // Para habilitar a navegação
import "swiper/css/navigation"; // Importando os estilos de navegação

type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
  rating: number; // Avaliação do produto (por exemplo, de 0 a 5)
};

const products: Product[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200?text=Produto+1",
    name: "Produto 1",
    price: 99.99,
    rating: 4.5,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200?text=Produto+2",
    name: "Produto 2",
    price: 149.99,
    rating: 4.0,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200?text=Produto+3",
    name: "Produto 3",
    price: 79.99,
    rating: 4.2,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x200?text=Produto+4",
    name: "Produto 4",
    price: 79.99,
    rating: 4.2,
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x200?text=Produto+5",
    name: "Produto 5",
    price: 109.99,
    rating: 3.5,
  },
  // Adicione mais produtos conforme necessário
];

const ProductGrid: React.FC = () => {
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
          <Card sx={{ maxWidth: "100%", width: "100%" }}>
            <CardMedia
              component="img"
              alt={product.name}
              height="200"
              image={product.image}
              title={product.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
              <Rating name="read-only" value={product.rating} readOnly precision={0.5} />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Comprar
              </Button>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductGrid;
