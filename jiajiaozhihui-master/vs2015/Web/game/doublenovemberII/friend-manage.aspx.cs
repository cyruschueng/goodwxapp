using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using SfSoft.Common;
using ShenerWeiXin;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class friend_manage : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "javascript:void(0)";
        public string HTMLReturnFriendUrl = "javascript:void(0)";
        public string HTMLMenuName = string.Empty;

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
                if (Request.QueryString["openid"] != null)
                {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                #region
                //上传作品
                HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value+"&weixinid="+hfWeixinID.Value + "&id=76";
                //参与（邀请）
                if (Helper.IsMember(DEncrypt.Decrypt(hfOpenID.Value,WXConfig.EncryptKey))){
                    HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid="+hfOpenID.Value+"&weixinid="+hfWeixinID.Value+"&id=76";
                    HTMLMenuName = "邀请朋友";
                }else{
                    HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenID.Value+"&weixinid="+hfWeixinID.Value  + "&id=76";
                    HTMLMenuName="参与活动";
                }
                //我的
                HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value + "&id=76";
                //书法圈
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'"+hfWeixinID.Value+"'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;

                HTMLReturnFriendUrl = "/game/doublenovemberII/friend.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64()+"&weixinid="+hfWeixinID.Value;
                #endregion
            }
        }
    }
}
