using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Entities.Request;
using Senparc.Weixin.MP.MessageHandlers;
using SfSoft.Common;
using System.Collections.Generic;
using ShenerWeiXin.User;

namespace ShenerWeiXin
{
    /// <summary>
    /// 自定义MessageHandler
    /// 把MessageHandler作为基类，重写对应请求的处理方法
    /// </summary>
    public partial class CustomMessageHandler : MessageHandler<CustomMessageContext>
    {
        /*
         * 重要提示：v1.5起，MessageHandler提供了一个DefaultResponseMessage的抽象方法，
         * DefaultResponseMessage必须在子类中重写，用于返回没有处理过的消息类型（也可以用于默认消息，如帮助信息等）；
         * 其中所有原OnXX的抽象方法已经都改为虚方法，可以不必每个都重写。若不重写，默认返回DefaultResponseMessage方法中的结果。
         */

        private string appId = WebConfigurationManager.AppSettings["AppID"];
        private string appSecret = WebConfigurationManager.AppSettings["AppSecret"];

        public CustomMessageHandler(Stream inputStream, PostModel postModel, int maxRecordCount = 0)
            : base(inputStream, postModel, maxRecordCount)
        {
            //这里设置仅用于测试，实际开发可以在外部更全局的地方设置，
            //比如MessageHandler<MessageContext>.GlobalWeixinContext.ExpireMinutes = 3。
            WeixinContext.ExpireMinutes = 3;
            if (!string.IsNullOrEmpty(postModel.AppId))
            {
                appId = postModel.AppId;//通过第三方开放平台发送过来的请求
            }
        }

        public override void OnExecuting()
        {
            //测试MessageContext.StorageData
            if (CurrentMessageContext.StorageData == null)
            {
                CurrentMessageContext.StorageData = 0;
            }
            base.OnExecuting();
        }

        public override void OnExecuted()
        {
            base.OnExecuted();
            CurrentMessageContext.StorageData = ((int)CurrentMessageContext.StorageData) + 1;
        }

        /// <summary>
        /// 处理文字请求
        /// </summary>
        /// <returns></returns>
        public override IResponseMessageBase OnTextRequest(RequestMessageText requestMessage)
        {
            var responseMessage = base.CreateResponseMessage<ResponseMessageText>();

            if (requestMessage.Content == null)
            {

            }
            else
            {
                ShenerWeiXin.Common.Message replyMessage = new ShenerWeiXin.Common.Message("jiajiaozh");

                //这个是用户回复时先查找标签Tag
                var message = replyMessage.Messages.Where<ShenerWeiXin.Message>(m => m.Tags.ToLower().FuzzySearch(requestMessage.Content.ToLower()));
                
                //如果标签没有就查找关键字
                if (message.Count() == 0)
                {
                    var message1 = replyMessage.Messages.Where<ShenerWeiXin.Message>(m => m.KeyWord.ToLower() == requestMessage.Content.ToLower());
                    if (message1.Count() == 0)
                    {
                        //关键字没有查找到
                        if (WXConfig.Kf == true)
                        {
                            return Kf(requestMessage.Content);
                        }
                        else
                        {
                            responseMessage.Content = ShenerWeiXin.Common.Message.PassivityAttention;
                            return responseMessage;
                        }
                    }
                    else
                    {
                        
                        //关键字查找到
                        Message msg = message1.First();
                        if (msg.MsgType.ToLower() == "text")
                        {
                            return ReturnMessageText(msg);
                        }
                        else if (msg.MsgType.ToLower() == "news")
                        {
                            return ReturnMessageNews(message1);
                        }
                    }
                }
                else if (message.Count() == 1)
                {
                    //在标签查找到时且只有1条时，直接发送;
                    Message msg = message.First();
                    if (msg.MsgType.ToLower() == "text")
                    {
                        return ReturnMessageText(msg);
                    }
                    else if (msg.MsgType.ToLower() == "news")
                    {
                        return ReturnMessageNews(message);
                    }
                }
                else if (message.Count() > 1)
                {
                    //在标签查找到时且多条时，回复继续输入定位;
                    responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                    string context = "";
                    string ext = "";
                    context += "你查找的【" + requestMessage.Content + "】共有" + message.Count() + "条";
                    context += "\n\n";
                    foreach (var m in message)
                    {
                        if (ext == "")
                        {
                            ext = m.KeyWord;
                        }
                        context += "回复 “" + m.KeyWord + "“ " + m.Title + "\n";
                    }
                    context += "\n\n";
                    //context += "请回复如：" + ext + " 查看内容";
                    responseMessage.Content = HttpContext.Current.Server.HtmlDecode(HttpContext.Current.Server.HtmlDecode(context));
                    return responseMessage;
                }
                return null;
            }
            return responseMessage;
        }

        /// <summary>
        /// 处理位置请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnLocationRequest(RequestMessageLocation requestMessage)
        {
            if (WXConfig.Kf == true)
            {
                return Kf();
            }
            else {
                var locationService = new LocationService();
                var responseMessage = locationService.GetResponseMessage(requestMessage as RequestMessageLocation);
                return responseMessage;
            }
        }

        public override IResponseMessageBase OnShortVideoRequest(RequestMessageShortVideo requestMessage)
        {
            if (WXConfig.Kf == true)
            {
                return Kf();
            }
            else {
                var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
                return responseMessage;
            }
        }

        /// <summary>
        /// 处理图片请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnImageRequest(RequestMessageImage requestMessage)
        {
            if (WXConfig.Kf == true)
            {
                return Kf();
            }
            else {
                var responseMessage = CreateResponseMessage<ResponseMessageText>();
                return responseMessage;
            }
        }

        /// <summary>
        /// 处理语音请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnVoiceRequest(RequestMessageVoice requestMessage)
        {
            var responseMessage = CreateResponseMessage<ResponseMessageText>();
            return responseMessage;
        }
        /// <summary>
        /// 处理视频请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnVideoRequest(RequestMessageVideo requestMessage)
        {
            if (WXConfig.Kf == true)
            {
                return Kf();
            }
            else {
                var responseMessage = CreateResponseMessage<ResponseMessageText>();
                return responseMessage;
            }
        }

        /// <summary>
        /// 处理链接消息请求
        /// </summary>
        /// <param name="requestMessage"></param>
        /// <returns></returns>
        public override IResponseMessageBase OnLinkRequest(RequestMessageLink requestMessage)
        {
            if (WXConfig.Kf == true)
            {
                return Kf();
            }
            else {
                var responseMessage = CreateResponseMessage<ResponseMessageText>();
                return responseMessage;
            }
            
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
             * 
             * 
             *var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
             *responseMessage.Content = "这条消息来自DefaultResponseMessage。";
             *return responseMessage;
             * 
            */
            var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
            return responseMessage;
        }
        public override IResponseMessageBase OnEvent_Kf_Close_SessionRequest(RequestMessageEvent_Kf_Close_Session requestMessage)
        {
            return base.OnEvent_Kf_Close_SessionRequest(requestMessage);
        }
        public ResponseMessageText ReturnMessageText(Message msg)
        {
            var responseMessage = this.CreateResponseMessage<ResponseMessageText>();
            string context  = msg.Content;
            responseMessage.Content = HttpContext.Current.Server.HtmlDecode(HttpContext.Current.Server.HtmlDecode(context));
            return responseMessage;
        }
        public ResponseMessageNews ReturnMessageNews(IEnumerable<Message> message)
        {
            var responseMessage = this.CreateResponseMessage<ResponseMessageNews>();
            foreach (var m in message)
            {
                string url = "";
                //如果当前页面要认证1）如果在家园卡有数我们就直接取家园卡数，如果没有我就用接口获取
                if (m.AuthUrl != "" && m.AuthUrl.StartsWith("https://"))
                {
                    Follower follower = new Follower();
                    if (follower.IsExist(responseMessage.ToUserName) && m.IsReadWeixinService == 0)
                    {
                        url = m.Url;
                    }
                    else
                    {
                        url = m.AuthUrl;
                    }
                    //脑力达人
                    if (IsExistUser(responseMessage.ToUserName))
                    {
                        url = m.Url;
                    }
                    else
                    {
                        url = m.AuthUrl;
                    }
                }
                else
                {
                    url = m.Url;
                }
                url = url.Replace("{appid}", WXConfig.AgentAppID);
                url = url.Replace("{authurl}", WXConfig.AuthURL);
                url = url.Replace("{openid}", responseMessage.ToUserName);
                url = url.Replace("{", "%7b");
                url = url.Replace("}", "%7d");

                responseMessage.Articles.Add(new Article()
                {
                    Title = m.Title,
                    Description = m.Description,
                    PicUrl = m.PicUrl,
                    Url = url
                });
            }
            return responseMessage;
        }

        private bool IsExistUser(string openid)
        {
            SfSoft.BLL.WX_TestQuestion_Player bll = new SfSoft.BLL.WX_TestQuestion_Player();
            SfSoft.Model.WX_TestQuestion_Player model = bll.GetModeByOpenID(openid);
            if (model != null)
            {
                return true;
            }
            return false;
        }
        private IResponseMessageBase Kf(string context="")
        {
            var kfResponseMessage = base.CreateResponseMessage<ResponseMessageTransfer_Customer_Service>();
            int kfcontent = 0;
            if (context != "")
            {
                if (int.TryParse(context, out kfcontent))
                {
                    kfResponseMessage.TransInfo.Add(new CustomerServiceAccount() { KfAccount = "Yxieyan07" });
                    return kfResponseMessage;
                }
                else
                {
                    return kfResponseMessage;
                }
            }
            else {
                return kfResponseMessage;
            }
        }
    }
}