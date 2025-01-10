// src/pages/PropertyPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PropertyDetails from "../components/PropertyDetails";
import Amenities from "../components/Amenities";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const PropertyPage = () => {
  // propertyData guardará la respuesta completa: {status, docs, limit, page, ...}
  const [propertyData, setPropertyData] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        {/* Mandamos la parte que corresponda a cada componente */}
        <PropertyDetails data={propertyData} />
        <Amenities data={propertyData} />
        <CTA data={propertyData} />
      </main>

      <Footer />

      {/* El chatbot actualiza 'propertyData' mediante setPropertyData */}
      <ChatBot onSetPropertyData={setPropertyData} />
    </div>
  );
};

export default PropertyPage;
