using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using SfSoft.Common;
using System.Data;
using ShenerWeiXin;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class info_user : System.Web.UI.Page
    {
        public string HTMLReturnUrl = "javascript:void(0)";
        public string HTMLEditUrl = "javascript:void(0)";
        public string HTMLMenuName = string.Empty;

        public string HTMLNickName = string.Empty;
        public string HTMLAlias = string.Empty;
        public string HTMLIsAlias = string.Empty;
        public string HTMLSex = string.Empty;
        public string HTMLYear = string.Empty;

        #region
        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink = "javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack) {
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                }
                if (Request.QueryString["openid"] != null) {
                    hfOpenID.Value = Request.QueryString["openid"].ToString();
                }
                #region
                //上传作品
                HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76" ;
                //参与(邀请)
                if (Helper.IsMember(DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey)))
                {
                    HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                    HTMLMenuName = "邀请朋友";
                }
                else {
                    HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                    HTMLMenuName = "参与活动";
                }
                
                //我的
                HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value + "&weixinid="+hfWeixinID.Value +"&id=76";
                //书法圈
                string backUrl = "{'openid':'" + DEncrypt.Decrypt(hfOpenID.Value.ConvertBase64TocChars(), WXConfig.EncryptKey) + "','weixinid':'"+hfWeixinID.Value +"'}";
                backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;

                #endregion

                HTMLReturnUrl = "/game/doublenovemberII/info.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64()+"&weixinid="+hfWeixinID.Value ;
                HTMLEditUrl = "/game/doublenovemberII/additioninfo.aspx?openid=" + hfOpenID.Value.ConvertEncryptToBase64()+"&from=info&weixinid="+hfWeixinID.Value;
                GetInfo(Request.QueryString["openid"].ToString());
            }
        }
        private void GetInfo(string openid)
        {
            string sql = " select top 1 a.*,b.NickName from dbo.WX_Doublenovember_Children a";
            sql+=" left join dbo.WX_HomeCard b on a.openid=b.openid";
            sql += " where a.openid='" + DEncrypt.Decrypt(hfOpenID.Value, ShenerWeiXin.WXConfig.EncryptKey) + "'";
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
