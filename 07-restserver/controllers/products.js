const { response, request } = require('express');

const { Product, Category, User } = require('../models');

const productsGet = async (req = request, res = response) => {

    const { offset = 0, limit = 5 } = req.query;
    const products = await Product.findAndCountAll({
        where: { status: true },
        attributes: ['id', 'name', 'description', 'price', 'img', 'status', 'available'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'status'],
            }, {
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'status'],
            }],
        limit: Number(limit),
        offset: Number(offset)
    });

    res.json(products);
};

const productsGetById = async (req = request, res = response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id, {
        attributes: ['id', 'name', 'description', 'price', 'status', 'available'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'status'],
            },
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'status'],
            }],
    });

    res.json(product);
};

const productsPost = async (req = request, res = response) => {

    const { status, userId, ...body } = req.body;

    const productDB = await Product.findOne({ where: { name: body.name } });

    // Validar si ya existe el producto
    if (productDB) {
        return res.status(400).json({
            message: `El producto ${productDB.name} ya existe.`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        userId: req.user.uid
    }

    const product = new Product(data);

    // Guardar DB
    await product.save();

    res.status(201).json(product);
};

const productsPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { status, userId, ...data } = req.body;

    // Validar si existe el producto por nombre
    if (data.name) {
        data.name = data.name.toUpperCase();

        const productExists = await Category.findOne({ where: { name: data.name } });

        if (productExists) {
            return res.status(400).json({
                message: `El producto ${productExists.name} ya existe.`
            });
        }
    }

    if (data.categoryId) {
        const categoryDB = await Category.findByPk(data.categoryId);

        if (!categoryDB) {
            return res.status(400).json({
                message: `La categoria con Id: ${data.categoryId} no existe.`
            });
        }
    }

    data.userId = req.user.uid;

    const product = await Product.findByPk(id);

    await product.update(data);

    res.status(200).json(product);
};

const productsDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const productDB = await Product.findByPk(id);

    const deletedProduct = await productDB.update({
        status: false
    }, {
        where: { id }
    });

    res.status(200).json(deletedProduct);
};

module.exports = {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
};
