using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common;
using ShenerWeiXin;

namespace SfSoft.web.game.qzsf
{
    public partial class info_activity : System.Web.UI.Page
    {
        public string HTMLMenuName = string.Empty;

        public string HTMLSendStatus = "";//活动状态
        public string HTMLStartDate = "";//活动开始日期
        public string HTMLAwayDay = "";//已持续
        public string HTMLLatestDate = "";//活动最早完成时间
        public string HTMLLongestDate = "";//活动最迟完成日期


        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                try
                {
                    if (Session["myopenid"] != null)
                    {
                        hfOpenID.Value = Session["myopenid"].ToString();
                        GetInfo(hfOpenID.Value);
                    }
                    else
                    {
                        Response.Redirect("error.html");
                    }
                    InitLink();
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
        private void GetInfo(string openid)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model= bll.GetModel(openid, 76);
            if (model != null) {
                if (model.IsSend == 1 || model.IsSend == 11)
                {
                    HTMLSendStatus = "<span style='color:#337AB7'>活动中。。。</span>";
                    
                    if (model.SendDate != null)
                    {
                        //活动开始日期
                        HTMLStartDate = string.Format("{0:yyyy-MM-dd}", model.SendDate);
                        //已持续时间
                        HTMLAwayDay = GetStudyDay(openid) + "天";
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
