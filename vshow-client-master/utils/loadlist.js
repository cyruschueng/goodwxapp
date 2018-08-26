
let { NetRequest, showTips } = require('./util');
let { hostUrl, staticHostUrl } = require('../config');
class LoadList{

  constructor(url, listName= 'list', method = 'GET'){
    let self = this;
    self.page = 1;
    self.isLoading = false; //是否正在获取心情列表
    self.hasMore = true;   //是否还有更多
    self.url = url;
    self.method = method || 'GET';
    self.list = [];
    self.listName = listName || 'list';       
  }

  init(extData, isRefresh = false){  // extData,获取列表额外的参数， isRefresh: 是否强制刷新
    let self = this;
    self.extData = extData;
    let pages = getCurrentPages();
    self.pageContext = pages[pages.length - 1];  //获取当前页面栈
    isRefresh && (self.page = 1, self.isLoading = false, self.hasMore = true, self.list.length = 0);  //初始化
    console.log(isRefresh);
    if (self.list.length){ //之前有没有获取
      self.pageContext.setData({
        [self.listName]: self.list,
        hasMore: self.hasMore
      });
    }else{  //没有直接获取
      self.setList();
    }
    
  }

  setList(){
    //阻止重复加载
    let self = this;
    if(!self.url) return console.error('url未填写');
    if (self.isLoading) {
      return showTips('正在获取中...', false, 'loading');
    } else {
      showTips('正在获取中...', false, 'loading');
      self.isLoading = true;
      self.pageContext.setData({
        isLoading: true
      });
    }
    console.log('获取中。。。');
    let data = {page: self.page};
    self.extData && Object.assign(data, self.extData);
    NetRequest({
      url: self.url,
      method: self.method,
      data,
      success(res) {
        console.log(res);
        let { statusCode, data } = res;
        if (-statusCode === -200) {
          let { selList, hasMore } = data;
          console.log(selList);
          selList.length && selList.forEach(v => {
            let avatarUrl = v.author ? v.author.avatarUrl: '';
            avatarUrl && !/http/.test(avatarUrl) && (v.author.avatarUrl = staticHostUrl + avatarUrl);
            v.half && v.half.avatarUrl && !/http/.test(v.half.avatarUrl) && (v.half.avatarUrl = staticHostUrl + v.half.avatarUrl);
          });
          self.list = self.page === 1 ? self.list = selList: self.list.concat(selList);  //把列表添加进去
          hasMore ? self.page++ : (self.hasMore = false);  //服务器返回如果有更多则page增加，否则，通知对象的hasMore为false
          self.pageContext.setData({
            [self.listName]: self.list,
            hasMore: self.hasMore
          });
        } else {
          wx.showToast({
            title: '未登录或网络错误',
          })
        }

      },
      complete(res) {
        //console.log(res);
        self.isLoading = false;
        self.pageContext.setData({
          isLoading: self.isLoading
        });
        wx.stopPullDownRefresh();
        console.log('加载完成');
      }
    });


  }

  onPullDownRefresh(){
    let self = this;
    self.page = 1;
    self.hasMore = true;
    self.setList();
  }

  onReachBottom() {
    let self = this;
    //console.log(self.hasMore);
    self.hasMore && self.setList();
  }


  
}

module.exports = LoadList;