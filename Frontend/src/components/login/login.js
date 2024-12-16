import "./login.css";
import { setSession } from "../../helpers/scripts";
import { createSpinner, showSpinner, hideSpinner } from "../spinner/spinner";
import { createRegister } from "../register/register";
import { loginUser } from "../../helpers/api.js";

export const createLogin = () => {
    //. Contenedor principal del formulario
    const divLogin = document.createElement("div");
    divLogin.id = "div-login";

    divLogin.innerHTML = `
        <form id="login-form">
            <label id="label-login">Inicia Sesión</label>
            <input type="text" id="input-username" placeholder="Usuario o email" required>
            <input type="password" id="input-passwd" placeholder="Contraseña" required>
            <button id="login-button" type="submit">Iniciar sesión</button>
            <p id="register-prompt">¿Aún no tienes cuenta? <a href="#" id="register-link">Regístrate</a></p>
            <div id="spinner-container"></div>
        </form>
    `;

    // Insertar el spinner
    const spinnerContainer = divLogin.querySelector("#spinner-container");
    spinnerContainer.appendChild(createSpinner());

    //. Detectar clics en el formulario
    const loginForm = divLogin.querySelector("#login-form");
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = divLogin.querySelector("#input-username").value.trim();
        const password = divLogin.querySelector("#input-passwd").value.trim();

        if (!username || !password) {
        alert("Completa todos los campos");
        return;
        }

        // Mostrar spinner
        showSpinner();

        try {

        //. Login real
        const userData = await loginUser(username, password);

        // Guardar los datos del usuario en la "sesión"
        setSession("userSession", { username });

        // Redirigir o recargar la página
        hideSpinner();
        alert("Sesión iniciada con éxito");
        location.reload(); 

        } catch (error) {
        console.warn("Error en login real:", error.message);

        //. ***** PRUEBAS ***** 
        setTimeout(() => {
            hideSpinner();
            if (username === "admin" && password === "1234") {
            setSession("userSession", { username });
            alert("Sesión iniciada");
            location.reload();
            } else {
            alert("Usuario o contraseña incorrectas");
            }
        }, 1000);
        }
    });

    //. Lógica para mostrar la vista de registro 

    const registerLink = divLogin.querySelector("#register-link");

    registerLink.addEventListener("click", (event) => {
        event.preventDefault();

        const app = document.getElementById("app");
        app.innerHTML = "";
        const register = createRegister();
        app.appendChild(register);
    });

    return divLogin;
};