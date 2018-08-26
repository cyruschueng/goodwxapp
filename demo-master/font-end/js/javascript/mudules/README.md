## 模块化



``` bash
commonjs(require,exports)
cmd(seajs),
amd(requirejs),
es6,(import,export)
nodejs(common.js)
```

### require/exports 的用法只有以下三种简单的写法： 
()[https://www.zhihu.com/question/56820346/answer/150724784]

```
const fs = require('fs')
exports.fs = fs
module.exports = fs
```

而 import/export 的写法就多种多样：
```
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

## AMD
```
// http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html
// node.js模块系统，参考CommonJS规范

// CommonJS
var math = require('math');
　　math.add(2,3); // 5



// 浏览器环境
var math = require('math');
　　math.add(2, 3);
/*第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。

服务器，模块在本地，同步加载，等待时间等于硬盘读取时间。
浏览器，模块在服务器，时间长，可能假死。

因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。*/



// AMD
AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。

/*它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。*/

/*AMD也采用require()不同于CommonJS，它要求两个参数：require([module], callback);
第一个参数[module]，是一个数组，加载的模块；
第二个参数callback，则是加载成功之后的回调函数。*/

写成AMD形式：
　　require(['math'], function (math) {
　　　　math.add(2, 3);
　　});//math.add()与math模块加载不是同步的，浏览器不会发生假死。适合浏览器环境。
```

