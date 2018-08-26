using Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.TemplateMessage
{
    /// <summary>
    /// 订单消息提醒
    /// </summary>
    public class ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U
    {
        string _accessToken = "";
        string _url = "";
        public ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U(string accessToken,string url="")
        {
            _accessToken = accessToken;
            _url = url;
        }
        public SendTemplateMessageResult Send(string openId,string first,string keyword1, string keyword2, string keyword3, string remark)
        {
            try
            {
                var msg = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(this._accessToken,
                    openId,
                    "ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U",
                    _url,
                    new
                    {
                        first = new TemplateDataItem(first),
                        keyword1 = new TemplateDataItem(keyword1),
                        keyword2 = new TemplateDataItem(keyword2),
                        keyword3 = new TemplateDataItem(keyword3),
                        remark = new TemplateDataItem(remark)
                    }
                );
                return msg;
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败("+openId+")", ex);
                return null;
            }
        }
    }
}