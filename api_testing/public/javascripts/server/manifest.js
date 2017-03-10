"use strict"

let request = require('request');
let fs = require('fs');
let sqlite = require('sqlite3').verbose();
let SZIP = require('node-stream-zip'); //use this
require('../../../config.txt');
let defs = require('./t.json');


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

//makes a request to the destiny manifest endpoint and 
//extracts it to the current directory as 'manifest.content'
//@manifest.zip: this is the compressed manifest downloaded from the destiny man endpoint
//@manifest.content: uncompressed manifest sqlite file which can be queried
function getManifest(){

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
			zip.extract(en_path, './manifest.content', function(err,count){
				if(err) console.log(err);
			});
		});
	});

}

function queryManifest(table){
	let db = new sqlite.Database('manifest.content');

	let params = {
		$id: 0,
		$table: defs.table
	};

	db.serialize(function(){
		
		let query = "SELECT * FROM " + defs[table];

		db.each(query, function(err, row){
			if(err) throw err;

			console.log(row);
		});
	});
}

queryManifest('enemyDefs');