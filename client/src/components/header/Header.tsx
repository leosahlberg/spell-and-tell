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

type HeaderProps = {
  loggedIn: boolean;
};

const Header = (props: HeaderProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const NavList = [
    { title: "Hem", icon: <HomeIcon />, path: "/" },
    { title: "Profil", icon: <AccountCircleIcon />, path: "/profile" },
    { title: "Skapa ny story", icon: <AddCircleIcon />, path: "/createstory" },
    { title: "Alla berättelser", icon: <LibraryBooksIcon />, path: "/storys" },
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
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={"Logga ut"} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <header>
      <img src={logo} alt="logo" />
      <div className={style.title} onClick={() => navigate("/")}>
        <h1>Spell & Tell</h1>
        <p>Skapa kreativa berättelser tillsammans</p>
      </div>
      {props.loggedIn ? (
        <>
          <MenuIcon
            sx={{ fontSize: "40px", marginLeft: 20, marginRight: 5 }}
            onClick={toggleDrawer(true)}
          />
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </>
      ) : (
        <button className={style.button} onClick={() => navigate("/login")}>
          <h3>Logga in</h3>
        </button>
      )}
    </header>
  );
};

export default Header;
