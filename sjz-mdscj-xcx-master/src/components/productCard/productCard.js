import { Component, PropTypes } from 'labrador';

import wx from "labrador";

const {object} = PropTypes;

class ProductsCard extends Component {
  static propTypes = {
    item: object
  };
  state = {
    autoplay: false,
    interval: 3000,
    duration: 500,
    circular: true,
    indicatorDots: true,
    indicatorColor: '#d8d8d8',
    indicatorActiveColor: '#FF2551',
    isShowBtnCopy: false,
    isCopyed: false,
    isShowCopyTips: false
  };
  constructor (props) {
    super(props);
  }

  handleCopy () {
    const that = this;
    const { taokePwd } = this.props.item;
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
}

export default ProductsCard;
