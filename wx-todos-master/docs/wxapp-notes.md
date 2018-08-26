# 微信小程序开发注意事项

## 框架

### 框架 —— 组件

#### 组件样式

1. 组件和引用组件的页面不能使用*id选择器*、*attr选择器*、和*tag选择器*，请改用**class选择器**
1. 组件和引用组件的页面中使用*后代选择器（`.a .b`）*在一些极端情况下会有非预期的表现，如遇到，请避免使用。
1. *子元素选择器（`.a>.b`）*只能用于`view`组件与其子节点之间，用于其他组件可能导致非预期的情况。
1. 继承样式，如`font`、`color`，会从组件外继承到组件内。
1. 除继承样式外，`app.wxss`中的样式、组件所在页面的样式对自定义组件无效。
1. 组件可以指定它所在节点的默认样式，使用`:host`选择器。

参考：[组件模板和样式](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/wxml-wxss.html)

#### 组件构造器

*注：*在`properties`定义段中，属性名采用驼峰写法；在`wxml`中，指定属性值时则对应使用连字符写法，应用于数据绑定时采用驼峰写法（`attr={{propertyName}}`）。

Tips:

1. `Component`构造器构造的组件也可以作为页面使用。
1. 使用`this.data`可以获取内部数据和属性值，但不要直接修改它们，应使用`setData`修改。
1. 生命周期函数无法在组件方法中通过`this`访问到。
1. 属性名应避免以`data`开头，即不要命名为`dataXyz`这样的形式，因为在WXML中，`data-xyz=""`是作为节点`dataset`来处理，而不是组件属性。
1. 在一个组件的定义和使用时，组件的属性名和`data`字段互相都不能冲突（尽管它们位于不同的定义段中）。

参考：[Component构造器](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/component.html)

#### behaviors


字段的覆盖和组合规则。Tips:

1. 如果有同名的属性或方法，组件本身的属性或方法会覆盖`behavior`中的属性或方法，如果引用了多个`behavior`，在定义段中考后`behavior`中的属性或者方法会覆盖靠前的属性或者方法。
1. 如果有同名的数据字段，如果数据时对象类型，会进行`对象的合并`，如果是非对象类型则会进行`相互覆盖`。
1. 生命周期函数*不会相互覆盖*，而是在对应触发时机被**逐个调用**。*如果同一个`behavior`被一个组件多次引用*，它定义的声明周期函数**只会被执行一次**。

参考：[behaviors](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/behaviors.html)

#### 组件间关系

*注：*必须在两个组件定义中都加入relations定义，否则不会生效。

参考：[组件间关系](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/relations.html)

### 分包加载

目前小程序分包大小有以下限制：

- 整个小程序所有分包大小不能超过`4MB`
- 单个分包/主包大小不能超过`2MB`

打包原则

- 声明`subPackages`后，将按`subPackages`配置路径进行打包，`subPackages`配置路径外的目录将被打包到app（主包）中。
- `app（主包）`也可以有自己的pages（即最外层的`pages`字段）。
- `subPackages`的根目录不能是另外一个`subPackages`的子目录。
- 首页的TAB页面必须在`app（主包）`内。

引用原因

- `packageA`无法require`packageB`JS文件，但可以require `app`、自己package内的JS文件。
- `packageA`无法import `packageB`的template，但可以require`app`、自己的`package`内的template。
- `packageA`无法使用`packageB`的资源，但可以使用`app`、自己的`package`内的资源。

### 组件

[组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)

#### view

Tips：如果需要使用滚动视图，请使用`scroll-view`

#### scroll-view

Tips：

- 请勿在`scroll-view`中使用`textarea`、`map`、`canvas`、`video`组件。
- `scroll-into-view`的优先级高于`scroll-top`
- 在滚动`scroll-view`时会阻止页面回弹，所以在`scroll-view`中滚动，是无法触发`onPullDownRefresh`
- 若要使用下拉刷新，请使用页面的滚动，而不是`scroll-view`，这样也能通过点击顶部状态栏回到页面顶部

#### swiper、swiper-item

Tips：

- 如果在`bindchange`的事件回调函数中使用`setData`改变`current`值，则有可能导致`setData`被不停地调用，因而通常情况下请不要这样使用

#### movable-area、movable-view

*注：*`movable-area`必须设置width和height属性，不设置默认为10px

*注：*`movable-view`必须在`movable-area`中，且必须是直接子节点，否则不能移动

#### cover-view、cover-image

Tips：

- 基础库1.6.0起支持`css transition`动画，`transition-property`只支持`transform (translateX, translateY)`与`opacity`。
- 基础库1.6.0起支持`css opacity`。
- 只可嵌套在原生组件`map`、`video`、`canvas`、`camera`内，避免嵌套在其他组件内。
- 事件模型遵循冒泡模型，但不会冒泡到原生组件。
- 文本建议都套上`cover-view`标签，避免排版错误。
- 只支持基本的定位、布局、文本样式。不支持设置单边的`border`、`background-image`、`shadow`、`overflow`等。
- 建议子节点不要溢出父节点。

#### text

Tips：

- decode可以解析的有 `&nbsp;`、`&lt;`、`&gt;`、`&amp;`、`&apos;`、`&ensp;`、`&emsp;`。
- 各个操作系统的空格标准并不一致。
- `<text/>`组件内只支持`<text/>`嵌套。
- 除了文本节点以外的其他节点都无法长按选中。

#### input

Tips：

- **BUG：**微信版本6.3.30, `focus`属性设置无效。
- **BUG：**微信版本6.3.30, `placeholder`在聚焦时出现重影问题。
- `input`组件是一个`native`组件，字体是系统字体，所以无法设置`font-family`。
- 在`input`聚焦期间，避免使用css动画

#### picker-view、picker-view-column

Tips：

- 滚动时在iOS自带振动反馈，可在`系统设置 -> 声音与触感 -> 系统触感反馈中关闭`

#### switch

Tips：

- `switch`类型切换时在iOS自带振动反馈，可在`系统设置 -> 声音与触感 -> 系统触感反馈中关闭`

#### textarea

Tips：

- **BUG：**微信版本6.3.30，`textarea`在列表渲染时，新增加的`textarea`在自动聚焦时的位置计算错误。
- `textarea`的`blur`事件会晚于页面上的`tap`事件，如果需要在`button`的点击事件获取`textarea`，可以使用`form`的`bindsubmit`。
- 不建议在多行文本上对用户的输入进行修改，所以`textarea`的`bindinput`处理函数并不会将返回值反映到 `textarea`上。
- `textarea`组件是由客户端创建的原生组件，它的层级是最高的，不能通过`z-index`控制层级。
- 请勿在`scroll-view`、`swiper`、`picker-view`、`movable-view`中使用`textarea`组件。

#### map

Tips：

- `map`组件是由客户端创建的原生组件，它的层级是最高的，不能通过`z-index`控制层级。
- 请勿在`scroll-view`、`swiper`、`picker-view`、`movable-view`中使用`map`组件。
- css动画对`map`组件无效。
- `map`组件使用的经纬度是火星坐标系，调用`wx.getLocation`接口需要指定`type`为`gcj02`

#### canvas

注：

1. canvas 标签默认宽度300px、高度225px。
1. 同一页面中的 canvas-id 不可重复，如果使用一个已经出现过的 canvas-id，该 canvas 标签对应的画布将被隐藏并不再正常工作

Tips：

- `canvas`组件是由客户端创建的原生组件，它的层级是最高的，不能通过`z-index`控制层级。
- 请勿在`scroll-view`、`swiper`、`picker-view`、`movable-view`中使用`canvas`组件。
- css动画对`canvas`组件无效。
- **BUG：**避免设置过大的宽高，在安卓下会有crash的问题。

#### web-view

Tip：

- 网页内iframe的域名也需要配置到域名白名单。
- 开发者工具上，可以在`<web-view/>`组件上通过右键 - 调试，打开`<web-view/>`组件的调试。
- 每个页面只能有一个`<web-view/>`，`<web-view/>`会自动铺满整个页面，并覆盖其他组件。
- `<web-view/>`网页与小程序之间不支持除JSSDK提供的接口之外的通信。
- 在iOS中，若存在JSSDK接口调用无响应的情况，可在`<web-view/>`的src后面加个#wechat_redirect解决。
