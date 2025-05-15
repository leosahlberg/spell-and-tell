import { Link } from "react-router";
import styles from "./navbar.module.scss";
import profileImage from "../../assets/profile.jpg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { User } from "../../utils/types";
import { useMediaQuery } from "@mui/material"; // Importera useMediaQuery
import { useTranslation } from "react-i18next";

type NavBarProps = {
  user: User;
};

const NavBar = ({ user }: NavBarProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { t } = useTranslation();

  const navList = [
    {
      title: user.name,
      img: (
        <img
          src={user.imgUrl ?? profileImage}
          alt="Profilbild"
          width={40}
          height={40}
          className={styles.img}
        />
      ),
      path: "/profile",
    },
    {
      title: t("navbar.home"),
      icon: <HomeOutlinedIcon />,
      path: "/",
    },
    {
      title: t("navbar.explore"),
      icon: <AutoStoriesOutlinedIcon />,
      path: "/stories",
    },
    {
      title: t("navbar.create"),
      icon: <AddCircleOutlineIcon />,
      path: "/createstory",
    },
  ];

  return (
    !isMobile && (
      <nav className={styles.navbar}>
        <ul className={styles.center}>
          {navList.map((item, index) => (
            <li key={index} className={styles.navitem}>
              <Link className={styles.links} to={item.path}>
                <p>{item.img}</p>
                <p className={`${styles.icon}`}>{item.icon}</p>
                <span className={styles.title}>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default NavBar;
