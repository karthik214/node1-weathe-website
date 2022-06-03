const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3NoYXN0cmkyMSIsImEiOiJjbDN0MG0weXowYms1M2ZueXRxYzNiaGdzIn0.NtqHTZrfEdYXZXgUlEhcVg';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect Geo Code service", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find the location", undefined);
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    });
}

module.exports = geocode;