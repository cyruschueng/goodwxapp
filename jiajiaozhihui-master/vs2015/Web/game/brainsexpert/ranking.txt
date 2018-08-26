using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Helpers;
using System.Data;

namespace SfSoft.web.game.brainsexpert
{
    public partial class ranking : System.Web.UI.Page
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
            if (!IsPostBack) {

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

                if (Request.QueryString["id"] != null) {
                    string id = Request.QueryString["id"].ToString();
                    //id = "3";
                    hfID.Value = id;
                }
                if (Request.QueryString["openid"] != null) {
                    hfOpenid.Value = Request.QueryString["openid"].ToString();
                    //hfOpenid.Value = "fv1qJeqSK/Yl23BuA43d6rMOT8uWKwRZKqnGBXLQ380=";
                    _openid = hfOpenid.Value;

                    GetPlayerInfo(_openid);
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
                HTMLScore = model.Score.ToString();
                hfProvince.Value = model.Province;
                hfCity.Value = model.City;
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
    }
}
