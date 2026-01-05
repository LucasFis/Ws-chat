import "./Register.css"
import {crearUsuario} from "../../api";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const {logIn} = useContext(AuthContext)
    const navigate = useNavigate()

    const manejarSubmit = async (e) => {
        e.preventDefault();

        const nombre = e.target.username.value
        const contrasenia = e.target.password.value;

        const result = await crearUsuario(nombre, contrasenia);

        alert("usuario creado con exito! \nbienvenido " + result.nombre)

        logIn(nombre, contrasenia);

        navigate("/")
    }

    return (
        <div className="reg-form-container">
            <h2>Registrarse</h2>
            <form className="register-form" onSubmit={manejarSubmit}>
                <div className="reg-single-input">
                    <label htmlFor="username">nombre de usuario</label>
                    <input type="text" name="username"/>
                </div>
                <div className="reg-single-input">
                    <label htmlFor="password">contraseña</label>
                    <input type="password" name="password"/>
                </div>
                <button type="submit" className="button primary">confirmar</button>
            </form>
        </div>
    )
}

export default Register;