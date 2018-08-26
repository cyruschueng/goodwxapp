using Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.Test
{
    public partial class WxMessage : System.Web.UI.Page
    {
        ConcurrentQueue<string> queue = new ConcurrentQueue<string>();

        protected void Page_Load(object sender, EventArgs e)
        {
            

        }
        private void Start()
        {
            if (queue.Count > 0) {
                Parallel.For(0, queue.Count, (i) =>
                {
                    string item;
                    var t = queue.TryDequeue(out item);
                    if (t == true)
                    {
                        var result = SendMsg(item);
                        if (result != null)
                        {
                            SfSoft.Common.LogHelper.WriteLog(item);
                        }
                    }
                });
            }
        }
        private SendTemplateMessageResult SendMsg(string openId)
        {
            try
            {
                var msg = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(txtAccessToken.Text,
                    openId,
                    "fKWQ1YcCaAfXFpVOgJqJIJtCKcp20HKKnaxsv6poVO0",
                    "http://weixin.jiajiaozhihui.cn/app/appstart/book/baseinfo.ashx?redirect_url=http://weixin.jiajiaozhihui.cn/app/items/book2.html?r=a=app001|h=note",
                    new
                    {
                        first = new TemplateDataItem("注意！您选购的《四大名著》订单有异常！"),
                        keyword1 = new TemplateDataItem("《升级版中国儿童文学四大名著》"),
                        keyword2 = new TemplateDataItem("地址填写不完善"),
                        keyword3 = new TemplateDataItem("9.9元，已支付"),
                        keyword4 = new TemplateDataItem("家教智慧"),
                        keyword5 = new TemplateDataItem("2016-06-12"),
                        remark = new TemplateDataItem("请点击本信息进入补填收货地址，给你带来不便，敬请原谅！")
                    }
                );
                return msg;
            }catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败", ex);
                return null;
            }
        }
        /// <summary>
        /// 订单付款成功，将发货
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        private SendTemplateMessageResult SendOrderMsg(string openId)
        {
            try
            {
                var msg = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(txtAccessToken.Text,
                    openId,
                    "ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U",
                    "",
                    new
                    {
                        first = new TemplateDataItem("亲爱的家长，您的订单已经下单成功！"),
                        keyword1 = new TemplateDataItem("《升级版中国儿童文学四大名著》"),
                        keyword2 = new TemplateDataItem("9.9元"),
                        keyword3 = new TemplateDataItem("9.9元，已支付"),
                        remark = new TemplateDataItem("您的订单我们已收到，接下来我们会尽快为您安排发货，敬请关注！")
                        
                        /*
                        first = new TemplateDataItem("亲爱的家长，您的订单收货信息已修改成功"),
                        keyword1 = new TemplateDataItem("《升级版中国儿童文学四大名著》"),
                        keyword2 = new TemplateDataItem("9.9元"),
                        keyword3 = new TemplateDataItem("9.9元，已支付"),
                        keyword4 = new TemplateDataItem("支付成功"),
                        remark = new TemplateDataItem("我们将在2017-06-13下午为你发货,请注意查收发货信息！")
                        */
                    }
                );
                return msg;
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败", ex);
                return null;
            }
        }
        /// <summary>
        /// 发货通知
        /// </summary>
        /// <param name="openId"></param>
        /// <returns></returns>
        private SendTemplateMessageResult SendGood(string openId,string billNo,string wuliu,string wuliuNo)
        {
            try
            {
                var msg = Senparc.Weixin.MP.AdvancedAPIs.TemplateApi.SendTemplateMessage(txtAccessToken.Text,
                    openId,
                    "cPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco",
                    "https://shop13294926.wxrrd.com/feature/10220255",
                    new
                    {
                        first = new TemplateDataItem("亲爱的家长，您选购的《专注力训练》已经发货啦！"),
                        keyword1 = new TemplateDataItem(billNo),
                        keyword2 = new TemplateDataItem(wuliu),
                        keyword3 = new TemplateDataItem(wuliuNo),
                        remark = new TemplateDataItem("感谢您的支持，更多图书优惠请进入家教装备商城查看！")
                    }
                );
                return msg;
            }
            catch (Exception ex)
            {
                SfSoft.Common.LogHelper.ErrorLog("模版发送失败", ex);
                return null;
            }
        }
        private void ReadOpenId(string path)
        {
            

            StreamReader sr = new StreamReader(path, Encoding.Default);
            String line;
            while ((line = sr.ReadLine()) != null)
            {
                Console.WriteLine(line.ToString());
                queue.Enqueue(line.ToString());
            }
        }

        protected void btnMultSend_Click(object sender, EventArgs e)
        {
            var path = System.Web.HttpContext.Current.Server.MapPath("openid.txt");
            ReadOpenId(path);
            Start();
        }

        protected void btnSend_Click(object sender, EventArgs e)
        {
            /*
            var openId = txtOpenId.Text;
            SendMsg(openId);
            */

            
        }

        #region 订单完成通知
        protected void bntTestOrder_Click(object sender, EventArgs e)
        {
            var openId = txtOpenId.Text;
            SendOrderMsg(openId);
        }

        protected void bntOrder_Click(object sender, EventArgs e)
        {
            var path = System.Web.HttpContext.Current.Server.MapPath("order.txt");
            ReadOpenId(path);

            if (queue.Count > 0)
            {
                Parallel.For(0, queue.Count, (i) =>
                {
                    string item;
                    var t = queue.TryDequeue(out item);
                    if (t == true)
                    {
                        var result = SendOrderMsg(item);
                        if (result != null)
                        {
                            SfSoft.Common.LogHelper.WriteLog(item);
                        }
                    }
                });
            }
        }
        #endregion

        protected void btnTestWL_Click(object sender, EventArgs e)
        {
            var openId = txtOpenId.Text;
            SendGood(openId, "xxxxxxxxxxoo1", "百世通", "baishi001");
        }

        protected void btnWL_Click(object sender, EventArgs e)
        {
            var path = System.Web.HttpContext.Current.Server.MapPath("wldh.txt");
            List<Entity.goods> goods = new List<Entity.goods>();

            StreamReader sr = new StreamReader(path, Encoding.Default);
            String line;
            while ((line = sr.ReadLine()) != null)
            {
                var value = line.ToString();
                var arr = value.Split(',');
                Entity.goods g = new Entity.goods();
                g.Telephone = arr[0];
                g.WuLiu = arr[1];
                g.WuLiuNo = arr[2];
                g.Bill = arr[3];
                goods.Add(g);
            }
            path = System.Web.HttpContext.Current.Server.MapPath("wldh_openid.txt");

            List<Entity.openid> openids = new List<Entity.openid>();
            StreamReader sr1 = new StreamReader(path, Encoding.Default);
            String line1;
            while ((line1 = sr1.ReadLine()) != null)
            {
                var value = line1.ToString();
                var arr = value.Split(',');
                Entity.openid g = new Entity.openid();
                g.OpenId = arr[0];
                g.Telephone = arr[1];
                openids.Add(g);
            }

            var query = from g in goods
                        join o in openids on g.Telephone equals o.Telephone
                        select new { OpenId=o.OpenId,WuLiu=g.WuLiu,WuLiuNo=g.WuLiuNo,BillNo=g.Bill };

            ConcurrentQueue<Entity.msg> queueMsg = new ConcurrentQueue<Entity.msg>();
            foreach (var m in query) {
                queueMsg.Enqueue(new Entity.msg()
                {
                    BillNo = m.BillNo,
                    OpenId=m.OpenId,
                    WuLiu=m.WuLiu,
                    WuLiuNo=m.WuLiuNo
                });
            }
            
            if (queueMsg.Count > 0)
            {
                Parallel.For(0, queueMsg.Count, (i) =>
                {
                    Entity.msg item;
                    var t = queueMsg.TryDequeue(out item);
                    if (t == true)
                    {
                        var result = SendGood(item.OpenId, item.BillNo, item.WuLiu, item.WuLiuNo);
                        if (result != null)
                        {
                            SfSoft.Common.LogHelper.WriteLog(Newtonsoft.Json.JsonConvert.SerializeObject(item));
                        }
                    }
                });
            }
        }
    }
}