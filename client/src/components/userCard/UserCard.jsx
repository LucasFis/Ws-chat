import "./UserCard.css"

const UserCard = ({user}) => {

    return (
        <div className="chat-card-container">
            <h2>{user.nombre}</h2>
        </div>
    )
}

export default UserCard;