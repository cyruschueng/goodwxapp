var obj = {};
var arr_pt = [];
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
function obj_values(obj) {
  var new_arr = [];
  for (var key in obj) {
    new_arr[key] = obj[key];
  }
  return new_arr;
}
function checkUrl(urlString) {
  if (urlString != "") {
    var reg = /^(https)/ig;
    if (!reg.test(urlString)) {
      return false;
    } else {
      return true;
    }
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    conts:0,
    ks:0,
    id:'',
    uploadUrl:'',
    question_id:'',
    current:-1,
    answer:false,
    need:true,
    changeTitle:'',
    answer_txt:'',
    types: [
      { name: '单选', value: '1'},
      { name: '多选', value: '2'},
      { name: '填空', value: '3'},
    ],
    options: [
      { name: '文字', value: '1'},
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
    vals: [{ 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }],
    radioVals: [{ 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }, { 'val': '' }],
    end_type:1,
    end_option:1,
    nums: [{ 'check': false}, { 'check': false}],
    disable:false,
    checkVal:[],
    checkVals:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
    radioVal:'',
    index:0,
    array: ['无限制', '1项', '2项', '3项', '4项', '5项', '6项', '7项', '8项', '9项', '10项', '11项', '12项', '13项', '14项', '15项', '16项', '17项', '18项', '19项', '20项', '21项', '22项', '23项', '24项', '25项', '26项'],
    array_end: ['无限制', '1项', '2项'],
    uploadlog:'',
    imgUp:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    arr_pt = [];
    obj = {};

    let that = this;
     console.log(options);
    that.setData({
      conts: 0,
      ks: 0,
      uploadUrl: '',
      current: -1,
      answer: false,
      need: true,
      changeTitle: '',
      answer_txt: '',
      types: [
        { name: '单选', value: '1' },
        { name: '多选', value: '2' },
        { name: '填空', value: '3' },
      ],
      options: [
        { name: '文字', value: '1' },
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
      array: ['无限制', '1项', '2项', '3项', '4项', '5项', '6项', '7项', '8项', '9项', '10项', '11项', '12项', '13项', '14项', '15项', '16项', '17项', '18项', '19项', '20项', '21项', '22项', '23项', '24项', '25项', '26项'],
      array_end: ['无限制', '1项', '2项'],
      uploadlog: '',
      imgUp: [],
      id: options.id,
      question_id: options.question_id,

    });
    wx.request({
      url: getApp().appApi.detailsAPI,
      data: {
        id: options.id
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        }
        console.log(res);
        var vals = that.data.vals;
        for (var i = 0; i < res.data.result.item.formate_option.length; i++) {
          vals[i].val = res.data.result.item.formate_option[i].text;
          obj[i] = res.data.result.item.formate_option[i].text;
        }
        if (res.data.result.item.type == 1) {
          for (var i = 0; i < res.data.result.item.formate_option.length; i++) {
            if (res.data.result.item.formate_option[i].if_correct == true) {
              that.setData({
                current: i,
                radioVal: i
              });
            }
          }
        }
        that.setData({
          changeTitle: res.data.result.item.title,
          uploadlog: res.data.result.item.img,
          uploadUrl:res.data.result.item.img,
          need: res.data.result.item.is_must == 1 ? true : false,
          end_type: res.data.result.item.type,
          end_option: res.data.result.item.option_type,
          nums: res.data.result.item.formate_option,
          vals: vals,
          answer: res.data.result.item.is_must == 1 ? true : false,
        });
       
        if (res.data.result.item.type == 2) {
          var nums = that.data.nums;
          var radioVals = that.data.radioVals;
          for (var i = 0; i < res.data.result.item.formate_option.length; i++) {
            if (res.data.result.item.formate_option[i].if_correct == true) {
              nums[i].check=true;
            }else{
              nums[i].check = false;
            }
          }
          that.setData({
            nums: nums,
            index: res.data.result.item.multi_limit,
          });
        }
        if (res.data.result.item.type == 2 && res.data.result.item.option_type == 3) {
          var radioVals = that.data.radioVals;
          for (var i = 0; i < res.data.result.item.formate_option.length; i++) {
            radioVals[i].val = res.data.result.item.formate_option[i].file;
            arr_pt.push(res.data.result.item.formate_option[i].file);
          }
          that.setData({
            radioVals: radioVals
          });
        }
        if (res.data.result.item.type == 1 && res.data.result.item.option_type==3) {
          var radioVals = that.data.radioVals;
          for (var i = 0; i < res.data.result.item.formate_option.length; i++) {
            radioVals[i].val = res.data.result.item.formate_option[i].file;
            arr_pt.push(res.data.result.item.formate_option[i].file);
            }
          that.setData({
            radioVals: radioVals
          }); 
        }
        if(res.data.result.item.type==3){
          that.setData({
            answer_txt: res.data.result.item.correct,
          })
        }
      }
    }); 
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
  bindTitle: function (e) {
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
    // var nums = this.data.nums;
    // var len = nums.length;
    // for (var j = 0; j < len; j++) {
    //   nums[j].check = false;
    // }
    // var arr = obj_values(obj);
    // for (var j = 0; j < arr.length; j++) {
    //   obj[j] = '';
    // }
    // arr_pt = [];
    // var radioVals = this.data.radioVals;
    // var count = radioVals.length;
    // for (var i = 0; i < count; i++) {
    //   radioVals[i].val = '';
    // }
    var valss = this.data.vals;
    var arr = obj_values(obj);
    for (var j = 0; j < arr.length; j++) {
      valss[j].val = arr[j];
    } 
    this.setData({
      end_type: e.detail.value,
      vals: valss
      // current: -1,
      // nums:nums,
      // radioVal: '',
      // radioVals: radioVals
    });
    // console.log('end_type值为', this.data.end_type)
  },
  radioChange2: function (e) {
    var valss = this.data.vals;
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
  },
  reduce:function(e){
    if (e.currentTarget.dataset.hi>=0){
      // console.log(e.currentTarget.dataset.hi)
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
        current:-1,
        radioVal: '', 
      });
      console.log(numss);
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
      // console.log(numss);
      delete obj[e.currentTarget.dataset.hi];
      var new_ars = [];
      for (var key in obj) {
        if (key != e.currentTarget.dataset.hi)
          new_ars.push(obj[key]);
      }
      obj = {};
      for (var j = 0; j < valss.length; j++) {
        valss[j].val = '';
      }
      for (var j = 0; j < new_ars.length; j++) {
        valss[j].val = new_ars[j];
        obj[j] = new_ars[j];
      }
      this.setData({
        vals:valss
      });
    }
  },
  changeInput: function (e) {
    obj[e.currentTarget.dataset.key] = e.detail.value;
  },
  check:function(){
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    var end_json = {};
    var arr = obj_values(obj);
    var nums = this.data.nums;
    var index = this.data.index;
    console.log(nums);
    console.log(arr);
    console.log(arr_pt);
    if (!this.data.changeTitle){
      wx.showToast({
        title: '问题不能为空！',
      });
      return false;
    }
    if (this.data.end_type==1){
      var txt = {};
      console.log('**********单选**********')
      for (var j = 0; j < arr.length; j++) {
        if (!arr[j]) {
          wx.showToast({
            title: '选项内容未填满！',
          });
          return false;
        }
      }
      if (arr.length < nums.length) {
        wx.showToast({
          title: '选项内容未填满！',
        });
        return false;
      }
      if (this.data.end_option==3){
        if (arr_pt.length<arr.length){
          wx.showToast({
            title: '选项图片未填满！',
          });
          return false;
        }
        for (var i = 0; i < arr_pt.length;i++){
          if (!arr_pt[i]){
            wx.showToast({
              title: '选项图片未填满！',
            });
            return false;
          }
        }
      }
      if (this.data.need && !(parseInt(this.data.radioVal) >= 0)){
        wx.showToast({
          title: '未选中正确答案！',
        });
        return false;
      }
      end_json['question_id'] = this.data.question_id;
      end_json['title'] = this.data.changeTitle;
      end_json['is_must'] = this.data.need == true ? 1 : 2;
      end_json['type'] = this.data.end_type;
      end_json['option_type'] = this.data.end_option;
      end_json['id'] = this.data.id;
      end_json['correct'] = parseInt(this.data.radioVal) + 1;
      end_json['img'] = this.data.uploadUrl ? this.data.uploadUrl : '';
      // console.log(JSON.stringify(end_json));
      if (this.data.end_option == 3) {
        var that = this;
        that.setData({
          imgUp: arr_pt
        });
        var flag = 1;
        for (var i = 0; i < arr_pt.length; i++){
          if (!checkUrl(arr_pt[i])){
           var ks = parseInt(that.data.ks);
           ks+=1;
           that.setData({
             ks:ks
           })
          }
        }
        for (var i = 0; i < arr_pt.length; i++) {
          if (!checkUrl(arr_pt[i])) {
            try {
              wx.setStorageSync('i', i);
            } catch (e) {
            }
            flag = 2;
            wx.uploadFile({
              url: getApp().appApi.upImgAPI,
              filePath: arr_pt[i],
              name: 'file',
              success: function (res) {
                console.log(JSON.parse(res.data).result.file_path);
                let urls = JSON.parse(res.data).result.file_path
                var imgUp = that.data.imgUp;
                var key = wx.getStorageSync('i');
                console.log(key);
                imgUp[key]= urls;
                var conts = parseInt(that.data.conts);
                conts+=1;
                that.setData({
                  imgUp: imgUp,
                  conts: conts
                });
                console.log(that.data.imgUp);
                var ks = parseInt(that.data.ks);
                console.log('ks='+ks);
                console.log('conts='+parseInt(that.data.conts))
                if ((parseInt(ks)) == parseInt(that.data.conts)) {
                  console.log(that.data.imgUp);
                  var imgUp = that.data.imgUp;
                  for (var i = 0; i < arr.length; i++) {
                    txt[i + 1] = { 'text': arr[i], 'file': imgUp[i] }
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
                      console.log(res.data);
                      wx.reLaunch({
                        url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
                      });
                    } 
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
        }
        if (flag == 1) {
          for (var i = 0; i < arr.length; i++) {
            txt[i + 1] = { 'text': arr[i], 'file': arr_pt[i] }
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
                console.log(res.data);
                wx.reLaunch({
                  url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
                });
              }
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
      }else{
        var that = this;
        for (var i = 0; i < arr.length; i++) {
          txt[i + 1] = { 'text': arr[i]}
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
            console.log(res);
            if (res.data.code != 200) {
              wx.showModal({
                title: '提交失败！',
                content: res.data.msg,
                showCancel: false
              })
            } else {
              wx.reLaunch({
                url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
              });
            }
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
      console.log('**********多选**********')
      var txt = {};
      for (var j = 0; j < arr.length; j++) {
        if (!trim(arr[j])) {
          wx.showToast({
            title: '选项内容未填满！',
          });
          return false;
        }
      }
      if (arr.length < nums.length) {
        wx.showToast({
          title: '选项内容未填满！',
        });
        return false;
      }
      if (this.data.end_option == 3) {
        if (arr_pt.length < arr.length) {
          wx.showToast({
            title: '选项图片未填满！',
          });
          return false;
        }
        for (var i = 0; i < arr_pt.length; i++) {
          if (!arr_pt[i]) {
            wx.showToast({
              title: '选项图片未填满！',
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
      if (checkVals.length==0){
        wx.showToast({
          title: '未选中正确答案！',
        });
        return false;
      }
      // if(index!=0){
      //   if (index != checkVals.length){
      //     wx.showToast({
      //       title: '最对可选不符！',
      //     });
      //     return false;
      //   }
      // }
      end_json['title'] = this.data.changeTitle;
      end_json['is_must'] = this.data.need == true ? 1 : 2;
      end_json['type'] = this.data.end_type;
      end_json['option_type'] = this.data.end_option;
      end_json['img'] = this.data.uploadUrl ? this.data.uploadUrl : '';
      end_json['question_id'] = this.data.question_id;
      end_json['correct'] = checkVals.join(',');
      end_json['id'] = this.data.id;
      if (this.data.index != 0) {
        end_json['multi_limit'] = this.data.index;
      } else {
        end_json['multi_limit'] = 0;
      }
      if (this.data.end_option == 3) {
        console.log(arr_pt);
        var that = this;
        that.setData({
          imgUp: arr_pt
        });
        var flag = 1;
        for (var i = 0; i < arr_pt.length; i++) {
          if (!checkUrl(arr_pt[i])) {
            var ks = parseInt(that.data.ks);
            ks += 1;
            that.setData({
              ks: ks
            })
          }
        }
        for (var i = 0; i < arr_pt.length; i++) {
          if (!checkUrl(arr_pt[i])) {
            console.log(i);
            try {
              wx.setStorageSync('i', i);
            } catch (e) {
            }
            flag = 2;
            wx.uploadFile({
              url: getApp().appApi.upImgAPI,
              filePath: arr_pt[i],
              name: 'file',
              success: function (res) {
                console.log(JSON.parse(res.data).result.file_path);
                let urls='';
                urls = JSON.parse(res.data).result.file_path
                var imgUp = that.data.imgUp;
                var key = wx.getStorageSync('i');
                console.log(key);
                imgUp[key] = urls;
                var conts = parseInt(that.data.conts);
                conts += 1;
                that.setData({
                  imgUp: imgUp,
                  conts: conts
                });
                console.log(that.data.imgUp);
                var ks = parseInt(that.data.ks);
                console.log('ks=' + ks);
                console.log('conts=' + parseInt(that.data.conts))
                console.log(that.data.imgUp);
                if (ks == parseInt(that.data.conts)) {
                  console.log(that.data.imgUp);
                  var imgUp = that.data.imgUp;
                  for (var i = 0; i < arr.length; i++) {
                    txt[i + 1] = { 'text': arr[i], 'file': imgUp[i] }
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
                        console.log(res.data);
                        wx.reLaunch({
                          url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
                        });
                      }
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
        }
        if (flag == 1) {
          for (var i = 0; i < arr.length; i++) {
            txt[i + 1] = { 'text': arr[i], 'file': arr_pt[i] }
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
              } else {
                console.log(res.data);
                wx.reLaunch({
                  url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
                });
              }
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
      } else {
        var that = this;
        for (var i = 0; i < arr.length; i++) {
          txt[i + 1] = { 'text': arr[i] }
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
            console.log(res);
            if (res.data.code != 200) {
              wx.showModal({
                title: '提交失败！',
                content: res.data.msg,
                showCancel: false
              })
            } else {
              wx.reLaunch({
                url: '/pages/eidtAnswer/eidtAnswer?id=' + that.data.question_id,
              });
            }
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
    if(this.data.end_type == 3){
      end_json['question_id'] = this.data.question_id;
      end_json['title'] = this.data.changeTitle;
      // end_json['bigUrl'] = this.data.uploadlog;
      end_json['is_must'] = this.data.need == true ? 1 : 2;
      end_json['type'] = this.data.end_type;
      end_json['img'] = this.data.uploadUrl ? this.data.uploadUrl : '';
      end_json['correct'] = this.data.answer_txt;
      end_json['id'] = this.data.id;
      console.log(end_json);
      var that = this;
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
})