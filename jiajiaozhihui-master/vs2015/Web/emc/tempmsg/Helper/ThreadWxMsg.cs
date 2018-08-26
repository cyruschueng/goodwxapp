using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Data;

namespace SfSoft.web.emc.tempmsg.Helper
{
    public class ThreadWxMsg
    {
        ConcurrentQueue<Models.MsgReceiver> queue = new ConcurrentQueue<Models.MsgReceiver>();

        private Model.WX_Template_Msg TemplateMsg { get; set; }
        private string OpenId { get; set; }
        private int MsgId { get; set; }
        private string nickName { get; set; }

        public ThreadWxMsg(int id)
        {
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            this.TemplateMsg = bll.GetModel(id);
            this.MsgId = id;
        }
        public void StartRun(int pageSize,int pageIndex,string strWhere="")
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            if (!string.IsNullOrEmpty(strWhere))
            {
                strWhere = "openid  like 'oc6zz%' and IsSubscibe=1 and "+strWhere;
            }
            else {
                strWhere = "openid  like 'oc6zz%' and IsSubscibe=1";
            }
            var list = bll.GetList(pageSize, pageIndex, strWhere);

            //var list = bll.GetList(pageSize, pageIndex, "openid  like 'oqmj%' and IsSubscibe=1 and isnull(nickname,'')=''");
            

            if (list == null || list.Tables[0] == null || list.Tables[0].Rows.Count == 0) return;
            
            var count = list.Tables[0].Rows.Count;
            foreach (DataRow item in list.Tables[0].Rows)
            {

                queue.Enqueue(new Models.MsgReceiver() { OpenId = item.Field<string>("OpenId"), NickName = item.Field<string>("NickName") });
            }

            Thread t = new Thread((i) =>
            {
                ThreadSenMsg(i);
            });
            
            Thread t2 = new Thread((i) =>
            {
                ThreadSenMsg(i);
            });
            
            Thread t3 = new Thread((i) =>
            {
                ThreadSenMsg(i);
            });
            
            Thread t4 = new Thread((i) =>
            {
                ThreadSenMsg(i);
            });
            
            t.Name = "线程1";
            t.Start(new Models.ThreadParam() { Quantity = count, ThreadName = "线程1" });
            
            t2.Name = "线程2";
            t2.Start(new Models.ThreadParam() { Quantity = count, ThreadName = "线程2" });
            t3.Name = "线程3";
            t3.Start(new Models.ThreadParam() { Quantity = count, ThreadName = "线程3" });
            t4.Name = "线程4";
            t4.Start(new Models.ThreadParam() { Quantity = count, ThreadName = "线程4" });
            
           
            
        }
        private void ThreadSenMsg(object param)
        {
            if (queue.Count > 0)
            {
                Models.ThreadParam p = param as Models.ThreadParam ;
                Parallel.For(0,p.Quantity,(i) =>
                {
                    Models.MsgReceiver item;
                    var t = queue.TryDequeue(out item);
                    if (t == true)
                    {
                        var result= Send(item.OpenId, item.NickName);
                        if (result != null) {
                            SfSoft.Common.LogHelper.WriteLog(p.ThreadName + "=>模版发送完成=>：" + result.errmsg + "(" + item.OpenId + ")");
                        }
                    }
                });
            }
        }
        public Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.SendTemplateMessageResult Send(string openId, string nickName)
        {
            string templateId = TemplateMsg.TempId;
            try
            {
                string index = "5";
                string url = TemplateMsg.Link;
                var items = JArray.Parse(TemplateMsg.Item);
                Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel m = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel();

                m.data = getData(items,nickName);
                m.template_id = templateId; //TM00277
                m.topcolor = "#ff0000";
                m.touser = openId;
                m.url = url;
                var accesstoken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                var n = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accesstoken, openId, templateId, url, m.data);
                return n;
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败",ex);
                return null;
            }
        }
        private string GetValue(JArray items, string key, string nickName)
        {
            foreach (var item in items)
            {
                if (item["id"].ToString() == key)
                {
                    if (item["replace"] != null && item["replace"].ToString() != "")
                    {
                        return DynamicReplace(item["value"].ToString(), item["replace"].ToString(), nickName);
                    }
                    return item["value"].ToString();
                }
            }
            return "";
        }
        private string DynamicReplace(string data, string replace, string nickName)
        {
            if (!string.IsNullOrEmpty(replace) && data.Contains("{{}}"))
            {
                return data.Replace("{{}}", nickName);
            }
            return data;
        }
        private object getData(JArray items,string nickName) {
            if (items.Count == 5)
            {
                var data = new
                {
                    first = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(TemplateMsg.First),
                    keyword1 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword1", nickName)),
                    keyword2 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword2", nickName)),
                    keyword3 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword3", nickName)),
                    keyword4 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword4", nickName)),
                    keyword5 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword5", nickName)),
                    remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(TemplateMsg.Remark)
                };
                return data;
            }
            else if (items.Count == 4)
            {
                var data = new
                {
                    first = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(TemplateMsg.First),
                    keyword1 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword1", nickName)),
                    keyword2 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword2", nickName)),
                    keyword3 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword3", nickName)),
                    keyword4 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword4", nickName)),
                    remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(TemplateMsg.Remark)
                };
                return data;
            }
            else {
                return new { };
            }
        }
    }
}