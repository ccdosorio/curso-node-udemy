const axios = require('axios');

class Searches {

    history = ['Tegucigalpa', 'Madrid', 'San Jose'];

    constructor() {
        // TODO: leer DB si existe
    }

    get paramsMapbox() {
        return {
            'access_token': 'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja2tvZHh4Y3YwMDhnMnBvY3ozbHUxdGJvIn0.3zptKSSxJrM5VmfjnkKMYA',
            'limit': 5,
            'language': 'es'
        }
    }

    async city(place = '') {
        try {
            // Petición http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return [];
        } catch (error) {
            return [];
        }
    }

}

module.exports = Searches;