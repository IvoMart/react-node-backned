const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // X-Authorization headers
    const token = req.header('X-Authorization');

    // console.info(token);

    if (!token) {
        return res.status(401).json({
            Ok: false,
            msg: 'No se validó el Token.'
        })
    }
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // console.info(uid, name);
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            Ok: false,
            msg: 'No se validó el Token.'
        })
    }
    next();
};


module.exports = {
    validarJWT,
}