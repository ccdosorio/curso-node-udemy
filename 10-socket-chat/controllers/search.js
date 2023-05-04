const { response, request } = require('express');
const { Op } = require('sequelize');

const { User, Category, Product } = require('../models');

const allowedTables = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async (term, res = response) => {

    const users = await User.findAndCountAll({
        where: {
            status: true,
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${term}%`
                    }
                },
                {
                    email: {
                        [Op.like]: `%${term}%`
                    }
                },
            ],
        },
        attributes: ['id', 'name', 'email', 'role', 'status'],
    });

    return res.json(users);

}

const searchCategories = async (term, res = response) => {

    const categories = await Category.findAndCountAll({
        where: {
            status: true,
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${term}%`
                    }
                }
            ],
        },
        attributes: ['id', 'name', 'status'],
    });

    return res.json(categories);

}

const searchProducts = async (term, res = response) => {

    const products = await Product.findAndCountAll({
        where: {
            status: true,
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${term}%`
                    },
                },
                { '$Category.name$': { [Op.like]: `%${term}%` } }
            ],
        },
        attributes: ['id', 'name', 'description', 'price', 'available', 'status'],
        include: [{
            model: Category,
            as: 'category',
            attributes: ['id', 'name', 'status'],
        }],
    });

    return res.json(products);

}

const search = async (req = request, res = response) => {

    const { table, term } = req.params;

    if (!allowedTables.includes(table)) {
        return res.status(400).json({
            message: `Las tablas permitidas son: ${allowedTables}`
        })
    }

    switch (table) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;

        default:
            return res.status(500).json({
                message: 'Busqueda no encontrada, comunicate con el administrador.'
            });
    }
}

module.exports = {
    search
}