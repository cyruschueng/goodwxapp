


module.exports = {
    emoticon:"emoticon",
    category:"category",
    session:"session",
    USER_INFO:"USER_INFO", //用户信息
    // PAINTER_USER_STATUS:"PAINTER_USER_STATUS", // 1开始画  2继续画
    PAINTER_USER_IS_FREE:"PAINTER_USER_IS_FREE", //页面显示 true开始画 free,  false继续画 busy
    //第一次登陆：""
    //已加入：存储当前step的 {status,theme_name, step_id，img_url，}
    //未加入：{status}
    PAINTER_STEP_CURRENT_INFO:"PAINTER_STEP_CURRENT_INFO", 


    //临时图片缓存
    //object  image
    PAINTER_IMAGE_CACHE:"PAINTER_IMAGE_CACHE", 

     //从我的图库选择的图片
     //{img_url:"",width:"",height:""}
    PAINTER_IMAGE_SELECT:"PAINTER_IMAGE_SELECT",
}