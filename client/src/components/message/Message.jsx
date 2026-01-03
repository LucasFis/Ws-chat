import "./Message.css"
import {AuthContext} from "../../context/authContext";
import {useContext} from "react";

const Message = ({autor, contenido}) => {
    const {user} = useContext(AuthContext)

    return (
        <h6 className="message">{autor.id === user.id ? "Tú" : autor.nombre}: {contenido}</h6>
    )
}

export default Message