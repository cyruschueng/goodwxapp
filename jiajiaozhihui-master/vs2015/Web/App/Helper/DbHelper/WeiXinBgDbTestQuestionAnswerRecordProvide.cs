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
    public class WeiXinBgDbTestQuestionAnswerRecordProvide
    {
        string connectionString = ConfigurationManager.AppSettings["BgDbConnectionString"];
        string tableName = "";
        DbHelperSQLP DbHelperSQLP = new DbHelperSQLP();
        public WeiXinBgDbTestQuestionAnswerRecordProvide()
        {
            this.tableName = SelectTable();
            DbHelperSQLP.connectionString = connectionString;
        }
        /// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(Model.TestQuestionAnswerRecord model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into "+ this.tableName + "(");
            strSql.Append("QuestionActiveID,OpenID,TestQuestionID,RightOrError,SelectAnswer,Score,UsingTime,AppId)");
			strSql.Append(" values (");
            strSql.Append("@QuestionActiveID,@OpenID,@TestQuestionID,@RightOrError,@SelectAnswer,@Score,@UsingTime,@AppId)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@QuestionActiveID", SqlDbType.Int,4),
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@TestQuestionID", SqlDbType.Int,4),
                    new SqlParameter("@RightOrError", SqlDbType.Int,4),
                    new SqlParameter("@SelectAnswer", SqlDbType.NVarChar,20),
                    new SqlParameter("@Score", SqlDbType.Int,4),
                    new SqlParameter("@UsingTime", SqlDbType.Float,8),
                    new SqlParameter("@AppId", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.QuestionActiveID;
			parameters[1].Value = model.OpenID;
			parameters[2].Value = model.TestQuestionID;
            parameters[3].Value = model.RightOrError;
            parameters[4].Value = model.SelectAnswer;
            parameters[5].Value = model.Score;
            parameters[6].Value = model.UsingTime;
            parameters[7].Value = model.AppId;

            object obj = DbHelperSQLP.GetSingle(strSql.ToString(),parameters);
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
            strSql.Append("select ID,QuestionActiveID,OpenID,TestQuestionID,RightOrError,SelectAnswer,Score,UsingTime,AppId ");
            strSql.Append(" FROM "+ this.tableName + " ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQLP.Query(strSql.ToString());
        }
        public List<Model.TestQuestionAnswerRecord> GetModelList(string strWhere)
        {
            DataSet ds = GetList(strWhere);
            return DataTableToList(ds.Tables[0]);
        }

        /// <summary>
		/// 获得数据列表
		/// </summary>
		private List<Model.TestQuestionAnswerRecord> DataTableToList(DataTable dt)
        {
            List<Model.TestQuestionAnswerRecord> modelList = new List<Model.TestQuestionAnswerRecord>();
            int rowsCount = dt.Rows.Count;
            if (rowsCount > 0)
            {
                Model.TestQuestionAnswerRecord model;
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
		private Model.TestQuestionAnswerRecord DataRowToModel(DataRow row)
        {
            Model.TestQuestionAnswerRecord model = new Model.TestQuestionAnswerRecord();
            if (row != null)
            {
                if (row["ID"] != null && row["ID"].ToString() != "")
                {
                    model.ID = int.Parse(row["ID"].ToString());
                }
                if (row["QuestionActiveID"] != null && row["QuestionActiveID"].ToString() != "")
                {
                    model.QuestionActiveID = int.Parse(row["QuestionActiveID"].ToString());
                }
                if (row["OpenID"] != null)
                {
                    model.OpenID = row["OpenID"].ToString();
                }
                if (row["TestQuestionID"] != null && row["TestQuestionID"].ToString() != "")
                {
                    model.TestQuestionID = int.Parse(row["TestQuestionID"].ToString());
                }
                if (row["RightOrError"] != null && row["RightOrError"].ToString() != "")
                {
                    model.RightOrError = int.Parse(row["RightOrError"].ToString());
                }
                if (row["SelectAnswer"] != null)
                {
                    model.SelectAnswer = row["SelectAnswer"].ToString();
                }
                if (row["Score"] != null && row["Score"].ToString() != "")
                {
                    model.Score = int.Parse(row["Score"].ToString());
                }
                if (row["UsingTime"] != null && row["UsingTime"].ToString() != "")
                {
                    model.UsingTime = int.Parse(row["UsingTime"].ToString());
                }
                if (row["AppId"] != null)
                {
                    model.AppId = row["AppId"].ToString();
                }
            }
            return model;
        }
        private string SelectTable()
        {
            return "WX_TestQuestion_Answer_Record_"+string.Format("{0:yyyyMM}", DateTime.Now);
        }
    }
}