import wx, { Component, PropTypes } from 'labrador-immutable';
import { connect } from 'labrador-redux';
import * as types from '../../types';

class Coupon extends Component {
  static propTypes = {
  };

  state = {
    couponNos: []
  };

  onLoad ({ couponNos }) {
    this.props.setViewConfig({
      title: '领取优惠券'
    });

    couponNos = couponNos.split(',').filter(item=> item !== '');
    this.setState({
      couponNos
    });

    // 获取优惠券列表
    const params = {
      couponNos
    };
    this.props.getCouponList(params);
    wx.showShareMenu({
      withShareTicket: true,
      complete (res) {
        console.log('shareMenu', res);
      }
    });
  }

  onUpdate (props) {
    console.log('props', props);
  } 

  couponsDraw () {
    const { couponsDetail, dataTemp: { isShowDrawedTips } } = this.props;

    if (isShowDrawedTips) {
      // 去逛逛
      wx.switchTab({url: '/pages/index/index'});
    } else {
      // 立即领取
      const couponNos = couponsDetail.map(item => item.couponNo);
      const params = {
        channel: 'xcx',
        couponNos
      };
  
      this.props.couponsDraw(params);
    }
  }

  modalClose () {
    this.props.modalClose();
  }
  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }

}

export default connect(
  ({coupons})=>({
    couponsDetail: coupons.couponsDetail,
    dataTemp: coupons.dataTemp
  }),
  (dispatch) => ({
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    },
    getCouponList (payload) {
      dispatch({type: types.COUPONS_LIST_REQUEST, payload});
    },
    couponsDraw (payload) {
      dispatch({type: types.COUPONS_DRAW_REQUEST, payload});
    },
    modalClose () {
      dispatch({type: types.MODAL_COUPONS_HIDE});
    },
    submitFormId (formId) {
      dispatch({
        type: types.FORM_ID_SAVE_REQUEST,
        payload: {
          formId
        }
      })
    }
  })
)(Coupon);
