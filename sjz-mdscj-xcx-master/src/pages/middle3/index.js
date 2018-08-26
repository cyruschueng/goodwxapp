import wx, { Component, PropTypes } from 'labrador';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {price} from '../../utils/filter';
import ProductCard from '../../components/productCard/productCard';
import oldProductsCom from '../../components/oldProductsCom/oldProductsCom';

class Middle extends Component {
  static propTypes = {
    detail: PropTypes.object,
    getDetail: PropTypes.func
  };

  state = {
    distsendid: '',
    es: '',
    makeReqId: '',
    isShowOld: false,
    isScolled: false
  };
  
  children () {
    const {productsList, oldProducts} = this.props;
    return {
      ProductCard: productsList.map((item, index) => {
        return {
          component: ProductCard,
          key: index,
          props: {
            item: item
          }
        }
      }),
      oldProductsCom: {
        component: oldProductsCom,
        props: {
          items: oldProducts
        }
      }
    };
  }

  onLoad (options) {
    /*
    * 老接口
    * scene=distsendid:1/es:true
    * */

    /*
    * 新接口
    * scene=makeReqId:1111
    * */
    const scene = decodeURIComponent(options.scene);
    const sceneArr = scene.split('/');
    const params = {};
    sceneArr.map(i => {
      const keyValue = i.split(':');
      params[keyValue[0]] = keyValue[1];
    });
    this.setState(params);
    this.props.getInit(params);
     wx.showShareMenu({
       withShareTicket: true,
       complete (res) {
         console.log('shareMenu', res);
       }
     });
  }
  queryMultipleNodes () {
    if (wx.createSelectorQuery && wx.pageScrollTo) {
      let query = wx.createSelectorQuery();
      query.select('.up-info').boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(res => {
        wx.pageScrollTo({
          scrollTop: res[0].top - 100,
          duration: 100
        });
        this.setState({
          isScolled: true
        })
      });
    }
  }

  onShareAppMessage() {
     let path = '';
     if (this.state.makeReqId) {
       path = `/pages/middle/index?scene=makeReqId:${this.state.makeReqId}`;
     } else {
       path = `/pages/middle/index?scene=distsendid:${this.state.distsendid}/es:${this.state.es}`;
     }
     const currentPro = this.props.productsList.filter(i => i.isCurrent)[0];
     console.log('currentPro', currentPro);
     return {
       title: currentPro.prodName,
       path,
       imageUrl: currentPro && currentPro.imageUrls && currentPro.imageUrls[0]
     }
  }

  formSubmit (e) {
    const formID = e.detail.formId;
    console.log(formID);
    if (formID !== 'the formId is a mock one') {
      this.props.submitFormId(formID);
    }
  }

  onPullDownRefresh () {
    if (!this.state.isShowOld) {
      wx.stopPullDownRefresh();
      this.setState({
        isShowOld: true
      }, () => {
        setTimeout(() => {
          this.queryMultipleNodes();
        }, 1000);
      });
    } else {
      wx.stopPullDownRefresh();
    }
  }
}

export default connect(
  ({middle}) => ({
    productsList: middle.list,
    isRequesting: middle.isRequesting,
    oldProducts: middle.oldProducts
  }),
  (dispatch) => ({
    setViewConfig (config) {
      dispatch({
        type: types.UPDATE_VIEW_CONFIG,
        payload: config
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
    getInit (payload) {
      dispatch({
        type: types.MIDDLE_PRODUCTS_LIST_INIT_REQUEST,
        payload
      });
    }
  })
)(Middle);
