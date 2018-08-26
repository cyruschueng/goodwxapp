# papa-mall
## 啪啪运动资源商城小程序--最好的体育资源共享平台

* signup
* index
* sourceList
* sourceDetail（富文本工具wxParse）
* coperation

### 使用的组件库：  [MinUI](https://meili.github.io/min/docs/install/index.html)


#### 小程序使用不爽的点
1. wxss背景图不能设置本地图片，必须使用网络图的url或者base64
2. 事件绑定不能直接传参，而是需要在元素上使用data-*绑定，方法里用e.currentTarget.dataset来获取
3. 方法函数和钩子函数是并列的，vue是写在methods里面
4. 数据变化更新view层需要使用setData来触发，有些地方会频繁触发，影响性能
5. post传递参数要想正确的让后台获取到，header需要设置为'application/x-www-form-urlencoded'（将数据转换成 query string）
6. 不支持富文本解析，原因在于就那几个标签，富文本的标签会不识别，需要用wxParse来解析，vue直接用v-html就可以