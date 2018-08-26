using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.qzsf.exception
{
    public partial class index : System.Web.UI.Page
    {
        public string HTMLLink = "javascript:void(0)";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string from = "";
                if (Request.QueryString["from"] != null) {
                    from = Request.QueryString["from"].ToString();
                }
                string openid = "";
                if (Request.QueryString["openid"] != null) {
                    openid = Request.QueryString["openid"].ToString();
                }
                string weixinid = "";
                if (Request.QueryString["weixinid"] != null)
                {
                    weixinid = Request.QueryString["weixinid"].ToString();
                }
                else {
                    Model.WX_WeiXinAccounts WeiXinAccounts = Helper.GetWeiXinAccounts(""); //获取微信信息
                    weixinid = WeiXinAccounts.WeiXinID;
                }
                string para = "";
                if (openid == "")
                {
                    HTMLLink = "http://weixin.jiajiaozhihui.cn/game/qzsf/start/index.aspx";
                }
                else {
                    switch (from)
                    {
                        case "index":
                            HTMLLink = "/game/qzsf/start/index.aspx";
                            break;
                        case "info-works":
                            HTMLLink = "/game/qzsf/start/infoworks.aspx";
                            break;
                        case "friend-invite":
                            HTMLLink = "/game/qzsf/start/invite.aspx";
                            break;
                        case "partin":
                            HTMLLink = "/game/qzsf/start/index.aspx";
                            break;
                        default:
                            HTMLLink = "/game/qzsf/start/index.aspx";
                            break;
                    }
                }
            }
        }
    }
}
