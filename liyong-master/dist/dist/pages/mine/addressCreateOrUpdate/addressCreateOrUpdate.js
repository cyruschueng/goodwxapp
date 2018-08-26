import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError, alertError } from '../../../store/actions/loader'
import { fetchAddressTagList, fetchPCD, postAddress, fetchAddress, putAddress } from '../../../store/actions/mine'
import { confirm, alert, isTelphone } from '../../../utils'

const app = getApp()

const mapStateToData = (state, options) => {
  const {
    tagIds, tagMap,
    provinceMap, cityMap, districtMap,
    provinceIds, cityIdsMap, districtIdsMap,
    map
  } = state.addresses
  const { id } = options

  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,

    tags: tagIds.map(id => tagMap[id]),
    provinceMap,
    cityMap,
    districtMap,
    provinceIds,
    cityIdsMap,
    districtIdsMap,
  }
}

const mapDispatchToPage = dispatch => ({
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),
  alertError: _ => dispatch(alertError()),
  clearError: _ => dispatch(clearError()),

  fetchAddressTagList: _ => dispatch(fetchAddressTagList()),
  fetchPCD: id => dispatch(fetchPCD(id)),
  postAddress: obj => dispatch(postAddress(obj)),
  fetchAddress: id => dispatch(fetchAddress(id)),
  putAddress: obj => dispatch(putAddress(obj))
})

const pageConfig = {
  data: {
    pid: null,
    cid: null,
    did: null,
    range: [[], [], []],
    rangeValue: [0, 0, 0]
  },

  async onShow () {
    const { id } = this.options
    const promiseArray = [
      this.fetchPCD(),
      this.fetchAddressTagList()
    ]
    if (id) {
      promiseArray.push(this.fetchAddress(id))
    }

    this.fetching()
    await Promise.all(promiseArray)
    if (id) {
      const map = app.store.getState().addresses.map
      this.setData({
        address: map[id],
        type: map[id].type
      })
      this._generateRange()
      this._generateRangeValue()
    } else {
      this._generateRange()
    }
    this.fetchend()
  },

  PCDChange (event) {
    const { value } = event.detail
    const { range } = this.data
    const pid = range[0][value[0]].pid
    const cid = range[1][value[1]].cid
    const did = range[2][value[2]].did
    this.setData({ pid, cid, did })
  },

  PCDColumnChange (event) {
    const { column, value } = event.detail
    const { range, cityIdsMap, districtIdsMap } = this.data
    let { pid, cid, did } = this.data
    if (column === 0) {
      pid = range[0][value].pid
      cid = cityIdsMap[pid][0]
      did = districtIdsMap[cid][0]
    } else if (column === 1) {
      cid = range[1][value].cid
      did = districtIdsMap[cid][0]
    } else {
      did = range[2][value].did
    }
    this._generateRange(pid, cid, did)
    return this.setData({ pid, cid, did })
  },

  chooseTag (event) {
    const { type } = event.target.dataset
    this.setData({ type })
  },

  async submit (event) {
    const { recipient, tel, address, type } = event.detail.value
    const { pid, cid, did } = this.data

    // valid input data
    if (!recipient.trim()) {
      return alert('请输入收货人')
    } else if (!isTelphone(tel)) {
      return alert('请输入正确的手机号')
    } else if (!pid || !cid || !did) {
      return alert('请选择所在地区')
    } else if (!address.trim()) {
      return alert('请输入详细地址')
    } else if (!type) {
      return alert('请选择地址标签')
    }

    // action
    const { id } = this.options
    this.fetching()
    let isActionSuccess

    if (id) {
      const pcd = [pid, cid, did].join(',')
      isActionSuccess = await this.putAddress({
        recipient, tel, address, type,
        pcd, addressId: id,
        province: pid, city: cid, district: did
      })
    } else {
      isActionSuccess = await this.postAddress({
        recipient, tel, address, type,
        province: pid, city: cid, district: did
      })
    }
    this.fetchend()
    if (isActionSuccess) wx.navigateBack()
  },

  reload () {
    this.clearError()
    this.onShow(this.options)
  },
  onUnload () {
    this.clearError()
  },

  _generateRange (pid, cid, did) {
    const {
      provinceMap, cityMap, districtMap,
      provinceIds, cityIdsMap, districtIdsMap
    } = this.data
    if (!pid) pid = provinceIds[0]
    if (!cid) cid = cityIdsMap[pid][0]
    if (!did) did = districtIdsMap[cid][0]
    const range = [[], [], []]
    range[0] = provinceIds.map(pid => ({ pid, name: provinceMap[pid] }))
    range[1] = cityIdsMap[pid].map(cid => ({ cid, name: cityMap[cid] }))
    range[2] = districtIdsMap[cid].map(did => ({ did, name: districtMap[did] }))
    this.setData({ range })
  },

  _generateRangeValue () {
    const {
      address,
      provinceIds, cityIdsMap, districtIdsMap
    } = this.data
    const { province: pid, city: cid, district: did } = address
    const rangeValue = Array(3)
    rangeValue[0] = provinceIds.indexOf(pid)
    rangeValue[1] = cityIdsMap[pid].indexOf(cid)
    rangeValue[2] = districtIdsMap[cid].indexOf(did)
    this.setData({ pid, cid, did, rangeValue })
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)


