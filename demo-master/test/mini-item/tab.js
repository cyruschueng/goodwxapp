
 jQuery(document).ready(function($) {
     $.tabs = function(opts) {
        //如果在构造实例的时候忘了new,就重新实例化
         if (! (this instanceof arguments.callee)) {
             return new arguments.callee(opts);
         }
         //执行类似其他语言的初始化函数，利用apply指定上下文(context)为该实例，并且传入参数
         this.init.apply(this, arguments);
     }
     $.tabs.prototype = {
         constructor: $.tabs,
         init: function(opts) {
             var self = this;
             //配置属性
             $.extend(this, {
                 event: 'click',//默认事件
                 timeout: 0,//延迟时间
                 auto: !1,//是否自动切换
                 interval: 500,//自动切换时间
                 selectedClass: "tabs-selected",//选项卡选中状态的类名
                 tabsSelector: ">dt a",//选项卡导航选择器
                 panelsSelector: ">dd",//选项卡内容选择器
                 selected: 0,//默认选中索引
                 callback: $.noop //回调函数
             },
             opts || {});
             this.wrap = $(this.selector); //整个选项卡选择器，必须指定
             this.tabs = this.wrap.find(this.tabsSelector);
             this.panels = this.wrap.find(this.panelsSelector);
             this.timer = null;
             this.select(this.selected);
             this.tabs.live(self.event,
             function() {
                 //获取索引
                 var index = self.tabs.index(this);
                 self.selected = index;
                 //上下文为当前实例
                 self.hander.call(self, index)
             });
             //是否自动切换
             if (this.auto) {
                 this.start();
                 this.tabs.die(self.event);
                 //如果移到选项卡上就停止自动切换
                 self.panels.hover(function() {
                     clearInterval(self.timer);
                     self.timer = null;
                 },
                 function() {
                     self.start();
                 });
             }
         },
         select: function(index) {
             index = ~~index; //~~是取整的作用www.2cto.com
             this.tabs.removeClass(this.selectedClass).eq(index).addClass(this.selectedClass); //切换选项卡导航当前类
             this.panels.hide().eq(index).show();//切换选项卡内容隐藏显示
             this.callback && this.callback.call(this, this.panels[index], this.tabs[index], index); //回调函数
         },
         hander: function(index) {
             var self = this;
             this.timeout ?
             setTimeout(function() {
                 self.select(index);
             },self.timeout) :
             (function() {
                 self.select(index);
             })()
         },
         start: function() {
             var self = this;
             if (!this.auto) return;
             this.timer = setInterval(function() {
                 self.autoRun.call(self)
             },
             this.interval);
         },
         //自动切换
93         autoRun: function() {
94             this.selected++;
95             if (this.selected >= this.tabs.length) this.selected = 0;
96             this.hander(this.selected);
97         }
98     }
99 })

