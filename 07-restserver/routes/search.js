const { Router } = require('express');

const { search } = require('../controllers');

const router = Router();

router.get('/:table/:term', search)

module.exports = router;