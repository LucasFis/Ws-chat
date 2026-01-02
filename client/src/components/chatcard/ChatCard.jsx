import {Link} from "react-router-dom";
import "./ChatCard.css"

const ChatCard = ({chat}) => {

    return (
        <div className="chat-card-container">
            <div className="chat-metainfo">
                <h3 className="chat-name">{chat.name}</h3>
                <p className="chat-description">{chat.description}</p>
            </div>
            <ul className="chat-options">
                <li className="chat-option"><Link to="/chat" className="button primary">visitar</Link></li>
                <li className="chat-option"><Link to="" className="button secondary">otra opcion</Link></li>
            </ul>
        </div>
    )
}

export default ChatCard