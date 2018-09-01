function switchWrong(e,that){
    switch(e.target.id){
        case 'A':
            that.setData({
                bc_a:that.data.bc_wrong
            })
            return;
        case 'B':
            that.setData({
                bc_b:that.data.bc_wrong
            })
            return;
        case 'C':
            that.setData({
                bc_c:that.data.bc_wrong
            })
            return;
        case 'D':
            that.setData({
                bc_d:that.data.bc_wrong
            })
            return;
    };
};
function resetBackground(that){
  that.setData({
      bc_a:'#95ecb4',
      bc_b:'#95ecb4',
      bc_c:'#95ecb4',
      bc_d:'#95ecb4',
      leftDeg:0,
      rightDeg:0,
      countNum:10
  })
};
function switchRight(correct,that){
    switch(correct){
        case 'A':
            that.setData({
                bc_a:that.data.bc_right
            })
            return;
        case 'B':
            that.setData({
                bc_b:that.data.bc_right
            })
            return;
        case 'C':
            that.setData({
                bc_c:that.data.bc_right
            })
            return;
        case 'D':
            that.setData({
                bc_d:that.data.bc_right
            })
            return;
    };
}
//倒计时函数
var t=null;
function stop(){
    clearInterval(t)
}
function countDown(that){
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
            clearInterval(t);
            wx.showToast({
                title: '闯关失败',
                icon:'none',
                duration: 2000,
                success() {
                    setTimeout(function () {
                        wx.navigateBack()
                    }, 1000)
                }
            });
        }else{
            --count;
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
    stop
}
