import "./Register.css"

const Register = () => {
    return (
        <div className="form-container">
            <h2>Registrarse</h2>
            <form className="register-form">
                <div className="single-input">
                    <label htmlFor="username">nombre de usuario</label>
                    <input type="text" name="username"/>
                </div>
                <div className="single-input">
                    <label htmlFor="password">contraseña</label>
                    <input type="password" name="password"/>
                </div>
                <button type="submit" className="button primary">confirmar</button>
            </form>
        </div>
    )
}

export default Register;