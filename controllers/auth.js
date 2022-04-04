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

const loginUsr = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                Ok: false,
                msg: 'Usuario no registrado',
            })
        }

        //Comparar contraseñas:
        const validatePassw = bcrypt.compareSync(password, usuario.password);
        if (!validatePassw) {
            return res.status(400).json({
                Ok: false,
                msg: 'Contraseña incorrecta.'
            });
        }
        res.json({
            Ok: true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name
        })
    } catch (error) {
        res.status(500).json({
            Ok: false,
            msg: 'Por favor comuniquese con el Administrador del sitio'
        })
    }

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