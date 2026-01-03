import "./Message.css"
import {AuthContext} from "../../context/authContext";
import {useContext} from "react";

const Message = ({author, content}) => {
    const {user} = useContext(AuthContext)

    return (
        <h6 className="message">{author.id === user.id ? "Tú" : author.nombre}: {content}</h6>
    )
}

export default Message