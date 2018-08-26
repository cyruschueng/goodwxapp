using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.brainsexpert.Course
{
    public partial class result : System.Web.UI.Page
    {
        public string CurrScore = "";
        private string _openid = "";//解密openid
        static string ENCRYPTKEY = "shenerxm";
        public string HTMLOpenID = "";
        public string HTMLActivityID = "";
        public string HTMLScore = "";
        public string HTMLCurrScore = "";
        public string HTMLHeaderImgUrl = "";
        public string HTMLNickName = "";
        public string HTMLGrade = "";
        public string HTMLGradeName = "";
        public string HTMLGold = "0";
        public string HTMLNext = "";
        public string HTMLAgen = "";
        public string HTMLNotice = "";

        public string HTMLAuthUrl = "", HTMLAppid = "", HTMLNoncestr = "", HTMLTimestamp = "", HTMLTicket = "", HTMLSignature = "", HTMLShareLink = "";
        public Model.WX_WeiXinAccounts WX_WeiXinAccounts = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeiXinID.Value = Request.QueryString["weixinid"].ToString();
                    WX_WeiXinAccounts = GetWeiXinAccounts(Request.QueryString["weixinid"].ToString());
                }

                if (WX_WeiXinAccounts != null)
                {
                    #region 分享
                    HTMLAuthUrl = WXConfig.AuthURL;
                    HTMLAppid = WX_WeiXinAccounts.AppID;

                    HTMLNoncestr = JSSDKHelper.GetNoncestr();
                    HTMLTimestamp = JSSDKHelper.GetTimestamp();
                    HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WX_WeiXinAccounts.AppID, WX_WeiXinAccounts.AppSect);
                    HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri.Replace("|", "%7C"));
                    HTMLShareLink = WXConfig.AuthURL + "auth.ashx?name=guoxuedaren&weixinid=" + hfWeiXinID.Value;
                    #endregion
                }

                string id = "";
                if (Request.QueryString["id"] != null)
                {
                    id = Request.QueryString["id"].ToString();
                }
                string openid = "";
                if (Request.QueryString["openid"] != null)
                {
                    openid = Request.QueryString["openid"].ToString();
                    hfOpenID.Value = openid;
                    HTMLOpenID = openid.Replace("+", "%2B");
                    _openid = openid;
                    GetTotalScore(_openid);
                    GetGold(_openid);
                }
                string score = "";
                if (Request.QueryString["score"] != null)
                {
                    score = Request.QueryString["score"].ToString();
                    HTMLCurrScore = score;
                }
                if (Request.QueryString["activityid"] != null)
                {
                    hfID.Value = Request.QueryString["activityid"].ToString();
                    HTMLActivityID = hfID.Value;
                }
                //是否升级 upgrade=true 升级
                //upgrade=false 未升级
                string upgrade = "false";
                if (Request.QueryString["upgrade"] != null)
                {
                    upgrade = Request.QueryString["upgrade"].ToString();
                }
                if (Request.QueryString["isgetgold"] != null)
                {
                    hfIsGetGold.Value = Request.QueryString["isgetgold"].ToString();
                }
                if (!string.IsNullOrEmpty(Request.QueryString["detail"]))
                {
                    string detail = Request.QueryString["detail"].ToString();
                    GetNotice(detail);
                }

                hfUpgrade.Value = upgrade;

                if (Request.QueryString["mode"] != null)
                {

                }
                else
                {
                    #region 暂时作废
                    //HTMLNext = "index.aspx?openid=" + HTMLOpenID;
                    #endregion
                    //HTMLNext = "default.aspx?openid=" + HTMLOpenID + "&from=shenerhost&weixinid=" + hfWeiXinID.Value;
                    HTMLAgen = "index.aspx?id=" + HTMLActivityID + "&openid=" + HTMLOpenID + "&weixinid=" + hfWeiXinID.Value + "&courseid=" + Server.HtmlEncode(Request.Cookies["courseid"].Value); ;
                }
                GetReturnUrl();
            }
        }
        private void GetTotalScore(string openid)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(openid);
            if (model != null)
            {
                HTMLHeaderImgUrl = model.HeaderImgUrl;
                HTMLNickName = model.NickName;
                GetGrade(openid);
            }
        }
        private void GetGrade(string openId)
        {
            BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
            List<Model.WX_TestQuestion_Item_Score> list = bllScore.GetModelList("openid='" + openId + "'");
            string value = (list.Sum(e => e.Score) ?? 0).ToString();
            HTMLScore = value;

            BLL.WX_TestQuestion_Grade bll = new BLL.WX_TestQuestion_Grade();
            DataSet ds = bll.GetList("" + value + " between LowerLimit and UpperLimit");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLGrade = ds.Tables[0].Rows[0]["Grade"].ToString();
                HTMLGradeName = ds.Tables[0].Rows[0]["GradeName"].ToString();
            }
        }
        private void GetGold(string openid)
        {
            string sql = "select isnull(sum(Gold),0) from WX_TestQuestion_Gold where openid='" + openid + "'";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLGold = ds.Tables[0].Rows[0][0].ToString();
            }
        }
        /// <summary>
        /// 计算玩家人数
        /// </summary>
        private void AddActivityPlayer(string activeID, string openid)
        {
            BLL.WX_TestQuestion_Activity_PlayerNumber bll = new BLL.WX_TestQuestion_Activity_PlayerNumber();
            Model.WX_TestQuestion_Activity_PlayerNumber model = null;
            string sql = "select * from dbo.WX_TestQuestion_Item_Score where item=" + activeID;
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows.Count == 1)
                {
                    model = new Model.WX_TestQuestion_Activity_PlayerNumber();
                    model.LastDate = DateTime.Now;
                    model.Number = 1;
                    model.QuestionActiveID = int.Parse(activeID);
                    bll.Add(model);
                }
                else if (ds.Tables[0].Rows.Count > 1)
                {
                    sql = "select * from dbo.WX_TestQuestion_Item_Score where item=" + activeID + " and openid='" + openid + "'";
                    DataSet ds1 = DBUtility.DbHelperSQL.Query(sql);
                    if (ds1 != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                    {
                        if (ds1.Tables[0].Rows.Count == 1)
                        {
                            model = bll.GetModelByActivityID(int.Parse(activeID));
                            if (model == null)
                            {
                                model = new Model.WX_TestQuestion_Activity_PlayerNumber();
                                model.LastDate = DateTime.Now;
                                model.Number = 1;
                                model.QuestionActiveID = int.Parse(activeID);
                                bll.Add(model);
                            }
                            else
                            {
                                model.Number += 1;
                                model.LastDate = DateTime.Now;
                                bll.Update(model);
                            }
                        }
                    }
                }
            }
        }
        private Model.WX_WeiXinAccounts GetWeiXinAccounts(string weixinid)
        {
            BLL.WX_WeiXinAccounts bll = new BLL.WX_WeiXinAccounts();
            return bll.GetModelByWeiXinID(weixinid);
        }
        private void GetNotice(string answers)
        {
            string[] list = answers.Split(',');
            int length = list.Length;
            string[] arrs = new string[length];
            int repeat = 0;
            int score = 0;
            if (answers != "")
            {
                BLL.WX_TestQuestion_Answer_Record bll = new BLL.WX_TestQuestion_Answer_Record();
                var infos = bll.GetModelList("OpenId='" + _openid + "' and QuestionActiveID=" + hfID.Value);
                var newInfos = infos.Where(e => list.Contains(e.ID.ToString()));
                int index = 0;
                foreach (var m in newInfos)
                {
                    score += (m.Score ?? 0);
                    arrs.SetValue((m.TestQuestionID ?? 0).ToString(), index);
                    index += 1;
                }
            }
            repeat = FindSameNumber(arrs);
            if (repeat > 0)
            {
                HTMLNotice = "本局一共答题" + length.ToString() + "，已挑战题目" + repeat.ToString() + "个（不计分），最终得分" + score.ToString();
            }
        }
        /// <summary>
        /// 在数组在查找相同的数个数
        /// </summary>
        /// <param name="arrs"></param>
        /// <returns></returns>
        private int FindSameNumber(string[] arrs)
        {
            BLL.WX_TestQuestion_Answer_Record bll = new BLL.WX_TestQuestion_Answer_Record();
            var list = bll.GetModelList("OpenId='" + _openid + "' and QuestionActiveID=" + hfID.Value);
            var newList = list.Where(e => arrs.Contains((e.QuestionActiveID ?? 0).ToString()));
            var m = (from x in newList
                     select x.ID).Distinct();
            return m.Count();
        }
        private void GetReturnUrl()
        {
            if (Request.Cookies["courseid"] != null)
            {
                var courseId = Server.HtmlEncode(Request.Cookies["courseid"].Value);
                HTMLNext = lib.WxCourse.RedireUrl(int.Parse(courseId));
            }
            else
            {
                HTMLNext = "javascript:void(0)";
            }
        }
    }
}
