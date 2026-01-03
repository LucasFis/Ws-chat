import "./Home.css"
import ChatCard from "../chatcard/ChatCard";

const Home = () => {

    const chatList = [
        {
            name: "futbol",
            description: "Chat para hablar de futbol",
        },
        {
            name: "Novedades de IA",
            description: "Aca hablamos sobre cosas novedosas salidas de la IA",
        }
    ]

    return (
        <div className="home-container">
            <h2>Chats Disponibles</h2>

            <div className="chat-list">
                {chatList.map((chat, index) => (<ChatCard key={index} chat={chat}/>))}
            </div>
        </div>
    )
}

export default Home