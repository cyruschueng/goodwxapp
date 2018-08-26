using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_TestQuestion_Activity_PlayerNumber
	/// </summary>
	public partial class WX_TestQuestion_Activity_PlayerNumber:IWX_TestQuestion_Activity_PlayerNumber
	{
		public WX_TestQuestion_Activity_PlayerNumber()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_TestQuestion_Activity_PlayerNumber"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_TestQuestion_Activity_PlayerNumber");
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
		public int Add(SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_TestQuestion_Activity_PlayerNumber(");
			strSql.Append("QuestionActiveID,Number,LastDate)");
			strSql.Append(" values (");
			strSql.Append("@QuestionActiveID,@Number,@LastDate)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@QuestionActiveID", SqlDbType.Int,4),
					new SqlParameter("@Number", SqlDbType.Int,4),
					new SqlParameter("@LastDate", SqlDbType.DateTime)};
			parameters[0].Value = model.QuestionActiveID;
			parameters[1].Value = model.Number;
			parameters[2].Value = model.LastDate;

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
		public bool Update(SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_TestQuestion_Activity_PlayerNumber set ");
			strSql.Append("QuestionActiveID=@QuestionActiveID,");
			strSql.Append("Number=@Number,");
			strSql.Append("LastDate=@LastDate");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@QuestionActiveID", SqlDbType.Int,4),
					new SqlParameter("@Number", SqlDbType.Int,4),
					new SqlParameter("@LastDate", SqlDbType.DateTime),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.QuestionActiveID;
			parameters[1].Value = model.Number;
			parameters[2].Value = model.LastDate;
			parameters[3].Value = model.ID;

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
			strSql.Append("delete from WX_TestQuestion_Activity_PlayerNumber ");
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
			strSql.Append("delete from WX_TestQuestion_Activity_PlayerNumber ");
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
		public SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,QuestionActiveID,Number,LastDate from WX_TestQuestion_Activity_PlayerNumber ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber model=new SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber();
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
		public SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber model=new SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["QuestionActiveID"]!=null && row["QuestionActiveID"].ToString()!="")
				{
					model.QuestionActiveID=int.Parse(row["QuestionActiveID"].ToString());
				}
				if(row["Number"]!=null && row["Number"].ToString()!="")
				{
					model.Number=int.Parse(row["Number"].ToString());
				}
				if(row["LastDate"]!=null && row["LastDate"].ToString()!="")
				{
					model.LastDate=DateTime.Parse(row["LastDate"].ToString());
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
			strSql.Append("select ID,QuestionActiveID,Number,LastDate ");
			strSql.Append(" FROM WX_TestQuestion_Activity_PlayerNumber ");
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
			strSql.Append(" ID,QuestionActiveID,Number,LastDate ");
			strSql.Append(" FROM WX_TestQuestion_Activity_PlayerNumber ");
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
			strSql.Append("select count(1) FROM WX_TestQuestion_Activity_PlayerNumber ");
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
			strSql.Append(")AS Row, T.*  from WX_TestQuestion_Activity_PlayerNumber T ");
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
			parameters[0].Value = "WX_TestQuestion_Activity_PlayerNumber";
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


        public bool ExistsByActiveID(int activeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_TestQuestion_Activity_PlayerNumber");
            strSql.Append(" where QuestionActiveID=@QuestionActiveID");
            SqlParameter[] parameters = {
					new SqlParameter("@QuestionActiveID", SqlDbType.Int,4)
			};
            parameters[0].Value = activeID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        public Model.WX_TestQuestion_Activity_PlayerNumber GetModelByActivityID(int activityID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,QuestionActiveID,Number,LastDate from WX_TestQuestion_Activity_PlayerNumber ");
            strSql.Append(" where QuestionActiveID=@QuestionActiveID");
            SqlParameter[] parameters = {
					new SqlParameter("@QuestionActiveID", SqlDbType.Int,4)
			};
            parameters[0].Value = activityID;

            SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber model = new SfSoft.Model.WX_TestQuestion_Activity_PlayerNumber();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return DataRowToModel(ds.Tables[0].Rows[0]);
            }
            else
            {
                return null;
            }
        }
    }
}

