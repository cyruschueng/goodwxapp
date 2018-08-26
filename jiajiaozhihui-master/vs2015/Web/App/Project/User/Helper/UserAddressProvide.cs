using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.User.Helper
{
    public class UserAddressProvide
    {
        public static Model.WX_UserAddress GetUserAddress(string openId)
        { 
            SfSoft.BLL.WX_UserAddress bll = new SfSoft.BLL.WX_UserAddress();
            var list= bll.GetModelList("OpenId='" + openId + "'");
            if (list.Count > 0) {
                var exist = list.Exists(e => e.IsLast == 1);
                if (exist == true)
                {
                    return list.Find(e => e.IsLast == 1);
                }
                else {
                    return list[0];
                }
            } 
            return new Model.WX_UserAddress();
        }
        /// <summary>
        ///     微信共享地址转成系统用户地址
        /// </summary>
        /// <param name="address">获取的微信共享地址</param>
        /// <returns></returns>
        public static Model.WX_UserAddress ConvertToUserAddress(string wxAddress,string openId)
        {
            var userAddress = Newtonsoft.Json.JsonConvert.DeserializeObject<SfSoft.web.User.Models.WxShopingAddress>(wxAddress);
            if (userAddress != null)
            {
                var model = new SfSoft.Model.WX_UserAddress()
                {
                    Address = userAddress.DetailInfo,
                    City = userAddress.CityName,
                    District = "",
                    IsLast = 1,
                    Mobile = userAddress.TelNumber,
                    Name = userAddress.UserName,
                    PostCode = userAddress.PostalCode,
                    Province = userAddress.ProvinceName,
                    OpenId = openId
                };
                return model;
            }
            return null;
        }
        /// <summary>
        ///     微信共享地址转成系统用户地址
        /// </summary>
        /// <param name="address">获取的微信共享地址</param>
        /// <returns></returns>
        public static Model.WX_UserAddress ConvertToUserAddress(SfSoft.web.User.Models.WxShopingAddress userAddress, string openId)
        {
            if (userAddress != null)
            {
                var model = new SfSoft.Model.WX_UserAddress()
                {
                    Address = userAddress.DetailInfo,
                    City = userAddress.CityName,
                    District = "",
                    IsLast = 1,
                    Mobile = userAddress.TelNumber,
                    Name = userAddress.UserName,
                    PostCode = userAddress.PostalCode,
                    Province = userAddress.ProvinceName,
                    OpenId = openId
                };
                return model;
            }
            return null;
        }
        /// <summary>
        /// 更新最近使用的地址
        /// </summary>
        /// <param name="wxAddress"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static Model.WX_UserAddress UpdateUserAddress(string wxAddress, string openId)
        {
            DeleteAddress(openId);
            var model = ConvertToUserAddress(wxAddress, openId);
            if (model != null) {
                BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
                bll.Add(model);
            }
            return model;
        }
        /// <summary>
        /// 更新最近使用的地址
        /// </summary>
        /// <param name="wxAddress"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        public static Model.WX_UserAddress UpdateUserAddress(SfSoft.web.User.Models.WxShopingAddress wxAddress, string openId)
        {
            DeleteAddress(openId);
            var model = ConvertToUserAddress(wxAddress, openId);
            if (model != null)
            {
                BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
                bll.Add(model);
            }
            return model;
        }
        public static void DeleteAddress(string openId)
        {
            BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
            var list = bll.GetModelList("OpenId='" + openId + "'");
            foreach (var m in list) {
                bll.Delete(m.Id);
            }
        }
    }
}