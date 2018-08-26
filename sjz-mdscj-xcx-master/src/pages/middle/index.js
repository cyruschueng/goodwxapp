import wx, { Component, PropTypes } from 'labrador';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {price} from '../../utils/filter';

class Middle extends Component {
  static propTypes = {
    detail: PropTypes.object,
    getDetail: PropTypes.func
  };

  state = {
    distanceid: '',
    es: '',
    showSkuPanel: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
    indicatorDots: true,
    indicatorColor: '#e6e6e6',
    indicatorActiveColor: '#fa163d',
    isShowBtnCopy: false,
    isCopyed: false,
    isShowCopyTips: false
  };

  onLoad (options) {
    //scene=distsendid:1/es:true
    const scene = decodeURIComponent(options.scene);
    const sceneArr = scene.split('/');
    const params = {};
    sceneArr.map(i => {
      const keyValue = i.split(':');
      params[keyValue[0]] = keyValue[1];
    });
    this.setState({distanceid: params.distsendid, es: params.es});
    this.props.getDetail(params);

    wx.showShareMenu({
      withShareTicket: true,
      complete (res) {
        console.log('shareMenu', res);
      }
    });
  }

  onShareAppMessage() {
    return {
      title: this.props.detail.prodName,
      path: `/pages/middle/index?scene=distsendid:${this.state.distanceid}/es:${this.state.es}`,
      imageUrl: this.props.detail && this.props.detail.imageUrls && this.props.detail.imageUrls[0]
    }
  }

  handleCopy () {
    const that = this;
    const { taokePwd } = this.props.detail;
    if (taokePwd) {
      if (wx.setClipboardData) {
        wx.setClipboardData({
          data: taokePwd,
          complete: function(res) {
            if (res.errMsg === 'setClipboardData:ok') {
              that.setState({
                isCopyed: true,
                isShowCopyTips: true
              });

            } else{
              that.setState({
                isCopyed: false,
                isShowCopyTips: true
              });
            }
          }
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
          confirmColor: '#fa163d'
        })
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
}

export default connect(
  ({middle}) => ({
    detail: middle.detail
  }),
  (dispatch) => ({
    getDetail (payload) {
      dispatch({
        type: types.MIDDLE_PRODUCT_REQUEST,
        payload
      });
    },
    submitFormId (formId) {
      dispatch({
        type: types.FORM_ID_SAVE_REQUEST,
        payload: {
          formId
        }
      })
    },
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
      });
    }
  })
)(Middle);
