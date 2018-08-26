using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common;
using System.Data;
using System.Text;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using ShenerWeiXin.WxApi.WxOAuth;
using ShenerWeiXin.WxApi.WxJs;

namespace SfSoft.web.game.qzsf
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

        
        private Model.WX_Items_User WXItemUserModel = new Model.WX_Items_User();
        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                try
                {
                    #region 用户注册
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
                    
                    #region 注册js_sdk
                    ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsApi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);
                    jsApi.SetRightList(EnumJsRight.onMenuShareTimeline, EnumJsRight.onMenuShareAppMessage, EnumJsRight.previewImage, EnumJsRight.getLocation, EnumJsRight.editAddress, EnumJsRight.getLatestAddress);
                    jsApi.RegisterWeiXinJsApi();
                    
                    #endregion

                    if (WXItemUserModel.OpenId != "" && WXItemUserModel.OpenId != "")
                    {
                        hfOpenid.Value = WXItemUserModel.OpenId;
                        hfGoodsid.Value = Request.QueryString["id"];
                        hfShareLink.Value = WXConfig.AuthURL + "game/qzsf/start/invite.aspx?f=" + SfSoft.Common.DEncrypt.DEncrypt.Encrypt(hfOpenid.Value, WXConfig.EncryptKey);
                        Session["ItemUser"] = WXItemUserModel;
                        if (Request.QueryString["f"] != null)
                        {
                            //分享模式
                            hfFriendid.Value = SfSoft.Common.DEncrypt.DEncrypt.Decrypt(Request.QueryString["f"], WXConfig.EncryptKey);
                            hfShare.Value = "true";
                            HTMLNickName = InitNickName(hfFriendid.Value,true);
                            AwayDays(hfFriendid.Value);
                            GetWorksInfo(hfFriendid.Value);
                            HTMLHeadImgUrl = Helper.GetItemUser(hfFriendid.Value, ItemObject.亲子书法).HeadImgUrl;
                        }
                        else
                        {
                            HTMLNickName = InitNickName(hfOpenid.Value);
                            Session["UserAlias"] = HTMLNickName;
                            AwayDays(hfOpenid.Value);
                            GetWorksInfo(hfOpenid.Value);
                            HTMLHeadImgUrl = Helper.GetItemUser(hfOpenid.Value, ItemObject.亲子书法).HeadImgUrl;
                        }
                        GetActivityInfo();
                        InitLink();
                    }
                    else
                    {
                        Response.Redirect("error.html");
                    }
                }
                catch (Exception ex) {
                    if (ex.GetType().ToString() != "System.Threading.ThreadAbortException")
                    {
                        WXHelper.WriteNode("(" + Request.RawUrl + ")" + ex.Message, "qzsf.txt");
                        Response.Redirect("error.html");
                    }
                }
            }
        }
        /// <summary>
        /// 参加活动距现在多久
        /// </summary>
        /// <param name="openid"></param>
        private void AwayDays(string openid)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(" select *  from  WX_Doublenovember_Children");
            sb.Append(" where openid='" + openid + "'");
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                if (ds.Tables[0].Rows[0]["FirstWorksDateTime"] != null && ds.Tables[0].Rows[0]["FirstWorksDateTime"].ToString()!="")
                {
                    HTMLAwayDays = (DateTime.Now.Date.Subtract(DateTime.Parse(string.Format("{0:yyyy-MM-dd}", ds.Tables[0].Rows[0]["FirstWorksDateTime"].ToString()))).Days + 1).ToString();
                    hfAwayDays.Value = HTMLAwayDays;
                }
            }
        }
        /// <summary>
        /// 作品数据
        /// </summary>
        /// <param name="openid"></param>
        private void GetWorksInfo(string openid)
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            List<Model.WX_Doublenovember_File> list = bll.GetModelList("openid='" + openid + "'");
            if (list.Count > 0)
            {
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
                /*测试人员用的*/
                if (hfOpenid.Value == "oc6zzs1y_A_7RgGi6EGLBUrPCfRk")
                {
                    HTMLOnlinePaymentStyle = "style='display:inline-block; width:100%;'";
                    HTMLRoseberStyle = "style='display:inline-block; width:100%;'";
                }
            }
        }
        private void InitDropDownList()
        {
            //BLL.Pub_Areas bll = new BLL.Pub_Areas();
            //DataSet ds = bll.GetAllList();
            //if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            //{
            //    DataView dv = ds.Tables[0].DefaultView;
            //    dv.RowFilter = "PID=1";
            //    province.DataTextField = "AreaName";
            //    province.DataValueField = "AreaID";
            //    province.DataSource = dv;
            //    province.DataBind();
            //    province.Items.Insert(0, new ListItem() { Text = "---请选择---", Value = "" });
            //    hfArea.Value = SfSoft.SfEmc.FormatToJson.ToJson(ds);
            //}
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
        /// 初始昵称
        /// </summary>
        /// <param name="openid"></param>
        private string InitNickName(string openid,bool share=false)
        {
            BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children model = bll.GetModel(openid);
            if (model != null && (model.IsAlias != 0 || model.IsAlias != null) && String.IsNullOrEmpty(model.Alias) == false)
            {
                return model.Alias;
            }
            else
            {
                if (share == true) {
                    BLL.WX_Items_User itemBLL = new BLL.WX_Items_User();
                    Model.WX_Items_User itemModel = itemBLL.GetModel(openid, (int)ShenerWeiXin.ItemObject.亲子书法);
                    if (itemModel != null) {
                        return itemModel.NickName;
                    }
                }
                return WXItemUserModel.NickName;
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
        }
    }
}
