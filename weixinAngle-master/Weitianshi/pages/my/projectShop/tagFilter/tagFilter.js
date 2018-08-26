let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as FilterModel from '../../../../utils/model/filterModel';
import * as ShareModel from '../../../../utils/model/shareModel';
Page({
  data:{
    filterList:[
      { 
        sortId:0,
        name: 'industry',
        mainTitle: '领域',
        subTitle: '* 最多选择5个',
        autoLength:false,
        tagName:'industry_name',
        tagId:'industry_id',
        arry: []
      },
      { 
        sortId:1,
        name:'stage',
        mainTitle:'轮次',
        subTitle:'* 最多选择5个',
        autoLength:false,
        tagName:'stage_name',
        tagId:'stage_id',
        arry:[]
      },
      {
        sortId: 2,
        name:'scale',
        mainTitle:'金额',
        subTitle:'* 最多选择5个',
        autoLength:true,
        tagName:'scale_money',
        tagId:'scale_id',
        arry:[]
      },
      {
        sortId: 3,
        name:'hotCity',
        mainTitle:'地区',
        subTitle: '* 最多选择5个',
        autoLength: false,
        tagName: 'area_title',
        tagId: 'area_id',
        arry:[]
      }
    ],
    SearchInit: FilterModel.data,
    SearchData:{
      industry:[],
      stage:[],
      scale:[],
      hotCity:[]
    },
    nonet: true
  },
  onLoad(){
    this._initData();
    let that = this;
    app.netWorkChange(that)
  },
  // 初始化数据
  _initData(){
    let filterList = this.data.filterList;
    filterList[0].arry = wx.getStorageSync('industry');
    filterList[1].arry = wx.getStorageSync('stage');
    filterList[2].arry = wx.getStorageSync('scale');
    filterList[3].arry = wx.getStorageSync('hotCity');
    // 根据缓存重新标定check属性值
    FilterModel.page_tagFilterInit(this)
    this.setData({
      filterList: filterList
    })
  },
  // 标签选择
  tagsCheck(e){
    FilterModel.page_tagsCheck(e,this);
  },
  // 重置
  reset(){
    FilterModel.page_reset(this)
  },
  // 筛选确定
  certain(){
    FilterModel.page_certain(this)
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500)
  }
})