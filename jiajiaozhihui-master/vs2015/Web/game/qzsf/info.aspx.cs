#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common;
using System.Data;
using System.Text;

namespace SfSoft.web.game.qzsf
{
    public partial class info : System.Web.UI.Page
    {
        public string HTMLWorksNumber = "0"; //作品数
        public string HTMLStudyDay ="0";//练功天数
        public string HTMLLikeNumber ="0";//红花数
        public string HTMLCommentNumber = "0";//评论数

        #region
        public string HTMLIntegralEarn = "";
        public string HTMLGoldEarn = "";
        public string HTMLGradeName = "书生";
        public string HTMLGrade = "1";
        #endregion 

        public Model.WX_Items_User ItemUser = null;
        public string HTMLMenuName = string.Empty;
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
                        hfProductID.Value = Request.QueryString["id"];
                        ItemUser = Session["ItemUser"] as Model.WX_Items_User;
                        GetWorksInfo(hfOpenID.Value);
                        GetHonor(hfOpenID.Value);
                        InitLink(hfOpenID.Value);
                    }
                    else
                    {
                        Response.Redirect("error.html");
                    }
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
        
        /// <summary>
        /// 初始链接
        /// </summary>
        private void InitLink(string openid)
        {
            //书法圈
            HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            //我的
            HTMLLink.MyInfoLink = "/game/qzsf/info.aspx?id=76";
            if (Helper.IsMember(openid))
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
            //个人作品
            HTMLLink.MyWorksLink = "/game/qzsf/start/infoworks.aspx";
            //我的资料
            HTMLLink.MyAdditionInfoLink = "/game/qzsf/info-user.aspx?id=76";
            //我的活动
            HTMLLink.MyActiveLink="/game/qzsf/info-activity.aspx?id=76";
            //书法字帖注解
            HTMLLink.UnscrambleLink = "/game/qzsf/unscramble.aspx?book=《弟子规》&index=1";
            //我的评论
            HTMLLink.MyCommentLink="/game/qzsf/info-comment.aspx?id=76";
            //异常修复
            HTMLLink.RepairLink="/game/qzsf/repair.aspx?id=76";
        }
        private void GetWorksInfo( string openid)
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            List<Model.WX_Doublenovember_File> list=bll.GetModelList("openid='"+openid+"'");
            if (list.Count > 0) {
                //作品数
                HTMLWorksNumber = list.Count().ToString();
                //练功天数
                HTMLStudyDay = GetStudyDay(openid);
                //红花数
                HTMLLikeNumber= list.Sum(e => e.Like_Number).ToString();
                //评论数
                HTMLCommentNumber = list.Sum(e=>e.Comment_Number).ToString();
            }
        }
        /// <summary>
        /// 练功天数(以第一次上传作品作为第一天)
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        private string  GetStudyDay(string openid)
        {
            string result="";
            BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children model = bll.GetModel(openid);
            if (model != null && model.FirstWorksDateTime != null)
            {
                result = (DateTime.Now.Date.Subtract(DateTime.Parse(string.Format("{0:yyyy-MM-dd}",model.FirstWorksDateTime))).Days+1).ToString();
            }
            return result;
        }
        class FileComparer : IEqualityComparer<Model.WX_Doublenovember_File>
        {

            public bool Equals(Model.WX_Doublenovember_File x, Model.WX_Doublenovember_File y)
            {
                string xDate= string.Format("{0:d}", x.Create_Date);
                string yDate = string.Format("{0:d}", y.Create_Date);
                return xDate == yDate;
            }

            public int GetHashCode(Model.WX_Doublenovember_File obj)
            {
                return obj.ToString().GetHashCode();
            }
        }
        /// <summary>
        /// 荣誉榜
        /// </summary>
        /// <param name="openid"></param>
        private void GetHonor(string openid)
        {
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.Append(" select a.*,b.Grade,b.GradeName from dbo.WX_Doublenovember_Award a");
                sb.Append(" left join WX_Doublenovember_Grade b on a.IntegralEarn between b.LowerLimit and b.UpperLimit");
                sb.Append(" where a.Openid='" + openid + "'");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    HTMLIntegralEarn=ds.Tables[0].Rows[0]["IntegralEarn"].ToString();
                    HTMLGoldEarn = ds.Tables[0].Rows[0]["GoldEarn"].ToString();
                    HTMLGradeName = ds.Tables[0].Rows[0]["GradeName"].ToString();
                    HTMLGrade = ds.Tables[0].Rows[0]["Grade"].ToString();
                }
            }
            catch (Exception ex) { 
                
            }
        }
    }
}
