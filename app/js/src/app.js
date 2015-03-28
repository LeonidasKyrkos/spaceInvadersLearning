'use strict';

var Starfield = require('./starfield');
var Starship = require('./starship');



var container = document.getElementById('starfield');
var starfield = new Starfield(container);
var ship = new Starship();