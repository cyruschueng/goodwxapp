var ToastData={
  toastSelft:{
    isShowToast:false,
    toastText:'正在上传中'    
  }
}
var app = getApp();

var ToastSelf={
    showToast:function(options){
         var title=options.title||'',

               self=this;
         this.setData({
             'toastSelft.isShowToast':true,
             'toastSelft.toastText':title
         })
    },
    hideToast:function(){
          this.setData({
             'toastSelft.isShowToast':false,
             'toastSelft.toastText':''
         })     
    }
}

module.exports={
  ToastSelf,
  ToastData
}
