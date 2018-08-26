/**
 * API -- card 卡券
 * 
 * v1.1.0
 * 1. wx.addCard 批量添加卡券
 * 2. wx.openCard 查看微信卡包中的卡券
 * 3. 
 */

const cardExtJsonStr = {
  code: 'String',
  openid: 'String',
  timestamp: 'Number, required',
  nonce_str: 'String',
  fixed_begintimestamp: 'Number',
  outer_str: 'String',
  signature: 'String, required'
}

module.exports = {
  add(opts) {
    const _opts = {
      /**
       * { cardId: 'String', cardExt: 'Json String, ex: cardExtJsonStr -> json' }
       */
      cardList: 'ObjectArray, required',
      success(res) {
        const _res = {
          errMsg: 'addCard:ok',
          cardList: [{
            code: 'String',
            cardId: 'String',
            cardExt: 'String',
            isSuccess: 'Boolean'
          }]
        }
      },
      fail(res) {
        const _res = {
          errMsg: 'addCard:fail cancel, 或 addCard:fail(detail message)'
        }
      },
      complete() {}
    }

    if (!wx.addCard) {
      return false
    }

    wx.addCard(opts)
  },

  open(opts) {
    const _opts = {
      cardList: [{
        cardId: 'String',
        code: 'String'
      }],
      success() {},
      fail() {},
      complete() {}
    }

    if (!wx.openCard) {
      return false
    }

    wx.openCard(opts)
  }
}