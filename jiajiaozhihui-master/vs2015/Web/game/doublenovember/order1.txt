#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using SfSoft.Common;
using System.Data;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.doublenovember
{
    public partial class order1 : System.Web.UI.Page
    {
        public string HTMLUnitPrice = "";
        public string HTMLMarkPric = "";
        public string HTMLProductName = "";
        public string HTMLRecommendGoods = "";
        public string HTMLPayLink = "javascript:void(0)";
        public string HTMLOnlinePaymentStyle = "";
        public string HTMLRoseberStyle = "";
        public string HTMLImgUrl = "";
        public string HTMLContent = "";
        public string HTMLReturnUrl = "";

        #region 分享参数定义
        public string HTMLAuthUrl = string.Empty;
        public string HTMLAppid = string.Empty;
        public string HTMLNoncestr = string.Empty;
        public string HTMLTimestamp = string.Empty;
        public string HTMLTicket = string.Empty;
        public string HTMLSignature = string.Empty;
        public string HTMLShareLink = string.Empty;
        #endregion

        private string _openid = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                #region 分享参数配置
                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WXConfig.appId;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WXConfig.appId, WXConfig.appSecret);

                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                #endregion

                hfGoodsid.Value = "76";

                try
                {
                    #region 解析参数
                    if (Request.QueryString["state"] != null)
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
                            //服务号的openid 已加密的
                            hfOpenid.Value = parameters["openid"].ToString();
                            _openid = DEncrypt.Decrypt(parameters["openid"].ToString().ConvertBase64TocChars(), WXConfig.EncryptKey);
                            UrlRedirect(DEncrypt.Decrypt(parameters["openid"].ToString().ConvertBase64TocChars(), WXConfig.EncryptKey));
                        }
                    }
                    #endregion
                    #region 获取用户的openid
                    if (hfMode.Value.ToLower() == "auth")
                    {
                        string code = Request.QueryString["code"].ToString();
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo authUserInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(authAccessToken.access_token, authAccessToken.openid);
                        //更新家园卡
                        UpdateHomeCard(authUserInfo);
                        Session["OPENID"] = DEncrypt.Encrypt(authUserInfo.openid, WXConfig.EncryptKey).ConvertEncryptToBase64();
                        hfOpenid.Value = DEncrypt.Encrypt(authUserInfo.openid, WXConfig.EncryptKey).ConvertEncryptToBase64();
                        _openid = authUserInfo.openid;
                        UrlRedirect(authUserInfo.openid);
                    }
                    #endregion

                    if (Request.QueryString["openid"] != null)
                    {
                        _openid = DEncrypt.Decrypt(Request.QueryString["openid"].ToString().ConvertBase64TocChars(),WXConfig.EncryptKey);
                        hfOpenid.Value = Request.QueryString["openid"].ToString().ConvertEncryptToBase64();
                        
                    }
                    InitDropDownList();

                    #region 返回链接
                    string backUrl = "{'openid':'" + _openid + "'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLReturnUrl = "/game/doublenovember/index.aspx?state=" + backUrl;
                    #endregion

#if(DEBUG)
                hfOpenid.Value = "o6VEZzFT6gG3hPgrrg5r9hA/4GHObwpR5svhMrohyaw=";
                hfGoodsid.Value = "33";
#endif
                    GetProduct();
                }
                catch (Exception ex) {
                    WXHelper.WriteNode("game.doublenovember.order1.aspx:"+hfOpenid.Value+"("+_openid+")"+ex.Message);
                }
            }
        }

        /// <summary>
        /// 获取产品信息
        /// </summary>
        private void GetProduct()
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
                WXHelper.WriteNode(ex.Message);
            }
        }
        private void UrlRedirect(string openid)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            DataSet ds= bll.GetList("openid='" + openid + "' and GoodID=" + hfGoodsid.Value);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                string backUrl = "{'openid':'" + openid + "'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                HTMLReturnUrl ="game/doublenovember/index.aspx?state=" + backUrl;
                Response.Redirect(WXConfig.AuthURL + HTMLReturnUrl);

                
            }
        }
    }
}
