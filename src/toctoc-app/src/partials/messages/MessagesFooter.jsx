import axios from 'axios';
import React, { useState } from 'react';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Carga la clave de API desde las variables de entorno
    dangerouslyAllowBrowser: true, // Habilita el uso en el navegador
});

function MessagesFooter({ chat, setChat }) {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [localJson, setLocalJson] = useState({});
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);
    const [radio, setRadio] = useState(0);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);

        const tempMessage = {
            id: `temp-${Date.now()}`,
            sender: 'You',
            timestamp: new Date().toISOString(),
            content: message.trim(),
        };

        setChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, tempMessage],
        }));

        setMessage('');

        try {
            // Llamada a OpenAI para detectar intención
            const intentionResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages: [
                    {
                        role: "system",
                        content: `Eres un asistente especializado en interpretar mensajes para servicios inmobiliarios. Analiza el mensaje y determina la intención.`,
                    },
                    { role: "user", content: message.trim() },
                ],
            });

            const intention = JSON.parse(intentionResponse.choices[0]?.message?.content)?.intention;
            console.log("Intención detectada:", intention);

            if (!intention) throw new Error("No se pudo detectar la intención del mensaje.");

            // Consulta a la API local
            const localApiResponse = await axios.post("http://localhost:8000/process", {
                message: message.trim(),
                intention: intention,
                additional_data: localJson,
            });

            setLocalJson(localApiResponse.data);

            // Segunda llamada a OpenAI
            const finalResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages: [
                    {
                        role: "system",
                        content: `Eres un asistente avanzado que ayuda a los usuarios con solicitudes relacionadas a bienes raíces. Responde con un JSON estructurado.`,
                    },
                    { role: "user", content: message.trim() },
                    { role: "assistant", content: JSON.stringify(localApiResponse.data) },
                ],
            });

            const finalMessage = JSON.parse(finalResponse.choices[0]?.message?.content);
            console.log("Respuesta final:", finalMessage);

            if (finalMessage?.locationData) {
                const { longitude, latitude, radius } = finalMessage.locationData;
                if (longitude && latitude && radius) {
                    setLongitud(longitude);
                    setLatitud(latitude);
                    setRadio(radius);
                }
            }

            const aiMessage = {
                id: `msg-${Date.now()}`,
                sender: 'AI',
                timestamp: new Date().toISOString(),
                content: finalMessage.message || 'Lo siento, no pude procesar tu mensaje.',
            };

            setChat((prevChat) => ({
                ...prevChat,
                messages: [...prevChat.messages, aiMessage],
            }));
        } catch (error) {
            console.error("Error durante el proceso:", error);

            const errorMessage = {
                id: `error-${Date.now()}`,
                sender: 'AI',
                timestamp: new Date().toISOString(),
                content: 'Hubo un error al procesar tu mensaje. Por favor, intenta nuevamente más tarde.',
            };

            setChat((prevChat) => ({
                ...prevChat,
                messages: [...prevChat.messages, errorMessage],
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sticky bottom-0">
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 sm:px-6 md:px-5 h-16">
                <form onSubmit={handleSendMessage} className="grow flex">
                    <div className="grow mr-3">
                        <label htmlFor="message-input" className="sr-only">
                            Type a message
                        </label>
                        <input
                            id="message-input"
                            className="form-input w-full bg-slate-100 dark:bg-slate-800 border-transparent dark:border-transparent focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500"
                            type="text"
                            placeholder="Aa"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send ->'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MessagesFooter;
