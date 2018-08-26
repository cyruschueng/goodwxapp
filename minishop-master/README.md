# 小橙应用小程序

> 开发注意事项

* 小程序模块项目引用会报堆栈溢出
* 所有的ajax请求都在apis目录下，需要request.js发送请求，在每个请求中都会有sid和appid参数，避免参数和自身业务冲突
* 需要用到storage时，在config文件下配置storage的key，统一管理，避免冲突

> css: BEM

简单规则定义：B-B__E-E_M-M

> js: Axe

js引入Axe框架，只是简单的代理小程序的App和Page函数，引入Event事件和Mixins，
完全不影响小程序自身的框架

WApp --> App

WPage --> Page

> 用法
* WApp()
* WPage()

> 静态方法
* Axe.mixin 全局混合

> 实例api
* on 绑定一个事件
* once 绑定一个一次事件
* off 卸载一个事件
* pause 暂停某个事件
* resume 恢复某个事件
* emit 触发事件
* data 属性代理小程序实例的
* setData 属性代理小程序实例的
* route 属性代理小程序实例的
* onInit 新增的生命周期钩子函数，在小程序实例初始化之前调用
* $bus 所有组件共享的事件对象
* $cxt 每个函数执行的上下文是Axe对象，可以通过$cxt获取小程序自己的执行的上下文

> mixins

全局混合Axe.mixin
主要混入一些全局变量，如store

局部mixins
WPage({
  mixins:[{}]
})
主要是解决模块化

> redux

* $store：每个页面添加$store属性
* mapState：每个页面添加mapState函数选项，用于将redux的属性绑定到当前页面的state上
* state：每个页面添加state属性
* onStateChange：state每次改变会调用，将最新的state返回，每次打开页面都会先调用一次

> bus

事件key的命名统一在config下，方便管理，一般的命名规则：pages + 页面名称 + 动作

以axe: 开头的事件是框架的内部事件，自定义事件不要以axe开头

可以在wx.$bus, Axe.$bus, 在Axe实例中this.$bus, 获取bus

其他插件的命名：
psa：psa埋点的 
