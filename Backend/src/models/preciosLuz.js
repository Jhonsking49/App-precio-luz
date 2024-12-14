
import db from "./db.js";


export const addPrecioLuz = (fecha, hora, precio, callback) => {
    const deleteSql = "DELETE FROM preciosLuz";
    
    db.run(deleteSql, (err) => {
        if (err) {
            console.error('Error al eliminar los precios antiguos:', err);
            callback(err, null);
            return;
        }

        const resetIdSql = "DELETE FROM sqlite_sequence WHERE name='preciosLuz'";
        
        db.run(resetIdSql, (err) => {
            if (err) {
                console.error('Error al reiniciar el contador de IDs:', err);
                callback(err, null);
                return;
            }

            const insertSql = "INSERT INTO preciosLuz (fecha, hora, precio) VALUES (?, ?, ?)";
            const insertParams = [fecha, hora, precio];

            db.run(insertSql, insertParams, function(err) {
                if (err) {
                    console.error('Error al insertar el nuevo precio:', err);
                    callback(err, null);
                } else {
                    console.log(`Precio de luz insertado con id: ${this.lastID}`);
                    callback(null, { id: this.lastID });
                }
            });
        });
    });
};



export const getAllPreciosLuz = (callback) => {
    const sql = "SELECT * FROM preciosLuz";

    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
}

export const deletePrecioLuz = (id, callback) => {

    const sql = "DELETE FROM preciosLuz WHERE id=?";

    db.run(sql, id, function(err){
        callback(err, {changes: this.changes});
    });
}

export const getAllPreciosLuzByDia = (fecha, callback) => {
    const sql = 'SELECT * FROM preciosLuz WHERE fecha = ? ORDER BY hora';

    db.all(sql, [fecha], (err, rows) => {
        if (err) {
            console.error('Error al obtener precios por día:', err);
            callback(err, null);
        } else {
            callback(null, rows); 
        }
    });
}


export const getAllPreciosLuzByHora = (hora, callback) => {
    const sql = 'SELECT * FROM preciosLuz WHERE hora = ? ORDER BY fecha';

    db.all(sql, [hora], (err, rows) => {
        if (err) {
            console.error('Error al obtener precios por hora:', err);
            callback(err, null);
        } else {
            callback(null, rows);  
        }
    });
}