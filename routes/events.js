/**
 * Rutas de Eventos
 * 
 * Ruta: Host + /api/events
 */
// Todas las rutas deben pasar por la validación JWT

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} = require('../controllers/events');

const router = Router();

router.use(validarJWT);

// Obetener Eventor
router.get('/', obtenerEvento);

// Crear Evento
router.post('/', crearEvento);

// Actualizar Evento
router.put('/:id', actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);

module.exports = router;