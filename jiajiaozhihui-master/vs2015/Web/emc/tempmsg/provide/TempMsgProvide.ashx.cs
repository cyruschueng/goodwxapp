using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Text;
using System.Runtime.Remoting.Messaging;
using FluentScheduler;

namespace SfSoft.web.emc.tempmsg.provide
{
    /// <summary>
    /// TempMsgProvide 的摘要说明
    /// </summary>
    public class TempMsgProvide : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "temp":
                    GetTempInfo(context);
                    break;
                case "add":
                    AddTemp(context);
                    break;
                case "init":
                    GetTempInfoValue(context);
                    break;
                case "update":
                    UpdateTemp(context);
                    break;
                case "send":
                    //MsgSend(context);
                    ThreadMsgSend(context);
                    break;
                case "test":
                    //Test(context);
                    ThreadMsgTestSend(context);
                    break;
            }
        }

        private void UpdateTemp(HttpContext context)
        {
            var first = context.Request["first"];
            var item = context.Request["item"];
            var link = context.Request["link"];
            var remark = context.Request["remark"];
            var sendDate = context.Request["sendDate"];
            var tempId = context.Request["tempId"];
            var title = context.Request["title"];
            var id = context.Request["id"];

            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            var model = bll.GetModel(int.Parse(id));
            model.First = first;
            model.Item = item;
            model.Link = link;
            model.Remark = remark;
            model.SendDate =Convert.ToDateTime(sendDate);
            model.TempId = tempId;
            model.Title = title;
            var b= bll.Update(model);

            context.Response.Write(b);
        }

        private void GetTempInfo(HttpContext context)
        {
            string src = HttpContext.Current.Server.MapPath("~/emc/tempmsg/template/temp.json");
            using (StreamReader sr = new StreamReader(src, Encoding.Default))
            {
                string json = sr.ReadToEnd();
                sr.Dispose();
                if (!string.IsNullOrEmpty(context.Request["id"])) { 
                    
                }
                context.Response.Write(json);
            }
        }
        
        private void AddTemp(HttpContext context)
        {
            var first = context.Request["first"];
            var item = context.Request["item"];
            var link = context.Request["link"];
            var remark = context.Request["remark"];
            var sendDate = context.Request["sendDate"];
            var tempId = context.Request["tempId"];
            var title = context.Request["title"];

            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            Model.WX_Template_Msg model = new Model.WX_Template_Msg
            {
                CreateDate=DateTime.Now,
                First=first,
                IsAct=1,
                IsSend=0,
                Item=item,
                Link=link,
                Remark=remark,
                SendDate=Convert.ToDateTime(sendDate),
                TempId=tempId,
                Title=title
            };
            var index= bll.Add(model);
            context.Response.Write(index);
        }
        private void GetTempInfoValue(HttpContext context)
        {
            var id=context.Request["id"];
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            var model= bll.GetModel(int.Parse(id));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }
        private void AutoMsgSend(HttpContext context)
        {
            JobManager.Initialize(new Helper.AutoSendMsg());
        }

        private void MsgSend(HttpContext context)
        {
            string id = context.Request["id"];
            string orderBy = context.Request["orderby"];
            Helper.WxMsg msg = new Helper.WxMsg(int.Parse(id));
            msg.MainRun(orderBy);
        }
        private void Test(HttpContext context)
        {
            string openId = context.Request["openid"];
            string id = context.Request["id"];
            Helper.WxMsg msg = new Helper.WxMsg(int.Parse(id));
            msg.Send(openId);
        }

        private void ThreadMsgTestSend(HttpContext context)
        {
            string openId = context.Request["openid"];
            string id = context.Request["id"];
            Helper.ThreadWxMsg msg = new Helper.ThreadWxMsg(int.Parse(id));
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var model= bll.GetModel(openId);
            msg.Send(openId,model.NickName);
        }

        private void ThreadMsgSend(HttpContext context)
        {
            string id = context.Request["id"];
            string orderBy = context.Request["orderby"];
            string pageSize = context.Request["pagesize"];
            string pageIndex = context.Request["pageindex"];
            string strWhere = context.Request["where"];

            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(orderBy) || string.IsNullOrEmpty(pageSize) || string.IsNullOrEmpty(pageIndex)) return;
            int size = 0;
            int.TryParse(pageSize, out size);
            int index = 0;
            int.TryParse(pageIndex, out index);

            Helper.ThreadWxMsg msg = new Helper.ThreadWxMsg(int.Parse(id));
            msg.StartRun(size, index, strWhere);
        }

        private void GetOpen()
        {
            
        }
        private string NextOpenId { get; set; }
        /// <summary>
        /// 拉取的总数量
        /// </summary>
        private int Quantity { get; set; }
        public bool IsReusable
        {

            get
            {
                return false;
            }
        }
    }
}