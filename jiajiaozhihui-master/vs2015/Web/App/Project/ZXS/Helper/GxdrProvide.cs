using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Helper
{
    public class GxdrProvide
    {
        public static void Init(string openId)
        {
            var player = GetPlayer(openId);
            if (player == null) {
                var userInfo = GetUserInfo(openId);
                if (userInfo != null)
                {
                    CreatePlayer(userInfo);
                }
            }
        }
        private static SfSoft.Model.WX_UserInfo GetUserInfo(string openId)
        {
            SfSoft.BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            return bll.GetModel(openId);
        }
        private static SfSoft.Model.WX_TestQuestion_Player GetPlayer(string openId)
        {
            SfSoft.BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            return bll.GetModeByServiceOpenID(openId);
        }
        private static void CreatePlayer( SfSoft.Model.WX_UserInfo userInfo)
        {
            SfSoft.Model.WX_TestQuestion_Player model = new Model.WX_TestQuestion_Player();
            model.City = userInfo.City;
            model.CreateDate = DateTime.Now;
            model.HeaderImgUrl=userInfo.HeadImgUrl;
            model.NickName=userInfo.NickName;
            model.Province=userInfo.Province;
            model.ServiceOpenID=userInfo.OpenId;
            SfSoft.BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            bll.Add(model);
        }
        public static Models.Gxdr.Info GetGxdrInfo(int id,string openId)
        {
            SfSoft.BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            Models.Gxdr.Info info = new Models.Gxdr.Info();
            var result = bll.GetModel(id);
            if (result != null) {
                info.Id = id;
                info.ActivityName = result.ActivityName;
                info.OpenId = openId; // SfSoft.Common.DEncrypt.DEncrypt.Encrypt(openId, "shenerxm");
            }
            return info;
        }
    }
}