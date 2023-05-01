const { Router } = require('express');
const { check } = require('express-validator');

const { uploadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers');
const { validateFields, validateFile } = require('../middlewares');
const { allowedTables } = require('../helpers');

const router = Router();

router.post('/', validateFile, uploadFile);

router.put('/:table/:id', [
    validateFile,
    check('table').custom(c => allowedTables(c, ['users', 'products',])),
    validateFields
], updateImageCloudinary);

router.get('/:table/:id', [
    check('table').custom(c => allowedTables(c, ['users', 'products',])),
    validateFields
], showImage);

module.exports = router;