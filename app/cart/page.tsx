"use client";

import { Box, Typography, Button, Paper, Divider, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { removeItem, clearCart } from "@/app/features/cartSlice";
import Navbar from "../components/Navbar";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh", marginTop: "75px" }}>
        <Paper elevation={3} sx={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
            Meu Carrinho
          </Typography>
          {cart.items.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary">
              O carrinho está vazio.
            </Typography>
          ) : (
            <Box>
              {cart.items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.quantity} x R$ {item.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ marginRight: "10px" }}>
                    R$ {(item.quantity * item.price).toFixed(2)}
                  </Typography>
                  <IconButton
                    color="secondary"
                    onClick={() => dispatch(removeItem(item.id))}
                    aria-label="Remover item"
                  >
                    <MdDelete size={24} />
                  </IconButton>
                </Box>
              ))}
              <Divider sx={{ marginY: "20px" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  R$ {cart.total.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="error"
                sx={{ marginTop: "20px", width: "100%" }}
                onClick={() => dispatch(clearCart())}
              >
                Limpar Carrinho
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Cart;
