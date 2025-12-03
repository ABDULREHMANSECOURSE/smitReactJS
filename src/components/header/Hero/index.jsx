import React from "react";

// Assets import
import cartIcon from "../../assets/icons/cart-shopping-solid.svg";
import astroImage from "../../assets/astro-a50-x-white-gallery-7.png";

export default function Hero() {
  return (
    <span className="headerContent">
      <span className="headerText">
        <h4>Aukat Kee Bahir Headphone</h4>
        <h1>
          ASTRO A50 X LIGHTSPEED <br /> WIRELESS
        </h1>
        <p>
          Experience next-level wireless gaming audio with the ASTRO A50 Wireless
          + Base Station. Engineered for pro-grade performance, the ASTRO A50
          delivers superior sound quality, unrivaled comfort, and advanced
          features to elevate your gaming experience.
        </p>
        <button>
          <img src={cartIcon} alt="Cart Icon" /> Shop Now
        </button>
      </span>

      <span className="headerImage">
        <img src={astroImage} alt="ASTRO A50 X" />
      </span>
    </span>
  );
}
