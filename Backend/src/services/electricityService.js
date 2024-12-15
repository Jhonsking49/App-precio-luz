import fetch from 'node-fetch';
import { getDatabase } from '../models/database.js';

const API_URL = 'https://api.preciodelaluz.org/v1/prices/all?zone=PCB';
let cachedData = null;
let lastFetch = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

export const fetchAndCacheElectricityPrices = async () => {
    const currentTime = Date.now();
    
    if (cachedData && lastFetch && (currentTime - lastFetch) < CACHE_DURATION) {
        return cachedData;
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        cachedData = data;
        lastFetch = currentTime;

        // Guardar en base de datos
        await savePricesToDatabase(data);

        return data;
    } catch (error) {
        throw new Error('Error fetching electricity prices');
    }
};

const savePricesToDatabase = async (data) => {
    const db = getDatabase();
    const values = Object.entries(data).map(([hour, info]) => ({
        hour: parseInt(hour),
        price: info.price,
        date: new Date().toISOString().split('T')[0]
    }));

    const stmt = db.prepare(`
        INSERT INTO electricity_prices (hour, price, date)
        VALUES (?, ?, ?)
    `);

    values.forEach(value => {
        stmt.run([value.hour, value.price, value.date]);
    });

    stmt.finalize();
}; 