using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using System.Data;

namespace SfSoft.web.game.brainsexpert.autopartin
{
    public partial class _default : System.Web.UI.Page
    {
        public string HtmlTitle = string.Empty;
        public string HtmlStyle = string.Empty;
        public string HtmlInfo = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                try
                {
                    if (Request.QueryString["code"] != null)
                    {
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo = GetUserInfo(Request.QueryString["code"]);
                        ShenerWeiXin.User.ItemUser itemUser = new ShenerWeiXin.User.ItemUser();
                        if (itemUser.GetUserInfo(userInfo.openid, ItemObject.亲子书法) == null)
                        {
                            itemUser.Register(userInfo, 1, ItemObject.亲子书法, 0, 0);
                            HtmlTitle = "注册成功";
                            HtmlStyle = "weui_icon_success"; 
                        }
                        else {
                            HtmlTitle = "你已注册";
                            HtmlStyle = "weui_icon_warn";
                        }
                        WriteOrder(userInfo);
                    }
                    else {
                        throw new Exception();
                    }
                }
                catch (Exception ex) {
                    btnPartIn.Attributes.CssStyle.Add("display", "none");
                    HtmlTitle = "注册失败";
                    HtmlStyle = "weui_icon_warn";
                    HtmlInfo = "请重新扫描";
                }
            }
        }
        private Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo GetUserInfo(string code)
        {
            Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult oauthAccesstokenResult =
            Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(ShenerWeiXin.WXConfig.AgentAppID, ShenerWeiXin.WXConfig.AgentAppSecret, code);

            Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo =
                Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(oauthAccesstokenResult.access_token, oauthAccesstokenResult.openid);

            return userInfo;
        }
        
        /// <summary>
        /// 编写订单
        /// </summary>
        /// <param name="userInfo"></param>
        private void WriteOrder(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo)
        {

            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            if (Exists(bll, userInfo.openid)==false) {
                Model.WX_PublicOrder model = new Model.WX_PublicOrder();
                model.Address = "";
                model.City = userInfo.city;
                model.District = "";
                model.GoodID = 76;
                model.GoodsType = 11;
                model.IsSend = 11;
                model.Name = "扫描用户";
                model.OpenID = userInfo.openid;
                model.OrderDate = DateTime.Now;
                model.PayNumber = 1;
                model.Price = 119;
                model.Province = userInfo.province;
                model.Remark = "用户扫描加入活动，此用户是由我们代填写订单，此单只作进入活动，不作有效单处理";
                model.SendDate = DateTime.Now;
                model.TelePhone = "";
                bll.Add(model);
            }
        }
        private bool Exists(BLL.WX_PublicOrder bll, string openId)
        {
            DataSet ds= bll.GetList("openid='"+openId+"' and goodId=76 and (IsSend=1 or IsSend=11)");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                return true;
            }
            return false;
        }
    }
}
