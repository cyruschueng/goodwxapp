Component({
  properties: {
    placeholder: {
      type: String
    }, 
    searchKey: {
      type: String,
      observer: function (newVal, oldVal) {console.log(newVal) } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串
    },
    maxlength: {
      type: Number,
      value: 55
    }
  },
  data: {
    searchBorderColor: '#e3e3e3',
    searchImg: '../../imgs/icon/search.png',
    myEventDetail: {
      key: ''
    }
  },
  methods: {
    search: function(e){
      this.data.myEventDetail.key = e.detail.value;
    },
    onsearch: function(){
      this.triggerEvent('onSearch', this.data.myEventDetail)
    },
    changeSearchColor: function() {
      let bgColor = this.data.searchBorderColor == '#0dba09' ? '#e3e3e3' : '#0dba09';
      let searchImg = this.data.searchImg == '../../imgs/icon/search.png' ? '../../imgs/icon/searchA.png' : '../../imgs/icon/search.png';
      // 设置背景颜色数据
      this.setData({
        searchBorderColor: bgColor,
        searchImg: searchImg
      });
    },
    throttle: function(fn, delay, atleast) {
      var timer = null;
      var previous = null;
      var now = +new Date();
      if (!previous) previous = now;
      if (atleast && now - previous > atleast) {
        fn();
        // 重置上一次开始时间为本次结束时间
        previous = now;
        clearTimeout(timer);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn();
          previous = null;
        }, delay);
      }
    }
  }
})