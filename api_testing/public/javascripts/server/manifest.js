"use strict"

let request = require('request');
let fs = require('fs');
let sqlite = require('sqlite3').verbose();
let SZIP = require('node-stream-zip'); //use this
require('../../../config.txt');
let defs = require('./table.json');

//the urls are hard coded for simplicity's sake
let man = 'https://www.bungie.net/';
let en = '/common/destiny_content/sqlite/en/world_sql_content_64ba059d78e743476271c13d9ff5feff.content'

//this is the entry name for the english manifest
//contained in the zip file that we need to extract
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

//makes a request to the destiny manifest endpoint and 
//extracts it to the current directory as 'manifest.content'
//@manifest.zip: this is the compressed manifest downloaded from the destiny man endpoint
//@manifest.content: uncompressed manifest sqlite file which can be queried
function getManifest(){

	let outStream = fs.createWriteStream('manifest.zip');

	request(options)
	.on('response', function(res, body){
		console.log(res.statusCode);
	}).pipe(outStream)
	.on('finish', function(){
		let zip = new SZIP({
			file: './manifest.zip',
			storeEntries: true
		});

		zip.on('ready', function(){
			zip.extract(en_path, './manifest.content', function(err,count){
				if(err) console.log(err);
			});
		});
	});

}

//queries manifes.content, can be modified to accept parameters
//mostly just to demo that this can use the .content file 
//as a sqlite db for queries
function queryManifest(){
	let db = new sqlite.Database('manifest.content');


	db.serialize(function(){
		
		let query = "SELECT name FROM sqlite_master WHERE type='table'";

		db.each(query, function(err, row){
			if(err) throw err;

			console.log(row);
		});
	});
}

