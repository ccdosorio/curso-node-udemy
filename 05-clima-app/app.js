require('dotenv').config();

const { inquirerMenu, pause, readInput, listPlaces } = require('./helpers/inquirer.js');
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
                const city = await readInput('Ciudad: ');

                // Buscar los lugares
                const places = await searches.searchCities(city);

                // Seleccionar el lugares
                const id = await listPlaces(places);
                if (id === '0') continue;

                const selectedPlace = places.find(palce => palce.id === id);

                const { name, lat, lng } = selectedPlace;

                // Guardar en DB
                searches.addHistory(name);

                // Clima
                const weather = await searches.searchLocalClimate(lat, lng);

                // Mostrar resultados
                // console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', name.green);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:', weather.temp);
                console.log('Mínima:', weather.min);
                console.log('Máxima:', weather.max);
                console.log('Como está el clima:', weather.desc.green);
                break;

            case 2:
                searches.capitalizedHistory.forEach((place, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${place} `);
                });
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
}

main();