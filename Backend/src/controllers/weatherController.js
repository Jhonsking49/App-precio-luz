import { getWeatherData } from '../services/weatherService.js';
import { getDatabase } from '../models/database.js';

export const getWeatherByCity = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({ 
                error: 'Se requiere el nombre de la ciudad' 
            });
        }

        const weatherData = await getWeatherData(city);
        res.json(weatherData);

    } catch (error) {
        if (error.message === 'Ciudad no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        
        console.error('Error al obtener el clima:', error);
        res.status(500).json({ 
            error: 'Error al obtener datos del clima' 
        });
    }
};

export const getRecentSearches = async (req, res) => {
    try {
        const db = getDatabase();
        const userId = req.userData.userId;

        const searches = await new Promise((resolve, reject) => {
            db.all(`
                SELECT * FROM weather_searches
                WHERE user_id = ?
                ORDER BY search_date DESC
                LIMIT 10
            `, [userId], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });

        res.json(searches);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener búsquedas recientes' 
        });
    }
};
