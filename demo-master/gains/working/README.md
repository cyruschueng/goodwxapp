
青芒fm
伊金霍洛旗
智慧嘉祥
移动采访app
公司官网
<<<<<<< HEAD

原型设计
=======
前台一网
前台一网子网
菱动地带
云维


功能清单
原型设计
ui效果
>>>>>>> 21535b91052afb53abae66c7d89c0008676ace1f
需求规格
接口文档
项目计划
相关资料


<<<<<<< HEAD
=======

模式：
后台
典型案例
解决方案
服务支持

前台
服务支持

青芒
登录注册

伊金霍洛旗


首页 具体内容（后期新增项目内容统计）
统计排序（已发都有统计排序，其他的只有排序）
统计：
临夏-客户-有app没有web
青芒-自己的-有app有web
官网--没有app有web

>>>>>>> 21535b91052afb53abae66c7d89c0008676ace1f
##资料：
```

1.需求规格说明书

2.原型

3.ui设计

4.我的工作内容：

个人中心:
（个人信息编辑、我的关注、我的收藏、我的下载、历史记录、） 
（我的预约、我的钱包、我的评论、意见反馈、设置）

注册登录: 
注册：手机号注册（需开通短信平台）
登录：手机号登录，第三方平台登录和手机快捷方式登录

效果：
上拉加载下拉刷新
毛玻璃其实就是磨砂玻璃，能够模糊的看清背后的风景，让人感觉有种朦胧美，让界面看上去有些层次感。

```

```
扎鲁特旗广播电视台
http://zlt.slradio.cn/index
青芒
1.后台+h5+ios+andriod
2.linux+mysql+php(lanavel)
3.后台管理metronic前端模板(bootstrap+jquery)
4.vue-cli
临夏(和青芒类似)

```


var createToken = function(routname) {
    return 'sl' + md5.hex(routname + this.gettime()) + 'mgfm'
}
var gettime = function() {
    let time = Date.parse(new Date())
    return (time = time / 1000)
}
var imgLogo = function(item) {
    return Vue.prototype.HOST + "/getImg?sid=" + item;
}