import {Link, useNavigate} from "react-router-dom";
import "./ChatCard.css"
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";

const ChatCard = ({chat}) => {

    const navigate = useNavigate()

    const {user} = useContext(AuthContext);

    return (
        <div className="chat-card-container">
            <div className="chat-metainfo">
                <h3 className="chat-name">{chat.nombre}</h3>
                <p className="chat-description">{chat.descripcion}</p>
            </div>
            <ul className="chat-options">
                <li className="chat-option">
                    <button
                        className="button primary"
                        onClick={() => {
                            if (!user) {
                                navigate("/login");
                            } else {
                                navigate(`/chat?chatId=${chat.id}`);
                            }
                        }}
                    >
                        visitar
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default ChatCard