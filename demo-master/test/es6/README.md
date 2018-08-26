## es6-config

``` bash
#install
cnpm i --save-dev babel-cli babel-preset-env babel-polyfill babel-preset-react

1.babel-cli工具，用于命令行转码--global babel-cli

2.babel-core调用Babel的API进行转码。

3.babel-polyfill
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象

4.babel-preset-es2015 # ES2015转码规则

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3

# ECMAScript 6 扫盲
http://www.barretlee.com/blog/2016/07/09/a-kickstarter-guide-to-writing-es6/
```

```
# .babelrc

{
  "presets": [
    ["stage-0"],
    ["es2015", {"loose": true, "modules": "commonjs"}],
    ["env","react"]

  ],
  "plugins": [
    "add-module-exports",
    ["transform-runtime", {polyfill: true}],
    ["transform-react-jsx"]
  ],
  "comments": false,
  "ignore": [
    "foo.js",
    "bar/**/*.js"
  ]
}


{
  "presets": ["env","react"],
  "plugins": ["transform-react-jsx"],
  "ignore": [
    "foo.js",
    "bar/**/*.js"
  ]
}


```

````

// ES5  
[1, 2].concat(more)  
// ES6  
[1, 2, ...more]  
var arr1 = ['a', 'b'];  
var arr2 = ['c'];  
var arr3 = ['d', 'e'];  
// ES5 的合并数组  
arr1.concat(arr2, arr3);  
// [ 'a', 'b', 'c', 'd', 'e' ]  
// ES6 的合并数组  
[...arr1, ...arr2, ...arr3]  
// [ 'a', 'b', 'c', 'd', 'e' ] 

```
