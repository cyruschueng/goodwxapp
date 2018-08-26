using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Cryptography;
using System.Text;
using SfSoft.web.weixinconfig;

namespace SfSoft.web.wxpay.order
{
    public partial class goodspayment : System.Web.UI.Page
    {
        public Model.WX_Article_Release HtmlArticleModel;
        public Model.WX_PublicGood HtmlGoodsModel;
        private string aid = string.Empty;
        private string gid = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                Run();
                
            }
        }
        private void Run()
        {
            if (Request.QueryString["code"]!=null)
            {
                
                Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult oauthAccessTokenResult=
                Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret, Request.QueryString["code"]);
                hfOpenid.Value = oauthAccessTokenResult.openid;
                
                //hfOpenid.Value = "oc6zzs1y_A_7RgGi6EGLBUrPCfRk";
                Parser();
                GetArticleInfo(aid);
                GetProductInfo(gid);
                hfTradeno.Value = ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();
                hfGoodsid.Value = gid;
                hfPrice.Value = HtmlGoodsModel.PublicPrice.ToString();
                hfArticleId.Value = aid;
                WxJsSdkData wxjs = new WxJsSdkData();
                wxjs.Uri = Request.Url.AbsoluteUri;
                Session["WXJSDKDATA"] = wxjs;
            }
            else { 
                string aid=Request.QueryString["aid"];
                string gid=Request.QueryString["gid"];
                byte[] bytes = Encoding.Default.GetBytes("{aid:"+aid+",gid:"+gid+"}");
                string str = Convert.ToBase64String(bytes);
                string host = Request.Url.Host;
                string port = Request.Url.Port.ToString();
                string path = Request.Path;

                string url = "http://" + host  + path + "?m=" + Server.UrlEncode(str);
                Response.Redirect( Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(ShenerWeiXin.WXConfig.AgentAppID, url, "STATE", Senparc.Weixin.MP.OAuthScope.snsapi_base));
                //Response.Redirect(url);
            }
        }
        /// <summary>
        /// 解析参数
        /// </summary>
        /// <param name="m"></param>
        private void Parser() 
        {
            string m = Request.QueryString["m"]; //文章ID
            try
            {
                m=Server.UrlDecode(m);
                /*解码*/
                byte[] outputb = Convert.FromBase64String(m);
                string orgStr = Encoding.Default.GetString(outputb);
                Newtonsoft.Json.Linq.JObject jobject = Newtonsoft.Json.Linq.JObject.Parse(orgStr);
                aid = jobject["aid"].ToString();
                gid = jobject["gid"].ToString();
            }
            catch (Exception ex) { 
                
            }
        }
        private void GetArticleInfo(string aid)
        {
            BLL.WX_Article_Release bll = new BLL.WX_Article_Release();
            Model.WX_Article_Release model = bll.GetModel(int.Parse(aid));
            if (model != null)
            {
                HtmlArticleModel = model;
            }
            else {
                HtmlArticleModel = new Model.WX_Article_Release();
            }
        }
        private void GetProductInfo(string gid)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(int.Parse(gid));
            if (model != null)
            {
                HtmlGoodsModel = model;
            }
            else {
                HtmlGoodsModel = new Model.WX_PublicGood();
            }
        }
    }
}
