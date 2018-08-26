using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using System.Data;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class selforder : System.Web.UI.Page
    {
        public string HTMLCommunityLink = string.Empty;
        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                RegisteredHomeCard();
                Model.WX_WeiXinAccounts WeiXinAccounts = Helper.GetWeiXinAccounts("null"); //获取微信信息
                InitLink(userInfo.openid, WeiXinAccounts.WeiXinID);
                AddHomeCard(userInfo);
                hfOpenId.Value = userInfo.openid;
            }
        }
        private void RegisteredHomeCard()
        {
            if (Session["SelfRefreshToken"] == null)
            {
                try
                {
                    string code = Request.QueryString["code"].ToString();
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult tokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                    this.Page.Session["SelfRefreshToken"] = tokenResult.refresh_token;
                    userInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(tokenResult.access_token, tokenResult.openid);
                }
                catch (Exception ex)
                {
                    string url =WXConfig.AuthURL+"game/doublenovemberII/selforder.aspx";
                    url=Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(WXConfig.AgentAppID, url, "", Senparc.Weixin.MP.OAuthScope.snsapi_userinfo);
                    Response.Redirect(url);
                }
            }
            else {
                try
                {
                    string refreshToke = this.Page.Session["SelfRefreshToken"].ToString();
                    Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult tokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WXConfig.AgentAppID, refreshToke);
                    userInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(tokenResult.access_token, tokenResult.openid);
                }
                catch (Exception ex) {
                    string url = WXConfig.AuthURL + "game/doublenovemberII/selforder.aspx";
                    url = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAuthorizeUrl(WXConfig.AgentAppID, url, "", Senparc.Weixin.MP.OAuthScope.snsapi_userinfo);
                    Response.Redirect(url);
                }
            }
        }
        private void InitLink(string openid,string weixinid)
        {
            try
            {
                string backUrl = "{'openid':'" + openid + "','weixinid':'" + weixinid + "'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
            }
            catch (Exception ex) {
                ShenerWeiXin.WXHelper.WriteNode("(InitLink)" + ex.Message, "selforder.txt");
            }
        }
        private void AddHomeCard(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo)
        {
            try
            {
                string sql = "select openid from dbo.WX_HomeCard where openid='" + userInfo.openid + "'";
                DataSet ds= DBUtility.DbHelperSQL.Query(sql);
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                }
                else {
                    ShenerWeiXin.WXHelper.WriteNode("AddHomeCard=" + sql, "selforder.txt");
                    Model.WX_HomeCard model = new Model.WX_HomeCard();
                    model.City = userInfo.city;
                    model.Country = userInfo.country;
                    model.CreateDate = DateTime.Now;
                    model.HeadimgUrl = userInfo.headimgurl;
                    model.NickName = userInfo.nickname;
                    model.OpenId = userInfo.openid;
                    model.Province = userInfo.province;
                    model.Sex = userInfo.sex;
                    model.Unionid = userInfo.unionid;
                    BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
                    bll.Add(model);
                }
            }
            catch (Exception ex) {
                ShenerWeiXin.WXHelper.WriteNode("(AddHomeCard)"+ex.Message, "selforder.txt");
            }
        }
    }
}
