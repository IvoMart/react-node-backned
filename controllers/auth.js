//@ts-ignore
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuarios');
const { generarJWT } = require('../helpers/jwtAccessControl')


const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
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
        // Generar JWT para el acceso
        // console.warn(usuario.id, usuario.name);

        const tokenV = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            Ok: true,
            uid: usuario.id,
            name: usuario.name,
            tokenV
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

        // Generar JWT para el acceso
        // console.warn(usuario.id, usuario.name);
        const tokenV = await generarJWT(usuario.id, usuario.name);

        res.json({
            Ok: true,
            msg: 'login',
            uid: usuario.id,
            name: usuario.name,
            tokenV
        })
    } catch (error) {
        res.status(500).json({
            Ok: false,
            msg: 'Por favor comuniquese con el Administrador del sitio'
        })
    }

};

const revalidarToken = async(req, res = response) => {
    const { uid, name } = req;

    // Generar JWT para el acceso
    // console.warn(uid, name);
    const tokenV = await generarJWT(uid, name);

    res.json({
        Ok: true,
        msg: 'renew',
        tokenV
    })
};

//@ts-ignore
module.exports = {
    crearUsuario,
    loginUsr,
    revalidarToken,
}