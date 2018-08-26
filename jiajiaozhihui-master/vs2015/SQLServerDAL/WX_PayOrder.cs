using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_PayOrder
	/// </summary>
	public partial class WX_PayOrder:IWX_PayOrder
	{
		public WX_PayOrder()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_PayOrder"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_PayOrder");
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
		public int Add(SfSoft.Model.WX_PayOrder model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_PayOrder(");
			strSql.Append("GoodId,OpenId,Tradeno,BuyNumber,Price,UserName,Telephone,Province,City,District,Address,PayDateTime,IsAct,OrderType,IsPay,CreateOrderDate,Remark)");
			strSql.Append(" values (");
			strSql.Append("@GoodId,@OpenId,@Tradeno,@BuyNumber,@Price,@UserName,@Telephone,@Province,@City,@District,@Address,@PayDateTime,@IsAct,@OrderType,@IsPay,@CreateOrderDate,@Remark)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@GoodId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@Tradeno", SqlDbType.NVarChar,100),
					new SqlParameter("@BuyNumber", SqlDbType.Int,4),
					new SqlParameter("@Price", SqlDbType.Money,8),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,20),
					new SqlParameter("@Province", SqlDbType.NVarChar,50),
					new SqlParameter("@City", SqlDbType.NVarChar,50),
					new SqlParameter("@District", SqlDbType.NVarChar,50),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@PayDateTime", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@OrderType", SqlDbType.Int,4),
					new SqlParameter("@IsPay", SqlDbType.Int,4),
					new SqlParameter("@CreateOrderDate", SqlDbType.DateTime),
					new SqlParameter("@Remark", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.GoodId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.Tradeno;
			parameters[3].Value = model.BuyNumber;
			parameters[4].Value = model.Price;
			parameters[5].Value = model.UserName;
			parameters[6].Value = model.Telephone;
			parameters[7].Value = model.Province;
			parameters[8].Value = model.City;
			parameters[9].Value = model.District;
			parameters[10].Value = model.Address;
			parameters[11].Value = model.PayDateTime;
			parameters[12].Value = model.IsAct;
			parameters[13].Value = model.OrderType;
			parameters[14].Value = model.IsPay;
			parameters[15].Value = model.CreateOrderDate;
			parameters[16].Value = model.Remark;

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
		public bool Update(SfSoft.Model.WX_PayOrder model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_PayOrder set ");
			strSql.Append("GoodId=@GoodId,");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("Tradeno=@Tradeno,");
			strSql.Append("BuyNumber=@BuyNumber,");
			strSql.Append("Price=@Price,");
			strSql.Append("UserName=@UserName,");
			strSql.Append("Telephone=@Telephone,");
			strSql.Append("Province=@Province,");
			strSql.Append("City=@City,");
			strSql.Append("District=@District,");
			strSql.Append("Address=@Address,");
			strSql.Append("PayDateTime=@PayDateTime,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("OrderType=@OrderType,");
			strSql.Append("IsPay=@IsPay,");
			strSql.Append("CreateOrderDate=@CreateOrderDate,");
			strSql.Append("Remark=@Remark");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@GoodId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@Tradeno", SqlDbType.NVarChar,100),
					new SqlParameter("@BuyNumber", SqlDbType.Int,4),
					new SqlParameter("@Price", SqlDbType.Money,8),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,20),
					new SqlParameter("@Province", SqlDbType.NVarChar,50),
					new SqlParameter("@City", SqlDbType.NVarChar,50),
					new SqlParameter("@District", SqlDbType.NVarChar,50),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@PayDateTime", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@OrderType", SqlDbType.Int,4),
					new SqlParameter("@IsPay", SqlDbType.Int,4),
					new SqlParameter("@CreateOrderDate", SqlDbType.DateTime),
					new SqlParameter("@Remark", SqlDbType.NVarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.GoodId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.Tradeno;
			parameters[3].Value = model.BuyNumber;
			parameters[4].Value = model.Price;
			parameters[5].Value = model.UserName;
			parameters[6].Value = model.Telephone;
			parameters[7].Value = model.Province;
			parameters[8].Value = model.City;
			parameters[9].Value = model.District;
			parameters[10].Value = model.Address;
			parameters[11].Value = model.PayDateTime;
			parameters[12].Value = model.IsAct;
			parameters[13].Value = model.OrderType;
			parameters[14].Value = model.IsPay;
			parameters[15].Value = model.CreateOrderDate;
			parameters[16].Value = model.Remark;
			parameters[17].Value = model.Id;

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
			strSql.Append("delete from WX_PayOrder ");
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
			strSql.Append("delete from WX_PayOrder ");
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
		public SfSoft.Model.WX_PayOrder GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,GoodId,OpenId,Tradeno,BuyNumber,Price,UserName,Telephone,Province,City,District,Address,PayDateTime,IsAct,OrderType,IsPay,CreateOrderDate,Remark from WX_PayOrder ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_PayOrder model=new SfSoft.Model.WX_PayOrder();
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
		public SfSoft.Model.WX_PayOrder DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_PayOrder model=new SfSoft.Model.WX_PayOrder();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["GoodId"]!=null && row["GoodId"].ToString()!="")
				{
					model.GoodId=int.Parse(row["GoodId"].ToString());
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["Tradeno"]!=null)
				{
					model.Tradeno=row["Tradeno"].ToString();
				}
				if(row["BuyNumber"]!=null && row["BuyNumber"].ToString()!="")
				{
					model.BuyNumber=int.Parse(row["BuyNumber"].ToString());
				}
				if(row["Price"]!=null && row["Price"].ToString()!="")
				{
					model.Price=decimal.Parse(row["Price"].ToString());
				}
				if(row["UserName"]!=null)
				{
					model.UserName=row["UserName"].ToString();
				}
				if(row["Telephone"]!=null)
				{
					model.Telephone=row["Telephone"].ToString();
				}
				if(row["Province"]!=null)
				{
					model.Province=row["Province"].ToString();
				}
				if(row["City"]!=null)
				{
					model.City=row["City"].ToString();
				}
				if(row["District"]!=null)
				{
					model.District=row["District"].ToString();
				}
				if(row["Address"]!=null)
				{
					model.Address=row["Address"].ToString();
				}
				if(row["PayDateTime"]!=null && row["PayDateTime"].ToString()!="")
				{
					model.PayDateTime=DateTime.Parse(row["PayDateTime"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["OrderType"]!=null && row["OrderType"].ToString()!="")
				{
					model.OrderType=int.Parse(row["OrderType"].ToString());
				}
				if(row["IsPay"]!=null && row["IsPay"].ToString()!="")
				{
					model.IsPay=int.Parse(row["IsPay"].ToString());
				}
				if(row["CreateOrderDate"]!=null && row["CreateOrderDate"].ToString()!="")
				{
					model.CreateOrderDate=DateTime.Parse(row["CreateOrderDate"].ToString());
				}
				if(row["Remark"]!=null)
				{
					model.Remark=row["Remark"].ToString();
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
			strSql.Append("select Id,GoodId,OpenId,Tradeno,BuyNumber,Price,UserName,Telephone,Province,City,District,Address,PayDateTime,IsAct,OrderType,IsPay,CreateOrderDate,Remark ");
			strSql.Append(" FROM WX_PayOrder ");
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
			strSql.Append(" Id,GoodId,OpenId,Tradeno,BuyNumber,Price,UserName,Telephone,Province,City,District,Address,PayDateTime,IsAct,OrderType,IsPay,CreateOrderDate,Remark ");
			strSql.Append(" FROM WX_PayOrder ");
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
			strSql.Append("select count(1) FROM WX_PayOrder ");
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
			strSql.Append(")AS Row, T.*  from WX_PayOrder T ");
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
			parameters[0].Value = "WX_PayOrder";
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

