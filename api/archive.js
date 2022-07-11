// Broker MQTT -> BD

// Get beacon events from MQTT broker and output it in .txt file

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

const fs = require('fs'); // Needed to write and delete .txt file
const filename = 'events-db.txt';

client.on('connect', () => {
    client.subscribe('houa2909/In');
    client.subscribe('houa2909/Out');

    //Delete database if exists
    fs.exists(filename, function (exists) {
        if (exists) {
            fs.unlinkSync(filename);
        }
    });
});

client.on('message', (topic, message) => {
    switch (topic) {
        case 'houa2909/In':
            //console.log(message.toString(), 'is in.');
            write_data_to_file(message.toString(), 'in');
            break;
        case 'houa2909/Out':
            //console.log(message.toString(), 'is out.');
            write_data_to_file(message.toString(), 'out');
            break;
    }
});

function write_data_to_file(address, status) {
    var line = '\n' + address + ' is ' + status + '.';
    fs.appendFile(filename, line, err => {
        if (err) {
            console.error(err);
        }
    });
};