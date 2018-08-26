using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using System.Data;

namespace SfSoft.web.game.qzsf
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
                try
                {
                    SetYear();
                    if (Session["myopenid"] != null)
                    {
                        hfOpenID.Value = Session["myopenid"].ToString();
                        GetInfo(hfOpenID.Value);
                        HTMLNickName = Session["UserAlias"].ToString();

                        if (Request.QueryString["from"] != null)
                        {
                            HTMLReturnUrl = "/game/qzsf/info-user.aspx";
                            hfFrom.Value = "normal";
                        }
                        else
                        {
                            HTMLReturnUrl = "/game/qzsf/partinIII.aspx?id=76";
                        }
                    }
                    else
                    {
                        Response.Redirect("error.html");
                    }
                }
                catch (Exception ex) {
                    if (ex.GetType().ToString() != "System.Threading.ThreadAbortException") {
                        WXHelper.WriteNode("(" + Request.RawUrl + ")" + ex.Message, "qzsf.txt");
                        Response.Redirect("error.html");
                    }
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
            Model.WX_Doublenovember_Children model = bll.GetModel(openid);
            if (model!=null)
            {
                hfSex.Value = model.Sex;
                hfBirthday.Value = "{\"year\":\"" + model.Year+ "\",\"month\":\"" +model.Month + "\",\"day\":\"" +model.Day+ "\"}";
                hfAlias.Value = "{\"alias\":\"" + model.Alias+ "\",\"isalias\":\"" + model.IsAlias+ "\"}";
            }
        }
    }
}
