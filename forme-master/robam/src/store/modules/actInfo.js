import axios from 'axios'
import Url from '../../assets/scripts/interface'
import * as types from '../mutations'
import codoonBrige from './../../assets/scripts/codoon-native-bridge';

axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

axios.interceptors.request.use((config)=>{
  state.isMum = true
  return config
}, (error)=>{
  state.isMum = false
  return Promise.reject(error)
})

axios.interceptors.response.use((response)=>{
  state.isMum = false
  return response.data
}, (error)=>{
  state.isMum = false
  return Promise.reject(error)
})

const state = {
  actInfo: {},//用户信息
  isMum: false,
  isDialog: false,
  isShowyuyue:false,//是否显示地址填写弹窗
  isShowToast:false,//是否显示抽奖类弹窗
  toastType:2,//显示哪个弹窗
  rankArr:[],//排行榜
  msg: '',
  countmedia:0,//勋章个数
}

const getters = {
  actInfo: state => state.actInfo,
  isMum: state => state.isMum,
  isDialog: state => state.isDialog,
  msg: state => state.msg,
  isShowyuyue:state => state.isShowyuyue,
  isShowToast:state => state.isShowToast,
  toastType:state => state.toastType,
  rankArr:state => state.rankArr,
  countmedia:state => state.countmedia,
}

const actions = {
  //获取用户信息 排行名单
  getUserInfo ({commit, state}, params) {
    axios.get(Url.userInfoUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        //计算勋章个数
        var count_m=0;
        for(var i=0;i<res.data.mediaArr.length;i++){
          if(res.data.mediaArr[i]==1){
            count_m++;
          }
        }
        commit('COUNTMEDIA', count_m);
      }else {
        //Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      //Dialog({commit, state},{time: 2000, msg: error});
    })

  },
  //领取勋章
  getMedia({commit, state}, params) {
    axios.post(Url.mediaUrl,params).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);

        //计算勋章个数
        var count_m=0;
        for(var i=0;i<res.data.mediaArr.length;i++){
          if(res.data.mediaArr[i]==1){
            count_m++;
          }
        }
        commit('COUNTMEDIA', count_m);

        console.log("勋章"+params.whichmedia);
        if(params.whichmedia==2){
          var nativejs=new codoonBrige();
          nativejs.jumpNative({
            type: 'webView',
            value: 'http://robam.qdsite.com/jd/'
          }, function() {
//          alert("从打开的新页面 回来了");
          });
        }else if(params.whichmedia==3){
          var nativejs=new codoonBrige();
          nativejs.jumpNative({
            type: 'webView',
            value: 'https://sale.jd.com/m/act/UpqsFmPOBdER.html'
          }, function() {
//          alert("从打开的新页面 回来了");
          });
        }
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //最终大奖
  getBigPrize({commit, state}, params) {
    axios.get(Url.bigprizeUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })

  },
  //每日一领
  goEvery({commit, state}, params) {
    axios.get(Url.everyUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //卡路里top10
  goTop({commit, state}, params) {
    axios.get(Url.topUrl).then((res)=>{
      if(res.status){
        commit('RANKARR', res.data);
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //提交预约信息
  baoming({commit, state}, params) {
    axios.post(Url.signupUrl,params).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        showbmToast({commit, state},{isShowyuyue:false});
        Dialog({commit, state},{time: 1500, msg: '收货信息提交成功！'});
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //抽奖
  goLot({commit, state}, params) {
    axios.post(Url.lotUrl,params).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        if(res.data.is_nowprize){//中奖
          whichToast({commit, state},{isShowToast:true,type:2});
        }
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      console.log(error)
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //显示报名弹框
  showBaominToast({commit, state}, params){
    showbmToast({commit, state}, params)
  },
  //显示抽奖类弹框
  whickToast({commit, state}, params){
    whichToast({commit, state}, params)
  },
  //对话框
  setDialog ({commit, state}, params) {

    Dialog({commit, state}, params)
  },
  //Loading GIF
  setMum ({commit}, boolean) {
    commit(types.ISMUM, boolean)
  }
}

const mutations = {
  //更新 actInfo
  [types.UPDATEUSERINFO] (state, playload) {
    state.actInfo = playload
  },
  //显示报名成功弹框
  [types.ISSHOWYUYUE] (state, playload) {
    state.isShowyuyue=playload.isShowyuyue
  },
  //显示弹框 isShowToast:false,type:0
  [types.TOASTS] (state, playload) {
    state.isShowToast=playload.isShowToast
    state.toastType=playload.type
  },
  //提示对话框
  [types.ISDIALOG] (state, playload) {
    state.isDialog = playload.isDialog
    state.msg = playload.msg
  },
  //Loading GIF
  [types.ISMUM] (state, boolean) {
    state.isMum = boolean
  },
  //更新 排行榜
  [types.RANKARR] (state, playload) {
    state.rankArr = playload
  },
  //更新 勋章个数
  [types.COUNTMEDIA] (state, playload) {
    state.countmedia = playload
  },
}
// 提示对话框time: Number,msg:  String
function Dialog({commit, state}, params) {
  let time = params.time || 1500
  commit(types.ISDIALOG, {isDialog: true, msg: params.msg})
  setTimeout(()=>{
    commit(types.ISDIALOG, {isDialog: false, msg: params.msg})
  }, time)
}


// 显示预约弹框
function showbmToast({commit, state}, params) {
  commit(types.ISSHOWYUYUE, params);
}

// 显示哪个弹框
function whichToast({commit, state}, params) {
  commit(types.TOASTS, params);
}

export default {
  state,
  getters,
  actions,
  mutations
}