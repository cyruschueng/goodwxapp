using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;

namespace SfSoft.web.game.qzsf
{
    public partial class advertisement : System.Web.UI.Page
    {
        public string HTMLTitle = string.Empty;
        public string HTMLImage = string.Empty;
        public string HTMLVideo = string.Empty;
        public string HTMLBody = string.Empty;

        public string HTMLCommunityLink = "javascript:void(0)";
        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                try
                {
                    if (Session["myopenid"] != null)
                    {
                        string id = "";
                        if (Request.QueryString["id"] != null)
                        {
                            id = Request.QueryString["id"].ToString();
                            GetAdvertisement(id);
                        }
                        hfOpenID.Value = Session["myopenid"].ToString();
                        //书法圈
                        HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
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
        private void GetAdvertisement(string id)
        {
            BLL.WX_Advertisement bll = new BLL.WX_Advertisement();
            Model.WX_Advertisement model = bll.GetModel(int.Parse(id));
            if (model != null) {
                HTMLTitle = model.Name;
                HTMLBody = model.TextContent;
                if (model.ImgUrl != "") {
                    HTMLImage = "<img style='width:100%' src='" + model.ImgUrl + "' />";
                }
                if (model.MediaUrl != "") {
                    //string html="";
                    //html += "<video preload='meta' controls='controls'>";
                    //html += "<source src='" + model.MediaUrl + "' type='video/ogg' />";
                    //html += "<source src='" + model.MediaUrl + "' type='video/mp4' />";
                    //html += "您的浏览器不支持 video 标签";
                    //html += "</video>";
                    //HTMLVideo = html;
                    HTMLVideo = model.MediaUrl;
                }
            }
        }
    }
}
