const generateJWT = require('./generate-jwt');
const dbValidators = require('./db-validators');

module.exports = {
    ...generateJWT,
    ...dbValidators
}