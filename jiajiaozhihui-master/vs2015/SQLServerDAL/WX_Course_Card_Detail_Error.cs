using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Card_Detail_Error
	/// </summary>
	public partial class WX_Course_Card_Detail_Error:IWX_Course_Card_Detail_Error
	{
		public WX_Course_Card_Detail_Error()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Card_Detail_Error"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Card_Detail_Error");
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
		public int Add(SfSoft.Model.WX_Course_Card_Detail_Error model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Card_Detail_Error(");
			strSql.Append("CardId,CardType,CardNo,OpenId,IpAddress,RegistDate,IsAct,IsAgree,AgreeDate)");
			strSql.Append(" values (");
			strSql.Append("@CardId,@CardType,@CardNo,@OpenId,@IpAddress,@RegistDate,@IsAct,@IsAgree,@AgreeDate)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@CardId", SqlDbType.Int,4),
					new SqlParameter("@CardType", SqlDbType.Int,4),
					new SqlParameter("@CardNo", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@IpAddress", SqlDbType.NVarChar,100),
					new SqlParameter("@RegistDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@IsAgree", SqlDbType.Int,4),
					new SqlParameter("@AgreeDate", SqlDbType.DateTime)};
			parameters[0].Value = model.CardId;
			parameters[1].Value = model.CardType;
			parameters[2].Value = model.CardNo;
			parameters[3].Value = model.OpenId;
			parameters[4].Value = model.IpAddress;
			parameters[5].Value = model.RegistDate;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.IsAgree;
			parameters[8].Value = model.AgreeDate;

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
		public bool Update(SfSoft.Model.WX_Course_Card_Detail_Error model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Card_Detail_Error set ");
			strSql.Append("CardId=@CardId,");
			strSql.Append("CardType=@CardType,");
			strSql.Append("CardNo=@CardNo,");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("IpAddress=@IpAddress,");
			strSql.Append("RegistDate=@RegistDate,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("IsAgree=@IsAgree,");
			strSql.Append("AgreeDate=@AgreeDate");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@CardId", SqlDbType.Int,4),
					new SqlParameter("@CardType", SqlDbType.Int,4),
					new SqlParameter("@CardNo", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@IpAddress", SqlDbType.NVarChar,100),
					new SqlParameter("@RegistDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@IsAgree", SqlDbType.Int,4),
					new SqlParameter("@AgreeDate", SqlDbType.DateTime),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.CardId;
			parameters[1].Value = model.CardType;
			parameters[2].Value = model.CardNo;
			parameters[3].Value = model.OpenId;
			parameters[4].Value = model.IpAddress;
			parameters[5].Value = model.RegistDate;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.IsAgree;
			parameters[8].Value = model.AgreeDate;
			parameters[9].Value = model.Id;

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
			strSql.Append("delete from WX_Course_Card_Detail_Error ");
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
			strSql.Append("delete from WX_Course_Card_Detail_Error ");
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
		public SfSoft.Model.WX_Course_Card_Detail_Error GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,CardId,CardType,CardNo,OpenId,IpAddress,RegistDate,IsAct,IsAgree,AgreeDate from WX_Course_Card_Detail_Error ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Card_Detail_Error model=new SfSoft.Model.WX_Course_Card_Detail_Error();
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
		public SfSoft.Model.WX_Course_Card_Detail_Error DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Card_Detail_Error model=new SfSoft.Model.WX_Course_Card_Detail_Error();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["CardId"]!=null && row["CardId"].ToString()!="")
				{
					model.CardId=int.Parse(row["CardId"].ToString());
				}
				if(row["CardType"]!=null && row["CardType"].ToString()!="")
				{
					model.CardType=int.Parse(row["CardType"].ToString());
				}
				if(row["CardNo"]!=null && row["CardNo"].ToString()!="")
				{
					model.CardNo=int.Parse(row["CardNo"].ToString());
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["IpAddress"]!=null)
				{
					model.IpAddress=row["IpAddress"].ToString();
				}
				if(row["RegistDate"]!=null && row["RegistDate"].ToString()!="")
				{
					model.RegistDate=DateTime.Parse(row["RegistDate"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["IsAgree"]!=null && row["IsAgree"].ToString()!="")
				{
					model.IsAgree=int.Parse(row["IsAgree"].ToString());
				}
				if(row["AgreeDate"]!=null && row["AgreeDate"].ToString()!="")
				{
					model.AgreeDate=DateTime.Parse(row["AgreeDate"].ToString());
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
			strSql.Append("select Id,CardId,CardType,CardNo,OpenId,IpAddress,RegistDate,IsAct,IsAgree,AgreeDate ");
			strSql.Append(" FROM WX_Course_Card_Detail_Error ");
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
			strSql.Append(" Id,CardId,CardType,CardNo,OpenId,IpAddress,RegistDate,IsAct,IsAgree,AgreeDate ");
			strSql.Append(" FROM WX_Course_Card_Detail_Error ");
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
			strSql.Append("select count(1) FROM WX_Course_Card_Detail_Error ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Card_Detail_Error T ");
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
			parameters[0].Value = "WX_Course_Card_Detail_Error";
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

