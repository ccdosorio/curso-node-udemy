const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete
} = require('../controllers/products');
const { productExistsById, categoryExistsById } = require('../helpers');

const router = Router();

router.get('/', productsGet);

router.get('/:id', [
    check('id').custom(productExistsById),
    validateFields
], productsGetById);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('categoryId', 'La categoria es obligatoria.').not().isEmpty(),
    check('categoryId').custom(categoryExistsById),
    validateFields
], productsPost);

router.put('/:id', [
    validateJWT,
    check('id').custom(productExistsById),
    validateFields
], productsPut);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom(productExistsById),
    validateFields
], productsDelete);


module.exports = router;