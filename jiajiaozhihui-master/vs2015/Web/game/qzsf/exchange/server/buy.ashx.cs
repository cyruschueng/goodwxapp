using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading;

namespace SfSoft.web.game.qzsf.exchange.server
{
    /// <summary>
    /// buy 的摘要说明
    /// </summary>
    public class buy : IHttpHandler,System.Web.SessionState.IRequiresSessionState
    {
        private string type = string.Empty;
        private int quantity = 0;
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            ExchangeOrder(context);
            context.Response.Write(Result);
        }
        /// <summary>
        /// 兑换产品Id
        /// </summary>
        private int ExchangeId { get; set; }
        public delegate void AsynccallbackHandle();
        
        private bool CheckStore(int store)
        {
            return store > 0 ? true : false;
        }
        private bool CheckAward(string openid)
        {
            int total = 0;
            BLL.WX_Doublenovember_Award awardBll = new BLL.WX_Doublenovember_Award();
            Model.WX_Doublenovember_Award awardModel = awardBll.GetModel(openid);
            switch (type)
            {
                case "钻石":
                    total = (awardModel.DiamondEarn ?? 0) - (awardModel.DiamondWasting ?? 0);
                    break;
                case "金币":
                    total = (awardModel.GoldEarn ?? 0) - (awardModel.GoldWasting ?? 0);
                    break;
                default:
                    total = 0;
                    break;
            }
            return ((total - quantity) >= 0 && total > 0) ? true : false;
        }
        private void ExchangeOrder(HttpContext context)
        {
            string openid = "";
            try
            {
                openid = context.Session["myopenid"].ToString();
            }
            catch (Exception ex) {
                
            }
            string id = context.Request["goodsid"];
            ExchangeId =int.Parse(id);
            BLL.WX_Product_Exchange bllExchange = new BLL.WX_Product_Exchange();
            Model.WX_Product_Exchange modelExchange = bllExchange.GetModel(Convert.ToInt32(id));
            int total = 0;
            int store = 0;
            if (modelExchange != null)
            {
                quantity = modelExchange.Quantity ?? 0;
                type = modelExchange.Type;
                store = modelExchange.Store ?? 0;
            }
            if (CheckStore(store) == false) {
                Result=Helper.ReturnJsonResult(EnumResultCode.库存不足);
                return;
            }
            if (CheckAward(openid) == false)
            {
                switch (type)
                {
                    case "钻石":
                        Result= Helper.ReturnJsonResult(EnumResultCode.订购失败钻石不足);
                        break;
                    case "金币":
                        Result= Helper.ReturnJsonResult(EnumResultCode.订购失败金币不足);
                        break;
                    default:
                        Result= Helper.ReturnJsonResult(EnumResultCode.订购失败);
                        break;
                }
                return;
            }
            string name = context.Request["name"];
            string phone = context.Request["phone"];
            string province = context.Request["province"];
            string city = context.Request["city"];
            string district = context.Request["district"];
            string address = context.Request["address"];
            string postcode = context.Request["postcode"];
            string goodsid = context.Request["goodsid"];

            
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            model.Address = address;
            model.City = city;
            model.District = district;
            model.GoodID =Convert.ToInt32(goodsid);
            model.GoodsType =(int)ShenerWeiXin.EnumExchangeOrderType.亲子书法兑换订单;
            model.Name = name;
            model.OpenID = openid;
            model.OrderDate = DateTime.Now;
            model.PayNumber = 1;
            model.Post = postcode;
            model.Price = Convert.ToDecimal(quantity);
            model.Province = province;
            model.TelePhone = phone;
            model.IsSend = 0;
            model.Unit = type;

            #region 初始化自定义 OrderEventArgs 参数
            OrderEventArgs args = new OrderEventArgs(model);
            #endregion

            #region 传递回调参数
            AsyncCallbackData data = new AsyncCallbackData();
            data.OpenId = openid;
            data.QuantityConsumed = Convert.ToInt32(quantity);
            data.Type = type;
            #endregion

            EventHandler<OrderEventArgs> eventHandler = new EventHandler<OrderEventArgs>(AddOrder);
            
            IAsyncResult result = eventHandler.BeginInvoke(this, args, new AsyncCallback(UpdateAward), data);
            if (result.IsCompleted == false) {
                Thread.Sleep(100);
            }
            eventHandler.EndInvoke(result);
        }
        /// <summary>
        /// 生成订单
        /// </summary>
        /// <param name="o"></param>
        /// <param name="e"></param>
        private void AddOrder(object o, OrderEventArgs e) 
        {
            
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            int index = bll.Add(e.OrderEntity);
            
            BLL.WX_Product_Exchange bllExchange = new BLL.WX_Product_Exchange();
            Model.WX_Product_Exchange modelExchange = bllExchange.GetModel(ExchangeId);
            modelExchange.Store -= 1;

            bllExchange.Update(modelExchange);

            Result = index > 0 ? Helper.ReturnJsonResult(EnumResultCode.订购成功) : Helper.ReturnJsonResult(EnumResultCode.订购失败);
        }
        /// <summary>
        /// 更新荣誉
        /// </summary>
        /// <param name="o"></param>
        /// <param name="e"></param>
        private void UpdateAward(IAsyncResult result)
        {
            BLL.WX_Doublenovember_Award bll = new BLL.WX_Doublenovember_Award();
            AsyncCallbackData data = result.AsyncState as AsyncCallbackData;
            Model.WX_Doublenovember_Award model = bll.GetModel(data.OpenId);
            try
            {
                switch (data.Type)
                {
                    case "钻石":
                        model.DiamondWasting = (model.DiamondWasting ?? 0) + data.QuantityConsumed;
                        break;
                    case "金币":
                        model.GoldWasting = (model.GoldWasting ?? 0) + data.QuantityConsumed;
                        break;
                    default:
                        break;
                }
                bll.Update(model);
                UpdateDetailAward(data);
            }
            catch (Exception ex) { 
                
            }
        }
        /// <summary>
        /// 写入荣誉明细
        /// </summary>
        /// <param name="data"></param>
        private void UpdateDetailAward(AsyncCallbackData data)
        {
            try
            {
                Model.WX_Doublenovember_Award_Detail model = new Model.WX_Doublenovember_Award_Detail();
                model.Award = -data.QuantityConsumed;
                switch (data.Type)
                {
                    case "钻石":
                        model.AwardType = (int)EnumAwardType.钻石;
                        model.Origin = (int)EnumDiamond.钻石兑换物品;
                        model.Remark = EnumDiamond.钻石兑换物品.ToString();
                        break;
                    case "金币":
                        model.AwardType = (int)EnumAwardType.金币;
                        model.Origin = (int)EnumGold.金币兑换物品;
                        model.Remark = EnumGold.金币兑换物品.ToString();
                        break;
                }
                model.CreateDate = DateTime.Now;
                model.OpenId = data.OpenId;
                BLL.WX_Doublenovember_Award_Detail bll = new BLL.WX_Doublenovember_Award_Detail();
                bll.Add(model);
            }
            catch (Exception ex) { 
                
            }
        }
        private string Result
        {
            get;
            set;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}