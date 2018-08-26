using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.DBUtility;
using System.IO;
using SfSoft.Common;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Entities.Menu;
using Senparc.Weixin.Helpers;
using ShenerWeiXin.Interface;
using ShenerWeiXin.User;
using System.Text;
using System.Web.Caching;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;
using Senparc.Weixin.MP.MessageHandlers;
using Senparc.Weixin.MP.Containers;

namespace ShenerWeiXin
{
    public class WXHelper
    {
        /// <summary>
        /// 弹出授权页面获得用户基本信息
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public static WeixinUserInfoResult  GetAuthUserInfo(string code)
        {
            if (HttpContext.Current.Session["refreshtoken"] == null)
            {
                OAuthAccessTokenResult oauth = OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                string accessToken = AccessTokenContainer.TryGetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret);

                HttpContext.Current.Session["refreshtoken"] = accessToken;
                return CommonApi.GetUserInfo(accessToken,oauth.openid);
            }
            else
            {
                OAuthAccessTokenResult oauth = OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                return CommonApi.GetUserInfo(HttpContext.Current.Session["refreshtoken"].ToString(), oauth.openid);
            }
        }
        public static OAuthUserInfo GetAuthUserInfoSnsapiBase(string code)
        {
            if (HttpContext.Current.Session["refreshtoken"] == null)
            {
                OAuthAccessTokenResult oauth = OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                HttpContext.Current.Session["refreshtoken"] = oauth.refresh_token;
                return OAuthApi.GetUserInfo(oauth.access_token, oauth.openid);
            }
            else {
                OAuthAccessTokenResult oauth = OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
                return OAuthApi.GetUserInfo(HttpContext.Current.Session["refreshtoken"].ToString(), oauth.openid);
            }
        }
        /// <summary>
        /// 写入记事本
        /// </summary>
        /// <param name="words"></param>
        public static void WriteNode(string context, string filename="weixin.txt")
        {
            try
            {
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Data/" + filename);
                if (!File.Exists(filePath))
                {
                    FileStream fs1 = new FileStream(filePath, FileMode.Create, FileAccess.Write);
                    StreamWriter sw = new StreamWriter(fs1);
                    sw.WriteLine("***********************************"+DateTime.Now.ToString()+"***********************************************");
                    sw.WriteLine(context);
                    sw.Close();
                    fs1.Close();
                }
                else
                {
                    StreamWriter sr = File.AppendText(filePath);
                    sr.WriteLine("***********************************" + DateTime.Now.ToString() + "***********************************************");
                    sr.WriteLine(context);
                    sr.Close();
                }
            }
            catch (Exception ex) { 
                
            }
        }
        /// <summary>
        /// 家园卡卡CardID
        /// </summary>
        /// <returns></returns>
        public static string CreateCardID()
        {
            string result = "";
            SfSoft.BLL.WX_HomeCard bll = new SfSoft.BLL.WX_HomeCard();
            DataSet ds = bll.GetList(1, "convert(varchar(10),createdate,120)=convert(varchar(10),getdate(),120) and isnull(CardId,'')<>'' ", "ID desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                string value = ds.Tables[0].Rows[0]["CardId"].ToString();
                value = value.Substring(6);
                int maxvalue = int.Parse(value) + 1;
                value = maxvalue.ToString().PadLeft(5, '0');
                result = DateTime.Now.ToString("yyMMdd") + value;
            }
            else
            {
                result = DateTime.Now.ToString("yyMMdd") + "00001";
            }
            return result;
        }
        #region 菜单
        /// <summary>
        /// 创建菜单
        /// </summary>
        /// <param name="appId"></param>
        /// <param name="appSecret"></param>
        public void CreateMenu(string appId,string appSecret)
        {
            var accessToken = AccessTokenContainer.TryGetAccessToken(appId, appSecret);
            ButtonGroup bg = new ButtonGroup();
            
            /*******************************************************************/
            var subButton = new SubButton()
            {
                name = "慧 · 教育"
            };
            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "家教帮"
            //});
            subButton.sub_button.Add(new SingleClickButton()
            {
                name = "慧 · 课堂",
                key = "course"
            });
            subButton.sub_button.Add(new SingleViewButton()
            {
                url = "http://m.jiaxiaogongyu.com/vm/school/phoneApp/home/home.vm",
                name = "家校共育"
            });
            subButton.sub_button.Add(new SingleViewButton()
            {
                url = "http://mp.weixin.qq.com/mp/getmasssendmsg?__biz=MzA4MjExMjkwNQ==#wechat_webview_type=1&wechat_redirect",
                name = "历史文章"
            });
            bg.button.Add(subButton);


            /**********************************************************************************************/


            subButton = new SubButton()
            {
                name = "慧 · 活动"
            };
            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "慧∙玩儿"
            //});
            subButton.sub_button.Add(new SingleClickButton()
            {
                name = "公益品",
                key = "goods"
            });

            subButton.sub_button.Add(new SingleViewButton()
            {
                name = "悦享达人",
                url = "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=202048431&idx=1&sn=fb0ef211074cec2edd4d9b930f4a32c3#rd"
            });

            subButton.sub_button.Add(new SingleViewButton()
            {
                name = "周末秀",
                url = "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=202048658&idx=1&sn=d01e8db859010a39c1aa72148dac5fb3#rd"
            });
            subButton.sub_button.Add(new SingleViewButton()
            {
                name = "关注有礼",
                url = "http://www.ctcppdy.org/mobile/gift/index.aspx"
            });

            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "幸运购"
            //});
            //subButton.sub_button.Add(new SingleClickButton()
            //{
            //    key = "SubClickRoot_Text",
            //    name = "慧∙游戏"
            //});
            bg.button.Add(subButton);
            

            /**********************************************************************************************/
            subButton = new SubButton()
            {
                name = "慧 · 生活"
            };
            //subButton.sub_button.Add(new SingleViewButton()
            //{
            //    url = "http://www.shenerjiaoyu.com",
            //    name = "慧∙优购"
            //});
            subButton.sub_button.Add(new SingleViewButton()
            {
                url = "http://wsq.qq.com/reflow/263358109",
                name = "慧 · 社区"
            });
            subButton.sub_button.Add(new SingleClickButton()
            {
                key = "exchange",
                name = "积分兑换"
            });
            subButton.sub_button.Add(new SingleClickButton()
            {
                name = "家园卡",
                key = "hodecard"
            });

            bg.button.Add(subButton);

            var result = CommonApi.CreateMenu(accessToken, bg);
        }
        #endregion
        
        /// <summary>
        /// 如果True 表示有效期内，False表示超过有效期
        /// </summary>
        /// <param name="validdate">有效期</param>
        /// <returns></returns>
        public bool IsDateValid(string validdate)
        {
            if (validdate != "")
            {
                DateTime ValidityDate = DateTime.Parse(string.Format("{0:yyyy-MM-dd}",validdate));
                DateTime Today = DateTime.Parse(string.Format("{0:yyyy-MM-dd}", DateTime.Now));
                if (DateTime.Compare(ValidityDate, Today) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return true;
        }
        /// <summary>
        /// 设置隐藏button
        /// </summary>
        /// <param name="button"></param>
        public void HiddenControl(System.Web.UI.HtmlControls.HtmlControl control)
        {
            control.Attributes.CssStyle.Add("display", "none");
        }
        /// <summary>
        /// 设置隐藏button
        /// </summary>
        /// <param name="button"></param>
        public void HiddenControl(System.Web.UI.WebControls.WebControl control)
        {
            control.Attributes.CssStyle.Add("display", "none");
        }
        /// <summary>
        /// 设置显示控件
        /// </summary>
        /// <param name="button"></param>
        public void ShowControl(System.Web.UI.HtmlControls.HtmlControl control, string name="")
        {
            control.Attributes.CssStyle.Add("display", "block");
            if (name != "") {
                control.Attributes.Add("value", name);
            }
        }
        /// <summary>
        ///  设置显示控件
        /// </summary>
        /// <param name="control"></param>
        /// <param name="name"></param>
        public void ShowControl(System.Web.UI.WebControls.WebControl control, string name = "")
        {
            control.Attributes.CssStyle.Add("display", "block");
            if (name != "")
            {
                control.Attributes.Add("value", name);
            }
        }
        /// <summary>
        /// 设置控件无效
        /// </summary>
        /// <param name="button"></param>
        public void DisabledControl(System.Web.UI.HtmlControls.HtmlControl control, string name="")
        {
            control.Attributes.CssStyle.Add("display", "block");
            control.Attributes.CssStyle.Add("color", "#ddd");
            control.Attributes.Add("disabled", "disabled");
            if (name != "") {
                control.Attributes.Add("value", name);
            }
        }
        /// <summary>
        /// 设置控件无效
        /// </summary>
        /// <param name="button"></param>
        public void DisabledControl(System.Web.UI.WebControls.WebControl control, string name = "")
        {
            control.Attributes.CssStyle.Add("display", "block");
            control.Attributes.CssStyle.Add("color", "#ddd");
            control.Attributes.Add("disabled", "disabled");
            if (name != "")
            {
                control.Attributes.Add("value", name);
            }
        }
        /// <summary>
        /// 有没有报名课程
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="coursesid"></param>
        /// <returns></returns>
        public bool SignInOnCourses(string openid, int coursesid)
        {
            SfSoft.BLL.WX_CoursOrder bll = new SfSoft.BLL.WX_CoursOrder();
            SfSoft.Model.WX_CoursOrder model = bll.GetModel(openid, coursesid);
            if (model != null)
            {
                return true;
            }
            else {
                return false;
            }
        }
        /// <summary>
        ///  是否已订购
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="coursesid"></param>
        /// <returns></returns>
        public bool OrderOnPublic(string openid, int goodsid)
        {
            SfSoft.BLL.WX_PublicOrder bll = new SfSoft.BLL.WX_PublicOrder();
            SfSoft.Model.WX_PublicOrder model = bll.GetModel(openid, goodsid);
            if (model != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 是否可以分享
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="articleType">1:课堂;2:公益品;3:积分兑换</param>
        /// <param name="articleID"></param>
        /// <param name="integralCode"></param>
        /// <returns></returns>
        public bool IsShare(string openid, int articleType, int articleID, string integralCode)
        {
            IScore iscore = new Score.Score();
            SfSoft.Model.WX_Integral_Basic model = iscore.GetScoreBasic(integralCode);
            if (model != null) {
                if (model.ScoreDay == 0)
                {
                    return true;
                }
                else {
                    SfSoft.BLL.WX_Share bll = new SfSoft.BLL.WX_Share();
                    DataSet ds = bll.GetListByDay(openid, articleType,articleID,integralCode);
                    if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                        int row = ds.Tables[0].Rows.Count;
                        if (row >= model.ScoreDay)
                        {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                }
            }
            return true;
        }
        /// <summary>
        /// 当提交订单时，用户填写的信息自动更新家园卡，以完善资料
        /// </summary>
        /// <param name="name"></param>
        /// <param name="telephone"></param>
        /// <param name="province"></param>
        /// <param name="city"></param>
        /// <param name="address"></param>
        public void UpdateHomeCard(string openid, string name="", string telephone="", string province="", string city="", string address="")
        {
            bool update = false;
            Follower follower = new Follower();
            SfSoft.Model.WX_HomeCard model = follower.GetUser(openid);
            if (model == null) {
                return;
            }
            if (name != "" && name!=model.name) {
                model.name = name;
                update = true;
            }
            if (telephone != "" && telephone != model.Telephone)
            {
                model.Telephone = telephone;
                update = true;
            }
            if (province != "" && province != model.Province)
            {
                model.Province = province;
                update = true;
            }
            if (city != "" && city != model.City)
            {
                model.City = city;
                update = true;
            }
            if (address != "" && address != model.Address)
            {
                model.Address = address;
                update = true;
            }
            if (update == true) {
                follower.Update(model);
            }
        }
        /// <summary>
        ///  每日限订购数量
        /// </summary>
        /// <param name="id">产品ID</param>
        /// <param name="number">当前数量</param>
        /// <returns>True:超出库存 False:未超出库存</returns>
        public bool IsMoreThanStore(string  id)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select a.number as totalnumber,b.curnumber from dbo.WX_PublicGood a ");
            sb.Append("left join (select goodid,convert(varchar(7),orderdate,120) as orderdate, count(1)as curnumber from WX_PublicOrder group by goodid,convert(varchar(7),orderdate,120))b ");
            sb.Append("on a.id=b.goodid ");
            sb.Append("where a.id="+id+" and convert(varchar(7),b.orderdate,120)=convert(varchar(7),getdate(),120)");
            DataSet ds = DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                int totalnumber = int.Parse(ds.Tables[0].Rows[0]["totalnumber"].ToString());
                int curnumber = int.Parse(ds.Tables[0].Rows[0]["curnumber"].ToString());
                if (curnumber >= totalnumber)
                {
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        }
        /// <summary>
        ///  判断某个积分项目有没有超过设定的积分数
        /// </summary>
        /// <param name="openid">用户唯一标识</param>
        /// <param name="integraltype">积分项目</param>
        /// <returns></returns>
        public bool IsMoreThanTakeSocre(string openid, string integraltype)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select a.*,b.scoreday from ( ");
            sb.Append("select openid,integral_type,count(*) as currnumber from ( ");
            sb.Append("select * from WX_Integral_Detail where openid='" + openid + "'  ");
            sb.Append("and convert(varchar(10),createdate,120)=convert(varchar(10),getdate(),120)  ");
            sb.Append("and integral_type='" + integraltype + "' ");
            sb.Append(")a group by openid,integral_type)a ");
            sb.Append("left join (select * from  dbo.WX_Integral_Basic where typecode='" + integraltype + "')b on a.integral_type=b.typecode ");
            DataSet ds = DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                int curnumber =int.Parse(ds.Tables[0].Rows[0]["currnumber"].ToString());
                int totalnumber = int.Parse(ds.Tables[0].Rows[0]["scoreday"].ToString());
                if (curnumber >= totalnumber)
                {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        /// <summary>
        /// 通过Auto认准获取用户信息
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public OAuthUserInfo AuthUserInfo(string code)
        {
            OAuthAccessTokenResult oauth = OAuthApi.GetAccessToken(WXConfig.AgentAppID, WXConfig.AgentAppSecret, code);
            OAuthUserInfo UserInfo = OAuthApi.GetUserInfo(oauth.access_token, oauth.openid);
            return UserInfo;
        }
        /// <summary>
        /// 调试期间可以有权限显示
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        public static bool DebugRight(string openid)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("oc6zzs7pe4h4L08yq3QfgmUemuIo,oiU-1twBzq7fV8m1SkCiDm2flkKo,"); //李成
            sb.Append("oc6zzs2AajD0C4FClFvDszY1aQS4,oiU-1t4KLQOUGfESK-YyXm1ZjfnA,");//谢燕
            sb.Append("oc6zzswh64UXKqMdmhCqGBrBpe9k,oiU-1t12c9eesNhCuXA3RmZPMTW0,");//汪雪萍
            sb.Append("oc6zzs_ydxddmVSuAt-QKslyxtcU,oc6zzs_ydxddmVSuAt-QKslyxtcU,oiU-1t00ET2OzDdodjT82M0m7eTQ,");//吴波林
            sb.Append("oc6zzs1y_A_7RgGi6EGLBUrPCfRk,oiU-1t34NjrJz2zavfa_GmO9RN6M,");//袁名湖
            sb.Append("oc6zzs2ILYIukIiFsa8GjQo1mQYY,oiU-1txYQKr2K_OXwOuNNAYfmSVA,");//王艳平
            sb.Append("oc6zzsxPeBgw6YwTfx7tDaUDYLg8,oiU-1ty3y7l_Jcr0AiNdhKaxJbWU,");//吴烨鑫
            sb.Append("oc6zzs0Vkav9JxeTbh0AHPnJfQEk,oiU-1t_uhOYN9Hs-2Nc1tjPaHP48,");//张招弟
            sb.Append("oc6zzs_ZDPpWXE8Bkrj8JwVMU5_I,oiU-1t10bO7fT7M28Mqunn-BA6mA,");//李炜龙

            string openids = sb.ToString();
            int index=openids.IndexOf(openid);
            if (index > 0)
            {
                return true;
            }
            else {
                return false;
            }
        }
        /// <summary>
        /// 时间戳转日期
        /// </summary>
        /// <param name="timeStamp"></param>
        /// <returns></returns>
        public static  DateTime GetTime(string timeStamp)
        {
            DateTime dtStart = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1));
            long lTime = long.Parse(timeStamp + "0000000");
            TimeSpan toNow = new TimeSpan(lTime);
            return dtStart.Add(toNow);
        }
        public static void SetRefreshtokeCookie(string key, string value)
        {
            HttpCookie cok = HttpContext.Current.Request.Cookies["Refreshtoke"];
            if (cok != null)
            {
                if (cok[key] != null)
                {
                    cok[key] = value;
                }
                else
                {
                    cok.Values.Add(key, value);
                }
                HttpContext.Current.Response.AppendCookie(cok);
            }
            else {
                HttpCookie cookie = new HttpCookie("Refreshtoke");//初使化并设置Cookie的名称
                DateTime dt = DateTime.Now;
                TimeSpan ts = new TimeSpan(7, 0, 0, 0);//过期时间为7天
                cookie.Expires = dt.Add(ts);//设置过期时间
                cookie.Values.Add(key, value);
                HttpContext.Current.Response.AppendCookie(cookie);
            }
        }
        public static string  ReadRefreshtokeCookie(string key)
        {
            string result = "0";
            HttpCookie cok = HttpContext.Current.Request.Cookies["Refreshtoke"];

            if (cok != null)
            {
                if (cok[key] != null)
                {
                    result= cok[key].ToString();
                }
            }
            return result;
        }

        /// <summary>
        /// 统计活动访问次数
        /// </summary>
        /// <param name="ID"></param>
        public static void VisitViewNumber(int ID)
        {
            SfSoft.BLL.WX_ActivityManage bll = new SfSoft.BLL.WX_ActivityManage();
            SfSoft.Model.WX_ActivityManage model = bll.GetModel(ID);
            if (model != null)
            {
                if (model.ReadNumber != null)
                {
                    model.ReadNumber += 1;
                }
                else
                {
                    model.ReadNumber = 1;
                }
                bll.Update(model);
            }
        }
    }
    
}