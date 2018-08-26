using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.DBUtility;
using SfSoft.SfEmc;

namespace SfSoft.web.Service
{
    /// <summary>
    /// activity11 的摘要说明
    /// </summary>
    public class activity11 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string result = "";
            string method = "";
            method = context.Request["method"].ToString();
            context.Response.ContentType = "text/plain";

            switch (method)
            {
                case "participation"://参与
                    result = Participation(context);
                    break;
                case "attention":
                    result = Attention(context);
                    break;
                case "viewattention":
                    result = ViewAttention();
                    break;
            }
            context.Response.Write(result);
        }
        /// <summary>
        /// 我要参与双11活动
        /// </summary>
        /// <param name="context"></param>
        /// <returns>返回值1：已参与活动; -1:未关注公众号</returns>
        private string Participation( HttpContext context)
        {
            string result = "1";
            string openid = "";
            if (context.Request["openid"] != null) {
                openid = context.Request["openid"].ToString();
            }
            string goodsid="";
            if (context.Request["goodsid"] != null) {
                goodsid = context.Request["goodsid"].ToString();
            }
            if (IsMember(openid) == true)
            {
                BLL.WX_ActivitySignin bll = new BLL.WX_ActivitySignin();
                Model.WX_ActivitySignin model = new Model.WX_ActivitySignin();
                model.CreateDate = DateTime.Now;
                model.Goodsid = int.Parse(goodsid);
                model.Openid = openid;
                bll.Add(model);
            }
            else {
                result = "-1";//未关注公众号
            }
            return result;
        }
        /// <summary>
        /// 支持我的朋友
        /// </summary>
        /// <param name="contex"></param>
        /// <returns></returns>
        private string Attention(HttpContext context) 
        {
            string result = "{}";
            string memberid = "";
            if (context.Request["memberid"] != null)
            {
                memberid = context.Request["memberid"].ToString();
            }
            string openid = "";
            if (context.Request["openid"] != null)
            {
                openid = context.Request["openid"].ToString();
            }
            BLL.WX_ActivityAttention bll = new BLL.WX_ActivityAttention();
            Model.WX_ActivityAttention model = new Model.WX_ActivityAttention();
            model.CreateDate = DateTime.Now;
            model.MemberID = memberid;
            model.Openid = openid;
            bll.Add(model);

            string sql = @"select *,dense_rank() over(order by number ) as row from (
select memberid,count(openid) as number from dbo.WX_ActivityAttention group by memberid 
)a";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = FormatToJson.ToJson(ds);
            }
            return result;
        }
        /// <summary>
        /// 所有的关注用户
        /// </summary>
        /// <returns></returns>
        private string ViewAttention()
        {
            string result = "{}";
            string sql = @"select *,dense_rank() over(order by number ) as row from (
select memberid,count(openid) as number from dbo.WX_ActivityAttention where  isnull(memberid,'')<>'' group by memberid 
)a ";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = FormatToJson.ToJson(ds);
            }
            return result;
        }

        /// <summary>
        /// 是否是会员
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        private bool IsMember(string openid)
        {
            string sql = "select * from WX_HomeCard where openid='" + openid + "'  and isnull(userid,'')<>'' ";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0]!=null && ds.Tables[0].Rows.Count>0)
            {
                return true;
            }
            return false;
            
        }


        /// <summary>
        ///  我是否可以关注
        ///  1)自己不能关注自己
        ///  2）一个人只能关注一次
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        private bool IsAttention(string openid, string memberid)
        {
            if (openid.Trim() == memberid.Trim())
            {
                return false;
            }
            string sql = "select * from WX_ActivityAttention where Openid='" + openid + "'";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return false;
            }
            return true;
        }
        /// <summary>
        /// 是否已参与活动
        /// </summary>
        /// <param name="openid"></param>
        /// <param name="memberid"></param>
        /// <returns></returns>
        private bool IsActivitySignin(string openid)
        {
            string sql = "select * from WX_ActivitySignin where Openid='" + openid + "'";
            DataSet ds = DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            return false;
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