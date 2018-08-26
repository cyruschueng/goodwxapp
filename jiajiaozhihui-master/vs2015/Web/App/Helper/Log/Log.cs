using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Threading;

namespace SfSoft.web.App.Helper
{
    public class Log
    {
        Object locker = new Object();
        /// <summary>
        /// 写入记事本
        /// </summary>
        /// <param name="words"></param>
        public static void WriteNode(string context, string filename = "weixin.txt")
        {
            try
            {
                string filePath = System.AppDomain.CurrentDomain.BaseDirectory + "Log\\" + filename;
                if (!File.Exists(filePath))
                {
                    FileStream fs1 = new FileStream(filePath, FileMode.Create, FileAccess.Write);
                    StreamWriter sw = new StreamWriter(fs1);
                    //sw.WriteLine("***********************************" + DateTime.Now.ToString() + "***********************************************");
                    sw.WriteLine(context);
                    sw.Close();
                    fs1.Close();
                }
                else
                {
                    StreamWriter sr = File.AppendText(filePath);
                    //sr.WriteLine("***********************************" + DateTime.Now.ToString() + "***********************************************");
                    sr.WriteLine(context);
                    sr.Close();
                }
            }
            catch (Exception ex)
            {

            }
        }
        public void Write(string context, string filename = "weixin.txt")
        {
            try
            {
                lock (locker) {
                    string filePath = System.AppDomain.CurrentDomain.BaseDirectory + "Log\\" + filename;
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
            }
            catch (Exception ex)
            {
                Monitor.PulseAll(locker);
            }
        }
    }
}