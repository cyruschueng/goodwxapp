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
    public partial class info_activity : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "javascript:void(0)";
        public string HTMLReturnInfoUrl = "javascript:void(0)";
        public string HTMLMenuName = string.Empty;

        public string HTMLSendStatus = "";//活动状态
        public string HTMLStartDate = "";//活动开始日期
        public string HTMLAwayDay = "";//已持续
        public string HTMLLatestDate = "";//活动最早完成时间
        public string HTMLLongestDate = "";//活动最迟完成日期

        #region
        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink = "javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                    GetInfo(hfOpenID.Value);
                }

                #region
                //上传作品
                HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                //参与(邀请)
                if (Helper.IsMember(DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey))) {
                    HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid=" +hfOpenID.Value+"&weixinid="+hfWeixinID.Value+"&id=76";
                    HTMLMenuName = "邀请朋友";
                }else{
                    HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value+"&id=76";
                    HTMLMenuName = "参与活动";
                }
                
                //我的
                HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value + "&weixinid="+ hfWeixinID.Value +"&id=76";
                //书法圈
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'"+hfWeixinID.Value+"'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;

                HTMLReturnInfoUrl = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64()+"&weixinid="+hfWeixinID.Value ;
                #endregion
            }
        }
        private void GetInfo(string openid)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model= bll.GetModel(DEncrypt.Decrypt(openid, WXConfig.EncryptKey), 76);
            if (model != null) {
                if (model.IsSend == 1 || model.IsSend == 11)
                {
                    HTMLSendStatus = "<span style='color:#337AB7'>活动中。。。</span>";
                    
                    if (model.SendDate != null)
                    {
                        //活动开始日期
                        HTMLStartDate = string.Format("{0:yyyy-MM-dd}", model.SendDate);
                        //已持续时间
                        HTMLAwayDay = GetStudyDay(DEncrypt.Decrypt(openid, WXConfig.EncryptKey)) + "天";
                        //活动最早完成时间
                        HTMLLatestDate = string.Format("{0:yyyy-MM-dd}", ((DateTime)model.SendDate).AddDays(180));
                        //活动最迟完成日期
                        HTMLLongestDate = string.Format("{0:yyyy-MM-dd}", ((DateTime)model.SendDate).AddDays(300));
                    }
                }
                else if (model.IsSend == null || model.IsSend == 0) {
                    HTMLSendStatus = "<span style='color:#D9EDF7' >待发货</span>";
                }
                else if (model.IsSend == -1) {
                    HTMLSendStatus = "<span style='color:#FCF8E3' >活动取消</span>";
                }
                else if (model.IsSend == 2)
                {
                    HTMLSendStatus = "<span style='color:#DFF0D8' >活动完成</span>";
                }
                else {
                    HTMLSendStatus = "<span style='color:#F2DEDE' >活动异常，请与客服联系</span>";
                }
                
            }
        }
        /// <summary>
        /// 练功天数(以第一次上传作品作为第一天)
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        private string GetStudyDay(string openid)
        {
            string result = "";
            BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children model = bll.GetModel(openid);
            if (model != null && model.FirstWorksDateTime != null)
            {
                result = (DateTime.Now.Date.Subtract(DateTime.Parse(string.Format("{0:yyyy-MM-dd}", model.FirstWorksDateTime))).Days+1).ToString();
            }
            return result;
        }
    }
}
