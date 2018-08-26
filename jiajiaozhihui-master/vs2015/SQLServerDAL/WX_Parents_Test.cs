using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Parents_Test
	/// </summary>
	public partial class WX_Parents_Test:IWX_Parents_Test
	{
		public WX_Parents_Test()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("PlanId", "WX_Parents_Test"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string AppId,string OpenId,int PlanId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Parents_Test");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and PlanId=@PlanId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@PlanId", SqlDbType.Int,4)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;
			parameters[2].Value = PlanId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Parents_Test model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Parents_Test(");
			strSql.Append("AppId,OpenId,PlanId,Score,IsPass,TestDate)");
			strSql.Append(" values (");
			strSql.Append("@AppId,@OpenId,@PlanId,@Score,@IsPass,@TestDate)");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@PlanId", SqlDbType.Int,4),
					new SqlParameter("@Score", SqlDbType.Int,4),
					new SqlParameter("@IsPass", SqlDbType.Int,4),
					new SqlParameter("@TestDate", SqlDbType.DateTime)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.PlanId;
			parameters[3].Value = model.Score;
			parameters[4].Value = model.IsPass;
			parameters[5].Value = model.TestDate;

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
		public bool Update(SfSoft.Model.WX_Parents_Test model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Parents_Test set ");
			strSql.Append("Score=@Score,");
			strSql.Append("IsPass=@IsPass,");
			strSql.Append("TestDate=@TestDate");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and PlanId=@PlanId ");
			SqlParameter[] parameters = {
					new SqlParameter("@Score", SqlDbType.Int,4),
					new SqlParameter("@IsPass", SqlDbType.Int,4),
					new SqlParameter("@TestDate", SqlDbType.DateTime),
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@PlanId", SqlDbType.Int,4)};
			parameters[0].Value = model.Score;
			parameters[1].Value = model.IsPass;
			parameters[2].Value = model.TestDate;
			parameters[3].Value = model.AppId;
			parameters[4].Value = model.OpenId;
			parameters[5].Value = model.PlanId;

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
		public bool Delete(string AppId,string OpenId,int PlanId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Parents_Test ");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and PlanId=@PlanId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@PlanId", SqlDbType.Int,4)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;
			parameters[2].Value = PlanId;

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
		public SfSoft.Model.WX_Parents_Test GetModel(string AppId,string OpenId,int PlanId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 AppId,OpenId,PlanId,Score,IsPass,TestDate from WX_Parents_Test ");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and PlanId=@PlanId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@PlanId", SqlDbType.Int,4)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;
			parameters[2].Value = PlanId;

			SfSoft.Model.WX_Parents_Test model=new SfSoft.Model.WX_Parents_Test();
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
		public SfSoft.Model.WX_Parents_Test DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Parents_Test model=new SfSoft.Model.WX_Parents_Test();
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
				if(row["PlanId"]!=null && row["PlanId"].ToString()!="")
				{
					model.PlanId=int.Parse(row["PlanId"].ToString());
				}
				if(row["Score"]!=null && row["Score"].ToString()!="")
				{
					model.Score=int.Parse(row["Score"].ToString());
				}
				if(row["IsPass"]!=null && row["IsPass"].ToString()!="")
				{
					model.IsPass=int.Parse(row["IsPass"].ToString());
				}
				if(row["TestDate"]!=null && row["TestDate"].ToString()!="")
				{
					model.TestDate=DateTime.Parse(row["TestDate"].ToString());
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
			strSql.Append("select AppId,OpenId,PlanId,Score,IsPass,TestDate ");
			strSql.Append(" FROM WX_Parents_Test ");
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
			strSql.Append(" AppId,OpenId,PlanId,Score,IsPass,TestDate ");
			strSql.Append(" FROM WX_Parents_Test ");
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
			strSql.Append("select count(1) FROM WX_Parents_Test ");
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
				strSql.Append("order by T.PlanId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Parents_Test T ");
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
			parameters[0].Value = "WX_Parents_Test";
			parameters[1].Value = "PlanId";
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

