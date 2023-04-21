const argv = require('yargs')
    .options({
        'b': {
            alias: 'base',
            type: 'number',
            demandOption: true,
            describe: 'Es la base de la tabla a multiplicar'
        },
        'l': {
            alias: 'listar',
            type: 'boolean',
            demandOption: false,
            default: false,
            describe: 'Muestra la tabla en consola'
        },
        'h': {
            alias: 'hasta',
            type: 'number',
            demandOption: false,
            describe: 'En hasta donde se va a realizar la tabla'
        }
    })
    .check((argv, options) => {
        console.log('yargs', argv);
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un numero';
        }
        return true;
    })
    .argv;

module.exports = argv;