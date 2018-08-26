#### FIX for global object problem

由于在微信小程序中不存在global object, 导致 _root.js 返回的是undefined, now.js的root.Date.now()出错，需要修改 now.js 成 -> Date.now()

```
var now = function() {
//  return root.Date.now();
    return Date.now();
};
```

cp FIX/now.js node_modules/lodash-es/now.js

yarn run build

cp dist/lodash-wx.js ../../src/utils/npm/
