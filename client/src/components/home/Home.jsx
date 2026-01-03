import "./Home.css"
import ChatCard from "../chatcard/ChatCard";
import {buscarChats} from "./../../api.js"
import {useEffect, useState} from "react";

const Home = () => {

    const [chats, setChats] = useState([]);

    const obtenerChats = async () => {
        setChats(await buscarChats())
    }

    useEffect(() => {
        obtenerChats();
    },[])


    return (
        <div className="home-container">
            <h2>Chats Disponibles</h2>

            <div className="chat-list">
                {chats.map((chat, index) => (<ChatCard key={index} chat={chat}/>))}
            </div>
        </div>
    )
}

export default Home