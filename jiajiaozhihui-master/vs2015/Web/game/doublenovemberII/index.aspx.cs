#undef DEBUG
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using System.Data;
using SfSoft.SfEmc;
using System.Text;

namespace SfSoft.web.game.doublenovemberII
{
    public partial class index : System.Web.UI.Page
    {
        
        private string _openid = string.Empty;
        private string _id = string.Empty;
        private string _mode = string.Empty;
        private string _share = string.Empty;
        private string p = "";

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
        public string HTMLMyInfoLink="javascript:void(0)"; // 我的信息
        public string HTMLCommunityLink = "javascript:void(0)"; //书法圈
        public string HTMLKidsLink = "javascript:void(0)";//小伙伴
        public string HTMLCityWideLink = "javascript:void(0)"; //同城
        public string HTMLTopLink = "javascript:void(0)"; //精华

        #region 作品信息
        public string HTMLAllWorksNumber = string.Empty;
        public string HTMLTodayWoksNumber = string.Empty;
        public string HTMLMessageInfo = string.Empty;
        #endregion

        public string HTMLMenuName = string.Empty;
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
                        p = param;
                        param = DEncrypt.Decrypt(param.ConvertBase64TocChars(), WXConfig.EncryptKey);

                        System.Web.Script.Serialization.JavaScriptSerializer jss = new System.Web.Script.Serialization.JavaScriptSerializer();
                        Dictionary<string, string> parameters = jss.Deserialize<Dictionary<string, string>>(param);
                        if (parameters.ContainsKey("openid") && parameters["openid"].ToString() != "")
                        {
                            _openid = parameters["openid"].ToString().ConvertBase64TocChars();
                            hfOpenID.Value = DEncrypt.Encrypt(parameters["openid"].ToString().ConvertBase64TocChars(), WXConfig.EncryptKey).ConvertEncryptToBase64();
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
                if (Request.QueryString["weixinid"] != null)
                {
                    hfWeixinID.Value = Request.QueryString["weixinid"].ToString();
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


                #region 微信授权,获取微信用户信息
                if (_mode == "auth")
                {
                    try
                    {
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthAccessTokenResult authAccessToken = null;
                        if (Session["RefreshToken"] != null)
                        {
                            try
                            {
                                authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.RefreshToken(WXConfig.AgentAppID, Session["RefreshToken"].ToString());
                            }
                            catch (Exception ex)
                            {
                                string code = Request.QueryString["code"].ToString();
                                authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                                Session["RefreshToken"] = authAccessToken.refresh_token;
                            }
                        }
                        else
                        {
                            string code = Request.QueryString["code"].ToString();
                            authAccessToken = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                            Session["RefreshToken"] = authAccessToken.refresh_token;
                        }
                        Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo authUserInfo = Senparc.Weixin.MP.AdvancedAPIs.OAuthApi.GetUserInfo(authAccessToken.access_token, authAccessToken.openid);

                        //更新家园卡
                        UpdateHomeCard(authUserInfo);

                        Session["OPENID11"] = authUserInfo.openid;
                        _openid = authUserInfo.openid;
                        hfOpenID.Value = DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    }
                    catch (Exception ex)
                    {
                        WXHelper.WriteNode(Request.Url.AbsoluteUri + "(授权失败)" + ex.Message);
                        Response.Redirect("http://weixin.jiajiaozhihui.cn/start/doublenovember3.ashx");
                    }
                }
                try
                {
                    GetUser(_openid);
                    GetFile();
                    MessageInfo(_openid);
                    GetFriend(_openid);
                    hfA.Value = Adminstrator.IsRight(_openid)==true?"1":"0";
                    #endregion

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
                    //同城
                    HTMLCityWideLink = "/game/doublenovemberII/citywide.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //我的
                    HTMLMyInfoLink = "/game/doublenovemberII/info.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //小伙伴
                    HTMLKidsLink = "/game/doublenovemberII/friend.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //精华
                    HTMLTopLink = "/game/doublenovemberII/top.aspx?openid=" + DEncrypt.Encrypt(_openid, WXConfig.EncryptKey).ConvertEncryptToBase64() + "&weixinid=" + hfWeixinID.Value + "&id=76";
                    //书法圈
                    string backUrl = "{'openid':'" + _openid + "','weixinid':'" + hfWeixinID.Value + "'}";
                    backUrl = DEncrypt.Encrypt(backUrl, WXConfig.EncryptKey).ConvertEncryptToBase64();
                    HTMLCommunityLink = "/game/doublenovemberII/index.aspx?state=" + backUrl;
                }
                catch (Exception ex)
                {
                    WXHelper.WriteNode(Request.Url.AbsoluteUri+":"+ex.Message);
                }
            }
        }
        /// <summary>
        /// 新增修改家园卡
        /// </summary>
        /// <param name="userInfo"></param>
        private void UpdateHomeCard(Senparc.Weixin.MP.AdvancedAPIs.OAuth.OAuthUserInfo userInfo)
        {
            try
            {
                BLL.WX_HomeCard bll = new BLL.WX_HomeCard();
                Model.WX_HomeCard model = null;
                if (!bll.ExistsByAgentId(userInfo.openid))
                {
                    model = new Model.WX_HomeCard();
                    model.CardId = WXHelper.CreateCardID();
                    model.City = userInfo.city;
                    model.Country = userInfo.country;
                    model.CreateDate = DateTime.Now;
                    model.HeadimgUrl = userInfo.headimgurl;
                    model.NickName = userInfo.nickname;
                    model.OpenId = userInfo.openid;
                    model.Province = userInfo.province;
                    model.Sex = userInfo.sex;
                    model.Unionid = userInfo.unionid;
                    bll.Add(model);
                }
                else
                {
                    model = bll.GetModelByAgentId(userInfo.openid);
                    model.NickName = userInfo.nickname;
                    model.Sex = userInfo.sex;
                    model.Province = userInfo.province;
                    model.City = userInfo.city;
                    model.Country = userInfo.country;
                    model.ModifyDate = DateTime.Now;
                    bll.Update(model);
                }
            }
            catch (Exception ex) {
                WXHelper.WriteNode(ex.Message, "game_doublenovember_index.txt");
            }
        }
        private void GetUser(string openid)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(" select top 1 a.*,b.Alias,b.IsAlias from WX_HomeCard a left join dbo.WX_Doublenovember_Children b on a.openid=b.openid ");
            sb.Append(" where a.openid='"+openid+"'");
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                DataRow dr = ds.Tables[0].Rows[0];
                if (dr["IsAlias"] != null && dr["IsAlias"].ToString() != "0" && dr["IsAlias"].ToString() != "")
                {
                    hfNickName.Value = dr["Alias"].ToString();
                }
                else {
                    hfNickName.Value = dr["NickName"].ToString();
                }
            }
        }

        private void GetFile()
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            DataSet ds= bll.GetAllList();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                HTMLAllWorksNumber = ds.Tables[0].Rows.Count.ToString();
                DataView dv = ds.Tables[0].DefaultView;
                dv.RowFilter = "Create_Date>'" + DateTime.Now.ToShortDateString() + "' and Create_Date<'"+DateTime.Now+"'";
                HTMLTodayWoksNumber = dv.Count.ToString();
            }
        }
        private void MessageInfo(string openid)
        {
            StringBuilder sb = new StringBuilder();
            //点赞
            sb.Append(" select a.* from WX_Doublenovember_Like a");
            sb.Append(" left join WX_Doublenovember_File b on a.FileID=b.ID");
            sb.Append(" where isnull(IsView,0)=0 and b.openid='" + openid + "'");
            //评论
            sb.Append( " select a.*,b.openid from dbo.WX_Doublenovember_Comment a");
            sb.Append(" left join WX_Doublenovember_File b on a.FileID=b.ID");
            sb.Append( " where isnull(IsView,0)=0 and b.openid='"+openid+"'");

            DataSet ds= SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            string result = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                int count = ds.Tables[0].Rows.Count;
                string r = count.ToString();
                if (count > 99) {
                    r = "99+";
                }
                result += "<span class='glyphicon glyphicon-heart' style='color:#f00;'> " + r + "</span>&nbsp;&nbsp;&nbsp;";
            }
            if (ds != null && ds.Tables[1] != null && ds.Tables[1].Rows.Count > 0) {
                int count = ds.Tables[1].Rows.Count;
                string r = count.ToString();
                if (count > 99)
                {
                    r = "99+";
                }
                result += "<span class='glyphicon glyphicon-comment' style='color:#f00;'> " + r + "</span>";
            }
            HTMLMessageInfo = result;
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
    }
}
