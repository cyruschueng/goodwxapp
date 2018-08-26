using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
namespace SfSoft.web.emc.tempmsg.user
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        private int  TotalOpenIdCount=0;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitData();
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.tempmsg.user.browse";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion

        protected override void VtDelete()
        {
            
        }
        private void BindData(string strWhere)
        {
            
        }
        protected void btnInit_Click(object sender, EventArgs e)
        {
            
        }

        protected void btnUpdate_Click(object sender, EventArgs e)
        {
            try
            {
                html_logs.InnerHtml = "<p>正在从微信服务器读起关注用户信息。。。</p>";
                DeleteFile();
                ReadOpenIdList("");
                html_logs.InnerHtml += "<p>从微信服务器读起关注用户信息完成。</p>";

                html_logs.InnerHtml += "<p>正在同步关注信息到本地服务器。。。</p>";
                var result= UpdateOpenId();
                html_logs.InnerHtml += "<p>同步关注信息到本地服务器完成。</p>";
                html_logs.InnerHtml += "<p>本次共处理"+result+"条数据。</p>";

                WriteLatelyOpenIdTotal(result);
            }
            catch (Exception ex) {
                html_logs.InnerHtml = "<p style='color:#f00;'>更新出错！</p>";
                html_logs.InnerHtml += "<p style='color:#f00;'>"+ex.Message+"</p>";
            }
        }
        private void InitData()
        {
            lbLatelyOpenIdTotal.Text= ReadLatelyOpenIdTotal();
            
            var info= Senparc.Weixin.MP.AdvancedAPIs.UserApi.Get(App.Helper.WxPayConfig.APPID, "");
            if (info.errcode == 0) {
                lbCurrOpenIdTotal.Text = info.total.ToString();
                TotalOpenIdCount = info.total;
                
            }
        }
        private string ReadLatelyOpenIdTotal()
        {
            var path = MapPath("res\\total.txt");
            using (StreamReader sr = new StreamReader(path, Encoding.Default)) {
                String line;
                while ((line = sr.ReadLine()) != null)
                {
                    return line.ToString();
                }
            }
            return "";
        }
        private void WriteLatelyOpenIdTotal(string content)
        {
            var path = MapPath("res\\total.txt");
            using (FileStream fs = new FileStream(path,FileMode.Truncate,FileAccess.ReadWrite)) {
                StreamWriter sw = new StreamWriter(fs);
                sw.Write(content);
                //清空缓冲区
                sw.Flush();
                //关闭流
                sw.Close();
                fs.Close();
            }
        }
        private void  ReadOpenIdList(string openId)
        {
            var info = Senparc.Weixin.MP.AdvancedAPIs.UserApi.Get(App.Helper.WxPayConfig.APPID, openId);
            if (info.errcode == 0 && info.count>0)
            {
                var result = Newtonsoft.Json.JsonConvert.SerializeObject(info.data);
                var name = Guid.NewGuid().ToString("N") + ".txt";
                var path = MapPath("openid\\" + name);
                using (FileStream fs = new FileStream(path,FileMode.OpenOrCreate))
                {
                    StreamWriter sw = new StreamWriter(fs);
                    sw.Write(result);
                    //清空缓冲区
                    sw.Flush();
                    //关闭流
                    sw.Close();
                    fs.Close();
                }
                if (info.next_openid != "") {
                    ReadOpenIdList(info.next_openid);
                }
            }
        }
        private string  UpdateOpenId()
        {
            List<string> jsons = new List<string>();
            var files = Directory.GetFiles(Server.MapPath("\\emc\\tempmsg\\user\\openid"), "*.txt");
            foreach (var file in files)
            {
                using (StreamReader sr = new StreamReader(file))
                {
                    string str_read = sr.ReadToEnd();
                    sr.Close();
                    jsons.Add(str_read);
                }
            }
            StringBuilder sbDelete = new StringBuilder();
            sbDelete.AppendFormat("delete WX_Subscibe");
            SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sbDelete.ToString());

            /*用户信息*/
            BLL.WX_UserInfo bll = new BLL.WX_UserInfo();
            var list = bll.GetModelList("OpenId like 'oc6zzs%'");
            /* 从.txt读起关注者信息并写入数据库*/

            foreach (var json in jsons)
            {
                var openids = JsonConvert.DeserializeObject<Models.UserInfo>(json);
                StringBuilder sb = new StringBuilder();
                foreach (var m in openids.OpenId)
                {
                    sb.AppendFormat("insert into WX_Subscibe values('{0}','{1}')", m, DateTime.Now);
                }
                var rowInsert = SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sb.ToString(),120);
            }
            /*初始所有的数据都示关注*/
            StringBuilder sbUpdate = new StringBuilder();
            sbUpdate.Append("update WX_UserInfo set issubscibe=0");
            SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sbUpdate.ToString());

            sbUpdate.Clear();
            sbUpdate.AppendFormat("update WX_UserInfo set issubscibe=1,EditeDate=getdate() where exists(select 1 from WX_Subscibe b where  WX_UserInfo.OpenId=b.OpenId)");
            var rowUpdate = SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sbUpdate.ToString(),180);
            return rowUpdate.ToString();

        }
        private void DeleteFile()
        {
            try
            {
                DirectoryInfo dir = new DirectoryInfo(Server.MapPath("\\emc\\tempmsg\\user\\openid"));
                FileSystemInfo[] fileinfo = dir.GetFileSystemInfos();  //返回目录中所有文件和子目录
                foreach (FileSystemInfo i in fileinfo)
                {
                    if (i is DirectoryInfo)            //判断是否文件夹
                    {
                        
                    }
                    else
                    {
                        File.Delete(i.FullName);      //删除指定文件
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
        }
    }
}


