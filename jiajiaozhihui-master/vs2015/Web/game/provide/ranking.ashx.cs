using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;

namespace SfSoft.web.game.provide
{
    /// <summary>
    /// ranking 的摘要说明
    /// </summary>
    public class ranking : IHttpHandler
    {
        static string ENCRYPTKEY = "shenerxm";
        private string _openid = "";//解密码的openid
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = Ranking(context);
            context.Response.Write(result);
        }
        private string Ranking(HttpContext context)
        {
            string result = "";
            _openid = context.Request["openid"].ToString();
            string type = context.Request["type"].ToString();
            int activityid =0;
            if (context.Request["activityid"] != null && context.Request["activityid"].ToString() != "")
            {
                activityid =int.Parse(context.Request["activityid"].ToString());
            }
            BLL.WX_TestQuestion_Player bll = new BLL.WX_TestQuestion_Player();
            Model.WX_TestQuestion_Player model = bll.GetModeByServiceOpenID(_openid);
            
            if (type == "city") {
                if (activityid == 0)
                {
                    brainsexpert.lib.Ranking ranking = new brainsexpert.lib.Ranking(_openid, "", model.City);
                    result = ranking.ReturnRankingJson();
                }
                else {
                    brainsexpert.lib.Ranking ranking = new brainsexpert.lib.Ranking(_openid,activityid,"", model.City);
                    result = ranking.ReturnRankingJson();
                }
            }
            else if (type == "province") {
                if (activityid == 0)
                {
                    brainsexpert.lib.Ranking ranking = new brainsexpert.lib.Ranking(_openid, model.Province);
                    result = ranking.ReturnRankingJson();
                }
                else {
                    brainsexpert.lib.Ranking ranking = new brainsexpert.lib.Ranking(_openid,activityid,model.Province);
                    result = ranking.ReturnRankingJson();
                }
            }
            else if (type == "nationwide")
            {
                if (activityid == 0)
                {
                    brainsexpert.lib.Ranking ranking = new brainsexpert.lib.Ranking(_openid);
                    result = ranking.ReturnRankingJson();
                }
                else {
                    brainsexpert.lib.Ranking ranking = new brainsexpert.lib.Ranking(_openid,activityid);
                    result = ranking.ReturnRankingJson();
                }
            }
            return result;
        }
        private string ReturnSubtotalSql(string province = "", string city = "")
        {
            string sql = "select count(1) as Amount from WX_TestQuestion_Player where '" + province + "' in(Province,'') and '" + city + "' in(City,'')";
            return sql;
        }
        private string ReturnSubtotalSql(int itemId, string province = "", string city = "")
        {
            string sql = "select count(1) as Amount from WX_TestQuestion_Item_Score a" +
                " left join WX_TestQuestion_Player b on a.OpenId=b.ServiceOpenId" +
                " where a.Item=" + itemId.ToString() + " and '" + province + "' in(b.Province,'') and '" + city + "' in(b.City,'')";
            return sql;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
    public  enum EnumArea { 
        Province,
        City
    }
}