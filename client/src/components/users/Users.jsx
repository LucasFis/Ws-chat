import "./Users.css"
import {useEffect, useState} from "react";
import {buscarUsuarios} from "../../api";
import UserCard from "../userCard/UserCard";

const Users = () => {
    const [users, setUsers] = useState([]);

    const handleUsuarios = async () => {
        const usuarios = await buscarUsuarios()
        setUsers(usuarios);
    }

    useEffect(() => {
        handleUsuarios()
    },[])

    return (
        <div className="users-container">
            <ul className="user-list">
                {users.map((u) => (
                    <li key={u.id}><UserCard user={u}/></li>
                ))}
            </ul>
        </div>
    )
}

export default Users;