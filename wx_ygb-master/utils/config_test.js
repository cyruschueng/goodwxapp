var config = {};

var isProduction = false;

if (isProduction) {
    //生成环境
} else {
    //开发环境
    config.cdn_image_src = `http://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images`;

    //静态资源前缀
    // config.websocket_data_src = `http://192.168.10.42:8000/broadcast`;
    // config.websocket_data_src = `http://192.168.10.219:9028/sam-service3/upload/broatcast`;
    config.websocket_data_src = `http://tmp.s.weshaketv.com/sam-service3/upload/broatcast`;
   
    //査Api地址
    config.websocket_url = `wss://tmp.s.weshaketv.com/broadcast_test`;
    config.https_url = `https://tmp.s.weshaketv.com/broadcast_test`; 
    //超哥Api地址
    config.zc_url = `https://tmp.s.weshaketv.com/broadcast_test`;

    
    // config.websocket_url = `wss://tmp.s.weshaketv.com/broadcast`;
    // config.https_url = `https://tmp.s.weshaketv.com/broadcast`;
    // config.zc_url = `https://tmp.s.weshaketv.com/broadcast`;
  
}
 
// 默认头像 
config.icon = `https://1251097942.cdn.myqcloud.com/1251097942/tv/scws/wozhidao/images/head/touxiang1.jpg`;
config.nickName = '匿名';


module.exports = config;

