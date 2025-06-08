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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import Button from "../buttons/Button";
import swe from "../../assets/sweden.jpg";
import eng from "../../assets/england.jpg";
import NavBar from "../navbar/NavBar";
import { User } from "../../utils/types";
import backgroundImage from "../../assets/bookimg.jpg";

type HeaderProps = {
  loggedIn: boolean;
};

const Header = (props: HeaderProps) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);
  const [selectedFlag, setSelectedFlag] = React.useState(swe);
  const user = useSelector<RootState>((state) => state.auth.user) as User;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const NavList = [
    { title: t("header.home"), icon: <HomeIcon />, path: "/" },
    {
      title: t("header.profile"),
      icon: <AccountCircleIcon />,
      path: "/profile",
    },
    {
      title: t("header.createStory"),
      icon: <AddCircleIcon />,
      path: "/createstory",
    },
    {
      title: t("header.allStories"),
      icon: <LibraryBooksIcon />,
      path: "/stories",
    },
    { title: t("header.terms"), icon: <InfoIcon />, path: "/terms" },
  ];

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);

    if (language === "sv") {
      setSelectedFlag(swe);
    } else if (language === "en") {
      setSelectedFlag(eng);
    }
  };

  React.useEffect(() => {
    setSelectedLanguage(i18n.language);
    setSelectedFlag(i18n.language === "sv" ? swe : eng);
  }, []);

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.57), rgba(255, 255, 255, 0.05)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.57), rgba(255, 255, 255, 0.05))",
        }}
      >
        {NavList.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              onClick={() => {
                toggleDrawer(false)();
                navigate(item.path);
              }}
              sx={{
                "&:focus-visible": {
                  outline: "2px solid #0571EC",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem
        disablePadding
        sx={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.57), rgba(255, 255, 255, 0.05))",
        }}
      >
        <ListItemButton
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          sx={{
            "&:focus-visible": {
              outline: "2px solid #0571EC",
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary={t("header.logout")} />
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
          <p> {t("header.subtitle")}</p>
        </div>
        <div className={style.language}>
          <img
            src={selectedFlag}
            alt={selectedLanguage === "sv" ? "Svenska" : "English"}
            className={style.flag}
          />
          <label htmlFor="language-select" className={style.flagnametext}>
            Välj språk
          </label>
          <select
            id="language-select"
            className={style.flagname}
            onChange={(e) => handleChangeLanguage(e.target.value)}
            value={selectedLanguage}
           
          >
            <option value="sv">Sve</option>
            <option value="en">Eng</option>
          </select>

          {props.loggedIn ? (
            <div>
              <MenuIcon
                className={style.menubar}
                tabIndex={0}
                sx={{
                  fontSize: "40px",
                  marginLeft: 20,
                  marginRight: 5,
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={toggleDrawer(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    toggleDrawer(true)();
                  }
                }}
              />
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </div>
          ) : (
            <>
              <Button
                text={t("welcome.loggin")}
                style={{ marginRight: 20 }}
                onClick={() => navigate("/login")}
              ></Button>
            </>
          )}
        </div>
      </div>
      {props.loggedIn ? (
        <>
          <div className={style.underline}></div>
          <NavBar user={user} />
        </>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
