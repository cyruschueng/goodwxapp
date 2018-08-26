Component({
  properties: {
    // 好友标识
    isDisplaySign: {
      type: Number
    },
    // 用户头像
    userAvatar: {
      type: String,
      value: ''
    },
    // 用户昵称
    nickName: {
      type: String,
      value: ''
    },
    // 晒单内容
    body: {
      type: String,
      value: ''
    },
    // 晒单图片
    imgs: {
      type: Array,
      value: []
    },
    // 商品图标
    shareIcon: {
      type: String,
      value: ''
    },
    // 商品标题
    title: {
      type: String,
      value: ''
    },
    // 购买人数量
    buyersNum: {
      type:Number,
      value: 0
    },
    // 购买人头像
    buyersImg: {
      type: String,
      value:''
    }

  }
})
