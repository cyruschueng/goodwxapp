## 手把手实现一个类似敲木鱼的小程序

### 目录

- 前言
- 本章主旨
- 需求分析
- 架构、详细设计与构建
- 后记
- 参考资源

### 前言

如果你是小程序的发烧友，笔者有理由相信你应该听说过「群 Play」这款充满鬼畜色彩以及让人欲罢不能的“神器”，这款小程序的最大亮点在于紧紧抓住当下大部分人群的一种普遍心理状态——经历复杂的人际关系活动和工作压力过后，在闲暇之余，不少人往往会倾向于让自己处于一种放空的状态，于是无聊且重复的生宝宝活动恰巧抓住这部分人的“痛点”，在加上小程序极具互动性质的“群分享”功能，最终让「群 Play」这款小程序“腾空出世”。

![群 Play 小程序码](https://media.ifanrusercontent.com/media/user_files/trochili/d3/88/d388493b5847914d8a4d8597e7723165f768be7c-ac4131e1405d8bd8c7419bc2048734d26305c09c.jpg)

当然，如果还有人尚未体验过这款小程序的，可以打开微信扫码上面的小程序码体验一番。

### 本章主旨

本章将会手把手教大家实现一款类似生宝宝的小程序，通过这款小程序，你将会学到：

- 如何使用小程序的群分享功能
- 如何实现生宝宝的核心玩法
- 如何实现在全球群、本群的排名
- 如何去封装知晓云（一款后端服务产品）的 IO 接口

本章的案例小程序的后端服务将会采用知晓云这款后端服务产品，由于是个示例 DEMO，所以无法将「群 Play」的所有功能一一展示，只能挑选核心功能。并且在 UI 上，笔者也只能根据所搜集到的资源去自行设计，但玩法和功能大致和原小程序一致。

此外，案例小程序涉及到的资源和参考资料也会在本文最后给出，笔者在此声明所用资料仅供学习之用。

### 需求分析

本案例的小程序名叫做 “The Creation”，意味“创世”，其实就是通过用户点击海马妈妈，海马妈妈可以进行不断的产下海马宝宝的卵（貌似有点无厘头），然后计算产卵数的这么一个流程。

下面将具体阐述一下这款小程序实现的需求。

#### 1.核心玩法

类似群 Play，特定的群组下，边助推海马妈妈产卵，边放神曲，并记录产卵数。

##### 2.群排名

用户可以查看本群下各个用户的帮助海马妈妈产卵数的个人排名，以及全球的群排名。

##### 3.小程序的群分享功能

首先某个用户将该款小程序分享到群中，另一个用户通过分享在群中的小程序进入，此时小程序将解密获得用户进入小程序时的群组信息，从而进行后续的业务功能实现。

### 架构与详细设计

前端页面（小程序）+ 后端接口（知晓云）

- 页面架构

1. 个人中心页

个人中心页由 3 个部件组成，游戏分享页的入口、个人的数据、全球排行榜入口以及用户参与的群列表。

![首页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYUAukgpBBGiURu.gif)

2. 游戏分享页

游戏分享页主要由当天的产卵总数第 1 的群以及产卵总数第 1 的个人的榜单，以及分享小程序到群的功能按钮组成。

![游戏分享页](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYDJCAPllJmqznh.gif)

3. 全球排行榜页

显示全球群的排行，包括冠军群和最佳群成员的榜单以及产卵数由高至低排列的群列表信息。

![全球排行榜页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYUB8fMHehOZDBl.gif)

4. 用户群详情页

显示用户在当前群中各个成员的排名，以及统计当日完该款游戏的人数和群所有成员的产卵数。

此外，还提供游戏开始和群分享的控件。

![用户群详情页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYUAuoGxlRfHgeP.gif)

5. 游戏页

用户在特定的群，边帮助海马妈妈产下海马宝宝，边放神曲，并实时记录产卵数。

![游戏页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYDJCGdtdZnvwjy.gif)

- 详细设计与构建

下面结合上节的页面架构，详细描述各个页面的具体实现。

整个项目的目录结构如下：

```
.
├── README.md
├── app.js
├── app.json
├── app.wxss
├── config
│   └── constants.js // 用于存放项目所需的常量，例如各个页面的路径
├── io // 封装知晓云接口
│   ├── Group.js
│   ├── Play.js
│   └── User.js
├── lib // 知晓云 SDK
│   └── sdk-v1.1.3.js
├── pages // 各个页面文件夹
│   ├── game
│   ├── group
│   ├── index
│   ├── rank
│   └── share
├── project.config.json
├── static // 静态资源文件夹
│   ├── css
│   └── img
└── utils
    └── index.js // 通用库
```

1. 个人中心页

个人中心页涉及到个人用户的数据，因此我们首先需要在知晓云的数据模块创建一张数据表并命名为“users_fish”。

数据表结构如下：

字段名 | 字段类型 | 示例
--- | --- | ---
name | string | TY
avatar_url | string | https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLO3zERLSSZSqh0cxUMvJpRUziannNS40ic9HtZJR6LlKlTEccEbA1xb2pxf93aJHg4C45hSCfel3Zg/0
uid | string | 34694051
groups_id | array | ['1', '2']
groups_info | array | [{"name":"未命名群组1","gid":"1","headName":"未"},{"name":"未命名群组2","gid":"2","headName":"未"}] // 笔者会在后文解释为什么要将用户参与的群组保存为 JSON 格式的数组

![users_fish 数据表](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYMaoJmMTraOmnP.png)

个人中心页的基本逻辑是：

1.1 当用户进入首页时，先判断用户是否为新用户，如果是则调用封装好的 **UserIO.addUser** 将用户数据同步到知晓云开发者平台，否则的话将用户数据进行同步到页面。

```
// 首页：pages/index/index.js
const
  app = getApp(),
  UserIO = require('../../io/User')

Page({
  onShow() {
    this.getUserInfo()
  },

  getUserInfo() {
    // 首次进入页面先判断用户是否为新用户
    let userInfo = wx.BaaS.storage.get('userinfo') // 知晓云提供的本地存储接口，可以通过 userinfo 字段获取微信用户相关信息
    
    UserIO.getUser({uid: userInfo.id})
      .then(res => {
        if (!res.data.objects.length) {
          UserIO.addUser()
          this.setData({
            user: {
              name: userInfo.nickName,
              uid: userInfo.id,
              avatar_url: userInfo.avatarUrl,
              groups_id: null,
              groups_info: null,
            }
          })
        } else {
          let data = res.data.objects[0]
          let user = Object.assign(data, {
            groups_info: data.groups_info.map
            (item => {return JSON.parse(item)}), // groups_info 是一个由 JSON 字符串组成的数据，所以要对传回来的数据进行预处理
          })
          this.setData({user: data})
        }
      })
      .catch(res => {})
  }
})
```

```
// io 文件夹：io/User.js
const
  constants = require('../config/constants')

// 添加用户信息在知晓云的 users_fish 表
const addUser = () => {
  let
    tableID = constants.TABLE_ID.USER, // 知晓云数据表 ID，从知晓云开发者平台获取
    User = new wx.BaaS.TableObject(tableID),
    user = User.create(),
    userInfo = wx.BaaS.storage.get('userinfo')

    userInfo = {
      name: userInfo.nickName,
      avatar_url: userInfo.avatarUrl,
      uid: userInfo.id,
      groups: null,
    }

    return user.set(userInfo).save()
}

// 获取特定用户信息接口
const getUser = (opt) => {
  let
    tableID = constants.TABLE_ID.USER,
    uid = opt.uid,
    User = new wx.BaaS.TableObject(tableID),
    query = new wx.BaaS.Query()
  
  query.compare('uid', '=', uid)
  
  return User.setQuery(query).find()
}

module.exports = {
  addUser,
  getUser,
}
```

有关于更多数据模块的操作接口，详见知晓云 [SDK 文档](https://doc.minapp.com/schema/)

至此，我们可以获取页面所需的用户头像、用户名以及用户所参与的群数据。

1.2 计算总生宝宝数

而总生宝宝数的数据可以通过设置用户 ID 和当日的时间区间的查询条件获取用户当天在获取群组中的生宝宝数。

值得注意的是，由于群 Play 这款小程序的数据统计以当天为基准的，而知晓云目前还不支持“定时任务”功能，因此我们可以创建一个名为 **play_fish** 的表用于存放不同用户在不同群组中当日的生宝宝数，当发现用户上传的数据不属于当天的数据则创建一条新纪录。

**play_fish** 的数据表结构如下：

字段名 | 字段类型 | 示例
--- | --- | ---
uid | string | 34694051
user | string | {"_id":"5a4cfacf08443e4037579710","avatar_url":"","groups_id":["1","2"],"groups_info":[{"name":"未命名群组1","gid":"1","headName":"未"},{"name":"未命名群组2","gid":"2","headName":"未"}],"id":"5a4cfacf08443e4037579710","name":"TY","uid":"34694051", "created_at":1514994360}
counts | number | 465
gid | string | 1

通过封装在 PlayIO 模块的 getPlayerData 接口我们可以获取相关查询条件的用户游戏数据。

```
// io 文件夹：io/Play.js
const
  constants = require('../config/constants'),
  utils = require('../utils/index')

// 获取用户游戏数据
const getPlayerData = (opt) => {
  let
    tableID = constants.TABLE_ID.PLAY,
    Play = new wx.BaaS.TableObject(tableID),
    uid = opt.uid || '',
    gid = opt.gid || '',
    orderBy = opt.orderBy || '',
    limit = opt.limit || 1000,
    zeroTimestamp = utils.getTodayTimestampFromZero(), // 获取当天零点的 unix 格式的时间戳
    eveTimeStamp = zeroTimestamp + 24 * 60 * 60,
    query1 = new wx.BaaS.Query(),
    query2 = new wx.BaaS.Query(),
    query3 = new wx.BaaS.Query()

  let andQuery

  // 查询条件，获取当日的数据
  query1.compare('created_at', '>=', zeroTimestamp)
  query2.compare('created_at', '<=', eveTimeStamp)

  if (uid && !gid) {
    /**
     * 获取用户当天在所有群组中的生宝宝数数据
     */
    query3.compare('uid', '=', uid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3)
  } else if (gid && uid) {
    /**
     * 获取用户当天在特定群组中的生宝宝数据
     */
    query3.compare('uid', '=', uid)
    let query4 = new wx.BaaS.Query().compare('gid', '=', gid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3, query4)
  } else if (gid && !uid) {
    /**
     * 获取当日特定群组的所有用户
     */
    query3.compare('gid', '=', gid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3)
  } else {
    /**
     * 获取当日所有的用户
     */
    andQuery = wx.BaaS.Query.and(query1, query2)
  }
  
  return Play.setQuery(andQuery).orderBy(orderBy).limit(limit).find()
}

module.exports = {
  getPlayerData,
}
```

```
// uilts 文件夹：utils/index.js

// 获取当天零点的 unix 格式的时间戳
const getTodayTimestampFromZero = () => {
  let d = new Date()
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
  let unixTimeStamp = Math.floor(d.getTime() / 1000)
  return unixTimeStamp
}
module.exports = {
  getTodayTimestampFromZero,
}
```

下面是在首页中调用 PlayIO.getPlayerData 的业务逻辑：

```
// 首页：pages/index/index.js
const
  app = getApp(),
  UserIO = require('../../io/User')

Page({
  onShow() {
    this.getUserInfo()
  },

  getUserInfo() {
    // 首次进入页面先判断用户是否为新用户
    let userInfo = wx.BaaS.storage.get('userinfo') // 知晓云提供的本地存储接口，可以通过 userinfo 字段获取微信用户相关信息
    
    UserIO.getUser({uid: userInfo.id})
      .then(res => {
        if (!res.data.objects.length) {
          // 用户未创建时的处理 ...
        } else {
          // 用户创建后的处理 ...

          // 获取用户当天在所有群组的生宝宝数的数据
          PlayIO.getPlayerData({
            uid: userInfo.id,
          })
          .then(res => {
            let totalPlayData = res.data.objects
            let totalCounts = 0
            totalPlayData.forEach(item => {
              totalCounts += item.counts
            })

            this.setData({
              totalCounts,
            })
          })
        }
      })
      .catch(res => {})
  }
})
```
![play_fish 数据表](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYNf0QODcPYpBoo.png)

1.3 参与的群的全列表数据绑定

在“参与的群”的列表，我们需要将用户参与的群的 gid 绑定到 DOM 的 data 属性上，以便在用户点击某个群项目时，可以通过路由进行传参。

```
// 首页：pages/index/index.wxml
<view class="index">
  <view class="groups-list">
    <view class="title">参与的群</view>
    <scroll-view scroll-y lower-threshold="50">
      <view class="rank-item"
        wx:for="{{user.groups_info}}"
        data-gid="{{item.gid}}"
        wx:key="{{item.gid}}"
        bindtap="goToGroup"
      >
        <image src="{{item.url}}" wx:if="{{item.url}}"></image>
        <view class="head-name" wx:else>{{item.headName}}</view>
        <text class="name">{{item.name}}</text>
        <text class="arrow">></text>
    </view>
    </scroll-view>
  </view>
</view>
```

```
// 首页：pages/index/index.js

Page({
  goToGroup(e) {
    let {user} = this.data
    let gid = e.target.dataset.gid
    let url = constants.ROUTES.GROUP + '?gid=' + gid + '&user=' + JSON.stringify(user)
    wx.navigateTo({url})
  }
})
```

至此，我们完成了首页的开发工作，首页示意图如下：

![首页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYUAukgpBBGiURu.gif)

2. 游戏分享页

游戏分享页主要涉及冠军群和最佳群成员的数据获取，以及群分享功能的实现。

2.1 冠军群和最佳群成员的数据获取

和用户游戏数据一样，我们需要创建一张新的名为 **groups_fish** 的数据表用于存放每天产生的用户所在群的生宝宝数。

**groups_fish** 数据表结构如下：

字段名 | 字段类型 | 示例
--- | --- | ---
gid | string | 1
name | string | 未命名群组 1	
counts | integer | 760

![groups_fish 数据表](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYONUfCPulvPMKj.png)

冠军群可以通过以降序方式拉取 groups_fish 中当天的群组数据，并取出数组下标为 0 的那一条记录。

```
// 游戏分享页：pages/share/share.js
const
  app = getApp(),
  GroupIO = require('../../io/Group')

Page({
  data: {
    topGroup: null,
  },
  onLoad(opts) {
    // 获取当日全球的生下鱼宝宝个数最多的群组
    GroupIO.getGroups({gid: ''})
      .then(res => {
          if (!res.data.objects.length) {
          let topGroup = res.data.objects[0]
          topGroup = Object.assign(topGroup, {
            headName: topGroup.name.slice(0,1).toUpperCase()
          })
          this.setData({
            topGroup,
          })
        }
      })
  }
})
```

```
// io 文件夹：io/Group.js

const
  constants = require('../config/constants'),
  utils = require('../utils/index')

// 获取当日的群组数据
const getGroups = opt => {
  let
    tableID = constants.TABLE_ID.GROUP,
    Group = new wx.BaaS.TableObject(tableID),
    zeroTimestamp = utils.getTodayTimestampFromZero(),
    eveTimeStamp = zeroTimestamp + 24 * 60 * 60,
    query1 = new wx.BaaS.Query(),
    query2 = new wx.BaaS.Query(),
    query3 = new wx.BaaS.Query(),
    query4 = new wx.BaaS.Query(),
    gid = opt.gid || ''

  query1.compare('created_at', '>=', zeroTimestamp)
  query2.compare('created_at', '<=', eveTimeStamp)
  query3.compare('counts', '>', 0)

  let andQuery

  if (gid) {
    /**
     * 获取特定群组当日的数据
     */
    query4.compare('gid', '=', gid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3, query4)
  } else {
    andQuery = wx.BaaS.Query.and(query1, query2, query3)
  }

  return Group.setQuery(andQuery).orderBy('-counts').find()
}

module.exports = {
  getGroups，
}
```

同理，我们可以从 **play_fish** 表中以降序方式获取当日所有用户的数据，并取出数组下标为 0 的数据。

```
// 游戏分享页：pages/share/share.js
const
  app = getApp(),
  PlayIO = require('../../io/Play')

Page({
  data: {
    topGroup: null,
  },
  onLoad(opts) {
    // 获取当日全球的生下鱼宝宝个数最多的群组 ...

    // 获取当日所有用户中生下鱼宝宝最多的用户
    PlayIO.getPlayerData({
      orderBy: '-counts',
    })
    .then(res => {
      let topUser = res.data.objects[0]
      topUser = Object.assign(topUser, {
        headName: JSON.parse(topUser.user).name.slice(0,1).toUpperCase(),
        user: JSON.parse(topUser.user)
      })
      this.setData({
        topUser,
      })
    })
  }
})
```

PlayIO.getPlayerData 的代码详见上节或是参考[源码](git@github.com:TerenYeung/fish.git)。


2.2 群分享功能

下面来具体讨论一下小程序的群分享功能。

首先，我们需要实现的是**如何将小程序分享到群组中**。

小程序配合 open-type 为 **share** 的 **button** 组件，提供 onShareAppMessage 接口，让我们可以将小程序分享到群组中。

同时，在 wx.showShareMenu 接口中，设定 withShareTicket: true，即可在用户分享时，获取到 shareTickets。

```
// 群分享页：pages/share/share.js
const
  app = getApp(),
  constants = require('../../config/constants')

Page({
  onLoad(opts) {
    wx.showShareMenu({
      withShareTicket: true // 要求小程序返回分享目标信息
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'The Creation',
      path: constants.ROUTES.INDEX,
      success(res){
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})
```

```
// 群分享页：pages/share/share.wxml
<view class="share">
  <button class="share-btn" open-type="share">召唤群友，组队参赛</button>
</view>
```

![群分享页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYQVfaVNhLJOKdU.gif)


接下来，就是如果获取用户是从哪个群组进入小程序的群 id 。

用户进入小程序时，可以在 App 对象的 onLanuch 生命周期函数中获取进入小程序的情景值。

当情景值为 1044，即通过带 shareTicket 的微信群分享卡片进入小程序，小程序就可以额外获取到 shareTicket。

```
App({
  onLaunch: function(ops) {
    // 判断用户从哪种场景值进入页面的
    if(ops.scene == 1044){
      let shareTicket = ops.shareTicket
      // 调用 wx.getShareInfo 获取目标群组加密过的 id
      wx.getShareInfo({
        shareTicket,
          complete(res){
            // 调用知晓云的微信解密接口，将加密过的群组 id 进行解密
            wx.BaaS.wxDecryptData(res.encryptedData, res.iv, 'open-gid')
              .then(decrytedData => {
                console.log('decrytedData', decrytedData)
              this.globalData.gid = decrytedData.openGid
            })
          }
      })
    }
  },

  globalData: {
    systemInfo: {},
    gid: '',
  }
})

```

![获取群 ID 调试方法](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYR49NURcBZkmZT.png)

之前，知晓程序写过一篇文章[《如何在小程序中，获取微信群 ID？》](http://www.ifanr.com/minapp/832760)详细介绍群分享的功能，如果同学还有疑问的话，具体可以参考本文。

至此，我们知道如何将小程序分享到群组，并如何获取用户从哪个群组进入小程序的群分享相关功能。

3. 全球排行榜页

全球排行榜页面由当天全球排行榜榜单和生鱼宝宝数由高至低排列的群列表信息组成。

当天全球排行榜榜单已经在群分享页中已经提及，这里不再赘述。

获取当天全球排行榜榜单，只需要拉取 **groups_fish** 表中的当天所有群组的数据，数据按生宝宝数降序返回。

```
// 全球排行榜页：pages/rank/rank.js
const
  app = getApp(),
  GroupIO = require('../../io/Group')

Page({
  onShow() {
    this.getData()
  },

  getData() {

    // 获取当日全球的所有的群
    GroupIO.getGroups({ gid: '' })
      .then(res => {
        this.setData({
          groups: res.data.objects,
        })
      })
  }
})
```

```
// io 文件夹：io/Group.js
const
  constants = require('../config/constants'),
  utils = require('../utils/index')

const getGroups = opt => {
  let
    tableID = constants.TABLE_ID.GROUP,
    Group = new wx.BaaS.TableObject(tableID),
    zeroTimestamp = utils.getTodayTimestampFromZero(),
    eveTimeStamp = zeroTimestamp + 24 * 60 * 60,
    query1 = new wx.BaaS.Query(),
    query2 = new wx.BaaS.Query(),
    query3 = new wx.BaaS.Query(),
    query4 = new wx.BaaS.Query(),
    gid = opt.gid || ''

  query1.compare('created_at', '>=', zeroTimestamp)
  query2.compare('created_at', '<=', eveTimeStamp)
  query3.compare('counts', '>', 0)

  let andQuery

  if (gid) {
    /**
     * 获取当日特定群组的数据
     */
    query4.compare('gid', '=', gid)
    andQuery = wx.BaaS.Query.and(query1, query2, query3, query4)
  } else {
    /**
     * 获取当日所有群组的数据
     */
    andQuery = wx.BaaS.Query.and(query1, query2, query3)
  }

  return Group.setQuery(andQuery).orderBy('-counts').find()
}
```

![全球排行榜页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYRWwgdziJPYRjW.png)

4. 用户群详情页

用户群详情页需要显示用户进入的群的信息、群成员的信息。

前面，我们在 **play_fish** 数据表中记录了不同用户在不同群组中的当天的数据，因此，我们只需要将群 id 作为参数传入 PlayIO.getPlayerData 就可以获取用户所在群组的当日的所有用户数据。

```
// 用户群详情页：pages/group/group.js

const
  app = getApp(),
  UserIO = require('../../io/User'),
  PlayIO = require('../../io/Play'),
  GroupIO = require('../../io/Group'),
  constants = require('../../config/constants')

Page({
  data: {
    user: null,
    members: null,
    people: 0,
    totalCounts: 0,
    group: null
  },

  onLoad(opts) {
    // 从首页用户点击群列表中的某一项传入的 gid
    let {gid, user} = opts
    this.setData({
      gid,
      user: JSON.parse(user),
      groupName: JSON.parse(user).groups_info.find(item => item.gid === gid).name
    })
    this.getPlayerDataAndGroupData(gid)
  },

  onShow() {
    let {gid} = this.data
    this.getPlayerDataAndGroupData(gid)
  },

  getPlayerDataAndGroupData(gid) {
    // 获取用户所在群组的当日所有用户的数据
    PlayIO.getPlayerData({gid})
      .then(res => {
        let data = res.data.objects
        let totalCounts = 0
        data.forEach(item => {
          totalCounts += item.counts // 统计用户所在群组当日共生宝宝数
        })

        this.setData({
          // 对群成员信息做预处理
          members: data.map(item => {
            return Object.assign(item, {
              user: JSON.parse(item.user)
            })
          }),
          people: data.filter(item => item.counts !== 0).length, // 计算出用户所在群组当日玩游戏的人数
          totalCounts,

        })
      })
  },
})
```
值得注意的是，我们需要在页面的 onShow 声明周期中进行数据请求的处理，因为如果用户经常在游戏页和群详情页进行页面切换，生宝宝的数据会经常发生变化，而 onLoad 一般只会在页面加载时触发一次，往后就不会再触发。

![用户群详情页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYDJCQgcTLnTzcN.gif)

5. 游戏页

游戏页是我们这款案例小程序开发所要关注的重点页面，下面笔者将一步一步讲解如何实现这个页面的核心功能。

5.1 进入页面时的 uid 和 gid 的获取

用户在进入游戏页后，开发者首先要获知用户 id 和群 id，uid 和 gid 可以通过路由传参的形式获取。

5.2 游戏页的入口

目前，进入游戏页有 2 个入口，一为全球排行榜页，二位用户群详情页。

一般来说，全球榜单排行榜页的入口是针对新用户从别的用户分享到群中的小程序卡片的，此时由于用户之前从未玩过游戏，首页的群列表所以不存在数据，因此用户无法进入游戏页，唯一进入游戏页的入口就在全球排行榜页。

从全球排行榜页进入游戏页时，uid 可以调用 UserIO.getUser 获取，而 gid 可以通过挂载在 App 对象上的 globalData.gid 属性获取。


5.3 用户一进入页面时的数据渲染

由于游戏页是记录当天用户在特定群组下的游戏数据，如果用户在之间已经玩过并接着玩的话，我们就需要在页面的 onLoad 生命周期去获取用户的游戏数据。

```
// 游戏页：pages/game/game.js
const
  app = getApp(),
  PlayIO = require('../../io/Play')

Page({
  onLoad(opts) {
    this.setData({
      user: JSON.parse(opts.user)
    })

    let params = {
      uid: JSON.parse(opts.user).uid,
      gid: opts.gid || app.globalData.gid,
    }

    // 获取特定群组下特定用户的游戏数据
    PlayIO.getPlayerData(params)
      .then(res => {
        if (res.data.objects.length !== 0) {
          this.setData({
            player: res.data.objects[0],
            intialCounts: res.data.objects[0].counts,
            counts: res.data.objects[0].counts,
          })
        } else {
          this.setData({
            player: {
              gid: opts.gid,
              user: opts.user,
              uid: JSON.parse(opts.user).uid,
            }
          })
        }
      })
  }
})
```

5.4 当用户离开页面时进行数据持久化处理

笔者在这里将用户游戏的数据临时存储在页面的 data 属性中，在用户离开页面时在进行持久化处理，这样做的好处是不用每次用户点击海马妈妈生下海马宝宝后就发一次请求，从而导致资源浪费。

当然，由于知晓云目前尚未支持联表查询，导致我们在 3 个数据表中所存储的数据存在冗余问题，这样我们在进行数据同步时，也需要同步更新 3 个表的数据。

```
Page({
  onUnload() {
    let {player, intialCounts, counts, user} = this.data
    let opts = {
      uid: user.uid,
      gid: player.gid,
    }

    // 如果用户是从新的群组加入游戏，需要更新 user 表数据
    UserIO.updateUser({
      groupID: player.gid,
      recordID: user.id,
      groupInfo: {
        name: '未命名群组' + player.gid.slice(0, 4),
        gid: player.gid,
        headName: '未命名群组'.slice(0, 1).toUpperCase(),
      }
    })

    // 更新用户当日的数据
    PlayIO.getPlayerData(opts)
      .then(res => {
        // 如果用户当日尚未玩过游戏，则在 **play_fish** 表中创建一条新纪录
        if (res.data.objects.length === 0) {
          PlayIO.addPlayerData({
            user: user,
            gid: player.gid,
            counts,
            group: {
              name: '未命名群组' + player.gid.slice(0, 4),
              headName: '未命名群组'.slice(0, 1).toUpperCase(),
              gid: player.gid
            }
          })
        } else {
          let record = res.data.objects[0]
          // 如果用户已经玩过，则传递当天生宝宝数的增量
          PlayIO.updatePlayerData({
            recordID: record.id,
            counts: counts - intialCounts,
          })
        }
      })

    // 更新用户所在群的数据
    GroupIO.getGroups({
      gid: player.gid,
    }).then(res => {
      // 如果特定群组当日在 **groups_fish** 尚未存在记录，则创建一条新纪录
      if (res.data.objects.length === 0) {
        GroupIO.createGroup({
          name: '未命名群组' + player.gid.slice(0, 4),
          counts,
          gid: player.gid,
        })
      } else {
        // 如果特定群组当日记录存在，则传递当日的生宝宝树的增量
        let record = res.data.objects[0]
        GroupIO.updateGroup({
          counts: counts - intialCounts,
          recordID: record.id,
        })
      }
    })
  }
})
```

```
// io 文件夹：io/Play.js
const
  constants = require('../config/constants')

const updatePlayerData = (opt) => {
  let
    tableID = constants.TABLE_ID.PLAY,
    recordID = opt.recordID,
    Play = new wx.BaaS.TableObject(tableID),
    play = Play.getWithoutData(recordID),
    counts = opt.counts

  play.incrementBy('counts', counts) // 对 play_fish 表中记录的 counts 字段的原子操作，在原数量基础上增加 counts 值

  return play.update()
}

module.exports = {
  updatePlayerData,
}
```

```
// io 文件夹：io/Group
const
  constants = require('../config/constants')

const updateGroup = (opt) => {
  let
    tableID = constants.TABLE_ID.GROUP,
    recordID = opt.recordID,
    Group = new wx.BaaS.TableObject(tableID),
    group = Group.getWithoutData(recordID),
    query = new wx.BaaS.Query(),
    counts = opt.counts,
    name = opt.name

  group.incrementBy('counts', counts)
  group.set('name', name)
  return group.update()
}

module.exports = {
  updateGroup,
}
```

5.5 鬼畜音效和生宝宝动效的实现

在群 Play 小程序的游戏页中，按照一定的点击频率点击木鱼，会出现木鱼图片向上飞速由大到小移动，并一直播放鬼畜的音乐。

在本案例小程序中，由于笔者资源有限，所有采用折中的方式，通过点击海马妈妈生海马宝宝的形式去模仿原小程序的游戏玩法。

下面讲解一下具体的实现思路：

首先，我们需要在海马妈妈上绑定 **touchstart** 和 **touchend** 事件

```
<view class="game">
  <view class="game-main">
    <!-- 海马妈妈 -->
    <image
      src="{{seaHourseImg}}"
      class="sea-hourse"
      bind:touchstart="touchStart"
      bind:touchend="touchEnd"
    >
    <!-- 海马宝宝 -->
    <view class="dot {{dotMove}}"></view>
    </image>
  </view>
</view>
```

在点击海马妈妈的时候，海马妈妈将会产下海马宝宝的卵，这里我们可以通过动态设置 class 的方式去实现卵的移动。

```
// 游戏页：pages/game/game.js

Page({
  touchStart(e) {
    let _this = this
    this.setData({
      dotMove: 'dot-move'
    })
    setTimeout(() => {
      _this.setData({
        dotMove: '',
      }, 200)
    })
  }
})
```

```
// 游戏页：pages/game/game.wxss

.dot {
  width: 40rpx;
  height: 40rpx;
  background: orange;
  border-radius: 50%;
  position: absolute;
  visibility: hidden;
  bottom: 200rpx;
  left: 200rpx;
  transition: all .1s;
}

.dot.dot-move {
  visibility: visible;
  transform: translateX(500px);
}
```

上面通过在用户 touchStart 时添加类名，从而使得卵会向右迅速移动，再清楚类名后，卵会原路返回。
通过用户频繁点击导致 .dot 的动态切换，在用户的视觉差下看起来就像是在不断的产宝宝。

至于音乐播放部分，我们可以通过一个防抖函数去实现，如果用户点击频率在 400 ms 范围内，将不会触发 **touchEnd** 回调函数，因此音乐将一直播放，一旦点击频率超过 400 ms，则将音轨重置为 0 并停止播放。

```
// 游戏页：pages/game/game.js
const
  utils = require('../../utils/index')

Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  data: {
    musicIcon: '../../static/img/music.png',
    seaHourseImg: '../../static/img/sea-hourse.png',
    dotMove: '',
    intialCounts: 0,
    counts: 0,
    controls: false,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '浙江温州皮革厂',
    author: '无名氏',
    src: 'https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eXoX2VRQQbFuXzX.mp3',
    gid: 0,
    user: null,
    player: null,
  },

  touchStart(e) {
    let _this = this
    let {counts} = this.data
    this.audioCtx.play()
    this.setData({
      dotMove: 'dot-move',
      counts: ++counts,
    })
    setTimeout(() => {
      _this.setData({
        dotMove: ''
      })
    }, 200)
  },

  // debounce 函数可参考 underscore 的 _.debounce 去实现
  touchEnd: utils.debounce(function(){
    console.log('大于 400 ms 才显示')
    this.audioCtx.seek(0) 
    this.audioCtx.pause()
  }, 400),
})
```
![游戏页示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eYDJCGdtdZnvwjy.gif)

### 后记

笔者开发案例小程序下来，总体感觉是群 Play 这款小程序对于新手来说难度适中，在以知晓云作为后端服务的帮助下，虽然类似由缺乏联表查询导致的数据冗余、定时任务功能和云函数在笔者开发期间尚未上线导致开发者不必要的数据处理多了许多以及部分类似当天所有群组的生宝宝数的统计由于数据规模上去的将无法实现，但是知晓云确实提供了笔者很高的开发效率。

---

### 参考资源

[微信小程序开发者文档](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html)

[Fishes 图片资源](https://www.easyicon.net/language.en/iconsearch/fish/)

[海波动效](https://codepen.io/ljmerza/pen/hnLug)

[如何在小程序中，获取微信群 ID？](http://www.ifanr.com/minapp/832760)












