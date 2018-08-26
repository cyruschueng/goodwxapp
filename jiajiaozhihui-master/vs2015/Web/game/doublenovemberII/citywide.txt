using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using SfSoft.Common;
using System.Text;
using System.Data;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class citywide : System.Web.UI.Page
    {
        private string _openid = string.Empty;
        private string _id = string.Empty;
        private string _mode = string.Empty;
        private string _share = string.Empty;
        #region 分享参数定义
        public string HTMLAuthUrl = string.Empty;
        public string HTMLAppid = string.Empty;
        public string HTMLNoncestr = string.Empty;
        public string HTMLTimestamp = string.Empty;
        public string HTMLTicket = string.Empty;
        public string HTMLSignature = string.Empty;
        public string HTMLShareLink = string.Empty;
        public string HTMLNewKindsNumber = string.Empty;
        #endregion

        public string HTMLUpLoadLink = "javascript:void(0)";//上传作品
        public string HTMLPartinLink = "javascript:void(0)";//参与链接
        public string HTMLMyInfoLink = "javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
        public string HTMLKidsLink = "javascript:void(0)";//小伙伴
        public string HTMLCityWideLink = "javascript:void(0)";
        public string HTMLTopLink = "javascript:void(0)";

        public string HTMLMenuName = string.Empty;
        public string HTMLCityName = string.Empty;
        public string HTMLWorksNumber = string.Empty; 
        public string HTMLUserNumber = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            Helper.WeiXinBrowse(Request);
            if (!IsPostBack)
            {
                

                #region 解析state参数
                if (Request.QueryString["state"] != null)
                {
                    try
                    {
                        string param = Request.QueryString["state"].ToString();
                        param = DEncrypt.Decrypt(param, WXConfig.EncryptKey);

                        System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
                        Dictionary<string, string> parameters = jss.Deserialize<Dictionary<string, string>>(param);
                        if (parameters.ContainsKey("openid") && parameters["openid"].ToString() != "")
                        {
                            _openid = parameters["openid"].ToString();
                            hfNickName.Value = Helper.GetNickName(_openid);
                            GetCity(_openid);
                            hfOpenID.Value = DEncrypt.Encrypt(parameters["openid"].ToString(), WXConfig.EncryptKey);
                        }
                        if (parameters.ContainsKey("id"))
                        {
                            _id = parameters["id"].ToString();
                        }
                        if (parameters.ContainsKey("mode"))
                        {
                            _mode = parameters["mode"].ToString();
                        }
                        if (parameters.ContainsKey("share"))
                        {
                            _share = parameters["share"].ToString();
                        }
                        if (parameters.ContainsKey("weixinid"))
                        {
                            hfWeixinID.Value = parameters["weixinid"].ToString();
                        }
                    }
                    catch (Exception ex)
                    {
                        WXHelper.WriteNode(Request.Url.AbsoluteUri + "参数出错:" + ex.Message);
                    }
                }
                #endregion
                try
                {
                    if (Request.QueryString["weixinid"] != null)
                    {
                        hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
                    }
                    if (Request.QueryString["openid"] != null)
                    {
                        hfOpenID.Value = Request.QueryString["openid"].ToString();
                        _openid = DEncrypt.Decrypt(hfOpenID.Value, WXConfig.EncryptKey);
                        hfNickName.Value = Helper.GetNickName(_openid);
                        GetCity(_openid);
                        GetFriend(_openid);
                    }
                    if (Request.QueryString["id"] != null)
                    {
                        hfID.Value = Request.QueryString["id"].ToString();
                    }
                    GetWorksInfo();
                }
                catch (Exception ex) {
                    WXHelper.WriteNode(Request.Url.AbsoluteUri+":"+ex.Message);
                }
                #region 分享参数配置
                Model.WX_WeiXinAccounts WeiXinAccounts = Helper.GetWeiXinAccounts(hfWeixinID.Value); //获取微信信息
                hfWeixinID.Value = WeiXinAccounts.WeiXinID;

                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WeiXinAccounts.AppID;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WeiXinAccounts.AppID, WeiXinAccounts.AppSect);

                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                #endregion
                try
                {
                    //上传作品
                    HTMLUpLoadLink = "/game/doublenovemberII/partinIII.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //参与(邀请)
                    if (Helper.IsMember(_openid))
                    {
                        //邀请
                        HTMLPartinLink = "/game/doublenovemberII/friend-invite.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value;
                        HTMLMenuName = "邀请朋友";
                    }
                    else
                    {
                        //参与
                        HTMLPartinLink = "/game/doublenovemberII/order.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                        HTMLMenuName = "参与活动";
                    }
                    //我的
                    HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //小伙伴
                    HTMLKidsLink = "/game/doublenovemberII/friend.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //书法圈
                    string backUrl = "{'openid':'" + _openid + "','weixinid':'" + hfWeixinID.Value + "'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;

                    //同城
                    HTMLCityWideLink = "/game/doublenovemberII/citywide.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //精华
                    HTMLTopLink = "/game/doublenovemberII/top.aspx?openid=" + hfOpenID.Value + "&weixinid=" + hfWeixinID.Value + "&id=76";
                }
                catch (Exception ex) {
                    WXHelper.WriteNode(Request.Url.AbsoluteUri + ":" + ex.Message);
                }
            }
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
            if (hfCity.Value != "") {
                BLL.WX_UserLocation bll = new BLL.WX_UserLocation();
                DataSet ds = bll.GetList("city='" + hfCity.Value + "' or  city='" + hfCity.Value.Substring(0, hfCity.Value.Length - 1) + "'");
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                    HTMLUserNumber = ds.Tables[0].Rows.Count.ToString();
                }
                StringBuilder sb = new StringBuilder();
                string sql = "select count(*) as number from WX_Doublenovember_File a where exists(select openid from dbo.WX_UserLocation where (city='"+hfCity.Value+"' or city='"+hfCity.Value.Substring(0,hfCity.Value.Length-1)+"') and  a.openid=openid )";
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
