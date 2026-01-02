import cors from "cors";
import session from "express-session";
import express from "express";
import {connectToDB} from "./db.js";
import {WebSocket, WebSocketServer} from "ws";
import http from "http"

const configure = (app, DB_URI) => {
    app.use(cors([]))
    app.use(
        session({
            secret: "mi_clave_secreta", // clave para firmar la sesión
            resave: false,              // no guardar si no cambia
            saveUninitialized: false,   // no crear sesión vacía
            cookie: {
                maxAge: 1000 * 60 * 60    // 1 hora
            }
        })
    );
    app.use(express.json())

    connectToDB(DB_URI);
}

const configureRoutes = (app) =>{
    app.post("/login", (req, res) => {
        const name = req.body.name;
        //req.session.user = buscarPorNombre(name)
    })
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

export {configure, configureRoutes, configureWs};