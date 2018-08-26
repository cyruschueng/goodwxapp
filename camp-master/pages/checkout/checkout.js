Page({
    pay:function(){
        _fn.pay({},function(){
            wx.navigateTo({
                url:'../orderdetail/orderdetail'
            })
        });
    }
});
var _fn = {
    pay:function(data,callback){
        if(callback && typeof callback === 'function'){
            callback()
        }

    }
}