// pages/mine/myMember/selectedMem.js
import * as minedata from '../../utils/minedata-format';
import * as mineService from '../../services/mine-service';
import { Base64 } from '../../utils/urlsafe-base64';
import * as AuthService from '../../services/auth-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],

    confirmText: '',
    confirmBoxHidden: true,

    // 上一页所选会员
    mems: [],

    // 本次所选的会籍
    thisMc: {},

    memIdentity: '',

    textInput: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.qsSetMems) {
      let qsmems = Base64.decode(options.qsSetMems);
      this.setData({
        mems: JSON.parse(qsmems)
      })
      console.log('选择的会员 ... ' + JSON.stringify(this.data.mems));
    }

    if (options.memIdentity) {
      this.setData({
        memIdentity: options.memIdentity
      })
    }

  },

  bindTextInputConfirm(e) {

    this.setData({
      textInput: e.detail.value
    })
    if (this.data.memIdentity == 'mc') {
      this.getMCCustList();
    } else if (this.data.memIdentity == 'pt') {
      this.getPTCustList();
    } else if (this.data.memIdentity == 'ptdjkhzl') {
      this.getPTCustInfoList();
    } 

  },

  // 会籍入口查询
  getMCCustList() {
    // 会籍 查询 会员列表
    mineService.queryMcs(this.data.textInput).then((result) => {

      console.log('queryMcs *** ' + JSON.stringify(result));
      this.setData({
        searchList: minedata.formatInfoTransferSelectMem(result.mcList)
      })

    }).catch((error) => {
      this.setData({
        searchList: []
      })
      console.log(error);
    })
  },

  // 教练入口查询
  getPTCustList() {
    // 教练 资料移交 查询 将要移交的教练
    mineService.queryPtList(this.data.textInput).then((result) => {

      console.log('queryPtList *** ' + JSON.stringify(result));
      this.setData({
        searchList: minedata.formatInfoTransferSelectMem(result.ptList)
      })

    }).catch((error) => {
      this.setData({
        searchList: []
      })
      console.log(error);
    })
  },

  // 教练入口 登记客户资料 查询
  getPTCustInfoList() {
    mineService.queryRegisterCustSelectList(this.data.textInput).then((result) => {

      console.log('queryRegisterCustSelectList *** ' + JSON.stringify(result));
      this.setData({
        searchList: minedata.formatInfoTransferSelectMem(result.memList)
      })

    }).catch((error) => {
      this.setData({
        searchList: []
      })
      console.log(error);
    })
  },

  bindSearchItemTap(e) {
    var index = +e.currentTarget.id;
    var searchList = this.data.searchList;

    console.log('searchList[index] .. ' + JSON.stringify(searchList[index]));

    this.setData({
      thisMc: searchList[index]
    })

    if (this.data.memIdentity != 'ptdjkhzl') {
      // 弹窗询问是否确定
      this.setData({
        confirmText: '确定将选择的会员移交给' + searchList[index].name + '吗？',
        confirmBoxHidden: false
      })
    } else {

      // 保存所选 会员
      wx.setStorageSync('ptdjkhzlSelectCust', this.data.thisMc);
      wx.navigateBack({
        delta: 1
      })
    }

  },

  bindConfirmBoxBtnTap(e) {
    var id = e.currentTarget.id;
    if (id == 'a') {

      var mems = this.data.mems;
      var idsArr = [];
      var ids = '';
      mems.forEach(item => {
        idsArr.push(item.memId);
      })
      ids = idsArr.join(',');
      var mcId = this.data.thisMc.id;

      console.log('mc ... ' + JSON.stringify(mcId));
      console.log('ids ... ' + JSON.stringify(ids));

      if (this.data.memIdentity == 'mc') {
    
        this.bindMcConfirm(mcId, ids);
      } else if (this.data.memIdentity == 'pt') {
      
        this.bindPtConfirm(mcId, ids);
      }

    } else {
      // 取消
      this.setData({
        confirmBoxHidden: true
      })
    }

    
  },

  // 会籍 -- 确定移交 上传
  bindMcConfirm(mcId, ids) {
    mineService.uploadInfoTransferConfirm(mcId, ids).then((result) => {

      this.setData({
        confirmBoxHidden: true
      })

      wx.navigateBack({
        delta: 1
      })

    }).catch((error) => {
      console.log(error);
    })
  },
  // 教练 -- 确定移交 上传
  bindPtConfirm(ptId, ids) {
    mineService.uploadCoachChangeConfirm(ptId, ids).then((result) => {

      this.setData({
        confirmBoxHidden: true
      })

      wx.navigateBack({
        delta: 1
      })

    }).catch((error) => {
      console.log(error);
    })
  }
})