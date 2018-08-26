using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.gardenia.template
{
    /// <summary>
    /// 会员加入提醒模板
    /// 
    /// 欢迎成为我们的会员
    /// 会员ID：100001
    /// 时间：2015-8-31
    /// 感谢您的到来
    /// 
    /// </summary>
    public class zh4tWfqeAC2_YrKkAfQ_BYJT7wyUoVI72Tj2nOgGnAw : Senparc.Weixin.Entities.TemplateMessage.TemplateMessageBase
    {
        /*
         {{first.DATA}}
        会员ID：{{keyword1.DATA}}
        时间：{{keyword2.DATA}}
        {{remark.DATA}}
         */

        public Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem first { get; set; }
        public Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem keyword1 { get; set; }
        public Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem keyword2 { get; set; }
        public Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem remark { get; set; }

        public zh4tWfqeAC2_YrKkAfQ_BYJT7wyUoVI72Tj2nOgGnAw( string _first,string memberId,string _remark, string url = null,string templateId= "zh4tWfqeAC2-YrKkAfQ_BYJT7wyUoVI72Tj2nOgGnAw") : base(templateId, url, "入学通知")
        {
            first = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(_first);
            keyword1 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(memberId);
            keyword2 = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(string.Format("{0:yyyy-MM-dd}", DateTime.Now));
            remark = new Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage.TemplateDataItem(_remark);
        }
    }
}