using SfSoft.web.App.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.App.Pay
{
    /// <summary>
    /// 群班级课程购买
    /// </summary>
    public partial class wxpay001 : System.Web.UI.Page
    {
        public SfSoft.Model.WX_PublicGood Info = new SfSoft.Model.WX_PublicGood();
        public string userId;
        protected void Page_Load(object sender, EventArgs e)
        {
            var id = Convert.ToInt32(Request["id"]);
            if (!IsPostBack)
            {
                Resolver();
            }
        }
        private void GetMessageInfo(int id)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Info = bll.GetModel(id);
        }


        private string Resolver()
        {
            string o = Request["o"];
            string url = Request.Url.ToString();
            //return "";

            // 对参数o url解码
            o = o.Replace(" ", "+");
            try
            {
                //对参数o 解密
                o = App.Helper.EncryptUtils.DESDecrypt(o, WxBaseConfig.DESEncryptKey, WxBaseConfig.DESEncryptIv);

                AppStart.Lib.UrlParams query = new AppStart.Lib.UrlParams(o, '&');
                /*
                    "o={0}&a={1}&h={2}&s={3}&id={4}&r={5}
                 */

                GetMsgInf(int.Parse(query.GetQuery("id")));
                userId = query.GetQuery("o");
                var data = new
                {
                    AppId = query.GetQuery("a"),
                    Hash = query.GetQuery("h"),
                    OpenId = query.GetQuery("o"),
                    ObjectId = query.GetQuery("id"),
                    Sharer = query.GetQuery("s"),
                    Remark = query.GetQuery("r"),
                    JsSdk = WeiXinServer.JsSdkServer.GetJsSdkUiPackage(url, App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret),
                };

                return Newtonsoft.Json.JsonConvert.SerializeObject(new
                {
                    Info = data,
                    Code = AppStart.Enums.EnumOAuthState.参数解析成功,
                    Msg = AppStart.Enums.EnumOAuthState.参数解析成功.ToString(),
                }, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
            catch (Exception ex)
            {
                return Newtonsoft.Json.JsonConvert.SerializeObject(new
                {
                    Code = AppStart.Enums.EnumOAuthState.参数解析失败
                }, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() });
            }
        }
        private void GetMsgInf(int id)
        {
            Task.Run(() =>
            {
                GetMessageInfo(id);
            });
        }
    }
}