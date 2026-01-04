import {WebSocket} from "ws";
import {ChatRepositorio} from "./../repositorys/chatRepositorio.js"
import {chatADTO, mensajeDeDTO} from "../DTOs.js";
import {UsuarioRepositorio} from "../repositorys/usuarioRepositorio.js";

const rooms = new Map();

export const configureWsChat = (wss) => {
    const chatRepo = new ChatRepositorio();
    const usuarioRepo = new UsuarioRepositorio()

    wss.on("connection", (ws, req) => {

        console.log("ws://chat connected")

        const url = new URL(req.url, "http://localhost");
        const chatId = url.searchParams.get("chatId");

        init(ws, chatId, chatRepo);

        ws.on("message", (msg) => {
            const payload = JSON.parse(msg.toString())

            messageHandler(payload, chatId, chatRepo, usuarioRepo);
        })

        ws.on("close", () => {
            console.log("ws://chat disconnected")
        });
    });
}

const init = async (ws, chatId, chatRepo) => {

    if (!chatId) {
        ws.close(1008, "chatId requerido");
        return;
    }

    if (!rooms.has(chatId)) {
        rooms.set(chatId, new Set());
    }

    rooms.get(chatId).add(ws);

    const chat = await chatRepo.findById(chatId);

    ws.send(JSON.stringify({
        type: "INIT_CHAT",
        data: chatADTO(chat)
    }))

    console.log("ws://chat sended ", chatId)
}

const messageHandler = async (event, chatId, chatRepo, usuarioRepo) => {
    const data = event.data;

    switch(event.type) {
        case "SEND_MESSAGE":

            const chat = await chatRepo.findById(chatId);

            const autor = await usuarioRepo.findById(data.autor.id);

            chat.agregarMensaje(mensajeDeDTO(event.data, autor))

            chatRepo.updateMessages(chat);

            const newMessage = {
                type: "RECEIVE_MESSAGE",
                data: data
            }

            rooms.get(chatId).forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newMessage));
                }
            });
            break;
    }
}