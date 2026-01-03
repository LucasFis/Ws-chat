import http from "http";
import {WebSocket, WebSocketServer} from "ws";
import {ChatRepositorio} from "./../repositorys/chatRepositorio.js"

const rooms = new Map();

export const configureWs = (app) => {
    const chatRepo = new ChatRepositorio();

    const server = http.createServer(app);
    const wss = new WebSocketServer({server, path: "/chat"},  );

    wss.on("connection", async (ws, req) => {

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

        ws.send(JSON.stringify(chat))

        ws.on("message", (msg) => {
            const mensaje = JSON.parse(msg.toString())

            console.log(`Recibido: (${mensaje.author})`, mensaje.content)

            rooms.get(chatId).forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(mensaje));
                }
            });
        })

        ws.on("close", () => {
            console.log("Cliente desconectado");
        });
    });

    return server;
}