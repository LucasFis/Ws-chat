import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({
                       code = 404,
                       title = "Página no encontrada",
                       message = "La página que estás buscando no existe o fue movida."
                   }) => {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-card">
                <span className="error-code">{code}</span>
                <h1 className="error-title">{title}</h1>
                <p className="error-message">{message}</p>

                <div className="error-actions">
                    <button
                        className="button primary"
                        onClick={() => navigate("/")}
                    >
                        Ir al inicio
                    </button>

                    <button
                        className="button secondary"
                        onClick={() => navigate(-1)}
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
