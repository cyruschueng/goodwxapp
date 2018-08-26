
var ajax = require('../../common/ajax/ajax');
var config = require('../../config');
var host = config.host;
class FileUploader{
	constructor(props) {
		this.reset(props);
	}
    reset(props){
        this.max = props.max || 5;
        this.files = props.files || [];
        this.afterChange = props.afterChange;
        this.orderId = props.orderId;

        this.renderData = {
            btns:[]
        };
    }
	change(e){
        var self = this;
        if(!e){
            this.afterChange(this.createRenderData());
        }else{
            var eventParam = e.currentTarget.dataset.param;
            if(eventParam){
                eventParam = JSON.parse(eventParam);
                var type = eventParam.type;
                var index = eventParam.index;
                if(type === 'add'){
                    self.uploadImg(function(res){
                        self.afterChange(self.createRenderData());
                    });
                }else if(type=== 'finished' ){
                    self.delImg(index,function(res){
                         self.afterChange(self.createRenderData());
                    });
                }
            }

        }
	}
    createRenderData(){
        var renderData = {btns:[]};
        if(this.files && this.files.length>0){
            this.files.forEach((fv,fk)=>{
                if(fv){
                    renderData.btns.push({
                        imgUrl:fv,
                        eventParam:JSON.stringify({
                            type:'finished',
                            index:fk
                        })
                    })
                }
            });
        }
        if(renderData.btns.length<this.max){
            renderData.btns.push({
                imgUrl:'../../asset/addimg-btn.png',
                eventParam:JSON.stringify({
                    type:'add'
                })
            })
        }
        return renderData;
    }
	uploadImg(callback){
		var self = this
        var uploadMax = this.max-this.files.length;
        var orderId = self.orderId;
        wx.chooseImage({
            count: uploadMax, // 默认9
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                console.log(res);
                var images = res.tempFilePaths;
                images.forEach(function(item, index) {
                    wx.showLoading()
                    self.upload({
                        orderId:orderId,
                        filePath:item
                    },function(res){
                        wx.hideLoading();
                        if(res.code === '0000'){
                            var imgUrl = res.data.imgUri;
                            self.files.push(imgUrl);
                            callback();
                        }
                    });
                });
            }
        });
	}
    delImg(index,callback){
        var self = this;
        wx.showModal({
            title:'提示',
            content:'确定要删除这张照片么?',
            success:function(res){
                console.log(res);
                if(res.confirm){
                    self.files.splice(index,1);
                    callback();
                }
            }
        })
    }

    upload(param,callback){
        var self = this;
        var orderId = self.orderId;
        var filePath = param.filePath;//string
        var url = host+'/app/comment/image/upload';

        var userInfo = wx.getStorageSync( 'userinfo' ) || {};
        wx.uploadFile({
            url:url,
            filePath:filePath,
            name:'uploadFile',
            header:{ "Content-Type": "multipart/form-data" },
            formData:{
                param:JSON.stringify({
                    orderId: orderId
                }),
                token:userInfo.token||''
            },
            success:function(res){
                console.log(333,res);
                var resData = JSON.parse(res.data);
                if(!resData.success || resData.code!=='0000'){
                    wx.showModal({
                        title:'错误',
                        content:'抱歉,上传失败('+resData.code+')'+JSON.stringify(resData),
                        showCancel:false
                    });
                }
                if(typeof callback==='function'){
                    callback(resData);
                }
            }
        });
    }
}


module.exports = FileUploader;