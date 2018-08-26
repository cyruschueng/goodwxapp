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
using ShenerWeiXin.WxApi.WxOAuth;

namespace SfSoft.web.game.qzsf
{
    public partial class info_works : System.Web.UI.Page
    {
        
        public string HTMLMenuName = string.Empty;
        public string HTMLWorksNumber = "0";
        public string HTMLStudyDay = "0";

        private Model.WX_Items_User WXItemUserModel = new Model.WX_Items_User();
        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
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

                    #region 注册js_sdk
                    ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsApi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);

                    jsApi.SetRightList(ShenerWeiXin.WxApi.WxJs.EnumJsRight.onMenuShareTimeline, ShenerWeiXin.WxApi.WxJs.EnumJsRight.onMenuShareAppMessage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.previewImage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.getLocation);
                    jsApi.RegisterWeiXinJsApi();
                    #endregion

                    if (WXItemUserModel.OpenId != "" && WXItemUserModel.OpenId != "")
                    {
                        hfOpenID.Value = WXItemUserModel.OpenId;
                        hfGoodsid.Value = Request.QueryString["id"];
                        HTMLLink.ShareLink = WXConfig.AuthURL + "game/qzsf/start/infoworks.aspx?f=" + SfSoft.Common.DEncrypt.DEncrypt.Encrypt(hfOpenID.Value, ShenerWeiXin.WXConfig.EncryptKey);
                        Session["ItemUser"] = WXItemUserModel;
                        InitLink();
                        if (Request.QueryString["f"] != null)
                        {
                            //分享模式
                            hfFriendid.Value = SfSoft.Common.DEncrypt.DEncrypt.Decrypt(Request.QueryString["f"], WXConfig.EncryptKey);
                            hfNickName.Value = InitNickName(hfFriendid.Value);
                            hfCommontNickName.Value = InitNickName(hfOpenID.Value);
                            hfShare.Value = "true";
                            GetWorksInfo(hfFriendid.Value);
                        }
                        else
                        {
                            hfNickName.Value = InitNickName(hfOpenID.Value);
                            hfCommontNickName.Value = hfNickName.Value;
                            GetWorksInfo(hfOpenID.Value);
                        }
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
        private void InitLink()
        {
            //书法圈
            HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            //我的
            HTMLLink.MyInfoLink = "/game/qzsf/info.aspx?id=76";
            if (Helper.IsMember(hfOpenID.Value))
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
                oauth.RedirectUrl = ShenerWeiXin.WXConfig.AuthURL + "game/qzsf/start/info-works.aspx";
                oauth.Redirect();
            }
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
