#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using System.Data;
using System.Text;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class info : System.Web.UI.Page
    {
        public string HTMLRepairUrl = "";
        public string HTMLMenuName = string.Empty;


        public string HTMLWorksNumber = "0"; //作品数
        public string HTMLStudyDay ="0";//练功天数
        public string HTMLLikeNumber ="0";//红花数
        public string HTMLCommentNumber = "0";//评论数

        public string HTMLHeaderImgUrl = "";
        public string HTMLNickName = "";

        public string HTMLWorksUrl = "javascript:void(0)"; //个人作品
        public string HTMLAdditionInfoUrl = "javascript:void(0)"; //我的资料 
        public string HTMLInfoUrl = "javascript:void(0)";//我的活动
        public string HTMLUnscrambleUrl="javascript:void(0)"; //书法字贴注解
        public string HTMLMyCommentUrl = "javascript:void(0)";//我的评论

        #region
        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink = "javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
        #endregion

        #region
        public string HTMLIntegralEarn = "";
        public string HTMLGoldEarn = "";
        public string HTMLGradeName = "书生";
        public string HTMLGrade = "1";
        #endregion 
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                if (Request.QueryString["openid"]!=null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["id"] != null) {
                    hfProductID.Value = Request.QueryString["id"].ToString();
                }
                try
                {
                    GetUser(DEncrypt.Decrypt(Request.QueryString["openid"].ToString(), WXConfig.EncryptKey));
                    GetWorksInfo(DEncrypt.Decrypt(Request.QueryString["openid"].ToString(), WXConfig.EncryptKey));
                    GetHonor(DEncrypt.Decrypt(Request.QueryString["openid"].ToString(), WXConfig.EncryptKey));

                    #region
                    //上传作品
                    HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=" + hfProductID.Value;
                    //参与(邀请)
                    if (Helper.IsMember(DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey)))
                    {
                        HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value+"&id=" + hfProductID.Value ;
                        HTMLMenuName = "邀请朋友";
                    }
                    else {
                        HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value+"&id=" + hfProductID.Value;
                        HTMLMenuName = "参与活动";
                    }
                    
                    //我的
                    HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value+"&id=" + hfProductID.Value;
                    //书法圈
                    string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'"+hfWeixinID.Value +"'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
                    #endregion
                    HTMLRepairUrl = "/game/doublenovemberII/repair.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() +"&weixinid="+hfWeixinID.Value;

                    //个人作品
                    HTMLWorksUrl = "/game/doublenovemberII/info-works.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64()+"&weixinid="+hfWeixinID.Value+"&nickname="+HTMLNickName;
                    //我的资料
                    HTMLAdditionInfoUrl = "/game/doublenovemberII/info-user.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64()+"&weixinid="+hfWeixinID.Value ;
                    //我的活动
                    HTMLInfoUrl = "/game/doublenovemberII/info-activity.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64()+"&weixinid="+hfWeixinID.Value ;
                    //书法字帖注解
                    HTMLUnscrambleUrl = "/game/doublenovemberII/unscramble.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value+"&book=《弟子规》&index=1";
                    //我的评论
                    HTMLMyCommentUrl = "/game/doublenovemberII/info-comment.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value;
                }
                catch (Exception ex) {
                    WXHelper.WriteNode("game.doublenovember.info.aspx:"+ex.Message);
                }
            }
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
        private void GetUser(string openid)
        {
            string sql = "select a.*,b.IsAlias,b.Alias from dbo.WX_HomeCard a left join dbo.WX_Doublenovember_Children b on a.openid=b.openid where a.openid='" + openid + "'";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                DataRow dr = ds.Tables[0].Rows[0];
                if (dr["IsAlias"].ToString() == "1")
                {
                    HTMLNickName = dr["Alias"].ToString();
                }
                else {
                    HTMLNickName = dr["NickName"].ToString();    
                }
                HTMLHeaderImgUrl = dr["HeadimgUrl"].ToString();
            }
        }
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
