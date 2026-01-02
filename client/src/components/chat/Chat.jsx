import "./Chat.css"
import {Link} from "react-router-dom";
import Message from "../message/Message";
import Input from "../message-input/Input";
import {useEffect, useRef, useState} from "react";

const Chat = ({}) => {
    const [mensajes, setMensajes] = useState([])
    const wsRef = useRef(null)

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000")
        wsRef.current = ws

        ws.onopen = () => {
            console.log("WebSocket conectado")
        }

        ws.onmessage = (event) => {
            const mensaje = JSON.parse(event.data)
            setMensajes(prev => [...prev, mensaje])
        }

        ws.onerror = (err) => {
            console.error("WebSocket error", err)
        }

        ws.onclose = () => {
            console.log("WebSocket cerrado")
        }

        return () => {
            ws.close()
        }
    }, [])

    const enviarMensaje = (mensaje) => {
        wsRef.current.send(JSON.stringify(mensaje))
    }

    return (
        <div className="chat-body">
            <Link to="/" className="button primary volver">{"<-  "}Volver</Link>
            <div className="chat-container">
                {mensajes.map((m,key)=><Message key={key} content={m.content} author={m.author}/>)}
                <Input className="input" manejadorSubmit={enviarMensaje}></Input>
            </div>
        </div>
    )
}

export default Chat;