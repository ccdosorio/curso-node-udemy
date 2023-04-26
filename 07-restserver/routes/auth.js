const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido.').isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validateFields
], login);

module.exports = router;