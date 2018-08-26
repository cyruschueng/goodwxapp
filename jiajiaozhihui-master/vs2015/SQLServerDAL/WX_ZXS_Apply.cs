using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_ZXS_Apply
	/// </summary>
	public partial class WX_ZXS_Apply:IWX_ZXS_Apply
	{
		public WX_ZXS_Apply()
		{}
		#region  BasicMethod

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string AppId,string OpenId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_ZXS_Apply");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_ZXS_Apply model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_ZXS_Apply(");
			strSql.Append("AppId,OpenId,ApplyType,StartDate,EndDate,Margin,ThemeNumber,UnOpenNumber,CurrTask,LoseMargin,Reason,State,Feedback,CreateDate,CheckDate)");
			strSql.Append(" values (");
			strSql.Append("@AppId,@OpenId,@ApplyType,@StartDate,@EndDate,@Margin,@ThemeNumber,@UnOpenNumber,@CurrTask,@LoseMargin,@Reason,@State,@Feedback,@CreateDate,@CheckDate)");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ApplyType", SqlDbType.Int,4),
					new SqlParameter("@StartDate", SqlDbType.DateTime),
					new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@Margin", SqlDbType.Decimal,9),
					new SqlParameter("@ThemeNumber", SqlDbType.Int,4),
					new SqlParameter("@UnOpenNumber", SqlDbType.Int,4),
					new SqlParameter("@CurrTask", SqlDbType.NVarChar,100),
					new SqlParameter("@LoseMargin", SqlDbType.Decimal,9),
					new SqlParameter("@Reason", SqlDbType.NVarChar,500),
					new SqlParameter("@State", SqlDbType.Int,4),
					new SqlParameter("@Feedback", SqlDbType.NVarChar,500),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@CheckDate", SqlDbType.DateTime)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.ApplyType;
			parameters[3].Value = model.StartDate;
			parameters[4].Value = model.EndDate;
			parameters[5].Value = model.Margin;
			parameters[6].Value = model.ThemeNumber;
			parameters[7].Value = model.UnOpenNumber;
			parameters[8].Value = model.CurrTask;
			parameters[9].Value = model.LoseMargin;
			parameters[10].Value = model.Reason;
			parameters[11].Value = model.State;
			parameters[12].Value = model.Feedback;
			parameters[13].Value = model.CreateDate;
			parameters[14].Value = model.CheckDate;

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
		public bool Update(SfSoft.Model.WX_ZXS_Apply model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_ZXS_Apply set ");
			strSql.Append("ApplyType=@ApplyType,");
			strSql.Append("StartDate=@StartDate,");
			strSql.Append("EndDate=@EndDate,");
			strSql.Append("Margin=@Margin,");
			strSql.Append("ThemeNumber=@ThemeNumber,");
			strSql.Append("UnOpenNumber=@UnOpenNumber,");
			strSql.Append("CurrTask=@CurrTask,");
			strSql.Append("LoseMargin=@LoseMargin,");
			strSql.Append("Reason=@Reason,");
			strSql.Append("State=@State,");
			strSql.Append("Feedback=@Feedback,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("CheckDate=@CheckDate");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ApplyType", SqlDbType.Int,4),
					new SqlParameter("@StartDate", SqlDbType.DateTime),
					new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@Margin", SqlDbType.Decimal,9),
					new SqlParameter("@ThemeNumber", SqlDbType.Int,4),
					new SqlParameter("@UnOpenNumber", SqlDbType.Int,4),
					new SqlParameter("@CurrTask", SqlDbType.NVarChar,100),
					new SqlParameter("@LoseMargin", SqlDbType.Decimal,9),
					new SqlParameter("@Reason", SqlDbType.NVarChar,500),
					new SqlParameter("@State", SqlDbType.Int,4),
					new SqlParameter("@Feedback", SqlDbType.NVarChar,500),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@CheckDate", SqlDbType.DateTime),
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.ApplyType;
			parameters[1].Value = model.StartDate;
			parameters[2].Value = model.EndDate;
			parameters[3].Value = model.Margin;
			parameters[4].Value = model.ThemeNumber;
			parameters[5].Value = model.UnOpenNumber;
			parameters[6].Value = model.CurrTask;
			parameters[7].Value = model.LoseMargin;
			parameters[8].Value = model.Reason;
			parameters[9].Value = model.State;
			parameters[10].Value = model.Feedback;
			parameters[11].Value = model.CreateDate;
			parameters[12].Value = model.CheckDate;
			parameters[13].Value = model.AppId;
			parameters[14].Value = model.OpenId;

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
		public bool Delete(string AppId,string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_ZXS_Apply ");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;

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
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_ZXS_Apply GetModel(string AppId,string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 AppId,OpenId,ApplyType,StartDate,EndDate,Margin,ThemeNumber,UnOpenNumber,CurrTask,LoseMargin,Reason,State,Feedback,CreateDate,CheckDate from WX_ZXS_Apply ");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;

			SfSoft.Model.WX_ZXS_Apply model=new SfSoft.Model.WX_ZXS_Apply();
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
		public SfSoft.Model.WX_ZXS_Apply DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_ZXS_Apply model=new SfSoft.Model.WX_ZXS_Apply();
			if (row != null)
			{
				if(row["AppId"]!=null)
				{
					model.AppId=row["AppId"].ToString();
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["ApplyType"]!=null && row["ApplyType"].ToString()!="")
				{
					model.ApplyType=int.Parse(row["ApplyType"].ToString());
				}
				if(row["StartDate"]!=null && row["StartDate"].ToString()!="")
				{
					model.StartDate=DateTime.Parse(row["StartDate"].ToString());
				}
				if(row["EndDate"]!=null && row["EndDate"].ToString()!="")
				{
					model.EndDate=DateTime.Parse(row["EndDate"].ToString());
				}
				if(row["Margin"]!=null && row["Margin"].ToString()!="")
				{
					model.Margin=decimal.Parse(row["Margin"].ToString());
				}
				if(row["ThemeNumber"]!=null && row["ThemeNumber"].ToString()!="")
				{
					model.ThemeNumber=int.Parse(row["ThemeNumber"].ToString());
				}
				if(row["UnOpenNumber"]!=null && row["UnOpenNumber"].ToString()!="")
				{
					model.UnOpenNumber=int.Parse(row["UnOpenNumber"].ToString());
				}
				if(row["CurrTask"]!=null)
				{
					model.CurrTask=row["CurrTask"].ToString();
				}
				if(row["LoseMargin"]!=null && row["LoseMargin"].ToString()!="")
				{
					model.LoseMargin=decimal.Parse(row["LoseMargin"].ToString());
				}
				if(row["Reason"]!=null)
				{
					model.Reason=row["Reason"].ToString();
				}
				if(row["State"]!=null && row["State"].ToString()!="")
				{
					model.State=int.Parse(row["State"].ToString());
				}
				if(row["Feedback"]!=null)
				{
					model.Feedback=row["Feedback"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["CheckDate"]!=null && row["CheckDate"].ToString()!="")
				{
					model.CheckDate=DateTime.Parse(row["CheckDate"].ToString());
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
			strSql.Append("select AppId,OpenId,ApplyType,StartDate,EndDate,Margin,ThemeNumber,UnOpenNumber,CurrTask,LoseMargin,Reason,State,Feedback,CreateDate,CheckDate ");
			strSql.Append(" FROM WX_ZXS_Apply ");
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
			strSql.Append(" AppId,OpenId,ApplyType,StartDate,EndDate,Margin,ThemeNumber,UnOpenNumber,CurrTask,LoseMargin,Reason,State,Feedback,CreateDate,CheckDate ");
			strSql.Append(" FROM WX_ZXS_Apply ");
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
			strSql.Append("select count(1) FROM WX_ZXS_Apply ");
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
				strSql.Append("order by T.OpenId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_ZXS_Apply T ");
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
			parameters[0].Value = "WX_ZXS_Apply";
			parameters[1].Value = "OpenId";
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

