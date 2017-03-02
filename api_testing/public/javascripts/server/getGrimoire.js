"use strict"

let path = require('path');
let request =  require('request');
let https = require('https');
let memId = require('./getMemId.js');
require('../../../config.txt');

let base_url = 'https://www.bungie.net/platform';


//retrieves a specific user's grimoire by making a call to the Destiny API Grimoire endpoint
//@memType: accepts 'psn' or 'xbox', references whether the account is a PSN or Xbox Live account
//@displayName: the user's display name on Xbox Live or PSN
//@return: returns the json response from the Destiny API
//@returnGrim: callback function used to process the data returned from the http call


module.exports.grimByMem = function(memType, displayName, returnGrim){
// function grimByMem(memType, displayName, returnGrim){ //function header for testing
	
	let id;

	//getGrimoireByMembership endpoint:
	let grimForMem =  '/Destiny/Vanguard/Grimoire/';  // + {membershipType}/{destinyMembershipId}/';

	memId.getMemId(memType, 'CptnObvious231', function(res){
		res = JSON.parse(res);
		id = res.Response;
		
		let options = {
			url: base_url + grimForMem + memType + '/' + id,
			port: 443,
			method: 'GET',
			headers:  {
				'Content-Type': 'application/json',
				'X-API-Key': api_key
			}
		};
		

		request(options, function(err, res, body){
			if(err){
				returnGrim(err);
			} else {
				body = JSON.parse(body);
				let grim = body.Response.data.cardCollection;
				returnGrim(grim);
			}
		});

	});
};

//grimByMem tester function
// grimByMem('2', 'test', function(res){
// 	res = JSON.parse(res);
// 	let grim = res.Response.data.cardCollection;
// 	console.log(grim);
// });


//getGrimoireDef: 


//returns all grimoire definitions, equivalent to pulling 
//@returnDefs: callback function that allows the response data to be accessed by the calling application
module.exports.getGrimoireDef = function(returnDefs){
// function getGrimoireDef(returnDefs){ //function header for testing

	let grimDef = '/Destiny/Vanguard/Grimoire/Definition/';

	let options = {
		url: base_url + grimDef,
		port: 443,
		method: 'GET',
		headers:  {
			'Content-Type': 'application/json',
			'X-API-Key': api_key
		}
	};

	request(options, function(err, res, body){
		if(err){
			returnDefs(err);
		} else {
			body = JSON.parse(body);
			let grim = body.Response.themeCollection;
			returnDefs(grim);
		}
	});
}

//getGrimoireDef tester
// getGrimoireDef(function(res){
// 	console.log(res);
// });






//getMyGrimoire: 
let myGrim = '/Destiny/Vanguard/Grimoire/'; // {membershipType}/'





