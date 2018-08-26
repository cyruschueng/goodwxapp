using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WxPayAPI
{
    public partial class NotityNotice : System.Web.UI.Page
    {
        /// <summary>
        /// 异步接收微信支付结果通知的回调地址，
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                ResultNotify resultNotify = new ResultNotify(this);
                var result = resultNotify.ProcessNotify();
                if (result.GetValue("return_code").ToString() == "SUCCESS")
                {
                    var list = result.GetValue("return_list").ToString();
                    var model = Newtonsoft.Json.Linq.JObject.Parse(list);
                    if (model["attach"].ToString() == ((int)WxPayProjectEnum.父母特训营).ToString())
                    {
                        FuMuTeiXunYing(model);
                    }
                }
                else
                {

                }
            }
        }
        /// <summary>
        /// 父母特训营
        /// </summary>
        /// <param name="model"></param>
        private void FuMuTeiXunYing(Newtonsoft.Json.Linq.JObject entity)
        {

            SfSoft.BLL.WX_Course_Order bll = new SfSoft.BLL.WX_Course_Order();
            var order=   bll.GetModelByTradeno(entity["out_trade_no"].ToString());
            if (order == null) {
                var model = new SfSoft.Model.WX_Course_Order
                {
                    BuyNumber = 1,
                    CourseId = 10,
                    IsAct = 1,
                    IsDel = 0,
                    IsPay = 1,
                    Name = "",
                    OpenId = entity["openid"].ToString(),
                    OrderDateTime = DateTime.Now,
                    OrderType = 2,
                    Price = Convert.ToDecimal(entity["total_fee"]) / 100,
                    Referrer = "",
                    Remark = "扫描支付",
                    SalesPlatform = 0,
                    Telephone = "",
                    Tradeno = entity["out_trade_no"].ToString()
                };
                bll.Add(model);
            }
        }
    }
}
