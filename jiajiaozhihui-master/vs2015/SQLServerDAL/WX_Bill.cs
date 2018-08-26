using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Bill
	/// </summary>
	public partial class WX_Bill:IWX_Bill
	{
		public WX_Bill()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Bill"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Bill");
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
		public int Add(SfSoft.Model.WX_Bill model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Bill(");
			strSql.Append("MchId,TradeNo,OrderId,BillType,Amount,PaymentTime,PayType,Remark,CreateDate,OpenId)");
			strSql.Append(" values (");
			strSql.Append("@MchId,@TradeNo,@OrderId,@BillType,@Amount,@PaymentTime,@PayType,@Remark,@CreateDate,@OpenId)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@MchId", SqlDbType.NVarChar,100),
					new SqlParameter("@TradeNo", SqlDbType.NVarChar,100),
					new SqlParameter("@OrderId", SqlDbType.NVarChar,100),
					new SqlParameter("@BillType", SqlDbType.Int,4),
					new SqlParameter("@Amount", SqlDbType.Decimal,9),
					new SqlParameter("@PaymentTime", SqlDbType.DateTime),
					new SqlParameter("@PayType", SqlDbType.Int,4),
					new SqlParameter("@Remark", SqlDbType.NVarChar,300),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@OpenId", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.MchId;
			parameters[1].Value = model.TradeNo;
			parameters[2].Value = model.OrderId;
			parameters[3].Value = model.BillType;
			parameters[4].Value = model.Amount;
			parameters[5].Value = model.PaymentTime;
			parameters[6].Value = model.PayType;
			parameters[7].Value = model.Remark;
			parameters[8].Value = model.CreateDate;
            parameters[9].Value = model.OpenId;

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
		public bool Update(SfSoft.Model.WX_Bill model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Bill set ");
			strSql.Append("MchId=@MchId,");
			strSql.Append("TradeNo=@TradeNo,");
			strSql.Append("OrderId=@OrderId,");
			strSql.Append("BillType=@BillType,");
			strSql.Append("Amount=@Amount,");
			strSql.Append("PaymentTime=@PaymentTime,");
			strSql.Append("PayType=@PayType,");
			strSql.Append("Remark=@Remark,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("OpenId=@OpenId");
            strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@MchId", SqlDbType.NVarChar,100),
					new SqlParameter("@TradeNo", SqlDbType.NVarChar,100),
					new SqlParameter("@OrderId", SqlDbType.NVarChar,100),
					new SqlParameter("@BillType", SqlDbType.Int,4),
					new SqlParameter("@Amount", SqlDbType.Decimal,9),
					new SqlParameter("@PaymentTime", SqlDbType.DateTime),
					new SqlParameter("@PayType", SqlDbType.Int,4),
					new SqlParameter("@Remark", SqlDbType.NVarChar,300),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@OpenId", SqlDbType.NVarChar,200),
                    new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.MchId;
			parameters[1].Value = model.TradeNo;
			parameters[2].Value = model.OrderId;
			parameters[3].Value = model.BillType;
			parameters[4].Value = model.Amount;
			parameters[5].Value = model.PaymentTime;
			parameters[6].Value = model.PayType;
			parameters[7].Value = model.Remark;
			parameters[8].Value = model.CreateDate;
            parameters[9].Value = model.OpenId;
            parameters[10].Value = model.Id;

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
			strSql.Append("delete from WX_Bill ");
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
			strSql.Append("delete from WX_Bill ");
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
		public SfSoft.Model.WX_Bill GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,MchId,TradeNo,OrderId,BillType,Amount,PaymentTime,PayType,Remark,CreateDate,OpenId from WX_Bill ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Bill model=new SfSoft.Model.WX_Bill();
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
		public SfSoft.Model.WX_Bill DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Bill model=new SfSoft.Model.WX_Bill();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["MchId"]!=null)
				{
					model.MchId=row["MchId"].ToString();
				}
				if(row["TradeNo"]!=null)
				{
					model.TradeNo=row["TradeNo"].ToString();
				}
				if(row["OrderId"]!=null)
				{
					model.OrderId=row["OrderId"].ToString();
				}
				if(row["BillType"]!=null && row["BillType"].ToString()!="")
				{
					model.BillType=int.Parse(row["BillType"].ToString());
				}
				if(row["Amount"]!=null && row["Amount"].ToString()!="")
				{
					model.Amount=decimal.Parse(row["Amount"].ToString());
				}
				if(row["PaymentTime"]!=null && row["PaymentTime"].ToString()!="")
				{
					model.PaymentTime=DateTime.Parse(row["PaymentTime"].ToString());
				}
				if(row["PayType"]!=null && row["PayType"].ToString()!="")
				{
					model.PayType=int.Parse(row["PayType"].ToString());
				}
				if(row["Remark"]!=null)
				{
					model.Remark=row["Remark"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["OpenId"] != null)
                {
                    model.OpenId = row["OpenId"].ToString();
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
			strSql.Append("select Id,MchId,TradeNo,OrderId,BillType,Amount,PaymentTime,PayType,Remark,CreateDate,OpenId ");
			strSql.Append(" FROM WX_Bill ");
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
			strSql.Append(" Id,MchId,TradeNo,OrderId,BillType,Amount,PaymentTime,PayType,Remark,CreateDate,OpenId ");
			strSql.Append(" FROM WX_Bill ");
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
			strSql.Append("select count(1) FROM WX_Bill ");
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
			strSql.Append(")AS Row, T.*  from WX_Bill T ");
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
			parameters[0].Value = "WX_Bill";
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

