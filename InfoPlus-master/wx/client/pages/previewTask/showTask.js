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
                console.log('show share menu');
            }
        });
        
        this.setData({
            control:{display:false}
        });
       
        let taskId = option.taskId;
        this.getTaskInfo(taskId);
        //console.log(option);
    },

    getTaskInfo(taskId){
        util.showBusy('正在加载...');
        qcloud.request({
            url: config.service.getGroupTaskUrl,
            login: true,
            data: {taskId},
            success: r=> {
                wx.hideToast();
                this.setData({
                    control:{display:true}
                });
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
    },

    saveTaskGroupId(taskId,shareTicket,iv,encryptedData){
        util.showBusy('正在加载...');
        qcloud.request({
            url: config.service.saveTaskGroupId,
            login: true,
            data: {taskId,shareTicket,iv,encryptedData},
            method:'post',
            success: r=> {
                wx.hideToast();
                wx.navigateTo({
                    url: `../showTask/showTask?taskId=${taskId}`
                });
            },
            fail: e=> {
                util.showModel('请求失败', e);
                console.log('request fail', e);
            }
        });
    },

    onShareAppMessage(res) {
        let path = `/pages/showTask/showTask?taskId=${this.data.taskId}`;
        //console.log(path);
        return {
            title: '我发起了一个群任务，快来一起完成',
            path: path,
            success: (res)=> {
              // 转发成功
              let shareTicket = res.shareTickets.pop();
              console.log(shareTicket);
              wx.getShareInfo({
                shareTicket:shareTicket,
                success:(e,d,i)=>{
                    this.saveTaskGroupId(this.data.task.taskId,shareTicket,e.iv,e.encryptedData);
                    console.log(e);
                    console.log(d);
                    console.log(i);
                 }
             });


              //that.setData({shareTicket:shareTicket});
            },
            fail: (err)=> {
              // 转发失败
            }
          }
    }
};
Page(showTask);