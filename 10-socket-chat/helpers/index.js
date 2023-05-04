const generateJWT = require('./generate-jwt');
const dbValidators = require('./db-validators');
const googleVerify = require('./google-verify');
const fileUpload = require('./file-upload');

module.exports = {
    ...generateJWT,
    ...dbValidators,
    ...googleVerify,
    ...fileUpload
}