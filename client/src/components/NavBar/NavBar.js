import React from "react";
import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import Logo from "../../images/dog.png";
import { BiHome, BiPlusCircle } from "react-icons/bi";
import Button from "../Button/Button";

const links = [
  {
    icon: BiHome,
    to: "home",
    text: "Home",
  },
];

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.logoContainer}>
            <Link to="/">
              <img className={styles.logo} src={Logo} alt="Logo" />
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.text}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.navbarLink} ` + (isActive ? styles.active : "")
                }
                to={link.to}
              >
                {link.icon ? <link.icon /> : null}
                {link.text}
              </NavLink>
            </li>
          ))}
          <Link to="create" className={styles.navbarLinkButton}>
            <Button>
              <BiPlusCircle />
              Create
            </Button>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
