var obj = {};
var arr_pt = [];
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
function obj_values(obj){
  var new_arr = [];
  for(var key in obj){
  new_arr[key] = obj[key]; 
  }
  return new_arr;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadlog:'',
    uploadUrl:'',
    question_id: '',
    imgUp:[],
    current:-1,
    answer:false,
    need:true,
    changeTitle:'',
    types: [
      { name: '单选', value: '1', checked: 'true'},
      { name: '多选', value: '2'},
      { name: '填空', value: '3' },
    ],
    options: [
      { name: '文字', value: '1', checked: 'true'},
      { name: '图文', value: '3'},
    ],
    type_nums:[
      {name:'A'},
      {name:'B'},
      {name:'C'},
      {name:'D'},
      {name:'E'},
      {name:'F'},
      {name:'G'},
      {name:'H'},
      {name:'I'},
      {name:'J'},
      {name:'K'},
      {name:'L'},
      {name:'M'},
      {name:'N'},
      {name:'O'},
      {name:'P'},
      {name:'Q'},
      {name:'R'},
      {name:'S'},
      {name:'T'},
      {name:'U'},
      {name:'V'},
      {name:'W'},
      {name:'X'},
      {name:'Y'},
      {name:'Z'}
    ],
    answer_txt:'',
    vals: [{ 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }],
    radioVals: [{ 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }],
    end_type:1,
    end_option:1,
    nums: [{ 'check': false }, { 'check': false }],
    disable:false,
    checkVal:[],
    checkVals:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
    radioVal:'',
    index:0,
    array: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'],
    array_end: ['0', '1', '2']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showToast({
    //   title: options.id,
    // })
    obj = {};
    arr_pt = [];
    console.log(options);
    this.setData({
      uploadlog: '',
      uploadUrl: '',
      imgUp: [],
      current: -1,
      answer: false,
      need: true,
      changeTitle: '',
      types: [
        { name: '单选', value: '1', checked: 'true' },
        { name: '多选', value: '2' },
        { name: '填空', value: '3' },
      ],
      options: [
        { name: '文字', value: '1', checked: 'true' },
        { name: '图文', value: '3' },
      ],
      type_nums: [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: 'E' },
        { name: 'F' },
        { name: 'G' },
        { name: 'H' },
        { name: 'I' },
        { name: 'J' },
        { name: 'K' },
        { name: 'L' },
        { name: 'M' },
        { name: 'N' },
        { name: 'O' },
        { name: 'P' },
        { name: 'Q' },
        { name: 'R' },
        { name: 'S' },
        { name: 'T' },
        { name: 'U' },
        { name: 'V' },
        { name: 'W' },
        { name: 'X' },
        { name: 'Y' },
        { name: 'Z' }
      ],
      answer_txt: '',
      vals: [{ 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }],
      radioVals: [{ 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }],
      end_type: 1,
      end_option: 1,
      nums: [{ 'check': false }, { 'check': false }],
      disable: false,
      checkVal: [],
      checkVals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      radioVal: '',
      index: 0,
      array: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'],
      array_end: ['0', '1', '2'],
      question_id: options.id
    })
    try {
      var value = wx.getStorageSync('answer');
      console.log(value);
      this.setData({
        answer:value
      })
    } catch (e) {
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  bindTitle:function(e){
    this.setData({
      answer_txt: e.detail.value
    });
  },
  uploadlogs: function (e) {
    var key=e.currentTarget.dataset.imgkey;
    let that = this;
    var radioVals = this.data.radioVals;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        radioVals[key].val = res.tempFilePaths[0];
        arr_pt[key] = res.tempFilePaths[0];
        that.setData({
          radioVals: radioVals
        });
      }
    })
  },
  checkboxChange: function (e) {
    var nums = this.data.nums;
    var index = this.data.index;
    var len = nums.length;
    for(var j=0;j<len;j++){
      nums[j].check = false;
    }
    var arr = e.detail.value;
    if(index==0){
      for (var i = 0; i < arr.length; i++) {
        nums[arr[i]].check = true;
      }
    }else{
      var newArr=[];
      newArr = arr.slice(-index);
      for (var j = 0; j < len; j++) {
        nums[j].check = false;
      }
      for (var i = 0; i < newArr.length; i++) {
        nums[newArr[i]].check = true;
      }
    }
    
    this.setData({
      nums:nums,
      checkVal: e.detail.value,
    });
    // console.log(obj);
    // console.log(nums);
  },
  changeTitle:function(e){
    this.setData({
      changeTitle: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    // var nums = this.data.nums;
    // for (var j = 0; j < nums.length; j++) {
    //   nums[j].check = false;
    // }
    this.setData({
      index: e.detail.value,
      // nums: nums,
    })
  },
  radioChange3:function(e){
    console.log(e.detail.value)
    this.setData({
      radioVal: e.detail.value,
      current: e.detail.value
    })
  },
  radioChange1:function(e){
    var valss = this.data.vals;
    var arr = obj_values(obj);
    
    for (var j = 0; j < arr.length; j++) {
      valss[j].val = arr[j];
    } 
    this.setData({
      end_type: e.detail.value,
      vals:valss
      // current: -1,
      // nums:nums,
      // radioVal: '',
      // radioVals: radioVals
    });
    // wx.showToast({
    //   title: this.data.end_type,
    // })
    // console.log('end_type值为', this.data.end_type)
  },
  radioChange2: function (e) {
    // var nums = this.data.nums;
    // var radioVals = this.data.radioVals;
    // var count = radioVals.length;
    // for(var i= 0;i<count;i++){
    //   radioVals[i].val='';
    // }
    // var len = nums.length;
    // for (var j = 0; j < len; j++) {
    //   nums[j].check = false;
    // }
    // arr_pt = [];
    // var arr = obj_values(obj);
    // for (var j = 0; j < arr.length; j++) {
    //   obj[j] = '';
    // } 
    var valss = this.data.vals;
    var arr = obj_values(obj);
    for (var j = 0; j < arr.length; j++) {
      valss[j].val = arr[j];
    } 
    this.setData({
      end_option: e.detail.value,
      vals:valss
      // current: -1,
      // nums:nums,
      // radioVal:'',
      // radioVals: radioVals
    });
    // console.log('end_option值为', this.data.end_option)
  },
  switch1Change: function (e) {
    this.setData({
      need: e.detail.value
    });
    // console.log('need值为', this.data.need)
  },
  reducept:function(){
    this.setData({
      uploadlog: "",
      uploadUrl:""
    });
  },
  uploadlog: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths;
        // 设置精选去一张，所以 0 取得当前的路径地址  res.tempFilePaths[0];
        that.setData({
          uploadlog: res.tempFilePaths[0]
        });
        wx.uploadFile({
          url: getApp().appApi.upImgAPI,
          filePath: that.data.uploadlog,
          name: 'file',
          success: function (res) {
            console.log(JSON.parse(res.data).result.file_path);
            let urls = JSON.parse(res.data).result.file_path
            that.setData({
              uploadUrl: urls
            })
          }
        });
      }
    })
  },
  add:function(){
    var nums = this.data.nums;
    nums.push({ 'check': false });
    this.setData({
      nums: nums,
      array_end: this.data.array.slice(0, nums.length+1)
    });
    // console.log(nums);
    // console.log(obj);
  },
  reduce:function(e){
    if (e.currentTarget.dataset.hi>=0){
      var numss = this.data.nums;
      var checkVal = this.data.checkVal;
      var valss = this.data.vals;
      var key = e.currentTarget.dataset.hi;
      checkVal.splice(key,1);
      var radioVals = this.data.radioVals;
      numss.splice(key, 1);
      radioVals[key].val = '';
      this.setData({
        numss:numss,
        radioVals: radioVals,
        checkVal: checkVal,
        current: -1,
        radioVal: '', 
      });
      // console.log(numss);
      arr_pt=[];
      for (var i = 0; i < radioVals.length;i++){
        if (radioVals[i].val!=''){
          arr_pt.push(radioVals[i].val);
        }
      }
      for (var j = 0; j < arr_pt.length; j++) {
        radioVals[j]['val'] = arr_pt[j];
      }
      for (var i = 0; i < radioVals.length; i++) {
        if (i >=arr_pt.length) {
          radioVals[i]['val'] = '';
        }
      }
      this.setData({
        array_end: this.data.array.slice(0, (numss.length + 1)),
        nums: numss,
        radioVals: radioVals
      });
      // console.log(obj);
      delete obj[e.currentTarget.dataset.hi];
      var new_ars = [];
      for(var key in obj){
        if (key != e.currentTarget.dataset.hi)
          new_ars.push(obj[key]);
      }
      console.log(new_ars);
      obj = {};
      for (var j = 0; j < new_ars.length;j++){
        valss[j]['val'] = new_ars[j];
        obj[j] = new_ars[j];
      }
      for(var i = 0;i<valss.length;i++){
        if (i >= new_ars.length){
          valss[i]['val'] = '';
        }
      }
      this.setData({
        vals:valss
      });
      console.log(valss);
      console.log(obj);
    }
  },
  changeInput: function (e) {
    obj[e.currentTarget.dataset.key] = e.detail.value;
    var nums = this.data.nums;
    // console.log(obj);
    // console.log(nums);
  },
  check:function(){
    var that = this;
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var end_json = {};
    var arr = obj_values(obj);
    var nums = this.data.nums;
    var index = this.data.index;
    console.log(obj);
    console.log(nums);
    if (!this.data.changeTitle){
      wx.showToast({
        title: '问题不能为空！',
        image:'../../images/warn.png'
      });
      return false;
    }
    if (this.data.end_type==1){
      var txt = {};
      // console.log('title =' + this.data.changeTitle);
      // console.log('src =' + this.data.uploadlog);
      // console.log('选项=' + this.data.end_option);
      // console.log('类型=' + this.data.end_type);
      // console.log('need =' + this.data.need);
      // console.log('选项信息=' + arr);
      // console.log('单选正确答案=' + this.data.radioVal);
      // console.log('图片=');
      end_json = {};
      console.log('**********单选**********')
      for (var j = 0; j < arr.length; j++) {
        if (!trim(arr[j])) {
          wx.showToast({
            title: '选项内容未填满！', 
            image: '../../images/warn.png'
          });
          return false;
        }
      }
      if (arr.length != nums.length) {
        wx.showToast({
          title: '选项内容未填满！',
          image: '../../images/warn.png'
        });
        return false;
      }
      if (this.data.end_option==3){
        if (arr_pt.length<arr.length){
          wx.showToast({
            title: '选项图片未填满！',
            image: '../../images/warn.png'
          });
          return false;
        }
        for (var i = 0; i < arr_pt.length;i++){
          if (!arr_pt[i]){
            wx.showToast({
              title: '选项图片未填满！',
              image: '../../images/warn.png'
            });
            return false;
          }
        }
      }
      if (this.data.answer && !(parseInt(this.data.radioVal) >= 0)){
        wx.showToast({
          title: '未选中正确答案！',
          image: '../../images/warn.png'
        });
        return false;
      } 
      end_json['question_id'] = this.data.question_id;
      end_json['title'] = this.data.changeTitle;
      end_json['is_must'] = this.data.need == true ? 1 : 2;
      end_json['type'] = this.data.end_type;
      end_json['option_type'] = this.data.end_option;
      end_json['correct'] = parseInt(this.data.radioVal)+1;
      end_json['img'] = this.data.uploadUrl ? this.data.uploadUrl : '';
      console.log(JSON.stringify(end_json));
     
      if (this.data.end_option == 3){
        var that = this;
        // console.log(arr_pt);
        for(var i = 0;i<arr_pt.length;i++){
          that.setData({
            imgUp: []
          });
          console.log(getApp().appApi.upImgAPI);
          wx.uploadFile({
            url: getApp().appApi.upImgAPI,
            filePath: arr_pt[i],
            name: 'file',
            success: function (res) {
              console.log(res);
              console.log(JSON.parse(res.data).result.file_path);
              let urls = JSON.parse(res.data).result.file_path
              var imgUp = that.data.imgUp;
              imgUp.push(urls);
              console.log(imgUp);
              that.setData({
                imgUp: imgUp
              });
              var imgUp = that.data.imgUp;;
              if (arr.length == imgUp.length){
                for(var i=0;i<arr.length;i++){
                  txt[i+1] = { 'text': arr[i], 'file': imgUp[i] }
                }
              }
              end_json['option_value'] = JSON.stringify(txt);
              if (arr.length == imgUp.length){
                // console.log('go...')
                // console.log(end_json['option_value']);
                console.log(JSON.stringify(end_json));
                wx.request({
                  url: getApp().appApi.addAPI,
                  data: end_json,
                  dataType: 'json',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'token': wx.getStorageSync('token'),
                    'uid': wx.getStorageSync('uid')
                  },
                  success: function (res) {
                    setTimeout(() => {
                      wx.hideLoading();
                    }, 100);
                    if (res.data.code != 200) {
                      wx.showModal({
                        title: '提交失败！',
                        content: res.data.msg,
                        showCancel: false
                      })
                    }else{
                      wx.reLaunch({
                        url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
                      });
                    }
                    console.log(res.data);
                    // console.log(res.data.result.item.id);
                    // wx.navigateTo({
                    //   url: '../eidtAnswer/eidtAnswer?id=' + res.data.result.item.id,
                    // });
                  },
                  fail: function (error) {
                    setTimeout(() => {
                      wx.hideLoading();
                    }, 100);
                    wx.showModal({
                      title: '提交失败！',
                      content: error,
                      showCancel: false
                    })
                    console.log(error);
                  }
                })
              }
            }
          });
        }
      }else{
        for (var i = 0; i < arr.length; i++) {
          txt[i+1] = { 'text': arr[i] }
        }
        end_json['option_value'] = JSON.stringify(txt);
      console.log(JSON.stringify(end_json));
        wx.request({
          url: getApp().appApi.addAPI,
          data: end_json,
          dataType: 'json',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync('token'),
            'uid': wx.getStorageSync('uid')
          },
          success: function (res) {
            setTimeout(() => {
              wx.hideLoading();
            }, 100);
            if (res.data.code != 200) {
              wx.showModal({
                title: '提交失败！',
                content: res.data.msg,
                showCancel: false
              })
            }else{
              wx.reLaunch({
                url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
              });
            }
            console.log(res.data);
            // console.log(res.data.result.item.id);
            // wx.navigateTo({
            //   url: '../eidtAnswer/eidtAnswer?id=' + res.data.result.item.id,
            // });
          },
          fail: function (error) {
            setTimeout(() => {
              wx.hideLoading();
            }, 100);
            wx.showModal({
              title: '提交失败！',
              content: error,
              showCancel: false
            })
            console.log(error);
          }
        })
      }
    }
    if (this.data.end_type == 2){
      var txt = {};
      end_json = {};
      var max=0;
      console.log('**********多选**********')
      for (var j = 0; j < arr.length; j++) {
        if (!trim(arr[j])) {
          wx.showToast({
            title: '选项内容未填满！',
            image: '../../images/warn.png'
          });
          return false;
        }
      }
      if (arr.length < nums.length) {
        wx.showToast({
          title: '选项内容未填满！',
          image: '../../images/warn.png'
        });
        return false;
      }
      if (this.data.end_option == 3) {
        if (arr_pt.length < arr.length) {
          wx.showToast({
            title: '选项图片未填满！',
            image: '../../images/warn.png'
          });
          return false;
        }
        for (var i = 0; i < arr_pt.length; i++) {
          if (!arr_pt[i]) {
            wx.showToast({
              title: '选项图片未填满！',
              image: '../../images/warn.png'
            });
            return false;
          }
        }
      } 
      var nums = this.data.nums;
      var len = nums.length;
      var checkVals = [];
      for (var i = 0; i < len; i++) {
        if (nums[i].check) {
          checkVals.push(i+1);
        }
      }
      if (this.data.answer && checkVals.length==0){
        wx.showToast({
          title: '未选中正确答案！',
          image: '../../images/warn.png'
        });
        return false;
      }
      // if(index!=0){
      //   if (index != checkVals.length){
      //     wx.showToast({
      //       title: '最对可选不符！',
      //       image: '../../images/warn.png'
      //     });
      //     return false;
      //   }
      // }
      end_json['title'] = this.data.changeTitle;
      // end_json['bigUrl'] = this.data.uploadlog;
      end_json['is_must'] = this.data.need == true ? 1 : 2;
      end_json['type'] = this.data.end_type;
      end_json['option_type'] = this.data.end_option;
      end_json['img'] = this.data.uploadlog ? this.data.uploadUrl : '';
      end_json['question_id'] = this.data.question_id;
      if (this.data.index != 0) {
        end_json['multi_limit'] = this.data.index;
      }else{
        end_json['multi_limit']=0;
      }
      end_json['correct'] = checkVals.join(',');
      if (this.data.end_option == 3) {
        var that = this;
        // console.log(arr_pt);
        for (var i = 0; i < arr_pt.length; i++) {
          that.setData({
            imgUp: []
          });
          wx.uploadFile({
            url: getApp().appApi.upImgAPI,
            filePath: arr_pt[i],
            name: 'file',
            success: function (res) {
              console.log(JSON.parse(res.data).result.file_path);
              let urls = JSON.parse(res.data).result.file_path
              var imgUp = that.data.imgUp;
              imgUp.push(urls);
              console.log(imgUp);
              that.setData({
                imgUp: imgUp
              });
              var imgUp = that.data.imgUp;;
              if (arr.length == imgUp.length) {
                for (var i = 0; i < arr.length; i++) {
                  txt[i+1] = { 'text': arr[i], 'file': imgUp[i] }
                }
              }
              end_json['option_value'] = JSON.stringify(txt);
              if (arr.length == imgUp.length) {
                // console.log('go...')
                // console.log(end_json['option_value']);
                console.log(JSON.stringify(end_json));
                wx.request({
                  url: getApp().appApi.addAPI,
                  data: end_json,
                  dataType: 'json',
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'token': wx.getStorageSync('token'),
                    'uid': wx.getStorageSync('uid')
                  },
                  success: function (res) {
                    setTimeout(() => {
                      wx.hideLoading();
                    }, 100);
                    if (res.data.code != 200) {
                      wx.showModal({
                        title: '提交失败！',
                        content: res.data.msg,
                        showCancel: false
                      })
                    }else{
                      wx.reLaunch({
                        url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
                      })
                    }
                    console.log(res.data);
                    // console.log(res.data.result.item.id);
                    // wx.navigateTo({
                    //   url: '../eidtAnswer/eidtAnswer?id=' + res.data.result.item.id,
                    // });
                  },
                  fail: function (error) {
                    setTimeout(() => {
                      wx.hideLoading();
                    }, 100);
                    wx.showModal({
                      title: '提交失败！',
                      content: error,
                      showCancel: false
                    })
                    console.log(error);
                  }
                })
              }
            }
          });
        }
      }else{
        for (var i = 0; i < arr.length; i++) {
          txt[i+1] = { 'text': arr[i] }
        }
        end_json['option_value'] = JSON.stringify(txt);
        console.log(JSON.stringify(end_json));
        wx.request({
          url: getApp().appApi.addAPI,
          data: end_json,
          dataType: 'json',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': wx.getStorageSync('token'),
            'uid': wx.getStorageSync('uid')
          },
          success: function (res) {
            setTimeout(() => {
              wx.hideLoading();
            }, 100);
            if (res.data.code != 200) {
              wx.showModal({
                title: '提交失败！',
                content: res.data.msg,
                showCancel: false
              })
            }else{
              wx.reLaunch({
                url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
              });
            }
            console.log(res.data);
            // console.log(res.data.result.item.id);
            // wx.navigateTo({
            //   url: '../eidtAnswer/eidtAnswer?id=' + res.data.result.item.id,
            // });
          },
          fail: function (error) {
            wx.showModal({
              title: '提交失败！',
              content: error,
              showCancel: false
            })
            console.log(error);
          }
        })
      }
      // // console.log('title =' + this.data.changeTitle);
      // // console.log('src =' + this.data.uploadlog);
      // // console.log('选项=' + this.data.end_option);
      // // console.log('类型=' + this.data.end_type);
      // // console.log('need =' + this.data.need);
      // // console.log('最多kexuan=' + this.data.array[this.data.index]);
      // // console.log('选项信息=' + arr);
      // // console.log('多选正确答案=' + checkVals);
      // // console.log('图片=');
      // console.log(arr_pt);
      
    } 
    if(this.data.end_type == 3){
      end_json = {};
      end_json['question_id'] = this.data.question_id;
      end_json['title'] = this.data.changeTitle;
      // end_json['bigUrl'] = this.data.uploadlog;
      end_json['is_must'] = this.data.need == true ? 1 : 2;
      end_json['type'] = this.data.end_type;
      end_json['img'] = this.data.uploadlog ? this.data.uploadUrl : '';
      end_json['correct'] = this.data.answer_txt;
      console.log(end_json);
      if (this.data.answer && !this.data.answer_txt){
        wx.showToast({
          title: '未选中正确答案！',
          image: '../../images/warn.png'
        });
        return false;
      }
      wx.request({
        url: getApp().appApi.addAPI,
        data: end_json,
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token'),
          'uid': wx.getStorageSync('uid')
        },
        success: function (res) {
          setTimeout(() => {
            wx.hideLoading();
          }, 100);
          if (res.data.code != 200) {
            wx.showModal({
              title: '提交失败！',
              content: res.data.msg,
              showCancel: false
            })
          }else{
            wx.reLaunch({
              url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
            });
          }
          console.log(res.data);
          // console.log(res.data.result.item.id);
          // wx.navigateTo({
          //   url: '../eidtAnswer/eidtAnswer?id=' + res.data.result.item.id,
          // });
        },
        fail: function (error) {
          setTimeout(() => {
            wx.hideLoading();
          }, 100);
          wx.showModal({
            title: '提交失败！',
            content: error,
            showCancel: false
          })
          console.log(error);
        }
      })
      // console.log('title =' + this.data.changeTitle);
      // console.log('src =' + this.data.uploadlog);
      // console.log('need =' + this.data.need);
      // console.log('类型=' + this.data.end_type)
    }
    // console.log(JSON.stringify(end_json));
  }
})