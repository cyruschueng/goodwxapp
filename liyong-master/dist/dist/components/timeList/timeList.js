Component({
  properties: {
    index: {
      type: Number,
      value:0
    },
    // 商品图片
    merchandiseImg: {
      type: String,
      value: ''
    },
    // 商品标题
    merchandiseTitle: {
      type: String,
      value: ''
    },
    // 购买人数量
    buyerNum: {
      type: String,
      value: ''
    },
    // 人员列表
    avatarsList: {
      type: Array,
      value:[],
    }
  }
})
