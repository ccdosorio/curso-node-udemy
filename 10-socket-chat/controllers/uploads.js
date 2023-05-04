const path = require('path');
const fs = require('fs');

const { response, request } = require('express');
const { fileUpload } = require('../helpers');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { User, Product } = require('../models');

const uploadFile = async (req = request, res = response) => {

    try {
        // Imagenes
        const name = await fileUpload(req.files);
        res.json({ name });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Ocurrio un error al subir el archivo'
        });

    }

}

const updateImage = async (req = request, res = response) => {
    const { table, id } = req.params;

    let model;

    switch (table) {
        case 'users':
            model = await User.findByPk(id, { attributes: { exclude: ['password'] } });

            if (!model) {
                return res.status(400).json({
                    message: `No existe un usuario con el id: ${id}`
                })
            }

            break;
        case 'products':
            model = await Product.findByPk(id);

            if (!model) {
                return res.status(400).json({
                    message: `No existe un producto con el id: ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ message: 'No se valido la tabla.' });
    }

    try {

        // Limpiar imagenes previas
        if (model.img) {
            // Hay que borrar la iamgen del servidor
            const pathImage = path.join(__dirname, '../uploads/', table, model.img);

            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }

        const name = await fileUpload(req.files, undefined, table);
        model.set({ img: name });

        await model.save(model);

        res.json(model);
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }

}

const showImage = async (req = request, res = response) => {

    const { table, id } = req.params;

    let model;

    switch (table) {
        case 'users':
            model = await User.findByPk(id, { attributes: { exclude: ['password'] } });

            if (!model) {
                return res.status(400).json({
                    message: `No existe un usuario con el id: ${id}`
                })
            }

            break;
        case 'products':
            model = await Product.findByPk(id);

            if (!model) {
                return res.status(400).json({
                    message: `No existe un producto con el id: ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ message: 'No se valido la tabla.' });
    }

    try {

        // Limpiar imagenes previas
        if (model.img) {
            // Hay que borrar la iamgen del servidor
            const pathImage = path.join(__dirname, '../uploads/', table, model.img);

            if (fs.existsSync(pathImage)) {
                res.sendFile(pathImage);
            }
        }

        const pathNonImage = path.join(__dirname, '../assets/no-image.jpg');

        res.sendFile(pathNonImage)

    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}

const updateImageCloudinary = async (req = request, res = response) => {
    const { table, id } = req.params;

    let model;

    switch (table) {
        case 'users':
            model = await User.findByPk(id, { attributes: { exclude: ['password'] } });

            if (!model) {
                return res.status(400).json({
                    message: `No existe un usuario con el id: ${id}`
                })
            }

            break;
        case 'products':
            model = await Product.findByPk(id);

            if (!model) {
                return res.status(400).json({
                    message: `No existe un producto con el id: ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ message: 'No se valido la tabla.' });
    }

    try {

        // Hay que borrar la iamgen de Cloudinary en base a su id que viene en la secure_url
        if (model.img) {
            // Obtener el id
            const nameArr = model.img.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split('.');
            await cloudinary.uploader.destroy(public_id);
        }

        // Subir la imagen a cloudinary y actualizar el modelo de la DB con secure_url

        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

        model.set({ img: secure_url });

        await model.save(model);

        res.json(model);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error
        });
    }

}

module.exports = {
    uploadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}