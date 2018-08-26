using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ShenerWeiXin.Interface;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;

namespace ShenerWeiXin.User
{
    public class NoNFollower:IUser
    {
        public SfSoft.Model.WX_HomeCard GetUser(int id)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.GetModel(id);
        }

        public SfSoft.Model.WX_HomeCard GetUser(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.GetModelByAgentId(openid);
        }

        public int Add(SfSoft.Model.WX_HomeCard user)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Add(user);
        }

        public bool Update(SfSoft.Model.WX_HomeCard user)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Update(user);
        }

        public bool Delete(int id)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Delete(id);
        }

        public bool Delete(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.DeleteByAgentId(openid);
        }

        public bool IsExist(int id)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.Exists(id);
        }

        public bool IsExist(string openid)
        {
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            return bll.ExistsByAgentId(openid);
        }


        public int Add(OAuthUserInfo user, string openid)
        {
            throw new NotImplementedException();
        }


        public string TelePhone(string openid)
        {
            throw new NotImplementedException();
        }

        public string HeadimgUrl(string openid)
        {
            throw new NotImplementedException();
        }


        public string Name(string openid)
        {
            throw new NotImplementedException();
        }


        public string NickName(string openid)
        {
            throw new NotImplementedException();
        }
    }
}
