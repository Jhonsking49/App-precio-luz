import { getDataPrices } from "./helpers/getDataPrices.js";


const init = async ()  => {
    try {
        const data = await getDataPrices();
        console.log("Datos Obtenidos", data);
    } catch (error) {
        console.error("Error", error);
    }
}

init();