---

## uxcore-formatter [![Dependency Status](http://img.shields.io/david/uxcore/uxcore-formatter.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-formatter) [![devDependency Status](http://img.shields.io/david/dev/uxcore/uxcore-formatter.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-formatter#info=devDependencies) 


Formatter 是一些处理字符串的工具函数的集合，他的设计原则是第一个参数为一个 string，返回值为一个 string，后面的参数皆为可选，即有默认值。

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-formatter
$ cd uxcore-formatter
$ npm install
$ npm start
```

## Usage
```
var Formatter = require("uxcore-formatter");
console.log(Formatter.date(new Date(), 'YYYY-MM-DD');
```

## API
> 目前提供的函数包括：

### Date
```javascript
Formatter.date(new Date(), 'YYYY-MM-DD HH:mm:ss'); // 2015-10-12 14:22:16
```

### money

```javascript
Formatter.money("6566456.65466545") // "6 566 456.65466545"
Formatter.money("6566456.65466545", ",")  // "6,566,456.65466545"
Formatter.money("6566456", ",")  // "6,566,456"
Formatter.money("6566456", ",", 4) // "6,566,456.0000"
Formatter.money("6566456", ",", 2) // "6,566,456.00"
Formatter.money("6566456.65466545", ",", 4)  // "6,566,456.6547"
Formatter.money("6566456.65466545", ",", 2) // "6,566,456.65"
```

### cnmobile
```javascript
Formatter.cnmobile('+8615652988282', ' '); // +86 1565 2988 282
```

### card
```javascript
Formatter.card('1565298828212233', ' '); // 1565 2988 2821 2233
```


