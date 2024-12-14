import { API_PRICES } from "../config/config.js";
import { addPrecioLuz } from "../models/preciosLuz.js";

export const getPricesLuz = async () => {
    try {
        const response = await fetch(API_PRICES);
        const data = await response.json();

        if (data && data.included) {
            const preciosSpot = data.included.find(
                (item) => item.attributes.title === 'Precio mercado spot'
            );

            if (preciosSpot) {
                const precios = preciosSpot.attributes.values.map((entry) => ({
                    fecha: entry.datetime.split('T')[0],   
                    hora: parseInt(entry.datetime.split('T')[1].split(':')[0]),  
                    precio: entry.value,  
                }));

                
                for (const precio of precios) {
                    await addPrecioLuz(precio.fecha, precio.hora, precio.precio, (err, result) => {
                        if (err) {
                            console.error('Error al guardar el precio de luz:', err);
                        } else {
                            console.log(`Precio de luz con id ${result.id} guardado correctamente.`);
                        }
                    });
                }

                return precios;  
            }
        }

        return []; 
    
    } catch (error) {
        console.log(error);
    }
}