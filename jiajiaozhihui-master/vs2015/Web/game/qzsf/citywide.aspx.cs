using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using SfSoft.Common;
using System.Text;
using System.Data;

namespace SfSoft.web.game.qzsf
{
    public partial class citywide : System.Web.UI.Page
    {
        public string HTMLNewKindsNumber = "";


        public string HTMLMenuName = string.Empty;
        public string HTMLCityName = string.Empty;
        public string HTMLWorksNumber = string.Empty; 
        public string HTMLUserNumber = string.Empty;

        public  Link HTMLLink = new Link();
        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                try
                {
                    if (Session["myopenid"] != null)
                    {
                        #region 注册js_sdk
                        ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI jsApi = new ShenerWeiXin.WxApi.WxJs.WeixXinJsAPI(this.Page);

                        jsApi.SetRightList(ShenerWeiXin.WxApi.WxJs.EnumJsRight.previewImage, ShenerWeiXin.WxApi.WxJs.EnumJsRight.hideOptionMenu);
                        jsApi.RegisterWeiXinJsApi();
                        #endregion

                        hfNickName.Value = Session["UserAlias"].ToString();
                        hfOpenID.Value = Session["myopenid"].ToString();
                        GetCity(hfOpenID.Value);
                        GetFriend(hfOpenID.Value);
                        hfID.Value = Request.QueryString["id"].ToString();
                        GetWorksInfo();
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
            //同城
            HTMLLink.CityWideLink = "/game/qzsf/citywide.aspx?id=76";
            //书法圈
            HTMLLink.CommunityLink = "/game/qzsf/start/index.aspx?id=76";
            //小伙伴
            HTMLLink.KidsLink = "/game/qzsf/friend.aspx?id=76";
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
            //精华
            HTMLLink.TopLink = "/game/qzsf/top.aspx?id=76";
            //上传作品
            HTMLLink.UpLoadLink = "/game/qzsf/partinIII.aspx?id=76";

        }
        private void GetCity(string openid)
        {
            BLL.WX_UserLocation bll = new BLL.WX_UserLocation();
            Model.WX_UserLocation model = bll.GetModel(openid);
            if (model != null && model.City != "") {
                hfCity.Value = model.City;
                HTMLCityName = model.City;
            }
        }
        /// <summary>
        /// 当前城市的作品
        /// </summary>
        private void GetWorksInfo()
        {
            HTMLUserNumber = "0";
            HTMLWorksNumber = "0";
            if (hfCity.Value != "")
            {
                BLL.WX_UserLocation bll = new BLL.WX_UserLocation();
                DataSet ds = bll.GetList("city='" + hfCity.Value + "' or  city='" + hfCity.Value.Substring(0, hfCity.Value.Length - 1) + "'");
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    HTMLUserNumber = ds.Tables[0].Rows.Count.ToString();
                }
                StringBuilder sb = new StringBuilder();
                string sql = "select count(*) as number from WX_Doublenovember_File a where exists(select openid from dbo.WX_UserLocation where (city='" + hfCity.Value + "' or city='" + hfCity.Value.Substring(0, hfCity.Value.Length - 1) + "') and  a.openid=openid )";
                DataSet ds2 = SfSoft.DBUtility.DbHelperSQL.Query(sql);
                if (ds2 != null && ds2.Tables[0] != null && ds2.Tables[0].Rows.Count > 0)
                {
                    HTMLWorksNumber = ds2.Tables[0].Rows[0][0].ToString();
                }
            }
        }
        private void GetFriend(string openid)
        {
            BLL.WX_Doublenovember_Invite bll = new BLL.WX_Doublenovember_Invite();
            List<Model.WX_Doublenovember_Invite> list = bll.GetModelList("FromOpenID='" + openid + "' or ToOpenID='" + openid + "'");
            if (list.Count > 0)
            {
                HTMLNewKindsNumber = list.Count(e => e.Status == 0 && e.ToOpenID == openid).ToString();
                if (HTMLNewKindsNumber == "0")
                {
                    HTMLNewKindsNumber = "";
                }
            }
        }
         protected class UserComparer : IEqualityComparer<DataRow>
        {

            public bool Equals(DataRow x, DataRow y)
            {
                return x["openid"].ToString() == y["openid"].ToString();
            }

            public int GetHashCode(DataRow obj)
            {
                return obj.ToString().GetHashCode();
            }
        }
    }
}
