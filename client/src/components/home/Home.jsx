import "./Home.css"
import ChatCard from "../chatcard/ChatCard";
import {buscarChats} from "./../../api.js"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const [chats, setChats] = useState([]);

    const navigate = useNavigate();

    const obtenerChats = async () => {
        setChats(await buscarChats())
    }

    useEffect(() => {
        obtenerChats();
    },[])


    return (
        <div className="home-container">
            <div className="header-container">
                <h2>Chats Disponibles</h2>
                <button className="button primary new-chat" onClick={
                    () => {
                        navigate("/newChat")
                    }
                }>
                    nuevo chat
                </button>
            </div>

            <div className="chat-list">
                {chats.map((chat, index) => (<ChatCard key={index} chat={chat}/>))}
            </div>
        </div>
    )
}

export default Home