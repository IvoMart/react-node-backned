/**
 * Rutas de Eventos
 * 
 * Ruta: Host + /api/events
 */
// Todas las rutas deben pasar por la validación JWT

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
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
router.post('/',
    // Middleware
    [
        check('title', 'El Titulo es un campo requerido.').not().isEmpty(),
        check('start', 'La fecha de inicio es un campo requerido.').custom(isDate),
        check('end', 'La fecha de finalización es un campo requerido.').custom(isDate),
        validarCampos
    ], crearEvento);

// Actualizar Evento
router.put('/:id', actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);

module.exports = router;