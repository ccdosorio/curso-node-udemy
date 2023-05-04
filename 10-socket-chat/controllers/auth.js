const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT, googleVerify } = require("../helpers");

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            where: { email }
        });

        // Verificar si el email existe
        if (!user) {
            return res.status(400).json({
                message: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar si el usuario esta activo 
        if (!user.status) {
            return res.status(400).json({
                message: 'Usuario / Password no son correctos - estado false'
            })
        }

        // Verificar la password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                message: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({ user: user.user, token });
    } catch (error) {
        res.status(500).json({
            message: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ where: { email } });
        // Crear usuario
        if (!user) {
            const data = {
                name,
                email,
                password: '',
                img,
                role: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save();
        };

        // Si el usuario DB 

        if (!user.status) {
            return res.status(401).json({
                message: 'Hable con el administrador, usuario bloqueado.'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({ user: user.user, token });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'El token no se pudo verificar.'
        });
    }

}

const renewToken = async (req = request, res = response) => {
    const { user } = req;

    // Generar nuevo JWT
    const token = await generateJWT(user.uid);

    res.json({ user, token });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}