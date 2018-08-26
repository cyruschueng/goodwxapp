'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
//var chalk     = require('chalk');

config.define = {
  freezeTableName : true,
  timestamps: false 
};

config.logging = function(str) {

}

var sequelize = new Sequelize(
  config.database, config.username,
  config.password, config
);
var db = {};
fs.readdirSync(__dirname)
.filter(function(file) {
  return (file.indexOf('.') !== 0) && (file !== basename);
})
.forEach(function(file) {
  if (file.slice(-3) !== '.js') return;
  var model = sequelize['import'](path.join(__dirname, file));
  db[camelize(model.name)] = model;
  console.log('add model->',model.name);
});

console.log(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


function camelize(str) {
  return str.replace (/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
  });
}
