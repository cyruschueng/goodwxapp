using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;

namespace SfSoft.web.game.qzsf
{
    public partial class friend_works : System.Web.UI.Page
    {
        public string HTMLMenuName = string.Empty;

        #region
        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink = "javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
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
                        hfOpenID.Value = Session["myopenid"].ToString();
                        hfNickName.Value = Session["UserAlias"].ToString();
                        if (Request.QueryString["friend"] != null)
                        {
                            hfFriend.Value = Request.QueryString["friend"];
                        }
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

        }
    }
}
