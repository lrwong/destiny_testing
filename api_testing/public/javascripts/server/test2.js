"use strict"

let request = require('request');
let fs = require('fs');
let ZIP = require('adm-zip'); //didn't work: resulted in either invalid stored block lengths error or invalid header check error
let ZLIB = require('zlib'); //only works for small (~128KB files)
let NZIP = require('node-zip'); //didn't work
let sqlite = require('sqlite3').verbose();
let JSZIP = require('jszip'); //didn't work as expected 
let SZIP = require('node-stream-zip'); //use this
require('../../../config.txt');


let man = 'https://www.bungie.net/';
let en = '/common/destiny_content/sqlite/en/world_sql_content_64ba059d78e743476271c13d9ff5feff.content'
let en_path = 'world_sql_content_64ba059d78e743476271c13d9ff5feff.content';


let options = {
	url: man + en,
	port: 443,
	method: 'GET',
	encoding: null,
	headers: {
		'Content-Type': 'application/json',
		'X-API-Key': api_key
	}
};

function getMan(){

	let outStream = fs.createWriteStream('manifest.zip');

	request(options)
	.on('response', function(res, body){
		console.log(res.statusCode);
		// console.log(res.headers);
		// len = res.headers.toString().length;
	}).pipe(outStream)
	.on('finish', function(){

		let zip = new SZIP({
			file: './manifest.zip',
			storeEntries: true
		});

		zip.on('ready', function(){
			zip.extract(en_path, './', function(err,count){
				if(err) console.log(err);
			});
		});
	});

}

getMan();