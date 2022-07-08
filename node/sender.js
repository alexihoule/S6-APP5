const axios = require('axios');

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

var test;

client.on('connect', () => {
    client.publish('houa2909/connected', 'true')
  })

// To get all data
axios.get('https://api.particle.io/v1/devices/e00fce68285fad1dccfa7f4a/test?access_token=4c69e2c2e7cbfae1d6a9a7eadd3d3c95d670f892')
    .then((res) => {
        console.log(`Test: ${res.data.result}`)
        test = res.data.result
        console.log(res.data.result)

        client.publish('houa2909/test', test.toString())

    }).catch((err) => {
        console.error(err);
    });