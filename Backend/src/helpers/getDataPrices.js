
//const VITE_API_PRICES = import.meta.env.VITE_API_PRICES;

export const getDataPrices = async () => {
    try {
        const response = await fetch("https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=2024-11-19T00:00&end_date=2024-11-24T23:59&time_trunc=day&geo_limit=ccaa&geo_ids=8741");
        
        if(!response.ok){
            throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log("Error", error);
    }
}