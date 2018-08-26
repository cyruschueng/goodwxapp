using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Prize_Order
	/// </summary>
	public partial class WX_Course_Prize_Order:IWX_Course_Prize_Order
	{
		public WX_Course_Prize_Order()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Prize_Order"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Prize_Order");
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
		public int Add(SfSoft.Model.WX_Course_Prize_Order model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Prize_Order(");
			strSql.Append("PrizeType,Year,Month,PrizeId,Name,Telephone,Address,IsSend,SendDate,OrderNo,IsAct,CreateDate)");
			strSql.Append(" values (");
			strSql.Append("@PrizeType,@Year,@Month,@PrizeId,@Name,@Telephone,@Address,@IsSend,@SendDate,@OrderNo,@IsAct,@CreateDate)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@PrizeType", SqlDbType.Int,4),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4),
					new SqlParameter("@PrizeId", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,50),
					new SqlParameter("@Address", SqlDbType.NVarChar,200),
					new SqlParameter("@IsSend", SqlDbType.Int,4),
					new SqlParameter("@SendDate", SqlDbType.DateTime),
					new SqlParameter("@OrderNo", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
			parameters[0].Value = model.PrizeType;
			parameters[1].Value = model.Year;
			parameters[2].Value = model.Month;
			parameters[3].Value = model.PrizeId;
			parameters[4].Value = model.Name;
			parameters[5].Value = model.Telephone;
			parameters[6].Value = model.Address;
			parameters[7].Value = model.IsSend;
			parameters[8].Value = model.SendDate;
			parameters[9].Value = model.OrderNo;
			parameters[10].Value = model.IsAct;
			parameters[11].Value = model.CreateDate;

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
		public bool Update(SfSoft.Model.WX_Course_Prize_Order model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Prize_Order set ");
			strSql.Append("PrizeType=@PrizeType,");
			strSql.Append("Year=@Year,");
			strSql.Append("Month=@Month,");
			strSql.Append("PrizeId=@PrizeId,");
			strSql.Append("Name=@Name,");
			strSql.Append("Telephone=@Telephone,");
			strSql.Append("Address=@Address,");
			strSql.Append("IsSend=@IsSend,");
			strSql.Append("SendDate=@SendDate,");
			strSql.Append("OrderNo=@OrderNo,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("CreateDate=@CreateDate");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@PrizeType", SqlDbType.Int,4),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4),
					new SqlParameter("@PrizeId", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,50),
					new SqlParameter("@Address", SqlDbType.NVarChar,200),
					new SqlParameter("@IsSend", SqlDbType.Int,4),
					new SqlParameter("@SendDate", SqlDbType.DateTime),
					new SqlParameter("@OrderNo", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.PrizeType;
			parameters[1].Value = model.Year;
			parameters[2].Value = model.Month;
			parameters[3].Value = model.PrizeId;
			parameters[4].Value = model.Name;
			parameters[5].Value = model.Telephone;
			parameters[6].Value = model.Address;
			parameters[7].Value = model.IsSend;
			parameters[8].Value = model.SendDate;
			parameters[9].Value = model.OrderNo;
			parameters[10].Value = model.IsAct;
			parameters[11].Value = model.CreateDate;
			parameters[12].Value = model.Id;

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
			strSql.Append("delete from WX_Course_Prize_Order ");
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
			strSql.Append("delete from WX_Course_Prize_Order ");
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
		public SfSoft.Model.WX_Course_Prize_Order GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,PrizeType,Year,Month,PrizeId,Name,Telephone,Address,IsSend,SendDate,OrderNo,IsAct,CreateDate from WX_Course_Prize_Order ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Prize_Order model=new SfSoft.Model.WX_Course_Prize_Order();
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
		public SfSoft.Model.WX_Course_Prize_Order DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Prize_Order model=new SfSoft.Model.WX_Course_Prize_Order();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["PrizeType"]!=null && row["PrizeType"].ToString()!="")
				{
					model.PrizeType=int.Parse(row["PrizeType"].ToString());
				}
				if(row["Year"]!=null && row["Year"].ToString()!="")
				{
					model.Year=int.Parse(row["Year"].ToString());
				}
				if(row["Month"]!=null && row["Month"].ToString()!="")
				{
					model.Month=int.Parse(row["Month"].ToString());
				}
				if(row["PrizeId"]!=null && row["PrizeId"].ToString()!="")
				{
					model.PrizeId=int.Parse(row["PrizeId"].ToString());
				}
				if(row["Name"]!=null)
				{
					model.Name=row["Name"].ToString();
				}
				if(row["Telephone"]!=null)
				{
					model.Telephone=row["Telephone"].ToString();
				}
				if(row["Address"]!=null)
				{
					model.Address=row["Address"].ToString();
				}
				if(row["IsSend"]!=null && row["IsSend"].ToString()!="")
				{
					model.IsSend=int.Parse(row["IsSend"].ToString());
				}
				if(row["SendDate"]!=null && row["SendDate"].ToString()!="")
				{
					model.SendDate=DateTime.Parse(row["SendDate"].ToString());
				}
				if(row["OrderNo"]!=null)
				{
					model.OrderNo=row["OrderNo"].ToString();
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
			strSql.Append("select Id,PrizeType,Year,Month,PrizeId,Name,Telephone,Address,IsSend,SendDate,OrderNo,IsAct,CreateDate ");
			strSql.Append(" FROM WX_Course_Prize_Order ");
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
			strSql.Append(" Id,PrizeType,Year,Month,PrizeId,Name,Telephone,Address,IsSend,SendDate,OrderNo,IsAct,CreateDate ");
			strSql.Append(" FROM WX_Course_Prize_Order ");
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
			strSql.Append("select count(1) FROM WX_Course_Prize_Order ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Prize_Order T ");
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
			parameters[0].Value = "WX_Course_Prize_Order";
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

