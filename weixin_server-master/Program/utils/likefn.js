
import config from "./config"

const likeshe = (prepare,callback) =>{


  wx.request({
    url: config.likeByShe,
    data: prepare,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      //请求失败时会带有error_code
      try{
        res = JSON.parse(res.data)
      }catch(e){
        res = res.data
      }
      if(callback){
        callback(res);
      }
    }
  })
  
}



module.exports = {
  likeshe
}
