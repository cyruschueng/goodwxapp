using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.wxrrd.Controller.Helper
{
    public class OrderProvide
    {
        public static List<Model.WX_PublicOrder>  GetMyOrder(string openId,int goodId)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            var list= bll.GetModelList("openId='" + openId + "' and GoodId="+goodId);
            return list;
        }
        public static int AddOrder(Models.OrderInfo order)
        {
            Model.WX_PublicOrder model = new Model.WX_PublicOrder()
            {
                Address = order.Province + order.City + order.District + order.Address,
                City = order.City,
                District = order.District,
                GoodID = order.GoodId,
                GoodsType = order.GoodsType,
                IsPay = 0,
                IsSend = 0,
                ActivityID = 0,
                Logistics = "",
                LogisticsSN = "",
                Name = order.Name,
                OddNumber = "",
                OpenID = order.OpenId,
                OrderDate = DateTime.Now,
                Payment = 0,
                Paymode = 0,
                PayNumber = 1,
                Post = "",
                Price = 0,
                Province = order.Province,
                Remark = "",
                SendDate = null,
                TelePhone = order.Telephone,
                Tradeno = "",
                Unit = ""
            };
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            return bll.Add(model);
        }
        public static bool ExistOrder(string openId, int goodsId)
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            var list= bll.GetModelList("OpenId='" + openId + "' and GoodId=" + goodsId);
            return list.Count > 0 ? true : false;

        }
    }
}