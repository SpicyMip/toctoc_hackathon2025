import React from 'react'; 
import DirectMessages from './DirectMessages';

function MessagesSidebar({ chats, setChats, setChat, selectedChat }) {
  // Función para crear un nuevo chat
  const createNewChat = () => {
    const newChat = {
      id: `chat${chats.length + 1}`, // Genera un id único basado en el tamaño actual
      name: `New Chat ${chats.length + 1}`, // Nombre del nuevo chat
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'AI',
          timestamp: new Date().toISOString(),
          content: '¡Bienvenido al sector inmobiliario con Toctoc! Estamos aquí para ayudarte en todo lo que necesites sobre propiedades.',
        },
      ], // Mensaje de bienvenida inicial
    };
    setChats((prevChats) => [...prevChats, newChat]); // Agrega el nuevo chat a la lista
    setChat(newChat); // Selecciona el nuevo chat automáticamente
  };

  return (
    <div className="sticky top-16 bg-white dark:bg-slate-900 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 dark:border-slate-700 md:w-72 xl:w-80 h-[calc(100dvh-64px)]">
      <div>
        {/* Group header */}
        <div className="sticky top-0 z-10">
          <div className="flex items-center bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-5 h-16">
            <div className="w-full flex items-center justify-between">
              <button
                onClick={createNewChat}
                className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
              >
                + New Chat
              </button>
            </div>
          </div>
        </div>
        {/* Group body */}
        <div className="px-5 py-4">
          {/* Direct messages */}
          <DirectMessages
            chats={chats}
            setChat={setChat}
            selectedChat={selectedChat} // Prop para identificar el chat seleccionado
          />
        </div>
      </div>
    </div>
  );
}

export default MessagesSidebar;