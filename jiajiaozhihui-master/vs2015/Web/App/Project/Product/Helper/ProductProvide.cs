using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Product.Helper
{
    public class ProductProvide
    {
        private Model.WX_PublicGood _product;
        private int _productId;
        public ProductProvide(int productId)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            _product = bll.GetModel(productId);
            this._productId = productId;
        }
        public ProductProvide() { }

        public Models.Product.ProductInfo GetProductInfo()  
        {
            
            if (_product == null)
            {
                return null;
            }
            else {
                return ConvertToProductInfo(_product);
            }
        }
        public List<Models.Product.ProductInfo> GetProductByType(int type)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            var list= bll.GetModelList("goodstype="+type);
            List<Models.Product.ProductInfo> productInfos = new List<Models.Product.ProductInfo>();
            if (list.Count > 0) {
                foreach (var m in list) {
                    var model = ConvertToProductInfo(m);
                    productInfos.Add(model);
                }
            }
            return productInfos;
        }
        private Models.Product.ProductInfo ConvertToProductInfo(Model.WX_PublicGood model)
        {
            var serverUrl = App.Helper.WxBaseConfig.WebSite;
            if (model != null) {
                return new Models.Product.ProductInfo()
                {
                    Price = model.PublicPrice ?? 0,
                    ProductId = model.ID,
                    ProductIntro = model.InfoDesc,
                    ProductDetail=model.Desc,
                    ProductName = model.GoodName,
                    ProductType = model.GoodsType.ToString(),
                    ProductImgUrl = model.ImgURL.StartsWith("http") == true ? model.ImgURL : serverUrl.Substring(0, serverUrl.Length - 1) + model.ImgURL,
                    ProductAttach = GetProductAttach(model.ID),
                    LinkUrl=model.GoodsLink
                };
            }
            return new Models.Product.ProductInfo();
        }
        private Model.WX_Product_Attach GetProductAttach(int productId)
        {
            try
            {
                BLL.WX_Product_Attach bll = new BLL.WX_Product_Attach();
                return bll.GetModel(productId);
            }
            catch (Exception ex) {
                return new Model.WX_Product_Attach();
            }
            
        }

    }
}