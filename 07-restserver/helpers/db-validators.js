const Role = require('../models/role');
const User = require('../models/user');

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
        throw new Error(`El id: ${id} no existe.`);
    };
}

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}