const fs = require('fs');
const axios = require('axios');

class Searches {

    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWahter() {
        return {
            'lat': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }


    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get capitalizedHistory() {
        return this.history.map(lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ')

        })
    }

    async searchCities(place = '') {
        try {
            // Petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async searchLocalClimate(lat, lon) {
        try {
            // Petición http

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    addHistory(place = '') {
        // Validar duplicados
        if (this.history.includes(place.toLocaleLowerCase())) return;

        // Mostrar solo los ultimos 5
        this.history = this.history.splice(0, 5);

        this.history.unshift(place.toLocaleLowerCase());

        // Grabar en DB
        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.history = data.history;

    }

}

module.exports = Searches;