import { Link } from "react-router";
import styles from "./navbar.module.scss";
import profileImage from "../../assets/profile.jpg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { User } from "../../utils/types";
import { useMediaQuery } from "@mui/material"; // Importera useMediaQuery

type NavBarProps = {
  user: User;
};

const NavBar = ({ user }: NavBarProps) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const navList = [
    {
      title: user.username,
      img: (
        <img
          src={profileImage}
          alt="Profilbild"
          width={40}
          height={40}
          className={styles.img}
        />
      ),
      path: "profile",
    },
    {
      title: "Startsida",
      icon: <HomeOutlinedIcon />,
      path: "/",
    },
    {
      title: "Utforska berättelser",
      icon: <AutoStoriesOutlinedIcon />,
      path: "/stories",
    },
    {
      title: "Skapa ny berättelse",
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
                <h1 className={styles.title}>{item.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default NavBar;
