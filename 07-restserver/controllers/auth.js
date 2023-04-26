const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email } });

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

module.exports = {
    login
}