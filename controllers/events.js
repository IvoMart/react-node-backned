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
const actualizarEvento = async(req, res = response) => {

    try {

        const eventoId = req.params.id;

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese Identificador.',
            });
        }
        if (evento.user.toString() !== req.uid) {
            return res.status(404).json({
                Ok: false,
                msg: 'Usuario no autorizado. No tiene permisos para realizar esta acción.'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        res.json({
            ok: true,
            msg: 'actualizarEvento',
            eventoId,
            evento: eventoActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Ok: false,
            msg: 'Por favor comuniquese con el Administrador del sitio.'
        });
    }
};

const eliminarEvento = async(req, res = response) => {
    try {

        const eventoId = req.params.id;

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese Identificador.',
            });
        }
        if (evento.user.toString() !== req.uid) {
            return res.status(404).json({
                Ok: false,
                msg: 'Usuario no autorizado. No tiene permisos para realizar esta acción.'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId, { new: true });
        res.json({
            ok: true,
            msg: 'eliminarEvento',
            eventoId,
            evento: eventoEliminado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Ok: false,
            msg: 'Por favor comuniquese con el Administrador del sitio.'
        });
    }
};

module.exports = {
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}