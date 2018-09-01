import Api from '/../../../../utils/config/api.js';
import { GLOBAL_API_DOMAIN } from '/../../../../utils/config/config.js';
Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    _shopid:'',
    _carousel:'',
    qrCodeFlag:'4.9'
  },
  onLoad: function (options) {
    this.setData({
      _shopid: options.id
    });
    this.recommendation();
  },
  onclickMore: function () {
    this.setData({
      qrCodeFlag: !that.data.qrCodeFlag
    });
  },
  recommendation: function () {
    let that = this;
    let _data = {
      shopId: this.data._shopid
    }
    Api.skutsc(_data).then((res) => {
      console.log("返回值:", res)
      this.setData({
        carousel: res.data.data
      })
    })
  },
})