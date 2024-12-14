import express from 'express';
import cors from 'cors';
import { getPricesLuz } from "./helpers/dataLuz.js";

import preciosLuzRoutes from './routes/preciosLuzRoutes.js';
import { PORT } from './config/config.js';


const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/preciosLuz", preciosLuzRoutes);

const guardarPrecios = async () => {
    try {
        const precios = await getPricesLuz();  
        console.log(`Se han guardado ${precios.length} precios de luz en la base de datos.`);
    } catch (error) {
        console.error('Error al guardar los precios de luz:', error);
    }
};

guardarPrecios();

app.listen(PORT, () => {
    console.log(`Servidor ejecutandos en la url: http://localhost:${PORT}`);
})