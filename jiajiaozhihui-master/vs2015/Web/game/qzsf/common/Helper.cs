using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin;
using System.Text;
using System.Data;
using System.Collections;

namespace SfSoft.web.game.qzsf
{
    public class Helper
    {
        /// <summary>
        /// 是不是与参与活动
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public static bool IsMember(string openid)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model= bll.GetModel(openid, 76);
            if (model != null && (model.IsSend == 1 || model.IsSend == 11 || model.IsPay==1)) {
                return true;
            }
            return false;
        }
        /// <summary>
        /// 如果不是在微信客户端运行，将阻止运行
        /// </summary>
        /// <param name="userAgent"></param>
        public static void WeiXinBrowse(HttpRequest context)
        {
            if (context.QueryString["openid"] == "oc6zzs1y_A_7RgGi6EGLBUrPCfRk")
            {
            }
            else {
                if (!context.UserAgent.ToLower().Contains("micromessenger"))
                {
                    System.Web.HttpContext.Current.Response.Redirect(WXConfig.AuthURL + "game/doublenovember/weixinpage.html");
                }
            }
        }
        public static string GetNickName(string openid)
        {
            string result = "";
            StringBuilder sb = new StringBuilder();
            sb.Append(" select top 1 a.*,b.Alias,b.IsAlias from WX_HomeCard a left join dbo.WX_Doublenovember_Children b on a.openid=b.openid ");
            sb.Append(" where a.openid='" + openid + "'");
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                DataRow dr = ds.Tables[0].Rows[0];
                if (dr["IsAlias"] != null && dr["IsAlias"].ToString() != "0" && dr["IsAlias"].ToString() != "")
                {
                    result = dr["Alias"].ToString();
                }
                else
                {
                    result = dr["NickName"].ToString();
                }
            }
            return result;
        }
        /// <summary>
        /// 获取不同的微信公众号信息
        /// </summary>
        /// <param name="weixinid"></param>
        /// <returns></returns>
        public static Model.WX_WeiXinAccounts GetWeiXinAccounts(string weixinid)
        {
            BLL.WX_WeiXinAccounts bll = new BLL.WX_WeiXinAccounts();
            Model.WX_WeiXinAccounts model = bll.GetModelByWeiXinID(weixinid);
            if (model != null)
            {
                return model;
            }
            else {
                model = new Model.WX_WeiXinAccounts();
                model.AppID = WXConfig.appId;
                model.AppSect = WXConfig.appSecret;
                model.WeiXinID = "gh_9140bf8c1946";
                model.WeiXinName = "家教智慧";
                return model;
            }
        }
        /// <summary>
        /// 城市
        /// </summary>
        /// <returns></returns>
        public static Dictionary<string,string> GetCity()
        {
            BLL.Pub_Areas bll = new BLL.Pub_Areas();
            DataSet ds = bll.GetList("areatype=2");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                Dictionary<string, string> d = new Dictionary<string, string>();
                foreach (DataRow dr in ds.Tables[0].Rows) {
                    d.Add(dr["AreaID"].ToString(), dr["AreaName"].ToString());
                }
                return d;
            }
            return null;
        }
        /// <summary>
        /// 获取新的邀请数
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public static  string  GetNewFriendNumber(string openid)
        {
            string result = string.Empty;
            BLL.WX_Doublenovember_Invite bll = new BLL.WX_Doublenovember_Invite();
            List<Model.WX_Doublenovember_Invite> list = bll.GetModelList("FromOpenID='" + openid + "' or ToOpenID='" + openid + "'");
            if (list.Count > 0)
            {
                result = list.Count(e => e.Status == 0 && e.ToOpenID == openid).ToString();
                if (result == "0")
                {
                    result = "";
                }
            }
            return result;
        }
        /// <summary>
        /// 用户注册信息
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        public static Model.WX_Items_User GetItemUser(string openid,ShenerWeiXin.ItemObject item)
        {
            BLL.WX_Items_User bll = new BLL.WX_Items_User();
            Model.WX_Items_User model=new Model.WX_Items_User();
            model = bll.GetModel(openid, (int)item);
            return model;
        }
        /// <summary>
        /// 返回结果
        /// </summary>
        /// <param name="code"></param>
        /// <param name="msg"></param>
        /// <returns></returns>
        public static string ReturnJsonResult(EnumResultCode code)
        {
            return "{\"code\":\"" + (int)code + "\",\"msg\":\"" + Enum.GetName(typeof(EnumResultCode), code) + "\"}";
        }
        /// <summary>
        /// 返回空
        /// </summary>
        /// <returns></returns>
        public static string ReturnJsonResult()
        {
            return "{}";
        }
    }
}