using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;
using System.Data;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class additioninfo : System.Web.UI.Page
    {
        public string HTMLYear = string.Empty;
        public string HTMLReturnUrl = string.Empty;
        public string HTMLNickName = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                SetYear();
                if (Request.QueryString["weixinid"] != null) {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                if (Request.QueryString["openid"] != null)
                {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                    GetInfo(hfOpenID.Value);
                    GetNickName(hfOpenID.Value);
                }
                if (Request.QueryString["from"] != null)
                {
                    HTMLReturnUrl = "/game/doublenovemberII/info-user.aspx?openid=" + hfOpenID.Value+"&weixinid="+hfWeixinID.Value ;
                    hfFrom.Value = "normal";
                }
                else {
                    HTMLReturnUrl = "/game/doublenovemberII/partinII.aspx?openid=" + hfOpenID.Value+"&weixinid="+hfWeixinID.Value + "&id=76";
                }
                
            }
        }
        private void SetYear()
        {
            string html = "";
            int year = DateTime.Now.Year;
            for (int i = 0; i < 20; i+=4) {
                html += "<tr>";
                html += "<td ><a href='javascript:viod(0)'>"+(year-i)+"年</a></td>";
                html += "<td ><a href='javascript:viod(0)'>" + (year - i-1) + "年</a></td>";
                html += "<td ><a href='javascript:viod(0)'>" + (year - i-2) + "年</a></td>";
                html += "<td ><a href='javascript:viod(0)'>" + (year - i-3) + "年</a></td>";
                html += "</tr>";
            }
            HTMLYear = html;
        }
        private void GetInfo(string openid)
        {
            BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
            Model.WX_Doublenovember_Children model = bll.GetModel(DEncrypt.Decrypt(openid, ShenerWeiXin.WXConfig.EncryptKey));
            if (model!=null)
            {
                hfSex.Value = model.Sex;
                hfBirthday.Value = "{\"year\":\"" + model.Year+ "\",\"month\":\"" +model.Month + "\",\"day\":\"" +model.Day+ "\"}";
                hfAlias.Value = "{\"alias\":\"" + model.Alias+ "\",\"isalias\":\"" + model.IsAlias+ "\"}";
            }
        }
        private void GetNickName(string openid)
        {
            BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
            DataSet ds = bll.GetList(1, "openid='" + DEncrypt.Decrypt(openid, ShenerWeiXin.WXConfig.EncryptKey) + "'", "id desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                HTMLNickName = ds.Tables[0].Rows[0]["NickName"].ToString();
            }
        }
    }
}
