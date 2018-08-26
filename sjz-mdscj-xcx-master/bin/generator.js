'use strict';

const inquirer = require('inquirer'),
      recast   = require('recast'),
      path     = require('path'),
      ejs      = require('ejs'),
      fs       = require('fs');

function root () {
  return path.join.apply(null, [__dirname, '../'].concat([].slice.call(arguments)));
}

const src = root.bind(null, 'src');
const blueprints = root.bind(null, 'blueprints');

inquirer.prompt([
  {
    name: 'type',
    type: 'list',
    message: 'Which type of files do you want to generate',
    default: 0,
    choices: ['model']
  }
]).then(function (answers) {
  switch (answers.type) {
    case 'model':
      generateModel();
      break;
  }
});

function generateModel () {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Input your model name'
    },
    {
      name: 'files',
      type: 'checkbox',
      message: 'Check files you want to generate',
      choices: ['reducer', 'saga'],
      default: ['reducer', 'saga']
    }
  ]).then(function (answers) {
    const name = answers.name;
    const files = answers.files;
    
    const dirName = src('models', name);
    
    makeDirIfNotExists(dirName);
    writeModelFiles(name, files);
  });
}

function writeModelFiles (modelName, files) {
  const hasReducer = files.indexOf('reducer') >= 0;
  const hasSaga = files.indexOf('saga') >= 0;
  
  const indexFileName = src('models', modelName, 'index.js');
  let templateFileName = blueprints('model', 'index.ejs');
  writeFileIfNotExists(indexFileName, templateFileName, {
    modelName,
    hasReducer,
    hasSaga
  });
  
  if (hasReducer) {
    const reducerFileName = src('models', modelName, 'reducer.js');
    let templateFileName = blueprints('model', 'reducer.ejs');
    writeFileIfNotExists(reducerFileName, templateFileName, {modelName});
  }
  if (hasSaga) {
    const sagaFileName = src('models', modelName, 'saga.js');
    let templateFileName = blueprints('model', 'saga.ejs');
    writeFileIfNotExists(sagaFileName, templateFileName, {modelName});
  }
}

function makeDirIfNotExists (dirName) {
  try {
    fs.statSync(dirName);
  } catch (e) {
    fs.mkdirSync(dirName);
  }
}

function writeFileIfNotExists (filename, templateFilename, data) {
  const templateCode = fs.readFileSync(templateFilename, 'utf8');
  const resCode = ejs.render(templateCode, data);
  try {
    fs.writeFileSync(filename, resCode, 'utf8');
  } catch (err) {
    console.log('File ' + filename + ' already exists, skip.');
  }
}
