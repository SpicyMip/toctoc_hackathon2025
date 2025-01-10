// src/components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <img
            src="https://www.toctoc.com/_nuxt/img/logo-toctoc.12dab62.png"
            alt="Logo"
            className="h-8 w-auto"
          />
          <span className="text-gray-800 font-bold">Mi Inmobiliaria</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Inicio
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Propiedades
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
