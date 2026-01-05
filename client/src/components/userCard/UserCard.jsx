import "./UserCard.css"
import {agregarChat} from "../../api";
import {useNavigate, useSearchParams} from "react-router-dom";

const UserCard = ({user}) => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const chatId = searchParams.get("invite");

    const handleClick = async () => {
        console.log(user, chatId);

        const result = await agregarChat(user.id, chatId)
        console.log(result)

        alert(`invitacion enviada a ${user.nombre}!`)
        navigate("/")
    }

    return (
        <div className="chat-card-container" onClick={() => {
            handleClick()
        }}>
            <h2>{user.nombre}</h2>
        </div>
    )
}

export default UserCard;