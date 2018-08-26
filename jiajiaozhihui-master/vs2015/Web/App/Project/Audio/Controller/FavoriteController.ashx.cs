using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace SfSoft.web.Audio.Controller
{
    /// <summary>
    /// FavoriteController 的摘要说明
    /// </summary>
    public class FavoriteController : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var method = context.Request.QueryString["method"];
            switch (method)
            {
                case "add":
                    UpdateFavorite(context);
                    break;
                case "exist":
                    ExistFavorite(context);
                    break;
            }
        }
        private void ExistFavorite(HttpContext context)
        {
            string appId=context.Request["appId"];
            string openId=context.Request["openId"];
            string audioId=context.Request["audioId"];

            bool b = Helper.FavoriteProvide.IsExist(appId, openId, int.Parse(audioId));
            context.Response.Write(b);
        }
        private void UpdateFavorite(HttpContext context)
        {
            StreamReader reader = new StreamReader(context.Request.InputStream);
            String strJson = HttpUtility.UrlDecode(reader.ReadToEnd());
            Models.Favorite.FavoriteInfo model = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.Favorite.FavoriteInfo>(strJson);
            bool b= Helper.FavoriteProvide.UpdateFavorite(model);
            context.Response.Write(b);
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