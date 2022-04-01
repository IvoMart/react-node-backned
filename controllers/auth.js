//@ts-ignore
const { response } = require('express');
const Usuario = require('../models/Usuarios');


const crearUsuario = async(req, res = response) => {
    const usuario = new Usuario(req.body);
    // const { name, email, password } = req.body;
    try {
        await usuario.save();

        res.status(201).json({
            Ok: true,
            msg: 'register',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Ok: false,
            msg: 'ERROR: Pongase en contacto con el Administrador',
        });
    }
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