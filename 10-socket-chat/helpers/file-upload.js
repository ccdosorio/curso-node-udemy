const path = require('path');
const { v4: uuidv4 } = require('uuid');

const fileUpload = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise( (resolve, reject) => {
        const { file } = files;
        const nameFile = file.name.split('.');
        const extension = nameFile[nameFile.length - 1];

        // Validar extension del archivos
        if (!validExtensions.includes(extension)) {
            reject(`La extension ${extension} no es permitida - ${validExtensions}`);
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nameTemp);
        });
    });

}

module.exports = {
    fileUpload
}