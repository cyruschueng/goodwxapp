using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Product.Models.Product
{
    public class ProductInfo
    {
        /// <summary>
        /// 产品Id
        /// </summary>
        public int ProductId { get; set; }
        /// <summary>
        /// 产品名称
        /// </summary>
        public string ProductName { get; set; }
        /// <summary>
        /// 产品简介
        /// </summary>
        public string ProductIntro { get; set; }
        /// <summary>
        /// 产品详情
        /// </summary>
        public string ProductDetail { get; set; }
        /// <summary>
        /// 产品价格
        /// </summary>
        public decimal Price { get; set; }
        /// <summary>
        /// 产品类型
        /// </summary>
        public string ProductType { get; set; }
        /// <summary>
        /// 产品图片
        /// </summary>
        public string ProductImgUrl { get; set; }
        /// <summary>
        /// 产品编码
        /// </summary>
        public string ProductNo { get; set; }
        /// <summary>
        /// 顺序
        /// </summary>
        public int OrderBy { get; set; }
        /// <summary>
        /// 产品链接
        /// </summary>
        public string LinkUrl { get; set; }
        /// <summary>
        /// 产品其它设置
        /// </summary>
        public Model.WX_Product_Attach ProductAttach { get; set; }

    }
}