'use strict';
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var controller = {};
fs.readdirSync(__dirname)
	.filter(function(file) {
		return(file.indexOf('.') !== 0) && (file !== basename);
	})
	.forEach(function(file) {
		if(file.slice(-3) !== '.js') return;
		var ctrl = require(path.join(__dirname, file));
		controller[ctrl.name] = ctrl;
	});
module.exports = controller;