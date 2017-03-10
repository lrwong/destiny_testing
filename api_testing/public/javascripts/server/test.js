"use strict"
let request = require('request');
let fs = require('fs');
let ZIP = require('adm-zip');
let ZLIB = require('zlib');
let NZIP = require('node-zip');
let sqlite = require('sqlite3').verbose();
let JSZIP = require('jszip');
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

function sucBuf(buf){
	fs.writeFile('suc_zip.txt', buf, function(err){
		if(err) throw err;
	});
}

function failBuf(buf){
	fs.writeFile('fail_zip.txt.zip', buf, function(err){
		if(err) throw err;
	});
}

let zipOptions = {
	base64: false,
	checkCRC32: true, 
	optimizedBinaryString: false,
	createFolders: false
}

function adm_zip(){
	request(options, function(err, resp, body){
		if(err) throw err;



		fs.writeFileSync('manifest.zip', body);
		let inStream = fs.createReadStream('test.zip');
		let outStream = fs.createWriteStream('out-stream.content');
 		
 		// fs.readFile('manifest.zip', function(err, d){
			// ZLIB.inflate(d, function(err, data){
			// 	if(err) return console.log(err);
			// 	fs.writeFileSync('manifest.content', data);
			// });
 			
 		// })

		// return;



		let zip = new ZIP('manifest.zip');
		let entry = zip.getEntry(en_path);
		console.log(entry.toString());

		return;


		ZLIB.inflateRaw(body, function(err, data){
			if(err) console.log(err);
			console.log(data);
			// fs.writeFile('./raw-inflate.txt', data, function(err){
			// 	if(err) throw err;
			// });
		});
		// console.log(zip);
		

		return;







		let nzip = new NZIP(body, {base64: true, checkCRC32: true});
		let jszip = new JSZIP();

		jszip.loadAsync('test.zip', zipOptions);
		/*.then(function(data){
			fs.writeFile('./jszip-test.content', data, function(err){
				if(err) throw err;
			});
		});*/

		return;
		fs.writeFile('./testzip.content', x, function(err){
			if(err) throw err;
		});
		// console.log(nzip);
		return;


		let manifestName = zip.getEntries()[0].entryName;
		let buf = zip.readFile(manifestName);
		zip.extractEntryTo(manifestName, './', false, true);


		fs.writeFile('./test.content', buf, function(err){
			if(err) throw err;
		});
		return;

		/*

		//save the zip file to test.zip
		fs.writeFile('test.zip', body, function(err){
			if(err) return err;
			let zip = new ZIP('test.zip');
			let entries = zip.getEntries();
			let e = entries[0];
			let eName = e.entryName;
			fs.writeFile('buf.txt', buf, function(err){
				if (err) throw err;
				let db = new sqlite.Database('buf.txt');
				db.serialize(function(){
					db.all('select name from sqlite_master where type = "table"', function(err, rows){
						if(err) throw err;
						console.log(rows);
					});
				});

				// if(let x = new sqlite.Database('buf.txt')){
				// 	console.log('success');
				// }
			});	

			return;
		});

		*/

	});
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