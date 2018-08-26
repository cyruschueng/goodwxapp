using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.brainsexpert
{
    public partial class detail : System.Web.UI.Page
    {
        public string HTMLNewGame = "";
        public string HTMLAllGame = "";
        public string HTMLHeadUrl = "";
        public string HTMLNickName = "";
        public string HTMLScore = "";
        public string HTMLGrade = "";
        public string HTMLGradeName = "";
        static string ENCRYPTKEY = "shenerxm";
        public string HTMLOpenID = "";
        public string HTMLAuthUrl = "", HTMLAppid = "", HTMLNoncestr = "", HTMLTimestamp = "", HTMLTicket = "", HTMLSignature = "", HTMLShareLink = "";
        public Model.WX_WeiXinAccounts WX_WeiXinAccounts = null;
        /// <summary>
        /// 字符串加密后，如果作为参数进行传数，在字符里有“+”要转编码成%2B
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeiXinID.Value = Request.QueryString["weixinid"].ToString();
                    WX_WeiXinAccounts = GetWeiXinAccounts(Request.QueryString["weixinid"].ToString());
                }
                if (WX_WeiXinAccounts != null) {
                    HTMLAuthUrl = WXConfig.AuthURL;
                    HTMLAppid = WXConfig.appId;

                    HTMLNoncestr = JSSDKHelper.GetNoncestr();
                    HTMLTimestamp = JSSDKHelper.GetTimestamp();
                    HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WXConfig.appId, WXConfig.appSecret);

                    HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                    HTMLShareLink = WXConfig.AuthURL + "auth.ashx?name=guoxuedaren&weixinid=" + hfWeiXinID.Value;
                }

                string classid = "";
                if (Request.QueryString["classid"] != null)
                {
                    classid = Request.QueryString["classid"].ToString();
                }
                string openid = "";
                if (Request.QueryString["openid"] != null)
                {
                    openid = Request.QueryString["openid"].ToString();
                    hfOpenid.Value = openid;
                    HTMLOpenID = hfOpenid.Value.Replace("+", "%2B");
                    string serviceOpenID = openid;
                    GetPlayerInfoByServiceOpenID(serviceOpenID);
                }
                LoadAllGame(classid);
            }
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
                HTMLScore = model.Score.ToString();
                GetGrade(model.Score.ToString());
            }
        }
        private void LoadAllGame(string classid)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select  a.*,b.Number from WX_TestQuestion_Activity a ");
            sb.Append(" left join WX_TestQuestion_Activity_PlayerNumber b on a.id=b.questionactiveid ");
            sb.Append(" where  pid=" + classid + " and isnull(IsAct,0)=1  order by Sort asc");
            DataSet ds = DBUtility.DbHelperSQL.Query(sb.ToString());
            string playernumber = "";
            //DataSet ds = bll.GetList(0, "Status=2 and pid=" + classid + " and  isnull(IsAct,0)=1", "Sort asc");
            string html = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    string number = GetItemNumber(dr["ID"].ToString());
                    html += "<div class='accordion-group'>";
                    html += "<div class='accordion-heading' style='position:relative;'>";
                    html += "<a class='accordion-toggle' >" + dr["ActivityName"].ToString() + "<span class='badge pull-right text-info'>" + number + "</span></a>";
                    playernumber = dr["Number"].ToString() == "" ? "0" : dr["Number"].ToString();
                    if (int.Parse(playernumber) < int.Parse(dr["InitTakeIn"].ToString()))
                    {
                        playernumber = dr["InitTakeIn"].ToString();
                    }
                    //html += "<span class='number'>参与数：" + playernumber + "</span>";
                    html += "</div>";
                    html += "<div  class='accordion-body collapse' style='height: 0px;'>";
                    html += "<div class='accordion-inner'>";
                    html += "<div class='item_content'>";
                    html += "<a href='answer.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid="+hfWeiXinID.Value +"' style=' float:left'>游戏开始</a>";
                    html += "<a href='ranking.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "&weixinid=" + hfWeiXinID.Value + "' style=' float:right'>排行榜</a>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            HTMLAllGame = html;
        }
        private void GetGrade(string score)
        {
            string value = score == "" ? "0" : score;
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
        private string GetItemNumber(string itemId)
        {
            SfSoft.BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            return bll.GetRecordCount("item=" + itemId).ToString();
        }
    }
}
