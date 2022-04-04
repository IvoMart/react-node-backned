const { response } = require('express');
const { generarJWT } = require('../helpers/jwtAccessControl');



const obtenerEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'obtenerEvento'
    })
};
const crearEvento = (req, res = response) => {
    // console.log(req.body);
    res.json({
        ok: true,
        msg: 'crearEvento'
    })
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