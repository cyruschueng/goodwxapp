import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'
var app = getApp()

Page({
  data: {
    code_type: 0,
    switch_date: [],
    date_type: moment().format('dddd'),
    date_pattern_type: moment().toDate().pattern('yyyy-MM-dd'),
    lineInfo: {},
    dateTravel: [],
    pageDisplay: true
  },
  onLoad(option){
    const { date_pattern_type, code_type } = this.data
    // util.getLocation().then((res, err) => {
    //   console.log(res,'----------res')
    //   this.setData({
    //     longitude: res.longitude,
    //     latitude: res.latitude
    //   })
    // })
    this.switch_date_factory()
    this.groupDetail(option.groupId, date_pattern_type, code_type)
  },
  groupDetail: function(id, dateType, codeType){
    const { token } = app.globalData.entities.loginInfo
    let parmas = Object.assign({}, {token: token}, {groupId: id}, {travelType: codeType}, {dateOfTxt: dateType})
    driver_api.groupDetail({data: parmas}).then(json => {
      let data = json.data
      let thatDayTravels = data.thatDayTravels
      let dateTravel =  util.ObjectArray(thatDayTravels)
      dateTravel && dateTravel.map(json => {
        json && json.time_line.map(res => {
          res.startTime = moment().toDate().pattern('HH:mm')
        })
      })
      this.setData({
        lineInfo: data,
        dateTravel: dateTravel
      })
      this.getLine()
    })
  },
  switch_code: function(e){
      const { currentTarget: { dataset: { id } } } = e
      const { date_pattern_type, lineInfo } = this.data
      this.setData({
        code_type: id
      })
      this.groupDetail(lineInfo.groupId, date_pattern_type, id)
  },
  switch_date_factory: function(){
    let week_arr = util.switch_date()
    week_arr.map((json, index) => {
      if(index === 0) json.week_txt = '今天'
      if(index === 1) json.week_txt = '明天'
      if(index === 2) json.week_txt = '后天'
    })
    this.setData({
      switch_date: week_arr
    })
  },
  clickDate: function(e){
    const { currentTarget: { dataset: { type } } } = e
    const { code_type, lineInfo } = this.data
    this.setData({
      date_pattern_type: type
    })
    this.groupDetail(lineInfo.groupId, type, code_type)
  },
  getLine: function(){
    const { lineInfo } = this.data
    const { token } = app.globalData.entities.loginInfo
    driver_api.getLine({
      data: {
        token: token,
        start: lineInfo.start,
        end: lineInfo.end,
        strategy: 0
      }
    }).then(json => {
      const { route } = json.data.routes
      if(!route){
        return
      }
      this.setData({
        markers: [{
          iconPath: '../../images/icon_map_line@3x.png',
          id: 0,
          longitude: lineInfo.start[0],
          latitude: lineInfo.start[1],
          width: 32,
          height: 35
        },{
          iconPath: '../../images/icon_map_line@3x.png',
          id: 1,
          longitude: lineInfo.end[0],
          latitude: lineInfo.end[1],
          width: 32,
          height: 47
        }],
        polyline: [{
          points: route,
          color:"#499EFF",
          width: 10,
          dottedLine: false,
          arrowLine: true,
          borderColor: '#4494F0',
          borderWidth: 1
        }]
      })
    })
  }
})
