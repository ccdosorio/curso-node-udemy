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
exports.personDeleteById = exports.personPut = exports.personPost = exports.personGetById = exports.personsGet = void 0;
const person_1 = require("../models/person");
const personsGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield person_1.Person.findAll({ where: { status: true } });
    res.json({ persons });
});
exports.personsGet = personsGet;
const personGetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const person = yield person_1.Person.findByPk(id);
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).json({
            message: `No existe un usuario con el Id: ${id}`
        });
    }
});
exports.personGetById = personGetById;
const personPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const existsEmail = yield person_1.Person.findOne({ where: { email } });
        if (existsEmail) {
            return res.status(422).json({
                message: `Ya existe una persona con el email: ${email}`
            });
        }
        const person = new person_1.Person({ name, email });
        yield person.save();
        res.json(person);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hable con el administrador' });
    }
});
exports.personPost = personPost;
const personPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const person = yield person_1.Person.findByPk(id);
        if (!person) {
            return res.status(404).json({
                message: `No existe un usuario con el id: ${id}`
            });
        }
        yield person.update(body);
        res.json(person);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hable con el administrador' });
    }
});
exports.personPut = personPut;
const personDeleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const person = yield person_1.Person.findByPk(id);
    if (!person) {
        return res.status(404).json({
            message: `No existe un usuario con el id: ${id}`
        });
    }
    // Eliminar el registro de la base de datos
    // await person.destroy();
    yield person.update({ status: false });
    res.json(person);
});
exports.personDeleteById = personDeleteById;
//# sourceMappingURL=person.js.map