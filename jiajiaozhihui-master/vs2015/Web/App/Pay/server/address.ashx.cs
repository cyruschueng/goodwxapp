using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.wxpay.server
{
    /// <summary>
    /// address 的摘要说明
    /// </summary>
    public class address : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string type = context.Request.QueryString["type"];
            string result="";
            switch (type) { 
                case "latest":
                    result = GetLastAddress(context);
                    break;
                case "add":
                    result=AddAddress(context);
                    break;
                case "list":
                    result=GetAllAddress(context);
                    break;
                case "set":
                    result=SetLastAddress(context);
                    break;
            }
            context.Response.Write(result);
        }
        private string GetLastAddress(HttpContext context)
        {
            string result = "{}";
            string openid=context.Request["openid"];
            BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
            DataSet ds = bll.GetList("openid='" + openid + "' and IsLast=1");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result= SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            return result;
        }
        private string AddAddress(HttpContext context)
        {
            string result = "0";
            try{
                string openid=context.Request["openid"];
                string name=context.Request["name"];
                string tel=context.Request["tel"];
                string province=context.Request["province"];
                string city=context.Request["city"];
                string district=context.Request["district"];
                string detail=context.Request["detail"];

                Model.WX_UserAddress model=new Model.WX_UserAddress();
                model.Address=detail;
                model.City=city;
                model.District=district;
                model.IsLast=0;
                model.Mobile=tel;
                model.Name=name;
                model.OpenId=openid;
                model.PostCode="";
                model.Province=province;
                BLL.WX_UserAddress bll=new BLL.WX_UserAddress();
                bll.Add(model);
            }catch( Exception ex){
                result="1";
            }
            return result;
        }
        private string GetAllAddress(HttpContext context)
        {
            string result = "{}";
            string openid = context.Request["openid"];
            BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
            DataSet ds = bll.GetList("openid='" + openid + "'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            return result;
        }
        /// <summary>
        /// 记录用户最近一次收货地址的选择
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string SetLastAddress(HttpContext context)
        {
            string result = "0";
            try
            {
                string openid = context.Request["openid"];
                string sql="update WX_UserAddress set IsLast=0 where openid='"+openid+"'";
                DBUtility.DbHelperSQL.ExecuteSql(sql);
                string id = context.Request["id"];
                BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
                Model.WX_UserAddress mode = bll.GetModel(int.Parse(id));
                if (mode != null)
                {
                    mode.IsLast = 1;
                }
                bll.Update(mode);
            }
            catch (Exception ex) {
                result = "1";
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