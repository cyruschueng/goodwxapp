using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.emc.wxcourse.card
{
    /// <summary>
    /// CardProvide 的摘要说明
    /// </summary>
    public class CardProvide : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            var method = context.Request.QueryString["method"];
            var result = "";
            switch (method)
            {
                case "show":
                    ShowCardData(context);
                    break;
                case "save":
                    EditCard(context);
                    break;
                case "new":
                    AddCard(context);
                    break;
                case "upload":
                    FileUpload(context);
                    break;
                case "delete":
                    DeleteImg(context);
                    break;
            }
        }

        private void AddCard(HttpContext context)
        {
            try
            {
                var title = context.Request["title"];
                var bagId = context.Request["bagid"];
                var startDate = context.Request["startdate"];
                var endDate = context.Request["enddate"];
                var detail = Microsoft.JScript.GlobalObject.unescape(context.Request["detail"]);
                var remark = context.Request["remark"];
                var cardType = context.Request["cardtype"];
                var isAct = context.Request["isact"];
                var id = context.Request["id"];
                BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
                Model.WX_Course_Card model = new Model.WX_Course_Card();

                model.BagId = int.Parse(bagId);
                model.Title = title;
                model.CardType = cardType;
                model.CreateDate = DateTime.Now;
                model.Detail = detail;
                DateTime startDateTime;
                if (DateTime.TryParse(startDate, out startDateTime))
                {
                    model.StartDate = startDateTime;
                };
                DateTime endDateTime;
                if (DateTime.TryParse(endDate, out endDateTime))
                {
                    model.EndDate = endDateTime;
                }
                model.IsAct = int.Parse(isAct);
                model.Remark = remark;

                int index = bll.Add(model);

                var m = bll.GetModel(index);
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(m, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
            }
            catch (Exception ex) {
                context.Response.Write("");
            }
        }
        private void ShowCardData(HttpContext context)
        {
            var cardId = context.Request["cardid"];
            BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
            var model = bll.GetModel(int.Parse(cardId));
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
        }

        private void EditCard(HttpContext context)
        {
            var title = context.Request["title"];
            var startDate = context.Request["startdate"];
            var endDate = context.Request["enddate"];
            var detail = Microsoft.JScript.GlobalObject.unescape(context.Request["detail"]);
            var remark = context.Request["remark"];
            var cardType = context.Request["cardtype"];
            var imgUrl = "";
            var isAct = context.Request["isact"];
            var id = context.Request["id"];

            BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
           var model= bll.GetModel(int.Parse(id));
           if (model != null)
           {
               model.CardType = cardType;
               DateTime startDateTime;
               if (DateTime.TryParse(startDate, out startDateTime))
               {
                   model.StartDate = startDateTime;
               };
               DateTime endDateTime;
               if (DateTime.TryParse(endDate, out endDateTime))
               {
                   model.EndDate = endDateTime;
               }
               model.Title = title;
               model.Detail = detail;
               model.Remark = remark;
               model.ImgUrl = imgUrl;
               model.IsAct = int.Parse(isAct);
               bll.Update(model);
               context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(model, new Newtonsoft.Json.JsonSerializerSettings() { ContractResolver = new App.Helper.UnderlineSplitContractResolver() }));
           }
           else {
               context.Response.Write("");
           }
        }
        private void FileUpload(HttpContext context)
        {
            try
            {
                var cardId = context.Request["cardid"];

                string fileNewName = "";
                string filePath = "";
                string fileType = "";
                if (context.Request.ContentType == "image/png") {
                    fileType = ".png";
                }
                else if (context.Request.ContentType == "image/jpeg") {
                    fileType = ".jpg";
                }
                Stream s = new BufferedStream(context.Request.InputStream);
                byte[] bytes = new byte[s.Length];
                s.Read(bytes, 0, bytes.Length);

                string name = Guid.NewGuid().ToString();
                var relativePath = "/Upload/WXCourse/" + name+fileType+"";
                string path = context.Server.MapPath(relativePath);
                File.WriteAllBytes(path, bytes);

                Action action = () =>
                {
                    BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
                    var model = bll.GetModel(int.Parse(cardId));
                    model.ImgUrl = relativePath;
                    bll.Update(model);
                };
                action.BeginInvoke(null, null);

                context.Response.Write("ok"); //"上传成功！");

                /*
                HttpFileCollection files = context.Request.Files;
                if (files.Count > 0)
                {
                    fileNewName = DateTime.Now.ToString("yyyyMMddHHmmssff") + "_" + System.IO.Path.GetFileName(files[0].FileName);
                    var imgUrl = "/Upload/WXCourse/" + fileNewName;
                    files[0].SaveAs(context.Server.MapPath("~/Upload/WXCourse/" + fileNewName));

                    BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
                    var model = bll.GetModel(int.Parse(cardId));
                    model.ImgUrl = imgUrl;
                    bll.Update(model);
                    context.Response.Write("ok");
                }
                else {
                    context.Response.Write("file upload error");
                }
                 * */
            }
            catch (Exception ex) {
                context.Response.Write("error");
            }
            
        }
        private void DeleteImg(HttpContext context)
        {
            try
            {
                var cardId = context.Request["cardid"];
                BLL.WX_Course_Card bll = new BLL.WX_Course_Card();
                var model = bll.GetModel(int.Parse(cardId));
                model.ImgUrl = "";
                bll.Update(model);
                context.Response.Write("ok");
            }
            catch (Exception ex) {
                context.Response.Write("error");
            }
            
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