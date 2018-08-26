using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// unscramble 的摘要说明
    /// </summary>
    public class unscramble : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = "";
            string method = context.Request["method"].ToString();
            switch (method)
            {
                case "get":
                    result = GetUnscramble();
                    break;
            }
            context.Response.Write(result);
        }

        private string GetUnscramble()
        {
            string result = "{}";
            string json = "";
            BLL.WX_Doublenovember_File_unscramble bll = new BLL.WX_Doublenovember_File_unscramble();
            List<Model.WX_Doublenovember_File_unscramble> list=bll.GetModelList("");
            if (list.Count > 0) {
                var books= list.Distinct(new Comparint());
                if (books.Count() > 0) {
                    json += "{\"unscramble\":[";
                    foreach (Model.WX_Doublenovember_File_unscramble book in books)
                    {
                        var items = list.Where(e => e.BookName == book.BookName).OrderBy(e=>e.PageIndex);
                        if (items.Count() > 0) {
                            json += "{\"bookname\":\"" + book.BookName + "\",\"id\":\""+book.ID+"\" ,\"item\":[";
                            foreach (Model.WX_Doublenovember_File_unscramble item in items)
                            {
                                json += "{\"id\":\"" + item.ID + "\",\"mainwords\":\"" + Microsoft.JScript.GlobalObject.encodeURIComponent(item.MainWords) + "\",\"index\":\"" + item.PageIndex + "\"},";
                                
                            }
                            if (json.EndsWith("},")) { json = json.Substring(0, json.Length - 1); }
                            json += "]";
                            json += "},";
                        }
                    }
                    if (json.EndsWith("},")) { json = json.Substring(0, json.Length - 1); }
                }
                json += "]}";
                result = json;
            }
            return result;
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        public class Comparint : IEqualityComparer<Model.WX_Doublenovember_File_unscramble>
        {

            public bool Equals(Model.WX_Doublenovember_File_unscramble x, Model.WX_Doublenovember_File_unscramble y)
            {
                if (x == null && y == null)
                {
                    return false;
                }
                else {
                    return x.BookName == y.BookName;
                }
            }

            public int GetHashCode(Model.WX_Doublenovember_File_unscramble obj)
            {
                return obj.ToString().GetHashCode();
            }
        }
    }
}