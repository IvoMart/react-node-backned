//@ts-ignore
const { response } = require('express');


const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body;

    res.status(201).json({
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