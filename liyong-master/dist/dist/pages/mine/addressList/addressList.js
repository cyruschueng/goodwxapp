import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import {
  fetchPCD, fetchAddressTagList, fetchAddressList,
  putAddressDefault, deleteAddress
} from '../../../store/actions/mine'
import { fetchAddressIdsByMerchId, putChooseAddress } from '../../../store/actions/group'
import { confirm } from '../../../utils'

const store = getApp().store
const mapStateToData = (state, options) => {
  const { defaultId, map, ids, tagIds, tagMap } = state.addresses
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    defaultId: defaultId,
    addressTagMap: tagMap,
    addressList: ids.map(id => map[id]),

    currentId: state.buying.addressId || defaultId
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  clearError: _ => dispatch(clearError()),

  fetchPCD: _ => dispatch(fetchPCD()),
  fetchAddressTagList: _ => dispatch(fetchAddressTagList()),
  fetchAddressList: _ => dispatch(fetchAddressList()),
  putAddressDefault: id => dispatch(putAddressDefault(id)),
  deleteAddress: id => dispatch(deleteAddress(id)),

  fetchAddressIdsByMerchId: id => dispatch(fetchAddressIdsByMerchId(id)),
  putChooseAddress: id => dispatch(putChooseAddress(id))
})

const pageConfig = {
  data: {
    choose: false, // choose address?
    filterAddressList: null
  },

  async onShow () {
    const { merchId, view } = this.options
    this.fetching()
    await this.fetchPCD()

    // get all address list
    const promiseArray = [
      this.fetchAddressTagList(),
      this.fetchAddressList()
    ]

    // if is merch buy choose address
    if (view === 'choose') {
      wx.setNavigationBarTitle({ title: '选择收货地址' })
      const merch = store.getState().merchs.map[merchId]
      this.setData({ choose: true, merch })
      promiseArray.push(this.fetchAddressIdsByMerchId(merchId))
    }

    await Promise.all(promiseArray)

    if (view === 'choose') {
      this._computedAddressList()
    }

    this.fetchend()
  },

  _computedAddressList () {
    const { merchId } = this.options
    const { currentId, addressList } = this.data
    const validIds = store.getState().addresses.validIdsMap[merchId]
    addressList.map(address => {
      const addressId = address.addressId
      // if the address is invalid add `_limit`
      address._limit = !~validIds.indexOf(addressId) ? true : false
      // if the address is select add `_select`
      address._select = addressId === currentId
      return address
    })
    this.setData({ addressList })
  },

  // events
  updateQuery (event) {
    const value = event.detail
    const { addressList } = this.data
    const filterAddressList = addressList.filter(address => ~address.address.indexOf(value) && ~address.recipient.indexOf(value))
    this.setData({ filterAddressList })
  },
  clearQuery (event) {
    const { addressList } = this.data
    this.setData({ filterAddressList: null, addressList })
  },

  chooseAddress (event) {
    console.log('choose')
    if (this.options.view !== 'choose') return

    const { id } = event.target.dataset
    this.putChooseAddress(id)
    wx.navigateBack()
  },

  gotoCreateAddress () {
    wx.navigateTo({ url: '/pages/mine/addressCreateOrUpdate/addressCreateOrUpdate' })
  },

  async setDefault (event) {
    if (await confirm('确认设为默认地址?')) {
      const { id } = event.target.dataset
      this.fetching()
      await this.putAddressDefault(id)
      this.fetchend()
    }
  },

  edit (event) {
    const { id } = event.target.dataset
    wx.navigateTo({ url: `/pages/mine/addressCreateOrUpdate/addressCreateOrUpdate?id=${id}` })
    console.log('edit')
  },

  async remove (event) {
    if (await confirm('确认删除改地址?')) {
      const { id } = event.target.dataset
      this.fetching()
      await this.deleteAddress(id)
      this.fetchend()
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

