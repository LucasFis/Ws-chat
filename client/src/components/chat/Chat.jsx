import "./Chat.css"
import {Link} from "react-router-dom";
import Message from "../message/Message";
import MessageForm from "../messageForm/MessageForm";
import {useContext, useEffect, useRef, useState} from "react";
import {wsHandler} from "../../wsHandler";
import {useSearchParams} from "react-router-dom";
import {AuthContext} from "../../context/authContext";

const Chat = () => {
    const [mensajes, setMensajes] = useState([])
    const [nombre, setNombre] = useState("No Especificado")
    const wsRef = useRef(null)

    const {user} = useContext(AuthContext);

    const [searchParams] = useSearchParams();
    const chatId = searchParams.get("chatId");

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:3000/chat?chatId=${chatId}`);
        wsRef.current = ws

        ws.onopen = () => {
            console.log("WebSocket conectado")
        }

        ws.onmessage = (event) => {
            wsHandler(event, setMensajes, setNombre)
        }

        ws.onerror = (err) => {
            console.error("WebSocket error\n", err)
        }

        ws.onclose = (e) => {
            console.log("WebSocket cerrado por: ", e.reason)
        }

        return () => {
            ws.close()
        }
    }, [])

    const enviarMensaje = (mensaje) => {

        const payload = {
            type: "SEND_MESSAGE",
            data: mensaje
        }

        wsRef.current.send(JSON.stringify(payload))
    }

    return (
        <div className="chat-body">
            <Link to="/" className="button primary volver">{"<-  "}Volver</Link>
            <div className="chat-container">
                {mensajes.map((m,key)=><Message key={key} contenido={m.contenido} autor={m.autor}/>)}
                <MessageForm className="input" manejadorSubmit={enviarMensaje}></MessageForm>
            </div>
        </div>
    )
}

export default Chat;