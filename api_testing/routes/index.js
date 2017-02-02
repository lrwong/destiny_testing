"use strict"
var express = require('express');
var router = express.Router();
let path = require('path');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next){
	let options = {
		root: path.join(__dirname, "../public/html"),
		dotfiles: 'deny',
		headers:{
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	res.sendFile('index.html', options, function(err){
		if(err){
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('sent index.html');
		}
	});
});

module.exports = router;
