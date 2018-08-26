import wx, { Component, PropTypes } from 'labrador';
import { connect } from 'labrador-redux';
import * as types from '../../types';
import {price} from '../../utils/filter';
import skuPanel from '../../components/sku-panel/sku-panel';

class Detail extends Component {
  static propTypes = {
    detail: PropTypes.object,
    getDetail: PropTypes.func
  };

  static defaultProps = {
    detail: {
      skuDimensions: []
    }
  };

  state = {
    btnText: '立即购买',
    showSkuPanel: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    indicatorDots: true,
    showPrice: '...',
    isShowBtnCopy: false,
    isCopyed: false,
    isShowCopyTips: false,
    proType: 'NONE',
    promotionStatus: '',
    priceCurrentTuan: '',
    btnCol: 'btn-col1',
    promotionAmount: 0,
    showData: {
      skuTextShow: '请选择商品类型', // 选中sku的显示文案
      maxPurchaseNumber: '0',  // 限购商品数量，如果为0表示不限购
      skuPrice: '', // 当前价格
      skuAmount: '', // 当前库存
      skuImage: '',    // 当前sku图片
      priceCurrent: '', // 商品现价
      priceOld: '',  // 商品原价
      startHours: '--',  // 秒杀商品开抢时
      startMinutes: '--',  // 秒杀商品开抢分
      startSeconds: '--', // 秒杀商品开枪秒
      startMonth: '--',  // 秒杀商品开抢月
      startDay: '--'  // 秒杀商品开抢日
    },
    formData: {
      skus: [{
        skuId: '',
        quantity: 1
      }],
      type: 'DANBAO',
      productSource: 'maidao',
      sellerId: '',
      shopId: '',
      groupId: '',
      userAddressId: null,
      promotionType: 'NONE'
    },
    countdownData: {  // 倒计时
      target: '',
      timeCount: null,
      initTime: '',
      days: '--',
      hours: '--',
      minutes: '--',
      seconds: '--',
      timeLag: 0  // 时差计算
    }
  };

  onLoad ({id, fromChannel}) {
    // 暂存链接参数
    this.setState({id, fromChannel});
    // 请求详情数据
    this.props.getDetail(id);

    wx.showShareMenu({
      withShareTicket: true,
      complete (res) {
        console.log('shareMenu', res);
      }
    });
  }

  onShareAppMessage() {
    return {
      title: this.props.detail.name,
      path: '/pages/product/detail?id=' + this.state.id
    }
  }

  onShow () {
    const { countdownData, id } = this.state;
    clearInterval(countdownData.timeCount);
    id && this.props.getDetail(id);
  }

  onHide () {
    const { countdownData } = this.state;
    clearInterval(countdownData.timeCount);
    this.props.dataClear();
  }

  onUnload () {
    const { countdownData } = this.state;
    clearInterval(countdownData.timeCount);
    this.props.dataClear();
  }

  onUpdate (props) {
    const that = this;
    if (!this.props.detail.id && props.detail.id) {
      let { 
        priceSummary,
        promotion,
        skuVOs,
        originPromotionType,
        shopInfo,
        shopId,
        imgUrl
      } = props.detail;
      let { proType, promotionStatus, showPrice, countdownData, promotionAmount, showData, formData, priceCurrentTuan, priceCurrentBuyer, btnText } = this.state;

      if (promotion) {
        let status = promotion.status;

        // 营销活动倒计时计算活动类型
        if (status !== 'ENDED') {
          const { currentTime } = promotion;
          countdownData.timeLag = (new Date()).getTime() - currentTime;
          if (status === 'STAY') {
            countdownData.target = promotion.startTime;
            countdownData.initTime = promotion.startTime - currentTime;
          } else if (status === 'INPROGRESS') {
            countdownData.target = promotion.endTime;
            countdownData.initTime = promotion.endTime - currentTime;
          }
          if (countdownData.initTime > 0) {
            countdownData.timeCount = setInterval(()=> that.countdown(), 1000);
          }
        }
      }

      promotion = promotion || {};
      const { promotionType = 'NONE', status = '' } = promotion;

      // 总营销库存计算
      for (let i = 0, len = skuVOs.length; i < len; i++) {
        promotionAmount += skuVOs[i].promotionAmount;
      }

      switch (promotionType) {
        case 'TUAN': {
          // 设置显示的秒杀|团购开始时间
          let startTime = new Date(promotion.startTime);
          showData.startHours = parseInt(startTime.getHours());
          showData.startMinutes = parseInt(startTime.getMinutes());
          showData.startSeconds = parseInt(startTime.getSeconds());
          showData.startMonth = parseInt(startTime.getMonth()) + 1;
          showData.startDay = parseInt(startTime.getDate());
          showData.startHours = showData.startHours > 9 ? showData.startHours : ('0' + showData.startHours);
          showData.startMinutes = showData.startMinutes > 9 ? showData.startMinutes : ('0' + showData.startMinutes);
          showData.startSeconds = showData.startSeconds > 9 ? showData.startSeconds : ('0' + showData.startSeconds);
          showData.startMonth = showData.startMonth > 9 ? showData.startMonth : ('0' + showData.startMonth);
          showData.startDay = showData.startDay > 9 ? showData.startDay : ('0' + showData.startDay);
          
          // groupId
          formData.groupId = promotion.id;
          // 设置拼团价格显示
          if (priceSummary.minPromotionPrice === priceSummary.maxPromotionPrice) {
            priceCurrentTuan = parseFloat(priceSummary.minPromotionPrice) / 100;
          } else {
            priceCurrentTuan = parseFloat(priceSummary.minPromotionPrice) / 100 + '-' + parseFloat(priceSummary.maxPromotionPrice) / 100;
          }
          // 设置拼团单独购买按钮
          if (originPromotionType === 'SALE') {
            priceCurrentBuyer =
              priceSummary.minDiscountPrice === priceSummary.maxDiscountPrice
                ? priceSummary.minDiscountPrice / 100 : priceSummary.minDiscountPrice / 100 +
                '-' +
                priceSummary.maxDiscountPrice / 100;
          } else {
            priceCurrentBuyer =
              priceSummary.minSkuPrice === priceSummary.maxSkuPrice
                ? priceSummary.minSkuPrice / 100 : priceSummary.minSkuPrice / 100 +
                '-' +
                priceSummary.maxSkuPrice / 100;
          }
          
          if (status === 'INPROGRESS') {
            btnText = `${promotion.groupNum}人团，去开团`;
          }
          break;
        }
      }

      proType = promotionType;
      promotionStatus = status;
      showPrice = price(priceSummary);
      formData.sellerId = shopInfo.shop.ownerId;  // sellerId赋值
      formData.shopId = shopId; // shopId赋值
      showData.skuImage = imgUrl; // sku显示图片首次设置

      this.setState({
        proType, promotionStatus, showPrice, countdownData, promotionAmount, showData, formData, priceCurrentTuan, priceCurrentBuyer, btnText
      }, ()=>{
        that.getPrice();  // 计算显示价格
        that.domInit();
      });
    }
  }
  /**
   * DOM初始化
   */
  domInit () {
    let that = this;
    let {
      id, 
      promotion,
      amount,
      status
    } = this.props.detail;
    let {proType, promotionAmount, proStatusTips, btnBuyDisabled, btnListShow  } = this.state;

    if (!id) {
      return;
    }
    /* 页面按钮初始化 */
    // 商品已售完
    if ((!promotionAmount && (proType !== 'NONE' && promotion.status === 'INPROGRESS')) ||
        (!amount && (proType === 'NONE' || proType !== 'NONE' && promotion.status !== 'INPROGRESS'))) {
      proStatusTips = '商品已售完';
      btnBuyDisabled = true;

      that.setState({
        proType, promotionAmount, proStatusTips, btnBuyDisabled, btnListShow
      });
      // 按钮个数计算
      that.getBtnCol(true);
      return;
    } else {
      proStatusTips = '';
      btnBuyDisabled = false;
      // 按钮个数计算
      that.getBtnCol(false);
    }
    // 商品已经下架
    if (status !== 'ONSALE') {
      proStatusTips = '商品已下架';
      btnBuyDisabled = true;
      
      that.setState({
        proType, promotionAmount, proStatusTips, btnBuyDisabled, btnListShow
      });
      // 按钮个数计算
      that.getBtnCol(true);
      return;
    }

    that.setState({
      proType, promotionAmount, proStatusTips, btnBuyDisabled, btnListShow
    });
    // 按钮个数计算
    that.getBtnCol(true);
  }
  /**
   * @desc 获取底部按钮显示的个数
   */
  getBtnCol (btnListShow) {
    let that = this;
    let { 
      promotion,
      amount,
      status
    } = this.props.detail;
    let {proType, btnBuySingleShow, btnCol } = this.state;

    // 单独购买按钮是否展示：拼团商品可购买的时候显示，否则隐藏
    if (proType === 'TUAN' && promotion.status === 'INPROGRESS') {
      btnBuySingleShow = true;
    } else {
      btnBuySingleShow = false;
    }

    // 两个按钮: 单独购买和拼团购买
    if (btnBuySingleShow) {
      btnCol = 'btn-col2';
    }

    that.setState({
      proType, btnBuySingleShow, btnCol, btnListShow
    });
  }
  /**
   * @desc 商品的显示价格计算
   *       拼团和秒杀类别的商品在商品状态为未开始时，显示原价
   */
  getPrice () {
    let that = this;

    let {
      id, 
      priceSummary,
      promotion,
      originPromotionType
    } = this.props.detail;
    let { proType, showData } = this.state;
    // 活动未开始、活动已结束以及没有营销活动
    // 商品现售价格都取折扣价（如果有）或原价

    if (!id) {
      return;
    }
    if ((proType !== 'NONE' && promotion.status !== 'INPROGRESS') || proType === 'NONE') {
      // 有折扣价
      if (originPromotionType === 'SALE') {
        if (priceSummary.minDiscountPrice === priceSummary.maxDiscountPrice) {
          showData.priceCurrent = priceSummary.minDiscountPrice;
        } else {
          showData.priceCurrent = priceSummary.minDiscountPrice + '-' + priceSummary.maxDiscountPrice;
        }
        // 原价就是原价
        if (priceSummary.minSkuPrice === priceSummary.maxSkuPrice) {
          showData.priceOld = priceSummary.minSkuPrice;
        } else {
          showData.priceOld = priceSummary.minSkuPrice + '-' + priceSummary.maxSkuPrice;
        }
      } else {
        // 没有折扣价
        // 此时没有原价
        if (priceSummary.minSkuPrice === priceSummary.maxSkuPrice) {
          showData.priceCurrent = priceSummary.minSkuPrice;
        } else {
          showData.priceCurrent = priceSummary.minSkuPrice + '-' + priceSummary.maxSkuPrice;
        }
      }
    } else {
      // 有营销活动，并且进行中
      // 现售价格就是营销价格
      if (priceSummary.minPromotionPrice === priceSummary.maxPromotionPrice) {
        showData.priceCurrent = priceSummary.minPromotionPrice;
      } else {
        showData.priceCurrent = priceSummary.minPromotionPrice + '-' + priceSummary.maxPromotionPrice;
      }
      // 原价就是原价，不取活动价
      if (priceSummary.minSkuPrice === priceSummary.maxSkuPrice) {
        showData.priceOld = priceSummary.minSkuPrice;
      } else {
        showData.priceOld = priceSummary.minSkuPrice + '-' + priceSummary.maxSkuPrice;
      }
    }
    // 此时需要判断原价和现价是否一致，一致则原价不显示
    if (showData.priceCurrent === showData.priceOld) {
      showData.priceOld = '';
    }

    this.setState({
      showData
    });
  }
  /**
   * @desc 营销活动倒计时
   */
  countdown () {
    let that = this;
    let { countdownData, btnText, promotionStatus, btnAddCartShow, btnBuySingleShow, btnCol, skuShowType, formData, showData } = this.state;
    let { 
      promotion = {}
    } = this.props.detail;
    let { promotionType: proType} = promotion;

    countdownData.initTime = countdownData.target - (Date.now() - countdownData.timeLag);
    let t = countdownData.initTime;

    if (t > 0) {
      countdownData.days = Math.floor(t / 1000 / 60 / 60 / 24);
      countdownData.hours = Math.floor(t / 1000 / 60 / 60 % 24) > 9 ? Math.floor(t / 1000 / 60 / 60 % 24) : '0' + Math.floor(t / 1000 / 60 / 60 % 24);
      countdownData.minutes = Math.floor(t / 1000 / 60 % 60) > 9 ? Math.floor(t / 1000 / 60 % 60) : '0' + Math.floor(t / 1000 / 60 % 60);
      countdownData.seconds = Math.floor(t / 1000 % 60) > 9 ? Math.floor(t / 1000 % 60) : '0' + Math.floor(t / 1000 % 60);
    } else {
      clearInterval(countdownData.timeCount);
      if (proType === 'TUAN') {
        if (promotion.status === 'STAY') {
          promotionStatus = 'INPROGRESS';
          countdownData.target = promotion.endTime;
          wx.showModal({
            title: '提示',
            content: '拼团开始啦~'
          });

          // 初始化时间
          countdownData.days = '--';
          countdownData.hours = '--';
          countdownData.minutes = '--';
          countdownData.seconds = '--';
          countdownData.initTime = promotion.endTime - promotion.currentTime;
          if (countdownData.initTime > 0) {
            that.countdown();
            countdownData.timeCount = setInterval(()=> that.countdown(), 1000);
          }
          // 按钮切换，sku重新计算
          btnAddCartShow = false;
          btnBuySingleShow = true;
          // 按钮个数
          btnCol = 'btn-col2';
          skuShowType = 'TUAN';  // sku显示对应的商品类型
          formData.promotionType = 'TUAN'; // 下单字段
          showData.maxPurchaseNumber = promotion.maxPurchaseNumber || 0;
          that.getPrice();
          // that.setTuanBtnText();
          that.domInit();
        } else if (promotion.status === 'INPROGRESS') {
          promotionStatus= 'ENDED';
          //*window.alertTip('很遗憾，拼团已结束！');
          // 按钮切换，sku重新计算
          btnAddCartShow = true;
          btnCol = 'btn-col1';
          skuShowType = 'NONE';  // sku显示对应的商品类型
          formData.promotionType = 'NONE'; // 下单字段
          btnText = '立即购买';
          showData.maxPurchaseNumber = 0;
          that.getPrice();
          that.domInit();
        }
      }
    }

    this.setState({
      countdownData, btnText, promotionStatus, btnAddCartShow, btnBuySingleShow, btnCol, skuShowType, formData, showData
    });
  }

  children () {
    const {detail: {
      id,
      imgUrl,
      skuVOs,
      skuDimensions,
      originPromotionType,
      amount,
      price,
      priceSummary,
      shopId,
      promotion = {}
    }} = this.props;

    const { fromChannel = '', skuCurrentType = 'NONE', formData: {groupId} } = this.state;

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
          promotion,
          onBuy: (skuId, quantity) => {
            if (skuCurrentType === 'TUAN') {
              wx.navigateTo({
                url: `/pages/order/submit?shopId=${shopId}&` +
                  `quantity=${quantity}&productId=${id}&skuId=${skuId}&promotionType=${skuCurrentType}&fromChannel=${fromChannel}&groupId=${groupId}`
              });
            } else {
              wx.navigateTo({
                url: `/pages/order/submit?shopId=${shopId}&` +
                  `quantity=${quantity}&productId=${id}&skuId=${skuId}&promotionType=NONE&fromChannel=${fromChannel}`
              });
            }
          },
          onClose: () => {
            this.setState({showSkuPanel: false});
          }
        }
      }
    };
  }

  handleClick (e) {
    const { type } = e.target.dataset;
    this.setState({
      showSkuPanel: !this.state.showSkuPanel,
      skuCurrentType: type
    });
  }

  handleCopy () {
    const that = this;
    const { taoToken } = this.props.detail;
    if (taoToken) {
      wx.setClipboardData({
        data: taoToken,
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
    }
  }

  showModalService () {
    const wxCode = 'weixin123s';
    wx.showModal({
      title: '联系客服',
      content: '客服微信号 weixin123s',
      showCancel: false,
      confirmText: '一键复制',
      confirmColor: '#FF2551',
      complete: function(res) {
        wx.setClipboardData({
          data: wxCode,
          complete: function(res) {
            if (res.errMsg === 'setClipboardData:ok') {
            }
          }
        });
      }
    });
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
  ({product}) => ({
    detail: product.detail
  }),
  (dispatch) => ({
    getDetail (id) {
      dispatch({
        type: types.PRODUCT_DETAIL_REQUEST,
        payload: {id}
      });
    },
    dataClear () {
      dispatch({
        type: types.DATA_REDUCER_CLEAR
      });
    },
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
    }
  })
)(Detail);
