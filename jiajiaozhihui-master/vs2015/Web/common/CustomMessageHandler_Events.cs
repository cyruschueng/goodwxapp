using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Diagnostics;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Agent;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.AdvancedAPIs;
using SfSoft.web.common;

namespace Shener.WeiXin.Web.Common
{
    /// <summary>
    /// 自定义MessageHandler
    /// </summary>
    public partial class CustomMessageHandler
    {
        private readonly string agentUrl="";
        private readonly string agentToken = "";
        private string GetWelcomeInfo()
        {
            string welecom = ShenerWeiXin.Common.Message.AutoAttention;
            return string.Format("{0}", welecom);
        }
        public override IResponseMessageBase OnTextOrEventRequest(RequestMessageText requestMessage)
        {
            // 预处理文字或事件类型请求。
            // 这个请求是一个比较特殊的请求，通常用于统一处理来自文字或菜单按钮的同一个执行逻辑，
            // 会在执行OnTextRequest或OnEventRequest之前触发，具有以下一些特征：
            // 1、如果返回null，则继续执行OnTextRequest或OnEventRequest
            // 2、如果返回不为null，则终止执行OnTextRequest或OnEventRequest，返回最终ResponseMessage
            // 3、如果是事件，则会将RequestMessageEvent自动转为RequestMessageText类型，其中RequestMessageText.Content就是RequestMessageEvent.EventKey
            if (requestMessage.Content == "OneClick")
            {
                var strongResponseMessage = CreateResponseMessage<ResponseMessageText>();
                strongResponseMessage.Content = "您点击了底部按钮。这里做了一个——\r\n换行";
                return strongResponseMessage;

            }
            return null;//返回null，则继续执行OnTextRequest或OnEventRequest
        }
        public override IResponseMessageBase OnEvent_ClickRequest(RequestMessageEvent_Click requestMessage)
        {
            IResponseMessageBase reponseMessage = null;
            //菜单点击，需要跟创建菜单时的Key匹配
            switch (requestMessage.EventKey)
            {
                case "goods":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageNews>();
                        reponseMessage = strongResponseMessage;
                        WXHelper helper = new WXHelper();
                        bool IsExistOpenID = helper.IsExistOauthDataBase(reponseMessage.ToUserName);
                        string url = "";
                        if (IsExistOpenID == true)
                        {
                            url = WXConfig.AuthURL+"publicgoodslist.aspx?id=" + reponseMessage.ToUserName;
                        }
                        else {
                            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+WXConfig.AgentAppID+"&redirect_uri="+WXConfig.AuthURL+"publicgoodslist.aspx?userid=" + reponseMessage.ToUserName + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                        }
                        strongResponseMessage.Articles.Add(new Article()
                        {
                            Title = "【公益品】",
                            Description = "家教智慧和一些公益机构合作，定期开展公益赞助活动，赞助物品由公益机构提供，给家 教智慧用户提供最实惠、最实用的教育用品。",
                            PicUrl = WXConfig.AuthURL+"Images/goods.jpg",
                            Url = url
                        });
                    }
                    break;
                case "hodecard":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageNews>();
                        reponseMessage = strongResponseMessage;
                        WXHelper helper = new WXHelper();
                        bool IsExistOpenID = helper.IsExistOauthDataBase(reponseMessage.ToUserName);
                        string url = "";
                        if (IsExistOpenID == true)
                        {
                            url = WXConfig.AuthURL+"homecardlist.aspx?id=" + reponseMessage.ToUserName;
                        }
                        else
                        {
                            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+WXConfig.AgentAppID+"&redirect_uri="+WXConfig.AuthURL+"homecardlist.aspx?userid=" + reponseMessage.ToUserName + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                        }
                        strongResponseMessage.Articles.Add(new Article()
                        {
                            Title = "家园卡",
                            Description = "点击这里可以完善个人资料，查看积分、订单信息、优惠券以及课程报名信息、我的消息",
                            PicUrl = WXConfig.AuthURL+"Images/card.jpg",
                            Url = url
                        });
                    }
                    break;
                case "course":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageNews>();
                        reponseMessage = strongResponseMessage;
                        
                        WXHelper helper = new WXHelper();
                        bool IsExistOpenID = helper.IsExistOauthDataBase(reponseMessage.ToUserName);
                        string url = "";
                        if (IsExistOpenID == true)
                        {
                            url = WXConfig.AuthURL+"courseslist.aspx?id=" + reponseMessage.ToUserName;
                        }
                        else
                        {
                            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+WXConfig.AgentAppID+"&redirect_uri="+WXConfig.AuthURL+"courseslist.aspx?userid=" + reponseMessage.ToUserName + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                        }
                        strongResponseMessage.Articles.Add(new Article()
                        {
                            Title = "【慧•课堂】",
                            Description = "家教智慧会定期举办公益课程，邀请权威教育专家和知名国学讲师作客慧•课堂，给家教 智慧用户传授科学有智慧的家庭教育方法，普及国学经典知识。",
                            PicUrl = WXConfig.AuthURL+"Images/5.jpg",
                            Url = url
                        });
                    }
                    break;
                case "exchange":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageNews>();
                        reponseMessage = strongResponseMessage;

                        WXHelper helper = new WXHelper();
                        bool IsExistOpenID = helper.IsExistOauthDataBase(reponseMessage.ToUserName);
                        string url = "";
                        if (IsExistOpenID == true)
                        {
                            url = WXConfig.AuthURL + "exchangelist.aspx?id=" + reponseMessage.ToUserName;
                        }
                        else
                        {
                            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WXConfig.AgentAppID + "&redirect_uri=" + WXConfig.AuthURL + "exchangelist.aspx?userid=" + reponseMessage.ToUserName + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                        }
                        strongResponseMessage.Articles.Add(new Article()
                        {
                            Title = "【礼品兑换】",
                            Description = "赚积分，换大礼！参与“家教智慧”微信平台各项活动，都可以获得积分哦。积分多多，好礼多多，快来赢积分换大礼！",
                            PicUrl = WXConfig.AuthURL + "Images/exchange.jpg",
                            Url = url
                        });
                    }
                    break;
                case "singles":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageNews>();
                        reponseMessage = strongResponseMessage;

                        WXHelper helper = new WXHelper();
                        bool IsExistOpenID = helper.IsExistOauthDataBase(reponseMessage.ToUserName);
                        string url = "";
                        if (IsExistOpenID == true)
                        {
                            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WXConfig.AgentAppID + "&redirect_uri=" + WXConfig.AuthURL + "activity.aspx?userid=" + reponseMessage.ToUserName + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                        }
                        else
                        {
                            url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + WXConfig.AgentAppID + "&redirect_uri=" + WXConfig.AuthURL + "activity.aspx?userid=" + reponseMessage.ToUserName + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                        }
                        strongResponseMessage.Articles.Add(new Article()
                        {
                            Title = "【双十一活动】",
                            Description = "感恩大回馈！双十一来了，小慧又来给大家发福利啦！双十一活动期间（11月11日-14日），家教智慧将送出1080份精美礼品。推荐好友关注家教智慧就可参与活动，推荐的好友越多，越有机会获得价值1995元的神尔天才国学机！",
                            PicUrl = WXConfig.AuthURL + "Images/active.jpg",
                            Url = url
                        });
                    }
                    break;
                case "SubClickRoot_News":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageNews>();
                        reponseMessage = strongResponseMessage;
                        strongResponseMessage.Articles.Add(new Article()
                        {
                            Title = "您点击了子菜单图文按钮",
                            Description = "您点击了子菜单图文按钮，这是一条图文信息",
                            PicUrl = "http://weixin.senparc.com/Images/qrcode.jpg",
                            Url = "http://www.shenerjiaoyu.com/images/h_gxj.jpg"
                        });
                    }
                    break;
                case "SubClickRoot_Music":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageMusic>();
                        reponseMessage = strongResponseMessage;
                        strongResponseMessage.Music.MusicUrl = "http://weixin.senparc.com/Content/music1.mp3";
                    }
                    break;
                case "SubClickRoot_Image":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageImage>();
                        reponseMessage = strongResponseMessage;
                        strongResponseMessage.Image.MediaId = "Mj0WUTZeeG9yuBKhGP7iR5n1xUJO9IpTjGNC4buMuswfEOmk6QSIRb_i98do5nwo";
                    }
                    break;
                case "SubClickRoot_Agent"://代理消息
                    {
                        //获取返回的XML
                        DateTime dt1 = DateTime.Now;
                        reponseMessage = MessageAgent.RequestResponseMessage(this, agentUrl, agentToken, RequestDocument.ToString());
                        //上面的方法也可以使用扩展方法：this.RequestResponseMessage(this,agentUrl, agentToken, RequestDocument.ToString());

                        DateTime dt2 = DateTime.Now;

                        if (reponseMessage is ResponseMessageNews)
                        {
                            (reponseMessage as ResponseMessageNews)
                                .Articles[0]
                                .Description += string.Format("\r\n\r\n代理过程总耗时：{0}毫秒", (dt2 - dt1).Milliseconds);
                        }
                    }
                    break;
                case "Member"://托管代理会员信息
                    {
                        //原始方法为：MessageAgent.RequestXml(this,agentUrl, agentToken, RequestDocument.ToString());//获取返回的XML
                        reponseMessage = this.RequestResponseMessage(agentUrl, agentToken, RequestDocument.ToString());
                    }
                    break;
                case "OAuth"://OAuth授权测试
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageText>();
                        reponseMessage = strongResponseMessage;
                        strongResponseMessage.Content = "OAuth授权测试";
                    }
                    break;
                case "Description":
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageText>();
                        strongResponseMessage.Content = GetWelcomeInfo();
                        reponseMessage = strongResponseMessage;
                    }
                    break;
                default:
                    {
                        var strongResponseMessage = CreateResponseMessage<ResponseMessageText>();
                        strongResponseMessage.Content = "您点击了按钮，EventKey：" + requestMessage.EventKey;
                        reponseMessage = strongResponseMessage;
                    }
                    break;
            }
            return reponseMessage;
        }

        public override IResponseMessageBase OnEvent_EnterRequest(RequestMessageEvent_Enter requestMessage)
        {
            var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageText>(requestMessage);
            responseMessage.Content = "您刚才发送了ENTER事件请求。";
            return responseMessage;
        }

        public override IResponseMessageBase OnEvent_LocationRequest(RequestMessageEvent_Location requestMessage)
        {
            //这里是微信客户端（通过微信服务器）自动发送过来的位置信息
            var responseMessage = CreateResponseMessage<ResponseMessageText>();
            responseMessage.Content = "这里写什么都无所谓，比如：上帝爱你！";
            return responseMessage;//这里也可以返回null（需要注意写日志时候null的问题）
        }

        public override IResponseMessageBase OnEvent_ScanRequest(RequestMessageEvent_Scan requestMessage)
        {
            //通过扫描关注
            
            var responseMessage = CreateResponseMessage<ResponseMessageText>();
            responseMessage.Content = "通过扫描关注。";
            return responseMessage;
        }

        public override IResponseMessageBase OnEvent_ViewRequest(RequestMessageEvent_View requestMessage)
        {
            //说明：这条消息只作为接收，下面的responseMessage到达不了客户端，类似OnEvent_UnsubscribeRequest
            var responseMessage = CreateResponseMessage<ResponseMessageText>();
            responseMessage.Content = "您点击了view按钮，将打开网页：" + requestMessage.EventKey;
            return responseMessage;
        }

        public override IResponseMessageBase OnEvent_MassSendJobFinishRequest(RequestMessageEvent_MassSendJobFinish requestMessage)
        {
            var responseMessage = CreateResponseMessage<ResponseMessageText>();
            responseMessage.Content = "接收到了群发完成的信息。";
            return responseMessage;
        }


        /// <summary>
        /// 订阅（关注）事件
        /// </summary>
        /// <returns></returns>
        public override IResponseMessageBase OnEvent_SubscribeRequest(RequestMessageEvent_Subscribe requestMessage)
        {

            var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageText>(requestMessage);
            responseMessage.Content = GetWelcomeInfo();

            return responseMessage;
        }
        /// <summary>
        /// 退订
        /// 实际上用户无法收到非订阅账号的消息，所以这里可以随便写。
        /// unsubscribe事件的意义在于及时删除网站应用中已经记录的OpenID绑定，消除冗余数据。并且关注用户流失的情况。
        /// </summary>
        /// <returns></returns>
        public override IResponseMessageBase OnEvent_UnsubscribeRequest(RequestMessageEvent_Unsubscribe requestMessage)
        {
            var responseMessage = base.CreateResponseMessage<ResponseMessageText>();
            responseMessage.Content = "有空再来";
            return responseMessage;
        }
    }
}