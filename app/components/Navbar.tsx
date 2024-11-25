"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Switch,
  CircularProgress,
} from "@mui/material";
import {
  MdSearch,
  MdFavoriteBorder,
  MdShoppingCart,
  MdAccountCircle,
  MdMenu,
} from "react-icons/md";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { auth } from "../../lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  console.log(userID)
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      console.log("Usuário deslogado com sucesso");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid || "id");
        setDisplayName(user.displayName || "Usuário");
      } else {
        setDisplayName("");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: darkMode ? "black" : "white",
        color: darkMode ? "white" : "black",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MdMenu />
        </IconButton>

        <Box
          sx={{
            width: 150,
            height: 50,
            backgroundColor: darkMode ? "grey.800" : "grey.300",
            borderRadius: 1,
            display: { xs: "none", sm: "block" },
          }}
        >
          <Link href="/">Home</Link>
        </Box>

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

        <IconButton color="inherit" size="large">
          <Badge badgeContent={0} color="error">
            <MdFavoriteBorder />
          </Badge>
        </IconButton>

        <IconButton color="inherit" size="large">
          <Link href={'/cart'}>
          <Badge badgeContent={cartItemsCount} color="error">
            <MdShoppingCart />
          </Badge>
          </Link>
        </IconButton>

        <Switch checked={darkMode} onChange={toggleDarkMode} />

        {displayName ? (
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <MdAccountCircle />
            <p>{displayName}</p>
          </IconButton>
        ) : (
          <Link href="/login">
            <IconButton color="inherit">
              <MdAccountCircle />
            </IconButton>
          </Link>
        )}

        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Minha Conta</MenuItem>
          <MenuItem onClick={handleMenuClose}>Meus Pedidos</MenuItem>
          <MenuItem onClick={handleLogout}>
            {isLoading ? <CircularProgress size={20} /> : "Sair"}
          </MenuItem>
        </Menu>
      </Toolbar>

      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Favoritos" />
          </ListItem>
          <ListItem onClick={handleDrawerToggle}>
            <ListItemText primary="Carrinho" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
