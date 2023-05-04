const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const {
    categoriesGet,
    categoriesGetById,
    categoriesPost,
    categoriesPut,
    categoriesDelete
} = require('../controllers');
const { categoryExistsById } = require('../helpers');

const router = Router();

router.get('/', categoriesGet);

router.get('/:id', [
    check('id').custom(categoryExistsById),
    validateFields
], categoriesGetById);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    validateFields
], categoriesPost);

router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validateFields
], categoriesPut);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom(categoryExistsById),
    validateFields
], categoriesDelete);


module.exports = router;