using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.qzsf
{
    public partial class friend : System.Web.UI.Page
    {
        
        public string HTMLMenuName = string.Empty;

        #region 小伙伴信息
        public string HTMLKidsNumber = "0";
        public string HTMLNewKindsNumber = "";
        #endregion

        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                try
                {
                    if (Session["myopenid"] != null)
                    {
                        #region 注册js_sdk
                        ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsApi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);

                        jsApi.SetRightList(ShenerWeiXin.WxApi.WxJs.EnumJsRight.previewImage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.hideOptionMenu);
                        jsApi.RegisterWeiXinJsApi();
                        #endregion

                        hfOpenID.Value = Session["myopenid"].ToString();
                        hfNickName.Value = Session["UserAlias"].ToString();
                        GetFriend(hfOpenID.Value);
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
            //同城
            HTMLLink.CityWideLink = "/game/qzsf/citywide.aspx?id=76";
            //精华
            HTMLLink.TopLink = "/game/qzsf/top.aspx?id=76";
            //小伙伴
            HTMLLink.KidsLink = "/game/qzsf/friend.aspx?id=76";
            //我的小伙伴
            HTMLLink.FriendManageLink = "/game/qzsf/friend-manage.aspx?id=76";
            
            
        }
        private void GetFriend(string openid)
        {
            BLL.WX_Doublenovember_Invite bll = new BLL.WX_Doublenovember_Invite();
            List<Model.WX_Doublenovember_Invite> list = bll.GetModelList("FromOpenID='" + openid + "' or ToOpenID='" + openid + "'");
            if (list.Count > 0) {
                HTMLKidsNumber = list.Count(e => e.Status == 1).ToString();
                HTMLNewKindsNumber = list.Count(e=>e.Status==0 && e.ToOpenID==openid).ToString();
                if (HTMLNewKindsNumber == "0") {
                    HTMLNewKindsNumber = "";
                }
            }
        }
    }
}
