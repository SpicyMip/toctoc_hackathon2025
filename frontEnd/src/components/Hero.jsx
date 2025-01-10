// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full bg-gray-200 flex items-center justify-center">
      <img
        src="https://imanquehue.com/content/uploads/casas-estilo-chilenas.jpg"
        alt="Imagen destacada"
        className="object-cover w-full h-96"
      />
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-4 rounded">
        <h1 className="text-xl font-bold text-gray-900">Portal Inmobiliario</h1>
        <p className="text-gray-700">
          Encuentra la mejor opción de arriendo o compra.
        </p>
      </div>
    </section>
  );
};

export default Hero;
