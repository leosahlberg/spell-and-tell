import { Link } from "react-router";
import styles from "./navbar.module.scss";
import profileImage from "../../assets/profile.jpg";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const NavBar = () => {
  const navList = [
    {
      title: "Elsa",
      img: (
        <img
          src={profileImage}
          alt="Profile"
          width={45}
          height={45}
          className={styles.img}
        />
      ),
      path: "profile",
    },
    { title: "Medverka i berättelse", 
        icon: <AutoStoriesOutlinedIcon/>,
        path: "/contribute" },
    {
      title: "Skapa ny berättelse",
      icon: <AddCircleOutlineIcon/>,
      path: "/createstory",
    },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.center}>
        {navList.map((l, index) => (
          <Link className={styles.links} key={index} to={l.path}>
            <p >{l.img}</p>
            <p className={styles.icon}>{l.icon}</p>
            <p>{l.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
