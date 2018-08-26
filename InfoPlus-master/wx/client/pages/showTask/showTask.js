import qcloud from '../../vendor/wafer2-client-sdk/index';
import config from '../../config';
import util from '../../utils/util';

const showTask = {
    data:{
        
    },
    onLoad(option){
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
        
        let taskId = option.taskId;
        util.showBusy('正在加载...');
        qcloud.request({
            url: config.service.getGroupTaskUrl,
            login: true,
            data: {taskId},
            success: r=> {
                wx.hideToast();
                
                let task = r.data.data;
                //console.log(task);
                this.setData({
                    task:task
                });
            },
            fail: e=> {
                util.showModel('请求失败', e);
                console.log('request fail', e);
            }
        });

        console.log(option)
    },
    onShareAppMessage(res) {
        let path = `pages/showTask/showTask?taskId=${this.data.task.taskId}`;
        console.log(path);
        return {
            title: '我发起了一个群任务，快来一起完成',
            path: path,
            success: (res)=> {
              // 转发成功
              let shareTicket = res.shareTickets.pop();
              console.log(shareTicket);
              //that.setData({shareTicket:shareTicket});
            },
            fail: (err)=> {
              // 转发失败
            }
          }
    }
};
Page(showTask);