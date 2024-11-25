// componente navegador bon boton modo claro y oscuro en javascript sin react


const navegador = document.querySelector("nav");

    // Crear el botón de modo claro/oscuro
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Modo Oscuro";
    toggleButton.className = "toggle-btn";
    navegador.appendChild(toggleButton);

    // Alternar entre modos
    toggleButton.addEventListener("click", () => {
    if (navegador.classList.contains("light-mode")) {
        navegador.classList.remove("light-mode");
        navegador.classList.add("dark-mode");
        toggleButton.textContent = "Modo Claro";
    } else {
        navegador.classList.remove("dark-mode");
        navegador.classList.add("light-mode");
        toggleButton.textContent = "Modo Oscuro";
    }
});
    // Crear el contenedor del navegador
    const nav = document.createElement("nav");
    nav.className = "nav light-mode"; // Clase inicial
    
    // Crear el título del navegador
    const title = document.createElement("h1");
    title.textContent = "Mi Navegador";
    nav.appendChild(title);
  
    // Crear el botón de modo claro/oscuro
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Modo Oscuro";
    toggleButton.className = "toggle-btn";
    nav.appendChild(toggleButton);
  
    // Agregar el navegador al cuerpo del documento
    document.body.appendChild(nav);
  
    // Alternar entre modos
    toggleButton.addEventListener("click", () => {
      if (nav.classList.contains("light-mode")) {
        nav.classList.remove("light-mode");
        nav.classList.add("dark-mode");
        toggleButton.textContent = "Modo Claro";
      } else {
        nav.classList.remove("dark-mode");
        nav.classList.add("light-mode");
        toggleButton.textContent = "Modo Oscuro";
      }
    });