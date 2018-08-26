using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Weixin.Service.Helper
{
    public  class WeiXinAccounts
    {
        private static WeiXinAccounts _weixinAccounts = null;
        private static readonly object lockHelper = new object();
        private WeiXinAccounts(){}
        public static WeiXinAccounts CreateWeiXinAccounts()
        {
            if (_weixinAccounts == null) {
                lock (lockHelper) {
                    if (_weixinAccounts == null) {
                        _weixinAccounts = new WeiXinAccounts();
                    }
                }
            }
            return _weixinAccounts;
        }
        public void UpDate(string weixinId,string refreshToken)
        {
            SfSoft.BLL.WX_WeiXinAccounts bll = new SfSoft.BLL.WX_WeiXinAccounts();
            SfSoft.Model.WX_WeiXinAccounts model=bll.GetModelByWeiXinID(weixinId);
            if (model != null) {
                model.Refresh_token = refreshToken;
                model.ExpiresIn = 2592000;
                model.GetTokenDate = DateTime.Now;
                bll.Update(model);
            }
        }
        public SfSoft.Model.WX_WeiXinAccounts GetWeiXinAccounts(string weixinId)
        {
            SfSoft.BLL.WX_WeiXinAccounts bll = new SfSoft.BLL.WX_WeiXinAccounts();
            SfSoft.Model.WX_WeiXinAccounts model = bll.GetModelByWeiXinID(weixinId);
            return model;
        }
    }
}