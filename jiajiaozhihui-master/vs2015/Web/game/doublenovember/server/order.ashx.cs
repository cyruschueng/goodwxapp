using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShenerWeiXin.Share;
using ShenerWeiXin;
using ShenerWeiXin.User;
using SfSoft.Common.DEncrypt;
using SfSoft.Common;

namespace SfSoft.web.game.doublenovember.server
{
    /// <summary>
    /// order 的摘要说明
    /// </summary>
    public class order : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string method = "";
            string result = "";
            if (context.Request["method"] != null)
            {
                method = context.Request["method"].ToString();
            }
            result = Submit(context);
            context.Response.Write(result);
        }

        public string Submit(HttpContext context)
        {
            string result = "{}";

            string openid = "";
            if (context.Request["openid"] != null)
            {
                try
                {
                    openid = context.Request["openid"].ToString().ConvertBase64TocChars();
                    openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                }
                catch (Exception ex) {
                    WXHelper.WriteNode("game.doublenovember.server.order.ashx(openid="+openid+")");
                }
            }
            string goodsid = "";
            if (context.Request["goodsid"] != null)
            {
                goodsid = context.Request["goodsid"].ToString();
            }
            string name = "";
            if (context.Request["name"] != null)
            {
                name = context.Request["name"].ToString();
            }
            string address = "";
            if (context.Request["address"] != null)
            {
                address = context.Request["address"].ToString();
            }
            string telephone = "";
            if (context.Request["phone"] != null)
            {
                telephone = context.Request["phone"].ToString();
            }
            string province = "";
            if (context.Request["province"] != null)
            {
                province = context.Request["province"].ToString();
            }
            string city = "";
            if (context.Request["city"] != null)
            {
                city = context.Request["city"].ToString();
            }
            string remark = "";
            if (context.Request["remark"] != null)
            {
                remark = context.Request["remark"].ToString();
            }
            string mode = "";
            if (context.Request["mode"] != null)
            {
                mode = context.Request["mode"].ToString();
            }
            string friendid = "";
            if (context.Request["friendid"] != null)
            {
                friendid = context.Request["friendid"].ToString();
            }
            string number = "1";
            if (context.Request["txtNumber"] != null)
            {
                number = context.Request["txtNumber"].ToString();
            }
            string price = "0";
            if (context.Request["txtPrice"] != null)
            {
                price = context.Request["txtPrice"].ToString();
            }
            int orderID =0;
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            
            if (UnDoOrder(telephone, goodsid) == true) {
                return "{\"code\":\"0\",\"msg\":\"已订购\"}"; //已订购
            }
            ShareContent share = new ShareContent();

            try
            {
                model = share.SetGoodsOrderModel(openid, goodsid, name, address, telephone, province, city, "11", number, price,remark);
                orderID=bll.Add(model);

                //更新家园卡
                //WXHelper helper = new WXHelper();
                //helper.UpdateHomeCard(openid, name, telephone, province, city, address);

            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("game.doublenovember.server.order.ashx("+openid+")"+ex.Message);
                return "{\"code\":\"2\",\"msg\":\"订购失败\"}";
            }

            return "{\"code\":\"1\",\"msg\":\"订购完成\",\"orderid\":\"" + orderID.ToString() + "\"}";
        }
        /// <summary>
        /// 是否存在未处理的订单
        /// 只针对货到付款判断
        /// </summary>
        /// <returns></returns>
        private bool UnDoOrder(string telephone, string goodsid)
        {
            string sql = "select * from WX_PublicOrder where goodID=" + goodsid + " and telephone='" + telephone + "' and isnull(Paymode,0)=0 and isnull(issend,0)=0";
            return SfSoft.DBUtility.DbHelperSQL.Exists(sql);
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