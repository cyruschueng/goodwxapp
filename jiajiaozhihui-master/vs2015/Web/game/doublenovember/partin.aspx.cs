#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Senparc.Weixin.MP.Helpers;
using ShenerWeiXin;
using Senparc.Weixin.MP.CommonAPIs;
using SfSoft.Common;
using System.Net;
using System.ComponentModel;
using System.Data;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.doublenovember
{
    public partial class partin : System.Web.UI.Page
    {
        public string HTMLAuthUrl = "";
        public string HTMLAppid = "";
        public string HTMLNoncestr = "";
        public string HTMLTimestamp = "";
        public string HTMLTicket = "";
        public string HTMLSignature = "";
        public string HTMLShareLink = "";
        public string HTMLReturnUrl = "";
        public string HTMLRefleshUrl = "";
        public string HTMLRepairUrl = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            string userAgent = Request.UserAgent;
            if (!userAgent.ToLower().Contains("micromessenger"))
            {
                Response.Redirect(WXConfig.AuthURL + "game/doublenovember/weixinpage.html");
            }
            if (!IsPostBack) {
                #region 分享
                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WXConfig.appId;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WXConfig.appId, WXConfig.appSecret);
                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                HTMLShareLink = "";
                #endregion

                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["id"] != null)
                {
                    hfGoodsID.Value = Request.QueryString["id"].ToString();
                }
                try
                {
                    #region 返回链接
                    string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLReturnUrl = "/game/doublenovember/index.aspx?state=" + backUrl;
                    #endregion

                    HTMLRepairUrl = "http://weixin.jiajiaozhihui.cn/game/doublenovember/repair.aspx?openid="+hfOpenID.Value.ConvertEncryptToBase64()+"";
                    GetRight(hfOpenID.Value);
                }
                catch (Exception ex) {
                    WXHelper.WriteNode("game.doublenovember.partin.aspx:(hfOpenID.Value=" + hfOpenID.Value+ ")" + ex.Message);
                }
            }
        }
        /// <summary>
        /// 是否有权限上传图片
        /// 只有提交订交，并发货的才可以有权限
        /// </summary>
        private void GetRight(string openid)
        {
            string _openid = DEncrypt.Decrypt(openid.ConvertBase64TocChars(), WXConfig.EncryptKey);
            if (_openid == "" || _openid == "oc6zzs0IEa49ASsb2mtVdqy4NzRw") {
                prompt.InnerHtml = "<strong>提示：</strong>订单正在审核中。。。<br />";
                return;
            }
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            DataSet ds = bll.GetList("OpenID='"+_openid+"' and GoodID="+hfGoodsID.Value+" and (IsSend=1 or IsSend=11)");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                prompt.InnerHtml = "<strong>提示：</strong>你还没有选择上传的图片<br />"
                        + "<a id='chooseImage' href='javascript:void(0)' class='alert-link'><span class='btn btn-success glyphicon glyphicon-level-up'>选择图片</span></a>";
            }
            else {
                //prompt.InnerHtml = "<strong>提示：</strong>请先参与活动，然后上传你的作品<br />"
                //        + "<a  href='order.aspx?openid=" + openid.ConvertEncryptToBase64() + "&id=" + hfGoodsID.Value + "' class='alert-link'><span class=' btn btn-success glyphicon glyphicon-hand-right'>立即参加活动</span></a>";

                prompt.InnerHtml = "<strong>提示：</strong>订单正在审核中。。。<br />";

            }
        }
    }
}
