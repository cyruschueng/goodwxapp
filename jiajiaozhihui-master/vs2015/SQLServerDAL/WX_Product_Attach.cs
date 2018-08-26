using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Product_Attach
	/// </summary>
	public partial class WX_Product_Attach:IWX_Product_Attach
	{
		public WX_Product_Attach()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ProductId", "WX_Product_Attach"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ProductId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Product_Attach");
			strSql.Append(" where ProductId=@ProductId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ProductId", SqlDbType.Int,4)			};
			parameters[0].Value = ProductId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Product_Attach model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Product_Attach(");
			strSql.Append("ProductId,ShowAddress,ShowPayNumber,ShowPostage,IsAct,CreateDate)");
			strSql.Append(" values (");
			strSql.Append("@ProductId,@ShowAddress,@ShowPayNumber,@ShowPostage,@IsAct,@CreateDate)");
			SqlParameter[] parameters = {
					new SqlParameter("@ProductId", SqlDbType.Int,4),
					new SqlParameter("@ShowAddress", SqlDbType.Int,4),
					new SqlParameter("@ShowPayNumber", SqlDbType.Int,4),
					new SqlParameter("@ShowPostage", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
			parameters[0].Value = model.ProductId;
			parameters[1].Value = model.ShowAddress;
			parameters[2].Value = model.ShowPayNumber;
			parameters[3].Value = model.ShowPostage;
			parameters[4].Value = model.IsAct;
			parameters[5].Value = model.CreateDate;

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
		public bool Update(SfSoft.Model.WX_Product_Attach model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Product_Attach set ");
			strSql.Append("ShowAddress=@ShowAddress,");
			strSql.Append("ShowPayNumber=@ShowPayNumber,");
			strSql.Append("ShowPostage=@ShowPostage,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("CreateDate=@CreateDate");
			strSql.Append(" where ProductId=@ProductId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ShowAddress", SqlDbType.Int,4),
					new SqlParameter("@ShowPayNumber", SqlDbType.Int,4),
					new SqlParameter("@ShowPostage", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@ProductId", SqlDbType.Int,4)};
			parameters[0].Value = model.ShowAddress;
			parameters[1].Value = model.ShowPayNumber;
			parameters[2].Value = model.ShowPostage;
			parameters[3].Value = model.IsAct;
			parameters[4].Value = model.CreateDate;
			parameters[5].Value = model.ProductId;

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
		public bool Delete(int ProductId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Product_Attach ");
			strSql.Append(" where ProductId=@ProductId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ProductId", SqlDbType.Int,4)			};
			parameters[0].Value = ProductId;

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
		public bool DeleteList(string ProductIdlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Product_Attach ");
			strSql.Append(" where ProductId in ("+ProductIdlist + ")  ");
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
		public SfSoft.Model.WX_Product_Attach GetModel(int ProductId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ProductId,ShowAddress,ShowPayNumber,ShowPostage,IsAct,CreateDate from WX_Product_Attach ");
			strSql.Append(" where ProductId=@ProductId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ProductId", SqlDbType.Int,4)			};
			parameters[0].Value = ProductId;

			SfSoft.Model.WX_Product_Attach model=new SfSoft.Model.WX_Product_Attach();
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
		public SfSoft.Model.WX_Product_Attach DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Product_Attach model=new SfSoft.Model.WX_Product_Attach();
			if (row != null)
			{
				if(row["ProductId"]!=null && row["ProductId"].ToString()!="")
				{
					model.ProductId=int.Parse(row["ProductId"].ToString());
				}
				if(row["ShowAddress"]!=null && row["ShowAddress"].ToString()!="")
				{
					model.ShowAddress=int.Parse(row["ShowAddress"].ToString());
				}
				if(row["ShowPayNumber"]!=null && row["ShowPayNumber"].ToString()!="")
				{
					model.ShowPayNumber=int.Parse(row["ShowPayNumber"].ToString());
				}
				if(row["ShowPostage"]!=null && row["ShowPostage"].ToString()!="")
				{
					model.ShowPostage=int.Parse(row["ShowPostage"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
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
			strSql.Append("select ProductId,ShowAddress,ShowPayNumber,ShowPostage,IsAct,CreateDate ");
			strSql.Append(" FROM WX_Product_Attach ");
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
			strSql.Append(" ProductId,ShowAddress,ShowPayNumber,ShowPostage,IsAct,CreateDate ");
			strSql.Append(" FROM WX_Product_Attach ");
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
			strSql.Append("select count(1) FROM WX_Product_Attach ");
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
				strSql.Append("order by T.ProductId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Product_Attach T ");
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
			parameters[0].Value = "WX_Product_Attach";
			parameters[1].Value = "ProductId";
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

