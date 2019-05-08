### Query-Remote-Tiles

Find the closest features to a lngLat inside a hosted vector tile source. This can be used in Node or in the browser.

#### Usage

```js
queryMbtiles.queryLngLat(tilesUrl, [lng, lat], zoom, { options });
```

For options see [vtquery documentation](https://github.com/mapbox/vtquery#vtquery).

```js
const queryRemoteTiles = require('query-mbtiles');
result = await queryRemoteTiles.queryLngLat('http://example.com/tiles/{z}/{x}/{y}.pbf', [145.13, -37.97], 14);
console.log(result.features[0].properties);
```
