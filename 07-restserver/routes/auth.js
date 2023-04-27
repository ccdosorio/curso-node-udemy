const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/login', [
    check('email', 'El correo no es valido.').isEmail(),
    check('password', 'El password es obligatorio.').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'El ID TOKEN es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;