import "./NewChat.css";
import {crearChat} from "../../api"

const NewChat = message => {
    const handleSubmit = (e) => {
        e.preventDefault();


        const result = crearChat(e.target.nombre.value, e.target.descripcion.value, e.target.privacidad.value);
        alert(`Se creo el chat! ${result.nombre}`)
    }

    return (
        <div className="newchat-page">
            <div className="form-container">
                <h2>Crear nuevo chat</h2>

                <form className="newchat-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="nombre">Nombre del chat</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Ej: Programación"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="descripcion">Descripción del chat</label>
                        <input
                            type="text"
                            name="descripcion"
                            id="descripcion"
                            placeholder="Sobre qué trata el chat"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="privacidad">Tipo de privacidad</label>
                        <select id="privacidad" name="privacidad">
                            <option value="PUBLICO">Público</option>
                            <option value="PRIVADO">Privado</option>
                        </select>
                    </div>

                    <button className="button primary" type="submit">
                        Crear chat
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewChat;
