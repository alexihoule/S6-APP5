// Nuage de Particle -> Broker MQTT

// On utilise la fonction getEventStream() de la librairie "particle-api-js" pour
// aller chercher les events reliés au beacon scanner

// https://api.particle.io/v1/devices/e00fce68285fad1dccfa7f4a/test?access_token=4c69e2c2e7cbfae1d6a9a7eadd3d3c95d670f892

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

const Particle = require('particle-api-js');
const particle = new Particle();

const auth_token = '4c69e2c2e7cbfae1d6a9a7eadd3d3c95d670f892'
const device_ID = 'e00fce68285fad1dccfa7f4a'
var event_status = ''
var event_name = ''

const express = require('express');
const app = express();
const port = 3002;

//Recoit tous les events du Cloud et publie ceux qui nous intéressent sur le Broker
particle.getEventStream({ deviceId: device_ID, auth: auth_token }).then(function (stream) {
    stream.on('event', function (data) {
        event_status = data.data.toString();
        event_name = data.name.toString();

        if (event_status === 'In' || event_status === 'Out') {
            console.log('name: ' + event_name + ' status: ' + event_status);
            client.publish('houa2909/' + event_status, event_name);
            //console.log('Event published.');
        };
    });
});

app.listen(port, () => {
    console.log('Relay server started (localhost:' + port +')...');
});
