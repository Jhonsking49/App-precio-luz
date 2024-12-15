import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    } else {
        console.log('Conexión exitosa con la base de datos SQLite');
    }
});

export async function initializeDatabase() {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error al crear la tabla users:', err);
                reject(err);
            } else {
                console.log('Tabla users creada o ya existente');
                resolve();
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS electricity_prices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                price REAL NOT NULL,
                hour INTEGER NOT NULL,
                date TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error al crear la tabla electricity_prices:', err);
                reject(err);
            } else {
                console.log('Tabla electricity_prices creada o ya existente');
                resolve();
            }
        });

        db.run(`
            CREATE TABLE IF NOT EXISTS weather_searches (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                city TEXT NOT NULL,
                temperature REAL,
                description TEXT,
                humidity INTEGER,
                wind_speed REAL,
                search_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        `, (err) => {
            if (err) {
                console.error('Error al crear la tabla weather_searches:', err);
                reject(err);
            } else {
                console.log('Tabla weather_searches creada o ya existente');
                resolve();
            }
        });
    });
}

export function getDatabase() {
    return db;
}
