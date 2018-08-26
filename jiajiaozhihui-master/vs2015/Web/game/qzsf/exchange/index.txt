using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.game.qzsf.exchange
{
    public partial class index : System.Web.UI.Page
    {
        private string _openid = string.Empty;
        public string HTMLGold = string.Empty;
        public string HTMLDiamond = string.Empty;
        public string HTMLNickName = string.Empty;
        public string HTMLHeadImgUrl = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                try
                {
                    if (Request.QueryString["mode"] == "database")
                    {
                        //设置管理员，不受限止
                        if (Request.QueryString["openid"] != null && (Request.QueryString["openid"] == "oc6zzs2AajD0C4FClFvDszY1aQS4" || Request.QueryString["openid"] == "oc6zzswh64UXKqMdmhCqGBrBpe9k" || Request.QueryString["openid"] == "oc6zzs1y_A_7RgGi6EGLBUrPCfRk" || Request.QueryString["openid"] == "oc6zzs0IEa49ASsb2mtVdqy4NzRw"))
                        {
                            Session["myopenid"] = Request.QueryString["openid"];
                        }
                        else {
                            Response.Redirect("/game/qzsf/start/index.aspx?id=76");
                        }
                    }
                    _openid = Session["myopenid"].ToString();
                    if (Request.QueryString["mode"] == "database")
                    {
                        HTMLNickName = "斧头";
                    }
                    else {
                        Model.WX_Items_User model= (Model.WX_Items_User)Session["ItemUser"];
                        HTMLNickName = model.NickName;
                        HTMLHeadImgUrl = model.HeadImgUrl;
                    }
                    GeAward();
                }
                catch (Exception ex) {
                    Response.Redirect("error.html", false);
                }
            }
        }
        /// <summary>
        /// 获取金币与钻石
        /// </summary>
        private void GeAward()
        {
            BLL.WX_Doublenovember_Award bll = new BLL.WX_Doublenovember_Award();
            Model.WX_Doublenovember_Award model = bll.GetModel(_openid);
            if (model != null) {
                HTMLGold = ((model.GoldEarn ?? 0) - (model.GoldWasting ?? 0)).ToString();
                HTMLDiamond = ((model.DiamondEarn ?? 0) - (model.DiamondWasting ?? 0)).ToString();
            }
        }
    }
}
