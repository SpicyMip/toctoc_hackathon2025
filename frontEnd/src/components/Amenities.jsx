// src/components/Amenities.jsx
import React from "react";

const Amenities = ({ data }) => {
  // Si no hay data, mensaje genérico
  if (!data) {
    return (
      <section className="py-8 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Comodidades / Info General
        </h2>
        <p className="text-gray-800">
          Esperando datos de propiedades para mostrar estadísticas...
        </p>
      </section>
    );
  }

  // Extraemos algunos campos
  const { totalDocs, totalPages, docs } = data;

  // Ejemplo: mostrar recuentos y quizá “tipos de propiedad” para un pseudo-amenity
  const uniquePropertyTypes = Array.from(
    new Set(docs?.map((p) => p.propertyFamilyType))
  );

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Información General
      </h2>
      <p className="mb-2 text-gray-800">
        <strong>Total de propiedades disponibles:</strong> {totalDocs}
      </p>
      <p className="mb-4 text-gray-800">
        <strong>Páginas totales:</strong> {totalPages}
      </p>
      {uniquePropertyTypes && uniquePropertyTypes.length > 0 && (
        <>
          <h3 className="text-xl font-medium mb-2 text-gray-900">
            Tipos de propiedad encontrados:
          </h3>
          <ul className="list-disc list-inside text-gray-800">
            {uniquePropertyTypes.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Amenities;
