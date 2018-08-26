let app = getApp();
let url_common = app.globalData.url_common;
import * as verify from '../../../utils/global/verify.js';
Page({
  data: {
    activity_id:26,
    activityDetail: '',
    mobile: '',
  }, 
  onLoad(options) {
    this.setData({
      activity_id: options.activity_id
    })
    app.loginPage(user_id => {
      this.getActivityDetail();
      if(user_id != 0){
        this.hasChecked(user_id);
      }
    })
  },
  // 如果已经签到则跳转凭证
  hasChecked(user_id){
    app.httpPost({
      url: url_common + '/api/activity/confirmAttendByUserId',
      data:{
        user_id: user_id,
        activity_id: this.data.activity_id 
      }
    },this).then(res=>{
      if (res.data.apply_id != 0) app.href('/activitySignIn/pages/signIndentityCard/signIndentityCard?apply_id=' + res.data.apply_id + '&&activity_id=' + this.data.activity_id);
    }).catch(res=>{
      app.errorHide(this,res.data.error_msg)
    })
  },
  // 获取活动信息
  getActivityDetail() {
    app.httpPost({
      url: url_common + '/api/activity/attendActivity',
      data: {
        activity_id: this.data.activity_id
      }
    }, this).then(res => {
      console.log(res.data.data);
      this._dealActivityDetail(res.data.data); 
    })
  },
  // 处理活动信息
  _dealActivityDetail(data) {
    let activityDetail = [];
    activityDetail.push({
      name: '名称',
      value: data.activity_title
    });
    let end_time = '暂未透露';
    let start_time = '暂未透露';
    if (data.start_time) start_time = data.start_time.substring(0, 16);
    if (data.end_time) end_time = data.end_time.substring(0, 16);
    if (end_time == '暂未透露' && start_time == '暂未透露'){
      activityDetail.push({
        name: '时间',
        value: '暂未透露'
      });
    }else{
      activityDetail.push({
        name: '时间',
        value: start_time + ' ~ ' + end_time
      });
    }
    activityDetail.push({
      name: '地点',
      value: data.activity_address
    });
    activityDetail.push({
      name: '主办方',
      value: data.activity_user
    });
    this.setData({
      activityDetail: activityDetail
    })
  },
  // 手机号码blur
  mobile(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  // 验证报名信息
  checkIndentity() {
    verify.mobile(this,this.data.mobile, x=>{
        app.httpPost({
          url: url_common + '/api/activity/confirmAttendInfo',
          data: {
            activity_id: this.data.activity_id,
            user_mobile: this.data.mobile,
            open_session: app.globalData.open_session
          }
        }, this,res=>{
          if (res.data.status_code == 1111005) return app.href('/activitySignIn/pages/signNoIndentity/signNoIndentity')
        }).then(res => {
          app.href('/activitySignIn/pages/signIndentityCard/signIndentityCard?apply_id=' + res.data.apply_id + '&&activity_id=' + this.data.activity_id);
        }).catch(res => {
          app.errorHide(this, res.data.error_msg);
        })
    });
  },
})