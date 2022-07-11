// Broker MQTT -> BD

// Get beacon events from MQTT broker and output it in .txt file

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://broker.hivemq.com')

const fs = require('fs'); // Needed to write and delete .txt file
const filename = 'events-db.txt';

const cors = require('cors');

var express = require('express'); 

const app = express();
const port = 3000;

app.use(cors());

client.on('connect', () => {
    client.subscribe('houa2909/In');
    client.subscribe('houa2909/Out');

    //Delete database if exists
    fs.exists(filename, function (exists) {
        if (exists) {
            //fs.unlinkSync(filename);
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
    var line =  address + ' : ' + status + '\n';
    fs.appendFile(filename, line, err => {
        if (err) {
            console.error(err);
        }
    });
};

app.get('/getEvents', function (req, res) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log('Error in reading the api : ', err);
            return;
        }
        else {
            var returnData = [];
            var rows = data.split('\n');

            for (let i = 0; i < rows.length - 1; i++) {
                const element = rows[i].split(' : ');
                returnData[i] = { address: element[0], status: element[1] };
            }

            res.json(returnData);
        }
    });
});

app.listen(port, () => {
    console.log('Archive server started (localhost:' + port +')...');
});