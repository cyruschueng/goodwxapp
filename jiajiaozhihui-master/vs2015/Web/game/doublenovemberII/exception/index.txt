using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.doublenovemberII.exception
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
                    HTMLLink = "http://weixin.jiajiaozhihui.cn/start/doublenovember3.ashx";
                }
                else {
                    switch (from)
                    {
                        case "index":
                            para = "{'openid':'" + DEncrypt.Decrypt(openid, WXConfig.EncryptKey) + "','weixinid':'" + weixinid + "'}";
                            para = DEncrypt.Encrypt(para, WXConfig.EncryptKey);
                            HTMLLink = "/game/doublenovemberII/index.aspx?state=" + para;
                            break;
                        case "info-works":
                            string id = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                            string nickname = Helper.GetNickName(id);
                            HTMLLink = "/game/doublenovemberII/info-works.aspx?openid=" + openid + "&weixinid=" + weixinid + "&nickname=" + nickname;
                            break;
                        case "friend-invite":
                            HTMLLink = "/game/doublenovemberII/friend-invite.aspx?openid=" + openid + "&weixinid=" + weixinid;
                            break;
                        case "partin":
                            HTMLLink = "/game/doublenovemberII/partin.aspx?openid=" + openid + "&weixinid=" + weixinid + "&id=76";
                            break;
                        default:
                            HTMLLink = "http://weixin.jiajiaozhihui.cn/start/doublenovember3.ashx";
                            break;
                    }
                }
            }
        }
    }
}
