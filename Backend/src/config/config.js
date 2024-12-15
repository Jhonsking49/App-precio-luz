import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    weatherApiKey: process.env.WEATHER_API_KEY,
    dbPath: './database.sqlite',
    environment: process.env.NODE_ENV || 'development',
    corsOptions: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        optionsSuccessStatus: 200
    },
    cache: {
        weatherDuration: 1000 * 60 * 30, // 30 minutos
        electricityDuration: 1000 * 60 * 60 // 1 hora
    }
}; 