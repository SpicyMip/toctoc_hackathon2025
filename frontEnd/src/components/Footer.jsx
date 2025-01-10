// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} Mi Inmobiliaria. Todos los derechos
          reservados.
        </p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white">
            Términos
          </a>
          <a href="#" className="hover:text-white">
            Privacidad
          </a>
          <a href="#" className="hover:text-white">
            Ayuda
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
