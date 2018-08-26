using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Entities.Menu;
using SfSoft.web.common;
using ShenerWeiXin;
using Senparc.Weixin.MP.Entities.Request;


namespace Shener.WeiXin.Web
{
    /// <summary>
    /// weixin 的摘要说明
    /// </summary>
    public class weixin : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string signature = context.Request["signature"];
            string timestamp = context.Request["timestamp"];
            string nonce = context.Request["nonce"];
            string echostr = context.Request["echostr"];
            if (context.Request.HttpMethod.ToLower() == "get")
            {
                 //get method - 仅在微信后台填写URL验证时触发
                if (CheckSignature.Check(signature, timestamp, nonce, WXConfig.Token))
                {
                    WriteContent(echostr, context); //返回随机字符串则表示验证通过
                }
                else
                {
                    WriteContent("failed:" + signature + "," + CheckSignature.GetSignature(timestamp, nonce, WXConfig.Token) + "。" +
                                "如果你在浏览器中看到这句话，说明此地址可以被作为微信公众账号后台的Url，请注意保持Token一致。", context);
                }
                context.Response.End();
            }
            else {
                //post method - 当有用户想公众账号发送消息时触发
                if (!CheckSignature.Check(signature, timestamp, nonce, WXConfig.Token))
                {
                    WriteContent("参数错误！", context);
                    return;
                }
                //post method - 当有用户想公众账号发送消息时触发
                var postModel = new PostModel()
                {
                    Signature = context.Request.QueryString["signature"],
                    Msg_Signature = context.Request.QueryString["msg_signature"],
                    Timestamp = context.Request.QueryString["timestamp"],
                    Nonce = context.Request.QueryString["nonce"],
                    //以下保密信息不会（不应该）在网络上传播，请注意
                    Token = WXConfig.Token,
                    EncodingAESKey = "gThoOMpXQy6dx4uKsCNIWhtyBE3u5mCSwVOXBApDTCp",//根据自己后台的设置保持一致
                    AppId =WXConfig.appId //根据自己后台的设置保持一致
                };

                //v4.2.2之后的版本，可以设置每个人上下文消息储存的最大数量，防止内存占用过多，如果该参数小于等于0，则不限制
                var maxRecordCount = 10;
                //自定义MessageHandler，对微信请求的详细判断操作都在这里面。
                var messageHandler = new CustomMessageHandler(context.Request.InputStream, postModel, maxRecordCount);
                try
                {
                    //执行微信处理过程
                    messageHandler.Execute();
                    WriteContent(messageHandler.ResponseDocument.ToString(), context);
                    return;
                }
                catch (Exception ex)
                {

                }
                finally {
                    context.Response.End();
                }
            }
        }
        private void WriteContent(string str, HttpContext context)
        {
            context.Response.Output.Write(str);
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