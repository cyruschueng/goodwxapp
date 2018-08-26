import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'
import { fetchLocation } from '../../../store/actions/global'
import { alertError } from '../../../utils'
import promisify from '../../../lib/promisify'
import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { searchRequest } from '../../../api/homePage'


const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    id: state.global.group && state.global.group.id,
    cityId:state.global.location
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError())
})

const pageConfig = {
  data:{
    isShow:false,
    inputVal:'',
    dataList:[]
  },
  search (event) {
    if(this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      wx.showLoading()
      const requestRes = searchRequest({ communityId:this.data.id, keyword:event.detail.value, cityId:this.data.cityId.city.id, provinceId:this.data.cityId.province.id})
      requestRes.then((res) => {
        wx.hideLoading()
        this.setData({
          isShow:true,
          inputVal:event.detail.value,
          dataList:res
        })
      }).catch((err) => {
        wx.hideLoading()
        alertError(err)
      })
    }, 900)
  //   try {
  //     wx.showLoading()
  //     const res = await searchRequest({ communityId:this.data.id, keyword:event.detail.value, cityId:this.data.cityId.city.id, provinceId:this.data.cityId.province.id})
  //     this.setData({
  //       isShow:true,
  //       inputVal:event.detail.value,
  //       dataList:res
  //     })
  //   } catch (err) {
  //     alertError(err)
  //   } finally {
  //     wx.hideLoading()
  //   }
  // },
  // clearInput () {
  //   this.setData({
  //     inputVal:''
  //   })
  },

  gotoMerchShow (event) {
    const { id } = event.currentTarget.dataset
    wx.navigateTo({ url: `/pages/group/merchShow/merchShow?id=${id}` })
  },
  // 清除内容
  clearInput () {
    this.setData({
      inputVal: ''
    })
  }

}
Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)
