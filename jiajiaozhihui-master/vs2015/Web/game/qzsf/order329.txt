using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using ShenerWeiXin.WxApi.WxJs;
using ShenerWeiXin.WxApi.WxOAuth;

namespace SfSoft.web.game.qzsf
{
    public partial class order329 : System.Web.UI.Page
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
        public string HTMLMenuName = string.Empty;

        private Model.WX_Items_User WXItemUserModel = new Model.WX_Items_User();
        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                try
                {
                    #region 注册用户
                    if (Request.QueryString["mode"] == "database")
                    {
                        //设置管理员，不受限止
                        if (Request.QueryString["openid"] != null && (Request.QueryString["openid"] == "oFEIHt_fasrUoAYvIIOU2_sYJB0k" || Request.QueryString["openid"] == "oc6zzs1y_A_7RgGi6EGLBUrPCfRk"))
                        {
                            Session["myopenid"] = Request.QueryString["openid"];
                        }
                        //直接从数据库中读取数据
                        string openid = "";
                        try
                        {
                            openid = Session["myopenid"].ToString();
                        }
                        catch (Exception ex)
                        {
                            Response.Redirect("error.html");
                        }
                        ShenerWeiXin.User.ItemUser itemUser = new ShenerWeiXin.User.ItemUser();
                        WXItemUserModel = itemUser.GetUserInfo(openid, ItemObject.亲子书法);
                    }
                    else if (Request.QueryString["mode"] == "reflesh")
                    {
                        GetWeiXinUser(true);//accessToken没有过期
                    }
                    else
                    {
                        GetWeiXinUser();//从微信中读取数据
                    }
                    #endregion
                    /*交易单号*/
                    hfTradeno.Value = ShenerWeiXin.WxApi.WxPay.PayApi.GenerateOutTradeNo();

                    if (WXItemUserModel != null && WXItemUserModel.OpenId != "")
                    {
                        hfGoodsid.Value = Request.QueryString["id"];
                        hfOpenid.Value = WXItemUserModel.OpenId;
                        Session["ItemUser"] = WXItemUserModel;
                        Session["UserAlias"] = InitNickName(hfOpenid.Value);
                        InitLink();
                        GetProduct();
                    }
                    else
                    {
                        Response.Redirect("error.html");
                    }
                }
                catch (Exception ex)
                {
                    if (ex.GetType().ToString() != "System.Threading.ThreadAbortException")
                    {
                        WXHelper.WriteNode("(" + Request.RawUrl + ")" + ex.Message, "qzsf.txt");
                        Response.Redirect("error.html");
                    }
                }
            }
        }
        protected void Page_LoadComplete(object sender, EventArgs e)
        {
            loadingToast.Attributes.CssStyle.Add("display", "block");
            try
            {
                #region 注册js-sdk
                ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsApi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);
                jsApi.SetRightList(EnumJsRight.onMenuShareTimeline, EnumJsRight.onMenuShareAppMessage, EnumJsRight.previewImage, EnumJsRight.getLocation, EnumJsRight.getLatestAddress, EnumJsRight.editAddress);
                jsApi.RegisterWeiXinJsApi();
                #endregion
            }
            catch (Exception ex)
            {
                if (ex.GetType().ToString() != "System.Threading.ThreadAbortException")
                {
                    WXHelper.WriteNode("(" + Request.RawUrl + ")" + ex.Message, "qzsf.txt");
                    Response.Redirect("error.html");
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
                /*测试人员用的*/
                if (hfOpenid.Value == "oc6zzs1y_A_7RgGi6EGLBUrPCfRk")
                {
                    HTMLOnlinePaymentStyle = "style='display:inline-block; width:100%;'";
                    HTMLRoseberStyle = "style='display:inline-block; width:100%;'";
                }
            }
        }
        /// <summary>
        /// 从微信中获取用户数据并注册到 项目用户表中（WX_Items_User）
        /// </summary>
        /// <param name="reflesh">false:AccessToken过期，重新授权；true:AccessToken没有过期</param>
        private void GetWeiXinUser(bool reflesh = false)
        {
            ShenerWeiXin.WxApi.WxOAuth.UserInfoOAuth oauth = new ShenerWeiXin.WxApi.WxOAuth.UserInfoOAuth(this.Page);
            oauth.GetOAuthUserInfo(reflesh);
            if (oauth.OAuthResult.Code == OAuthCodeEnum.ok.ToString())
            {
                ShenerWeiXin.User.ItemUser itemUser = new ShenerWeiXin.User.ItemUser();
                WXItemUserModel = itemUser.Register(oauth.OAuthResult.UserInfo, 1, ItemObject.亲子书法, 0, 0);
            }
            else
            {
                oauth.RedirectUrl = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/start/index.aspx";
                oauth.Redirect();
            }
        }
        /// <summary>
        /// 初始链接
        /// </summary>
        private void InitLink()
        {
            //书法圈
            HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            //我的
            HTMLLink.MyInfoLink = "/game/qzsf/info.aspx?id=76";
            if (Helper.IsMember(WXItemUserModel.OpenId))
            {
                //邀请
                HTMLLink.PartinLink = "/game/qzsf/start/invite.aspx";
                HTMLMenuName = "邀请朋友";
            }
            else
            {
                //参与
                HTMLLink.PartinLink = "/game/qzsf/start/order.aspx";
                HTMLMenuName = "参与活动";
            }
            //上传作品
            HTMLLink.UpLoadLink = "/game/qzsf/partinIII.aspx?id=76";
            //分享
            HTMLLink.ShareLink = "/game/qzsf/start/order.aspx";
            hfShareLink.Value = WXConfig.AuthURL + "game/qzsf/start/order.aspx";
        }
        /// <summary>
        /// 初始昵称
        /// </summary>
        /// <param name="openid"></param>
        private string InitNickName(string openid)
        {
            BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children model = bll.GetModel(openid);
            if (model != null && (model.IsAlias != 0 || model.IsAlias != null) && String.IsNullOrEmpty(model.Alias) == false)
            {
                return model.Alias;
            }
            else
            {
                return WXItemUserModel.NickName;
            }
        }
    }
}
