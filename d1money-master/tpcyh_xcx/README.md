 太平车友会【小程序开发】
---

* 项目基于：wepy框架
* 组件化开发 


### 项目结构

* __app.wpy：__          等同于app.js app.wxss app.json
* __components：__       存放组件
* __mixins：__           存放Mixin基类，用于复用不同组件中的相同功能
* __page：__             存放页面
* __.eslintrc.js：__     ESlint规范设置
* __package.json：__     包配置
* __wepy.config.js：__   wepy配置文件


### 组件结构

   * Button
   * Cell
   * Other
   * Other
   
   
### dm-panel组件 容器组件
   
   包括如下子组件：`dm-panel-hd` , `dm-panel-bd` ,  `dm-panel-ft`
   
### dm-cell组件

    图文组合：
        type：imgText
    
    文字组合：
        type：text       
        title_icon：标题图标
        desc_icon： 内容图标
        
### dm-scrollview 滚屏组件


### dm-tag 标签


### dm-card 名片组件



### Mixin 

Mixin基类，用于复用不同组件中的相同功能。

singleLoad : 适用于单页面 上拉加载数据。

loadMore : 适用于 多数据（多按钮） 加载更多。



