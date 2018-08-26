//render.js   
//private 和 public 渲染页面


/** emoticonList 的元素内容
 * emoticonList[{ 
 *  img_id
 *  yun_url
 *  size 
 *  static_url  静止图
 *  thumbnail_url  缩略图
 * }]
 */
function emoticon(page,emoticon,add){
    if (emoticon){
        var _list = emoticon //浅拷贝，最好深拷

        for (var i=0;i<_list.length;i++)
        {
            //临时将地址指向image.12xiong.top
            // _list[i]["yun_url"] = "http://image.12xiong.top/" + _list[i]["yun_url"].split("/").pop()
            _list[i]["yun_url"] = "http://img.12xiong.top/" + _list[i]["yun_url"].split("/").pop()
            //静态压缩图
            _list[i]["static_url"] = _list[i]["yun_url"] + "?imageMogr2/thumbnail/96x96/format/jpg" 

            //Todo 根据size 拿缩略图
            var _size =  _list[i]["size"]
            var thumbnail_url = ''
            switch(_size){
                case 1:
                //  _list[i]["thumbnail_url"]  = _list[i]["yun_url"] + "?imageMogr2/thumbnail/170x170"
                 _list[i]["thumbnail_url"]  = _list[i]["yun_url"] + "?imageMogr2/thumbnail/124x124"
                 _list[i]["menu_type"] =  menu.TYPE.SQUARE
                 break;
                // case 170:
                //  _list[i]["thumbnail_url"]  = _list[i]["yun_url"] + "?imageMogr2/thumbnail/"+_size+"x"+_size
                _list[i]["thumbnail_url"]  = _list[i]["yun_url"] + "?imageMogr2/thumbnail/124x124"
                 _list[i]["menu_type"] =  menu.TYPE.SQUARE
                //  break;
                case 2:   //竖图
                _list[i]["thumbnail_url"]  = _list[i]["yun_url"] ;
                _list[i]["menu_type"] =  menu.TYPE.VERTICAL
                break;
                case 3:   //横图
                _list[i]["thumbnail_url"]  = _list[i]["yun_url"]  ;
                _list[i]["menu_type"] =  menu.TYPE.HORIZONTAL
                break;
                case 4:   //视频
                _list[i]["static_url"] = _list[i]["yun_url"] + "?vframe/jpg/offset/0/w/120/h/90"
                // _list[i]["static_url"] = _list[i]["yun_url"] + "?vframe/jpg/offset/0/w/120"
                _list[i]["thumbnail_url"]  = _list[i]["yun_url"] 
                _list[i]["menu_type"] =  menu.TYPE.VIDEO
                break;
                // case 3:break;
                // case 4:break;
            }
        }
        if(add)
        {
            var _list_add = page.data.emoticon.concat(_list)
            page.setData({emoticon:_list_add})  
        }
        else
            page.setData({emoticon:_list})  
    }
    
    //Todo 增加多种数据
  
}

/** categoryList 的元素内容
 * category_list[{ 
 *  name  名字
 * }]
 */
function category(page, categoryList){
    page.setData({category:categoryList})
}

var menu = {
    TYPE:{
        SQUARE:1, //小方块
        VERTICAL:2,  // 竖直 vertical
        HORIZONTAL:3, //横向
        VIDEO:4,
    },
    //竖直菜单
    vertical:function  (page,e){
        var new_h = parseInt( e.detail.height*680/e.detail.width)
        var min_h = 800
        new_h = new_h < min_h ? min_h:new_h
        page.setData({
            menuHeight:new_h
        })
    },
    // 横向菜单
    horizontal:function (page,e){
        var new_w = parseInt( e.detail.width/e.detail.height * 450)
        var min_w = 750
        new_w = new_w < min_w ? min_w:new_w
    
        page.setData({
        menuWidth:new_w
        })
    },

}

var share = function(current,urls){
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        // urls:yun_list
        urls: urls, // 需要预览的图片http链接列表
        success:function(res){
          console.log(res)
          },
        fail:function(res){console.log(res)},
        comlete:function(res){
          console.log(res)
          },
      })
}

var page = {
    NAME:{
        PRIVATE:"private",
        PUBLICK:"public",
    },
}

module.exports = {
    emoticon:emoticon,
    category:category,
    menu:menu,
    share:share,
    // page:page,
}