using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using SfSoft.Common.DEncrypt;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class unscramble : System.Web.UI.Page
    {
        public string HTMLTitle = string.Empty;
        public string HTMLPageIndex = string.Empty;
        public string HTMLContent = string.Empty;
        #region 分享
        public string HTMLAuthUrl = "";
        public string HTMLAppid = "";
        public string HTMLNoncestr = "";
        public string HTMLTimestamp = "";
        public string HTMLTicket = "";
        public string HTMLSignature = "";
        public string HTMLShareLink = "";
        #endregion
        public string HTMLCommunityLink = "javascript:void(0)";

        protected void Page_Load(object sender, EventArgs e)
        {
            //Helper.WeiXinBrowse(Request.UserAgent);
            if (!IsPostBack) {
                if (Request.QueryString["book"] != null) {
                    hfBookName.Value = Request.QueryString["book"].ToString();
                }
                if (Request.QueryString["index"] != null)
                {
                    hfPageIndex.Value = Request.QueryString["index"].ToString();
                }
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                #region 分享参数

                Model.WX_WeiXinAccounts WeiXinAccounts = Helper.GetWeiXinAccounts(hfWeixinID.Value); //获取微信信息

                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WeiXinAccounts.AppID;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WeiXinAccounts.AppID, WeiXinAccounts.AppSect);

                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                #endregion

                //书法圈
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey) + "','weixinid':'" + hfWeixinID.Value + "'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey);
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
                
                GetInfo();
            }
        }
        private void GetInfo()
        {
            BLL.WX_Doublenovember_File_unscramble bll = new BLL.WX_Doublenovember_File_unscramble();
            int index=0;
            if (hfBookName.Value != "" && int.TryParse(hfPageIndex.Value, out index)) {
                Model.WX_Doublenovember_File_unscramble model = bll.GetModel(hfBookName.Value, index);
                if (model != null) {
                    HTMLTitle = model.BookName;
                    HTMLPageIndex = model.PageIndex.ToString();
                    HTMLContent = model.Translation;
                }
            }
        }
    }
}
