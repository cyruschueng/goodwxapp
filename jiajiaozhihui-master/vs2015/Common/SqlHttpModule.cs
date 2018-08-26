using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.IO;
namespace SfSoft.Common
{
    public class SqlHttpModule : IHttpModule
    {
        public void Init(HttpApplication application)
        {
            application.BeginRequest += (new EventHandler(this.Application_BeginRequest));
        }
        private void Application_BeginRequest(Object source, EventArgs e)
        {
            ProcessRequest pr = new ProcessRequest();
            pr.StartProcessRequest();

        }
        public void Dispose()
        {
        }
        public class ProcessRequest
        {
            private static string SqlStr = System.Configuration.ConfigurationManager.AppSettings["SqlInject"].ToString();
            private static string sqlErrorPage = System.Configuration.ConfigurationSettings.AppSettings["SQLInjectErrPage"].ToString();
            /// 
            /// 用来识别是否是流的方式传输 
            /// 
            /// 
            /// 
            bool IsUploadRequest(HttpRequest request)
            {
                return StringStartsWithAnotherIgnoreCase(request.ContentType, "multipart/form-data");
            }
            /// 
            /// 比较内容类型 
            /// 
            /// 
            /// 
            /// 
            private static bool StringStartsWithAnotherIgnoreCase(string s1, string s2)
            {
                return (string.Compare(s1, 0, s2, 0, s2.Length, true) == 0);
            }

            //SQL注入式攻击代码分析 
            #region SQL注入式攻击代码分析
            /// 
            /// 处理用户提交的请求 
            /// 
            public void StartProcessRequest()
            {
                HttpRequest Request = System.Web.HttpContext.Current.Request;
                HttpResponse Response = System.Web.HttpContext.Current.Response;
 

                try
                {
                    string getkeys = "";
                    if (IsUploadRequest(Request)) return; //如果是流传递就退出 
                    //字符串参数 
                    if (Request.QueryString != null)
                    {
                        for (int i = 0; i < Request.QueryString.Count; i++)
                        {
                            getkeys = Request.QueryString.Keys[i].ToString();
                            if (!ProcessSqlStr(Request.QueryString[getkeys].ToString()))
                            {
                                Response.Redirect(sqlErrorPage + "?errmsg=参数中含有非法字符串");
                                Response.End();
                            }
                        }
                    }
                    //form参数 
                    if (Request.Form != null)
                    {
                        for (int i = 0; i < Request.Form.Count; i++)
                        {
                            getkeys = Request.Form.Keys[i].ToString();
                           // Request.Form[getkeys]=Request.Form[getkeys].Replace("'", "''");
                            if (!ProcessSqlStr(Request.Form[getkeys]))
                            {
                                Response.Redirect(sqlErrorPage + "?errmsg=表单中含有非法字符串");
                                Response.End();
                            }
                        }
                    }
 
                }
                catch
                {
                    // 错误处理: 处理用户提交信息! 
                    Response.Clear();
                    Response.Write("配置错误");
                    Response.End();
                }
              

            }

            /// 
            /// 分析用户请求是否正常 
            /// 
            /// 传入用户提交数据 
            /// 返回是否含有SQL注入式攻击代码 
            private bool ProcessSqlStr(string Str)
            {
                bool ReturnValue = true;
                try
                {
                    if (Str != "")
                    {
                        string[] anySqlStr = SqlStr.Split('|');
                        foreach (string ss in anySqlStr)
                        {
                            if (Str.IndexOf(ss) >= 0)
                            {
                                ReturnValue = false;
                                break;
                            }
                        }
                    }
                }
                catch
                {
                    ReturnValue = false;
                }
                return ReturnValue;
            }
            #endregion
        }


    }

    public class inputFilter : Stream
    {
        #region properties
        Stream responseStream;
        long position;
        StringBuilder html = new StringBuilder();
        #endregion
        #region constructor
        public inputFilter(Stream inputStream)
        {
            responseStream = inputStream;
        }
        #endregion
        #region implemented abstract members
        public override bool CanRead
        {
            get { return true; }
        }
        public override bool CanSeek
        {
            get { return true; }
        }
        public override bool CanWrite
        {
            get { return true; }
        }
        public override void Close()
        {
            responseStream.Close();
        }
        public override void Flush()
        {
            responseStream.Flush();
        }
        public override long Length
        {
            get { return 0; }
        }
        public override long Position
        {
            get { return position; }
            set { position = value; }
        }
        public override long Seek(long offset, System.IO.SeekOrigin direction)
        {
            return responseStream.Seek(offset, direction);
        }
        public override void SetLength(long length)
        {
            responseStream.SetLength(length);
        }
        public override void Write(byte[] buffer, int offset, int count)
        {
            responseStream.Write(buffer, offset, count);
        }



        public override int Read(byte[] buffer, int offset, int count)
        {
            int len = responseStream.Read(buffer, offset, count);
            if (len == 0)
            {
                Array.Clear(buffer, 0, count);
                return len;
            }
            
            System.Text.Encoding curEncoding = HttpContext.Current.Request.ContentEncoding;
            string strBuff = curEncoding.GetString(buffer);             //__VIEWSTATE 和 __EVENTVALIDATION 由 ASP.NET 使用，它们分别置于头部和尾部，所以不用考虑。 
            //Console.Write(strBuff);
            //System.Text.RegularExpressions.Regex re = new System.Text.RegularExpressions.Regex(@"&\w+=([\w@\-.*+]+)&");
            //strBuff = re.Replace(strBuff, new System.Text.RegularExpressions.MatchEvaluator(ReplaceMatch));
            //Array.Clear(buffer, 0, count);
            //byte[] newBuff = curEncoding.GetBytes(strBuff);
            //newBuff.CopyTo(buffer, 0);
 
            //得到非法词汇列表，这个可以在数据库或Web.Config中读取出来 
            string pattern = @"('|*|\)";
            string[] s = pattern.Split(new string[] { "|" }, StringSplitOptions.RemoveEmptyEntries);
            foreach (string s1 in s)
            {
                strBuff = strBuff.Replace(s1, "**");
            }
            byte[] data = curEncoding.GetBytes(strBuff); 

            return len;
        }


        private string ReplaceMatch(System.Text.RegularExpressions.Match match)
        {
            string prefixStr = match.ToString().Split('=')[0];
            string subMatchStr = HttpContext.Current.Server.UrlDecode(match.Groups[1].ToString());
            System.Text.RegularExpressions.Regex re = new System.Text.RegularExpressions.Regex(@"&\w+=([\w@\-.*+]+)&'");
            subMatchStr = HttpContext.Current.Server.UrlEncode(re.Replace(subMatchStr, "ABCDEF"));//注意：替换前后的字符数编码后必须保持一致 

            return prefixStr + "=" + subMatchStr + "&";
        }

        #endregion

    }


}
