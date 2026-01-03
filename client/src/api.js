import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.withCredentials = true;

const buscarUsuario = async (nombre, contrasenia) => {
    const results = await axios.post(`${API_BASE_URL}/login`, {nombre, contrasenia})
    return results.data;
}

const buscarChats = async () => {
    const results = await axios.get(`${API_BASE_URL}/chats`);
    return results.data;
}

export {buscarUsuario, buscarChats}