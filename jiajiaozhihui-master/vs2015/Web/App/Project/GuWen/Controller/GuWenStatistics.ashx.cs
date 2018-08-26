using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.GuWen.Controller
{
    /// <summary>
    /// GuWenStatistics 的摘要说明
    /// </summary>
    public class GuWenStatistics : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Statistics(context);
        }
        private void Statistics(HttpContext context)
        {
            try
            {
                string userName = context.Request["userName"];
                string telephone = context.Request["telephone"];
                string address = context.Request["address"];
                string remark = context.Request["remark"];
                string quantity = context.Request["quantity"];

                if (!IsExit(userName, telephone))
                {
                    SfSoft.Model.Wx_JJZH_GuWenStatistics model = new SfSoft.Model.Wx_JJZH_GuWenStatistics();
                    model.Address = address;
                    model.CreateDate = DateTime.Now;
                    model.Quantity = int.Parse(quantity);
                    model.Remark = remark;
                    model.Telephone = telephone;
                    model.UserName = userName;
                    SfSoft.BLL.Wx_JJZH_GuWenStatistics bll = new SfSoft.BLL.Wx_JJZH_GuWenStatistics();
                    bll.Add(model);
                    //正确
                    context.Response.Write("1");
                }
                else
                {
                    //数据重复
                    context.Response.Write("2");
                }
            }
            catch (Exception ex)
            {
                //出错
                context.Response.Write("0");
            }

        }
        private bool IsExit(string userName, string telephone)
        {
            SfSoft.BLL.Wx_JJZH_GuWenStatistics bll = new SfSoft.BLL.Wx_JJZH_GuWenStatistics();
            DataSet ds = bll.GetList("UserName='" + userName + "' and Telephone='" + telephone + "'");
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