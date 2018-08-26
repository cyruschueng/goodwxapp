using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;

namespace SfSoft.web.game.doublenovemberII
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
                    GetUser(DEncrypt.Decrypt(hfOpenID.Value,WXConfig.EncryptKey));
                }
                if (Request.QueryString["friend"] != null)
                {
                    //这个参数没有加密码
                    hfFriend.Value = Request.QueryString["friend"].ToString();
                    hfFriend.Value = DEncrypt.Encrypt(hfFriend.Value, WXConfig.EncryptKey);
                }
                try
                {
                    #region
                    //上传作品
                    HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //参与(参与)
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
                    string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey) + "','weixinid':'" + hfWeixinID.Value + "'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey);
                    HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
                    #endregion
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode("game.doublenovember.info.aspx:" + ex.Message);
                }
            }
        }
        private void GetUser(string openid)
        {
            hfNickName.Value = Helper.GetNickName(openid);
        }
    }
}
