import {WebSocket} from "ws";
import {ChatRepositorio} from "./../repositorys/chatRepositorio.js"
import {chatADTO} from "../DTOs.js";

const rooms = new Map();

export const configureWsChat = (wss) => {
    const chatRepo = new ChatRepositorio();

    wss.on("connection", async (ws, req) => {

        console.log("ws://chat connected")

        const url = new URL(req.url, "http://localhost");
        const chatId = url.searchParams.get("chatId");

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

        ws.on("message", (msg) => {
            const payload = JSON.parse(msg.toString())

            messageHandler(payload, chatId, chatRepo);
        })

        ws.on("close", () => {
            console.log("ws://chat disconnected")
        });
    });
}

const messageHandler = async (event, chatId, chatRepo) => {
    const data = event.data;

    switch(event.type) {
        case "SEND_MESSAGE":

            const chat = await chatRepo.findById(chatId);

            chat.mensajes.push(event.data)

            chatRepo.update(chat);

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

    console.log(`${event.type}: (${data.autor.nombre})`, data.contenido)
}