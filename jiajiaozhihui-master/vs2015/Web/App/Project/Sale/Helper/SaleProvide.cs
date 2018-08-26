using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Sale.Helper
{
    public class SaleProvide
    {
        public static Models.ProductInfo GetProductInfo(int productId)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            var model= bll.GetModel(productId);
            if (model != null)
            {
                return new Models.ProductInfo
                {
                    DescInfo = model.Desc,
                    ImgUrl = model.ImgURL,
                    IntroInfo = model.InfoDesc,
                    MarketPrice = model.MarketPrice ?? 0,
                    Number = model.Number ?? 0,
                    Price = model.PublicPrice ?? 0,
                    ProductId = model.ID,
                    ProductName = model.GoodName,
                    ProductType = (model.GoodsType ?? 0).ToString()
                };
            }
            else {
                return new Models.ProductInfo();
            }
        }
        public static void CreateOrder()
        {
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            
        }
    }
}