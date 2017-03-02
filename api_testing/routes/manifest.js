"use strict"
var express = require('express');
var router = express.Router();
let path = require('path');
let getMan = require('../public/javascripts/server/getManifest.js');
require('../config.txt');


router.get('/', function(req, res, next){
	getMan.dlManifest(function(man){
		res.send(man);
	});
});

module.exports = router;