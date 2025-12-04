import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../style.css";
import Logo from "../../assets/arp.png";
import searchIcon from "../../assets/icons/magnifying-glass-solid.svg";
import heartIcon from "../../assets/icons/heart-regular.svg";
import cartIcon from "../../assets/icons/cart-shopping-solid.svg";
import userIcon from "../../assets/icons/user-regular.svg"; 
import menuBars from "../../assets/icons/bars-solid.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to hold the email's first letter
  const [userInitial, setUserInitial] = useState(null); 

  useEffect(() => {
    const loggedEmail = localStorage.getItem('logedAccount');
    
    if (loggedEmail) {
      setIsLoggedIn(true);

      // --- 👇 SIMPLIFIED LOGIC: Use the first letter of the email 👇 ---
      // Get the first character, convert it to uppercase, and set the state.
      const initial = loggedEmail.trim().charAt(1).toUpperCase();
      setUserInitial(initial);
      // --- 👆 END SIMPLIFIED LOGIC 👆 ---

    } else {
      setIsLoggedIn(false);
      setUserInitial(null);
    }
  }, []); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const mobileMenuClasses = `mobileMenu ${isMenuOpen ? 'open' : ''}`;

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

      <span className="navIcons" >
        {isLoggedIn ? (
          <> 
            <Link to="/search"><img src={searchIcon} alt="Search" /></Link>
            <Link to="/wishlist"><img src={heartIcon} alt="Wishlist" /></Link>
            <Link to="/cart"><img src={cartIcon} alt="Cart" /></Link>
            
            <Link to="/account">
              {/* --- 👇 Display Email Initial Element 👇 --- */}
              {userInitial ? (
                <div className="profile-initial-style">
                  {userInitial}
                </div>
              ) : (
                // Fallback to default user icon if login/email somehow fails
                <img src={userIcon} alt="Account Icon" /> 
              )}
              {/* --- 👆 End Display Email Initial Element 👆 --- */}
            </Link>
          </>
        ) : (
          <Link to="/account" className="signinBtn">Sign In</Link>
        )}
      </span>

      <span className={mobileMenuClasses}>
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