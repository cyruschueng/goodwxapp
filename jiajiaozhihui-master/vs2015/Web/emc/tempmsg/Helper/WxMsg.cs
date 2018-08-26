using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;
using System.Runtime.Remoting.Messaging;
using System.Threading;
using System.Threading.Tasks;
using System.IO;
using System.Data;
using System.Collections.Concurrent;

namespace SfSoft.web.emc.tempmsg.Helper
{
    public class TestOpenids
    {
        public string Name { get; set; }
        public List<string> list { get; set; }
    }
    public class WxMsg
    {
        private Model.WX_Template_Msg TemplateMsg { get; set; }
        private string OpenId { get; set; }
        private int MsgId { get; set; }
        private string nickName { get; set; }


        public WxMsg(int id)
        {
            BLL.WX_Template_Msg bll = new BLL.WX_Template_Msg();
            this.TemplateMsg = bll.GetModel(id);
            this.MsgId = id;
            this.NextOpenId = "oc6zzs1y_A_7RgGi6EGLBUrPCfRk";
        }
        


        public void TestRun()
        {
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var list = bll.GetModelList("openid  like 'oc6zz%' ");
            Parallel.For(0, 6, (i, loopState) =>
            {
                var count = i * 10000;
                var openids = list.Skip(count).Take(10000);
                openids.AsParallel().ForAll(a => {
                    App.Helper.Log.WriteNode(i.ToString() + "线程 当前值：" + a.OpenId, "newopenidlist.txt");
                    Thread.Sleep(200);
                });
            });
       }
        public void MainRun(string orderBy = "OpenId desc")
        {
            var max = 10000;

            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var recordnumber = bll.GetRecordCount("");

            int pageCount = (recordnumber / max) + ((recordnumber % max) > 0 ? 1 : 0);
            for (int i = 0; i < pageCount;i++ )
            {
                var startIndex=max*i+1;
                var endIndex = max + max * i;
                var list = bll.GetListByPage("", orderBy, startIndex, endIndex);
                foreach (DataRow dr in list.Tables[0].Rows) {
                    nickName = dr.Field<string>("nickname");
                    Send(dr.Field<string>("openId"));
                }
            }
        }


        public void Run()
        {
            try
            {
                var max = 10000;
                var user = GetOpenIdList("");
                var next_openid = user.next_openid;
                var count = (user.total / max) + (user.total % max > 0 ? 1 : 0);
                List<Models.User> list = new List<Models.User>();
                list.Insert(0, user);
                for (var i = 1; i < count; i++)
                {
                    var open = GetOpenIdList(next_openid);
                    next_openid = open.next_openid;
                    if (open.openids.Count > 0) {
                        list.Add(open);
                    }
                }
                #region 无效
                /*
                try
                {
                    Parallel.For(0, list.Count, (i, loopState) =>
                    {
                        var item = list[i].openids;
                        item.AsParallel().ForAll(a =>App.Helper.Log.WriteNode("线程" + i.ToString() + " 当前值：" + a, "newopenidlist.txt"));
                    });
                }
                catch (Exception ex) {
                    App.Helper.Log.WriteNode("线程出错:"+ex.Message, "taskmsg.txt");
                }
                 * */
                /*
                var tasks = new Task[count];
                for (int i = 0; i < count; i++)
                {
                    int taskIndex = i;
                    tasks[i] = Task.Factory.StartNew(() =>
                    {
                        //TempMessage message = new TempMessage();
                       TempMessage.Send(list[i].openids, taskIndex);
                    });
                }
                Task.WaitAll(tasks);

                Thread[] threads = new Thread[count];
                for (var i = 0; i < count; i++)
                {
                    threads[i] = new Thread(new ThreadStart(() =>
                    {
                        TempMessage message = new TempMessage(i);
                        message.Send(list[i].openids);
                    }));
                    threads[i].IsBackground = true;
                    threads[i].Start();
                }
                */
                #endregion
                Thread thread = new Thread(() => {
                    int index = 1;
                    int sum = 0;
                    foreach (Models.User use in list) {
                        var openids= use.openids;
                        int num = 1;
                        foreach (var openid in openids) {
                            Send(openid);
                        }
                    }
                });
                thread.IsBackground = true;
                thread.Start();
            }
            catch (Exception ex) {
                string m = ex.Message;
                App.Helper.Log.WriteNode("线程异常："+ex.Message ,"error.txt");
            }
        }
        private Models.User GetOpenIdList(string next_openid)
        {
            try
            {
                Models.User user = new Models.User();
                var accessToken = WeiXinServer.AccessTokenServer.GetAccessToken("wxa0f624ad8cdb46c4", "951d20b853350b559ec625a6f3573714");
                //var accessToken = WeiXinServer.AccessTokenServer.GetAccessToken("wx7c4f6fbaeb32bbea", "19e9a3a801bb4ad8eedfa942e9a02007");

                System.Net.Http.HttpClient client = new System.Net.Http.HttpClient();
                string url = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=" + accessToken + "&next_openid=" + next_openid;
                client.BaseAddress = new Uri(url);
                var result = client.GetStringAsync(url).Result;
                var obj = Newtonsoft.Json.Linq.JObject.Parse(result);
                user.count = Convert.ToInt32(obj["count"]);
                user.total = Convert.ToInt32(obj["total"].ToString());
                user.next_openid = obj["next_openid"].ToString();
                var list = obj["data"]["openid"];
                List<string> openids = new List<string>();
                foreach (var m in list)
                {
                    openids.Add(m.ToString());
                }
                user.openids = openids;
                return user;
            }
            catch (Exception ex) {
                string msg = ex.Message;
                return new Models.User();
            }
        }
        
        private void MsgSendCallBack(IAsyncResult result)
        {
            //result 是“加法类.Add()方法”的返回值
            //AsyncResult 是IAsyncResult接口的一个实现类，空间：System.Runtime.Remoting.Messaging
            //AsyncDelegate 属性可以强制转换为用户定义的委托的实际类。
            //AddHandler handler = (AddHandler)((AsyncResult)result).AsyncDelegate;
            try
            {
                Action<int> handler = (Action<int>)((AsyncResult)result).AsyncDelegate;
                handler.EndInvoke(result);
                
                Models.CallBackParams param = (Models.CallBackParams)result.AsyncState;


                if (param.total - param.Quantity > 0)
                {
                    
                    Run();
                }
            }
            catch (Exception ex) {
                App.Helper.Log.WriteNode( "模版消息发布异常Endnvoked："+ex.Message, "openidlist.txt");
            }
        }
        public void Send(string openId)
        {
            

            string templateId = TemplateMsg.TempId;
            try
            {
                string url = TemplateMsg.Link;
                var items =JArray.Parse(TemplateMsg.Item);
                Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel m = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TempleteModel();
                var data = new
                {
                    first = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(TemplateMsg.First),
                    keyword1 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword1",openId)),
                    keyword2 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword2", openId)),
                    keyword3 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword3", openId)),
                    keyword4 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(GetValue(items, "keyword4", openId)),
                    
                    remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(TemplateMsg.Remark)
                };
                m.data = data;
                m.template_id = templateId; //TM00277
                m.topcolor = "#ff0000";
                m.touser = openId;
                m.url = url;
                var accesstoken = WeiXinServer.AccessTokenServer.GetAccessToken(App.Helper.WxBaseConfig.AppID, App.Helper.WxBaseConfig.AppSecret);
                var n= Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accesstoken, openId, templateId, url, data);
                
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                App.Helper.Log.WriteNode("模版发送失败："+msg,"tempmsg.txt");
            }
        }
        private string GetValue(JArray items, string key,string openId)
        {
            foreach (var item in items) {
                if (item["id"].ToString() == key) {
                    if (item["replace"] != null && item["replace"].ToString()!="")
                    {
                        return DynamicReplace(item["value"].ToString(), item["replace"].ToString(), openId);
                    }
                    return item["value"].ToString();
                }
            }
            return "";
        }
        private string DynamicReplace(string data,string replace,string openId)
        {
            if (!string.IsNullOrEmpty(replace) && data.Contains("{{}}")) {
                BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
                var model= bll.GetModel(openId);
                return data.Replace("{{}}", model.NickName);
            }
            return data;
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