import React, { useState, useEffect, useRef } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import MessagesSidebar from '../partials/messages/MessagesSidebar';
import MessagesBody from '../partials/messages/MessagesBody';
import MessagesFooter from '../partials/messages/MessagesFooter';

function Messages() {
  const contentArea = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chat, setChat] = useState(null); // Chat actualmente seleccionado
  const [chats, setChats] = useState([
    {
      id: 'chat1',
      name: 'Welcome Chat', // Chat inicial con nombre predeterminado
      messages: [
        {
          id: 'msg1',
          sender: 'System',
          timestamp: new Date().toISOString(),
          content: '¡Bienvenido al sector inmobiliario con Toctoc! Estamos aquí para ayudarte en todo lo que necesites sobre propiedades.',
        },
      ],
    },
  ]);

  useEffect(() => {
    // Selecciona el primer chat por defecto al cargar
    if (chats.length > 0 && !chat) {
      setChat(chats[0]);
    }
  }, [chats, chat]);

  useEffect(() => {
    // Scroll automático para la vista de mensajes
    contentArea.current.scrollTop = 99999999;
  }, [chat]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div
        className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
        ref={contentArea}
      >
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="relative flex h-full">
            {/* Messages sidebar */}
            <MessagesSidebar
              chats={chats}
              setChats={setChats}
              setChat={setChat}
            />

            {/* Messages body */}
            <div className="grow flex flex-col transition-transform duration-300 ease-in-out">
            <MessagesBody chat={chat} />
            <MessagesFooter chat={chat} setChat={(updatedChat) => {
              setChats((prevChats) =>
                prevChats.map((c) => (c.id === updatedChat.id ? updatedChat : c))
              );
              setChat(updatedChat);
            }} />

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Messages;
