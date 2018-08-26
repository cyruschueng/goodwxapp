using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;
using ShenerWeiXin;
using System.Text;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using System.Xml;

namespace SfSoft.web.game.brainsexpert
{
    public partial class _default : System.Web.UI.Page
    {
        public string HTMLNewGame = "";
        public string HTMLAllGame = "";
        public string HTMLHeadUrl = "";
        public string HTMLNickName = "";
        public string HTMLScore = "0";
        public string HTMLGrade = "1";
        public string HTMLGradeName = "书童";
        static string ENCRYPTKEY = "shenerxm";
        public string HTMLTestCode = "";
        public string HTMLOpenID = "";
        public string HTMLCompetitionLink = "javascript:void(0)";
        public string HTMLHelpLink = "";
        public string HTMLCoverStyle = "";
        public string HTMLAuthUrl = "", HTMLAppid = "", HTMLNoncestr = "", HTMLTimestamp = "", HTMLTicket = "", HTMLSignature = "", HTMLShareLink = "";
        public string HTMLCompetitionStyle = "";
        
        public Competition HTMLCompetition = new Competition();

        public  Model.WX_WeiXinAccounts WX_WeiXinAccounts = null;
        
        /// <summary>
        /// 字符串加密后，如果作为参数进行传数，在字符里有“+”要转编码成%2B
        /// 现实多订阅号功能
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!IsPostBack)
            {
                if (Request.QueryString["from"] != null) //从本地服务器服数据
                {
                    if (Request.QueryString["weixinid"] != null) {
                        hfWeiXinID.Value = Request.QueryString["weixinid"].ToString();
                        WX_WeiXinAccounts = GetWeiXinAccounts(Request.QueryString["weixinid"].ToString());
                        Session["weixinid"] = hfWeiXinID.Value;
                    }
                    hfModel.Value = "shenerhost";
                }
                else {
                    if (Request.QueryString["state"] != null)
                    {
                        //Newtonsoft.Json.Linq.JObject weixinObject = Newtonsoft.Json.Linq.JObject.Parse(Request.QueryString["state"].ToString());

                        string[] parameters = Request.QueryString["state"].Split('@');
                        foreach (string p in parameters)
                        {
                            if (p.IndexOf("weixinid=") != -1)
                            {
                                string weixinid = p.Substring(p.IndexOf("=") + 1);
                                if (weixinid != "")
                                {
                                    hfWeiXinID.Value = weixinid;
                                    WX_WeiXinAccounts = GetWeiXinAccounts(weixinid);
                                    Session["weixinid"] = hfWeiXinID.Value;
                                }
                            }
                        }
                    }
                    hfModel.Value = "weixin";
                }
                if (WX_WeiXinAccounts != null) {
                    #region 分享
                    HTMLAuthUrl = WXConfig.AuthURL;
                    HTMLAppid = WX_WeiXinAccounts.AppID;

                    HTMLNoncestr = JSSDKHelper.GetNoncestr();
                    HTMLTimestamp = JSSDKHelper.GetTimestamp();
                    HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WX_WeiXinAccounts.AppID, WX_WeiXinAccounts.AppSect);
                    
                    HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                    HTMLShareLink = WXConfig.AuthURL + "auth.ashx?name=guoxuedaren&weixinid=" + hfWeiXinID.Value;
                    #endregion
                }
                
                if (hfModel.Value == "weixin")//从微信服务器读数据
                {
                    if (Request.QueryString["code"] != null) {
                        string code = Request.QueryString["code"].ToString();
                        string serviceOpenID = AddPlayerInfo(code);
                        GetPlayerInfoByServiceOpenID(serviceOpenID);
                        //加密用于传输
                        hfOpenid.Value = serviceOpenID;
                        Session["openid"] = hfOpenid.Value;
                        HTMLOpenID = hfOpenid.Value.Replace("+", "%2B");

                        HTMLHelpLink = "competition/help.aspx?mode=wexin&weixinid=" + hfWeiXinID.Value + "&name=guoxuedaren";
                    }
                }
                else {
                    if (Request.QueryString["openid"] != null)
                    {
                        //service_openid已加密过的
                        string serviceOpenID = Request.QueryString["openid"].ToString(); 
                        hfOpenid.Value = serviceOpenID;
                        Session["openid"] = hfOpenid.Value;
                        HTMLOpenID = hfOpenid.Value.Replace("+", "%2B");
                        //解密猎取用户信息
                        string openid = serviceOpenID;
                        GetPlayerInfoByServiceOpenID(openid);

                        HTMLHelpLink = "competition/help.aspx?weixinid=" + hfWeiXinID.Value + "&name=guoxuedaren&openid=" + hfOpenid.Value + "";
                    }
                }
                LoadNewGame();
                //Competition();
                RunCompetition(hfOpenid.Value);
                LoadAllGame();
                hfServerTime.Value = DateTime.Now.ToString();
                
            }
        }
        //返回的是服务号对应的openid
        private string AddPlayerInfo(string code)
        {
            //订阅号的openid
            string openid = "";
            if (Request.QueryString["openid"] != null)
            {
                openid = Request.QueryString["openid"].ToString();
            }
            
            Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult accessTokenResult = null;
            if (Session["RefreshToken"] != null)
            {
                try {
                    accessTokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WXConfig.AgentAppID, Session["RefreshToken"].ToString());
                } catch( Exception ex){
                    accessTokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                    Session["RefreshToken"] = accessTokenResult.refresh_token;
                }
            }
            else
            {
                accessTokenResult = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                Session["RefreshToken"] = accessTokenResult.refresh_token;
            }
            string userid = accessTokenResult.openid;
            string accesstoken = accessTokenResult.access_token;
            Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo user = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(accesstoken, userid);

            /*
            OAuthAccessTokenResult accessTokenResult = OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
            string userid = accessTokenResult.openid;
            string accesstoken = accessTokenResult.access_token;
            OAuthUserInfo user = OAuthApi.GetUserInfo(accesstoken, userid);
            */

            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = new Model.WX_TestQuestion_Player();
            if (!bll.ExistsByServiceOpenID(userid))
            {
                model.CreateDate = DateTime.Now;
                model.HeaderImgUrl = user.headimgurl;
                model.NickName = user.nickname;
                model.OPenID = openid;
                model.ServiceOpenID = user.openid;
                bll.Add(model);
            }
            else if (openid != "")
            {
                model = bll.GetModeByServiceOpenID(userid);
                model.OPenID = openid;
                bll.Update(model);
            }
            return user.openid;
        }
        //通过服务号openid获取玩家的信息
        private void GetPlayerInfoByServiceOpenID(string openid)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(openid);
            if (model != null)
            {
                HTMLHeadUrl = model.HeaderImgUrl;
                HTMLNickName = model.NickName;
                HTMLScore = model.Score== null ? "0" : model.Score.ToString();
                GetGrade(openid);
            }
        }
        //通过订阅号openid获取玩家的信息
        private string GetPlayerInfoByOpenID(string openid)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByOpenID(openid);
            string serviceOpenid = "";
            if (model != null)
            {
                HTMLHeadUrl = model.HeaderImgUrl;
                HTMLNickName = model.NickName;
                serviceOpenid = model.ServiceOpenID;
                GetGrade(model.Score.ToString());
            }
            return serviceOpenid;
        }
        private void LoadNewGame()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select top 3 a.*,b.Number from WX_TestQuestion_Activity a ");
            sb.Append(" left join WX_TestQuestion_Activity_PlayerNumber b on a.id=b.questionactiveid ");
            sb.Append(" where Status=1 and isnull(IsAct,0)=1 order by Sort asc");
            DataSet ds = DBUtility.DbHelperSQL.Query(sb.ToString());
            //DataSet ds = bll.GetList(3, "Status=1 and isnull(IsAct,0)=1", "Sort asc");
            string playernumber = "";
            string html = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    string number = GetItemNumber(dr["ID"].ToString());
                    html += "<div class='accordion-group'>";
                    html += "<div class='accordion-heading' style='position:relative;'>";
                    html += "<a class='accordion-toggle'>" + dr["ActivityName"].ToString() + "<span class='badge pull-right text-info'>" + number + "</span></a>";
                    playernumber = dr["Number"].ToString() == "" ? "0" : dr["Number"].ToString();
                    if (int.Parse(playernumber) < int.Parse(dr["InitTakeIn"].ToString()))
                    {
                        playernumber = dr["InitTakeIn"].ToString();
                    }
                    //html += "<span class='number'>参与数：" + playernumber + "</span>";
                    html += "</div>";
                    html += "<div class='accordion-body collapse' style='height: 0px;'>";
                    html += "<div class='accordion-inner'>";
                    html += "<div class='item_content'>";
                    html += "<a href='answer.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid="+hfWeiXinID.Value +"' style=' float:left'>游戏开始</a>";
                    html += "<a href='ranking.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid="+hfWeiXinID.Value +"' style=' float:right'>排行榜</a>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            HTMLNewGame = html;
        }
        private void LoadAllGame()
        {
            BLL.WX_TestQuestion_Activity_Class bll = new BLL.WX_TestQuestion_Activity_Class();
            DataSet ds = bll.GetList(0, "classtype=0 and  isnull(IsAct,0)=1 and ClassID=0", "Sort asc");
            string html = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    html += "<div class='accordion-group'>";
                    html += "<div class='accordion-heading'>";
                    html += "<a class='accordion-toggle' href='detail.aspx?classid=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "' >" + dr["ClassName"].ToString() + "</a>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            HTMLAllGame = html;
        }
        private void LoadCompetition()
        {
            StringBuilder sb = new StringBuilder();
            string sql = "select top 1 * from WX_TestQuestion_Activity where Status=3 and isact=1 order by sort desc, createdate desc";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            string playernumber = "";
            string html = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {

                    html += "<div class='accordion-group'>";
                    html += "<div class='accordion-heading' style='position:relative;'>";
                    html += "<a class='accordion-toggle'>" + dr["ActivityName"].ToString() + "<span id='timespan' class='badge' ></span></a>";
                    
                    html += "</div>";
                    html += "<div class='accordion-body  collapse' style='height: 0px;' id='competition-accordion-body'>";
                    html += "<div class='accordion-inner'>";
                    html += "<div class='item_content'>";
                    if (hfIsPartIn.Value == "true")
                    {
                        html += "<a href='javascript:void(0)' style=' float:left; margin-bottom:10px; background-color:#bbb;'>下次再来</a>";
                    }
                    else if (HTMLCompetition.GameOver == true) {
                        html += "<a href='javascript:void(0)' style=' float:left; margin-bottom:10px; background-color:#bbb;'>活动结束</a>";
                    }
                    else
                    {
                        html += "<a id='btnPlay' href='competition/answer.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid=" + hfWeiXinID.Value + "' style=' float:left; margin-bottom:10px;'>游戏开始</a>";
                    }
                    html += "<a href='competition/ranking.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid=" + hfWeiXinID.Value + "' style=' float:right;margin-bottom:10px; '>排行榜</a>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            HTMLCompetition.Content = html;
        }

        private void TestLoadCompetition()
        {
            StringBuilder sb = new StringBuilder();
            string sql = "select top 1 * from WX_TestQuestion_Activity where Status=3 order by id desc, createdate desc";
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            string playernumber = "";
            string html = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {

                    html += "<div class='accordion-group'>";
                    html += "<div class='accordion-heading' style='position:relative;'>";
                    html += "<a class='accordion-toggle'>" + dr["ActivityName"].ToString() + "<span id='timespan' class='badge' ></span></a>";

                    html += "</div>";
                    html += "<div class='accordion-body  collapse' style='height: 0px;' id='competition-accordion-body'>";
                    html += "<div class='accordion-inner'>";
                    html += "<div class='item_content'>";
                    if (hfIsPartIn.Value == "true")
                    {
                        html += "<a href='javascript:void(0)' style=' float:left; margin-bottom:10px; background-color:#bbb;'>下次再来</a>";
                    }
                    else if (HTMLCompetition.GameOver == true)
                    {
                        html += "<a href='javascript:void(0)' style=' float:left; margin-bottom:10px; background-color:#bbb;'>活动结束</a>";
                    }
                    else
                    {
                        html += "<a id='btnPlay' href='competition/answer.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid=" + hfWeiXinID.Value + "' style=' float:left; margin-bottom:10px;'>游戏开始</a>";
                    }
                    html += "<a href='competition/ranking.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid=" + hfWeiXinID.Value + "' style=' float:right;margin-bottom:10px; '>排行榜</a>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            HTMLCompetition.Content = html;
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
        private Model.WX_WeiXinAccounts GetWeiXinAccounts(string weixinid)
        {
            BLL.WX_WeiXinAccounts bll = new BLL.WX_WeiXinAccounts();
            return bll.GetModelByWeiXinID(weixinid);
        }

        #region  擂台赛
        private void Competition()
        {
            string activityID = "";
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            DataSet ds = bll.GetList(1, "Status=3 and isact=1", "id desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLCompetitionStyle = "style='display:block'";
                
                hfStartDate.Value = ds.Tables[0].Rows[0]["StartDate"].ToString();
                hfEndDate.Value = ds.Tables[0].Rows[0]["EndDate"].ToString();
                activityID = ds.Tables[0].Rows[0]["ID"].ToString();
                Session["competition"] = activityID;

                TimeSpan span = DateTime.Now.Subtract(DateTime.Parse(hfStartDate.Value));
                //如果当前时间小于开始时，将不能操作
                if (span.Seconds > 0) {
                    HTMLCoverStyle = "style=' display:block;position:absolute; left:0px; top:0px; width:100%; height:88%;'";
                }
                //如果当前时间大于结束时间，将不能操作
                span = DateTime.Now.Subtract(DateTime.Parse(hfEndDate.Value));
                if (span.Seconds > 0) {
                    HTMLCoverStyle = "style=' display:block;position:absolute; left:0px; top:0px; width:100%; height:88%;'";
                    HTMLCompetition.GameOver = true;
                }
            }
            else {
                HTMLCompetitionStyle = "style='display:none'";
            }
            string openid = hfOpenid.Value ;
            BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
            if (activityID != "")
            {
                DataSet dsScore = bllScore.GetList("Item=" + activityID + " and OpenID='" + openid + "'");
                if (dsScore != null && dsScore.Tables[0] != null && dsScore.Tables[0].Rows.Count > 0)
                {
                    hfIsPartIn.Value = "true";
                }
                else
                {
                    hfIsPartIn.Value = "false";
                }
            }
            else {
                hfIsPartIn.Value = "false";
            }
            
            #region 测试人员可以看见
            string[] testplayers = new string[] { "oc6zzs1y_A_7RgGi6EGLBUrPCfRk", "oc6zzs_ydxddmVSuAt-QKslyxtcU", "oc6zzs8tquZtbQpTwdfjL2iPO8A0", "oc6zzsxPeBgw6YwTfx7tDaUDYLg8", "oc6zzs-LAMEGtTIFA3RJuXcVWYFM", "oc6zzs0UmAugiZ1n_DyLL8dMb4Qw", "oc6zzs2ILYIukIiFsa8GjQo1mQYY", "oc6zzs0IEa49ASsb2mtVdqy4NzRw", "oc6zzswh64UXKqMdmhCqGBrBpe9k", "oc6zzs2AajD0C4FClFvDszY1aQS4" };
            foreach (string p in testplayers) {
                if (p == openid)
                {
                    HTMLCompetitionStyle = "style='display:block'";
                    HTMLCompetitionLink="competition/prize.aspx?openid="+openid.Replace("+", "%2B") ; //competition/prize.aspx?openid=<%=HTMLOpenID %>.Replace("+", "%2B");
                    break;
                }
            }
            #endregion
            
            LoadCompetition();//加载数据;
        }
        #endregion

        #region 测试用的方法
        private void TestCompetition() 
        {
            string activityID = "";
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            DataSet ds = bll.GetList(1, "Status=3", "id desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLCompetitionStyle = "style='display:block'";

                hfStartDate.Value = ds.Tables[0].Rows[0]["StartDate"].ToString();
                hfEndDate.Value = ds.Tables[0].Rows[0]["EndDate"].ToString();
                activityID = ds.Tables[0].Rows[0]["ID"].ToString();
                Session["competition"] = activityID;
                TimeSpan span = DateTime.Now.Subtract(DateTime.Parse(hfStartDate.Value));
                //如果当前时间小于开始时，将不能操作
                if (span.Seconds > 0)
                {
                    HTMLCoverStyle = "style=' display:block;position:absolute; left:0px; top:0px; width:100%; height:88%;'";
                }
                //如果当前时间大于结束时间，将不能操作
                span = DateTime.Now.Subtract(DateTime.Parse(hfEndDate.Value));
                if (span.Seconds > 0)
                {
                    HTMLCoverStyle = "style=' display:block;position:absolute; left:0px; top:0px; width:100%; height:88%;'";
                    HTMLCompetition.GameOver = true;
                }
            }
            else
            {
                HTMLCompetitionStyle = "style='display:none'";
            }
            string openid = hfOpenid.Value;
            BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
            if (activityID != "")
            {
                DataSet dsScore = bllScore.GetList("Item=" + activityID + " and OpenID='" + openid + "'");
                if (dsScore != null && dsScore.Tables[0] != null && dsScore.Tables[0].Rows.Count > 0)
                {
                    hfIsPartIn.Value = "true";
                }
                else
                {
                    hfIsPartIn.Value = "false";
                }
            }
            else
            {
                hfIsPartIn.Value = "false";
            }
            TestLoadCompetition();//加载数据;
        }
        #endregion

        /// <summary>
        /// 测试用户将在活动任何时候都可内部测试
        /// </summary>
        /// <param name="openid"></param>
        private void RunCompetition(string openid)
        {
            string _openid = openid;

            bool isExistTest = false;
            XmlDocument doc = new XmlDocument();
            doc.Load(MapPath("/game/resource/testplayer.xml"));
            XmlNode root=doc.SelectSingleNode("//player");
            if (root != null) {
                for (int i = 0; i < root.ChildNodes.Count; i++) {
                    if (_openid == root.ChildNodes[i].InnerText)
                    {
                        isExistTest = true;
                        break;
                    }
                }
            }
            if (isExistTest == true)
            {
                TestCompetition();
            }
            else {
                Competition();
            }
        }
        

        /// <summary>
        /// 判断今天是不是活动日
        /// </summary>
        /// <returns></returns>
        private bool IsStart()
        {
            //Monday Tuesday Wednesday Thursday Friday Saturday Sunday
            string dt = DateTime.Today.DayOfWeek.ToString();
            if (dt == "Thursday")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        private string GetItemNumber(string itemId)
        {
            SfSoft.BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            return bll.GetRecordCount("item="+itemId).ToString();
        }


        /*
                /// <summary>
                /// 是不是获得排名
                /// </summary>
                /// <param name="openid"></param>
                /// <param name="id"></param>
                private bool IsRank(string openid, string activeID)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.Append(" select top 20  row_number() over(order by Score desc) as ranking,* from (");
                    sb.Append("select a.openid,a.UsingTime,a.HeaderImgUrl,a.NickName,a.Province,a.City,a.District,a.Longitude,a.Latitude,a.Grade,a.GradeName,b.Score  from ( ");
                    sb.Append(" select a.*, b.HeaderImgUrl,b.NickName,b.Province,b.City,b.District,b.Longitude,b.Latitude,c.Grade,c.GradeName from (");
                    sb.Append(" select   openid, sum(score) as Score,sum(usingtime) as UsingTime ");
                    sb.Append(" from dbo.WX_TestQuestion_Score");
                    sb.Append(" group by openid ");
                    sb.Append(" )a left join WX_TestQuestion_Player b on a.openid=b.serviceopenid ");
                    sb.Append(" left join WX_TestQuestion_Grade c on a.score between c.lowerlimit and c.upperlimit");
                    sb.Append(" )a");
                    sb.Append(" left join (select  openid,questionactiveid,sum(score)as Score from WX_TestQuestion_Score where questionactiveid=" + activeID + " group by openid,questionactiveid) b on a.openid=b.openid");
                    sb.Append(" where questionactiveid is not null ");
                    sb.Append(" )a");

                    DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                    DataView dv = ds.Tables[0].DefaultView;
                    dv.RowFilter = "openid='" + openid + "'";
                    if (dv.Count > 0)
                    {
                        Session["rank"] = dv[0]["ranking"].ToString();
                        return true;
                    }
                    return false;
                }
         * * */
    }
    public class Competition
    {
        public string PlayStatus { get; set; }
        public string RankStaus { get; set; }
        public string GetPrizeStaus { get; set; }
        public string PrizeStaus { get; set; }
        public string Content{get;set;}
        public bool GameOver { get; set; }
    }
}
