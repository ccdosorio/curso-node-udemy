const { response, request } = require("express");

const usersGet = (req = request, res = response) => {

    const { q, name = 'No name', apiKey, page = 1, limit = 5 } = req.query;

    res.json({
        msg: "get API - controlador",
        q,
        name,
        apiKey,
        page,
        limit
    });
};

const usertsPost = (req = request, res) => {
    const { name, age } = req.body;

    res.status(201).json({
        msg: "post API - controlador",
        name,
        age
    });
};

const usersPut = (req = request, res) => {

    const id = req.params.id;

    res.status(400).json({
        msg: "put API - controlador",
        id
    });
};

const usersPatch = (req = request, res) => {
    res.json({
        msg: "patch API - controlador",
    });
};

const usersDelete = (req = request, res) => {
    res.json({
        msg: "delete API - controlador",
    });
};

module.exports = {
    usersGet,
    usertsPost,
    usersPut,
    usersPatch,
    usersDelete,
};
