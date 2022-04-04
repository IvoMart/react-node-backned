const { response } = require('express');
const { generarJWT } = require('../helpers/jwtAccessControl');
const Evento = require('../models/Eventos')



const obtenerEvento = async(req, res = response) => {
    const eventos = await Evento
        .find()
        .populate('user', [
            'name',
            'email'
        ]);

    res.json({
        ok: true,
        msg: 'obtenerEvento',
        eventos
    })
};
const crearEvento = async(req, res = response) => {
    // console.log(req.body);
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        await evento.save();

        res.json({
            ok: true,
            msg: 'crearEvento',
            evento
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Ok: false,
            msg: 'Por favor comuniquese con el Administrador del sitio.'
        });
    }
};
const actualizarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarEvento'
    })
};
const eliminarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarEvento'
    })
};

module.exports = {
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}