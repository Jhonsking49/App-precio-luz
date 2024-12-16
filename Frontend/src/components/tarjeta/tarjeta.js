import "./tarjeta.css";

export const cardPrices = (data) => {
    const preciosContainer = document.createElement("div");
    preciosContainer.id = "precios-container";
    preciosContainer.classList.add("tarjetas-container");

    preciosContainer.innerHTML = data.map(({ value, datetime }) => {
        const horas = Number(datetime.split("T")[1].split(":")[0]);
        return `
        <div class="card">
            <div class="card-body">
                <p>${horas}:00</p>
                <p>${value} €/MWh</p>
            </div>
        </div>`;
    }).join(""); 
    return preciosContainer;
};