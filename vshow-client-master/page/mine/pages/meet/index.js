const { imgDirUrl, getMeetListUrl, staticHostUrl, addMatchesUrl } = require('../../../../config');
const { NetRequest } = require('../../../../utils/util');
const app = getApp();
const data = {
  avatarUrl: `${imgDirUrl}headimg/8181505803971749.jpg`,
  unlikeIconUrl: `${imgDirUrl}btn_unlike.png`,
  homeIconUrl: `${imgDirUrl}tan_home.png`,
  iconManUrl: `${imgDirUrl}icon_man.png`,
  iconGirlUrl: `${imgDirUrl}icon_girl.png`,
  likeIconUrl: `${imgDirUrl}btn_like.png`,
  iconMainLike: `${imgDirUrl}icon_like.png`,
  iconMainUnlike: `${imgDirUrl}icon_unlike.png`,

  preClientX: -1,
  preClientX: -1,

  cardMoveX: 0,
  cardMoveY: 0,

  curAniIndex: 0,   // 当前动画的索引

  _cardData: [{
    id: 0,
    zIndex: 3,
    index: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'block'
  }, {
    id: 1,
    zIndex: 2,
    index: 1,
    scale: 0.95,
    translateX: 0,
    translateY: 20,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'block'
  }, {
    id: 2,
    zIndex: 1,
    index: 2,
    scale: 0.9,
    translateX: 0,
    translateY: 40,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'block'
  }, {
    id: 3,
    zIndex: 0,
    index: 3,
    scale: 0.9,
    translateX: 0,
    translateY: 40,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'none'
  }],

  cardData: [{
    id: 0,
    zIndex: 3,
    index: 0,
    scale: 1,
    translateX: 0,
    translateY: 0,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'block'
  }, {
    id: 1,
    zIndex: 2,
    index: 1,
    scale: 0.95,
    translateX: 0,
    translateY: 20,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'block'
  }, {
    id: 2,
    zIndex: 1,
    index: 2,
    scale: 0.9,
    translateX: 0,
    translateY: 40,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'block'
  }, {
    id: 3,
    zIndex: 0,
    index: 3,
    scale: 0.9,
    translateX: 0,
    translateY: 40,
    aniName: '',
    likeOpacity: 0,
    unlikeOpacity: 0,
    display: 'none'
  }]
};
Page({
  data,

  onLoad(){
    let self = this;
    
    app.getUserInfo(userInfo =>{
      if(!userInfo) return wx.showToast({
        title: '获取失败',
      })

      NetRequest({
        url: getMeetListUrl,
        method: 'GET',
        data: {
          page: 1, gender: 2
        },
        success(res) {
          console.log(res);
          let { statusCode, data } = res;
          if (-statusCode === -200) {
            data.selList = data.selList.map(v => {
              !/http/.test(v.avatarUrl) && (v.avatarUrl = staticHostUrl + v.avatarUrl);
              return v;
            });
            self.setData({
              meetList: data.selList.reverse()
            });
          } else {

          }

        },
        fail() {
          showTips('上传失败,请重试');
        },
        complete() {

        }
      });
      
    });
    
  },

  tapBtns(e){  //0为不喜欢，1为喜欢
    //console.log(e.currentTarget.dataset);
    let { index } = e.currentTarget.dataset;
    let self = this;
    let { cardData, meetList, curAniIndex } = self.data;
    let half = meetList[cardData[curAniIndex].index]._id;
    switch (index){
      case "0":

      break;

      case "1":
        self.addMatches(half);
      break;
    }
    cardData.forEach(v => v.index++);
    self.setData({
      cardData, _cardData: cardData
    });
  },

  bindtouchstart(e) {
    //console.log(e);
    
    let self = this;
    let { curAniIndex, cardData } = self.data;
    if (e.currentTarget.dataset.index != curAniIndex) return;
    cardData[curAniIndex].aniName = '';
    cardData[curAniIndex].translateX = 0;
    cardData[curAniIndex].translateY = 0;
    let { clientX, clientY } = e.touches[0];
    self.setData({  // 记录滑动开始的xy坐标，并初始化移动的xy坐标，初始化cardData，去掉动画class
      preClientX: clientX, preClientY: clientY, cardData
    });
  },

  bindtouchmove(e){
    let self = this;
    let { preClientX, preClientY, cardMoveX, cardMoveY, cardData, curAniIndex } = self.data;
    if (e.currentTarget.dataset.index != curAniIndex) return;
    let { clientX, clientY } = e.touches[0];
    let { windowWidth } = app.getDevice();
    cardMoveX = cardMoveX + clientX - preClientX;
    cardMoveY = cardMoveY + clientY - preClientY;
    //if (Math.abs(cardMoveX) < 10 && Math.abs(cardMoveY) < 10) return;
    cardData[curAniIndex].translateX = cardMoveX;
    cardData[curAniIndex].translateY = cardMoveY;
    let ratio = cardMoveX / (windowWidth * 0.4);
    if (ratio > 0.2) {  //向右划    喜欢
      cardData[curAniIndex].likeOpacity = ratio;

    } else if (ratio < -0.2) {  //向左划    不喜欢
      cardData[curAniIndex].unlikeOpacity = -ratio;
    }else{  //  回到中心点
      cardData[curAniIndex].unlikeOpacity  = 0;
      cardData[curAniIndex].likeOpacity = 0;
    }
    self.setData({   //同步到最新的x,y坐标
      preClientX: clientX,
      preClientY: clientY,
      cardMoveX, cardMoveY,
      cardData
    });

    
  },

  bindtouchend(e){
    //console.log('触发bindtouchend');
    let self = this;
    let { cardMoveX, cardMoveY, cardData, _cardData, curAniIndex, meetList} = self.data;
    if (!cardMoveX && !cardMoveY) return;
    let { windowWidth } = app.getDevice();
    //console.log(cardMoveX);
    if (Math.abs(cardMoveX) > windowWidth*0.4){   //划走
      console.log('划走了');
      if (cardMoveX > 0) {  //向右划走  喜欢
        let index = _cardData[curAniIndex].index;
        let half = meetList[index]._id;
        self.addMatches(half);
      } else {  //向左划走  不喜欢
        
      }
      _cardData.unshift(_cardData.pop());
      _cardData.forEach((v, i) => {
        v.id = cardData[i].id;
        v.index = cardData[i].index;
      });
      _cardData[curAniIndex].index += cardData.length;
      curAniIndex = (curAniIndex+1) % cardData.length;
      self.setData({
        curAniIndex, cardData: _cardData, _cardData, cardMoveX: 0, cardMoveY: 0
      });
      
      
    }else{// 还会回来
      cardData[curAniIndex].aniName = 'tocenter';
      cardData[curAniIndex].likeOpacity = 0;
      cardData[curAniIndex].unlikeOpacity = 0;
      self.setData({
        cardData, cardMoveX: 0, cardMoveY: 0
      });
    }
  
    
  },

  addMatches(half){
    if(!half) return console.error('用户id不能为空');
    NetRequest({
      url: addMatchesUrl,
      data: {
        half
      },
      success(res) {
        console.log(res);
        let { statusCode, data: { isMatches, halfId } } = res;
        //console.log(isMatches, halfId);
        if (-statusCode === -200 && isMatches){  //匹配成功
          wx.navigateTo({
            url: 'pages/result/index?id=' + halfId
          });
        }
      },
      fail(res) {
        console.log(res);
      }
    });
  }
})



