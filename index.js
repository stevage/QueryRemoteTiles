const { promisify } = require('es6-promisify');
const mercator = require('global-mercator');
const vt2geojson = promisify(require('@mapbox/vt2geojson'));
let pointInPolygon = require('@turf/boolean-point-in-polygon');

async function queryLngLat(
    tilesUrl,
    lngLat,
    zoom,
    layer,
    options = { quiet: false }
) {
    const [x, y, z] = mercator.lngLatToGoogle(lngLat, zoom);
    const uri = tilesUrl.replace('{x}', x).replace('{y}', y).replace('{z}', z);
    try {
        const featureCollection = await vt2geojson({ uri, layer });
        const features = featureCollection.features.filter((f) =>
            pointInPolygon(lngLat, f)
        );
        if (features) {
            return {
                type: 'FeatureCollection',
                features,
            };
        }
    } catch (e) {
        if (!options.quiet) {
            console.error(e);
        }
    }
}
module.exports = {
    queryLngLat,
};
