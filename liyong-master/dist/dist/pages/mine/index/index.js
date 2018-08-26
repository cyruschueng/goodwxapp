import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { connect } from '../../../lib/wechat-weapp-redux'
import { fetching, fetchend, clearError } from '../../../store/actions/loader'
import { fetchProfile, fetchDailySign, postDailySign, fetchGroupCoupon } from '../../../store/actions/mine'
import { navigateErrorPage, alertError } from '../../../utils'
import { USER_ROLE, DAILY_SIGN } from '../../../constants'
import { postGroupCoupon } from '../../../api/mine'

const mapStateToData = state => ({
  displayError: state.loader.displayError,
  profile: state.mine.profile,

  USER_ROLE,
  DAILY_SIGN,

  groupId: state.global.group.id || null,
  dailySign: state.dailySign,

  groupCoupon: state.mine.groupCoupon
})

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError()),
  fetching: _ => dispatch(fetching()),
  fetchend: _ => dispatch(fetchend()),

  fetchProfile: _ => dispatch(fetchProfile()),
  fetchDailySign: id => dispatch(fetchDailySign(id)),
  postDailySign: id => dispatch(postDailySign(id)),

  fetchGroupCoupon: id => dispatch(fetchGroupCoupon(id))
})

const pageConfig = {
  data: {
    dailySignModal: false,
    signSuccessModal: false,
    GroupCouponModal:false,
    GroupCouponSuccessModal:false
  },

  onShow () {
    this.fetchProfile()
  },

  async getSign () {
    const { groupId } = this.data
    this.fetching()
    await this.fetchDailySign(groupId)
    this.setData({ dailySignModal: true })
    this.fetchend()
  },

  async postSign () {
    const { groupId } = this.data
    this.fetching()
    const isSuccess = await this.postDailySign(groupId)
    if (isSuccess) {
      this.setData({
        dailySignModal: false,
        signSuccessModal: true,
      })
    }
    this.fetchend()
  },

  async gift () {
    this.fetching()
    const { groupId } = this.data
    await this.fetchGroupCoupon(groupId)
    if (this.data.groupCoupon.isReceive == 1) {
      this.setData({
        GroupCouponModal:true,
        GroupCouponSuccessModal:true
      })
    } else {
      this.setData({
        GroupCouponModal:true
      })
    }
    this.fetchend()
  },

  async closeCouponModal () {
    this.fetching()
    if (this.data.GroupCouponModal == true && this.data.GroupCouponSuccessModal == false) {
      console.log("1")
      const { groupId } = this.data
      await postGroupCoupon(groupId)
      this.setData({
        GroupCouponModal:false,
        GroupCouponSuccessModal:true
      })
    } else if(this.data.GroupCouponModal == false && this.data.GroupCouponSuccessModal == true) {
      console.log("2")
      this.setData({
        GroupCouponModal:false,
        GroupCouponSuccessModal:false
      })
    }else if(this.data.GroupCouponModal == true && this.data.GroupCouponSuccessModal == true) {
      console.log("3")
      this.setData({
        GroupCouponModal:false,
        GroupCouponSuccessModal:false
      })
    }
    this.fetchend()
  },

  closeGroupCoupon () {
    this.fetching()
    this.setData({
      GroupCouponModal:false,
      GroupCouponSuccessModal:false
    })
    this.fetchend()
  },

  closeDailySignModal () {
    this.setData({ dailySignModal: false })
  },

  closeSignSuccessModal () {
    this.setData({ signSuccessModal: false })
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
