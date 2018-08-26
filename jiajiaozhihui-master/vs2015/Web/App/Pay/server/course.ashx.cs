using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.common;
using System.Data;
using SfSoft.web.weixinconfig;

namespace SfSoft.web.wxpay.server
{
    /// <summary>
    /// course 的摘要说明
    /// </summary>
    public class course : IHttpHandler, System.Web.SessionState.IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string type = context.Request.QueryString["type"];
            string result = "";
            switch (type) { 
                case "save":
                    result = SaveData(context);
                    break;
            }
            context.Response.Write(result);
        }
        private string SaveData(HttpContext context)
        {
            ReturnJson json = new ReturnJson();
            if (context.Session["mycourse"] != null && context.Session["WXJSPAYDATA"] != null)
            {
                try
                {
                    WxJsPayData wxJsPayData = context.Session["WXJSPAYDATA"] as WxJsPayData;
                    string courseId = context.Session["mycourse"].ToString();
                    string tradeno = wxJsPayData.Tradeno;
                    string openId = wxJsPayData.OpenId;
                    DateTime orderDateTime = DateTime.Now;
                    int buyNumber = wxJsPayData.BuyNumber;
                    decimal price = wxJsPayData.Price/100;
                    string referrer = "";
                    if (context.Session["REFERRER"] != null)
                    {
                        referrer = context.Session["REFERRER"].ToString();
                    }
                    int salesplatform = 0;
                    if (context.Session["SALESPLATFORM"] != null)
                    {
                        salesplatform = Convert.ToInt32(context.Session["SALESPLATFORM"]);
                    }
                    Model.WX_Course_Order model = new Model.WX_Course_Order();
                    model.BuyNumber = buyNumber;
                    model.CourseId = Convert.ToInt32(courseId);
                    model.IsAct = 1;
                    model.IsDel = 0;
                    model.IsPay = 0;
                    model.OpenId = openId;
                    model.OrderDateTime = orderDateTime;
                    model.Price = price;
                    model.Referrer = referrer;
                    model.SalesPlatform = salesplatform;
                    model.Tradeno = tradeno;
                    if (Exist(tradeno))
                    {
                        json.Code = (int)EnumReturnJson.Exist;
                        return json.Return();
                    }
                    BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
                    bll.Add(model);
                    json.Code = (int)EnumReturnJson.Ok;
                    return json.Return();
                }
                catch (Exception ex) {
                    ShenerWeiXin.WXHelper.WriteNode(ex.Message, "testcourse.txt");
                    json.Code = (int)EnumReturnJson.Error;
                    return json.Return();
                }
            }
            json.Code = (int)EnumReturnJson.Error;
            return json.Return();
        }
        private string OrderQuery(HttpContext context)
        {
            ReturnJson json = new ReturnJson();
            WxJsPayData wxJsPayData = context.Session["WXJSPAYDATA"] as WxJsPayData;
            string courseId = context.Session["mycourse"].ToString();
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            DataSet ds= bll.GetList( 1,"CourseId="+courseId+" and OpenId='"+wxJsPayData.OpenId+"' and IsDel<>1 and IsPay=0 and Price="+wxJsPayData.Price+"","OrderDateTime desc");
            if (ds != null && ds.Tables[0]!=null && ds.Tables[0].Rows.Count>0) {
                json.Body =ds.Tables[0].Rows[0]["Tradeno"].ToString();
                json.Code = (int)EnumReturnJson.Ok;
                return json.Return();
            }
            json.Code=(int)EnumReturnJson.Error;
            return json.Return();
        }
        private bool Exist(string tradeno)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            DataSet ds = bll.GetList("Tradeno='" + tradeno + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
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