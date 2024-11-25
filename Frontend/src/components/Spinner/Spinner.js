
export const createSpinner = () =>{
    const spinner = document.createElement("div");
    spinner.id = "spinner";
    spinner.classList.add("hidden", "spinner");
    spinner.textContent = "Cargando...";
    return spinner;
}

export const showSpinner = async () => {
    // Mostrar el spinner
    const spinner = document.getElementById("spinner");
    if (spinner) {
        spinner.classList.remove("hidden");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
};



export const hiddenSpinner = () =>{
    // ocultar el spinner
    const spinner = document.getElementById("spinner");
    if (spinner) {
        spinner.classList.add("hidden");
    }
}