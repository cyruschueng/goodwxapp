using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using SfSoft.Common;
using System.IO;
using System.Data.SqlClient;

namespace SfSoft.web.emc.double11
{
    
    public class ThreadImport
    {
        private System.Web.UI.WebControls.FileUpload fileUpload = null;
        private string fileName = string.Empty;
        public delegate void UpdateOrderCallBack(string msg);
        private UpdateOrderCallBack callBack = null;
        public ThreadImport(System.Web.UI.WebControls.FileUpload fileUpload,string fileName,UpdateOrderCallBack callBack) {
            this.fileUpload = fileUpload;
            this.fileName = fileName;
            this.callBack = callBack;
        }
        public void Import()
        {
            try
            {
                this.fileUpload.PostedFile.SaveAs(this.fileName);
                this.fileUpload.Dispose();
                DataSet ds = ExcelHelper.GetDataSet(fileName);
                UpdateOrder(ds);
                if (callBack != null) {
                    callBack("ok");
                }
            }
            catch (Exception ex)
            {
                if (callBack != null)
                {
                    callBack("error");
                }
            }
            finally {
                if (File.Exists(this.fileName)) {
                    File.Delete(this.fileName);
                }
            }
        }
        private void UpdateOrder(DataSet ds)
        {
            string sql = "update WX_PublicOrder set IsSend=1,Logistics=@Logistics,LogisticsSN=@LogisticsSN,SendDate=@SendDate where Tradeno=@Tradeno and Isnull(Tradeno,'')<>'' ";
            List<DBUtility.CommandInfo> cmds = new List<DBUtility.CommandInfo>();
            foreach (DataRow dr in ds.Tables[0].Rows) {
                cmds.Add(new DBUtility.CommandInfo(sql, new SqlParameter[] { 
                    new SqlParameter("@Logistics", dr["物流公司"].ToString()), 
                    new SqlParameter("@LogisticsSN", dr["物流单号"].ToString()), 
                    new SqlParameter("@Tradeno", dr["订单号"].ToString()),
                    new SqlParameter("@SendDate",DateTime.Now)
                }));
            };
            if (cmds.Count() > 0) {
                int row= SfSoft.DBUtility.DbHelperSQL.ExecuteSqlTran(cmds);
            }
        }
    }
}