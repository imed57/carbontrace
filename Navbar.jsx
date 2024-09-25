import React, { useState } from "react";
import Image from "next/image";
import images from "../assets/index";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-custom-dark-green z-50">
      <div className="flex items-center">
        <Image
          src={images.logo_carbon}
          alt="Carbon Trace Logo"
          width={180}
          height={40}
        />
      </div>

      <div className="flex items-center space-x-6 text-sm">
        <button className="focus:outline-none" onClick={toggleTheme}>
          <span className="bg-purple-400 p-2 rounded-full">
            {theme === "light" ? "🌙" : "☀️"}
          </span>
        </button>
        <a href="#" className="hover:underline">
          Explorer NFT's
        </a>
        <a href="#" className="hover:underline">
          Liste des NFT's
        </a>
        <a href="#" className="hover:underline">
          Mon compte
        </a>
        <button className="bg-custom-light-green px-4 py-2 rounded-md">
          Connexion
        </button>
      </div>
    </header>
  );
};

export default Navbar;
