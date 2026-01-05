import "./Chat.css";
import {Link, useNavigate} from "react-router-dom";
import Message from "../message/Message";
import MessageForm from "../messageForm/MessageForm";
import { useEffect, useRef, useState } from "react";
import { wsHandler } from "../../wsHandler";
import { useSearchParams } from "react-router-dom";

const WS_BASE_URL = "ws://" + process.env.REACT_APP_BACKEND_ROOT;

const Chat = () => {
    const [mensajes, setMensajes] = useState([]);
    const [nombre, setNombre] = useState("No Especificado");
    const wsRef = useRef(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const chatId = searchParams.get("chatId");

    useEffect(() => {
        const ws = new WebSocket(`${WS_BASE_URL}/chat?chatId=${chatId}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket conectado");
        };

        ws.onmessage = (event) => {
            wsHandler(event, setMensajes, setNombre);
        };

        ws.onerror = (err) => {
            console.error("WebSocket error\n", err);
        };

        ws.onclose = (e) => {
            console.log("WebSocket cerrado por: ", e.reason);
        };

        return () => {
            ws.close();
        };
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    const handleInvite = () => {
        navigate(`/users?invite=${chatId}`);
    }

    const enviarMensaje = (mensaje) => {
        const payload = {
            type: "SEND_MESSAGE",
            data: mensaje,
        };

        wsRef.current.send(JSON.stringify(payload));
    };

    return (
        <div className="chat-body">
            <div className="tittle-container">
                <Link to="/" className="button primary volver">
                    {"<- "}Volver
                </Link>
                <h2>{nombre}</h2>
                <button className="button tertiary" onClick={() => {
                    handleInvite()
                }}>Agregar al chat</button>
            </div>

            <div className="chat-container">
                <div className="messages">
                    {mensajes.map((m, key) => (
                        <Message
                            key={key}
                            contenido={m.contenido}
                            autor={m.autor}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <MessageForm
                    className="input"
                    manejadorSubmit={enviarMensaje}
                />
            </div>
        </div>
    );
};

export default Chat;
