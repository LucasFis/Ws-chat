import "./Layout.css"
import {Link, Outlet} from "react-router-dom";
const Layout = () => {

    return (
        <>
            <nav className="navbar">
                <div className="icon-container">
                    <span className="icon">💬</span>
                    <h1 className="nav-title">Chatters</h1>
                </div>
                <ul className="options">
                    <li><Link to="/login" className="button primary">Iniciar sesion</Link></li>
                    <li><Link to="/register" className="button secondary">Registrarse</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;