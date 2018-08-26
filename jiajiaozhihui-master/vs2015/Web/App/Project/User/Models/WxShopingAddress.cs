using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.User.Models
{
    public class WxShopingAddress
    {
        /// <summary>
        /// 收货人姓名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 邮编
        /// </summary>
        public string PostalCode { get; set; }
        /// <summary>
        /// 国标收货地址第一级地址（省）
        /// </summary>
        public string ProvinceName { get; set; }
        /// <summary>
        /// 国标收货地址第二级地址（市）
        /// </summary>
        public string CityName { get; set; }
        /// <summary>
        /// 国标收货地址第三级地址（国家）
        /// </summary>
        public string CountryName { get; set; }
        /// <summary>
        /// 详细收货地址信息。 
        /// </summary>
        public string DetailInfo { get; set; }
        /// <summary>
        /// 收货地址国家码。 
        /// </summary>
        public string NationalCode { get; set; }
        /// <summary>
        /// 收货人手机号码。 
        /// </summary>
        public string TelNumber { get; set; }
    }
}