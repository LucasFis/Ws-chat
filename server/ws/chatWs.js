import http from "http";
import {WebSocket, WebSocketServer} from "ws";
import {ChatRepositorio} from "./../repositorys/chatRepositorio.js"

const rooms = new Map();

export const configureWs = (app) => {
    const chatRepo = new ChatRepositorio();

    const server = http.createServer(app);
    const wss = new WebSocketServer({server, path: "/chat"},  );

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
            data: chat
        }))

        console.log("ws://chat sended ", chatId)

        ws.on("message", (msg) => {
            const payload = JSON.parse(msg.toString())

            const data = payload.data;

            console.log(`${payload.type}: (${data.author.nombre})`, data.content)

            const newMessage = {
                type: "RECEIVE_MESSAGE",
                data: data
            }

            rooms.get(chatId).forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(newMessage));
                }
            });
        })

        ws.on("close", () => {
            console.log("ws://chat disconnected")
        });
    });

    return server;
}