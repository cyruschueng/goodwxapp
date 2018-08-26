using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;

namespace SfSoft.web.game.qzsf
{
    public partial class orderpattern : System.Web.UI.Page
    {
        public string HtmlOnlinePay = "javascript:void(0)";
        public string HTMLPartinLink = "javascript:void(0)";
        public string HTMLOnlinePayStyle = "";
        public string HTMLLocalPayStyle = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                try
                {
                    string id = "";
                    if (Request.QueryString["id"] != null)
                    {
                        id = Request.QueryString["id"].ToString();
                    }
                    else
                    {
                        id = "76";
                    }
                    string weixinid = "";
                    if (Request.QueryString["weixinid"] != null)
                    {
                        weixinid = Request.QueryString["weixinid"].ToString();
                    }
                    if (Request.QueryString["openid"] != null)
                    {
                        string openid = Request.QueryString["openid"].ToString();
                        HTMLPartinLink = "/game/qzsf/start/order.aspx";
                    }
                    GetProductInfo(id);
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
        private void GetProductInfo(string id)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            Model.WX_PublicGood model = bll.GetModel(Convert.ToInt32(id));
            if (model != null) {
                HtmlOnlinePay = model.GoodsLink;
                if (model.IsOnlinePayment == null || model.IsOnlinePayment==0) {
                    HTMLOnlinePayStyle = "style='display:none'";
                }
                if (model.IsRosebery == null || model.IsRosebery == 0) {
                    HTMLLocalPayStyle = "style='display:none'";
                }
            }
        }
    }
}
