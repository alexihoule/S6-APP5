// Controle de l'etat de la DEL

const Particle = require('particle-api-js');
const particle = new Particle();

const auth_token = '4c69e2c2e7cbfae1d6a9a7eadd3d3c95d670f892'
const device_ID = 'e00fce68285fad1dccfa7f4a'

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
app.use(cors());

//Permet d'ouvrir l'interface getLEDState, appelle la fonction sur le Cloud pour activer ou désactiver la LED sur le Argon
app.get('/getLEDState', function(req, res) {
    const particleFunction = particle.callFunction({ deviceId: device_ID, name: 'toggleLED', auth: auth_token });
    particleFunction.then(
        function(data) {
            console.log(data.body?.return_value);
            res.json(data.body?.return_value);
        }, function(err) {
            console.log('Error in led control :', err);
        });
});

app.listen(port, () => {
    console.log('Control server started (localhost:' + port +')...');
});