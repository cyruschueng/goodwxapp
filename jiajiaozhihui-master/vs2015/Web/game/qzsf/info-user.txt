using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common;
using System.Data;
using ShenerWeiXin;

namespace SfSoft.web.game.qzsf
{
    public partial class info_user : System.Web.UI.Page
    {
        public string HTMLMenuName = string.Empty;

        public string HTMLNickName = string.Empty;
        public string HTMLAlias = string.Empty;
        public string HTMLIsAlias = string.Empty;
        public string HTMLSex = string.Empty;
        public string HTMLYear = string.Empty;

        
        public Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                try
                {
                    if (Session["myopenid"] != null)
                    {
                        hfOpenID.Value = Session["myopenid"].ToString();
                        GetInfo(hfOpenID.Value);
                        InitLink();
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
        private void InitLink()
        {
            //书法圈
            HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            //我的
            HTMLLink.MyInfoLink = "/game/qzsf/info.aspx?id=76";
            if (Helper.IsMember(hfOpenID.Value))
            {
                //邀请
                HTMLLink.PartinLink = "/game/qzsf/start/invite.aspx";
                HTMLMenuName = "邀请朋友";
            }
            else
            {
                //参与
                HTMLLink.PartinLink = "/game/qzsf/start/order.aspx";
                HTMLMenuName = "参与活动";
            }
            //上传作品
            HTMLLink.UpLoadLink = "/game/qzsf/partinIII.aspx?id=76";
            //编辑个人资料
            HTMLLink.HTMLEditMyInfo = "/game/qzsf/additioninfo.aspx?from=info&id=76";

        }
        private void GetInfo(string openid)
        {
            string sql = " select top 1 a.*,b.NickName from dbo.WX_Doublenovember_Children a";
            sql += " left join dbo.WX_Items_User b on a.openid=b.openid";
            sql += " where a.openid='" + hfOpenID.Value+ "'";
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                HTMLNickName = ds.Tables[0].Rows[0]["NickName"].ToString();
                HTMLAlias = ds.Tables[0].Rows[0]["Alias"].ToString();
                HTMLIsAlias = (ds.Tables[0].Rows[0]["IsAlias"] == null || ds.Tables[0].Rows[0]["IsAlias"].ToString() == "0" || ds.Tables[0].Rows[0]["IsAlias"].ToString() == "") ? "未启用" : "已启用";
                HTMLSex = ds.Tables[0].Rows[0]["Sex"].ToString();
                if (ds.Tables[0].Rows[0]["Year"] != null && ds.Tables[0].Rows[0]["Year"].ToString()!="")
                {
                    HTMLYear = (DateTime.Now.Year - int.Parse(ds.Tables[0].Rows[0]["Year"].ToString())).ToString()+" 岁";
                }
            }
        }
    }
}
