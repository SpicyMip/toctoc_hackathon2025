import React from 'react';

function DirectMessages({ chats, setChat, selectedChat }) {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">
        Direct messages
      </div>
      <ul className="mb-6">
        {chats.map((chat) => (
          <li key={chat.id} className="-mx-2">
            <button
              className={`flex items-center justify-between w-full p-2 rounded ${
                selectedChat?.id === chat.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-indigo-100 dark:hover:bg-slate-700'
              }`}
              onClick={() => setChat(chat)}
            >
              <div className="truncate">
                <span className="text-sm font-medium">{chat.name}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DirectMessages;
