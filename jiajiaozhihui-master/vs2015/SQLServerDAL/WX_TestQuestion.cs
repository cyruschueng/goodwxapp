using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_TestQuestion
	/// </summary>
	public partial class WX_TestQuestion:IWX_TestQuestion
	{
		public WX_TestQuestion()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_TestQuestion"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_TestQuestion");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_TestQuestion model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_TestQuestion(");
            strSql.Append("TestQuestion,RightAnswer,Answer1,Answer2,Answer3,Answer4,QuestionType,Grade,CreateDate,IsAct,Track_V1,Track_V2,Track_V3,PID,SPID,ClassID,AccessoryUrl)");
			strSql.Append(" values (");
            strSql.Append("@TestQuestion,@RightAnswer,@Answer1,@Answer2,@Answer3,@Answer4,@QuestionType,@Grade,@CreateDate,@IsAct,@Track_V1,@Track_V2,@Track_V3,@PID,@SPID,@ClassID,@AccessoryUrl)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@TestQuestion", SqlDbType.NVarChar,2000),
					new SqlParameter("@RightAnswer", SqlDbType.NVarChar,10),
					new SqlParameter("@Answer1", SqlDbType.NVarChar,2000),
					new SqlParameter("@Answer2", SqlDbType.NVarChar,2000),
					new SqlParameter("@Answer3", SqlDbType.NVarChar,2000),
					new SqlParameter("@Answer4", SqlDbType.NVarChar,2000),
					new SqlParameter("@QuestionType", SqlDbType.NVarChar,100),
					new SqlParameter("@Grade", SqlDbType.NVarChar,100),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@Track_V1", SqlDbType.NVarChar,50),
                    new SqlParameter("@Track_V2", SqlDbType.NVarChar,50),
                    new SqlParameter("@Track_V3", SqlDbType.NVarChar,50),
                    new SqlParameter("@PID", SqlDbType.Int,4),
                    new SqlParameter("@SPID", SqlDbType.NVarChar,50),
                    new SqlParameter("@ClassID", SqlDbType.NVarChar,100),
                    new SqlParameter("@AccessoryUrl", SqlDbType.NVarChar,300)};
			parameters[0].Value = model.TestQuestion;
			parameters[1].Value = model.RightAnswer;
			parameters[2].Value = model.Answer1;
			parameters[3].Value = model.Answer2;
			parameters[4].Value = model.Answer3;
			parameters[5].Value = model.Answer4;
			parameters[6].Value = model.QuestionType;
			parameters[7].Value = model.Grade;
			parameters[8].Value = model.CreateDate;
            parameters[9].Value = model.IsAct;
            parameters[10].Value = model.Track_V1;
            parameters[11].Value = model.Track_V2;
            parameters[12].Value = model.Track_V3;
            parameters[13].Value = model.PID;
            parameters[14].Value = model.SPID;
            parameters[15].Value = model.ClassID;
            parameters[16].Value = model.AccessoryUrl;

			object obj = DbHelperSQL.GetSingle(strSql.ToString(),parameters);
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
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_TestQuestion model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_TestQuestion set ");
			strSql.Append("TestQuestion=@TestQuestion,");
			strSql.Append("RightAnswer=@RightAnswer,");
			strSql.Append("Answer1=@Answer1,");
			strSql.Append("Answer2=@Answer2,");
			strSql.Append("Answer3=@Answer3,");
			strSql.Append("Answer4=@Answer4,");
			strSql.Append("QuestionType=@QuestionType,");
			strSql.Append("Grade=@Grade,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("Track_V1=@Track_V1,");
            strSql.Append("Track_V2=@Track_V2,");
            strSql.Append("Track_V3=@Track_V3,");
            strSql.Append("PID=@PID,");
            strSql.Append("SPID=@SPID,");
            strSql.Append("ClassID=@ClassID,");
            strSql.Append("AccessoryUrl=@AccessoryUrl");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@TestQuestion", SqlDbType.NVarChar,2000),
					new SqlParameter("@RightAnswer", SqlDbType.NVarChar,10),
					new SqlParameter("@Answer1", SqlDbType.NVarChar,2000),
					new SqlParameter("@Answer2", SqlDbType.NVarChar,2000),
					new SqlParameter("@Answer3", SqlDbType.NVarChar,2000),
					new SqlParameter("@Answer4", SqlDbType.NVarChar,2000),
					new SqlParameter("@QuestionType", SqlDbType.NVarChar,100),
					new SqlParameter("@Grade", SqlDbType.NVarChar,100),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@Track_V1", SqlDbType.NVarChar,50),
                    new SqlParameter("@Track_V2", SqlDbType.NVarChar,50),
                    new SqlParameter("@Track_V3", SqlDbType.NVarChar,50),
                    new SqlParameter("@PID", SqlDbType.Int,4),
                    new SqlParameter("@SPID", SqlDbType.NVarChar,50),
                    new SqlParameter("@ClassID", SqlDbType.NVarChar,100),
                    new SqlParameter("@AccessoryUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.TestQuestion;
			parameters[1].Value = model.RightAnswer;
			parameters[2].Value = model.Answer1;
			parameters[3].Value = model.Answer2;
			parameters[4].Value = model.Answer3;
			parameters[5].Value = model.Answer4;
			parameters[6].Value = model.QuestionType;
			parameters[7].Value = model.Grade;
			parameters[8].Value = model.CreateDate;
            parameters[9].Value = model.IsAct;
            parameters[10].Value = model.Track_V1;
            parameters[11].Value = model.Track_V2;
            parameters[12].Value = model.Track_V3;
            parameters[13].Value = model.PID;
            parameters[14].Value = model.SPID;
            parameters[15].Value = model.ClassID;
            parameters[16].Value = model.AccessoryUrl;
			parameters[17].Value = model.ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public bool Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_TestQuestion ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		/// <summary>
		/// 批量删除数据
		/// </summary>
		public bool DeleteList(string IDlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_TestQuestion ");
			strSql.Append(" where ID in ("+IDlist + ")  ");
			int rows=DbHelperSQL.ExecuteSql(strSql.ToString());
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_TestQuestion GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,TestQuestion,RightAnswer,Answer1,Answer2,Answer3,Answer4,QuestionType,Grade,CreateDate,IsAct,Track_V1,Track_V2,Track_V3,PID,SPID,ClassID,AccessoryUrl from WX_TestQuestion ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_TestQuestion model=new SfSoft.Model.WX_TestQuestion();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				return DataRowToModel(ds.Tables[0].Rows[0]);
			}
			else
			{
				return null;
			}
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_TestQuestion DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_TestQuestion model=new SfSoft.Model.WX_TestQuestion();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["TestQuestion"]!=null)
				{
					model.TestQuestion=row["TestQuestion"].ToString();
				}
				if(row["RightAnswer"]!=null)
				{
					model.RightAnswer=row["RightAnswer"].ToString();
				}
				if(row["Answer1"]!=null)
				{
					model.Answer1=row["Answer1"].ToString();
				}
				if(row["Answer2"]!=null)
				{
					model.Answer2=row["Answer2"].ToString();
				}
				if(row["Answer3"]!=null)
				{
					model.Answer3=row["Answer3"].ToString();
				}
				if(row["Answer4"]!=null)
				{
					model.Answer4=row["Answer4"].ToString();
				}
				if(row["QuestionType"]!=null)
				{
					model.QuestionType=row["QuestionType"].ToString();
				}
				if(row["Grade"]!=null)
				{
					model.Grade=row["Grade"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["IsAct"] != null && row["IsAct"].ToString() != "")
                {
                    model.IsAct = int.Parse(row["IsAct"].ToString());
                }

                if (row["Track_V1"] != null)
                {
                    model.Track_V1 = row["Track_V1"].ToString();
                }
                if (row["Track_V2"] != null)
                {
                    model.Track_V2 = row["Track_V2"].ToString();
                }
                if (row["Track_V3"] != null)
                {
                    model.Track_V3 = row["Track_V3"].ToString();
                }
                if (row["PID"] != null && row["PID"].ToString() != "")
                {
                    model.PID = int.Parse(row["PID"].ToString());
                }
                if (row["SPID"] != null)
                {
                    model.SPID = row["SPID"].ToString();
                }
                if (row["ClassID"] != null)
                {
                    model.ClassID = row["ClassID"].ToString();
                }
                if (row["AccessoryUrl"] != null)
                {
                    model.AccessoryUrl = row["AccessoryUrl"].ToString();
                }
			}
			return model;
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select ID,TestQuestion,RightAnswer,Answer1,Answer2,Answer3,Answer4,QuestionType,Grade,CreateDate,IsAct,Track_V1,Track_V2,Track_V3,PID,SPID,ClassID,AccessoryUrl ");
			strSql.Append(" FROM WX_TestQuestion ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获得前几行数据
		/// </summary>
		public DataSet GetList(int Top,string strWhere,string filedOrder)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ");
			if(Top>0)
			{
				strSql.Append(" top "+Top.ToString());
			}
            strSql.Append(" ID,TestQuestion,RightAnswer,Answer1,Answer2,Answer3,Answer4,QuestionType,Grade,CreateDate,IsAct,Track_V1,Track_V2,Track_V3,PID,SPID,ClassID,AccessoryUrl ");
			strSql.Append(" FROM WX_TestQuestion ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			strSql.Append(" order by " + filedOrder);
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获取记录总数
		/// </summary>
		public int GetRecordCount(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) FROM WX_TestQuestion ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			object obj = DbHelperSQL.GetSingle(strSql.ToString());
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
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("SELECT * FROM ( ");
			strSql.Append(" SELECT ROW_NUMBER() OVER (");
			if (!string.IsNullOrEmpty(orderby.Trim()))
			{
				strSql.Append("order by T." + orderby );
			}
			else
			{
				strSql.Append("order by T.ID desc");
			}
			strSql.Append(")AS Row, T.*  from WX_TestQuestion T ");
			if (!string.IsNullOrEmpty(strWhere.Trim()))
			{
				strSql.Append(" WHERE " + strWhere);
			}
			strSql.Append(" ) TT");
			strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
			return DbHelperSQL.Query(strSql.ToString());
		}

		/*
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		{
			SqlParameter[] parameters = {
					new SqlParameter("@tblName", SqlDbType.VarChar, 255),
					new SqlParameter("@fldName", SqlDbType.VarChar, 255),
					new SqlParameter("@PageSize", SqlDbType.Int),
					new SqlParameter("@PageIndex", SqlDbType.Int),
					new SqlParameter("@IsReCount", SqlDbType.Bit),
					new SqlParameter("@OrderType", SqlDbType.Bit),
					new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
					};
			parameters[0].Value = "WX_TestQuestion";
			parameters[1].Value = "ID";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/
        

		#endregion  BasicMethod
		#region  ExtensionMethod

		#endregion  ExtensionMethod


        public DataSet GetList(string testQuestion, string questionType, string grade)
        {
            SqlParameter[] parameters = { 
                new SqlParameter("@testquestion",SqlDbType.NVarChar,2000),
                new SqlParameter("@questiontype",SqlDbType.NVarChar,100),
                new SqlParameter("@grade",SqlDbType.NVarChar,100)                          
            };
            parameters[0].Value = testQuestion;
            parameters[1].Value = questionType;
            parameters[2].Value = grade;
            return DbHelperSQL.RunProcedure("proc_TestQuestionExport", parameters, "ds");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="simple_number"></param>
        /// <param name="medium_number"></param>
        /// <param name="hard_number"></param>
        /// <param name="simple_score"></param>
        /// <param name="medium_score"></param>
        /// <param name="hard_score"></param>
        /// <param name="openid"></param>
        /// <param name="activeid"></param>
        /// <returns></returns>
        public DataSet GetList(int simple_number, int medium_number, int hard_number, int simple_score, int medium_score, int hard_score, string openid, int activeid)
        {
            SqlParameter[] parameters = {
					new SqlParameter("@simple_number", SqlDbType.Int),
					new SqlParameter("@medium_number", SqlDbType.Int),
					new SqlParameter("@hard_number", SqlDbType.Int),
					new SqlParameter("@simple_score", SqlDbType.Int),
					new SqlParameter("@medium_score", SqlDbType.Int),
					new SqlParameter("@hard_score", SqlDbType.Int),
					new SqlParameter("@openid", SqlDbType.VarChar,1000),
                    new SqlParameter("@activeid", SqlDbType.Int)
					};
            parameters[0].Value = simple_number;
            parameters[1].Value = medium_number;
            parameters[2].Value = hard_number;
            parameters[3].Value = simple_score;
            parameters[4].Value = medium_score;
            parameters[5].Value = hard_score;
            parameters[6].Value = openid;
            parameters[7].Value = activeid;
            return DbHelperSQL.RunProcedure("pro_GetQuestion", parameters, "ds");
        }
    }
}

