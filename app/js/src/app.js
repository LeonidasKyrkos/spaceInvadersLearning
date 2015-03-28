'use strict';

var Starfield = require('./starfield');
var Starship = require('./starship');
var Level = require('./level');

var container = document.getElementById('starfield');

var starfield = new Starfield(container);
var ship = new Starship();

setTimeout(function(){ var levelOne = new Level(1,ship); },2000)
