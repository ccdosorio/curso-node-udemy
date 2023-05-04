"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/', user_1.usersGet);
router.get('/:id', user_1.userGetById);
router.post('/', user_1.userPost);
router.put('/:id', user_1.userPut);
router.delete('/:id', user_1.userDeleteById);
exports.default = router;
//# sourceMappingURL=user.js.map