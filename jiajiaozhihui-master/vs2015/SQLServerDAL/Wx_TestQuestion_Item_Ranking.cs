using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:Wx_TestQuestion_Item_Ranking
	/// </summary>
	public partial class Wx_TestQuestion_Item_Ranking:IWx_TestQuestion_Item_Ranking
	{
		public Wx_TestQuestion_Item_Ranking()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ActiveId", "Wx_TestQuestion_Item_Ranking"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string OpenId,int ActiveId,int Year,int Month)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Wx_TestQuestion_Item_Ranking");
			strSql.Append(" where OpenId=@OpenId and ActiveId=@ActiveId and Year=@Year and Month=@Month ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
					new SqlParameter("@ActiveId", SqlDbType.Int,4),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = ActiveId;
			parameters[2].Value = Year;
			parameters[3].Value = Month;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.Wx_TestQuestion_Item_Ranking model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into Wx_TestQuestion_Item_Ranking(");
			strSql.Append("OpenId,ActiveId,Year,Month,Score,UsingTime)");
			strSql.Append(" values (");
			strSql.Append("@OpenId,@ActiveId,@Year,@Month,@Score,@UsingTime)");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
					new SqlParameter("@ActiveId", SqlDbType.Int,4),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4),
					new SqlParameter("@Score", SqlDbType.Int,4),
					new SqlParameter("@UsingTime", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.ActiveId;
			parameters[2].Value = model.Year;
			parameters[3].Value = model.Month;
			parameters[4].Value = model.Score;
			parameters[5].Value = model.UsingTime;

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
		public bool Update(SfSoft.Model.Wx_TestQuestion_Item_Ranking model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update Wx_TestQuestion_Item_Ranking set ");
			strSql.Append("Score=@Score,");
			strSql.Append("UsingTime=@UsingTime");
			strSql.Append(" where OpenId=@OpenId and ActiveId=@ActiveId and Year=@Year and Month=@Month ");
			SqlParameter[] parameters = {
					new SqlParameter("@Score", SqlDbType.Int,4),
					new SqlParameter("@UsingTime", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
					new SqlParameter("@ActiveId", SqlDbType.Int,4),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4)};
			parameters[0].Value = model.Score;
			parameters[1].Value = model.UsingTime;
			parameters[2].Value = model.OpenId;
			parameters[3].Value = model.ActiveId;
			parameters[4].Value = model.Year;
			parameters[5].Value = model.Month;

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
		public bool Delete(string OpenId,int ActiveId,int Year,int Month)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from Wx_TestQuestion_Item_Ranking ");
			strSql.Append(" where OpenId=@OpenId and ActiveId=@ActiveId and Year=@Year and Month=@Month ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
					new SqlParameter("@ActiveId", SqlDbType.Int,4),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = ActiveId;
			parameters[2].Value = Year;
			parameters[3].Value = Month;

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
		public SfSoft.Model.Wx_TestQuestion_Item_Ranking GetModel(string OpenId,int ActiveId,int Year,int Month)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 OpenId,ActiveId,Year,Month,Score,UsingTime from Wx_TestQuestion_Item_Ranking ");
			strSql.Append(" where OpenId=@OpenId and ActiveId=@ActiveId and Year=@Year and Month=@Month ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
					new SqlParameter("@ActiveId", SqlDbType.Int,4),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = ActiveId;
			parameters[2].Value = Year;
			parameters[3].Value = Month;

			SfSoft.Model.Wx_TestQuestion_Item_Ranking model=new SfSoft.Model.Wx_TestQuestion_Item_Ranking();
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
		public SfSoft.Model.Wx_TestQuestion_Item_Ranking DataRowToModel(DataRow row)
		{
			SfSoft.Model.Wx_TestQuestion_Item_Ranking model=new SfSoft.Model.Wx_TestQuestion_Item_Ranking();
			if (row != null)
			{
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["ActiveId"]!=null && row["ActiveId"].ToString()!="")
				{
					model.ActiveId=int.Parse(row["ActiveId"].ToString());
				}
				if(row["Year"]!=null && row["Year"].ToString()!="")
				{
					model.Year=int.Parse(row["Year"].ToString());
				}
				if(row["Month"]!=null && row["Month"].ToString()!="")
				{
					model.Month=int.Parse(row["Month"].ToString());
				}
				if(row["Score"]!=null && row["Score"].ToString()!="")
				{
					model.Score=int.Parse(row["Score"].ToString());
				}
				if(row["UsingTime"]!=null && row["UsingTime"].ToString()!="")
				{
					model.UsingTime=int.Parse(row["UsingTime"].ToString());
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
			strSql.Append("select OpenId,ActiveId,Year,Month,Score,UsingTime ");
			strSql.Append(" FROM Wx_TestQuestion_Item_Ranking ");
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
			strSql.Append(" OpenId,ActiveId,Year,Month,Score,UsingTime ");
			strSql.Append(" FROM Wx_TestQuestion_Item_Ranking ");
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
			strSql.Append("select count(1) FROM Wx_TestQuestion_Item_Ranking ");
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
				strSql.Append("order by T.Month desc");
			}
			strSql.Append(")AS Row, T.*  from Wx_TestQuestion_Item_Ranking T ");
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
			parameters[0].Value = "Wx_TestQuestion_Item_Ranking";
			parameters[1].Value = "Month";
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

