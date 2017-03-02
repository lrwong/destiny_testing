"use strict"

let path = require('path');
let request =  require('request');
let https = require('https');
require('../../../config.txt');


//getMembershipIdByDisplayName: 
let memIdByDN = '/Destiny/{membershipType}/Stats/GetMembershipIdByDisplayName/';

let base_url = 'https://www.bungie.net/platform';


//@getMemId: accepts a membership type and a display name and returns the membership ID for the user
//@memType: the type of membership, either 'xbox' or 'psn'
//@displayName: the user's online display name
//@callback: callback function that is will be used to handle the response by the requestor
module.exports.getMemId = function(memType, displayName, callback){

// function getMemId(memType, displayName, callback){ //testing only

	let memIdByDN = '/Destiny/' + memType + '/Stats/GetMembershipIdByDisplayName/';

	let options = {
		url: base_url + memIdByDN + displayName,
		port: 443,
		method: 'GET',
		headers:  {
			'Content-Type': 'application/json',
			'X-API-Key': api_key
		}
	};

	request(options, function(err, res, body){
		if(err){
			callback(err);
		} else {
			callback(body);
		}
	});


};


// getMemId('psn', 'CptnObvious231', function(res){
// 	console.log(res);
// }); //for testing