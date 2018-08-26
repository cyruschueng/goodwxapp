using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_ZXS_WeekTask
	/// </summary>
	public partial class WX_ZXS_WeekTask:IWX_ZXS_WeekTask
	{
		public WX_ZXS_WeekTask()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_ZXS_WeekTask"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_ZXS_WeekTask");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_ZXS_WeekTask model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_ZXS_WeekTask(");
            strSql.Append("ThemeId,Week,TaskId,IsAct,Sn,Optional,TaskClass,Hash,Other)");
			strSql.Append(" values (");
            strSql.Append("@ThemeId,@Week,@TaskId,@IsAct,@Sn,@Optional,@TaskClass,@Hash,@Other)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ThemeId", SqlDbType.Int,4),
					new SqlParameter("@Week", SqlDbType.Int,4),
					new SqlParameter("@TaskId", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@Sn", SqlDbType.Int,4),
                    new SqlParameter("@Optional", SqlDbType.Int,4),
                    new SqlParameter("@TaskClass", SqlDbType.Int,4),
                    new SqlParameter("@Hash", SqlDbType.NVarChar,50),
                    new SqlParameter("@Other", SqlDbType.NVarChar,300)};
			parameters[0].Value = model.ThemeId;
			parameters[1].Value = model.Week;
			parameters[2].Value = model.TaskId;
			parameters[3].Value = model.IsAct;
            parameters[4].Value = model.Sn;
            parameters[5].Value = model.Optional;
            parameters[6].Value = model.TaskClass;
            parameters[7].Value = model.Hash;
            parameters[8].Value = model.Other;

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
		public bool Update(SfSoft.Model.WX_ZXS_WeekTask model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_ZXS_WeekTask set ");
			strSql.Append("ThemeId=@ThemeId,");
			strSql.Append("Week=@Week,");
			strSql.Append("TaskId=@TaskId,");
			strSql.Append("IsAct=@IsAct,");
            strSql.Append("Sn=@Sn,");
            strSql.Append("Optional=@Optional,");
            strSql.Append("TaskClass=@TaskClass,");
            strSql.Append("Hash=@Hash,");
            strSql.Append("Other=@Other");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@ThemeId", SqlDbType.Int,4),
					new SqlParameter("@Week", SqlDbType.Int,4),
					new SqlParameter("@TaskId", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@Sn", SqlDbType.Int,4),
                    new SqlParameter("@Optional", SqlDbType.Int,4),
                    new SqlParameter("@TaskClass", SqlDbType.Int,4),
                    new SqlParameter("@Hash", SqlDbType.NVarChar,50),
                    new SqlParameter("@Other", SqlDbType.NVarChar,300),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.ThemeId;
			parameters[1].Value = model.Week;
			parameters[2].Value = model.TaskId;
			parameters[3].Value = model.IsAct;
            parameters[4].Value = model.Sn;
            parameters[5].Value = model.Optional;
            parameters[6].Value = model.TaskClass;
            parameters[7].Value = model.Hash;
            parameters[8].Value = model.Other;
			parameters[9].Value = model.Id;

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
		public bool Delete(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_ZXS_WeekTask ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

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
		public bool DeleteList(string Idlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_ZXS_WeekTask ");
			strSql.Append(" where Id in ("+Idlist + ")  ");
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
		public SfSoft.Model.WX_ZXS_WeekTask GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,ThemeId,Week,TaskId,IsAct,Sn,Optional,TaskClass,Hash,Other from WX_ZXS_WeekTask ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_ZXS_WeekTask model=new SfSoft.Model.WX_ZXS_WeekTask();
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
		public SfSoft.Model.WX_ZXS_WeekTask DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_ZXS_WeekTask model=new SfSoft.Model.WX_ZXS_WeekTask();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["ThemeId"]!=null && row["ThemeId"].ToString()!="")
				{
					model.ThemeId=int.Parse(row["ThemeId"].ToString());
				}
				if(row["Week"]!=null && row["Week"].ToString()!="")
				{
					model.Week=int.Parse(row["Week"].ToString());
				}
				if(row["TaskId"]!=null && row["TaskId"].ToString()!="")
				{
					model.TaskId=int.Parse(row["TaskId"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
                if (row["Sn"] != null && row["Sn"].ToString() != "")
                {
                    model.Sn = int.Parse(row["Sn"].ToString());
                }
                if (row["Optional"] != null && row["Optional"].ToString() != "")
                {
                    model.Optional = int.Parse(row["Optional"].ToString());
                }
                if (row["TaskClass"] != null && row["TaskClass"].ToString() != "")
                {
                    model.TaskClass = int.Parse(row["TaskClass"].ToString());
                }
                if (row["Hash"] != null )
                {
                    model.Hash = row["Hash"].ToString();
                }
                if (row["Other"] != null)
                {
                    model.Other = row["Other"].ToString();
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
            strSql.Append("select Id,ThemeId,Week,TaskId,IsAct,Sn,Optional,TaskClass,Hash,Other ");
			strSql.Append(" FROM WX_ZXS_WeekTask ");
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
            strSql.Append(" Id,ThemeId,Week,TaskId,IsAct,Sn,Optional,TaskClass,Hash,Other ");
			strSql.Append(" FROM WX_ZXS_WeekTask ");
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
			strSql.Append("select count(1) FROM WX_ZXS_WeekTask ");
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
				strSql.Append("order by T.Id desc");
			}
			strSql.Append(")AS Row, T.*  from WX_ZXS_WeekTask T ");
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
			parameters[0].Value = "WX_ZXS_WeekTask";
			parameters[1].Value = "Id";
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
	}
}

