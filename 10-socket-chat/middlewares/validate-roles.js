const { response, request } = require('express');

const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            message: 'Se quiere verificar el rol sin validar el token.'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: `${name} no es administrador - No puede realizar la accion`
        });
    }

    next();

}

const hasRole = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                message: 'Se quiere verificar el rol sin validar el token.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();
    }

}

module.exports = {
    isAdminRole,
    hasRole
}