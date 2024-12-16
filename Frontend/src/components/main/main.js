import "./main.css";

export const createMain = () => {
  const main = document.createElement("main");
  main.id = "main";

  // Contenedor de bienvenida
  const welcomeContainer = document.createElement("div");
  welcomeContainer.id = "welcome-container";
  welcomeContainer.classList = "light";
  welcomeContainer.innerHTML = `
        <h1>¡Descubre lo que podemos ofrecerte!</h1>
        <p>Una herramienta única que te mantiene informado sobre el clima en tus ciudades favoritas y los precios de la luz en tiempo real. 
            Todo diseñado para que tomes decisiones más inteligentes en tu día a día.</p>
        <p><strong>Consulta, compara y aprovecha cada instante. <br>¡Empieza a explorar ahora!</strong></p>

    `;

  main.appendChild(welcomeContainer);
  return main;
};