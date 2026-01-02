import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import Chat from "./components/chat/Chat.jsx";
import Login from "./components/login/Login";

function App() {
    const mensajes = [{
        author: "lucas",
        content: "Hola mundo"
    }]

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<Home/>}/>
                  <Route path="/chat" element={<Chat mensajesProp={mensajes} />}/>
                  <Route path="/login" element={<Login/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
