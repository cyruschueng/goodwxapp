using SfSoft.DBUtility;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace SfSoft.web.App.Helper
{
    public class WeiXinBgDbTestQuestionActiveScoreProvide
    {
        string connectionString = ConfigurationManager.AppSettings["BgDbConnectionString"];
        string tableName = "";
        DbHelperSQLP DbHelperSQLP = new DbHelperSQLP();
        public WeiXinBgDbTestQuestionActiveScoreProvide(string appId)
        {
            this.tableName = "WX_TestQuestion_Active_Score_" + appId;
            DbHelperSQLP.connectionString = connectionString;
        }
        
        /// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(Model.TestQuestionActiveScore model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into "+ tableName + "(");
            strSql.Append("OpenID,QuestionActiveID,Score,UsingTime,Catalogue,CreateDate,Remark)");
            strSql.Append(" values (");
            strSql.Append("@OpenID,@QuestionActiveID,@Score,@UsingTime,@Catalogue,@CreateDate,@Remark)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
                    new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
                    new SqlParameter("@QuestionActiveID", SqlDbType.Int,4),
                    new SqlParameter("@Score", SqlDbType.Int,4),
                    new SqlParameter("@UsingTime", SqlDbType.Float,8),
                    new SqlParameter("@Catalogue", SqlDbType.NVarChar,100),
                    new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Remark", SqlDbType.NVarChar,1000)};
            parameters[0].Value = model.OpenID;
            parameters[1].Value = model.QuestionActiveID;
            parameters[2].Value = model.Score;
            parameters[3].Value = model.UsingTime;
            parameters[4].Value = model.Catalogue;
            parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.Remark;
            object obj = DbHelperSQLP.GetSingle(strSql.ToString(), parameters);
            if (obj == null)
            {
                return 0;
            }
            else
            {
                return Convert.ToInt32(obj);
            }
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,OpenID,QuestionActiveID,Score,UsingTime,Catalogue,CreateDate,Remark ");
            strSql.Append(" FROM " + this.tableName + " ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQLP.Query(strSql.ToString());
        }
        public List<Model.TestQuestionActiveScore> GetModelList(string strWhere)
        {
            DataSet ds = GetList(strWhere);
            return DataTableToList(ds.Tables[0]);
        }
        /// <summary>
		/// 获得数据列表
		/// </summary>
		public List<Model.TestQuestionActiveScore> DataTableToList(DataTable dt)
        {
            List<Model.TestQuestionActiveScore> modelList = new List<Model.TestQuestionActiveScore>();
            int rowsCount = dt.Rows.Count;
            if (rowsCount > 0)
            {
                Model.TestQuestionActiveScore model;
                for (int n = 0; n < rowsCount; n++)
                {
                    model = DataRowToModel(dt.Rows[n]);
                    if (model != null)
                    {
                        modelList.Add(model);
                    }
                }
            }
            return modelList;
        }
        /// <summary>
		/// 得到一个对象实体
		/// </summary>
		public Model.TestQuestionActiveScore DataRowToModel(DataRow row)
        {
            Model.TestQuestionActiveScore model = new Model.TestQuestionActiveScore();
            if (row != null)
            {
                if (row["ID"] != null && row["ID"].ToString() != "")
                {
                    model.ID = int.Parse(row["ID"].ToString());
                }
                
                if (row["OpenID"] != null)
                {
                    model.OpenID = row["OpenID"].ToString();
                }
                if (row["QuestionActiveID"] != null && row["QuestionActiveID"].ToString() != "")
                {
                    model.QuestionActiveID = int.Parse(row["QuestionActiveID"].ToString());
                }
                if (row["Score"] != null && row["Score"].ToString() != "")
                {
                    model.Score = int.Parse(row["Score"].ToString());
                }
                if (row["UsingTime"] != null && row["UsingTime"].ToString() != "")
                {
                    model.UsingTime = int.Parse(row["UsingTime"].ToString());
                }
                if (row["Catalogue"] != null)
                {
                    model.Catalogue = row["Catalogue"].ToString();
                }
                if (row["CreateDate"] != null && row["CreateDate"].ToString() != "")
                {
                    model.CreateDate = DateTime.Parse(row["CreateDate"].ToString());
                }
                if (row["Remark"] != null)
                {
                    model.Remark = row["Remark"].ToString();
                }
            }
            return model;
        }
    }
}