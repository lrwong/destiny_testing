"use strict"
let request = require('request');
let fs = require('fs');
let ZIP = require('adm-zip');
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


function adm_zip(){
	request(options, function(err, resp, body){
		if(err) throw err;

		fs.writeFile('test.zip', body, function(err){
			if(err) return err;

			let zip = new ZIP('test.zip');
			let entries = zip.getEntries();
			let e = entries[0];
			zip.extractEntryTo('test.zip', './', false, true )

			console.log(e);
			// console.log(e.entryName);
		})
	})
}

adm_zip();








function useADM(){
	request(options, function(err, resp, body){
		if(err) throw err;
		fs.writeFile('test.zip', body, function(err){
			if(err) return err;
			console.log('file written');
			let zip = new Zip('test.zip');
			console.log('zip obj created');
			let entries = zip.getEntries();


			console.log(entries.toString());

			console.log(entries.compressedData);


			return;



			let entry = entries[0];

			zip.extractAllTo('../../images/unzipped.txt');

			fs.writeFile('unzipped.txt', zip.readAsText(entries[0]),function(err){
				console.log(zip.readAsText(entries[0]));
				if(err){
					return console.log(err);
				}
			});

			return;

			// let writerStream = fs.createWriteStream('unzipped.txt');



			// zip.getEntries().forEach(function(entry) {
			//     var entryName = entry.entryName;
			//     var decompressedData = zip.readAsText(entry); // decompressed buffer of the entry
			//     writerStream.write(decompressedData, 'UTF8');
			//     // buf+=decompressedData;

			//     // buf += (zip.readAsText(entry)); // outputs the decompressed content of the entry  

			// });
			// writerStream.end();
			// writerStream.on('finish', function(){
			// 	console.log('write done');
			// });
			// // console.log(buf);
		 //    	fs.writeFile('unzipped.txt', buf, function(err){
			// 	if(err){
			// 		console.log(err);
			// 	}
			// });
		});
	});
}



// let Zip = require('adm-zip');

// var zip = new Zip("test.txt.zip"); 
// // get all entries and iterate them
// zip.getEntries().forEach(function(entry) {
//     var entryName = entry.entryName;
//     var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
//     console.log(zip.readAsText(entry)); // outputs the decompressed content of the entry  
// });