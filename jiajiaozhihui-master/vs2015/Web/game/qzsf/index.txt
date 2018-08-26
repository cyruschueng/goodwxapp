#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using System.Data;
using SfSoft.SfEmc;
using System.Text;
using ShenerWeiXin.WxApi.WxOAuth;

namespace SfSoft.web.game.qzsf
{
    public partial class index : System.Web.UI.Page
    {
        #region 作品信息
        public string HTMLAllWorksNumber = string.Empty;
        public string HTMLTodayWoksNumber = string.Empty;
        public string HTMLNewKindsNumber = string.Empty;
        #endregion

        private Model.WX_Items_User WXItemUserModel = new Model.WX_Items_User();
        public Link HTMLLink = new Link();
        public string HTMLMenuName = string.Empty;
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
                            Response.Redirect("error.html",false);
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

                    #region 注册js_sdk
                    ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsApi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);
                    jsApi.SetRightList(ShenerWeiXin.WxApi.WxJs.EnumJsRight.onMenuShareTimeline, ShenerWeiXin.WxApi.WxJs.EnumJsRight.onMenuShareAppMessage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.previewImage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.getLocation);
                    jsApi.RegisterWeiXinJsApi();
                    #endregion


                    #region 初始数据
                    if (WXItemUserModel != null && WXItemUserModel.OpenId != "")
                    {
                        hfOpenID.Value = WXItemUserModel.OpenId;
                        hfNickName.Value = InitNickName();
                        Session["UserAlias"] = hfNickName.Value;
                        Session["ItemUser"] = WXItemUserModel;
                        InitFileNumber();
                        HTMLNewKindsNumber = Helper.GetNewFriendNumber(WXItemUserModel.OpenId);
                        //设置当前用户的权限
                        hfA.Value = Adminstrator.IsRight(WXItemUserModel.OpenId) == true ? "1" : "0";
                        InitLink();
                    }
                    else
                    {
                        Response.Redirect("error.html");
                    }
                    #endregion
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
        private string  InitNickName()
        {
            BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children model = bll.GetModel(WXItemUserModel.OpenId);
            if (model != null && (model.IsAlias != 0 || model.IsAlias != null) && String.IsNullOrEmpty(model.Alias) == false)
            {
                return model.Alias;
            }
            else {
                return WXItemUserModel.NickName;
            }
        }
        /// <summary>
        /// 初始当前作品数及今日新增数
        /// </summary>
        private void InitFileNumber()
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            DataSet ds= bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                HTMLAllWorksNumber = ds.Tables[0].Rows.Count.ToString();
                DataView dv = ds.Tables[0].DefaultView;
                dv.RowFilter = "Create_Date>'" + DateTime.Now.ToShortDateString() + "' and Create_Date<'"+DateTime.Now+"'";
                HTMLTodayWoksNumber = dv.Count.ToString();
            }
        }
        /// <summary>
        /// 初始链接
        /// </summary>
        private void InitLink()
        {
            TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            string t= Convert.ToInt64(ts.TotalSeconds).ToString();  

            //同城
            HTMLLink.CityWideLink = "/game/qzsf/citywide.aspx?id=76";
            //书法圈
            HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            //小伙伴
            HTMLLink.KidsLink = "/game/qzsf/friend.aspx?id=76";
            //我的
            HTMLLink.MyInfoLink = "/game/qzsf/info.aspx?id=76";
            if (Helper.IsMember(WXItemUserModel.OpenId))
            {
                //邀请
                HTMLLink.PartinLink = "/game/qzsf/start/invite.aspx";
                HTMLMenuName = "邀请朋友";
            }
            else {
                //参与
                HTMLLink.PartinLink = "/game/qzsf/start/order.aspx";
                HTMLMenuName = "参与活动";
            }
            //精华
            HTMLLink.TopLink = "/game/qzsf/top.aspx?id=76";
            //上传作品
            HTMLLink.UpLoadLink = "/game/qzsf/partinIII.aspx?id=76&t="+t;
            //分享
            HTMLLink.ShareLink = "/game/qzsf/start/index.aspx";
        }
    }
}
