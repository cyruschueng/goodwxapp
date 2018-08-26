using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using System.Collections;
using SfSoft.DBUtility;
using System.IO;
using System.Net;

namespace SfSoft.SfEmc
{
    //数据库处理，建表，建字段
    public static class DBTools
    {
        /// <summary>
        /// 验证表是否存在
        /// </summary>
        /// <param name="tablename">表名</param>
        /// <returns>true/false</returns>
        public static bool CheckTable(string tablename)
        {
            string strSql = "Select name From Sysobjects Where xtype = 'U' and name='" + tablename + "'";
            DataSet ds = DbHelperSQL.Query(strSql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 验证字段是否存在
        /// </summary>
        /// <param name="tablename">表名</param>
        /// <param name="tablename">字段名</param>
        /// <returns>true/false</returns>
        public static bool CheckFieldName(string tablename, string fieldname)
        {
            string strSql = "select a.name,b.name as tablename from syscolumns as a right join (Select id,name From Sysobjects Where xtype = 'U') as b ";
            strSql += " on a.id=b.id where b.name='" + tablename + "' and a.name='" + fieldname + "'";
            DataSet ds = DbHelperSQL.Query(strSql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //新建表
        public static string CreateTable(string tablename)
        {
            if (CheckTable(tablename))
            {
                return "表已经存在！";
            }
            string strSql = " create table " + tablename + "(ID int identity,constraint PK_" + tablename + " primary key(ID)) ";
            DbHelperSQL.ExecuteSql(strSql);
   
            return "";
        }

        //删除表
        public static void DropTable(string tablename)
        {
            if (CheckTable(tablename))
            {
                string strSql = "DROP TABLE " + tablename;
                DbHelperSQL.ExecuteSql(strSql);
            }
        }



        /// <summary>
        /// 新建字段
        /// </summary>
        /// <param name="tablename">表名</param>
        /// <param name="fieldname">字段名</param>
        /// <param name="fieldtype">字段类型</param>
        ///  <param name="fieldtype">字段长度，字段类型为字符时才有效</param>
        public static void CreateField(string tablename, string fieldname, string fieldtype, string fieldlength)
        {
            if (!CheckFieldName(tablename, fieldname))
            {
                if (fieldtype.ToLower() == "nvarchar")
                {
                    if (fieldlength == "")
                    {
                        fieldlength = "50";
                    }
                    fieldtype += "(" + fieldlength + ")";
                }

                string strSql = "alter table " + tablename + " add " + fieldname + " " + fieldtype;
                DbHelperSQL.ExecuteSql(strSql);
            }
        }


        /// <summary>
        /// 修改字段
        /// </summary>
        /// <param name="tablename">表名</param>
        /// <param name="fieldname">字段名</param>
        /// <param name="fieldtype">字段类型</param>
        ///  <param name="fieldtype">字段长度，字段类型为字符时才有效</param>
        public static string UpdateField(string tablename, string fieldname, string fieldtype, string fieldlength)
        {
            try
            {
                if (CheckFieldName(tablename, fieldname))
                {
                    if (fieldtype.ToLower() == "nvarchar")
                    {
                        if (fieldlength == "")
                        {
                            fieldlength = "50";
                        }
                        fieldtype += "(" + fieldlength + ")";
                    }
                    string strSql = "alter table " + tablename + " ALTER column " + fieldname + " " + fieldtype;
                      DbHelperSQL.ExecuteSql(strSql);
                }
                return "";
            }
            catch
            {
                return "字段类型修改失败！";
            }
        }

        /// <summary>
        /// 删除字段
        /// </summary>
        /// <param name="tablename">表名</param>
        /// <param name="fieldname">字段名</param>
        public static void DropField(string tablename, string fieldname)
        {
            if (CheckFieldName(tablename, fieldname))
            {
                string strSql = "alter table " + tablename + " drop column " + fieldname;
                DbHelperSQL.ExecuteSql(strSql);
            }
        }

        public static DataSet GetList(string strSql)
        {
           return  DbHelperSQL.Query(strSql);
        }

        public static DataTable GetDataTableByWhere(string strWhere, string tbName)
        {
            string strSql = "select * from " + tbName + " where 1=1 " + strWhere;
            DataSet ds = DbHelperSQL.Query(strSql);
            return ds.Tables[0];
        }
        
        public static DataTable GetDataTableBySql(string strSql)
        {
            DataSet ds = DbHelperSQL.Query(strSql);
            return ds.Tables[0];
        }
        public static void UpdateTableBySql(string strSql)
        {
            DbHelperSQL.ExecuteSql(strSql);

        }
        public static void DeleteTableByWhere(string strWhere, string tbName)
        {

            string strSql = "delete " + tbName + " where 1=1 " + strWhere;
            DbHelperSQL.ExecuteSql(strSql);
        }


        /// <summary> 
        /// GET请求 
        /// </summary> 
        /// <param name="url">请求地址</param> 
        /// <param name="param">参数</param> 
        /// <param name="onComplete">完成后执行的操作(可选参数，通过此方法可以获取到HTTP状态码)</param> 
        /// <returns>请求返回结果</returns> 
        public static string Get(string url, string param, Action<HttpStatusCode, string> onComplete = null)
        {

            //if (!string.IsNullOrEmpty(param)) 
            //    if (!param.StartsWith("?")) 
            //        param += "?" + param; 
            //    else
            //param += param; 

            var request = WebRequest.Create(url) as HttpWebRequest;
            request.Method = "GET";
            request.ContentType = "application/x-www-form-urlencoded";

            return HttpRequest(request, onComplete);
        }

        /// <summary> 
        /// 请求的主体部分（由此完成请求并返回请求结果） 
        /// </summary> 
        /// <param name="request">请求的对象</param> 
        /// <param name="onComplete">完成后执行的操作(可选参数，通过此方法可以获取到HTTP状态码)</param> 
        /// <returns>请求返回结果</returns> 
        private static string HttpRequest(HttpWebRequest request, Action<HttpStatusCode, string> onComplete = null)
        { 
            HttpWebResponse response = null;

            try
            {
                response = request.GetResponse() as HttpWebResponse;
            }
            catch (WebException ex)
            {
                response = ex.Response as HttpWebResponse;
            }

            if (response == null)
            {
                if (onComplete != null)
                    onComplete(HttpStatusCode.NotFound, "请求远程返回为空");
                return null;
            }

            string result = string.Empty;
            using (StreamReader reader = new StreamReader(response.GetResponseStream()))
            {
                result = reader.ReadToEnd();
            }

            if (onComplete != null)
                onComplete(response.StatusCode, result);

            return result;

        } 
    }
}
