function switchWrong(e,that){
    switch(e.target.id){
        case 'A':
            console.log('aaaaaa');
            that.setData({
                bc_a:that.data.bc_wrong,
                fontColor_a:that.data.fontColor_w
            })
            console.log(that.data.fontColor_a)
            return;
        case 'B':
            that.setData({
                bc_b:that.data.bc_wrong,
                fontColor_b:that.data.fontColor_w
            })
            return;
        case 'C':
            that.setData({
                bc_c:that.data.bc_wrong,
                fontColor_c:that.data.fontColor_w
            })
            return;
        case 'D':
            that.setData({
                bc_d:that.data.bc_wrong,
                fontColor_d:that.data.fontColor_w
            })
            return;
    };
};
//重置背景，字体
function resetBackground(that){
  that.setData({
      bc_a:'white',
      bc_b:'white',
      bc_c:'white',
      bc_d:'white',
      fontColor_a:'black',
      fontColor_b:'black',
      fontColor_c:'black',
      fontColor_d:'black',
      leftDeg:0,
      rightDeg:0,
      countNum:10
  });
};
function switchRight(correct,that){
    switch(correct){
        case 'A':
            that.setData({
                bc_a:that.data.bc_right,
                fontcolor_a:'white'
            })
            console.log('答对了啊啊啊')
            console.log(that.data.fontcolor_a)
            return;
        case 'B':
            that.setData({
                bc_b:that.data.bc_right,
                fontcolor_b:'white'
            })
            return;
        case 'C':
            that.setData({
                bc_c:that.data.bc_right,
                fontcolor_c:'white'
            })
            return;
        case 'D':
            that.setData({
                bc_d:that.data.bc_right,
                fontcolor_d:'white'
            })
            return;
    };
};
function nextQuestion(that,lib){
    if(that.data.index>=that.data.questionLength-1){
        wx.showToast({
            title: '这已经是最后一题了',
            icon: 'none',
            duration: 2000
        })
        that.setData({
            index:that.data.index+1
        })
        return
    }
    lib.resetBackground(that);
    lib.countDown(that);
    that.setData({
        index:that.data.index+1
    })
};
//存储用户数据
function setUser(app){
    wx.request({
        url: 'https://xcx3.zhuozhida.cn/add.php',
        data: {
            userName:app.globalData.userInfo.nickName,
            userImg:app.globalData.userInfo.avatarUrl,
            openId:app.globalData.openId,
            hasChanged:app.globalData.hasChanged,
            nToy:app.globalData.nToy,
            arrOpenGId:app.globalData.arrOpenGId,
            changeNum:app.globalData.changeNum
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method:'POST',
        success: function(res) {
            console.log('发送成功')
        }
    })
}
//倒计时函数
const danger=wx.createInnerAudioContext();
danger.autoplay=false;
danger.src='https://xcx3.zhuozhida.cn/music/danger.wav'
var t=null;
//停止定时器
function stop(){
    clearInterval(t);
    danger.stop();
}
//答题倒计时函数
function countDown(that,changeNum){
    clearInterval(t);
    that.setData({
        leftDeg:0,
        rightDeg:0,
        countNum:10
    })
    var count=10;
    var left=0;
    var right=0;
    t=setInterval(function(){
        if(count<=1){
            that.setData({
               leftDeg:180,
               rightDeg:180,
               countNum:0
            })
            danger.stop();
            clearInterval(t);
            wx.showToast({
                title: '闯关失败',
                icon:'none',
                duration: 2000,
                success() {
                    if(changeNum>1){
                        that.setData({
                            bShowAlert:'block'
                        })
                    }else{
                        that.setData({
                            bOutAlert:'block'
                        })
                    }
                    switchRight(that.data.postList[that.data.index].answer,that)
                }
            });
        }else{
            --count;
            if(count<=3){
                danger.play();
            }else{
                danger.stop();
            }
            if(count>=5){
                right+=36;
                that.setData({
                    rightDeg:right,
                    countNum:count
                })
            }else{
                left+=36;
                that.setData({
                    leftDeg:left,
                    countNum:count
                })
            }
        }
    },1000)
};
module.exports = {
    switchWrong,
    resetBackground,
    switchRight,
    countDown,
    stop,
    nextQuestion,
    setUser
}
