using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace SfSoft.web.emc.wxcourse.notified
{
    public class TemplateMsg
    {
        private MsgInfo _msgInfo;
        public TemplateMsg(MsgInfo msgInfo)
        {
            this._msgInfo = msgInfo;
        }
        public void SendMsg()
        {
            //测试模板：lbF4Krjeqe-rFeVcKe31DFRZqveYCI0F4p59HGoF6wA
            //正式模板:59CtucpNeHWAeDtKvfyJrsJkC4gFwyyVxgMwKFk4qlk
            string templateId = "59CtucpNeHWAeDtKvfyJrsJkC4gFwyyVxgMwKFk4qlk"; 
            var openIds = SfSoft.web.Course.Helper.MyProvide.GetOpenIdByCourseId(_msgInfo.CourseId);
            foreach (var openId in openIds) {
                try
                {
                    string fileId = "11";
                    //string url = App.Helper.WxBaseConfig.CourseRedirectBaseInfoUrl + "?redirect_url=http://courses.jiaxiaogongyu.com/app/default.html&state={\"appid\":\"app001\",\"hash\":\"empty\",\"courseId\":\"" + _msgInfo.CourseId + "\",\"path\":\"onlineaudio\"}";
                    string url = SfSoft.web.ZXS.Helper.CourseTaskProvide.GetCourseUrl(_msgInfo.CourseId);
                    Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel m = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel();
                    var data = new
                    {
                        first = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("你报名的在线课程开始讲课了"),
                        keyword1 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(_msgInfo.Teacher),
                        keyword2 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(_msgInfo.CourseName),
                        keyword3 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(_msgInfo.Intro),
                        keyword4 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(string.Format("{0:yyyy-MM-dd HH:mm:ss}", _msgInfo.SchoolTime)),
                        remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem("请点击详情进入在线直播听课页面开始上课")
                    };
                    m.data = data;
                    m.template_id = templateId; //TM00277
                    m.topcolor = "#ff0000";
                    m.touser = openId;
                    m.url = url;
                    var accesstoken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                    Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accesstoken, openId, templateId, url, data);
                }
                catch (Exception ex)
                {
                    string msg = ex.Message;
                }
            }
        }
        private List<Model.WX_Course> GetCourse()
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            return bll.GetModelList("ParentId is null and IsBags is null and Start is not null");
        }
        private Model.WX_Course GetCourse(int courseId)
        {
            BLL.WX_Course bll = new BLL.WX_Course();
            return bll.GetModel(courseId);
        }
    }
}