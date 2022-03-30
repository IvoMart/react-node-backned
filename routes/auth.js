/**
 * Rutas de Usuarios - Auth
 * 
 * Ruta: Host + /api/auth
 */

//@ts-ignore
const { Router } = require('express');
//@ts-ignore
const { check } = require('express-validator');

//@ts-ignore
const { validarCampos } = require('../middlewares/validar-campos')
const {
    crearUsuario,
    loginUsr,
    revalidarToken
} = require('../controllers/auth');

const router = Router();

/**
 * RUTAS
 */
router.post('/'
    //Middlewares
    , [
        check('email', 'El email es un campo requerido.').isEmail(),
        check('passw', 'La clave debe ser mayor a 6 dígitos.').isLength({ min: 6 }),
        validarCampos
    ], loginUsr);

router.post('/new'
    //Middlewares
    , [
        check('name', 'El nombre es un campo requerido.').not().isEmpty(),
        check('email', 'El email es un campo requerido.').isEmail(),
        check('passw', 'La clave debe ser mayor a 6 dígitos.').isLength({ min: 6 }),
        validarCampos
    ], crearUsuario);

router.get('/reauth', revalidarToken);

//@ts-ignore
module.exports = router;