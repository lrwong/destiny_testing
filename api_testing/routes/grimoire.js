"use strict"
var express = require('express');
var router = express.Router();
let path = require('path');
let getGrim = require('../public/javascripts/server/getGrimoire.js');
require('../config.txt');

router.get('/getGrimByMem', function(req, res, next){
	let memType = '2';
	let displayName = 'CptnObvious231';

	getGrim.grimByMem(memType, displayName, function(grim){
		console.log(grim);
		res.send(grim);
	});


});

router.get('/getGrimoireDef', function(req, res, next){
	getGrim.getGrimoireDef(function(grim){
		console.log(grim);
		res.send(grim);
	});
});

module.exports = router;