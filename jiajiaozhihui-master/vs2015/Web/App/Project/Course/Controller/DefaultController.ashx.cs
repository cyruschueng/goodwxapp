using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Controller
{
    /// <summary>
    /// DefaultController 的摘要说明
    /// </summary>
    public class DefaultController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "infos":
                    GetInfos(context);
                    break;
                case "info":
                    GetInfo(context);
                    break;
            }
        }
        private void GetInfos(HttpContext context)
        {
            string openId = context.Request["openId"];

            //习惯
            var xueGuan=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.XueGuan,openId).Take(4);
            //责任
            var zeRen=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.ZeRen,openId).Take(4);
            //信心
            var xinXun=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.XinXun,openId).Take(4);
            //表达
            var biaoDa=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.BiaoDa,openId).Take(4);
            //专注力
            var zuanZhuli=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.ZuanZhuli,openId).Take(4);
            //价值观
            var jiaZhiGuan=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.JiaZhiGuan,openId).Take(4);
            //安全
            var anQuan=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.AnQuan,openId).Take(4);
            //情商
            var qianShuan=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.QianShuan,openId).Take(4);
            //财商
            var caiShuan=Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.CaiShuan,openId).Take(4);
            //美德
            var meiDe = Helper.HomeProvide.GetCourseList(Enum.CourseThemeEnum.MeiDe, openId).Take(4);

            Models.Home.HomeInfo homeInfo = new Models.Home.HomeInfo();
            homeInfo.AnQuan = anQuan;
            homeInfo.BiaoDa = biaoDa;
            homeInfo.CaiShuan = caiShuan;
            homeInfo.JiaZhiGuan = jiaZhiGuan;
            homeInfo.MeiDe = meiDe;
            homeInfo.QianShuan = qianShuan;
            homeInfo.XinXun = xinXun;
            homeInfo.XueGuan = xueGuan;
            homeInfo.ZeRen = zeRen;
            homeInfo.ZuanZhuli = zuanZhuli;
            homeInfo.Now = DateTime.Now;
            homeInfo.Quantity = Helper.ActiveTheCardProvide.ActiveQuantity();
            homeInfo.IsBuyCard = IsBuyCard(10, openId);

            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(homeInfo, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void GetInfo(HttpContext context)
        {
            var courseId = context.Request["courseId"];
            var openId = context.Request["openId"];
            var model = Helper.HomeProvide.GetCourse(int.Parse(courseId), openId);
            Action<int> view = Helper.CourseProvide.SetViewNumber;
            view.BeginInvoke(int.Parse(courseId), null, null);
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private bool IsBuyCard(int courseId,string openId)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            var list= bll.GetModelList("CourseId=" + courseId + " and OpenId='" + openId + "' and isnull(IsAct,0)=1");
            return list.Count > 0 ? true : false;
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