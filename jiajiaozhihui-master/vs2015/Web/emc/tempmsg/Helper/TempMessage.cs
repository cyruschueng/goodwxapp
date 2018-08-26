using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using log4net;
using System.Reflection;

[assembly: log4net.Config.XmlConfigurator(Watch = true)]
namespace SfSoft.web.emc.tempmsg.Helper
{
    public class TempMessage
    {
        public static readonly ILog log = log4net.LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        //public int index{get;set;}
        //public TempMessage()//int index
        //{
        //    //this.index = index;
        //    log.Info("TempMessage线程[]:实例化");
        //}
        public static void Send(List<string> list,int index)
        {
            try
            {
                log.Info("线程" + index.ToString() + ":" + list.Count + "条数据");
            }
            catch (Exception ex) {
                log.Error("Error", ex);
            }
            
            //App.Helper.Log.WriteNode("线程" + index.ToString()+":"+list.Count+"条数据", "test.txt");

            //for (var i = 0; i < list.Count; i++)
            //{
            //    App.Helper.Log.WriteNode("第" + this.index.ToString() + "组(" + (i + 1) + ") openid=" + list[i], "openidlist(" + this.index.ToString() + ").txt");
            //}
        }
    }
}