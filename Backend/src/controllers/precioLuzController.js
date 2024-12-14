import { addPrecioLuz, deletePrecioLuz, getAllPreciosLuz, getAllPreciosLuzByDia, getAllPreciosLuzByHora } from "../models/preciosLuz.js"


export const getAllPreciosLuzHandler = (req, res) => {

    getAllPreciosLuz((err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
        }else{
            res.status(200).json({rows});
        }
    });
}


export const getAllPreciosLuzByDiaHandler = (req, res) => {

    const { fecha } = req.params;

    getAllPreciosLuzByDia(fecha, (err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
        }else{
            res.status(200).json({rows});
        }
    });
}

export const getAllPreciosLuzByHoraHandler = (req, res) => {

    const { hora } = req.params;

    if (isNaN(hora) || hora < 0 || hora > 23) {
        return res.status(400).json({ error: 'La hora debe estar entre 0 y 23' });
    }

    getAllPreciosLuzByHora(hora, (err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
        }else{
            res.status(200).json({rows});
        }
    });
   
}


export const createPrecioLuzHandler = (req, res) => {
    const { fecha, hora, precio } = req.body;

    if (!fecha || hora === undefined || precio === undefined) {
        return res.status(400).json({ error: 'Se requieren los campos fecha, hora y precio.' });
    }

    addPrecioLuz(fecha, hora, precio, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json(result);
        }
    });
}


export const deletePrecioLuzHandler = (req, res) => {
    const { id } = req.params;

    deletePrecioLuz(id, (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
        }else if(result.changes === 0){
            res.status(404).json({ error: "Cliente no encontrado" });
        }else{
            res.status(200).json(result);
        }
    });
}

