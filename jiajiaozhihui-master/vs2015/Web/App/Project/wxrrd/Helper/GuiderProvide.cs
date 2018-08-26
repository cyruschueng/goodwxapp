using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WxPayAPI;
using Newtonsoft.Json.Linq;

namespace SfSoft.web.wxrrd.Controller.Helper
{
    public class GuiderProvide
    {
        private string _appId = "";
        private string _method = "";
        private string _secret = "";
        private int _limit = 0;
        private int _offset = 0;
        private string _access_token = "";
        public GuiderProvide(string access_token, string appId,string method,string secret,int limit,int offset)
        {
            this._appId = appId;
            this._method = method;
            this._secret = secret;
            this._limit = limit;
            this._offset = offset;
            this._access_token = access_token;
        }
        public GuiderProvide(string access_token, string appId, string method, string secret)
        {
            this._appId = appId;
            this._method = method;
            this._secret = secret;
            this._access_token = access_token;
        }
        public GuiderProvide() { }
        private string GetGuider(int offset=0)
        {
            var timestamp = DateTime.Now.ToString();
            int index=0;
            if (offset == 0) { index = this._offset; } else { index = offset; }
            WxPayData data = new WxPayData();
            data.SetValue("access_token", this._access_token);
            data.SetValue("appid", this._appId);
            data.SetValue("method", this._method);
            data.SetValue("secret", this._secret);
            data.SetValue("timestamp", timestamp);
            data.SetValue("limit", this._limit);
            data.SetValue("offset", index);

            var sign = data.MakeKSortSign();
            var url = string.Format("http://apis.wxrrd.com/router/rest?timestamp={0}&appid={1}&method={2}&access_token={3}&secret={4}&sign={5}&limit={6}&offset={7}", timestamp, this._appId, this._method, this._access_token, this._secret, sign, this._limit, index);
            return WxPayAPI.HttpService.Get(url);
        }

        public string  DownData()
        {
            try
            {
                var records = GetPageNumber();　//总数据
                var offset = GetrrdPageoffset(); //从第几页开始取数据／
                var pageCount = (records / this._limit) + ((records % this._limit) > 0 ? 1 : 0) + 1;

                for (var i = offset; i < pageCount; i++)
                {
                    var result = GetGuider(i);
                    Add(result);
                }
                return "ok";
            }
            catch (Exception ex) {
                return "error";
            }

        }
        /// <summary>
        /// 推客总数量
        /// </summary>
        /// <param name="access_token"></param>
        /// <returns></returns>
        private int GetPageNumber()
        {
            var result= GetGuider(1);
            try
            {
                JObject json = JObject.Parse(result);
                return int.Parse(json["data"]["_count"].ToString());
            }
            catch
            {
                return 0;
            }
        }
        /// <summary>
        /// 从第几页开始下载数据
        /// </summary>
        /// <param name="limit">每页下载多少数据</param>
        /// <returns></returns>
        private int GetrrdPageoffset()
        {
            BLL.wxrrd_guider bll = new BLL.wxrrd_guider();
            int number = bll.GetRecordCount("");
            return (number / this._limit) + 1;
        }

        private void Add(string result)
        {
            JObject json = JObject.Parse(result);
            var list = json["data"]["data"];

            BLL.wxrrd_guider bll = new BLL.wxrrd_guider();

            foreach (var m in list)
            {
                if (!bll.Exists(int.Parse(m["id"].ToString())))
                {
                    var model = new Model.wxrrd_guider();

                    model.id = int.Parse(m["id"].ToString());
                    model.member_id = m["member_id"].ToString();
                    model.shop_name = m["shop_name"].ToString();
                    model.nickname = m["nickname"].ToString();
                    model.team_size = int.Parse(m["team_size"].ToString());
                    model.level_id = int.Parse(m["level_id"].ToString());
                    model.level_expire_at = ConvertDateTime(m["level_expire_at"]);
                    model.status = int.Parse(m["status"].ToString());
                    model.collect_fields = m["collect_fields"].ToString();
                    model.created_at = ConvertDateTime(m["created_at"]);
                    model.level_name = m["level_name"].ToString();
                    model.guider_level_type = m["guider_level_type"].ToString();
                    model.total_comission = ConvertDecimal(m["total_comission"]);
                    model.expect_comission = ConvertDecimal(m["expect_comission"]);
                    model.mobile = m["mobile"].ToString();
                    model.parent_id = int.Parse(m["parent_id"].ToString());
                    model.order_ump = ConvertDecimal(m["order_ump"]);
                    model.status_name = m["status_name"].ToString();
                    model.referral = m["referral"].ToString();
                    model.is_partner = m["is_partner"].ToString() == "false" ? 0 : 1;
                    model.balance = ConvertDecimal(m["balance"]);
                    model.wx_public_id = m["wx_public_id"].ToString();
                    model.wx_name = m["wx_name"].ToString();
                    model.wx_avatar = m["wx_avatar"].ToString();
                    model.wx_address = m["wx_address"].ToString();

                    bll.Add(model);
                }
            }
        }
        private DateTime? ConvertDateTime(JToken date)
        {
            if (date == null) return null;
            DateTime value;
            var result = DateTime.TryParse(date.ToString(), out value);
            if (result)
            {
                return value;
            }
            else
            {
                return null;
            }
        }
        private decimal ConvertDecimal(JToken price)
        {
            if (price == null) return 0;
            decimal value = 0;
            var result = decimal.TryParse(price.ToString(), out value);
            if (result)
            {
                return value;
            }
            else
            {
                return 0;
            }
        }

        public List<Model.wxrrd_guider> Search(string parentId)
        {
            BLL.wxrrd_guider bll = new BLL.wxrrd_guider();
            var list = bll.GetModelList("parent_id=" + parentId);
            return list;
        }
        public Model.wxrrd_guider GetMyInfo(string memberId)
        {
            BLL.wxrrd_guider bll = new BLL.wxrrd_guider();
            var list = bll.GetModelList("member_id=" + memberId);
            if (list.Count > 0) {
                return list[0];
            }
            return new Model.wxrrd_guider();
        }
    }
}