import sqlite3 from 'sqlite3';
import { DATABASE_PATH } from '../config/config.js';

const db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if(err){
        console.error("Error al conectar con la Base de Datos", err.message);
    }else{
        console.log("Conexión exitosa a la Base de Datos");
    }


    db.serialize(() => {

        db.run(`
            CREATE TABLE IF NOT EXISTS preciosLuz(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fecha TEXT NOT NULL,
                hora INTEGER NOT NULL,
                precio REAL NOT NULL,
                UNIQUE(fecha, hora)
            )`);

    });

});

export default db;