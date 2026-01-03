import "./MessageForm.css"
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";

const MessageForm = ({className = "", manejadorSubmit}) => {
    const [mensaje, setMensaje] = useState("");

    const {user} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();// evita recargar la página
        const newMensaje = {
            author: user,
            content: mensaje,
        }
        manejadorSubmit(newMensaje);    // mandás el contenido
        setMensaje("");              // limpiás el input
    };

    return (
        <div className={`input-container ${className}`} >
            <form className="form" onSubmit={handleSubmit}>
                <div className="text-input-container">
                    <label htmlFor="message">mensaje</label>
                    <input type="text"
                           name="message"
                           id="message"
                           value={mensaje}
                           onChange={(e) => setMensaje(e.target.value)}/>
                </div>
                <button
                    type="submit"
                    className="button primary submit"
                >enviar</button>
            </form>
        </div>
    )
}

export default MessageForm