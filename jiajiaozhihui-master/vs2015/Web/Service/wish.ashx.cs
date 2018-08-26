using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.SfEmc;
using System.Data;

namespace SfSoft.web.Service
{
    /// <summary>
    /// wish 的摘要说明
    /// </summary>
    public class wish : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string result = "";
            string method = "";
            if (context.Request["method"] != null) {
                method = context.Request["method"].ToString();
            }
            switch (method) {
                case "load":
                    result = Load(context);
                    break;
                case "add":
                    result = Add(context);
                    break;
                case "view":
                    result = View(context);
                    break;
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write(result);
        }
        public string Load(HttpContext context)
        {
            string result = "{}";
            BLL.WX_Wish bll = new BLL.WX_Wish();
            DataSet ds = bll.GetList(0, "isnull(IsAct,0)<>0","ID");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = FormatToJson.ToJson(ds);
                result = result.Insert(1, "\"quantity\":" + ds.Tables[0].Rows.Count + ",");
            }
            return result;
        }
        public string Add(HttpContext context)
        {
            string result = "{}";
            Model.WX_Wish model = new Model.WX_Wish();
            if (context.Request["openid"] != null)
            {
                model.OpenID = context.Request["openid"].ToString();
            }
            if (context.Request["nickname"] != null)
            {
                model.NickName = context.Request["nickname"].ToString();
            }
            if (context.Request["headimgurl"] != null)
            {
                model.HeadImgUrl = context.Request["headimgurl"].ToString();
            }
            if (context.Request["mobile"] != null)
            {
                model.Mobile = context.Request["mobile"].ToString();
            }
            if (context.Request["qq"] != null)
            {
                model.QQ = context.Request["qq"].ToString();
            }
            if (context.Request["weixin"] != null)
            {
                model.WeiXin = context.Request["weixin"].ToString();
            }
            if (context.Request["address"] != null)
            {
                model.Address = context.Request["address"].ToString();
            }
            if (context.Request["detail"] != null)
            {
                model.Detail = context.Request["detail"].ToString();
            }
            if (context.Request["days"] != null)
            {
                model.Days = int.Parse(context.Request["days"].ToString());
            }
            if (context.Request["isanonym"] != null)
            {
                model.IsAnonym = int.Parse(context.Request["isanonym"].ToString());
            }
            if (context.Request["ishelp"] != null)
            {
                model.IsHelp = int.Parse(context.Request["ishelp"].ToString());
            }
            model.Status = 0;
            model.CreateDate = DateTime.Now;
            model.IsAct = 1;
            BLL.WX_Wish bll = new BLL.WX_Wish();
            int index = bll.Add(model);
            if (index > 0)
            {
                DataSet ds = bll.GetList("ID=" + index);
                result = FormatToJson.ToJson(ds);
                ds = bll.GetAllList();
                result = result.Insert(1, "\"quantity\":" + ds.Tables[0].Rows.Count + ",");
            }
            return result;
        }
        public string View(HttpContext context)
        {
            string result="{}";
            if(context.Request["id"]!=null){
                BLL.WX_Wish bll = new BLL.WX_Wish();
                Model.WX_Wish model = bll.GetModel(int.Parse(context.Request["id"].ToString()));
                result = FormatToJson.ToJson(model);
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