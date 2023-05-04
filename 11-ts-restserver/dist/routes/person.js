"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_1 = require("../controllers/person");
const router = (0, express_1.Router)();
router.get('/', person_1.personsGet);
router.get('/:id', person_1.personGetById);
router.post('/', person_1.personPost);
router.put('/:id', person_1.personPut);
router.delete('/:id', person_1.personDeleteById);
exports.default = router;
//# sourceMappingURL=person.js.map