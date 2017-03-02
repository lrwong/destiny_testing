"use strict"

let http = require('https');
let request = require('request');
require('../../../config.txt');
let out = '';


let options = {
	url: 'https://www.bungie.net/platform/Destiny/Vanguard/Grimoire/2/4611686018457048317/',
	port: 443,
	method: 'GET',
	headers:  {
		'Content-Type': 'application/json',
		'X-API-Key': api_key
	}
}

request(options, function(err, res, body){
	console.log(res);
});
