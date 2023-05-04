"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteById = exports.userPut = exports.userPost = exports.userGetById = exports.usersGet = void 0;
const usersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: 'Get users' });
});
exports.usersGet = usersGet;
const userGetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.json({ message: 'Get user by Id', id });
});
exports.userGetById = userGetById;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    res.json({ message: 'Post user', body });
});
exports.userPost = userPost;
const userPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    res.json({ message: 'Put user by Id', body, id });
});
exports.userPut = userPut;
const userDeleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.json({ message: 'Delete user by Id', id });
});
exports.userDeleteById = userDeleteById;
//# sourceMappingURL=user.js.map