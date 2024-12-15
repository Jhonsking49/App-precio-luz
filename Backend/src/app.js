import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './models/database.js';
import { requestLogger, errorLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

// Rutas
import authRoutes from './routes/auth.js';
import electricityRoutes from './routes/electricity.js';
import weatherRoutes from './routes/weather.js';

// Configuración
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/electricity', electricityRoutes);
app.use('/api/weather', weatherRoutes);

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ message: 'El servidor está funcionando correctamente' });
});

// Manejo de errores
app.use(errorLogger);
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicializar base de datos
initializeDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;
