/**
 * 小程序配置文件
 */
// var base = 'http://47.97.222.254:8080/wms/api';
var base = 'http://127.0.0.1:8080/wms/api';

var config = {
  // API接口
  api: {
    base,
    expressList: `/data/express`,
    getGoodsList: `/commodity/list`,
    getGoodsFilterList: `/commodity/filterList`,
    getAgentFilterList: `/agent/filterList`,
    getManufacturerList: `/manufacturer/list`,
    options: `/opt/enum`,
    address: `/address`,
    defaultAddress: `/address/default`,
    addressList: `/address/list`,
    setDefaultAddress: `/address/setDefault`,
    updateAddress: `/address/update`,
    userBindMobile: `${base}/my/bind/mobile`,
    userLogin: `${base}/user/login`,
    userDetail: `${base}/user/detail`,
    inventory: `/inventory`,
    order: `/order`
  }
};

module.exports = config;
