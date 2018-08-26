/**
 * API -- 收货地址
 * 
 * v1.1.0
 * 
 * 需要用户授权：scope.address
 */

module.exports = {
  choose(opts) {
    const _opts = {
      success(res) {
        const _res = {
          errMsg: 'String',
          userName: 'String, 收货人姓名',
          postalCode: 'String, 邮编',
          provinceName: 'String',
          cityName: 'String',
          countyName: 'String',
          detailInfo: 'String, 详细收货地址信息',
          nationalCode: 'String, 收货地址国家码',
          telNumber: 'String, 收货人手机号码'
        }
      },
      fail() {},
      complete() {}
    }
  }
}