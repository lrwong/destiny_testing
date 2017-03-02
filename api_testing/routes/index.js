"use strict"
var express = require('express');
var router = express.Router();
let path = require('path');
require('../config.txt');


router.get('/', function(req, res, next){
	let options = {
		root: path.join(__dirname, "../public/html"),
		dotfiles: 'deny',
		headers:{
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	res.sendFile('index.html', options, function(err){
		if(err){
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('sent index.html');
		}
	});
});


router.get('/test', function(req, res, next){
	let url = 'bungie.net';
	let displayName = 'CptnObvious231';
	let membershipType = '2';

	// let myGrimoire = '/Destiny/Vanguard/Grimoire/'+membershipType'/';
	let memId = '4611686018457048317'//'/Destiny/2/Stats/GetMembershipIdByDisplayName/'+displayName+'/';
	let grimStr = '/platform/Destiny/Vanguard/Grimoire/2/'+memId+'/';

	let headers = {
		'Content-Type': 'application/json',
		"X-API-Key": api_key
	};

	let options = {
		host:  url,
		port: 443,
		path:  grimStr,
		method: 'GET',
		headers:  headers
	};

	let op = {
		url: 'https://www.bungie.net/platform/Destiny/Vanguard/Grimoire/2/4611686018457048317/',
		port: 443,
		method: 'GET',
		headers: headers
	}


	let out = grim.getGrimoire(options, function(statusCode, result){
		res.statusCode = statusCode;
		console.log(res.statusCode);
		res.send(result.toString());
	});

});


module.exports = router;
