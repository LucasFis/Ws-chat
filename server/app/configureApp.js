import cors from "cors";
import session from "express-session";
import express from "express";
import {connectToDB} from "./db.js";
import {WebSocket, WebSocketServer} from "ws";
import http from "http"
import {UsuarioRepositorio} from "../repositorys/usuarioRepositorio.js";
import {ChatRepositorio} from "../repositorys/chatRepositorio.js";
import {UsuarioController} from "../controllers/usuarioController.js";
import {ChatController} from "../controllers/chatController.js";
import {loggerMiddleware} from "../middlewares/logger.js";
import {errorHandler} from "../middlewares/errorHandler.js";

const configure = (app, DB_URI, SECRET) => {
    app.use(cors([]))
    app.use(
        session({
            secret: SECRET, // clave para firmar la sesión
            resave: false,              // no guardar si no cambia
            saveUninitialized: false,   // no crear sesión vacía
            cookie: {
                maxAge: 1000 * 60 * 60
            }
        })
    );
    app.use(express.json())

    app.use(loggerMiddleware)

    configureRoutes(app)
    const server = configureWs(app)

    app.use(errorHandler)

    connectToDB(DB_URI);

    return server
}

const configureRoutes = (app) =>{
    const {usuarioController, chatController} = prepareContext()

    app.post("/login", usuarioController.findByCredentials.bind(usuarioController))
    app.post("/register", usuarioController.register.bind(usuarioController))
}

const configureWs = (app) => {

    const server = http.createServer(app);
    const wss = new WebSocketServer({server});

    wss.on("connection", (ws) => {

        console.log("user conected")

        ws.on("message", (msg) => {
            const mensaje = JSON.parse(msg.toString())

            console.log(`Recibido: (${mensaje.author})`, mensaje.content)

            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(mensaje))
                }
            })
        })

        ws.on("close", () => {
            console.log("Cliente desconectado");
        });
    });

    return server;
}

const prepareContext = () => {
    const usuarioRepo = new UsuarioRepositorio()
    const chatRepo = new ChatRepositorio()
    const usuarioController = new UsuarioController(usuarioRepo)
    const chatController = new ChatController(chatRepo)

    return {usuarioController, chatController}
}

export {configure};