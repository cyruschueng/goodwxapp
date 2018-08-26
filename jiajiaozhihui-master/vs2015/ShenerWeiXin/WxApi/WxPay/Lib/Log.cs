using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ShenerWeiXin.WxApi.WxPay
{
    class Log
    {
        /// <summary>
        /// 写入记事本
        /// </summary>
        /// <param name="words"></param>
        public static void WriteNode(string context, string filename = "testpay.txt")
        {
            try
            {
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Data/" + filename);
                if (!File.Exists(filePath))
                {
                    FileStream fs1 = new FileStream(filePath, FileMode.Create, FileAccess.Write);
                    StreamWriter sw = new StreamWriter(fs1);
                    sw.WriteLine("***********************************" + DateTime.Now.ToString() + "***********************************************");
                    sw.WriteLine(context);
                    sw.Close();
                    fs1.Close();
                }
                else
                {
                    StreamWriter sr = File.AppendText(filePath);
                    sr.WriteLine("***********************************" + DateTime.Now.ToString() + "***********************************************");
                    sr.WriteLine(context);
                    sr.Close();
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
