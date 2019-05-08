### Query-Remote-Tiles

Performs a point-in-polygon lookup inside a hosted vector tile source. This can be used in Node or in the browser.

#### Usage

```js
queryMbtiles.queryLngLat(tilesUrl, [lng, lat], zoom, layer, { options });
```

```js
const queryRemoteTiles = require('query-mbtiles');
result = await queryRemoteTiles.queryLngLat('http://example.com/tiles/{z}/{x}/{y}.pbf', [145.13, -37.97], 14, 'mylayer');
console.log(result.features[0].properties);
```
