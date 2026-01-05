import axios from "axios"

const API_BASE_URL = "http://" + process.env.REACT_APP_BACKEND_ROOT;

axios.defaults.withCredentials = true;

const buscarUsuario = async (nombre, contrasenia) => {
    const results = await axios.post(`${API_BASE_URL}/login`, {nombre, contrasenia})
    return results.data;
}

const buscarChats = async () => {
    const results = await axios.get(`${API_BASE_URL}/chats`);
    return results.data;
}


const crearUsuario = async (nombre, contrasenia) => {
    const results = await axios.post(`${API_BASE_URL}/register`, {nombre, contrasenia})
    return results.data;
}

const crearChat = async (nombre, descripcion, privacidad) => {
    const results = await axios.post(`${API_BASE_URL}/chats`, {nombre, descripcion, privacidad})
    return results.data;
}

export {buscarUsuario, buscarChats, crearUsuario, crearChat}