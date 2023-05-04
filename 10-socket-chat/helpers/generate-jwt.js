const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = async (uid = '') => {

    return new Promise((resolve, reject) => {

        const paylod = { uid };

        jwt.sign(paylod, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        });

    });
}

const checkJWT = async (token = '') => {
    try {
        if (token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findByPk(uid);

        if (user) {
            if (user.status) {
                return user.user;
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

module.exports = {
    generateJWT,
    checkJWT
}