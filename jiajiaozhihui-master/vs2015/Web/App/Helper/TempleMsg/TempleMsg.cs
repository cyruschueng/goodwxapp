using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;

namespace SfSoft.web.App.Helper
{
    public class TempleMsg
    {
        string openId = "";
        object templeData = null;
        string url = "";
        string templateId = "";
        public TempleMsg(string openId,string url, string templateId,object templeData)
        {
            this.openId = openId;
            this.templeData = templeData;
            this.url = url;
            this.templateId = templateId;
        }
        public void Send()
        {
            try
            {

                Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel m = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel();
                m.data = templeData;
                m.template_id = templateId; //TM00277
                m.topcolor = "#ff0000";
                m.touser = openId;
                m.url = url;
                var accesstoken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                var n = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accesstoken, openId, templateId, url, templeData);
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                App.Helper.Log.WriteNode("模版发送失败：" + msg, "tempmsg.txt");
            }
        }
    }
}