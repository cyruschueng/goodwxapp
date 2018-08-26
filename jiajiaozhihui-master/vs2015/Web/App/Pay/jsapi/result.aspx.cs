using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin.WxApi.WxPay;

namespace SfSoft.web.wxpay.jsapi
{
    public partial class result : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ResultNotify resultNotify = new ResultNotify(this);
            resultNotify.NotifyEvent += new EventHandler<NotifyEventArgs>(Update);
            resultNotify.ProcessNotify();
        }
        private void Update(object src, NotifyEventArgs args)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            string tradeno = args.Data.GetValue("out_trade_no").ToString();
            ShenerWeiXin.WXHelper.WriteNode(tradeno, "testpay.txt");
            Model.WX_PublicOrder model = bll.GetModelByTradeno(tradeno);
            if (model != null)
            {
                model.SendDate = DateTime.Now;
                model.IsPay = 1;
                bll.Update(model);
            }
        }
    }
}
