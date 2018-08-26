using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Timer
	/// </summary>
	public partial class WX_Course_Timer:IWX_Course_Timer
	{
		public WX_Course_Timer()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("CourseId", "WX_Course_Timer"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int CourseId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Timer");
			strSql.Append(" where CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4)			};
			parameters[0].Value = CourseId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Course_Timer model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Timer(");
            strSql.Append("CourseId,PlanType,RepeatType,Day,Week,WeekOfMonth,Month,EveryIntervalHour,Unit,StartTime,EndTime,StartDateTime,EndDateTime,MonthType)");
			strSql.Append(" values (");
            strSql.Append("@CourseId,@PlanType,@RepeatType,@Day,@Week,@WeekOfMonth,@Month,@EveryIntervalHour,@Unit,@StartTime,@EndTime,@StartDateTime,@EndDateTime,@MonthType)");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@PlanType", SqlDbType.Int,4),
					new SqlParameter("@RepeatType", SqlDbType.Int,4),
					new SqlParameter("@Day", SqlDbType.Int,4),
					new SqlParameter("@Week", SqlDbType.NVarChar,200),
					new SqlParameter("@WeekOfMonth", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4),
					new SqlParameter("@EveryIntervalHour", SqlDbType.Int,4),
					new SqlParameter("@Unit", SqlDbType.NVarChar,10),
					new SqlParameter("@StartTime", SqlDbType.NVarChar,20),
					new SqlParameter("@EndTime", SqlDbType.NVarChar,20),
					new SqlParameter("@StartDateTime", SqlDbType.DateTime),
					new SqlParameter("@EndDateTime", SqlDbType.DateTime),
                    new SqlParameter("@MonthType", SqlDbType.Int,4)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.PlanType;
			parameters[2].Value = model.RepeatType;
			parameters[3].Value = model.Day;
			parameters[4].Value = model.Week;
			parameters[5].Value = model.WeekOfMonth;
			parameters[6].Value = model.Month;
			parameters[7].Value = model.EveryIntervalHour;
			parameters[8].Value = model.Unit;
			parameters[9].Value = model.StartTime;
			parameters[10].Value = model.EndTime;
			parameters[11].Value = model.StartDateTime;
			parameters[12].Value = model.EndDateTime;
            parameters[13].Value = model.MonthType;

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
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_Course_Timer model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Timer set ");
			strSql.Append("PlanType=@PlanType,");
			strSql.Append("RepeatType=@RepeatType,");
			strSql.Append("Day=@Day,");
			strSql.Append("Week=@Week,");
			strSql.Append("WeekOfMonth=@WeekOfMonth,");
			strSql.Append("Month=@Month,");
			strSql.Append("EveryIntervalHour=@EveryIntervalHour,");
			strSql.Append("Unit=@Unit,");
			strSql.Append("StartTime=@StartTime,");
			strSql.Append("EndTime=@EndTime,");
			strSql.Append("StartDateTime=@StartDateTime,");
			strSql.Append("EndDateTime=@EndDateTime,");
            strSql.Append("MonthType=@MonthType");
			strSql.Append(" where CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@PlanType", SqlDbType.Int,4),
					new SqlParameter("@RepeatType", SqlDbType.Int,4),
					new SqlParameter("@Day", SqlDbType.Int,4),
					new SqlParameter("@Week", SqlDbType.NVarChar,200),
					new SqlParameter("@WeekOfMonth", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4),
					new SqlParameter("@EveryIntervalHour", SqlDbType.Int,4),
					new SqlParameter("@Unit", SqlDbType.NVarChar,10),
					new SqlParameter("@StartTime", SqlDbType.NVarChar,20),
					new SqlParameter("@EndTime", SqlDbType.NVarChar,20),
					new SqlParameter("@StartDateTime", SqlDbType.DateTime),
					new SqlParameter("@EndDateTime", SqlDbType.DateTime),
                    new SqlParameter("@MonthType", SqlDbType.Int,4),
					new SqlParameter("@CourseId", SqlDbType.Int,4)};
			parameters[0].Value = model.PlanType;
			parameters[1].Value = model.RepeatType;
			parameters[2].Value = model.Day;
			parameters[3].Value = model.Week;
			parameters[4].Value = model.WeekOfMonth;
			parameters[5].Value = model.Month;
			parameters[6].Value = model.EveryIntervalHour;
			parameters[7].Value = model.Unit;
			parameters[8].Value = model.StartTime;
			parameters[9].Value = model.EndTime;
			parameters[10].Value = model.StartDateTime;
			parameters[11].Value = model.EndDateTime;
            parameters[12].Value = model.MonthType;
			parameters[13].Value = model.CourseId;

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
		public bool Delete(int CourseId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_Timer ");
			strSql.Append(" where CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4)			};
			parameters[0].Value = CourseId;

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
		public bool DeleteList(string CourseIdlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_Timer ");
			strSql.Append(" where CourseId in ("+CourseIdlist + ")  ");
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
		public SfSoft.Model.WX_Course_Timer GetModel(int CourseId)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 CourseId,PlanType,RepeatType,Day,Week,WeekOfMonth,Month,EveryIntervalHour,Unit,StartTime,EndTime,StartDateTime,EndDateTime,MonthType from WX_Course_Timer ");
			strSql.Append(" where CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4)			};
			parameters[0].Value = CourseId;

			SfSoft.Model.WX_Course_Timer model=new SfSoft.Model.WX_Course_Timer();
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
		public SfSoft.Model.WX_Course_Timer DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Timer model=new SfSoft.Model.WX_Course_Timer();
			if (row != null)
			{
				if(row["CourseId"]!=null && row["CourseId"].ToString()!="")
				{
					model.CourseId=int.Parse(row["CourseId"].ToString());
				}
				if(row["PlanType"]!=null && row["PlanType"].ToString()!="")
				{
					model.PlanType=int.Parse(row["PlanType"].ToString());
				}
				if(row["RepeatType"]!=null && row["RepeatType"].ToString()!="")
				{
					model.RepeatType=int.Parse(row["RepeatType"].ToString());
				}
				if(row["Day"]!=null && row["Day"].ToString()!="")
				{
					model.Day=int.Parse(row["Day"].ToString());
				}
				if(row["Week"]!=null)
				{
					model.Week=row["Week"].ToString();
				}
				if(row["WeekOfMonth"]!=null && row["WeekOfMonth"].ToString()!="")
				{
					model.WeekOfMonth=int.Parse(row["WeekOfMonth"].ToString());
				}
				if(row["Month"]!=null && row["Month"].ToString()!="")
				{
					model.Month=int.Parse(row["Month"].ToString());
				}
				if(row["EveryIntervalHour"]!=null && row["EveryIntervalHour"].ToString()!="")
				{
					model.EveryIntervalHour=int.Parse(row["EveryIntervalHour"].ToString());
				}
				if(row["Unit"]!=null)
				{
					model.Unit=row["Unit"].ToString();
				}
				if(row["StartTime"]!=null)
				{
					model.StartTime=row["StartTime"].ToString();
				}
				if(row["EndTime"]!=null)
				{
					model.EndTime=row["EndTime"].ToString();
				}
				if(row["StartDateTime"]!=null && row["StartDateTime"].ToString()!="")
				{
					model.StartDateTime=DateTime.Parse(row["StartDateTime"].ToString());
				}
				if(row["EndDateTime"]!=null && row["EndDateTime"].ToString()!="")
				{
					model.EndDateTime=DateTime.Parse(row["EndDateTime"].ToString());
				}
                if (row["MonthType"] != null && row["MonthType"].ToString() != "")
                {
                    model.MonthType = int.Parse(row["MonthType"].ToString());
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
            strSql.Append("select CourseId,PlanType,RepeatType,Day,Week,WeekOfMonth,Month,EveryIntervalHour,Unit,StartTime,EndTime,StartDateTime,EndDateTime,MonthType ");
			strSql.Append(" FROM WX_Course_Timer ");
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
            strSql.Append(" CourseId,PlanType,RepeatType,Day,Week,WeekOfMonth,Month,EveryIntervalHour,Unit,StartTime,EndTime,StartDateTime,EndDateTime,MonthType ");
			strSql.Append(" FROM WX_Course_Timer ");
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
			strSql.Append("select count(1) FROM WX_Course_Timer ");
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
				strSql.Append("order by T.CourseId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Course_Timer T ");
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
			parameters[0].Value = "WX_Course_Timer";
			parameters[1].Value = "CourseId";
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

