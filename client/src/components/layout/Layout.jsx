import "./Layout.css"
import {Link, Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {useContext} from "react";

const Layout = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    return (
        <>
            <nav className="navbar">
                <div className="icon-container" onClick={() => navigate("/")}>
                    <span className="icon">💬</span>
                    <h1 className="nav-title" >Chatters</h1>
                </div>
                <ul className="options">
                    {user ? <li><Link to="/login" className="button primary">cerrar sesion</Link></li>
                         : <><li><Link to="/login" className="button primary">Iniciar sesion</Link></li>
                            <li><Link to="/register" className="button secondary">Registrarse</Link></li></>}

                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;