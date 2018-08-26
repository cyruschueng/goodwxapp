using SfSoft.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.Test
{
    public partial class log : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ShenerWeiXin.Common.Message replyMessage = new ShenerWeiXin.Common.Message("jiajiaozh");
            var list = replyMessage.Messages.Where(x => x.KeyWord == "subscribe").OrderBy(x => x.Order).Take(8);
            //var responseMessage = ResponseMessageBase.CreateFromRequestMessage<ResponseMessageNews>(requestMessage);
            //foreach (var m in list)
            //{
            //    responseMessage.Articles.Add(new Article
            //    {
            //        Description = m.Description,
            //        PicUrl = m.PicUrl,
            //        Title = m.Title,
            //        Url = m.Url
            //    });
            //}

        }
    }
}
