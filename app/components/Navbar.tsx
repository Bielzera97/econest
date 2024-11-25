"use client";
import React, { useEffect } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Box, Menu, MenuItem, Badge } from "@mui/material";
import { MdSearch, MdFavoriteBorder, MdShoppingCart, MdAccountCircle } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import {auth} from "../../lib/firebaseConfig"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(10),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
    },
  },
}));


export default function Navbar() {
  const [userID, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "account-menu";


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid || "id");
        setDisplayName(user.displayName || "Usuário");
        
      } else {
        setDisplayName("")
      }
    });

    console.log(userID)
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuário deslogado com sucesso");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}>
      <Toolbar>
        {/* Logo placeholder */}
        <Box sx={{ width: 150, height: 50, backgroundColor: "grey.300", borderRadius: 1 }}><Link href={"/"}>Home</Link></Box>

        {/* Search bar */}
        <StyledSearch>
          <StyledInputBase
            placeholder="Buscar…"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton>
            <MdSearch />
          </IconButton>
        </StyledSearch>

        <Box sx={{ flexGrow: 1 }} />

        {/* Favorites button */}
        <IconButton color="inherit" size="large">
          <Badge badgeContent={0} color="error">
            <MdFavoriteBorder />
          </Badge>
        </IconButton>

        {/* Cart button */}
        <IconButton color="inherit" size="large">
          <Badge badgeContent={0} color="error">
            <MdShoppingCart />
          </Badge>
        </IconButton>

        {displayName ? <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <MdAccountCircle />
          <p>{displayName}</p>
          <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Minha Conta</MenuItem>
          <MenuItem onClick={handleMenuClose}>Meus Pedidos</MenuItem>
          <MenuItem onClick={handleLogout}>Sair</MenuItem>
        </Menu>
        </IconButton>
         :
         <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <MdAccountCircle />
          <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem><Link href={'/login'}>Login</Link></MenuItem>
          <MenuItem><Link href={'/register'}>Register</Link></MenuItem>
        </Menu>
        </IconButton>}


      </Toolbar>
    </AppBar>
  );
}
