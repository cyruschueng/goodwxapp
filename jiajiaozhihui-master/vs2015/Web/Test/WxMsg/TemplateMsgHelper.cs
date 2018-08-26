using Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Test.WxMsg
{
    public class TemplateMsgHelper
    {
        
        /// <summary>
        /// 订单消息提醒
        /// </summary>
        public static SendTemplateMessageResult Sendci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U(string accessToken,string openId,Model.ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U item,string url="")
        {
            try
            {
                var msg = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accessToken,
                    openId,
                    "ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U",
                    url,
                    new
                    {
                        first = new TemplateDataItem(item.first),
                        keyword1 = new TemplateDataItem(item.keyword1),
                        keyword2 = new TemplateDataItem(item.keyword2),
                        keyword3 = new TemplateDataItem(item.keyword3),
                        remark = new TemplateDataItem(item.remark)
                    }
                );
                return msg;
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败", ex);
                return null;
            }
        }
        /// <summary>
        /// 异常订单提醒
        /// </summary>
        public static SendTemplateMessageResult SendfKWQ1YcCaAfXFpVOgJqJIJtCKcp20HKKnaxsv6poVO0(string accessToken,string openId,Model.fKWQ1YcCaAfXFpVOgJqJIJtCKcp20HKKnaxsv6poVO0 item,string url="")
        {
            try
            {
                var msg = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accessToken,
                    openId,
                    "fKWQ1YcCaAfXFpVOgJqJIJtCKcp20HKKnaxsv6poVO0",
                    url,
                    new
                    {
                        first = new TemplateDataItem(item.first),
                        keyword1 = new TemplateDataItem(item.keyword1),
                        keyword2 = new TemplateDataItem(item.keyword2),
                        keyword3 = new TemplateDataItem(item.keyword3),
                        keyword4 = new TemplateDataItem(item.keyword4),
                        keyword5 = new TemplateDataItem(item.keyword5),
                        remark = new TemplateDataItem(item.remark)
                    }
                );
                return msg;
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败", ex);
                return null;
            }
        }
        /// <summary>
        /// 订单发货提醒 
        /// </summary>
        public static SendTemplateMessageResult SendcPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco(string accessToken, string openId,Model.cPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco item,string url="")
        {
            try
            {
                var msg = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(accessToken,
                    openId,
                    "cPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco",
                    url,
                    new
                    {
                        first = new TemplateDataItem(item.first),
                        keyword1 = new TemplateDataItem(item.keyword1),
                        keyword2 = new TemplateDataItem(item.keyword2),
                        keyword3 = new TemplateDataItem(item.keyword3),
                        remark = new TemplateDataItem(item.remark)
                    }
                );
                return msg;
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败", ex);
                return null;
            }
        }
    }
}