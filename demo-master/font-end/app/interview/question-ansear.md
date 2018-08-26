15. Q :  绑定事件的两种方式的区别？
  A :  1.写法上是不同的(一个加on一个不加on) 
   2.事件触发的顺序不同  
    3. this指向不同。

16. Q :  如何判断数组类型？
  A :  1.Object.prototype.toString.call()(最优的方案)
    2.constructor    
    3.instanceof


9. Q :  JS中的面向对象是如何实现的？
  A :  首先创建一个构造函数，然后通过new构造函数的方式来创建对象。
  一般在构造函数的this下添加属性，在构造函数的原型下添加方法。


5. Q :  深拷贝与浅拷贝有什么区别？
  A :  都是去拷贝对象给一个新的对象，浅拷贝只能拷贝一层，不能拷贝子对象。深拷贝则可以拷贝子对象，一般用递归实现。
6. Q :  js的兼容性都接触过哪些？
  A :  1.js中的事件源：标准下event.target，IE下event.srcElement。
    2.js中的event对象：标准下事件函数的第一个参数，IE下window.event。
    3.绑定事件：标准下addEventListener，IE下attachEvent。
    4.获取终极样式：标准下getComputedStyle，IE下currentStyle。
    5.childNodes在标准下：会获取空白节点，IE下是不会获取空白节点。
    6. 滚动距离scrollTop，document.documentElement || document.body
    7.鼠标滚轮，DOMMouseScroll  onmousewheel


可枚举和不可枚举
Object.keys();
for...in...
JSON.stringify()

 ./ 当前目录 ../ 父级目录 / 根目录
 
css
:before和::before=伪类和伪元素
:Pseudo-classes     伪类:DOM在不同状态、不同位置下的特殊效果；
::Pseudo-elements   伪元素：DOM按匹配规则伪造出的元素；
http://markyun.github.io/2016/Pseudo-class-Pseudo-Element/



<!-- ["1", "2", "3"].map(parseInt) 答案是多少？

 parseInt() 函数能解析一个字符串，并返回一个整数，需要两个参数 (val, radix)，
 其中 radix 表示要解析的数字的基数。【该值介于 2 ~ 36 之间，并且字符串中的数字不能大于radix才能正确返回数字结果值】;
 但此处 map 传了 3 个 (element, index, array),我们重写parseInt函数测试一下是否符合上面的规则。

 function parseInt(str, radix) {
     return str+'-'+radix;
 };
 var a=["1", "2", "3"];
 a.map(parseInt);  // ["1-0", "2-1", "3-2"] 不能大于radix

 因为二进制里面，没有数字3,导致出现超范围的radix赋值和不合法的进制解析，才会返回NaN
 所以["1", "2", "3"].map(parseInt)   答案也就是：[1, NaN, NaN]

 详细解析：http://blog.csdn.net/justjavac/article/details/19473199 -->



set
不存储value。由于key不能重复
map
1 var names = ['Michael', 'Bob', 'Tracy'];
2 var scores = [95, 75, 85]; 
查名字，查位置，查成绩，
Map： 
1 var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
2 m.get('Michael'); // 95 

Array from a Set

var s = new Set(['foo', window]); 
Array.from(s); 
// ["foo", window]

Array from a Map

var m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]



 11. Q :  js面向对象继承的实现？
  A :  1.拷贝继承(for in的形式来拷贝方法)
    2.类式继承  
      3.原型继承

14. Q :  绑定事件与普通事件有什么区别？
  A :  1.绑定事件是不会互相覆盖的(同一个元素加同样的事件)  
  2.支持捕获的行为。
  3.标准的事件操作，对于一些新的CSS3和移动端事件支持的更好。
  ```
  var ys1 = ‘某个元素监听（绑定）’,ys2 = ‘另一个元素(普通事件)’;
ys1.addEventListener('click',function () {
    alert(1);
});
ys1.addEventListener('click',function () {
    alert(2)
});
//会弹出1，2；
ys2.onclick = function(){
    alert(1);
}
ys2.onclick = function(){
    alert(2);
}
//只会弹出2.


各浏览器的内核的差异。
浏览器运行原理。

前端兼容性总结：
1.各浏览器解析的差异。比如c。
2.浏览器自身的bug。比如ie6。
3.html5,css3新标签和新属性的兼容。

解决方法：
1.针对各浏览器的差异，reset css，比如*{margin:0;padding:0}。
2.针对浏览器自身bug,hack,比如*，/。
3.针对html5,css3新标签和新属性的兼容。
IE9以上，Chrome，Firefox， Safari，Opera大部分支持，IE9以下兼容： 
html5shiv：解决ie9以下浏览器对html5新增标签的不识别，并导致CSS不起作用的问题。
respond.min:让不支持css3 Media Query的浏览器包括IE6-IE8等其他浏览器支持查询。
<!--[if lt IE 9]>
　　<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.js"></script>
 　　<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<![endif]―>
--------------------------------------------------------------------------
页面架构和布局：
页面架构，页面的结构。
页面布局，页面的样式。



``` bash
 href
herf=""//会跳到页首
herf="javascript:void(0)"//伪协议，浏览器兼容问题（在IE中可能会引起一些问题，比如：造成gif动画停止播放等）
herf=""//最安全的办法还是使用“”，为防止点击链接后跳转到页首，onclick事件return false即可
void 是 JavaScript 中非常重要的关键字，该操作符指定要计算一个表达式但是不返回值。
```

线程与进程（https://www.zhihu.com/question/25532384）


进程：操作系统分配的占有CPU资源的最小单位。拥有独立的地址空间。
线程：安排CPU执行的最小单位。同一个进程下的所有线程，共享进程的地址空间。

进程就是一个应用程序在处理机上的一次执行过程，它是一个动态的概念，而线程是进程中的一部分，进程包含多个线程在运行。


JavaScript 既是单线程又是异步的，请问这二者是否冲突，以及有什么区别？

JS的单线程是指一个浏览器进程中只有一个JS的执行线程，同一时刻内只会有一段代码在执行（你可以使用IE的标签式浏览试试看效果，这时打开的多个页面使用的都是同一个JS执行线程，如果其中一个页面在执行一个运算量较大的function时，其他窗口的JS就会停止工作）。而异步机制是浏览器的两个或以上常驻线程共同完成的，例如异步请求是由两个常驻线程：JS执行线程和事件触发线程共同完成的，JS的执行线程发起异步请求（这时浏览器会开一条新的HTTP请求线程来执行请求，这时JS的任务已完成，继续执行线程队列中剩下的其他任务），然后在未来的某一时刻事件触发线程监视到之前的发起的HTTP请求已完成，它就会把完成事件插入到JS执行队列的尾部等待JS处理。又例如定时触发（settimeout和setinterval）是由浏览器的定时器线程执行的定时计数，然后在定时时间把定时处理函数的执行请求插入到JS执行队列的尾端（所以用这两个函数的时候，实际的执行时间是大于或等于指定时间的，不保证能准确定时的）。

作者：知乎用户
链接：https://www.zhihu.com/question/20866267/answer/17057615
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。