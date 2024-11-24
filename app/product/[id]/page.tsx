"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation"; // Importando useParams de next/navigation

import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: { rate: number; count: number };
};

const ProductPage: React.FC = () => {
  const { id } = useParams(); // Usando useParams para acessar o id da URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(
            `https://fakestoreapi.com/products/${id}`
          );
          setProduct(response.data);
        } catch (error) {
          console.log(error)
          setError("Erro ao buscar os detalhes do produto.");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Produto não encontrado.
        </Typography>
      </Box>
    );
  }

  return (
    <>
    <Navbar/>
    <Box sx={{ padding: "20px", display: "flex", gap: "20px", marginTop: "60px" }}>
      <Box sx={{ flex: 1 }}>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Categoria: {product.category}
        </Typography>
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h5" color="primary" gutterBottom>
          Preço: ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Avaliação: {product.rating.rate} ({product.rating.count} avaliações)
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Comprar Agora
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default ProductPage;
