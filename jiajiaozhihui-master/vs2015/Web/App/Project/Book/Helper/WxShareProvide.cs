using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Book.Helper
{
    public class WxShareProvide
    {
        public void AddShare(string openId,int bookId)
        {
            if (Exist(openId) == false) {
                var user = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Info(App.Helper.WxBaseConfig.AppID, openId);
                var model = new Model.wx_book_share()
                {
                    book_id = bookId,
                    city = user.city,
                    create_date = DateTime.Now,
                    header_img_url = user.headimgurl,
                    is_act = 1,
                    subscibe = user.subscribe,
                    nick_name = user.nickname,
                    openid = user.openid,
                    province = user.openid
                };
                BLL.wx_book_share bll = new BLL.wx_book_share();
                bll.Add(model);
            } 
            
        }
        public bool Exist(string openId)
        {
            BLL.wx_book_share bll = new BLL.wx_book_share();
            var list= bll.GetModelList("openid='" + openId + "'");
            return list.Count > 0 ? true : false;
        }
    }
}