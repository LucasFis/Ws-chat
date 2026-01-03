import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import Chat from "./components/chat/Chat.jsx";
import Login from "./components/login/Login";
import {AuthProvider} from "./context/authContext";
import Register from "./components/register/Register";
import ErrorPage from "./components/error/ErrorPage";

function App() {

    return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Layout/>}>
                      <Route index element={<Home/>}/>
                      <Route path="/chat" element={<Chat />}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="*" element={<ErrorPage />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
