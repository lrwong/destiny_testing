"use strict"

let path = require('path');
let request =  require('request');
let https = require('https');
let fs = require('fs');
let zip = require('adm-zip');
require('../../../config.txt');

let base_url = 'https://www.bungie.net/';


// module.exports.dlManifest = function(returnMan){
function getLink(returnLink){

	let man = '/platform/Destiny/Manifest/';
	let test;
	let options = {
		url: base_url + man,
		port: 443,
		method: 'GET',
		headers:  {
			'Content-Type': 'application/json',
			'X-API-Key': api_key
		}
	};

	request(options, function(err, res, body){
		if(err){
			returnMan(err);
		} else {
			body = JSON.parse(body);
			returnLink(body);
		}
	});
};

getLink(function(res){

	let en = res.Response.mobileWorldContentPaths.en;
	console.log(en);

	let options = {
		url: base_url + en,
		port: 443,
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': api_key
		}
	};

	request(options, function(err, res, body){
		if(err){
			console.log(err);
			return;
		} else {
			console.log('writing file...');


			fs.writeFile('./test.txt.zip', body, function(err, data){
				if(err){
					console.log(err);
					return;
				} else {
					console.log('write successful. creating zip archive');
					let z = new zip('../../images/test.txt');
					console.log('unzipping file');
					// console.log(zip.readAsTest(z)); 
					return;
				}
			});


			// fs.write('../../images/test.txt', body, function(err, data){
			// 	if(err){
			// 		console.log(err);
			// 	} else {
			// 		let z = new zip('../../images/test.txt');
			// 		z.getEntries().forEach(function(entry){
			// 			let entryName = entry.entryName;
			// 			console.log(entryName);
			// 			let unzipped = z.readFile(entry);
			// 			console.log(zip.readAsText(entry));
			// 		});
			// 	}
			// })
		}
	});
});