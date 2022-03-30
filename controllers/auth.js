//@ts-ignore
const { response } = require('express');
//@ts-ignore
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            Ok: false,
            errors: errors.mapped()
        });
    }

    res.json({
        Ok: true,
        msg: 'register',
        name,
        email,
        password
    })
};

const loginUsr = (req, res = response) => {
    const { email, password } = req.body;
    res.json({
        Ok: true,
        msg: 'login',
        email,
        password
    })
};

const revalidarToken = (req, res = response) => {
    res.json({
        Ok: true,
        msg: 'renew'
    })
};

//@ts-ignore
module.exports = {
    crearUsuario,
    loginUsr,
    revalidarToken,
}