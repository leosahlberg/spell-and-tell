import style from "./header.module.scss";
import logo from "../../assets/logoST2.png";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import Button from "../buttons/Button";

type HeaderProps = {
  loggedIn: boolean;
};

const Header = (props: HeaderProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const NavList = [
    { title: "Hem", icon: <HomeIcon />, path: "/" },
    { title: "Profil", icon: <AccountCircleIcon />, path: "/profile" },
    { title: "Skapa ny story", icon: <AddCircleIcon />, path: "/createstory" },
    { title: "Alla berättelser", icon: <LibraryBooksIcon />, path: "/stories" },
    { title: "Regler och villkor", icon: <InfoIcon />, path: "/terms" },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {NavList.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Logga ut"} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <header className={style.header}>
      <div className={style.headerContent}>
        <img
          src={logo}
          alt="Spell and Tell logotyp med en penna som symboliserar kreativt skrivande"
        />
        <div className={style.title} onClick={() => navigate("/")}>
          <h1>Spell & Tell</h1>
          <p>Skapa kreativa berättelser tillsammans</p>
        </div>
        {props.loggedIn ? (
          <div className={style.menubar}>
            <MenuIcon
              sx={{
                fontSize: "40px",
                marginLeft: 20,
                marginRight: 5,
                cursor: "pointer",
              }}
              onClick={toggleDrawer(true)}
            />
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        ) : (
          <Button text="Logga in" className={style.button} onClick={() => navigate("/login")}>
          </Button>
        )}
      </div>
      <div className={style.underline}></div>
    </header>
  );
};

export default Header;
