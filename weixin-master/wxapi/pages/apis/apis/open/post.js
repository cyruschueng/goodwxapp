/**
 * API -- for post request
 */

module.exports = {
  addNearby() {
    // url: https://api.weixin.qq.com/wxa/addnearbypoi?access_token=ACCESS_TOKEN
    const reqObj = {
      related_name: '经营资质主体',
      related_credential: '经营资质证件号, required',
      related_address: '经营资质地址，required',
      related_proof_material: '相关证明材料照片临时素材mediaid'
    }

    const resObj = {
      audit_id: '审核单id, required',
      poi_id: '附近地点id, required',
      related_credential: '经营资质证件号, required'
    }

    const resExm = {
      "errocde": 0,
      "errmsg": "ok",
      "data": {
        "audit_id": 222222
      }
    }

    const errCode = {
      47001: 'POST数据json格式错误',
      20002: 'POST参数非法',
      44002: 'POST数据为空',
      92000: '该经营资质已添加，请勿重复',
      92002: '附近地点添加数量达到上线，无法继续添加',
      92004: '附近功能被封禁',
      93011: '个人类型小程序不可用'
    }
  }
}