import { Request, Response } from 'express';
import { Person } from '../models/person';

export const personsGet = async (req: Request, res: Response) => {

    const persons = await Person.findAll({ where: { status: true } });

    res.json({ persons });
}

export const personGetById = async (req: Request, res: Response) => {

    const { id } = req.params;

    const person = await Person.findByPk(id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).json({
            message: `No existe un usuario con el Id: ${id}`
        });
    }

}

export const personPost = async (req: Request, res: Response) => {

    const { name, email } = req.body;

    try {

        const existsEmail = await Person.findOne({ where: { email } });

        if (existsEmail) {
            return res.status(422).json({
                message: `Ya existe una persona con el email: ${email}`
            });
        }

        const person = new Person({ name, email });
        await person.save();

        res.json(person);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hable con el administrador' });
    }

}

export const personPut = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const person = await Person.findByPk(id);

        if (!person) {
            return res.status(404).json({
                message: `No existe un usuario con el id: ${id}`
            });
        }

        await person.update(body);

        res.json(person);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hable con el administrador' });
    }
}

export const personDeleteById = async (req: Request, res: Response) => {

    const { id } = req.params;

    const person = await Person.findByPk(id);

    if (!person) {
        return res.status(404).json({
            message: `No existe un usuario con el id: ${id}`
        });
    }

    // Eliminar el registro de la base de datos
    // await person.destroy();

    await person.update({ status: false });

    res.json(person);
}


