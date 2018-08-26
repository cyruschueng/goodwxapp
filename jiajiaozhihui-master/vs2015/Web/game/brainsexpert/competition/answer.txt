using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Senparc.Weixin.MP.Helpers;
using ShenerWeiXin;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.brainsexpert.competition
{
    public partial class answer : System.Web.UI.Page
    {
        private string _openid = "";
        static string ENCRYPTKEY = "shenerxm";
        public string HTMLHeadUrl = "";
        public string HTMLNickName = "";
        public string HTMLScore = "";
        public string HTMLGrade = "";
        public string HTMLGradeName = "";

        public string HTMLAuthUrl = "", HTMLAppid = "", HTMLNoncestr = "", HTMLTimestamp = "", HTMLTicket = "", HTMLSignature = "", HTMLShareLink = "";
        public Model.WX_WeiXinAccounts WX_WeiXinAccounts = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
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
                        HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                        HTMLShareLink = WXConfig.AuthURL + "auth.ashx?name=guoxuedaren&weixinid=" + hfWeiXinID.Value;
                        #endregion
                    }

                    if (Request.QueryString["id"] != null)
                    {
                        string id = Request.QueryString["id"].ToString();
                        hfID.Value = id;
                    }
                    if (Request.QueryString["openid"] != null)
                    {
                        hfOpenID.Value = Request.QueryString["openid"].ToString();
                        string openid = hfOpenID.Value;
                        _openid = openid;
                        GetPlayerInfo(_openid);
                    }
                    Dond();
                    GameOver();
                }
                catch (Exception ex) {
                    WXHelper.WriteNode(ex.Message);
                }
            }
        }
        private void GetPlayerInfo(string openid)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(openid);
            if (model != null)
            {
                HTMLHeadUrl = model.HeaderImgUrl;
                HTMLNickName = model.NickName;
                HTMLScore = model.Score == null ? "0" : model.Score.ToString();
                GetGrade(model.Score.ToString());
            }
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

        //只能完成一次
        private void Dond()
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            DataSet ds = bll.GetList("openid='" + _openid + "' and  Item="+hfID.Value);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                Response.Redirect(ShenerWeiXin.WXConfig.AuthURL + "game/brainsexpert/competition/alert.html?stauts=1");
            }
        }
        private void GameOver()
        {
            BLL.WX_TestQuestion_Activity bll = new BLL.WX_TestQuestion_Activity();
            Model.WX_TestQuestion_Activity model = bll.GetModel(int.Parse(hfID.Value));
            if (model != null) {
                if (model.EndDate != null) {
                    DateTime d = (DateTime)model.EndDate;
                    TimeSpan span = DateTime.Now.Subtract(d);
                    if (span.Seconds > 0) {
                        Response.Redirect(ShenerWeiXin.WXConfig.AuthURL + "game/brainsexpert/competition/alert.html?status=2");
                    }
                }
            }
        }
    }
}
