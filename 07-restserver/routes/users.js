const { Router } = require('express');
const { check } = require('express-validator');

const { isValidRole, emailExists, userExistsById } = require('../helpers');
const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const {
    usersGet,
    usertsPost,
    usersPut,
    usersDelete,
} = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 caracteres.').isLength({ min: 6 }),
    check('email', 'El correo no es valido.').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields
], usertsPost);

router.put('/:id', [
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id').custom(userExistsById),
    validateFields
], usersDelete);

module.exports = router;
