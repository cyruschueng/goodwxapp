using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.App.Pay.Model
{
    public class WxAddress
    {
        public string UserName { get; set; } //收货人姓名。
        public string PostalCode { get; set; }//邮编。
        public string ProvinceName { get; set; }//国标收货地址第一级地址（省）。
        public string CityName { get; set; }//国标收货地址第二级地址（市）。
        public string CountryName{ get; set; }// 国标收货地址第三级地址（国家）。
        public string DetailInfo { get; set; }//详细收货地址信息。
        public string NationalCode { get; set; }// 收货地址国家码   
        public string TelNumber { get; set; }//收货人手机号码
    }
}