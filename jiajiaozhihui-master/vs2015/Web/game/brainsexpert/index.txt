using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;
using ShenerWeiXin;
using System.Text;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.AdvancedAPIs;

namespace SfSoft.web.game.brainsexpert
{
    public partial class index : System.Web.UI.Page
    {
        public string HTMLNewGame = "";
        public string HTMLAllGame = "";
        public string HTMLHeadUrl = "";
        public string HTMLNickName = "";
        public string HTMLScore = "0";
        public string HTMLGrade = "1";
        public string HTMLGradeName = "书童";
        static string ENCRYPTKEY = "shenerxm";
        public string HTMLTestCode = "";
        public string HTMLOpenID = "";

        public string HTMLAuthUrl = "", HTMLAppid = "", HTMLNoncestr = "", HTMLTimestamp = "", HTMLTicket = "", HTMLSignature = "", HTMLShareLink = "";

        /// <summary>
        /// 字符串加密后，如果作为参数进行传数，在字符里有“+”要转编码成%2B
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (!IsPostBack) {
                
                HTMLAuthUrl = WXConfig.AuthURL;
                HTMLAppid = WXConfig.appId;

                HTMLNoncestr = JSSDKHelper.GetNoncestr();
                HTMLTimestamp = JSSDKHelper.GetTimestamp();
                HTMLTicket = Senparc.Weixin.MP.Containers.JsApiTicketContainer.TryGetJsApiTicket(WXConfig.appId, WXConfig.appSecret);

                HTMLSignature = Senparc.Weixin.MP.Helpers.JSSDKHelper.GetSignature(HTMLTicket, HTMLNoncestr, HTMLTimestamp, Request.Url.AbsoluteUri);
                HTMLShareLink = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+WXConfig.AgentAppID+"&redirect_uri="+WXConfig.AuthURL+"game/brainsexpert/index.aspx&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";


                if (Request.QueryString["code"] != null)
                {
                    string code = Request.QueryString["code"].ToString();
                    HTMLTestCode = code;
                    string serviceOpenID = AddPlayerInfo(code);
                    GetPlayerInfoByServiceOpenID(serviceOpenID);
                    //加密用于传输
                    hfOpenid.Value =serviceOpenID;
                    HTMLOpenID = hfOpenid.Value.Replace("+", "%2B");
                }
                else {
                    //页面之间传递的是服务openid 
                    if (Request.QueryString["userid"] != null)
                    {
                        //service_openid已加密过的
                        string serviceOpenID = Request.QueryString["userid"].ToString();
                        hfOpenid.Value = serviceOpenID;
                        HTMLOpenID = hfOpenid.Value.Replace("+", "%2B");
                        //解密猎取用户信息
                        string openid =serviceOpenID;
                        GetPlayerInfoByServiceOpenID(openid);
                    }
                    else {
                        //从微信菜单或信息中用户信息 
                        string openid=Request.QueryString["openid"].ToString();
                        string serviceOpenid= GetPlayerInfoByOpenID(openid);
                        hfOpenid.Value = serviceOpenid;
                        HTMLOpenID = hfOpenid.Value.Replace("+", "%2B");
                    }
                }
                LoadNewGame();
                LoadAllGame();
            }
        }
        //返回的是服务号对应的openid
        private string   AddPlayerInfo(string code)
        {
            //订阅号的openid
            string openid = "";
            if (Request.QueryString["openid"] != null) {
                openid = Request.QueryString["openid"].ToString(); 
            }
            OAuthAccessTokenResult accessTokenResult = OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
            //OAuthAccessTokenResult accessTokenResult = OAuthApi.GetAccessToken("wxa0f624ad8cdb46c4", "951d20b853350b559ec625a6f3573714", code);
            string userid= accessTokenResult.openid;
            string accesstoken = accessTokenResult.access_token;
            OAuthUserInfo user = OAuthApi.GetUserInfo(accesstoken, userid);
            
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = new Model.WX_TestQuestion_Player();
            if (!bll.ExistsByServiceOpenID(userid))
            {
                model.CreateDate = DateTime.Now;
                model.HeaderImgUrl = user.headimgurl;
                model.NickName = user.nickname;
                model.OPenID = openid;
                model.ServiceOpenID = user.openid;
                bll.Add(model);
            }
            else if(openid!="") {
                model = bll.GetModeByServiceOpenID(userid);
                model.OPenID = openid;
                bll.Update(model);
            }
            return user.openid;
        }
        //通过服务号openid获取玩家的信息
        private void GetPlayerInfoByServiceOpenID(string openid)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(openid);
            if (model != null) {
                HTMLHeadUrl = model.HeaderImgUrl;
                HTMLNickName = model.NickName;
                HTMLScore = model.Score.ToString()==""?"0":model.Score.ToString();
                GetGrade(openid);

            }
        }
        //通过订阅号openid获取玩家的信息
        private string  GetPlayerInfoByOpenID(string openid)
        {
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByOpenID(openid);
            string serviceOpenid = "";
            if (model != null)
            {
                HTMLHeadUrl = model.HeaderImgUrl;
                HTMLNickName = model.NickName;
                HTMLScore = model.Score.ToString()==""?"0":model.Score.ToString();
                serviceOpenid = model.ServiceOpenID;
                GetGrade(model.Score.ToString());
            }
            return serviceOpenid;
        }
        private void LoadNewGame()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select top 3 a.*,b.Number from WX_TestQuestion_Activity a ");
            sb.Append(" left join WX_TestQuestion_Activity_PlayerNumber b on a.id=b.questionactiveid ");
            sb.Append(" where Status=1 and isnull(IsAct,0)=1 order by Sort asc");
            DataSet ds = DBUtility.DbHelperSQL.Query(sb.ToString());
            //DataSet ds = bll.GetList(3, "Status=1 and isnull(IsAct,0)=1", "Sort asc");
            string playernumber = "";
            string html = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                foreach (DataRow dr in ds.Tables[0].Rows) { 
                    
                    html += "<div class='accordion-group'>";
                    html += "<div class='accordion-heading' style='position:relative;'>";
                    html += "<a class='accordion-toggle'>" + dr["ActivityName"].ToString() + "</a>";
                    playernumber = dr["Number"].ToString() == "" ? "0" : dr["Number"].ToString();
                    if (int.Parse(playernumber)<int.Parse(dr["InitTakeIn"].ToString())) {
                        playernumber = dr["InitTakeIn"].ToString();
                    }
                    //html += "<span class='number'>参与数：" + playernumber + "</span>";
                    html += "</div>";
                    html += "<div class='accordion-body collapse' style='height: 0px;'>";
                    html += "<div class='accordion-inner'>";
                    html += "<div class='item_content'>";
                    html += "<a href='answer.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "' style=' float:left'>游戏开始</a>";
                    html += "<a href='ranking.aspx?id=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") + "' style=' float:right'>排行榜</a>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            HTMLNewGame = html;
        }
        private void LoadAllGame()
        {
            BLL.WX_TestQuestion_Activity_Class bll = new BLL.WX_TestQuestion_Activity_Class();
            DataSet ds = bll.GetList(0, "classtype=0 and  isnull(IsAct,0)=1", "Sort asc");
            string html = "";
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    html += "<div class='accordion-group'>";
                    html += "<div class='accordion-heading'>";
                    html += "<a class='accordion-toggle' href='detail.aspx?classid=" + dr["ID"].ToString() + "&openid=" + hfOpenid.Value.Replace("+", "%2B") +"' >" + dr["ClassName"].ToString() + "</a>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            HTMLAllGame = html;
        }
        private void AddPlayer()
        { 
            //insert into WX_TestQuestion_Player values('oc6zzswlIoB5MZG8TVntvEkFXvcE','oiU-1twcK6tUPlJxeVa2QWLfMZfw','斧头','http://wx.qlogo.cn/mmopen/dwc9psc7PIYib50Fyp2FlDRy8EG69ZXwkicibwgiaMtUTLG1yBhNQT2iadnqPCkg3ATtlyx8hfFrH4WqQmuH91MNC7pVibOw5VsSKl/0','114.062663','22.561065',null,null,getdate())
        }
        private void GetGrade(string openId)
        {
            BLL.WX_TestQuestion_Item_Score bllScore = new BLL.WX_TestQuestion_Item_Score();
            List<Model.WX_TestQuestion_Item_Score> list = bllScore.GetModelList("openid='"+openId+"'");
            string value = (list.Sum(e => e.Score)??0).ToString();
            BLL.WX_TestQuestion_Grade bll = new BLL.WX_TestQuestion_Grade();
            DataSet ds = bll.GetList("" + value + " between LowerLimit and UpperLimit");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                HTMLGrade = ds.Tables[0].Rows[0]["Grade"].ToString();
                HTMLGradeName = ds.Tables[0].Rows[0]["GradeName"].ToString();
            }
        }
        
    }
}
