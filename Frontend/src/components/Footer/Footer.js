import "./footer.css"
import dataFooter from "../../data/footer-user-data.js"
export const createFooter = () => {
    const footer = document.createElement("footer");
    const divNombres = document.createElement("div");
    const divDetalles = document.createElement("div");

    footer.id = "footer";

    dataFooter.forEach(d=>{
        const a = document.createElement("a");
        a.textContent = d.Nombre;            
        a.href = d.Git;                       
        a.target = "_blank";  
        divNombres.append(a);
    })

    divDetalles.innerHTML=`
        <p>Esto es trivial</p>
        <p>©2024 Supernenas+1</p>
        <p>Isaias best profe <3</p>
    `;
    
    footer.append(divNombres, divDetalles);

    return footer;
}

export const addFooter = (element) => {
    const footer = document.getElementById("footer");
    footer.appendChild(element);
}