import express from "express"
import dotenv from "dotenv"
import {configure} from "./app/configureApp.js";

const app = express()

dotenv.config()

const DB_URI = process.env.DB_URI
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET

const server = configure(app, DB_URI, SECRET);

server.listen(PORT, () => {
    console.log(`OLT web server running on port ${PORT}`);
});