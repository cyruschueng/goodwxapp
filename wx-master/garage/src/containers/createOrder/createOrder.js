//index.js
//获取应用实例
var validator = require('../../../utils/validator.js').validator;
var validates = require('../../../utils/validator.js').validates;
var ajax = require('../../../utils/util.js').ajax;
var deepClone = require('../../../utils/util.js').deepClone;
var sliderSelf = require('../../../component/sliderSelf/sliderSelf.js');
var toastSelf = require('../../../component/selfToast/selfToast.js')
var app = getApp()
var trademark=require('../../assets/js/brandAutoTradeMark.js')
import Colin from "../../../src/assets/js/public.js"
var codeTimer=''
var saveTimer=''
var submitFlag=true;
Page(Object.assign({
  data: Object.assign({
    step: 0,
    status:1, //1新建 2修改
    id: '',
    needTypeItems: [
      {
        name: '维修',
        checked: true
      }, {
        name: '保养',
        checked: false
      }, {
        name: '其他',
        checked: false
      }
    ],
    gender: [
      {
        name: '1',
        value: '先生',
        checked: true
      }, {
        name: '2',
        value: '女士',
        checked: false
      }
    ],
    oldDevice:[{
       name:'0',
       value:'不带走',
       checked:true
    },{
       name:'1',
       value:'带走',
       checked:false
    }],
    washCar:[
      {
        name:'0',
        value:'不洗车',
        checked:true
      },{
        name:'1',
        value:'洗车',
        checked:false
      }
    ],
    checkModel:[

    ],
    checkList:{},
    textCount0: 0,
    textCount1: 0,
    textCount2: 0,
    textCount3: 0,
    checkResult: '异常项目：0项',
    checkStatus:0,  //0正常 1有异常
    form_step1: {
      autoModelChnName: '',
      vehicleLicenceCode: '',
      mileage: '',
      oil: 50,
      vehicleFrameNo: '',
      userName: '',
      sex: 1,
      contactMobile: '',
      serviceItems: ["维修"],
      description: '',
      customServiceItem: '',
      checkPhotos: [],
      vehicleFrameNoId:[],
      insuranceExpireDate:'请选择',
      nextMaintainDate:'请选择',
      provinceCode:'',
      takeOldDevice:0,
      washCar:0
    },

    showVehicleFrameNoInput:false,
    qrcode:'',
    scanCodeStatus:'0',
    form_step2: {},
    form_step3: {
      suggestion: '',
      checkResultDescription:'',
      itemList: []
    },
    startDate:new Date().getFullYear()+'-'+(Number(new Date().getMonth())+1)+'-'+new Date().getDate(),
    form_step4: {
      finishDate: '请选择',
      totalMaterialPrice: 0,
      totalWorkingPrice: 0,
      totalPrice: 0,
      planItemList: [
        {
          showFlag: true,
          planItemName: '',
          materialPrice: 0,
          workingPrice: 0,
          remark: ''
        }
      ] // planItemName,materialPrice,workingPrice,remark
    },
    form_step1_flag: false,
    form_step2_flag: false,
    form_step3_flag: false,
    form_step4_flag: false,
    showProvincePlant:false,
    autoFocus:false,
    cityNameShorts:['京','沪','浙','苏','粤','鲁','晋','冀','豫','川','渝','辽','吉','黑','皖','鄂','湘','赣','闽','陕','甘','宁','蒙','津','贵','云','桂','琼','青','新','藏'],
    templateCode: '',
    windowHeight: 0,
    windowWidth: 0,
    showCarSeries:false,
    showCarModel:false,
    tradeMarkHot:[],
    tradeMarkAll:[],
    brandAutoSeries:[],
    carModel:'',
  }, toastSelf.ToastData),
  inputChange(e) {
    let key = e.currentTarget.dataset.key,
      value = e.detail.value;
    this.updateFormData({[key]: value});
    if(!!~key.indexOf('vehicleLicenceCode')&&value.length==6){
        this._queryReceiveCarUserInfo(value)
    }
    if (! !~key.indexOf('materialPrice')) {
      var totalPrice = 0,
        totalMaterialPrice = 0
      this.data.form_step4.planItemList.map(function(ele) {
        totalPrice += Number(ele.materialPrice) + Number(ele.workingPrice);
        totalMaterialPrice += Number(ele.materialPrice);
      })
      this.setData({'form_step4.totalPrice': totalPrice, 'form_step4.totalMaterialPrice': totalMaterialPrice})
    }
    if (! !~key.indexOf('workingPrice')) {
      var totalPrice = 0,
        totalWorkingPrice = 0
      this.data.form_step4.planItemList.map(function(ele) {
        totalPrice += Number(ele.materialPrice) + Number(ele.workingPrice);
        totalWorkingPrice += Number(ele.workingPrice);
      })
      this.setData({'form_step4.totalPrice': totalPrice, 'form_step4.totalWorkingPrice': totalWorkingPrice})
    }
  },
  inputFocus(e){
    let key = e.currentTarget.dataset.key,
      value = e.detail.value;
      if(value==0){
          this.setData({[key]:''})
      }
  },
  bindBlur(e){
    let key = e.currentTarget.dataset.key,
      value = e.detail.value;
      if(value==''){
          this.updateFormData({[key]:0})
      }
  },
  genderChange(e) {
    var value = e.detail.value;
    let key = e.currentTarget.dataset.key;
    this.updateFormData({[key]: value})
  },
  modelChange(e){
    var value = e.detail.value;
    this.setData({'form_step3.itemList': this.data.checkList[value],'templateCode':value})
    this.updateCheckResult();
  },
  radioChange(e) {
    let key = e.currentTarget.dataset.key,
      index = e.currentTarget.dataset.index,
      value = e.detail.value,
      name = key + '[' + index + '].' + 'normal',
      remark = key + '[' + index + '].' + 'remark',
      photo = key + '[' + index + '].' + 'abnormalPhotoList';

    //选择正常，清除备注内容
    this.setData(
      value == 1
      ? {
        [name]: value,
        [remark]: '',
        [photo]: ''
      }
      : {
        [name]: value
      })
    this.updateCheckResult();
  },
  updateCheckResult(){
    var checkResult = '',
        checkStatus = 0 ,
        abnormalCount = 0;
    //遍历异常项
    this.data.form_step3.itemList.map((ele, i) => {
      if (ele.normal == 2) {
        if (abnormalCount > 0) {
          checkResult += '、' + ele.itemName;
        } else {
          checkResult += ele.itemName;
        }
        abnormalCount++;
      }
    })
    if (abnormalCount > 0) {
      checkResult ='异常项目：'+abnormalCount+'项（'+ checkResult+'）';
      checkStatus = 1;
    } else {
      checkResult = "异常项目：0项"
    }
    this.setData({checkResult: checkResult,'checkStatus':checkStatus});
  },
  checkboxChange(e) {
    let value = e.detail
        ? e.detail.value
        : e,
      flag = false;

    let needTypeItems = [
      {
        name: '维修',
        checked: false
      }, {
        name: '保养',
        checked: false
      }, {
        name: '其他',
        checked: false
      }
    ];

    for (var i = 0, len = needTypeItems.length; i < len; i++) {
      for (var j = 0, _len = value.length; j < _len; j++) {
        if (needTypeItems[i].name === value[j]) {
          needTypeItems[i].checked = true;
          break;
        }
      }
    }
    this.updateFormData({"form_step1.serviceItems": value, 'needTypeItems': needTypeItems})
  },
  textareaChange(e) {
    if (e) {
      let key = e.currentTarget.dataset.key,
        value = e.detail.value;
      this.setData({[key]: value.length});
      switch (key) {
        case 'textCount0':
          this.updateFormData({"form_step1.customServiceItem": value})
          break;
        case 'textCount1':
          this.updateFormData({"form_step1.description": value})
          break;
        case 'textCount2':
          this.updateFormData({"form_step3.suggestion": value})
          break;
        case 'textCount3':
          this.updateFormData({"form_step3.estimatePrice": value})
          break;
      }
    } else {
      this.setData({
        textCount0: this.data.form_step1.customServiceItem
          ? this.data.form_step1.customServiceItem.length
          : 0,
        textCount1: this.data.form_step1.description
          ? this.data.form_step1.description.length
          : 0,
        textCount2: this.data.form_step3.suggestion
          ? this.data.form_step3.suggestion.length
          : 0,
        textCount3: this.data.form_step3.estimatePrice
          ? this.data.form_step3.estimatePrice.length
          : 0
      });
    }

  },
  previewImg(e) {
    var i = e.currentTarget.dataset.index,
      key = e.currentTarget.dataset.key,
      _key = key.split('.'),
      j = e.currentTarget.dataset.target,
      name='',
      abnormalPhotoList = [];
    if (_key[0] === 'form_step1') {
      abnormalPhotoList = this.data[_key[0]][_key[1]],
      name = key;
    } else {
      abnormalPhotoList = this.data[_key[0]][_key[1]][index].abnormalPhotoList,
      name = key + '[' + index + '].' + 'abnormalPhotoList';
    }
    var photos = [];
    abnormalPhotoList.map(function(ele) {
      photos.push(ele.urlBig)
    })
    wx.previewImage({current: abnormalPhotoList[j].urlBig, urls: photos})
  },
  uploadImg(e) {
    let that = this,
      name='',
      key = e.currentTarget.dataset.key,
      _key = key.split('.'),
      index = e.currentTarget.dataset.index,
      abnormalPhotoList = [];

    if (_key[0] === 'form_step1') {
      abnormalPhotoList = this.data[_key[0]][_key[1]],
      name = key;
    } else {
      abnormalPhotoList = this.data[_key[0]][_key[1]][index].abnormalPhotoList,
      name = key + '[' + index + '].' + 'abnormalPhotoList';
    }

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [
        'original', 'compressed'
      ], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [
        'album', 'camera'
      ], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.upload(that, abnormalPhotoList, name, tempFilePaths);
        //abnormalPhotos.push(tempFilePaths[0])

        //that.setData({[name]: abnormalPhotos})
        // console.log(that.data.checkItems[0])
      }
    })
  },
  clearImg(e) {
    let that = this,
      key = e.currentTarget.dataset.key,
      index = e.currentTarget.dataset.index,
      _key = key.split('.'),
      target = e.currentTarget.dataset.target,
      abnormalPhotoList = [],
      name='';
    if (_key[0] === 'form_step1') {
      abnormalPhotoList = this.data[_key[0]][_key[1]],
      name = key;
    } else {
      abnormalPhotoList = this.data[_key[0]][_key[1]][index].abnormalPhotoList,
      name = key + '[' + index + '].' + 'abnormalPhotoList';
    }
    //console.log(this.data[_key[0]][_key[1]][index].abnormalPhotoList)
    abnormalPhotoList.splice(target, 1);
    this.updateFormData({[name]: abnormalPhotoList})
  },
  _getCheckItems() {
    let self = this;
    ajax({
      url: '/do/garageAdmin/receiveCarOrder/queryTemplateSetting',
      data: {

      },
      success: function(res) {
        //console.log(res.resultObject);
        var checkModel=[];
        var checkList={}

        res.resultObject.templateList.map((ele,i)=>{
             if(self.data.form_step3.itemList.length && ele.templateCode===self.data.templateCode){
                 checkList[ele.templateCode]=self.data.form_step3.itemList;
             }else{
                 checkList[ele.templateCode]=ele.itemList.map((_ele, i) => {
                   return Object.assign(_ele, {abnormalPhotoList:[],normal: 1})
                 });
             }

             if(!self.data.templateCode && ele.selected){
                  self.setData({
                     templateCode:ele.templateCode
                  })
             }
             var model=ele.templateCode==='BASE'?{name:'BASE',value:'基础版('+ele.itemList.length+'项)',checked:ele.templateCode===self.data.templateCode}:{name:'STANDARD',value:'标准版('+ele.itemList.length+'项)',checked:ele.templateCode===self.data.templateCode}
             checkModel.push(model)
        })
        self.updateFormData({'checkList':checkList,checkModel:checkModel,'form_step3.itemList': checkList[self.data.templateCode]})
      }
    })
  },
  switchQuoteItem(e) {
    var index = e.currentTarget.dataset.index;
    var flag = this.data.form_step4.planItemList[index].showFlag;
    this.setData({
      ['form_step4.planItemList[' + index + '].showFlag']: !flag
    })
  },
  deleteQuoteItem(e) {
    var self=this;
    wx.showModal({
      title:'确定要删除该项目吗?',
      content:'删除后无法恢复',
      confirmText: '确定',
      confirmColor: '#368fdb',
      success: function(res) {
        if(res.confirm) {
          var index = e.currentTarget.dataset.index,
             totalPrice = 0,
             totalMaterialPrice=0,
             totalWorkingPrice = 0;
             self.data.form_step4.planItemList.splice(index, 1)
             self.data.form_step4.planItemList.map(function(ele) {
                totalPrice += Number(ele.materialPrice) + Number(ele.workingPrice);
                totalWorkingPrice += Number(ele.workingPrice);
                totalMaterialPrice+= Number(ele.materialPrice);
             })
             self.setData({'form_step4.planItemList': self.data.form_step4.planItemList,'form_step4.totalPrice': totalPrice, 'form_step4.totalWorkingPrice': totalWorkingPrice})
        }
      }
    });
  },
  addQuoteItem() {
    var item = [
      {
        showFlag: true,
        planItemName: '',
        materialPrice: 0,
        workingPrice: 0,
        remark: ''
      }
    ];
    this.setData({'form_step4.planItemList': this.data.form_step4.planItemList.concat(item)})
  },
  saveStepInfo(){
     var self=this;
     clearInterval(saveTimer)
     saveTimer=setInterval(function(){
         if(self.data.step=='3'){
            self.submitStep3('0')
         }else if(self.data.step=='4'){
            self.submitStep4(null,'0')
         }
     },60000)
  },
  _goHome(){
    wx.switchTab({
			url: '/src/containers/orderList/orderList'
		});
  },
  submit(data, success) {
    if(submitFlag){
      submitFlag=false;
      ajax({
        url: '/do/garageAdmin/receiveCarOrder/saveReceiveCarOrder',
        data: {
          formData: JSON.stringify(data)
        },
        success: success,
        complete:function(){
            setTimeout(function(){
              submitFlag=true;
            },100)

        }
      });
      wx.setStorageSync("refreshListFlag", true);
    }
  },
  _prevStep(e) {
    var step=e.currentTarget.dataset.step;
    this.setData({step: step})
    if(step=='1'){
        clearInterval(codeTimer)
    }
  },
  submitStep1() {
    if (!this.data.form_step1_flag) {
      return;
    }
    var self = this,
      data = deepClone(this.data.form_step1);
    data.oil = ~~(+ this.data._slider_self_.target * 100);
    this.data.form_step1.oil = data.oil;
    data.saveType=typeof saveType!=='undefined'?0:1;
    if (!this.data.needTypeItems[2].checked) { //如果needType第三项其他没点选时，customServiceItem不提交
      data.customServiceItem = "";
    }
    data.id = this.data.id;
    data.orderStep=1;
    data.serviceItems=data.serviceItems.join(',');
    data.checkPhotos=Array.isArray(data.checkPhotos)?data.checkPhotos.map((ele)=>ele.id).join(','):'';
    data.vehicleFrameNoId=Array.isArray(data.vehicleFrameNoId)?data.vehicleFrameNoId.map((ele)=>ele.id).join(','):'';
    data.templateCode = this.data.templateCode;
    data.insuranceExpireDate=='请选择'?data.insuranceExpireDate='':'';
    data.nextMaintainDate=='请选择'?data.nextMaintainDate='':'';
    data.vehicleLicenceCode=data.provinceCode+data.vehicleLicenceCode;
    if(this.data.showVehicleFrameNoInput){
        data.vehicleFrameNoId=''
    }else{
        data.vehicleFrameNo=''
    }
    this.submit(data, function(res) {
      if (res.resultCode == '1' && res.resultObject.id) {
        wx.removeStorageSync('formStep1')
        var step=res.resultObject.status=='2'?3:2;
        if(step==2){
          self._getQrcode(res.resultObject.id)
        }
        self.setData({id: res.resultObject.id, step: step})
      }
    })
  },
  submitStep2(saveType) {
    if (this.data.scanCodeStatus!='3') {
      return;
    }
    var self = this,
      data = Object.assign({}, deepClone(this.data.form_step2));
    data.orderStep = 2;
    data.id = this.data.id;
    data.saveType=saveType=='0'?0:1;
    this.submit(data, function(res) {
      if (res.resultCode == '1' &&data.saveType=='1') {
        self.setData({step: 3})

            clearInterval(saveTimer)
            self.saveStepInfo()

      }
    })
  },
  submitStep3(saveType) {
    if (!this.data.form_step3_flag) {
      return;
    }
    var self = this,
    data = Object.assign({}, deepClone(this.data.form_step3));
    data.orderStep = 3;
    data.saveType=saveType=='0'?0:1;
    data.templateCode=this.data.templateCode;
    data.itemList.map(function(ele) {
      if (ele.abnormalPhotoList != null && typeof ele.abnormalPhotoList === 'object' && ele.abnormalPhotoList.length) {
        let abnormalPhotos = ''
        ele.abnormalPhotoList.map(function(_ele) {
          abnormalPhotos += abnormalPhotos
            ? ',' + _ele.id
            : _ele.id;
        })
        ele.abnormalPhotos = abnormalPhotos
        return ele
      } else {
        ele.abnormalPhotos = ''
        return ele
      }
    })
    data.id = this.data.id;
    this.submit(data, function(res) {
      if (res.resultCode == '1'&&data.saveType=='1') {
        self.setData({step: 4})

            clearInterval(saveTimer)
            self.saveStepInfo()

      }
    })
  },
  submitStep4(e,saveType) {
    if(!this.data.form_step4_flag){
       return;
    }
    var self = this,
      data = Object.assign({}, deepClone(this.data.form_step4));
    data.orderStep = 4;
    data.saveType=saveType=='0'?0:1;
    data.id = this.data.id;
    data.checkResultDescription=this.data.form_step3.checkResultDescription;
    data.formId = e?e.detail.formId:'';
    var contactMobile = this.data.form_step1.contactMobile;
    this.submit(data, function(res) {
      if (res.resultCode == '1' && data.saveType=='1') {
        wx.redirectTo({
          url: '/src/containers/createSuccessed/createSuccessed?contactMobile=' + contactMobile + '&id=' + data.id
        })
      }
    })
  },
  updateFormData(options) { //监听form表单变化
    let reg = /^form_step[\d]/;
    this.setData(Object.assign({}, options))
    for (let key in options) {
      let res = key.match(reg) || [];
      if (res.length) {
        this.emptyJudgement(res[0])
      }
    }
  },
  emptyJudgement(key) {
    var that = this,
      form_flag = {},
      checkItems = {
        form_step1_checkItems: [
          'autoModelChnName',
          'vehicleLicenceCode',
          'provinceCode',
          'mileage',
          'serviceItems',
          'userName'
        ],
        form_step2_checkItems: [''],
        form_step3_checkItems: [

        ],
        form_step4_checkItems: [
          'totalPrice',
          'finishDate', {
            'planItemList': ['planItemName', 'materialPrice', 'workingPrice']
          }
        ]
      }
    form_flag[key + '_flag'] = true;
    checkItems[key + '_checkItems'].forEach(function(_key, index) {
      if (typeof _key === 'object') {
        for (var __key in _key) {
          var res = that.data[key][__key];
          if (Array.isArray(res)) {
            res.forEach(function(ele, i) {
              _key[__key].forEach(function(_ele) {
                if (!validates.noEmpty(res[i][_ele])) {
                  form_flag[key + '_flag'] = false
                }
              })

            })
          }
        }
      } else {
        switch (_key) {
          case 'contactMobile':
            if (!validates.telephone(that.data[key][_key])) {
              form_flag[key + '_flag'] = false
            }
            break;
          default:
            if (!validates.noEmpty(that.data[key][_key])) {
              form_flag[key + '_flag'] = false
            }
            break;
        }

      }
    })
    this.setData(form_flag);
    if (key === 'form_step1'&&this.data.status=='1') {
      wx.setStorageSync('formStep1', JSON.stringify(this.data.form_step1))
    }
  },
  _getQrcode(id){
     var that=this;
     ajax({
        url:'/do/common/commonInfo/getCustomerReceiveCarQrcode',
        data:{
           idOrder:id
        },
        success:function(res){
            if(res.resultObject.midImgUrl){
               that.setData({
                   qrcode:res.resultObject.midImgUrl
               })
               that._scanCode(id);
            }
        }
     })
  },
  _scanCode(id) {
    var that=this;
    clearInterval(codeTimer)
    codeTimer=setInterval(function(){
        getScanRes()
    },1000)
    function getScanRes(){
      ajax({
         url:'/do/garageAdmin/receiveCarOrder/queryReceiverCarOrderStatus',
         data:{id:id},
         unloading:true,
         success:function(res){
            if(res.resultCode=='1'){
                that.setData({
                  scanCodeStatus:res.resultObject.scanStatus
                })
                switch(res.resultObject.scanStatus){
                  case '2':
                  //已扫码待同意

                  break;
                  case '3':
                  //已同意
                  clearInterval(codeTimer)
                  break;
                  case '4':
                    //不同意
                  clearInterval(codeTimer)
                  break;
                }
            }
         }
      })
    }
  },
  bindDateChange(e){
     let key = e.currentTarget.dataset.key,
         value = e.detail.value;
     this.updateFormData({[key]: value});

  },
  _getOrderDetail(id,_step) {
    //ec4989d385984d16922f8c80eb074802
      this.setData({'id': id});
      let self = this;
      let scale = app.globalData.systemInfo.screenWidth / 750;
      ajax({
        url: '/do/garageAdmin/receiveCarOrder/queryOrderDetail',
        data: {
          id: id
        },
        success: function(res) {
          let {
            autoModelChnName,
            vehicleLicenceCode,
            mileage,
            oil,
            sex,
            vehicleFrameNo,
            orderStep,
            userName,
            contactMobile,
            serviceItems,
            customServiceItem,
            description,
            suggestion,
            itemList,
            estimatePrice,
            planItemList,
            totalMaterialPrice,
            totalWorkingPrice,
            totalPrice,
            checkResultDescription,
            status,
            scanStatus,
            checkPhotoList,
            vehicleFrameNoIdPhoto,
            nextMaintainDate,
            finishDateStr,
            insuranceExpireDate,
            vehicleFrameNoId
          } = res.resultObject;

          var form_step1 = Object.assign({},self.data.form_step1, {
            'autoModelChnName': autoModelChnName,
            'vehicleLicenceCode': vehicleLicenceCode.slice(1),
            'provinceCode':vehicleLicenceCode[0],
            'mileage': mileage,
            'oil': oil,
            'sex':sex==2?sex:1,
            'vehicleFrameNo': vehicleFrameNo,
            'userName': userName,
            'contactMobile': contactMobile,
            'serviceItems': serviceItems,
            'customServiceItem': customServiceItem,
            'description': description,
            'checkPhotos':checkPhotoList,
            'nextMaintainDate':nextMaintainDate,
            'insuranceExpireDate':insuranceExpireDate,
            'vehicleFrameNoId':vehicleFrameNoIdPhoto?[vehicleFrameNoIdPhoto]:[]
          });
          if(vehicleFrameNo){
              self.setData({
                  showVehicleFrameNoInput:true
              })
          }
          if(sex==2){
             self.setData({
                gender:[{name: '1',value: '先生',checked: false}, {name: '2',value: '女士',checked: true}]
             })
          }
          var slider_target = oil / 100;
          var form_step3 = Object.assign({},{suggestion: suggestion, itemList: itemList,checkResultDescription:checkResultDescription})
          var form_step4=Object.assign({},{checkResultDescription:checkResultDescription,planItemList:planItemList.length?planItemList.map(function(ele){return Object.assign(ele,{showFlag:true})}):self.data.form_step4.planItemList,totalMaterialPrice:totalMaterialPrice||0,totalWorkingPrice:totalWorkingPrice||0,totalPrice:totalPrice||0,finishDate:finishDateStr||'请选择'})
          if(_step){
             var step=_step
          }else{
            var step=status=='1'?2:status=='2'?3:status=='3'?4:status=='4'?1:1
          }


          self.updateFormData({
            'step': step,
            'form_step1': form_step1,
            '_slider_self_.offsetLeft': Math.floor(slider_target * self.data._slider_self_.width - scale * 24),
            '_slider_self_.target': slider_target,
            'form_step3': form_step3,
            'form_step4':form_step4,
            templateCode: res.resultObject.templateCode,
            status:status
          });


          //if (!itemList.length) {
            self._getCheckItems()
          //}
          if(step>2){
            self.saveStepInfo()
          }
          if(status==1){
             if(scanStatus!='1'&&scanStatus!='2'){
               self._scanCode(id)
             }else{
                self._getQrcode(id)
             }

          }
          self.setData({
            scanCodeStatus:res.resultObject.scanStatus
          })
          self.textareaChange();
          if (serviceItems) {
            self.checkboxChange(serviceItems.split(','))
          }
          self.updateCheckResult();
        //wx.showToast({title: '正在上传中'})
        }
      })
  },
  onHide:function(){
      clearInterval(codeTimer)
      clearInterval(saveTimer)
  },
  onUnload:function(){
      clearInterval(codeTimer)
      clearInterval(saveTimer)
  },
  onLoad: function(options) {
    var that = this,form1={};
    //渲染页面
    wx.getSystemInfo({
      success: function(res) {
        that.setData({windowHeight: res.windowHeight, windowWidth: res.windowWidth})
      }
    });
    wx.setNavigationBarTitle({title: '接车开单'});

    if (options.id) {
      this.setData({
         status:2
      })
      this._getOrderDetail(options.id,options.step||'');
    } else {
      this.setData({step: 1});
      form1=JSON.parse(wx.getStorageSync('formStep1')||"{}");
      if(form1.sex==2){
         this.setData({
            gender:[{name: '1',value: '先生',checked: false}, {name: '2',value: '女士',checked: true}]
         })
      }
      this.updateFormData({
         'form_step1':Object.assign({},this.data.form_step1,form1)
      })
      if (form1.serviceItems) {
        this.checkboxChange(form1.serviceItems)

      }
      if(!form1.vehicleLicenceCode){
         this._queryGarageCityNameShort()
      }
      this._getCheckItems();
    }

    let scale = app.globalData.systemInfo.screenWidth / 750;
    this.setData({
      '_slider_self_.width': scale * 492,
      '_slider_self_.target': 0
    });
    let slider_target = (form1.oil||50) / 100;
    //console.log(slider_target * this.data._slider_self_.width)
    this.setData({
      '_slider_self_.offsetLeft': Math.floor(slider_target * this.data._slider_self_.width - scale * 23),
      '_slider_self_.target': slider_target,
      '_slider_self_.percentage': (form1.oil||50) + '%'
    });
  },

  upload(page, abnormalPhotoList, key, path) {
    this.showToast({title: "正在上传中"})
    var self = this;
    var token = wx.getStorageSync('token');
    wx.uploadFile({
      url: Colin.exChangeUrl("/do/garageAdmin/receiveCarOrder/uploadImage"),
      filePath: path[0],
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        "token": token
      },
      formData: {},
      success: function(res) {
        if (res.statusCode != 200) {
          wx.showModal({title: '提示', content: '上传失败', showCancel: false, confirmColor: "#368fdb"});
          self.hideToast()
          return;
        }
        var data = JSON.parse(res.data);

        abnormalPhotoList.push({urlSmall: path[0], urlBig: path[0], id: data.resultObject.idPhoto})
        page.updateFormData({ //上传成功修改显示头像
          [key]: abnormalPhotoList
        })
        setTimeout(function() {
          self.hideToast() //隐藏Toast
        }, 500)

      },
      fail: function(e) {
        wx.hideToast(); //隐藏Toast
        wx.showModal({title: '提示', content: '上传失败', showCancel: false, confirmColor: "#368fdb"})
      },
      complete: function() {}
    })
  },
  _showVehicleFrameNoInput(){

     this.setData({
         showVehicleFrameNoInput:true,
         autoFocus:true
     })
  },
  _closeInput(e){
      var key=e.currentTarget.dataset.key;
      this.setData({
          [key]:''
      })
      if(key=="form_step1.vehicleFrameNo"){
        this.setData({
            showVehicleFrameNoInput:false
        })
      }
  },
  _showProvincePlant(){
        this.setData({
            showProvincePlant:!this.data.showProvincePlant
        })
  },
  _queryCityNameShorts(fn){
     let self=this;
     ajax({
         url:'/do/admin/princePlan/queryNeedList',
         success:function(res){
            console.log(res)
            if(fn)fn();
         }
     })
  },
  _queryGarageCityNameShort(){
      let self=this;
      ajax({
          url:'/do/garageAdmin/receiveCarOrder/queryGarageCityNameShort',
          success:function(res){
              if(res.resultObject.cityNameShort){
                self.updateFormData({'form_step1.provinceCode':res.resultObject.cityNameShort[0],'form_step1.vehicleLicenceCode':res.resultObject.cityNameShort[1]})
              }

          }
      })
  },
  _selectProvinceCode(e){
     var code=e.target.dataset.code;
     this.setData({
         showProvincePlant:false
     })
     this.updateFormData({'form_step1.provinceCode':code})
  },
  _queryReceiveCarUserInfo(licence){
     var self=this;
     ajax({
         url:'/do/garageAdmin/receiveCarOrder/queryReceiveCarUserInfo',
         data:{vehicleLicenceCode:this.data.form_step1.provinceCode+licence},
         success:function(res){
              console.log(res)
              if(res.resultCode==1){
                let {
                  autoModelChnName,
                  sex,
                  userName,
                  contactMobile,
                  insuranceExpireDate,
                  nextMaintainDate,
                } = res.resultObject;

                var form_step1 = Object.assign({},self.data.form_step1, {
                  'autoModelChnName': autoModelChnName,
                  'sex':sex==1?sex:2,
                  'userName': userName,
                  'contactMobile': contactMobile,
                  'nextMaintainDate':nextMaintainDate||'请选择',
                  'insuranceExpireDate':insuranceExpireDate||'请选择',
                });
                if(sex==2){
                   self.setData({
                      gender:[{name: '1',value: '先生',checked: false}, {name: '2',value: '女士',checked: true}]
                   })
                }
                self.updateFormData({
                  'form_step1': form_step1,
                });
              }
         },
         unloading:true
     })
  },
  showModal(e){
     var dataset=e.currentTarget.dataset,
         key=dataset.key,
         cb=dataset.cb;

     if(key==='showCarModel'&&!this.data.tradeMarkHot.length){
        var regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d\.\-\(\)\w]+)\|(\w+)\|(\w)+\|(\w)\w*$/;
        let tradeMarkHot=[]
        trademark.hotTradeMarkId.forEach((ele)=>{
            var match = regEx.exec(ele);
            tradeMarkHot.push({name:match[1],id:match[2]})
        })
        this.setData({tradeMarkHot:tradeMarkHot})
     }
     this.setData({[key]:true})
     if(cb)this[cb]()
  },
  closeModal(e){
    var dataset=e.currentTarget.dataset,
        key=dataset.key,
        cb=dataset.cb;
    this.setData({[key]:false})
    if(cb)this[cb]()
  },
  backToCarSeries(){
    this.setData({'showCarModel':true,'showCarSeries':false})
  },
  queryCarModel(){
    var regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d\.\-\(\)\w]+)\|(\w+)\|(\w)+\|(\w)\w*$/;
    let tradeMarkAll={},_tradeMarkAll=[];
    trademark.allTradeMarkId.forEach((ele)=>{
        var match = regEx.exec(ele);
        tradeMarkAll[match[4]]?tradeMarkAll[match[4]].push({name:match[1],id:match[2]}):tradeMarkAll[match[4]]=new Array({name:match[1],id:match[2]})
    })
    Object.keys(tradeMarkAll).sort().forEach((ele)=>{
        _tradeMarkAll.push({key:ele.toUpperCase(),list:tradeMarkAll[ele]})
    })

    this.setData({tradeMarkAll:_tradeMarkAll})
  },
  handleCarModelChoosed(e){
     var id=e.currentTarget.dataset.id,
         name=e.currentTarget.dataset.name,
         self=this;
     ajax({
         url:'/do/garageAdmin/receiveCarOrder/queryBrandAutoSeries',
         data:{
             trademarkId:id
         },
         success:function(res){

             self.setData({'carModel':name,'brandAutoSeries':res.resultObject.brandAutoSeriesList,'showCarModel':false,'showCarSeries':true})
         }
     })

  },
  handleCarSeriesChoosed(e){
      var id=e.currentTarget.dataset.id;
  
      this.updateFormData({"form_step1.autoModelChnName": this.data.carModel+id})
      this.setData({
        'showCarSeries':false,
        'carModel':''
      })
  }
}, sliderSelf.SliderSelf, toastSelf.ToastSelf))
