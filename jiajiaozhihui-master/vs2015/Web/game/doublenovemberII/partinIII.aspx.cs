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

namespace SfSoft.web.game.doublenovemberII
{
    public partial class partinIII : System.Web.UI.Page
    {
        public string HTMLAuthUrl = "";
        public string HTMLAppid = "";
        public string HTMLNoncestr = "";
        public string HTMLTimestamp = "";
        public string HTMLTicket = "";
        public string HTMLSignature = "";
        public string HTMLShareLink = "";
        public string HTMLRefleshUrl = "";
        public string HTMLRepairUrl = "";
        public string HTMLNickName = "";
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
                #region 分享参数

                Model.WX_WeiXinAccounts WeiXinAccounts = Helper.GetWeiXinAccounts(hfWeixinID.Value); //获取微信信息

                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WeiXinAccounts.AppID;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WeiXinAccounts.AppID, WeiXinAccounts.AppSect);

                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                #endregion


                if (Request.QueryString["openid"] != null)
                {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();

                }
                if (Request.QueryString["id"] != null)
                {
                    hfGoodsID.Value = Request.QueryString["id"].ToString();
                }
                try
                {
                    HTMLNickName = Helper.GetNickName(DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey));
                    #region
                    //上传作品
                    HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=" + hfGoodsID.Value;
                    //参与(邀请)
                    if (Helper.IsMember(DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey)))
                    {
                        HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=" + hfGoodsID.Value;
                        HTMLMenuName = "邀请朋友";
                    }
                    else
                    {
                        HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=" + hfGoodsID.Value;
                        HTMLMenuName = "参与活动";
                    }
                    //我的
                    HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=" + hfGoodsID.Value;
                    //书法圈
                    string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'" + hfWeixinID.Value + "'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
                    hfBackUrl.Value = HTMLCommunityLink;
                    hfInfoUrl.Value = "/game/doublenovemberII/info-works.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&nickname=" + HTMLNickName; ;
                    #endregion
                    HTMLRepairUrl = "/game/doublenovemberII/repair.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value;

                    GetRight(hfOpenID.Value);
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode("game.doublenovember.partin.aspx:(hfOpenID.Value=" + hfOpenID.Value + ")" + ex.Message);
                    Response.Redirect("http://weixin.jiajiaozhihui.cn/game/doublenovemberII/exception/index?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&from=partin");
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
            if (_openid == "")
            {
                prompt.InnerHtml = "<strong>提示：</strong>订单正在审核中。。。<br />";
                return;
            }
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            DataSet ds = bll.GetList("OpenID='" + _openid + "' and GoodID=" + hfGoodsID.Value + " and (IsSend=1 or IsSend=11 or isnull(IsPay,0)=1)");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                BLL.WX_Doublenovember_Children bllChildren = new BLL.WX_Doublenovember_Children();
                Model.WX_Doublenovember_Children modelChildren = bllChildren.GetModel(_openid);
                if (modelChildren != null && modelChildren.Sex != "")
                {
                    prompt.InnerHtml = "<strong>提示：</strong><span style='color:#f00'>你还没有选择上传的图片,建议文件大小不要超出2M，便于上传</span><br />"
                        + "<a id='chooseImage' href='javascript:void(0)' class='alert-link'><span class='btn btn-success glyphicon glyphicon-level-up'>选择图片</span></a>";
                }
                else
                {
                    prompt.InnerHtml = "<strong>提示：</strong>请先完善你的资料,再上传你的作品<br />"
                        + "<a href='/game/doublenovemberII/additioninfo.aspx?openid=" + openid.ConvertBase64TocChars() + "' class='alert-link'><span class='btn btn-success glyphicon glyphicon-level-up'>完善资料</span></a>";
                }
            }
            else
            {
                //prompt.InnerHtml = "<strong>提示：</strong>请先参与活动，然后上传你的作品<br />"
                //        + "<a  href='order.aspx?openid=" + openid.ConvertEncryptToBase64() + "&id=" + hfGoodsID.Value + "' class='alert-link'><span class=' btn btn-success glyphicon glyphicon-hand-right'>立即参加活动</span></a>";
                prompt.InnerHtml = "<strong>提示：</strong>您还没有参加本次活动，<a href=" + HTMLPartinLink + "  class='btn btn-success ' >立即参与</a><br />";
            }
        }
    }
}
