using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Bag
	/// </summary>
	public partial class WX_Course_Bag:IWX_Course_Bag
	{
		public WX_Course_Bag()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("CourseId", "WX_Course_Bag"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string BagId,int CourseId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Bag");
			strSql.Append(" where BagId=@BagId and CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@BagId", SqlDbType.NVarChar,100),
					new SqlParameter("@CourseId", SqlDbType.Int,4)			};
			parameters[0].Value = BagId;
			parameters[1].Value = CourseId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Course_Bag model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Bag(");
			strSql.Append("BagId,CourseId,CreateDate)");
			strSql.Append(" values (");
			strSql.Append("@BagId,@CourseId,@CreateDate)");
			SqlParameter[] parameters = {
					new SqlParameter("@BagId", SqlDbType.NVarChar,100),
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
			parameters[0].Value = model.BagId;
			parameters[1].Value = model.CourseId;
			parameters[2].Value = model.CreateDate;

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
		public bool Update(SfSoft.Model.WX_Course_Bag model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Bag set ");
			strSql.Append("CreateDate=@CreateDate");
			strSql.Append(" where BagId=@BagId and CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@BagId", SqlDbType.NVarChar,100),
					new SqlParameter("@CourseId", SqlDbType.Int,4)};
			parameters[0].Value = model.CreateDate;
			parameters[1].Value = model.BagId;
			parameters[2].Value = model.CourseId;

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
		public bool Delete(string BagId,int CourseId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_Bag ");
			strSql.Append(" where BagId=@BagId and CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@BagId", SqlDbType.NVarChar,100),
					new SqlParameter("@CourseId", SqlDbType.Int,4)			};
			parameters[0].Value = BagId;
			parameters[1].Value = CourseId;

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
		public SfSoft.Model.WX_Course_Bag GetModel(string BagId,int CourseId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 BagId,CourseId,CreateDate from WX_Course_Bag ");
			strSql.Append(" where BagId=@BagId and CourseId=@CourseId ");
			SqlParameter[] parameters = {
					new SqlParameter("@BagId", SqlDbType.NVarChar,100),
					new SqlParameter("@CourseId", SqlDbType.Int,4)			};
			parameters[0].Value = BagId;
			parameters[1].Value = CourseId;

			SfSoft.Model.WX_Course_Bag model=new SfSoft.Model.WX_Course_Bag();
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
		public SfSoft.Model.WX_Course_Bag DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Bag model=new SfSoft.Model.WX_Course_Bag();
			if (row != null)
			{
				if(row["BagId"]!=null)
				{
					model.BagId=row["BagId"].ToString();
				}
				if(row["CourseId"]!=null && row["CourseId"].ToString()!="")
				{
					model.CourseId=int.Parse(row["CourseId"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
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
			strSql.Append("select BagId,CourseId,CreateDate ");
			strSql.Append(" FROM WX_Course_Bag ");
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
			strSql.Append(" BagId,CourseId,CreateDate ");
			strSql.Append(" FROM WX_Course_Bag ");
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
			strSql.Append("select count(1) FROM WX_Course_Bag ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Bag T ");
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
			parameters[0].Value = "WX_Course_Bag";
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

