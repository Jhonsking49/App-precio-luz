

export const createFooter = () => {
    const footer = document.createElement("footer");
    footer.classList.add("footer");
    footer.innerHTML = `
    <p>App-precio-luz</p>
    <p>Proyecto realizado por Juan, Alberto, Pablo y Zuhir</p>
    `;
    return footer;
};