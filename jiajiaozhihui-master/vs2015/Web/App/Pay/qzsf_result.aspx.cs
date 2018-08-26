using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShenerWeiXin.WxApi.WxPay;

namespace SfSoft.web.wxpay.order1
{
    public partial class qzsf_result : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ResultNotify resultNotify = new ResultNotify(this);
            resultNotify.NotifyEvent += new EventHandler<NotifyEventArgs>(Update);
            resultNotify.ProcessNotify();
        }
        private void Update(object src, NotifyEventArgs args)
        {
            string tradeno = args.Data.GetValue("out_trade_no").ToString();
            string table = args.Data.GetValue("attach").ToString().ToLower();
            switch (table) { 
                case "course":
                    UpdateCourseOrder(tradeno);
                    break;
                default:
                    UpdatePublicOrder(tradeno);
                    break;
            }
        }
        private void UpdateCourseOrder(string tradeno)
        {
            BLL.WX_Course_Order bll = new BLL.WX_Course_Order();
            Model.WX_Course_Order model = bll.GetModelByTradeno(tradeno);
            if (model != null)
            {
                model.Tradeno = tradeno;
                model.IsPay = 1;
                bll.Update(model);

                BLL.WX_Course_Personal personal = new BLL.WX_Course_Personal();
                Model.WX_Course_Personal m = personal.GetModel(model.CourseId, model.OpenId);
                if (m == null) {
                    m.CourseId = model.CourseId;
                    m.OpenId = model.OpenId;
                    m.Tiem = 0;
                    personal.Add(m);
                }
            }
        }
        private void UpdatePublicOrder(string tradeno)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model = bll.GetModelByTradeno(tradeno);
            if (model != null)
            {
                model.Tradeno = tradeno;
                model.IsPay = 1;
                bll.Update(model);
            }
        }
    }
}
