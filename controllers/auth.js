//@ts-ignore
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuarios');


const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            console.log(usuario);
            return res.status(400).json({
                Ok: false,
                msg: 'El email ya está registrado',
            })
        }

        usuario = new Usuario(req.body);

        // Encriptar clave de nuevo usuario
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

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