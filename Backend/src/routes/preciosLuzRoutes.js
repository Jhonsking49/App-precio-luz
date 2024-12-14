import express from 'express';
import { createPrecioLuzHandler, deletePrecioLuzHandler, getAllPreciosLuzByDiaHandler, getAllPreciosLuzByHoraHandler, getAllPreciosLuzHandler } from '../controllers/precioLuzController.js';

const router = express.Router();

// router.get('/:id', get);
router.post('/', createPrecioLuzHandler);
router.delete('/:id', deletePrecioLuzHandler);

router.get("/", getAllPreciosLuzHandler);

router.get("/dia/:fecha", getAllPreciosLuzByDiaHandler);
router.get("/hora/:hora", getAllPreciosLuzByHoraHandler);

export default router;