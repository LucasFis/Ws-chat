import "./Message.css"
import {AuthContext} from "../../context/authContext";
import {useContext} from "react";

const Message = ({autor, contenido}) => {
    const {user} = useContext(AuthContext);

    const esPropio = autor.id === user.id;

    return (
        <div className={`message ${esPropio ? "own" : "other"}`}>
            <span className="author">
                {esPropio ? "Tú" : autor.nombre}
            </span>
            <p className="content">
                {contenido}
            </p>
        </div>
    );
};

export default Message;
