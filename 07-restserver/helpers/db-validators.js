const { Category, User, Role, Product } = require('../models');

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ where: { role } });
    if (!roleExists) {
        throw new Error(`El rol ${role} no esta registrado.`);
    }
}

const emailExists = async (email = '') => {
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
        throw new Error(`El correo ${email} ya se encuentra registrado.`);
    };
}

const userExistsById = async (id) => {
    const userExists = await User.findByPk(id);
    if (!userExists) {
        throw new Error(`El usuario con id: ${id} no existe.`);
    };
}

const categoryExistsById = async (id) => {
    const categoryExists = await Category.findByPk(id);
    if (!categoryExists) {
        throw new Error(`La categoria con id: ${id} no existe.`);
    };
}

const productExistsById = async (id) => {
    const productExists = await Product.findByPk(id);
    if (!productExists) {
        throw new Error(`El producto con id: ${id} no existe.`);
    };
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById
}