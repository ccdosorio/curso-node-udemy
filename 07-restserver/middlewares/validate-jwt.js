const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            message: 'No hay token en la peticion.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario que corresponde al uid
        const user = await User.findByPk(uid);

        if (!user) {
            return res.status(401).json({
                message: 'Token no valido - usuario no existe DB'
            });
        }

        // Verificar si el usuario esta activo
        if (!user.status) {
            return res.status(401).json({
                message: 'Token no valido - usuario false'
            });
        }

        req.user = user.user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Token no valido.'
        });
    }

}

module.exports = {
    validateJWT
}