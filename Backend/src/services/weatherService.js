import fetch from 'node-fetch';
import { getDatabase } from '../models/database.js';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Cache para almacenar resultados temporalmente
const cache = new Map();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

export const getWeatherData = async (city) => {
    // Verificar cache
    const cacheKey = city.toLowerCase();
    const cachedData = cache.get(cacheKey);
    
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
        return cachedData.data;
    }

    try {
        const response = await fetch(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`
        );
        
        const data = await response.json();

        if (data.cod === '404') {
            throw new Error('Ciudad no encontrada');
        }

        const weatherData = {
            city: data.name,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon,
            timestamp: new Date().toISOString()
        };

        // Actualizar cache
        cache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        });

        // Guardar en base de datos
        await saveWeatherSearch(weatherData);

        return weatherData;
    } catch (error) {
        throw error;
    }
};

const saveWeatherSearch = async (weatherData) => {
    const db = getDatabase();
    
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO weather_searches (
                city,
                temperature,
                description,
                humidity,
                wind_speed,
                search_date
            ) VALUES (?, ?, ?, ?, ?, ?)
        `, [
            weatherData.city,
            weatherData.temperature,
            weatherData.description,
            weatherData.humidity,
            weatherData.windSpeed,
            weatherData.timestamp
        ], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}; 