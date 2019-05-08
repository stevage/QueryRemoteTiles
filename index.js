const promisify = require('util').promisify;
const mercator = require('global-mercator');
const vtquery = promisify(require('@mapbox/vtquery'));
const axios = require('axios');

/*
Options: {
    radius,
    limit,
    layers,
    geometry,
    dedup
}
see https://github.com/mapbox/vtquery
*/
async function queryLngLat(tilesUrl, lngLat, zoom, options = {}) {
    const [x, y, z] = mercator.lngLatToGoogle(lngLat, zoom);
    const url = tilesUrl
        .replace('{x}', x)
        .replace('{y}', y)
        .replace('{z}', z);
    try {
        const result = await axios.get(url, {
            headers: {
                'Content-Type': 'application/x-protobuf'
            }, responseType: 'arraybuffer'
        });

        const tiles = [
            {buffer: result.data, z, x, y }
        ];
        return await vtquery(tiles, lngLat, options);
    } catch (e) {
        return { error: e, features: [] }
    }
}

module.exports = {
    queryLngLat,
}