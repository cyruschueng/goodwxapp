import qcloud from '../../vendor/wafer2-client-sdk/index';
import config from '../../config';
import util from '../../utils/util';

const addTask = {
    _data:{
        today:util.formatTime(new Date()).split(' ')[0],
        isSubmit:false
    },
    data:{
        task:{
            title:'',
            detail:'',
            showLocation:false,
            endTime:'1990-01-01 00:00'
        },
        showLocation:false,
        reqName:false,
        isSingle:false,
        shareTicket:''
    },
    onLoad(){
        this.setData({
            date:'选择日期',
            time:'选择时间',
            today:this._data.today,
        });
        wx.showShareMenu({
            withShareTicket: true,
            success:r=>{
                console.log("show!");               
                console.log(r);
            }
        });
        wx.getShareInfo({
            shareTicket:1234567,
            success:(e,d,i)=>{
                console.log(e);
                console.log(d);
                console.log(i);
            }
        });
    },
    bindDateChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value);
        let time = this.data.time=='选择时间'?'12:00':this.data.time;
        this.setData({
          date: e.detail.value,
          time:time
        });
        this.data.task.endTime = this.data.date+' '+this.data.time;
    },
    bindTimeChange(e){
        let date = this.data.date=='选择日期'?this._data.today:this.data.date;
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
          date: date,
          time: e.detail.value
        });
        this.data.task.endTime = this.data.date+' '+this.data.time;        
    },
    getLocationChange(e){
        this.setData({
            showLocation: e.detail.value
        });
    },
    formSubmit(e){
        if(this._data.isSubmit) return;
        console.log(e.detail.value);
        let task = {...this.data.task,
            title: e.detail.value.title,
            detail: e.detail.value.detail,
            showLocation: e.detail.value.showLocation
        }
        console.log(task);
        this.setData({
           task:task
        });
        this.saveData();
        console.log(this.data);
    },
    saveData(){
        if(!this.data.task.title.trim()){
            util.showTip('标题不能为空!');
            return;
            //util.showModel('提示','请输入标题');
        }
        util.showBusy('执行中...');
        this._data.isSubmit=true;
        qcloud.request({
            url: config.service.saveGroupTaskUrl,
            login: true,
            data: this.data.task,
            method:'post',
            success: (result)=> {
                //this._data.isSubmit=false;
                let taskId = result.data.data.taskId;
                let nickName = result.data.data.nickName;
                wx.navigateTo({
                  url: `../previewTask/showTask?taskId=${taskId}`
                });

                //util.showSuccess('请求成功完成');
                
                // that.setData({
                //     requestResult: JSON.stringify(result.data)
                // })
            },
            fail: (error)=> {
                //this._data.isSubmit=false;
                util.showModel('请求失败', error);
                console.log('request fail', error);
            },
            complete: ()=>{
                wx.hideToast();
                this._data.isSubmit=false;
            }
        })
    },
    onShareAppMessage(res) {
        console.log("onshare");
        return {
            title: '我发起了一个群通知，点击查看',
            path: '/page/user?id=123',
            success: function(res) {
              // 转发成功
              let shareTicket = res.shareTickets.pop();
              console.log(shareTicket);
              //that.setData({shareTicket:shareTicket});
            },
            fail: function(res) {
              // 转发失败
            }
          }
        
        // while(this._data.checkSave){

        // };
        /*
        let that = this;
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '我发起了一个群通知，点击查看',
          path: '/page/user?id=123',
          success: function(res) {
            // 转发成功
            that.setData({shareTicket:res.shareTickets.pop()});
            that.saveData();
          },
          fail: function(res) {
            // 转发失败
          }
        }
        */
    }
}
Page(addTask);