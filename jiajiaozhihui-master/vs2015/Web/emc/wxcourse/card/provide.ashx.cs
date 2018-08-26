using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Remoting.Messaging;
using ThoughtWorks.QRCode.Codec;

namespace SfSoft.web.emc.wxcourse.card
{
    /// <summary>
    /// provide 的摘要说明
    /// </summary>
    public class provide : IHttpHandler
    {
        private List<QRCordCard> QRCordCards { get; set; }
        private string QRCordPath { get; set; }
        private string CardId { get; set; }
        public void ProcessRequest(HttpContext context)
        {
            QRCordCards = new List<QRCordCard>();
            QRCordPath = context.Server.MapPath("\\Files\\QR");
            CardId = context.Request["cardid"];
            GenerateCard(context);
        }
        private void GenerateCard(HttpContext context)
        {
            var quantity = context.Request["quantity"];
            
            int number = 0;
            if (int.TryParse(quantity, out number)) {
                Model.WX_Course_Card_Detail model = new Model.WX_Course_Card_Detail();
                BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
                Func<result> func = () =>
                {
                    try
                    {
                        int index = Convert.ToInt32(GetMaxCardNo());
                        for (var i = 0; i < number; i++)
                        {
                            model.CardNo = (index+i+1).ToString();
                            model.CardId = Convert.ToInt32(CardId);
                            model.CreateDate = DateTime.Now;
                            model.Scale = 1;
                            model.CheckCode = Guid.NewGuid().ToString("N");
                            var value= bll.Add(model);

                            QRCordCards.Add(new QRCordCard { CardId = Convert.ToInt32(CardId), Id = value, Url = model.Url,CheckCode=model.CheckCode,CardNo=model.CardNo});
                        }
                        return new result { CardId = Convert.ToInt32(CardId), State = "ok", Quantity = Convert.ToInt32(quantity) };
                    }
                    catch (Exception ex) {
                        return new result { CardId = 0, State = "error" };
                    }
                    
                };
                func.BeginInvoke(GetResultCallBack, null);
            }
        }
        private void GetResultCallBack(IAsyncResult asyncResult)
        {
            AsyncResult result = (AsyncResult)asyncResult;
            Func<result> func = (Func<result>)result.AsyncDelegate;
            var o = func.EndInvoke(asyncResult);
            if (o.State== "ok") {
                BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
                var model = bll.GetModel(o.CardId);
                model.Quantity =(model.Quantity??0)+o.Quantity;
                bll.Update(model);

                CreateQRCord(o.CardId.ToString());
            }
        }
        private string GetMaxCardNo()
        {
            BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
            var id= bll.GetMaxId()-1;
            var model= bll.GetModel(id);
            if (model != null) {
                return model.CardNo;
            }
            return "0";
        }
        private void CreateQRCord(string cardType)
        {
            QRCode qr = new QRCode(cardType);
            if (QRCordCards.Count > 0) {
                BLL.WX_Course_Card_Detail bll = new BLL.WX_Course_Card_Detail();
                var cardInfo = GetCard(int.Parse(CardId));
                foreach (var m in QRCordCards) {
                    //var url = App.Helper.WxBaseConfig.WebSite + "app/appstart/course/baseinfo.ashx?redirect_url="+App.Url.CourseUrl.ClientUrl+"app/default.html&state={\"hash\":\"empty\",\"kid\":\"" + cardInfo.BagId + "\",\"path\":\"active\",\"cid\":\"" + m.Id.ToString() + "\"}";
                    var url = App.Url.CourseUrl.ClientUrl + "link/activecard.html?kid=" + cardInfo.BagId + "&cid=" + m.Id.ToString() + "&code="+m.CheckCode;
                    
                    //qr.WriteBarcode(url, QRCordPath + "\\" + m.Id.ToString() + ".png",m.CardNo);
                    var model= bll.GetModel(m.Id);
                    model.QRPath = "/Files/QR/" +m.Id.ToString()+".png";
                    model.Url = url;
                    bll.Update(model);
                }
            }
        }
        private Model.WX_Course_Card GetCard(int cardId)
        {
            BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
            var model = bll.GetModel(cardId);
            if (model == null) {
                return new Model.WX_Course_Card();
            }
            return model;
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