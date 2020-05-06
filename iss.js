const request = require('request');

const fetchMyIP = callback => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`), null);
      return;
    }

    const coordinates = {
      latitude: JSON.parse(body).data.latitude,
      longitude: JSON.parse(body).data.longitude,
    };
    callback(null, coordinates);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };