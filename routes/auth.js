/**
 * Rutas de Usuarios - Auth
 * 
 * Ruta: Host + /api/auth
 */

//@ts-ignore
const { Router } = require('express');
//@ts-ignore
const { check } = require('express-validator');
const router = Router()

//@ts-ignore
const {
    crearUsuario,
    loginUsr,
    revalidarToken
} = require('../controllers/auth');


/**
 * RUTAS
 */
router.post('/'
    //Middlewares
    , [], loginUsr);

router.post('/new'
    //Middlewares
    , [
        check('name', 'El nombre es un campo requerido.').not().isEmpty(),
        check('email', 'El email es un campo requerido.').isEmail(),
        check('passw', 'La clave debe ser mayor a 6 dígitos.').isLength({ min: 6 }),
    ], crearUsuario);

router.get('/reauth', revalidarToken);

//@ts-ignore
module.exports = router;