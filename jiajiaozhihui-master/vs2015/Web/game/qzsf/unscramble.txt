using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;

namespace SfSoft.web.game.qzsf
{
    public partial class unscramble : System.Web.UI.Page
    {
        public string HTMLTitle = string.Empty;
        public string HTMLPageIndex = string.Empty;
        public string HTMLContent = string.Empty;
        
        public string HTMLCommunityLink = "javascript:void(0)";

        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            //Helper.WeiXinBrowse(Request.UserAgent);
            if (!IsPostBack) {
                if (Request.QueryString["book"] != null)
                {
                    hfBookName.Value = Request.QueryString["book"].ToString();
                }
                if (Request.QueryString["index"] != null)
                {
                    hfPageIndex.Value = Request.QueryString["index"].ToString();
                }
                GetInfo();
                HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            }
        }
        private void GetInfo()
        {
            BLL.WX_Doublenovember_File_unscramble bll = new BLL.WX_Doublenovember_File_unscramble();
            int index=0;
            if (hfBookName.Value != "" && int.TryParse(hfPageIndex.Value, out index)) {
                Model.WX_Doublenovember_File_unscramble model = bll.GetModel(hfBookName.Value, index);
                if (model != null) {
                    HTMLTitle = model.BookName;
                    HTMLPageIndex = model.PageIndex.ToString();
                    HTMLContent = model.Translation;
                }
            }
        }
    }
}
