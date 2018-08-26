using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class advertisement : System.Web.UI.Page
    {
        public string HTMLTitle = string.Empty;
        public string HTMLImage = string.Empty;
        public string HTMLVideo = string.Empty;
        public string HTMLBody = string.Empty;

        public string HTMLCommunityLink = "javascript:void(0)";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                string id = "";
                if (Request.QueryString["id"] != null) {
                    id = Request.QueryString["id"].ToString();
                    GetAdvertisement(id);
                }
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                if (Request.QueryString["weixinid"] != null)
                {
                     hfWeixinID.Value  = Request.QueryString["weixinid"].ToString();
                }
                //书法圈
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey) + "','weixinid':'" + hfWeixinID.Value + "'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey);
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
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
