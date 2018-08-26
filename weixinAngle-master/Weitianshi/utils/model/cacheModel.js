import { httpPost } from './httpModel'
let url_common = 'https://wx.weitianshi.cn';

// 旧式领域,金额,阶段,热门城市缓存
function getCache() {
  wx.request({
    url: url_common + '/api/category/getProjectCategory',
    method: 'POST',
    success: function (res) {
      console.log('getProjectCategory', res.data.data)
      let thisData = res.data.data;
      thisData.area.forEach((x) => { x.check = false })
      thisData.industry.forEach((x) => { x.check = false })
      thisData.scale.forEach((x) => { x.check = false })
      thisData.stage.forEach((x) => { x.check = false })
      thisData.hotCity.forEach((x) => { x.check = false })
      wx.setStorageSync("industry", thisData.industry)
      wx.setStorageSync("scale", thisData.scale)
      wx.setStorageSync("stage", thisData.stage)
      wx.setStorageSync('hotCity', thisData.hotCity)
    },
  })
}
getCache();

//非联动标签的check设置
function dealLabel(variable, str) {
  variable.forEach(x => {
    x.check = false;
  })
  // console.log(str, variable)
  wx.setStorageSync(str, variable)
}
//联动标签的check设置
function dealLabelChild(variable, str) {
  variable.forEach(x => {
    x.check = false;
    x.child.forEach(y => {
      y.check = false;
    })
  })
  variable[0].check = true;
  // console.log(str, variable)
  wx.setStorageSync(str, variable)
}
//获取新一代标签并存入缓存 
httpPost({
  url: url_common + '/api/investment/industrylist',
  data: {}
}).then(res => {
  let label_industry = res.data.data.industry_list;
  dealLabelChild(label_industry, 'label_industry');
  httpPost({
    url: url_common + '/api/investment/arealist',
    data: {}
  }).then(res => {
    let label_area = res.data.data.area_list;
    dealLabel(label_area, 'label_area');
    httpPost({
      url: url_common + '/api/investment/stylelist',
      data: {}
    }).then(res => {
      let label_style = res.data.data.style_list;
      dealLabel(label_style, 'label_style')
      httpPost({
        url: url_common + '/api/investment/typelist',
        data: {}
      }).then(res => {
        let label_type = res.data.data.type_list;
        dealLabel(label_type, 'label_type')
        wx.setStorageSync('label_time', [{ time_id: 0, time_name: '近一年', check: false }, { time_id: 1, time_name: '近三年', check: false }, { time_id: 2, time_name: '全部', check: false }])
      })
    })
  })
})