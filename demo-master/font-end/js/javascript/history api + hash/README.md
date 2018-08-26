#history
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
```
一、历史记录的前进和后退,移动到指定历史记录点

window.history.back();

window.history.forward();

window.history.go(-1);

二、html5 history新的api

1.window.history.pushState = 存储当前历史记录点
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");

2.window.history.replaceState = 替换当前历史记录点
与window.history.pushState类似，不同之处在于replaceState不会在window.history新增历史记录点，

3.window.onpopstate = 监听历史记录点
监听历史记录点，直观的可认为是监听URL的变化，但会忽略URL的hash部分
```

#hash
[ruanyifeng](http://www.ruanyifeng.com/blog/2011/03/url_hash.html)
```



通过location.hash改写其内容，且不会主动触发浏览器reload。 

1.那么如何去监听呢？ (polling监听#的变化)。
    var oldHash = location.hash;
    setTimeInterval(function() {
        if(oldHash !== location.hash) {
            //do something
            oldHash = location.hash;
        }
    }, 100);


2. hashchange
    hashchange与popstate
    hashchange是老API, 浏览器支持度高, 监听hash变化的, 客户端前进后退

    window.addEventListener('hashchange', function() {
        routeHandle(locaiton.hash);
    });


```


history
http://www.jb51.net/article/105062.htm

[ajax与HTML5 history pushState/replaceState实例]
(http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)