using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SfSoft.web.Test
{
    public partial class linqtosql : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            List<string> jsons = new List<string>();
            var files = Directory.GetFiles(Server.MapPath("\\emc\\tempmsg\\user\\openid"), "*.txt");
            foreach (var file in files) {
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
            UserInfoDataContext db = new UserInfoDataContext();
            var list= db.WX_UserInfo.Where(x => x.OpenId.StartsWith("oc6zzs"));
            /* 从.txt读起关注者信息并写入数据库*/
           
            foreach (var json in jsons)
            {
                var openids = JsonConvert.DeserializeObject<Entity.UserInfo>(json);
                StringBuilder sb = new StringBuilder();
                foreach (var m in openids.OpenId)
                {
                    sb.AppendFormat("insert into WX_Subscibe values('{0}','{1}')", m, DateTime.Now);
                }
                var rowInsert = SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sb.ToString());
            }
            StringBuilder sbUpdate = new StringBuilder();
            sbUpdate.AppendFormat("update WX_UserInfo set issubscibe=1,EditeDate=getdate() where exists(select 1 from WX_Subscibe b where  WX_UserInfo.OpenId=b.OpenId)");
            var rowUpdate = SfSoft.DBUtility.DbHelperSQL.ExecuteSql(sbUpdate.ToString());
        }
    }
}