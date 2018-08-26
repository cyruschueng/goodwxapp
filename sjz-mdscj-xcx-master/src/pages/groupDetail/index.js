import wx, { Component, PropTypes } from 'labrador';
import { connect } from 'labrador-redux';
import {authAction} from '../../actions';
import * as types from '../../types';

import skuPanel from '../../components/sku-panel/sku-panel';

class Template extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  state = {
    options: {},
    dataCountdown: {
      timeCount: null,
      days: '-',
      hours: '--',
      minutes: '--',
      seconds: '--',
      intervalTime: 0
    },
    btnText: '我要参团',
    btnStatus: '',
    btnShow: false,
    showSkuPanel: false,
    showUserList: false
  };

  onLoad (options) {
    const { groupOrderNo } = options;

    const params = {
      groupOrderNo
    };
    this.setState({options});
    this.props.getGroupsDetail(params);
  }

  onShareAppMessage() {
    const { dataDetail: { groupOrderNo, productVO: { name } } } = this.props;
    return {
      title: '拼团详情',
      desc: name,
      path: `/pages/groupDetail/index?groupOrderNo=${groupOrderNo}`
    }
  }

  onShow () {
    const { dataCountdown, options: { groupOrderNo } } = this.state;
    clearInterval(dataCountdown.timeCount);
    groupOrderNo && this.props.getGroupsDetail({groupOrderNo});
  }

  onHide () {
    const { dataCountdown } = this.state;
    clearInterval(dataCountdown.timeCount);
    this.props.dataClear();
  }

  onUnload () {
    const { dataCountdown } = this.state;
    clearInterval(dataCountdown.timeCount);
    this.props.dataClear();
  }

  onUpdate (props) {
    const that = this;
    if (this.props.dataDetail && !this.props.dataDetail.groupOrderNo && props.dataDetail.groupOrderNo) {
      let {
        dataDetail: { intervalTime, status, endTime, orderItems = [] },
        dataTemp: { userStatus, isMember, islock }
      } = props;
      let { dataCountdown, btnStatus, btnText, btnShow, timeLimit, proTitle } = this.state;

      endTime = endTime.replace(/-/g, '/');
      timeLimit =  (new Date()).getTime() - (new Date(endTime)).getTime();

      // 按钮状态
      // 1> 邀请好友
      if (['ACTIVE', 'PAID'].indexOf(userStatus) > -1 && isMember && !islock && ['SUCCESS', 'FAILED'].indexOf(status) === -1) {
        btnStatus = 'INVITING';
        btnText = '邀请好友参团';
      }
      // 2>立即支付
      if (['WAIT','SUBMITTED'].indexOf(userStatus)>-1  && isMember && !islock && !(status === 'SUCCESS' || status === 'FAILED')) {
        btnStatus = 'PAY';
        btnText = '立即支付';
      }
      // 3>我要参团
      if (['ACTIVE','PAID'].indexOf(status)>-1 && !isMember && !islock) {
        btnStatus = 'JOINGROUP';
        btnText = '我要参团';
      }
      // 4>我还要开团
      if (status === 'SUCCESS' || status === 'FAILED' || timeLimit >= 0) {
        btnStatus = 'OPENGROUP';
        btnText = '我还要开团';
      }
      btnShow = true;

      // 倒计时
      dataCountdown.intervalTime = intervalTime;
      if (timeLimit < 0) {
        dataCountdown.timeCount = setInterval(()=> that.countdown(), 1000);
      }

      proTitle = orderItems[0].orderItem.productName;
      this.setState({
        dataCountdown,
        btnStatus,
        btnText,
        btnShow,
        timeLimit,
        proTitle
      });

    }
  }

  handleUserList () {
    const { showUserList } = this.state;
    this.setState({showUserList: !showUserList});
  }
 
  countdown () {
    let that = this;
    let { dataCountdown, timeLimit } = this.state;
    let t;
    
    dataCountdown.intervalTime -= 1000;
    t = dataCountdown.intervalTime;
    timeLimit += 1000;
    
    if (t > 0) {
      dataCountdown.days = Math.floor(t / 1000 / 60 / 60 / 24);
      dataCountdown.hours = Math.floor(t / 1000 / 60 / 60 % 24) > 9 ? Math.floor(t / 1000 / 60 / 60 % 24) : '0' + Math.floor(t / 1000 / 60 / 60 % 24);
      dataCountdown.minutes = Math.floor(t / 1000 / 60 % 60) > 9 ? Math.floor(t / 1000 / 60 % 60) : '0' + Math.floor(t / 1000 / 60 % 60);
      dataCountdown.seconds = Math.floor(t / 1000 % 60) > 9 ? Math.floor(t / 1000 % 60) : '0' + Math.floor(t / 1000 % 60);
    } else {
      clearInterval(dataCountdown.timeCount);
    }
    
    this.setState({
      dataCountdown,
      timeLimit
    });
  }

  handleLinkMore () {
    wx.reLaunch({
      url: `/pages/index/index`
    });
  }

  handleGroup (e) {
    const { btnStatus, dataDetail } = e.target.dataset;
    switch (btnStatus) {
      case 'INVITING': {
        break;
      }
      case 'OPENGROUP': {
        wx.redirectTo({url: `/pages/product/detail?id=${dataDetail.orderItems[0].orderItem.productId}`});
        break;
      }
      case 'PAY': {
        const btnStatus = 'PAYING';
        const btnText = '支付中...';
        this.setState({ btnStatus, btnText }, ()=> {
          wx.redirectTo({url: `/pages/order/detail?orderNo=${dataDetail.orderNo}`});
        });
        break;
      }
      case 'JOINGROUP': {
        const showSkuPanel = true;
        this.setState({ showSkuPanel });
        break;
      }
    }
  }

  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }

  children () {
    if (!this.props.dataDetail.groupId) {
      return;
    }
    const { dataDetail: { productVO, sellerId, groupOrderNo }} = this.props;
    const {
      id,
      imgUrl,
      skuVOs,
      skuDimensions,
      originPromotionType,
      amount,
      price,
      priceSummary,
      shopId,
      promotion
    } = productVO;
    const fromChannel = '';
    const skuCurrentType = 'TUAN';
    const groupId = promotion ? promotion.id || '' : '';

    return {
      skuPanel: {
        component: skuPanel,
        props: {
          imgUrl: imgUrl,
          show: this.state.showSkuPanel,
          defaultPrice: priceSummary ? priceSummary.minDiscountPrice || priceSummary.minSkuPrice : 0,
          defaultAmount: amount,
          skuCurrentType,
          skuVOs,
          skuDimensions,
          onBuy: (skuId, quantity) => {
            wx.redirectTo({
              url: `/pages/order/submit?shopId=${shopId}&` +
                `quantity=${quantity}&productId=${id}&skuId=${skuId}&promotionType=${skuCurrentType}&fromChannel=${fromChannel}&groupId=${groupId}&sellerId=${sellerId}&groupOrderNo=${groupOrderNo}`
            });
          },
          onClose: () => {
            this.setState({showSkuPanel: false});
          }
        }
      }
    };
  }
}

export default connect(
  ({groups, user}) => ({
    dataDetail: groups.dataDetail,
    dataTemp: groups.dataTemp
  }),
  (dispatch) => ({
    getGroupsDetail (payload) {
      dispatch(authAction({
        type: types.GROUPS_DETAIL_REQUEST,
        payload
      }));
    },
    dataClear () {
      dispatch({
        type: types.DATA_REDUCER_CLEAR
      });
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
)(Template);
