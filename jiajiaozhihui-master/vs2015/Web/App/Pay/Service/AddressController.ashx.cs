using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.App.Pay.Service
{
    /// <summary>
    /// AddressController 的摘要说明
    /// </summary>
    public class AddressController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "update":
                    UpdateAddress(context);
                    break;
                case "get":
                    GetAddress(context);
                    break;
            }
        }
        public void UpdateAddress(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Model.UserAddress model = Newtonsoft.Json.JsonConvert.DeserializeObject<Model.UserAddress>(strJson);
           

            BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
            var list= bll.GetModelList("OpenId='" + model.OpenId + "'");
            if (list.Count > 0)
            {
                foreach (var item in list)
                {
                    item.IsLast = 0;
                    bll.Update(item);
                }

                var adr = model.Address;
                var arr = list.Where(e => e.Address == adr.DetailInfo && e.City == adr.CityName && e.Mobile == adr.TelNumber && e.Province == adr.ProvinceName && e.Name == adr.UserName && e.District==adr.CountryName);
                if (arr.Count() > 0)
                {
                    var entity = arr.First();
                    entity.IsLast = 1;
                    bll.Update(entity);
                }
                else
                {
                    AddUserAddress(adr, model.OpenId);
                }
            }
            else {
                AddUserAddress(model.Address, model.OpenId);
            }
        }
        private void AddUserAddress(Model.WxAddress adr,string openId)
        {
            BLL.WX_UserAddress bll = new BLL.WX_UserAddress();
            var item = new SfSoft.Model.WX_UserAddress()
            {
                Address = adr.DetailInfo,
                City = adr.CityName,
                IsLast = 1,
                Mobile = adr.TelNumber,
                Name = adr.UserName,
                OpenId = openId,
                PostCode = adr.PostalCode,
                Province = adr.ProvinceName,
                District=adr.CountryName
            };
            bll.Add(item);
        }
        public void GetAddress(HttpContext context)
        {
            var openId = context.Request["openId"];

            var model = SfSoft.web.User.Helper.UserAddressProvide.GetUserAddress(openId);
            var result= Newtonsoft.Json.JsonConvert.SerializeObject(model,
                new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new SfSoft.web.App.Helper.UnderlineSplitContractResolver() });
            context.Response.Write(result);

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