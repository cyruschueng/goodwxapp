Page({
 data: {
  city: ['成都市','绵阳市','内江市','南充市','乐山市','自贡市','泸州市','德阳市','广元市','遂宁市','眉山市','宜宾市','广安市','达州市','雅安市','巴中市','资阳市','攀枝花市','凉山彝族自治州','甘孜藏族自治州','阿坝藏族羌族自治州'],
  indexCity: 0,
  maleCodes: ["男士", "女士"],
  maleCodeIndex: 0,
  files: [],
  picfile:[],
  msg:"",
  hidden:false,
  inputName:'',
  inputNum:'',
  inputCon:''
 },
 bindInputName:function(e){
     this.setData({
       inputName:e.detail.value
     })
  },
 bindInputNum:function(e){
     this.setData({
       inputNum:e.detail.value, 
     })
  },
 bindInputCon:function(e){
     this.setData({
       inputCon:e.detail.value
     })
  },
 clearInput:function(){
    this.setData({
        inputName:'',
        inputNum:'',
        inputCon:'',
        indexCity:0,
        maleCodeIndex:0,
        picfile:[],
        files:[]
     })
  },
 bindmaleCodeChange: function(e){
     this.setData({
         maleCodeIndex: e.detail.value
    })
 },
 bindCityChange:function(e){
     this.setData({
         indexCity: e.detail.value
    })
 },
 chooseImage: function (e) {
     var that = this;
     wx.chooseImage({
         count:5,
         sizeType: ['original', 'compressed'], 
         sourceType: ['album', 'camera'], 
         success: function (res) {
             var tempFilePaths  = res.tempFilePaths;
             for (var i = 0; i < tempFilePaths.length; i++) {
                 wx.uploadFile({
                    url: getApp().URLS+'upload/img', 
                    filePath: tempFilePaths[i],
                    name: 'file',
                    header:{"content-type": "multipart/form-data"},
                    formData:{
                        'ns':'mqrx'
                    },
                    success: function(res){
                        if(that.data.files.length<5){
                        var returnData = JSON.parse(res.data);
                        that.setData({
                            picfile:that.data.picfile.concat(returnData.url),
                            files: that.data.picfile.concat(returnData.url) ,
                        })
                        if(that.data.files.length>4){
                            that.setData({
                            hidden:true 
                        })
                        }
                        }
                    }            
                });
              }
            }
        })
 },
 previewImage:function(e){
     wx.previewImage({
         current: e.currentTarget.id, 
         urls: this.data.files
    })
 },
 formSubmit: function(e) {  
    var that = this;  
    var data = e.detail.value;  
    data.formId = e.detail.formId;
    console.log(data);
    var citypic = that.data.city[that.data.indexCity];
    data.city= citypic;
    var piclen  = that.data.files.length;   
        data.pics = that.data.picfile;
        var token = wx.getStorageSync('t');
        data.t = token;
        wx.request({ 
            url: getApp().URLS+'mqrx/report/save', 
            data: data,
            header: {'Content-Type': 'application/x-www-form-urlencoded'  
            }, 
            method:'POST',
            success: function(res) { 
                if (res.data.code==-1){
                    wx.showModal({
                        title:res.data.msg,
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    });
                }
                else{
                    wx.navigateTo({
                        url: '../message/message?msg='+res.data.msg
                    })
                }
                that.clearInput();
            }
        })   
 }, 
})
