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
using System.Text;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class friend_invite : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "javascript:void(0)";

        public string HTMLRecommendGoods = "";
        public string HTMLPayLink = "javascript:void(0)";
        public string HTMLOnlinePaymentStyle = "";
        public string HTMLRoseberStyle = "";

        public string HTMLNickName = "";
        public string HTMLAwayDays = "";
        public string HTMLHeadImgUrl = "";
        public string HTMLActivityInfo = "";
        public string HTMLMenuName = string.Empty;
        public string HTMLWorksNumber = "0";

        #region 产品信息
        public string HTMLProductName = "";
        public string HTMLMarkPric = "";
        public string HTMLUnitPrice = "";
        public string HTMLImgUrl = "";
        public string HTMLContent = "";
        #endregion

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
            if (!IsPostBack)
            {
                

                #region 解析参数
                if (Request.QueryString["state"] != null && Request.QueryString["state"].ToString()!="")
                {
                    string param = Request.QueryString["state"].ToString();
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
                        hfOpenid.Value = DEncrypt.Encrypt(parameters["openid"].ToString().ConvertBase64TocChars(), WXConfig.EncryptKey).ConvertEncryptToBase64();
                        HTMLShareLink = WXConfig.AuthURL + "start/doublenovember4.ashx?share=true&sharepath=game/doublenovemberII/friend-invite.aspx&fromopenid=" + parameters["openid"].ToString().ConvertBase64TocChars()+"&weixinid="+hfWeixinID.Value ;
                    }
                    if (parameters.ContainsKey("fromopenid") && parameters["fromopenid"].ToString() != "") 
                    {
                        //分享者
                        hfFriendid.Value = DEncrypt.Encrypt(parameters["fromopenid"].ToString(), WXConfig.EncryptKey);
                        GetUser(parameters["fromopenid"].ToString());
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
                #region 这个参数是为了解决微信state参数限字长度问题和上面的state参数处理是一样的，目的是代替state
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
                        hfOpenid.Value = DEncrypt.Encrypt(parameters["openid"].ToString().ConvertBase64TocChars(), WXConfig.EncryptKey).ConvertEncryptToBase64();
                        HTMLShareLink = WXConfig.AuthURL + "start/doublenovember4.ashx?share=true&sharepath=game/doublenovemberII/friend-invite.aspx&fromopenid=" + parameters["openid"].ToString().ConvertBase64TocChars()+"&weixinid="+hfWeixinID.Value;
                    }
                    if (parameters.ContainsKey("fromopenid") && parameters["fromopenid"].ToString() != "")
                    {
                        //分享者
                        hfFriendid.Value = DEncrypt.Encrypt(parameters["fromopenid"].ToString(), WXConfig.EncryptKey);
                        GetUser(parameters["fromopenid"].ToString());
                        GetWorksInfo(parameters["fromopenid"].ToString());
                    }
                    if (parameters.ContainsKey("share") && parameters["share"].ToString() != "")
                    {
                        //是不是分享模式
                        hfShare.Value = parameters["share"].ToString();
                    }

                    if (parameters.ContainsKey("id") && parameters["id"].ToString()!="")
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

                        //更新家园卡
                        UpdateHomeCard(authUserInfo);

                        Session["OPENID11"] = authUserInfo.openid;
                        hfOpenid.Value = DEncrypt.Encrypt(authUserInfo.openid, WXConfig.EncryptKey).ConvertEncryptToBase64();
                        HTMLShareLink = WXConfig.AuthURL + "start/doublenovember4.ashx?share=true&sharepath=game/doublenovemberII/friend-invite.aspx&fromopenid=" + authUserInfo.openid + "&weixinid=" + hfWeixinID.Value;
                    }
                    catch (Exception ex) {
                        WXHelper.WriteNode(Request.Url.AbsoluteUri + "(" + ex.Message + ")");
                        Response.Redirect("http://weixin.jiajiaozhihui.cn/game/doublenovemberII/exception/index?openid=" + hfOpenid.Value + "&weixinid=" + hfWeixinID.Value + "&from=info-invite");
                    }
                }
                #endregion

                if (Request.QueryString["openid"] != null)
                {
                    hfOpenid.Value = Request.QueryString["openid"].ToString();
                    string openid = DEncrypt.Decrypt(Request.QueryString["openid"].ToString(), WXConfig.EncryptKey);
                    GetUser(openid);
                    GetWorksInfo(openid);
                    HTMLShareLink = WXConfig.AuthURL + "start/doublenovember4.ashx?share=true&sharepath=game/doublenovemberII/friend-invite.aspx&fromopenid=" + DEncrypt.Decrypt(hfOpenid.Value, WXConfig.EncryptKey)+"&weixinid="+hfWeixinID.Value;
                }
                if (Request.QueryString["id"] != null && Request.QueryString["id"].ToString()!="")
                {
                    hfGoodsid.Value = Request.QueryString["id"].ToString();
                }
                else
                {
                    hfGoodsid.Value = "76";
                }
                try
                {
                    InitDropDownList();
                    GetActivityInfo();
                    
                    #region
                    //上传作品
                    HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenid.Value+"&weixinid="+ hfWeixinID.Value+ "&id=76";
                    //参与(邀请)
                    if (Helper.IsMember(DEncrypt.Decrypt(hfOpenid.Value, WXConfig.EncryptKey)))
                    {
                        HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid="+hfOpenid.Value+"&weixinid="+ hfWeixinID.Value+"&id=76";
                        HTMLMenuName = "邀请朋友";
                    }
                    else {
                        HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenid.Value +"&weixinid="+hfWeixinID.Value+"&id=76";
                        HTMLMenuName = "参与活动";
                    }
                    //我的
                    HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenid.Value + "&weixinid="+hfWeixinID.Value+"&id=76";
                    //书法圈

                    string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenid.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'"+hfWeixinID.Value+"'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
                    #endregion
                    
                    #region 分享链接

                    #endregion
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode("game.doublenovember.info.aspx:" + ex.Message);
                }
            }
        }
        private void GetUser(string openid)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(" select a.*,b.NickName,b.HeadImgUrl,c.FirstWorksDateTime from  (");
            sb.Append(" select  * from dbo.WX_PublicOrder where GoodID=76");
            sb.Append(" )a left join dbo.WX_HomeCard b on a.openid=b.openid");
            sb.Append(" left join dbo.WX_Doublenovember_Children c on a.openid=c.openid");
            sb.Append(" where a.openid='"+openid+"'");
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                HTMLNickName = ds.Tables[0].Rows[0]["NickName"].ToString();
                HTMLHeadImgUrl = ds.Tables[0].Rows[0]["HeadImgUrl"].ToString();
                if (ds.Tables[0].Rows[0]["FirstWorksDateTime"] != null && ds.Tables[0].Rows[0]["FirstWorksDateTime"]!="")
                {
                    HTMLAwayDays = (DateTime.Now.Date.Subtract(DateTime.Parse(string.Format("{0:yyyy-MM-dd}", ds.Tables[0].Rows[0]["FirstWorksDateTime"].ToString()))).Days + 1).ToString();
                }
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
            }
        }
        private void GetActivityInfo()
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(int.Parse(hfGoodsid.Value));
            if (model != null)
            {
                if (model.GoodName != null && model.GoodName != "")
                {
                    HTMLProductName = model.GoodName;
                }
                if (model.PublicPrice != null && model.PublicPrice != 0 && model.PublicPrice.ToString() != "")
                {
                    HTMLUnitPrice = string.Format("{0:0.00}", model.PublicPrice);
                    HTMLMarkPric = string.Format("{0:0.00}", model.MarketPrice);
                }
                else
                {
                    decimal marketPrice = 0;
                    if (model.MarketPrice != null && model.MarketPrice.ToString() != "")
                    {
                        marketPrice = (decimal)model.MarketPrice;
                        HTMLMarkPric = string.Format("{0:0.00}", model.MarketPrice);
                    }
                    decimal depreciate = 0;
                    if (model.Depreciate != null && model.Depreciate.ToString() != "")
                    {
                        depreciate = (decimal)model.Depreciate;
                    }
                    decimal discount = 1;
                    if (model.Discount != null && model.Discount.ToString() != "")
                    {
                        discount = (decimal)model.Discount;
                    }
                    HTMLUnitPrice = string.Format("{0:0.00}", (marketPrice - depreciate) * discount);

                }
                if (model.ImgURL != null)
                {
                    HTMLImgUrl = model.ImgURL;
                }
                if (model.GoodsLink != null && model.GoodsLink != "")
                {
                    HTMLPayLink = model.GoodsLink;
                    hfOnlinePay.Value = HTMLPayLink;
                }
                HTMLContent = model.Desc;
                if (model.IsOnlinePayment == 1 && model.IsRosebery == 1)
                {
                    HTMLOnlinePaymentStyle = "style='display:inline-block; width:100%;'";
                    HTMLRoseberStyle = "style='display:inline-block; width:100%;'";
                }
                else
                {
                    if (model.IsOnlinePayment == 1 && (model.IsRosebery == 0 || model.IsRosebery == null))
                    {
                        HTMLOnlinePaymentStyle = "style='display:inline-block; width:100%;'";
                        HTMLRoseberStyle = "style='display:none;'";
                    }
                    else if (model.IsRosebery == 1 && (model.IsOnlinePayment == 0 || model.IsOnlinePayment == null))
                    {
                        HTMLOnlinePaymentStyle = "style='display:none;'";
                        HTMLRoseberStyle = "style='display:inline-block; width:100%;'";
                    }
                    else
                    {
                        HTMLOnlinePaymentStyle = "style='display:none;'";
                        HTMLRoseberStyle = "style='display:none;'";
                    }
                }
            }
        }
        private void InitDropDownList()
        {
            BLL.Pub_Areas bll = new BLL.Pub_Areas();
            DataSet ds = bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                DataView dv = ds.Tables[0].DefaultView;
                dv.RowFilter = "PID=1";
                province.DataTextField = "AreaName";
                province.DataValueField = "AreaID";
                province.DataSource = dv;
                province.DataBind();
                province.Items.Insert(0, new ListItem() { Text = "---请选择---", Value = "" });
                hfArea.Value = SfSoft.SfEmc.FormatToJson.ToJson(ds);
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
    }
}
