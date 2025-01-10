// src/components/ChatBot.jsx
import React, { useState } from "react";
import { fetchProperties } from "../services/api";

const ChatBot = ({ onSetPropertyData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    addUserMessage(userInput.trim());

    try {
      // Podrías condicionar si quieres. Pero en este ejemplo, cualquier texto
      // hará la llamada a fetchProperties (o en un caso real, la pedirías
      // al backend con POST, etc.)
      const data = await fetchProperties();
      if (data?.status === "ok") {
        // Guardamos el JSON completo en la página principal.
        // Podríamos llamarlo "propertiesData", "responseData", etc.
        onSetPropertyData(data);

        addBotMessage(
          `¡Listo! He cargado ${data.docs.length} propiedades. Revisa la página.`
        );
      } else {
        addBotMessage("No se encontró información de propiedades.");
      }
    } catch (error) {
      console.error(error);
      addBotMessage("Ocurrió un error obteniendo las propiedades. Intenta de nuevo.");
    }

    setUserInput("");
  };

  // Renderizamos cada mensaje en el chat
  const renderMessage = (msg, index) => {
    if (msg.sender === "user") {
      return (
        <div
          key={index}
          className="self-end bg-blue-600 text-white px-3 py-2 rounded-md max-w-xs mb-2"
        >
          {msg.text}
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="self-start bg-blue-100 text-blue-900 p-3 rounded-md max-w-xs mb-2"
        >
          {msg.text}
        </div>
      );
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors duration-300"
      >
        {isOpen ? <img src="/remove.svg" alt="Chat Icon" className="w-8 h-8" /> : <img src="/speaking person left.svg" alt="Chat Icon" className="w-8 h-8" />}
      </button>

      {/* Panel del chatbot con animación */}
      <div
        className={`${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        } transition-all duration-300 ease-in-out mt-2 w-80 h-96 bg-white border border-blue-300 rounded-lg flex flex-col shadow-2xl overflow-hidden`}
      >
        {/* Encabezado */}
        <div className="p-2 bg-blue-600 text-white font-bold text-center">
          Asistente Virtual
        </div>

        {/* Contenedor de mensajes */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col">
          {messages.map((m, i) => renderMessage(m, i))}
        </div>

        {/* Input del usuario */}
        <div className="p-2 border-t border-blue-300 flex">
          <input
            type="text"
            className="flex-1 border border-blue-300 rounded-l px-2 py-1 focus:outline-none"
            placeholder="Pide algo..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-3 py-1 rounded-r hover:bg-blue-500 transition-colors duration-300"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
