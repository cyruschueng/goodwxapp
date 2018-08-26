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

namespace SfSoft.web.Test.WxMsg
{
    public partial class sendmsg : System.Web.UI.Page
    {
        ConcurrentQueue<string> queue = new ConcurrentQueue<string>();
        protected void Page_Load(object sender, EventArgs e)
        {
            var tempid = Request["tempid"];


        }
        private void Start()
        {

        }
        private string MsgTitle(string type)
        {
            switch (type) {
                case "cPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco":
                    return "订单发货提醒";
                case "fKWQ1YcCaAfXFpVOgJqJIJtCKcp20HKKnaxsv6poVO0":
                    return "异常订单提醒";
                case "ci0Ln5ZNnjulazeLqvmpNTFculUlm8jZI7SkQGNYH5U":
                    return "订单消息提醒";
                default:
                    return "无效";
            }
        }
        private void LoadOpenId()
        {
            string fileExrensio = System.IO.Path.GetExtension(openIdFile.FileName).ToLower();//ToLower转化为小写
            string FileType = openIdFile.PostedFile.ContentType;
            string UploadURL = Server.MapPath("~/upload/template/");//上传的目录
            string path = "";
            if (FileType == ".txt")//判断文件类型
            {
                try
                {
                    if (!System.IO.Directory.Exists(UploadURL))//判断文件夹是否已经存在
                    {
                        System.IO.Directory.CreateDirectory(UploadURL);//创建文件夹
                    }
                    path = UploadURL + openIdFile.FileName;
                    openIdFile.PostedFile.SaveAs(path);
                }
                catch
                {
                    Response.Write("上传文件失败");
                }
            }
            else
            {
                Response.Write("文件格式错误，请使用.txt文件 ");
            }

            StreamReader sr = new StreamReader(path, Encoding.Default);
            String line;
            while ((line = sr.ReadLine()) != null)
            {
                Console.WriteLine(line.ToString());
                queue.Enqueue(line.ToString());
            }
        }
        private void MultSend()
        {
            if (queue.Count > 0)
            {
                Parallel.For(0, queue.Count, (i) =>
                {
                    string item;
                    var t = queue.TryDequeue(out item);
                    if (t == true)
                    {
                        //var result = TemplateMsgHelper SendOrderMsg(item);
                        /*
                        if (result != null)
                        {
                            SfSoft.Common.LogHelper.WriteLog(item);
                        }
                        */
                    }
                });
            }
        }
        private void SendMsg(string templateid)
        {
            switch (templateid) {
                case "cPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco":
                    TemplateMsgHelper.SendcPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco(accessToken.Text,
                        openId.Text,
                        new Model.cPk3vllhc5GCrXIYlLwC2gL1ahWrfMo8RIPFoA7nJco()
                        {
                            first= "亲，宝贝已经启程了，好想快点来到你身边",
                            
                        }
                    );
                    break;
            }

        }
    }
}