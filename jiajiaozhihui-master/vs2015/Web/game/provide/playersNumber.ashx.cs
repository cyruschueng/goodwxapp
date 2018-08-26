using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.provide
{
    /// <summary>
    /// playersNumber 的摘要说明
    /// </summary>
    public class playersNumber : IHttpHandler
    {
        string _province = "";
        string _city = "";
        static string ENCRYPTKEY = "shenerxm";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string openid = context.Request["openid"];
            GetPersonalArea(openid);
            string result = GetNumber(context);
            context.Response.Write(result);
        }
        private string GetNumber(HttpContext context)
        {
            string sql = "";
            string item = context.Request["item"];
            string type = context.Request["type"];
            if (string.IsNullOrEmpty(item))
            {
                if (type == "nationwide")
                {
                    sql = "select count(1) as Amount from WX_TestQuestion_Player";
                }
                else if (type=="province")
                {
                    sql = "select count(1) as Amount from WX_TestQuestion_Player where Province='" + _province + "'";
                }
                else if (type=="city")
                {
                    sql = "select count(1) as Amount from WX_TestQuestion_Player where Province='" + _province + "' and City= '" + _city + "'";
                }
            }
            else {
                if (type == "nationwide")
                {
                    sql = "select count(1) as Amount from WX_TestQuestion_Item_Score a" +
                        " left join WX_TestQuestion_Player b on a.OpenId=b.ServiceOpenId" +
                        " where a.Item=" + item+ "";
                }
                else if (type=="province")
                {
                    sql = "select count(1) as Amount from WX_TestQuestion_Item_Score a" +
                        " left join WX_TestQuestion_Player b on a.OpenId=b.ServiceOpenId" +
                        " where a.Item=" + item + " and Province='" + _province + "'";
                }
                else if (type=="city")
                {
                    sql = "select count(1) as Amount from WX_TestQuestion_Item_Score a" +
                        " left join WX_TestQuestion_Player b on a.OpenId=b.ServiceOpenId" +
                        " where a.Item=" + item + " and Province='" + _province + "' and City='"+_city+"'";
                }
            }
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0][0].ToString();
            }
            return "0";
        }
        private void GetPersonalArea(string openId)
        {
            openId = openId;
            SfSoft.BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(openId);
            if (model != null) {
                _province = model.Province;
                _city = model.City;
            }
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