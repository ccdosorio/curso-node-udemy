require('dotenv').config();

const { inquirerMenu, pause, readInput } = require('./helpers/inquirer.js');
const Searches = require('./models/searches.js');
require('colors');

const main = async () => {

    const searches = new Searches();
    let opt;

    do {
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const place = await readInput('Ciudad: ');
                await searches.city(place);

                // Buscar los lugares

                // Seleccionar el lugares

                // Clima

                // Mostrar resultado
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ',);
                console.log('Lat: ',);
                console.log('Lng: ',);
                console.log('Temperatura: ',);
                console.log('Minima: ',);
                break;

            case 2:
                console.log('seleccionaste la opcion 2');
                break;

            case 0:
                console.log('seleccionaste la opcion salir');
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
}

main();