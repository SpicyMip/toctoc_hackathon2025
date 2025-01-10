// src/components/CTA.jsx
import React from "react";

const CTA = ({ data }) => {
  if (!data) {
    return (
      <section className="py-8">
        <div className="bg-blue-100 p-6 rounded">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            ¿Buscas un nuevo hogar?
          </h2>
          <p className="text-blue-700 mb-4">
            Usa el ChatBot para cargar propiedades y revisar opciones.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Contactar
          </button>
        </div>
      </section>
    );
  }

  const { page, totalPages } = data;

  return (
    <section className="py-8">
      <div className="bg-blue-100 p-6 rounded">
        <h2 className="text-xl font-bold text-blue-800 mb-2">
          ¿Necesitas más opciones?
        </h2>
        <p className="text-blue-700 mb-4">
          Estás viendo la página {page} de {totalPages}.  
          Usa el chatbot para cargar más resultados o refinar tu búsqueda.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
          Ver más propiedades
        </button>
      </div>
    </section>
  );
};

export default CTA;
