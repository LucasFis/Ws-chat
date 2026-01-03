import "./Login.css"
import {useContext} from "react"
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const {logIn} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await logIn(e.target.nombre.value, e.target.contrasenia.value)
        alert("Logeo exitoso: " + result.nombre)

        navigate("/")
    }

    return (
        <div className="login-container">
            <h2>Ingrese sus datos personales!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-input-container">
                    <label htmlFor="nombre">Nombre de usuario</label>
                    <input type="text" name="nombre"/>
                    <label htmlFor="contrasenia">contraseña</label>
                    <input type="password" name="contrasenia"/>
                </div>
                <button type="submit" className="button primary">Confirmar</button>
            </form>
        </div>
    )
}

export default Login