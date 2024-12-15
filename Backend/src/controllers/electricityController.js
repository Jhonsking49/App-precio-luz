import { fetchAndCacheElectricityPrices } from '../services/electricityService.js';

export const getPricesByHour = async (req, res) => {
    try {
        const data = await fetchAndCacheElectricityPrices();
        
        const hourlyPrices = Object.entries(data).map(([hour, info]) => ({
            hour: parseInt(hour),
            price: info.price,
            date: info.date,
            units: info.units || '€/kWh'
        }));

        res.json(hourlyPrices);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener precios por hora' });
    }
};

export const getPricesByDay = async (req, res) => {
    try {
        const data = await fetchAndCacheElectricityPrices();
        
        const dailyPrices = Object.entries(data).reduce((acc, [_, info]) => {
            const date = new Date(info.date).toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = {
                    date,
                    avgPrice: 0,
                    count: 0,
                    minPrice: Infinity,
                    maxPrice: -Infinity
                };
            }
            acc[date].avgPrice += info.price;
            acc[date].count += 1;
            acc[date].minPrice = Math.min(acc[date].minPrice, info.price);
            acc[date].maxPrice = Math.max(acc[date].maxPrice, info.price);
            return acc;
        }, {});

        const result = Object.values(dailyPrices).map(day => ({
            date: day.date,
            avgPrice: day.avgPrice / day.count,
            minPrice: day.minPrice,
            maxPrice: day.maxPrice,
            units: '€/kWh'
        }));

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener precios por día' });
    }
};

export const getPricesByRange = async (req, res) => {
    try {
        const { startHour, endHour, date } = req.query;
        
        if (!startHour || !endHour || !date) {
            return res.status(400).json({ 
                error: 'Se requieren hora inicio, hora fin y fecha' 
            });
        }

        const data = await fetchAndCacheElectricityPrices();
        
        const filteredPrices = Object.entries(data)
            .filter(([hour, info]) => {
                const hourNum = parseInt(hour);
                return hourNum >= parseInt(startHour) && 
                       hourNum <= parseInt(endHour) && 
                       info.date.startsWith(date);
            })
            .map(([hour, info]) => ({
                hour: parseInt(hour),
                price: info.price,
                date: info.date,
                units: info.units || '€/kWh'
            }));

        res.json(filteredPrices);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener precios por rango' 
        });
    }
};
