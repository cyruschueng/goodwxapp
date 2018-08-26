// pages/game/game.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 成语数组（检验成语组 剩余成语组 解释提示组 剩余解释组 ）
    checkidiom:[],
    restidiom:[],
    explain: [],
    restexplain:[],
    //打乱的字
    fonts:[],
    // 选中的字（选中的字 选中字的下标集合）
    selectFont:"",
    selectid:[],
    // 动画
    // 提示动画
    animation:{},
    errAnima:{},
    // 下一关动画
    passanimation:{},
    // 提示内容
    hintcon:"",
    // 闯关数
    passnum:"",
    // 金币数目
    iconnum:'',
    // 开关
    clickFlag: true,
    nextFlag:false,
    // 提示开关
    hintFlag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
    });
    wx.showShareMenu({
      withShareTicket: true,
    });
    wx.showLoading({
      title: '数据加载中...',
    });
    let passnum = options.passnum ? options.passnum : "";
    app.req.idiom(passnum).then(res=>{
      wx.hideLoading();
      let fonts =[];
      // 对成语数组进行处理（8个成语 剩余成语 8个解释 剩余解释）
      let idioms = res.d.Names.slice(0,8);
      let restidiom = res.d.Names.splice(8);
      let explain = res.d.Prompt.slice(0, 8);
      let restexplain = res.d.Prompt.splice(8);
      passnum = res.d.Pass;
      // 对成语进行打乱
      fonts = this.randidiom(idioms);
      // 获取金币数
      let iconnum = res.d.Money;
      // 初始化数据
      this.setData({
        fonts: fonts,
        checkidiom: idioms,
        restidiom: restidiom,
        explain: explain,
        restexplain: explain,
        passnum: passnum,
        iconnum: iconnum,
        nextFlag: false,
        // nextFlag: true,
      })
    }).catch(err => { console.log(err) });
    // 创建动画
    this.errAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
  },
  // 打乱成语方法
  randidiom(con){
    let fonts = [];
    let idioms = con.map((item)=>{
      return item.split("");
    })
    for(let i=0;i<idioms.length;i++){
      for(let j=0;j<idioms[i].length;j++){
        fonts.push(idioms[i][j]);
      }
    }
    // console.log(fonts);
    // 处理字数不够32
    if (fonts.length >= 32) {
      fonts = fonts;
    } else {
      for (var i = 0; i < 32; i++) {
        if (!fonts[i]) {
          fonts.push("");
          // console.log(fonts);
        }
      }
    }
    let randfonts = [];
    let randnums = [];
    while (randfonts.length < fonts.length){
      let randnum = Math.floor(Math.random()*fonts.length);
      if (randnums.indexOf(randnum) == -1){
        randnums.push(randnum);
        let obj = {};
        if (fonts[randnum] !== ""){
          obj.font = fonts[randnum];
          obj.tapFlag = false;
          obj.active = false;
        }else{
          obj = "";
        }
        randfonts.push(obj)
      }
      // console.log(randfonts)
    };
    randfonts.splice(0, 0, ""); 
    randfonts.splice(5, 0, ""); 
    randfonts.splice(30, 0, ""); 
    randfonts.splice(36, 0, ""); 
    return randfonts;
  },
  // 选中每个字时间
  onSelect:function(e){
    this.animation.translateY(79).opacity(0).step();
    // 获取id 对应的字 选中的字 选中字的id 
    let itemid = e.target.id;
    let itemFont = e.target.dataset.font;
    let totalFont = this.data.selectFont;
    let selectid = this.data.selectid;
    let fonts = this.data.fonts;
    // 获取成语数据
    let checkidiom = this.data.checkidiom;
    let restidiom = this.data.restidiom;
    let explain = this.data.explain;
    let restexplain = this.data.restexplain;

    //点击开关（点击对象的样式变化）
    fonts[itemid].tapFlag = !fonts[itemid].tapFlag;
    //对当前字是否点击过进行判断
    if (selectid.indexOf(itemid) !== -1 ){
      // 已经点击 删除id
      selectid.splice(selectid.indexOf(itemid),1);
      // 删除当前已经点击的字
      totalFont = totalFont.replace(itemFont, "")
    }else{
      selectid.push(itemid);
      totalFont += itemFont;
    }
    if (totalFont.length == 4){
      // console.log(this.data.checkidiom.indexOf(totalFont));
      if(this.data.checkidiom.indexOf(totalFont) == -1){
        for (let i = 0; i < selectid.length; i++) {
          fonts[selectid[i]].tapFlag = false;
        }
        // 创建错误动画
        this.errAnimation.rotate(15).step()
        this.setData({
          errAnima: this.errAnimation.export(),
        })
        setTimeout(function () {
          this.errAnimation.rotate(-15).step()
          this.setData({
            errAnima: this.errAnimation.export(),
          })
          setTimeout(function(){
            this.errAnimation.rotate(0).step()
            this.setData({
              selectFont: "",
              errAnima: this.errAnimation.export(),
            })
          }.bind(this),60)
        }.bind(this),60)
      }else{
        // 验证成语正确
        if (restidiom.length > 1){
          let num = checkidiom.indexOf(totalFont);
          checkidiom.splice(num, 1);
          checkidiom.push(restidiom[0]);
          restidiom.shift();

          fonts = this.randidiom(checkidiom);
          
          explain.splice(num, 1);
          explain.push(restexplain[0]);

          console.log(checkidiom);
          console.log(explain);
          restexplain.shift();

        } else if (restidiom.length == 1){
          let num = checkidiom.indexOf(totalFont);
          checkidiom.splice(num, 1);
          checkidiom.push(restidiom[0]);
          restidiom=[];

          fonts = this.randidiom(checkidiom);
      
          explain.splice(num, 1);
          explain.push(restexplain[0]);
          restexplain = [];

          console.log(checkidiom);
          console.log(explain);
        } else{
          let num = checkidiom.indexOf(totalFont);
          console.log(checkidiom.indexOf(totalFont));
          checkidiom.splice(num, 1);
          explain.splice(num,1);

          for (let i = 0; i < selectid.length; i++) {
            fonts[selectid[i]].active = true;
          }
          // 成语全部正确 打开下一关界面
          if (checkidiom.length == 0){
             this.setData({
               nextFlag:true
             })
          }
        }
        // 清除选中状态
        for (let i = 0; i < selectid.length; i++) {
          fonts[selectid[i]].tapFlag = false;
        }
      }
      selectid = [];
    } else if (totalFont.length > 4){
      totalFont = "";
      totalFont += itemFont;
    }
    this.setData({
      selectFont: totalFont,
      selectid: selectid,
      fonts: fonts,
      checkidiom: checkidiom,
      restidiom: restidiom,
      explain: explain,
      restexplain: restexplain,
      animation: this.animation.export(),
    })
  },
  // 提示
  hint:function(){
    let explain = this.data.explain;
    let hintcon = explain[Math.floor(Math.random() * explain.length)];
    let iconnum  = this.data.iconnum;
    // 点击动画
    if(this.data.hintFlag){
      this.setData({
        hintFlag:false,
      })
      if (iconnum < 10) {
        hintcon = "金币不足，分享好友或者通关可获得金币";
        this.animation.translateY(-79).opacity(1).step()
        this.setData({
          iconnum: iconnum,
          hintcon: hintcon,
          animation: this.animation.export(),
          hintFlag:true,
        });
      } else {
        this.animation.translateY(-79).opacity(1).step()
        this.setData({
          hintcon: hintcon,
          animation: this.animation.export()
        });
        // 提示减少金币
        app.req.cutmoney().then(res => {
          if (res.f === 1) {
            iconnum -= 10;
            this.setData({
              iconnum: iconnum,
              hintFlag: true,
            })
          }
        }).catch(err => { console.log(err) })
      }
    }
  },
  // 进入下一关
  goNext:function(){
    let passnum = parseInt(this.data.passnum)+1;
    console.log(passnum)
    if (this.data.clickFlag) {
      app.req.addmoney(2).then(res=>{
        console.log(res);
      })
      wx.redirectTo({
        url: '../game/game?passnum='+passnum,
      }),
      this.setData({
        clickFlag: false,
      })
    }
  },
  // 点击关闭
  tapClose:function(){
    let passnum = parseInt(this.data.passnum);
    wx.navigateTo({
      url: '../game/game?passnum=' + passnum,
    }),
    this.setData({
      nextFlag: false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '十关之后你会变成文盲,不信来战！',
      path: '/pages/list/list',
      success:res =>{
        // 转发成功
        if (res.errMsg) {
          app.req.addmoney(1).then(res => {
            if (res.f === 1) {
              let iconnum = parseInt(this.data.iconnum) + 10;
              this.setData({
                iconnum: iconnum,
              })
            }
          }).catch(err => { console.log(err) })
        }
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})