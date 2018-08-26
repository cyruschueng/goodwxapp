import wx, { Component, PropTypes } from 'labrador';

class Code extends Component {
  static propTypes = {
    code: PropTypes.string
  };

  state = {
    code: '',
    isCopyed: false,
    isShowCopyTips: false
  };

  onLoad (options) {
    let code = decodeURIComponent(options.scene).replace(/\!/g,'￥');
    this.setState({
      code
    });
  }

  handleCopy () {
    const that = this;
    const { code } = this.state;
    if (code) {
      wx.setClipboardData({
        data: code,
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
}

export default Code;
