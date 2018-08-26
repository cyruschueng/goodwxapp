using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using Senparc.Weixin.Context;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.MessageHandlers;
using System.IO;
using Senparc.Weixin.MP.AdvancedAPIs;
using SfSoft.web.common;
using Senparc.Weixin.MP.CommonAPIs;

namespace Shener.WeiXin.Web.Common
{
    public partial class CustomMessageHandler :MessageHandler<CustomMessageContext>
    {
        public CustomMessageHandler(Stream inputStream, int maxRecordCount = 0):base(inputStream, maxRecordCount)
        {
            //这里设置仅用于测试，实际开发可以在外部更全局的地方设置，
            //比如MessageHandler<MessageContext>.GlobalWeixinContext.ExpireMinutes = 3。
            WeixinContext.ExpireMinutes = 3;
        }
        /// <summary>
        /// 处理文字请求
        /// </summary>
        /// <returns></returns>
        public override IResponseMessageBase OnTextRequest(RequestMessageText requestMessage)
        {
            List<ShenerWeiXin.Message> messages = ShenerWeiXin.Common.Message.Messages;

            if (messages != null) {
                var message = messages.Where<ShenerWeiXin.Message>(m => m.KeyWord.ToLower() == requestMessage.Content.ToLower());
                if (message.Count() == 0)
                {
                    var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                    responseMessage.Content = ShenerWeiXin.Common.Message.PassivityAttention;
                    return responseMessage;
                }
                else {
                    string msgtype = messages.First<ShenerWeiXin.Message>(n => n.KeyWord.ToLower() == requestMessage.Content.ToLower()).MsgType.ToLower();
                    if (msgtype == "text")
                    {
                        var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                        foreach (var m in message)
                        {
                            responseMessage.Content = HttpContext.Current.Server.HtmlDecode(HttpContext.Current.Server.HtmlDecode(m.Content));
                            return responseMessage;
                        }
                    }
                    else if (msgtype == "news")
                    {
                        var responseMessage = this.CreateResponseMessage<ResponseMessageNews>();
                        foreach (var m in message)
                        {
                            responseMessage.Articles.Add(new Article()
                            {
                                Title = m.Title,
                                Description = m.Description,
                                PicUrl = m.PicUrl,
                                Url = m.Url
                            });
                        }
                        return responseMessage;
                    }
                }
            }
            return null;
//            
        }
        /// <summary>
        /// 处理图片请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnImageRequest(RequestMessageImage requestMessage)
        {
            var responseMessage = CreateResponseMessage<ResponseMessageNews>();
            responseMessage.Articles.Add(new Article()
            {
                Title = "您刚才发送了图片信息",
                Description = "家庭教育对于一个人的一生会产生非常深远的影响。为了帮助家长们找到正确的教育方法，提升家庭教育的质量，全国促进传统文化发展工程德育教育研究开发工作委员会发起了“立德树人 家校共育”工程。",
                PicUrl ="/cgi-bin/getimgdata?&token=214311968&lang=zh_CN&mode=small&source=file&msgid=201500454&fileId=201991390",
                Url = "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=201500454&idx=1&sn=b80fbf8d1f7ea8c9713349a82bdb18fe#rd"
            });
            return responseMessage;
        }
        /// <summary>
        /// 处理语音请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnVoiceRequest(RequestMessageVoice requestMessage)
        {
            var responseMessage = CreateResponseMessage<ResponseMessageMusic>();
            responseMessage.Music.MusicUrl = "http://www.ctcppdy.org/mm.mp3";
            responseMessage.Music.Title = "这里是一条音乐消息";
            responseMessage.Music.Description = "来自Jeffrey Su的美妙歌声~~";
            responseMessage.Music.ThumbMediaId = "mediaid";
            return responseMessage;
        }
        /// <summary>
        /// 处理视频请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnVideoRequest(RequestMessageVideo requestMessage)
        {
            var responseMessage = CreateResponseMessage<ResponseMessageText>();
            responseMessage.Content = "您发送了一条视频信息，ID：" + requestMessage.MediaId;
            return responseMessage;
        }
        /// <summary>
        /// 处理链接消息请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnLinkRequest(RequestMessageLink requestMessage)
        {
            var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageText>(requestMessage);
            responseMessage.Content = string.Format(@"您发送了一条连接信息：
                Title：{0}
                Description:{1}
                Url:{2}", requestMessage.Title, requestMessage.Description, requestMessage.Url);
            return responseMessage;
        }
        /// <summary>
        /// 处理事件请求（这个方法一般不用重写，这里仅作为示例出现。除非需要在判断具体Event类型以外对Event信息进行统一操作
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnEventRequest(IRequestMessageEventBase requestMessage)
        {
            var eventResponseMessage = base.OnEventRequest(requestMessage);//对于Event下属分类的重写方法，见：CustomerMessageHandler_Events.cs
            //TODO: 对Event信息进行统一操作
            return eventResponseMessage;
        }
        public override IResponseMessageBase DefaultResponseMessage(IRequestMessageBase requestMessage)
        {
            /* 所有没有被处理的消息会默认返回这里的结果，
             * 因此，如果想把整个微信请求委托出去（例如需要使用分布式或从其他服务器获取请求），
             * 只需要在这里统一发出委托请求，如：
             * var responseMessage = MessageAgent.RequestResponseMessage(agentUrl, agentToken, RequestDocument.ToString());
             * return responseMessage;
             */
            

//            responseMessage.Content = @"亲，我是小慧，您的消息，我们已收到，我们将在24小时内给您回复。 您还可以回复以下数字了解更多信息。 
//回复“1” 关于家教智慧
//回复“2” 服务咨询电话
//回复“3” 家庭教育老师介绍";
            return null;
        }
    }
}