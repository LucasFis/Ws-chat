import cors from "cors";
import session from "express-session";
import express from "express";
import {connectToDB} from "./db.js";
import {UsuarioRepositorio} from "../repositorys/usuarioRepositorio.js";
import {ChatRepositorio} from "../repositorys/chatRepositorio.js";
import {UsuarioController} from "../controllers/usuarioController.js";
import {ChatController} from "../controllers/chatController.js";
import {loggerMiddleware} from "../middlewares/logger.js";
import {errorHandler} from "../middlewares/errorHandler.js";
import {configureWsChat} from "../ws/chatWs.js";
import http from "http";
import {WebSocketServer} from "ws";

const configure = (app, DB_URI, SECRET) => {
    app.use(cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:3002"
        ],
        credentials: true
    }))

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

    app.get("/chats", chatController.findAll.bind(chatController))
}

const configureWs = (app) =>{

    const server = http.createServer(app);
    const wssChat = new WebSocketServer({server, path: "/chat"},  );

    configureWsChat(wssChat)

    return server
}

const prepareContext = () => {
    const usuarioRepo = new UsuarioRepositorio()
    const chatRepo = new ChatRepositorio()
    const usuarioController = new UsuarioController(usuarioRepo)
    const chatController = new ChatController(chatRepo)

    return {usuarioController, chatController}
}

export {configure};