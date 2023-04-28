const { response, request } = require('express');

const { Category, User } = require('../models');

const categoriesGet = async (req = request, res = response) => {

    const { offset = 0, limit = 5 } = req.query;
    const categories = await Category.findAndCountAll({
        where: { status: true },
        attributes: ['id', 'name', 'status'],
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email'],
        }],
        limit: Number(limit),
        offset: Number(offset)
    });

    res.json(categories);
};

const categoriesGetById = async (req = request, res = response) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    res.json(category);
};

const categoriesPost = async (req = request, res = response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ where: { name } });

    // Validar si ya existe la categoria
    if (categoryDB) {
        return res.status(400).json({
            message: `La categoria ${categoryDB.name} ya existe.`
        });
    }

    // Generar la data a guardar
    const data = {
        name,
        userId: req.user.uid
    }

    const category = new Category(data);

    // Guardar DB
    await category.save();

    res.status(201).json(category);
};

const categoriesPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, userId, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.userId = req.user.uid;

    // Validar si existe la categoria por el nombre

    if (data.name) {
        const categoryExists = await Category.findOne({ where: { name: data.name } });

        if (categoryExists) {
            return res.status(400).json({
                message: `La categoria ${categoryExists.name} ya existe.`
            });
        }
    }

    const category = await Category.findByPk(id);

    await category.update(data);

    res.status(200).json(category);
};

const categoriesDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const categoryDB = await Category.findByPk(id);

    const deletedCategory = await categoryDB.update({
        status: false
    }, {
        where: { id }
    });

    res.status(200).json(deletedCategory);
};

module.exports = {
    categoriesGet,
    categoriesGetById,
    categoriesPost,
    categoriesPut,
    categoriesDelete
};
