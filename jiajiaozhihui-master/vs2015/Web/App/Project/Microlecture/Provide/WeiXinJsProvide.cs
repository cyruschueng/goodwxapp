using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class WeiXinJsProvide
    {
        public async Task<Senparc.Weixin.MP.Helpers.JsSdkUiPackage >  GetWeixinJsConfig(string url)
        {
            return await Senparc.Weixin.MP.Helpers.JSSDKHelper.GetJsSdkUiPackageAsync(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret, url);

        }
    }
}