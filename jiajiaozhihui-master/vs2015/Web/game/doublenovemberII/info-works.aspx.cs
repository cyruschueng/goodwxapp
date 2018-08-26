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

namespace SfSoft.web.game.doublenovemberII
{
    public partial class info_works : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "javascript:void(0)";
        public string HTMLInfoUrl = "javascript:void(0)";
        public string HTMLMenuName = string.Empty;
        public string HTMLWorksNumber = "0";
        public string HTMLStudyDay = "0";

        #region 分享参数定义
        public string HTMLAuthUrl = string.Empty;
        public string HTMLAppid = string.Empty;
        public string HTMLNoncestr = string.Empty;
        public string HTMLTimestamp = string.Empty;
        public string HTMLTicket = string.Empty;
        public string HTMLSignature = string.Empty;
        public string HTMLShareLink = string.Empty;
        #endregion

        #region
        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink = "javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {

                #region 参数解析
                if (Request.QueryString["parameter"] != null && Request.QueryString["parameter"].ToString() != "")
                {
                    string param = Request.QueryString["parameter"].ToString();
                    param = DEncrypt.Decrypt(param.ConvertBase64TocChars(), WXConfig.EncryptKey);

                    System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
                    Dictionary<string, string> parameters = jss.Deserialize<Dictionary<string, string>>(param);
                    if (parameters.ContainsKey("mode"))
                    {
                        hfMode.Value = parameters["mode"].ToString();
                    }
                    if (parameters.ContainsKey("openid") && parameters["openid"].ToString() != "")
                    {
                        //当前用户
                        hfOpenID.Value = DEncrypt.Encrypt(parameters["openid"].ToString().ConvertBase64TocChars(), WXConfig.EncryptKey).ConvertEncryptToBase64();
                        hfNickName.Value = Helper.GetNickName(parameters["openid"].ToString());
                        HTMLShareLink = WXConfig.AuthURL + "start/doublenovember4.ashx?share=true&sharepath=game/doublenovemberII/info-works.aspx&fromopenid=" + parameters["openid"].ToString().ConvertBase64TocChars();
                    }
                    if (parameters.ContainsKey("fromopenid") && parameters["fromopenid"].ToString() != "")
                    {
                        //分享者
                        hfFriendid.Value = DEncrypt.Encrypt(parameters["fromopenid"].ToString(), WXConfig.EncryptKey);
                        GetWorksInfo(parameters["fromopenid"].ToString());
                    }
                    if (parameters.ContainsKey("share") && parameters["share"].ToString() != "")
                    {
                        //是不是分享模式
                        hfShare.Value = parameters["share"].ToString();
                    }

                    if (parameters.ContainsKey("id") && parameters["id"].ToString() != "")
                    {
                        hfGoodsid.Value = parameters["id"].ToString();
                    }
                    else
                    {
                        hfGoodsid.Value = "76";
                    }
                    if (parameters.ContainsKey("weixinid"))
                    {
                        hfWeixinID.Value = parameters["weixinid"].ToString();
                    }
                }
                #endregion
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                #region 分享参数配置
                /*
                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WXConfig.appId;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = JsApiTicketContainer.TryGetTicket(WXConfig.appId, WXConfig.appSecret);

                JSSDKHelper jssdkhelper = new JSSDKHelper();
                HTMLSignature = jssdkhelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                */
                Model.WX_WeiXinAccounts WeiXinAccounts = Helper.GetWeiXinAccounts(hfWeixinID.Value); //获取微信信息
                hfWeixinID.Value = WeiXinAccounts.WeiXinID;

                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WeiXinAccounts.AppID;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WeiXinAccounts.AppID, WeiXinAccounts.AppSect);

                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);

                #endregion
                #region 获取用户的openid
                if (hfMode.Value.ToLower() == "auth")
                {
                    try
                    {
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult authAccessToken = null;
                        if (Session["RefreshToken"] != null)
                        {
                            try
                            {
                                authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WXConfig.AgentAppID, Session["RefreshToken"].ToString());
                            }
                            catch (Exception ex)
                            {
                                string code = Request.QueryString["code"].ToString();
                                authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                                Session["RefreshToken"] = authAccessToken.refresh_token;
                            }
                        }
                        else
                        {
                            string code = Request.QueryString["code"].ToString();
                            authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                            Session["RefreshToken"] = authAccessToken.refresh_token;
                        }
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo authUserInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(authAccessToken.access_token, authAccessToken.openid);
                        UpdateHomeCard(authUserInfo);

                        Session["OPENID11"] = authUserInfo.openid;
                        hfOpenID.Value = DEncrypt.Encrypt(authUserInfo.openid, WXConfig.EncryptKey).ConvertEncryptToBase64();
                        HTMLShareLink = WXConfig.AuthURL + "start/doublenovember4.ashx?share=true&sharepath=game/doublenovemberII/info-works.aspx&fromopenid=" + authUserInfo.openid;
                        hfNickName.Value = authUserInfo.nickname;
                    }
                    catch (Exception ex) {
                        WXHelper.WriteNode(Request.Url.AbsoluteUri+"("+ex.Message+")");
                        Response.Redirect("http://weixin.jiajiaozhihui.cn/game/doublenovemberII/exception/index?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&from=info-works");
                    }
                }
                #endregion

                if (Request.QueryString["openid"] != null && Request.QueryString["openid"].ToString()!="")
                {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                    GetWorksInfo(DEncrypt.Decrypt(hfOpenID.Value,WXConfig.EncryptKey));
                    HTMLShareLink = WXConfig.AuthURL + "start/doublenovember4.ashx?share=true&sharepath=game/doublenovemberII/info-works.aspx&fromopenid=" + DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey);
                }
                if (Request.QueryString["nickname"] != null) {
                    hfNickName.Value = Request.QueryString["nickname"].ToString();
                }

                #region
                //上传作品
                HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                //参与(邀请)
                if (Helper.IsMember(DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey)))
                {
                    HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                    HTMLMenuName = "邀请朋友";
                }
                else {
                    HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                    HTMLMenuName = "参与活动";
                }
                //我的
                HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                //书法圈
                
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'"+hfWeixinID.Value+"'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;

                HTMLInfoUrl = "/game/doublenovemberII/info.aspx?openid="+hfOpenID.Value.ConvertEncryptToBase64()+"&weixinid"+hfWeixinID.Value ;
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
            catch (Exception ex)
            {
                WXHelper.WriteNode(ex.Message, "game_doublenovember_index.txt");
            }
        }
        private void GetWorksInfo(string openid)
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            List<Model.WX_Doublenovember_File> list = bll.GetModelList("openid='" + openid + "'");
            if (list.Count > 0)
            {
                //作品数
                HTMLWorksNumber = list.Count().ToString();
                //练功天数
                HTMLStudyDay = GetStudyDay(openid);
                
            }
        }
        /// <summary>
        /// 练功天数(以第一次上传作品作为第一天)
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        private string GetStudyDay(string openid)
        {
            string result = "";
            BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children model = bll.GetModel(openid);
            if (model != null && model.FirstWorksDateTime != null)
            {
                result = (DateTime.Now.Date.Subtract(DateTime.Parse(string.Format("{0:yyyy-MM-dd}", model.FirstWorksDateTime))).Days + 1).ToString();
            }
            return result;
        }
        
    }
}
