using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_NativePay
	/// </summary>
	public partial class WX_NativePay:IWX_NativePay
	{
		public WX_NativePay()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "WX_NativePay"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_NativePay");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_NativePay model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_NativePay(");
			strSql.Append("product_name,product_id,body,detail,attach,out_trade_no,total_fee,time_expire,goods_tag,spbill_create_ip,notify_url,trade_type,create_date,isact)");
			strSql.Append(" values (");
			strSql.Append("@product_name,@product_id,@body,@detail,@attach,@out_trade_no,@total_fee,@time_expire,@goods_tag,@spbill_create_ip,@notify_url,@trade_type,@create_date,@isact)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@product_name", SqlDbType.VarChar,300),
					new SqlParameter("@product_id", SqlDbType.VarChar,32),
					new SqlParameter("@body", SqlDbType.VarChar,128),
					new SqlParameter("@detail", SqlDbType.VarChar,6000),
					new SqlParameter("@attach", SqlDbType.VarChar,127),
					new SqlParameter("@out_trade_no", SqlDbType.VarChar,32),
					new SqlParameter("@total_fee", SqlDbType.Int,4),
					new SqlParameter("@time_expire", SqlDbType.Int,4),
					new SqlParameter("@goods_tag", SqlDbType.VarChar,32),
					new SqlParameter("@spbill_create_ip", SqlDbType.VarChar,16),
					new SqlParameter("@notify_url", SqlDbType.VarChar,256),
					new SqlParameter("@trade_type", SqlDbType.VarChar,16),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@isact", SqlDbType.Int,4)};
			parameters[0].Value = model.product_name;
			parameters[1].Value = model.product_id;
			parameters[2].Value = model.body;
			parameters[3].Value = model.detail;
			parameters[4].Value = model.attach;
			parameters[5].Value = model.out_trade_no;
			parameters[6].Value = model.total_fee;
			parameters[7].Value = model.time_expire;
			parameters[8].Value = model.goods_tag;
			parameters[9].Value = model.spbill_create_ip;
			parameters[10].Value = model.notify_url;
			parameters[11].Value = model.trade_type;
			parameters[12].Value = model.create_date;
			parameters[13].Value = model.isact;

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
		public bool Update(SfSoft.Model.WX_NativePay model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_NativePay set ");
			strSql.Append("product_name=@product_name,");
			strSql.Append("product_id=@product_id,");
			strSql.Append("body=@body,");
			strSql.Append("detail=@detail,");
			strSql.Append("attach=@attach,");
			strSql.Append("out_trade_no=@out_trade_no,");
			strSql.Append("total_fee=@total_fee,");
			strSql.Append("time_expire=@time_expire,");
			strSql.Append("goods_tag=@goods_tag,");
			strSql.Append("spbill_create_ip=@spbill_create_ip,");
			strSql.Append("notify_url=@notify_url,");
			strSql.Append("trade_type=@trade_type,");
			strSql.Append("create_date=@create_date,");
			strSql.Append("isact=@isact");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@product_name", SqlDbType.VarChar,300),
					new SqlParameter("@product_id", SqlDbType.VarChar,32),
					new SqlParameter("@body", SqlDbType.VarChar,128),
					new SqlParameter("@detail", SqlDbType.VarChar,6000),
					new SqlParameter("@attach", SqlDbType.VarChar,127),
					new SqlParameter("@out_trade_no", SqlDbType.VarChar,32),
					new SqlParameter("@total_fee", SqlDbType.Int,4),
					new SqlParameter("@time_expire", SqlDbType.Int,4),
					new SqlParameter("@goods_tag", SqlDbType.VarChar,32),
					new SqlParameter("@spbill_create_ip", SqlDbType.VarChar,16),
					new SqlParameter("@notify_url", SqlDbType.VarChar,256),
					new SqlParameter("@trade_type", SqlDbType.VarChar,16),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@isact", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.product_name;
			parameters[1].Value = model.product_id;
			parameters[2].Value = model.body;
			parameters[3].Value = model.detail;
			parameters[4].Value = model.attach;
			parameters[5].Value = model.out_trade_no;
			parameters[6].Value = model.total_fee;
			parameters[7].Value = model.time_expire;
			parameters[8].Value = model.goods_tag;
			parameters[9].Value = model.spbill_create_ip;
			parameters[10].Value = model.notify_url;
			parameters[11].Value = model.trade_type;
			parameters[12].Value = model.create_date;
			parameters[13].Value = model.isact;
			parameters[14].Value = model.id;

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
		public bool Delete(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_NativePay ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

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
		public bool DeleteList(string idlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_NativePay ");
			strSql.Append(" where id in ("+idlist + ")  ");
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
		public SfSoft.Model.WX_NativePay GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,product_name,product_id,body,detail,attach,out_trade_no,total_fee,time_expire,goods_tag,spbill_create_ip,notify_url,trade_type,create_date,isact from WX_NativePay ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.WX_NativePay model=new SfSoft.Model.WX_NativePay();
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
		public SfSoft.Model.WX_NativePay DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_NativePay model=new SfSoft.Model.WX_NativePay();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["product_name"]!=null)
				{
					model.product_name=row["product_name"].ToString();
				}
				if(row["product_id"]!=null)
				{
					model.product_id=row["product_id"].ToString();
				}
				if(row["body"]!=null)
				{
					model.body=row["body"].ToString();
				}
				if(row["detail"]!=null)
				{
					model.detail=row["detail"].ToString();
				}
				if(row["attach"]!=null)
				{
					model.attach=row["attach"].ToString();
				}
				if(row["out_trade_no"]!=null)
				{
					model.out_trade_no=row["out_trade_no"].ToString();
				}
				if(row["total_fee"]!=null && row["total_fee"].ToString()!="")
				{
					model.total_fee=int.Parse(row["total_fee"].ToString());
				}
				if(row["time_expire"]!=null && row["time_expire"].ToString()!="")
				{
					model.time_expire=int.Parse(row["time_expire"].ToString());
				}
				if(row["goods_tag"]!=null)
				{
					model.goods_tag=row["goods_tag"].ToString();
				}
				if(row["spbill_create_ip"]!=null)
				{
					model.spbill_create_ip=row["spbill_create_ip"].ToString();
				}
				if(row["notify_url"]!=null)
				{
					model.notify_url=row["notify_url"].ToString();
				}
				if(row["trade_type"]!=null)
				{
					model.trade_type=row["trade_type"].ToString();
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
				if(row["isact"]!=null && row["isact"].ToString()!="")
				{
					model.isact=int.Parse(row["isact"].ToString());
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
			strSql.Append("select id,product_name,product_id,body,detail,attach,out_trade_no,total_fee,time_expire,goods_tag,spbill_create_ip,notify_url,trade_type,create_date,isact ");
			strSql.Append(" FROM WX_NativePay ");
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
			strSql.Append(" id,product_name,product_id,body,detail,attach,out_trade_no,total_fee,time_expire,goods_tag,spbill_create_ip,notify_url,trade_type,create_date,isact ");
			strSql.Append(" FROM WX_NativePay ");
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
			strSql.Append("select count(1) FROM WX_NativePay ");
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
				strSql.Append("order by T.id desc");
			}
			strSql.Append(")AS Row, T.*  from WX_NativePay T ");
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
			parameters[0].Value = "WX_NativePay";
			parameters[1].Value = "id";
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

