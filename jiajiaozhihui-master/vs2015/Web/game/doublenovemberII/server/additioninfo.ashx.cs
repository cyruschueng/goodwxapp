using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin;
using SfSoft.Common.DEncrypt;
using System.Data;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// additioninfo 的摘要说明
    /// </summary>
    public class additioninfo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result="";
            string method = context.Request["method"].ToString();
            switch (method) { 
                case "edit":
                    result = EditInfo(context);
                    break;
            }
            context.Response.Write(result);
        }

        private string EditInfo(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = DEncrypt.Decrypt(context.Request["openid"], WXConfig.EncryptKey);
                string sex = context.Request["sex"].ToString();
                string year = context.Request["year"].ToString();
                string month = context.Request["month"].ToString();
                string day = context.Request["day"].ToString();
                string nickname = context.Request["nickname"].ToString();
                string isalias = context.Request["isalias"].ToString();
                BLL.WX_Doublenovember_Children bll = new BLL.WX_Doublenovember_Children();
                Model.WX_Doublenovember_Children model = bll.GetModel(openid);
                if (model!=null)
                {
                    model.Day = int.Parse(day.Substring(0, day.Length - 1));
                    model.Month = int.Parse(month.Substring(0, month.Length - 1));
                    model.OpenID = openid;
                    model.Sex = sex;
                    model.Year = int.Parse(year.Substring(0, year.Length - 1));
                    model.Alias = nickname;
                    model.IsAlias = int.Parse(isalias);
                    bll.Update(model);
                    result = "{\"code\":0,\"newid\":\"true\",\"msg\":\"修改成功\"}";
                }
                else
                {
                    model = new Model.WX_Doublenovember_Children();
                    model.Day = int.Parse(day.Substring(0, day.Length - 1));
                    model.Month = int.Parse(month.Substring(0, month.Length - 1));
                    model.OpenID = openid;
                    model.Sex = sex;
                    model.Year = int.Parse(year.Substring(0, year.Length - 1));
                    model.Alias = nickname;
                    model.IsAlias = int.Parse(isalias);
                    int index = bll.Add(model);
                    result = "{\"code\":0,\"newid\":" + index + ",\"msg\":\"修改成功\"}";
                }
            }
            catch (Exception ex) {
                result = "{\"code\":1,\"newid\":\"0\",\"msg\":\"修改成功\"}";
            }
            return result;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}