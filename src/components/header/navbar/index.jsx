import { Link } from "react-router-dom";

// Navbar.jsx = components/header/navbar/
// Assets = components/assets/

import "../../style.css";

import Logo from "../../assets/arp.png";
import searchIcon from "../../assets/icons/magnifying-glass-solid.svg";
import heartIcon from "../../assets/icons/heart-regular.svg";
import cartIcon from "../../assets/icons/cart-shopping-solid.svg";
import userIcon from "../../assets/icons/user-regular.svg";
import menuBars from "../../assets/icons/bars-solid.svg";

export default function Navbar() {

  const toggleMenu = () => {
    const menu = document.querySelector(".mobileMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={Logo} alt="logo" />
      </Link>

      <span className="navPages">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </span>

      <span className="navIcons">
        <Link to="/search"><img src={searchIcon} alt="" /></Link>
        <Link to="/wishlist"><img src={heartIcon} alt="" /></Link>
        <Link to="/cart"><img src={cartIcon} alt="" /></Link>
        <Link to="/account"><img src={userIcon} alt="" /></Link>
      </span>

      <span className="mobileMenu">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </span>

      <img
        className="menuIcon"
        src={menuBars}
        alt="Menu Icon"
        onClick={toggleMenu}
      />
    </nav>
  );
}
