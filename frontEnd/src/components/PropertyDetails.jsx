// src/components/PropertyDetails.jsx
import React from "react";

const PropertyDetails = ({ data }) => {
  // Si no hay data aún, mostramos un texto genérico
  if (!data) {
    return (
      <section className="py-8 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Detalles de la Propiedad
        </h2>
        <p className="text-gray-800">
          Aún no hay propiedades cargadas. Usa el chatbot para solicitarlas.
        </p>
      </section>
    );
  }

  // Si hay data, extraemos docs
  const { docs } = data;
  if (!docs || docs.length === 0) {
    return (
      <section className="py-8 border-b border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Detalles de la Propiedad
        </h2>
        <p className="text-gray-800">
          No se encontraron propiedades en la respuesta.
        </p>
      </section>
    );
  }

  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">
        Propiedades Disponibles
      </h2>
      {/* Recorremos 'docs' y mostramos cada propiedad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs.map((property) => (
          <div key={property._id} className="bg-gray-100 rounded p-4">
            <h3 className="font-bold text-lg mb-2">
              {property.propertyFamilyType} - {property.operationFamily}
            </h3>
            <p className="text-sm">
              <strong>Dirección:</strong> {property.address.street}, {property.address.communeName}
            </p>
            <p className="text-sm">
              <strong>Área utilizable:</strong> {property.area.usable} m²
            </p>
            <p className="text-sm">
              <strong>Precio:</strong> {property.price} UF
            </p>
            <p className="text-sm">
              <strong>Fecha Publicación:</strong>{" "}
              {new Date(property.publicationDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyDetails;
