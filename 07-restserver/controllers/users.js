const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { offset = 0, limit = 5 } = req.query;
    const users = await User.findAndCountAll({
        where: { status: true },
        attributes: ['id', 'name', 'email', 'role', 'status'],
        limit: Number(limit),
        offset: Number(offset)
    });

    res.json(users);
};

const usertsPost = async (req = request, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Ecriptar la password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar DB
    await user.save();

    res.status(201).json(user.user);
};

const usersPut = async (req = request, res) => {

    const id = req.params.id;
    const { password, google, email, ...user } = req.body;

    const userDB = await User.findByPk(id);

    if (password) {
        // Ecriptar la password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    const updateUser = await userDB.update(user, {
        where: { id }
    });

    res.status(200).json(updateUser.user);
};

const usersDelete = async (req = request, res) => {

    const { id } = req.params;

    const userDB = await User.findByPk(id);

    // Borrar fisicamente
    // const deletedUser = await userDB.destroy({ where: { id } });

    const deletedUser = await userDB.update({
        status: false
    }, {
        where: { id }
    });

    res.status(200).json(deletedUser.user);
};

module.exports = {
    usersGet,
    usertsPost,
    usersPut,
    usersDelete,
};
