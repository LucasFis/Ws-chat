import "./Login.css"

const Login = () => {
    return (
        <div className="login-container">
            <h2>Ingrese sus datos personales!</h2>
            <form className="login-form">
                <div className="form-input-container">
                    <label htmlFor="nombre">Nombre de usuario</label>
                    <input type="text" name="nombre"/>
                </div>
                <button type="submit" className="button primary">Confirmar</button>
            </form>
        </div>
    )
}

export default Login