using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Template_Msg
	/// </summary>
	public partial class WX_Template_Msg:IWX_Template_Msg
	{
		public WX_Template_Msg()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Template_Msg"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Template_Msg");
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
		public int Add(SfSoft.Model.WX_Template_Msg model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Template_Msg(");
			strSql.Append("First,Item,Remark,Link,SendDate,IsSend,IsAct,CreateDate,TempId,Title)");
			strSql.Append(" values (");
			strSql.Append("@First,@Item,@Remark,@Link,@SendDate,@IsSend,@IsAct,@CreateDate,@TempId,@Title)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@First", SqlDbType.VarChar,1000),
					new SqlParameter("@Item", SqlDbType.VarChar,4000),
					new SqlParameter("@Remark", SqlDbType.VarChar,1000),
					new SqlParameter("@Link", SqlDbType.VarChar,1000),
					new SqlParameter("@SendDate", SqlDbType.DateTime),
					new SqlParameter("@IsSend", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@TempId", SqlDbType.VarChar,200),
					new SqlParameter("@Title", SqlDbType.VarChar,200)};
			parameters[0].Value = model.First;
			parameters[1].Value = model.Item;
			parameters[2].Value = model.Remark;
			parameters[3].Value = model.Link;
			parameters[4].Value = model.SendDate;
			parameters[5].Value = model.IsSend;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.TempId;
			parameters[9].Value = model.Title;

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
		public bool Update(SfSoft.Model.WX_Template_Msg model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Template_Msg set ");
			strSql.Append("First=@First,");
			strSql.Append("Item=@Item,");
			strSql.Append("Remark=@Remark,");
			strSql.Append("Link=@Link,");
			strSql.Append("SendDate=@SendDate,");
			strSql.Append("IsSend=@IsSend,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("TempId=@TempId,");
			strSql.Append("Title=@Title");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@First", SqlDbType.VarChar,1000),
					new SqlParameter("@Item", SqlDbType.VarChar,4000),
					new SqlParameter("@Remark", SqlDbType.VarChar,1000),
					new SqlParameter("@Link", SqlDbType.VarChar,1000),
					new SqlParameter("@SendDate", SqlDbType.DateTime),
					new SqlParameter("@IsSend", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@TempId", SqlDbType.VarChar,200),
					new SqlParameter("@Title", SqlDbType.VarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.First;
			parameters[1].Value = model.Item;
			parameters[2].Value = model.Remark;
			parameters[3].Value = model.Link;
			parameters[4].Value = model.SendDate;
			parameters[5].Value = model.IsSend;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.TempId;
			parameters[9].Value = model.Title;
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
			strSql.Append("delete from WX_Template_Msg ");
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
			strSql.Append("delete from WX_Template_Msg ");
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
		public SfSoft.Model.WX_Template_Msg GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,First,Item,Remark,Link,SendDate,IsSend,IsAct,CreateDate,TempId,Title from WX_Template_Msg ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Template_Msg model=new SfSoft.Model.WX_Template_Msg();
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
		public SfSoft.Model.WX_Template_Msg DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Template_Msg model=new SfSoft.Model.WX_Template_Msg();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["First"]!=null)
				{
					model.First=row["First"].ToString();
				}
				if(row["Item"]!=null)
				{
					model.Item=row["Item"].ToString();
				}
				if(row["Remark"]!=null)
				{
					model.Remark=row["Remark"].ToString();
				}
				if(row["Link"]!=null)
				{
					model.Link=row["Link"].ToString();
				}
				if(row["SendDate"]!=null && row["SendDate"].ToString()!="")
				{
					model.SendDate=DateTime.Parse(row["SendDate"].ToString());
				}
				if(row["IsSend"]!=null && row["IsSend"].ToString()!="")
				{
					model.IsSend=int.Parse(row["IsSend"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["TempId"]!=null)
				{
					model.TempId=row["TempId"].ToString();
				}
				if(row["Title"]!=null)
				{
					model.Title=row["Title"].ToString();
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
			strSql.Append("select Id,First,Item,Remark,Link,SendDate,IsSend,IsAct,CreateDate,TempId,Title ");
			strSql.Append(" FROM WX_Template_Msg ");
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
			strSql.Append(" Id,First,Item,Remark,Link,SendDate,IsSend,IsAct,CreateDate,TempId,Title ");
			strSql.Append(" FROM WX_Template_Msg ");
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
			strSql.Append("select count(1) FROM WX_Template_Msg ");
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
			strSql.Append(")AS Row, T.*  from WX_Template_Msg T ");
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
			parameters[0].Value = "WX_Template_Msg";
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

