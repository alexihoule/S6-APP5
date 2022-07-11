// Controle de l'etat de la DEL

const Particle = require('particle-api-js');
const particle = new Particle();

const auth_token = '4c69e2c2e7cbfae1d6a9a7eadd3d3c95d670f892'
const device_ID = 'e00fce68285fad1dccfa7f4a'

//const express = require('express');
//const port = 3001;

//Mettre cette fonction dans une fonction quelconque venant du UI lorsqu'on appuie sur le bouton
particle.callFunction({ deviceId: device_ID, name: "toggleLED", auth: auth_token })