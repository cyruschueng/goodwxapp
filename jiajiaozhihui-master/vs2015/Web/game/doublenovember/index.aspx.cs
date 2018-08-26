#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using System.Data;
using SfSoft.SfEmc;

namespace SfSoft.web.game.doublenovember
{
    public partial class index : System.Web.UI.Page
    {
        
        private string _openid = string.Empty;
        private string _id = string.Empty;
        private string _mode = string.Empty;
        private string _share = string.Empty;
        private string p = "";

        #region 分享参数定义
        public string HTMLAuthUrl = string.Empty;
        public string HTMLAppid = string.Empty;
        public string HTMLNoncestr = string.Empty;
        public string HTMLTimestamp = string.Empty;
        public string HTMLTicket = string.Empty;
        public string HTMLSignature = string.Empty;
        public string HTMLShareLink = string.Empty;
        #endregion

        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink="javascript:void(0)"; // 我的信息

        protected void Page_Load(object sender, EventArgs e)
        {
            string userAgent = Request.UserAgent;
            if (!userAgent.ToLower().Contains("micromessenger"))
            {
                //Response.Redirect(WXConfig.AuthURL + "game/doublenovember/weixinpage.html");
            }
            if (!IsPostBack)
            {
                try
                {
                    #region 分享参数配置
                    HTMLAuthUrl = WXConfig.AuthURL;
                    HTMLAppid = WXConfig.appId;

                    HTMLNoncestr = JSSDKHelper.GetNoncestr();
                    HTMLTimestamp = JSSDKHelper.GetTimestamp();
                    HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WXConfig.appId, WXConfig.appSecret);

                    HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);

                    #endregion

                    #region 解析state参数
                    if (Request.QueryString["state"] != null)
                    {
                        string param = Request.QueryString["state"].ToString();
                        p = param;
                        param = DEncrypt.Decrypt(param.ConvertBase64TocChars(), WXConfig.EncryptKey);

                        System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
                        Dictionary<string, string> parameters = jss.Deserialize<Dictionary<string, string>>(param);
                        if (parameters.ContainsKey("openid") && parameters["openid"].ToString()!="")
                        {
                            _openid=parameters["openid"].ToString().ConvertBase64TocChars();
                            WXHelper.WriteNode("我的openid=" + _openid,"openidtext.txt");
                            hfOpenID.Value =DEncrypt.Encrypt(parameters["openid"].ToString().ConvertBase64TocChars(),WXConfig.EncryptKey).ConvertEncryptToBase64();
                        }
                        if (parameters.ContainsKey("id"))
                        {
                            _id = parameters["id"].ToString();
                        }
                        if (parameters.ContainsKey("mode"))
                        {
                            _mode = parameters["mode"].ToString();
                        }
                        if (parameters.ContainsKey("share"))
                        {
                            _share = parameters["share"].ToString();
                        }
                    }
                    #endregion

                    #region 微信授权,获取微信用户信息
                    if (_mode == "auth")
                    {
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult authAccessToken = null;
                        if (Session["RefreshToken"] != null)
                        {
                            authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WXConfig.AgentAppID, Session["RefreshToken"].ToString());
                        }
                        else
                        {
                            string code = Request.QueryString["code"].ToString();
                            authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                            Session["RefreshToken"] = authAccessToken.refresh_token;
                        }
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo authUserInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(authAccessToken.access_token, authAccessToken.openid);
                        
                        //string code = Request.QueryString["code"].ToString();
                        //Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                        //Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo authUserInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthApi.GetUserInfo(authAccessToken.access_token, authAccessToken.openid);
                        
                        //更新家园卡
                        UpdateHomeCard(authUserInfo);

                        Session["OPENID"] = authUserInfo.openid; 
                        _openid = authUserInfo.openid;
                        hfOpenID.Value = DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    }
                }
                catch (Exception ex) {
                    WXHelper.WriteNode("game.doublenovember.index.aspx(hfOpenID=" + _openid + "param="+p+")" + ex.Message);
                }
               
                //上传作品
                HTMLUpLoadLink = "/game/doublenovember/partin.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64()+"&id=76";
                //参与
                HTMLPartinLink ="/game/doublenovember/order.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64()+"&id=76";
                //我的
                HTMLMyInfoLink ="/game/doublenovember/info.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64()+"&id=76";
                #endregion
            }
        }
        /// <summary>
        /// 新增修改家园卡
        /// </summary>
        /// <param name="userInfo"></param>
        private void UpdateHomeCard(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo)
        {
            try
            {
                BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
                Model.WX_HomeCard model = null;
                if (!bll.ExistsByAgentId(userInfo.openid))
                {
                    model = new Model.WX_HomeCard();
                    model.CardId = WXHelper.CreateCardID();
                    model.City = userInfo.city;
                    model.Country = userInfo.country;
                    model.CreateDate = DateTime.Now;
                    model.HeadimgUrl = userInfo.headimgurl;
                    model.NickName = userInfo.nickname;
                    model.OpenId = userInfo.openid;
                    model.Province = userInfo.province;
                    model.Sex = userInfo.sex;
                    model.Unionid = userInfo.unionid;
                    bll.Add(model);
                }
                else
                {
                    model = bll.GetModelByAgentId(userInfo.openid);
                    model.NickName = userInfo.nickname;
                    model.Sex = userInfo.sex;
                    model.Province = userInfo.province;
                    model.City = userInfo.city;
                    model.Country = userInfo.country;
                    model.ModifyDate = DateTime.Now;
                    bll.Update(model);
                }
            }
            catch (Exception ex) {
                WXHelper.WriteNode(ex.Message, "game_doublenovember_index.txt");
            }
        }
    }
}
