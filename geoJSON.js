/**
 * @author kyle / http://nikai.us/
 */

//import DataSet from "./DataSet";
/*
export default {
    getDataSet: function (geoJson) {
        var data = [];
        var features = geoJson.features;
        if (features) {
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var geometry = feature.geometry;
                var properties = feature.properties;
                var item = {};
                for (var key in properties) {
                    item[key] = properties[key];
                }
                item.geometry = geometry;
                data.push(item);
            }
        }
        //return new DataSet(data);
    }
}
*/

// A GeoJSON feature collection:
// @see {@link https://www.oschina.net/translate/geojson-spec}
// {
//     "type": "FeatureCollection",
//         "features": [
//             {
//                 "type": "Feature",
//                 "geometry": { "type": "Point", "coordinates": [102.0, 0.5] },
//                 "properties": { "prop0": "value0" }
//             },
//             {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "LineString",
//                     "coordinates": [
//                         [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
//                     ]
//                 },
//                 "properties": {
//                     "prop0": "value0",
//                     "prop1": 0.0
//                 }
//             },
//             {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Polygon",
//                     "coordinates": [
//                         [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
//                         [100.0, 1.0], [100.0, 0.0]]
//                     ]
//                 },
//                 "properties": {
//                     "prop0": "value0",
//                     "prop1": { "this": "that" }
//                 }
//             }
//         ]
// }