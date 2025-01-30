import { Link } from "react-router";
import styles from "./navbar.module.scss";
import profileImage from "../../assets/profile.jpg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navList = [
    {
      title: "Elsa",
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
      title: "Utforska berättelser",
      icon: <AutoStoriesOutlinedIcon />,
      path: "/storys",
    },
    {
      title: "Skapa ny berättelse",
      icon: <AddCircleOutlineIcon />,
      path: "/createstory",
    },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
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
  );
};

export default NavBar;
