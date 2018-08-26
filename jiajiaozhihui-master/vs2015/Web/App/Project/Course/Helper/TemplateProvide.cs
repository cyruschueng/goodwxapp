using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using SfSoft.web.App.Helper;

namespace SfSoft.web.Course.Helper
{
    public class TemplateProvide
    {

        /// <summary>
        /// 审核通知，将提醒用户是否处理
        /// </summary>
        /// <param name="openId"></param>
        public  void MessageNotifyToUser(string openId, int templeId, string url)
        {
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            var template = bll.GetModel(templeId);
            var items = JArray.Parse(template.Item);
            var templateData = new
            {
                first = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(template.First),
                keyword1 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword1")),
                keyword2 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(string.Format("{0:yyyy-MM-dd}",DateTime.Now)),
                remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(template.Remark)
            };
            TempleMsg msg = new TempleMsg(openId, url, template.TempId, templateData);
            msg.Send();
        }
        /// <summary>
        /// 登陆异常提醒消息，将提醒客服处理
        /// </summary>
        /// <param name="openId"></param>
        public  void MessageNotifyToJJZH(string openId, int templeId, string url,string user)
        {
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            var template = bll.GetModel(templeId);
            var items = JArray.Parse(template.Item);

            var templateData = new
            {
                first = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(template.First),
                keyword1 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetNickName(user)),
                keyword2 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(string.Format("{0:yyyy-MM-dd}",DateTime.Now)),
                remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(template.Remark)
            };
            TempleMsg msg = new TempleMsg(openId, url, template.TempId, templateData);
            msg.Send();
        }
        private string GetValue(JArray items, string key)
        {
            foreach (var item in items)
            {
                if (item["id"].ToString() == key)
                {
                    return item["value"].ToString();
                }
            }
            return "";
        }
        private string GetNickName(string openId)
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var model= bll.GetModel(openId);
            return model == null ? "" : model.NickName; 
        }
    }
}