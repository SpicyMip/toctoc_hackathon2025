import React from 'react';

function MessagesBody({ chat }) {
  return (
    <div className="grow px-4 sm:px-6 md:px-5 py-6">
      {chat && chat.messages.length > 0 ? (
        chat.messages.map((message) => {
          // Si el contenido del mensaje es un JSON, intenta parsearlo
          let content;
          try {
            const parsedContent = JSON.parse(message.content);
            content = parsedContent.response || message.content;
          } catch (e) {
            content = message.content; // Si no es JSON, muestra el contenido original
          }

          // Detecta si el contenido incluye un enlace
          const formattedContent = content.split(' ').map((word, index) => {
            if (word.startsWith('http://') || word.startsWith('https://')) {
              return (
                <a
                  key={index}
                  href={word}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {word}
                </a>
              );
            }
            return word + ' ';
          });

          return (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'You' ? 'justify-end' : 'justify-start'
              } mb-4 last:mb-0`}
            >
              <div
                className={`text-sm ${
                  message.sender === 'You'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                } p-3 rounded-lg ${
                  message.sender === 'You' ? 'rounded-tr-none' : 'rounded-tl-none'
                } border border-slate-200 dark:border-slate-700 shadow-md mb-1`}
              >
                {formattedContent}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-slate-500">No messages yet</div>
      )}
    </div>
  );
}

export default MessagesBody;
