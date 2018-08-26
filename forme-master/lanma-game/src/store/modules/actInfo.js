import axios from 'axios'
import Url from '../../assets/scripts/interface'
import * as types from '../mutations'

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
  isShowyuyue:false,//是否显示预约弹窗
  isShowToast:false,//是否显示抽奖类弹窗
  toastType:0,//显示哪个弹窗
  msg: '',
}

const getters = {
  actInfo: state => state.actInfo,
  isMum: state => state.isMum,
  isDialog: state => state.isDialog,
  msg: state => state.msg,
  isShowyuyue:state => state.isShowyuyue,
  isShowToast:state => state.isShowToast,
  toastType:state => state.toastType,
}

const actions = {
  //获取用户信息
  getUserInfo ({commit, state}, params) {
    // var mokeData= {
    //   "_id": "59292e020ca5e678e56749ec",
    //   "userInfo": {
    //     "height": 165,
    //     "nick": "公司1",
    //     "portrait": "https://img3.codoon.com/portrait5a008ed12ca64e5c8e509df23fecfc9d",
    //     "sex": "1",
    //     "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
    //     "weight": 55
    //   },
    //   "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
    //   "num_status": 0,
    //   "lanma_num": "",
    //   "virtual_num": "",
    //   "nowGrade": 0,
    //   "tximg": "",
    //   "__v": 0,
    //   "updateAt": "2017-05-27T07:42:58.369Z",
    //   "createAt": "2017-05-27T07:42:58.361Z",
    //   "isJoin": true
    // }
    // commit('UPDATEUSERINFO', mokeData);
    axios.get(Url.userInfoUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        if(res.data.tximg!=''){
          whichToast({commit, state},{isShowlot:true,type:3});
        }else {
          whichToast({commit, state},{isShowlot:true,type:1});
        }
      }else {
        Dialog({commit, state},{time: 2000, msg: '用户信息获取失败'});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: '用户信息获取失败.'});
    })

  },
  //上传图片，定妆照
  uploadImg({commit, state}, params) {
    axios.post(Url.imgUrl,params).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        //上传成功
        whichToast({commit, state},{isShowlot:true,type:2});
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //填写真的参赛号码
  tjTruenum({commit, state}, params) {
    axios.post(Url.trueNumUrl,params).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        Dialog({commit, state},{time: 2000, msg: '填写成功'});
        whichToast({commit, state},{isShowlot:true,type:3});
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //获取虚拟参赛号码
  getVirnum({commit, state}, params) {
    axios.get(Url.virNumUrl).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        whichToast({commit, state},{isShowlot:true,type:3});
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //上传图片，定妆照
  upGrade({commit, state}, params) {
    axios.post(Url.imgUrl,params).then((res)=>{
      if(res.status){
        commit('UPDATEUSERINFO', res.data);
        //上传成功
        whichToast({commit, state},{isShowlot:true,type:2});
      }else {
        Dialog({commit, state},{time: 2000, msg: res.description});
      }
    }).catch((error)=>{
      Dialog({commit, state},{time: 2000, msg: error});
    })
  },
  //显示哪个上传图片
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
}
// 提示对话框time: Number,msg:  String
function Dialog({commit, state}, params) {
  let time = params.time || 1500
  commit(types.ISDIALOG, {isDialog: true, msg: params.msg})
  setTimeout(()=>{
    commit(types.ISDIALOG, {isDialog: false, msg: params.msg})
  }, time)
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