import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import {
  fetchMerch, putMerchTypeSelect, fetchDefaultAddressByMerchId,
  putChooseAddress, putChooseCoupon, putChooseGiftCards, putUseCoin,
  postOrder, deleteMerchTypeDiscount
} from '../../../store/actions/group'
import {
  fetchCouponList, fetchGiftCardList, fetchCoin,
  fetchAddressTagList, fetchPCD
} from '../../../store/actions/mine'
import { COUPON } from '../../../constants'
import promisify from '../../../lib/promisify'
import { alert } from '../../../utils'

const store = getApp().store
const mapStateToData = (state, options) => {
  const { id } = options
  // const {
  //   loader, merchs, groupons,
  //   merchTypes, coupons, giftCards,
  //   coins, addresses
  // } = state
  const {
    loader, merchs, groupons,
    merchTypes, coupons,
    coins, addresses
  } = state
  return {
    isFetching: loader.isFetching,
    displayError: loader.displayError,

    groupon: groupons.map[groupons.idMap[id]] || null,

    group: state.global.group,
    merch: merchs.map[id] || null,
    merchTypes: (merchTypes.idsMap[id] || []).map(id => merchTypes.map[id]),
    couponList: coupons.idsMap.normal.map(id => coupons.map[id]),
    // giftCards: giftCards.idsMap.normal.map(id => giftCards.map[id]),
    coinAmount: coins.amount,

    addressList: addresses.ids.map(id => addresses.map[id]),
    addressTagMap: addresses.tagMap,

    buying: state.buying
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchMerch: ({ merchId, groupId }) => dispatch(fetchMerch({ merchId, groupId })),
  putMerchTypeSelect: ({ merchTypeId, num }) => dispatch(putMerchTypeSelect({ merchTypeId, num })),
  fetchCouponList: _ => dispatch(fetchCouponList({ isAll: true })),
  // fetchGiftCardList: _ => dispatch(fetchGiftCardList({ isExpired: false })),
  fetchCoin: _ => dispatch(fetchCoin()),
  fetchDefaultAddressByMerchId: id => dispatch(fetchDefaultAddressByMerchId(id)),
  fetchAddressTagList: _ => dispatch(fetchAddressTagList()),
  fetchPCD: _ => dispatch(fetchPCD()),

  putChooseAddress: id => dispatch(putChooseAddress(id)),
  putChooseCoupon: id => dispatch(putChooseCoupon(id)),
  putChooseGiftCards: ids => dispatch(putChooseGiftCards(ids)),
  putUseCoin: coin => dispatch(putUseCoin(coin)),
  postOrder: obj => dispatch(postOrder(obj)),
  deleteMerchTypeDiscount: id => dispatch(deleteMerchTypeDiscount(id))
})

const pageConfig = {
  data: {
    bill: {
      discountFee: 0,
      merchFee: 0,
      expressFee: 0,
      couponFee: 0,
      giftCardFee: 0,
      coinFee: 0,
      orderFee: 0,
    },

    address: null,
    validCouponList: [],
    merchTypeSelectCount: 0
  },

  async onShow () {
    const { id } = this.options
    const { id: groupId } = this.data.group
    this.fetching()
    const _result = await this.fetchPCD()
    const results = await Promise.all([
      this.fetchMerch({ groupId, merchId: id }),
      this.fetchCouponList(),
      // this.fetchGiftCardList(),
      this.fetchCoin(),
      this.fetchDefaultAddressByMerchId(id),
      this.fetchAddressTagList()
    ])

    // if request hava fail
    if ([_result, ...results].some(item => !item)) {
      return this.fetchend()
    }

    // set default address if don't limit
    const { map, validDefaultIdMap } = store.getState().addresses
    const { addressId } = store.getState().buying
    if (validDefaultIdMap[id]) {
      const address = map[addressId]
      this.setData({ address })
    }

    // if auto add first valid merchType `_select` => 1
    const { merchTypes } = this.data
    if (!merchTypes.some(merchType => merchType._select)) {
      const _validMerchTypes = merchTypes.filter(merchType => merchType.quantity)
      const merchTypeId = _validMerchTypes[0] && _validMerchTypes[0].merchTypeId
      this.putMerchTypeSelect({ merchTypeId, num: 1 })
    }

    this._computedBill()
    this.fetchend()
  },

  _computedBill () {
    const { id } = this.options
    // const {
    //   address, merch, merchTypes,
    //   couponList, giftCards, bill
    // } = this.data
    const {
      address, merch, merchTypes,
      couponList, bill
    } = this.data

    const merchTypeSelectCount = merchTypes.reduce((acc, merchType) => acc + merchType._select, 0)

    bill.discountFee = merchTypes.reduce((acc, merchType) => {
      return acc + (merchType.promotion ? merchType._select * merchType.promotion.amount : 0)
    }, 0)

    bill.merchFee = merchTypes.reduce((acc, merchType) => {
      return acc + merchType._select * merchType.grouponPrice
    }, 0) - bill.discountFee

    bill.expressFee = address
      ? merchTypes.reduce((acc, merchType) => {
        return acc + merchType._select * (+merch._expressFeeMap[`${id}-${address.province}`] || 0)
      }, 0)
      : 0

    const amount = bill.merchFee + bill.expressFee
    let validCouponList = []
    // 该商品可以使用优惠劵
    if (merch.canUseCoupon && merchTypeSelectCount) {
      // valid couponList
      validCouponList = couponList.filter(coupon => {
        // time limit
        const now = Date.now()
        const { startTime, endTime } = coupon
        const _startTime = new Date(startTime).getTime() + new Date(startTime).getTimezoneOffset() * 60 * 1000
        const _endTime = new Date(endTime).getTime() + 3600 * 24 * 1000 + new Date(startTime).getTimezoneOffset() * 60 * 1000
        if (now < _startTime || now > _endTime) {
          return false
        }
        // if coupon hava tagId and not eq merch.tagId
        if (coupon.tagId != 0 && coupon.tagId != merch.tagId) {
          return false
        }
        // amount (add expressFee)
        if (coupon.useLimit == COUPON.TYPE.FULL_MINUS && amount < coupon.amount) {
          return false
        }
        return true
      })
      // auto choose coupon
      // note: null => 没有可用, 0 => 不使用, id => 优惠劵ID
      if (store.getState().buying.couponId == null) {
        this.putChooseCoupon(validCouponList.length ? validCouponList[0].usercouponId : null)
      }
    }

    // get CouponFee
    const { couponId } = store.getState().buying
    bill.couponFee = couponId ? +store.getState().coupons.map[couponId].money : 0

    // get coinFee
    const { coin } = store.getState().buying
    bill.coinFee = Math.min(coin / 100, ~~bill.merchFee * 100)

    // auto choose giftCards
    // let { giftCardIds } = store.getState().buying
    // if (!giftCardIds) {
    //   giftCardIds = giftCards.map(giftCard => +giftCard.usercouponId)
    //   this.putChooseGiftCards(giftCardIds)
    // }
    // const _giftCardAmount = giftCardIds
    //   .map(giftCardId => store.getState().giftCards.map[giftCardId])
    //   .reduce((acc, giftCard) => {
    //     return acc + giftCard.money
    //   }, 0)
    // bill.giftCardFee = Math.max(0, Math.min(_giftCardAmount, amount - bill.couponFee) - bill.coinFee)
    bill.giftCardFee = 0

    bill.orderFee = Math.max(0, amount - bill.couponFee - bill.giftCardFee - bill.coinFee)
    // { merchFee, expressFee, couponFee, giftCardFee, coinFee, orderFee }
    this.setData({ validCouponList, merchTypeSelectCount, bill })
  },

  gotoChooseAddress () {
    const { id } = this.options
    wx.navigateTo({ url: `/pages/mine/addressList/addressList?merchId=${id}&view=choose` })
  },

  gotoChooseCoupon () {
    const { id } = this.options
    const { bill, merch } = this.data
    if (!merch.canUseCoupon) return

    const amount = bill.merchFee + bill.expressFee
    wx.navigateTo({ url: `/pages/mine/couponList/couponList?merchId=${id}&amount=${amount}=&view=choose` })
  },

  // gotoChooseGiftCards () {
  //   wx.navigateTo({ url: `/pages/mine/giftCardList/giftCardList?view=choose` })
  // },

  addMerchType (event) {
    const { merchTypeId, num } = event.target.dataset
    this.putMerchTypeSelect({ merchTypeId, num: num + 1 })
    this._computedBill()
  },

  minusMerchType (event) {
    const { merchTypeId, num } = event.target.dataset
    this.putMerchTypeSelect({ merchTypeId, num: num - 1 })
    this._computedBill()
  },

  addUseCoin (event) {
    const { coin } = event.target.dataset
    const { coinAmount, buying, bill } = this.data
    if (coinAmount - 100 < buying.coin || bill.merchFee * 100 < buying.coin + 100) return

    this.putUseCoin(coin + 100)
    this._computedBill()
  },

  minusUseCoin (event) {
    const { coin } = event.target.dataset
    if (coin <= 0) return

    this.putUseCoin(coin - 100)
    this._computedBill()
  },

  countdownOver (event) {
    const { id } = event.target.dataset
    this.deleteMerchTypeDiscount(id)
    this._computedBill()
  },

  async pay () {
    const { id } = this.options
    const {
      address, validCouponList,
      giftCards, bill,
      merch, merchTypes, groupon,
      buying, merchTypeSelectCount
    } = this.data
    const { authorId } = this.data.group

    // valid
    if (!address) {
      return alert('请选择地址')
    }
    if (!merchTypeSelectCount) {
      return alert('请选择规格')
    }
    if (merch.saleItem && merchTypeSelectCount < merch.saleItem) {
      return alert('不满足起售条件')
    }

    // suborderListStr [{ grouponId, merchTypeId, grouponRuleId, quantity }]
    const suborderListStr = JSON.stringify(
      merchTypes.filter(merchType => merchType._select)
        .map(merchType => ({
          grouponId: groupon.grouponId,
          grouponRuleId: groupon.grouponRuleId,
          merchTypeId: merchType.merchTypeId,
          quantity: merchType._select
        }))
    )

    // { merchandiseId, recommendUserId, addressId, userCouponId, giftCardIds, giftCardMoney, gold, suborderListStr }
    const obj = {
      merchandiseId: id,
      recommendUserId: authorId,
      addressId: address.addressId,
      userCouponId: buying.couponId,
      // giftCardIds: buying.giftCardIds.join(','),
      // giftCardMoney: Number(bill.giftCardFee).toFixed(2),
      gold: bill.goldFee,
      suborderListStr,
      _paying: {
        merchs: [merch],
        orderFee: bill.orderFee,
      }
    }

    this.fetching()
    const isSuccess = await this.postOrder(obj)
    this.fetchend()

    if (isSuccess) {
      wx.redirectTo({ url: '/pages/group/paying/paying' })
    }
  },

  reload () {
    this.clearError()
    this.onShow(this.options)
  },
  onUnload () {
    this.clearError()
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)
