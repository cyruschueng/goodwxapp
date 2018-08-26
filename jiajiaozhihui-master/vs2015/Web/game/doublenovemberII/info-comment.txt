using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using SfSoft.Common;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class info_comment : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "javascript:void(0)";
        public string HTMLEditUrl = "javascript:void(0)";
        public string HTMLMenuName = string.Empty;

        public string HTMLAuthUrl = string.Empty;
        public string HTMLAppid = string.Empty;
        public string HTMLNoncestr = string.Empty;
        public string HTMLTimestamp = string.Empty;
        public string HTMLTicket = string.Empty;
        public string HTMLSignature = string.Empty;
        public string HTMLShareLink = string.Empty;

        #region
        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink = "javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
        #endregion
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                if (Request.QueryString["openid"] != null)
                {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                    hfUserID.Value = DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey);
                    hfNickName.Value=Helper.GetNickName(DEncrypt.Decrypt(hfOpenID.Value,WXConfig.EncryptKey));
                }
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }

                #region 分享参数配置
                Model.WX_WeiXinAccounts WeiXinAccounts = Helper.GetWeiXinAccounts(hfWeixinID.Value); //获取微信信息
                hfWeixinID.Value = WeiXinAccounts.WeiXinID;

                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WeiXinAccounts.AppID;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WeiXinAccounts.AppID, WeiXinAccounts.AppSect);

                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);

                #endregion
                #region
                //上传作品
                HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=76";
                //参与(邀请)
                if (Helper.IsMember(DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey)))
                {
                    HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    HTMLMenuName = "邀请朋友";
                }
                else
                {
                    HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    HTMLMenuName = "参与活动";
                }

                //我的
                HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=76";
                //书法圈
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'" + hfWeixinID.Value + "'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;

                #endregion

                HTMLReturnUrl = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value;
                HTMLEditUrl = "/game/doublenovemberII/additioninfo.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() + "&from=info&weixinid=" + hfWeixinID.Value;
            }
        }
    }
}
