"use strict" 
let http = require('https');
require('../../../config.txt');




exports.getGrimoire = function(options, onResult){
	console.log('getGrimoire called');

	let req = http.request(op, function(res){
		let out = [];
		console.log('status: ' + res.statusCode);
		console.log('headers: ' + JSON.stringify(res.headers));
		res.headers['X-API-Key'] = api_key;

		res.on('data', function(chunk){
			out.push(chunk);
		}).on('end', function(){
			console.log(out.toString());
			onResult(res.statusCode, out);
		});
	});

	req.on('error', function(err){
		console.log('error: ' + err);
	});

	/*
	let req = http.request(options, function(res){
		res.send('testing');
		let out = [];
		console.log(options.host + ': ' + res.statusCode);
		res.setEncoding('utf8');

		res.on('data', function(chunk){
			output.push(chunk);
			console.log(chunk);
		});

		res.on('end', function(){
			onResult(res.statusCode, out);
		});
	});

	req.on('error', function(err){
		//res.send('error: '+ err.message);
	});
	*/
	req.end();
};

