using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_habit_comment
	/// </summary>
	public partial class wx_habit_comment:Iwx_habit_comment
	{
		public wx_habit_comment()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_habit_comment"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_habit_comment");
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
		public int Add(SfSoft.Model.wx_habit_comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_habit_comment(");
			strSql.Append("appid,habit_id,habit_detail_id,openid,comment_openid,comment,create_date,is_act,group_id)");
			strSql.Append(" values (");
			strSql.Append("@appid,@habit_id,@habit_detail_id,@openid,@comment_openid,@comment,@create_date,@is_act,@group_id)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@appid", SqlDbType.NVarChar,100),
					new SqlParameter("@habit_id", SqlDbType.Int,4),
					new SqlParameter("@habit_detail_id", SqlDbType.Int,4),
					new SqlParameter("@openid", SqlDbType.NVarChar,200),
					new SqlParameter("@comment_openid", SqlDbType.NVarChar,200),
					new SqlParameter("@comment", SqlDbType.NVarChar,4000),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@group_id", SqlDbType.Int,4)};
			parameters[0].Value = model.appid;
			parameters[1].Value = model.habit_id;
			parameters[2].Value = model.habit_detail_id;
			parameters[3].Value = model.openid;
			parameters[4].Value = model.comment_openid;
			parameters[5].Value = model.comment;
			parameters[6].Value = model.create_date;
			parameters[7].Value = model.is_act;
			parameters[8].Value = model.group_id;

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
		public bool Update(SfSoft.Model.wx_habit_comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_habit_comment set ");
			strSql.Append("appid=@appid,");
			strSql.Append("habit_id=@habit_id,");
			strSql.Append("habit_detail_id=@habit_detail_id,");
			strSql.Append("openid=@openid,");
			strSql.Append("comment_openid=@comment_openid,");
			strSql.Append("comment=@comment,");
			strSql.Append("create_date=@create_date,");
			strSql.Append("is_act=@is_act,");
			strSql.Append("group_id=@group_id");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@appid", SqlDbType.NVarChar,100),
					new SqlParameter("@habit_id", SqlDbType.Int,4),
					new SqlParameter("@habit_detail_id", SqlDbType.Int,4),
					new SqlParameter("@openid", SqlDbType.NVarChar,200),
					new SqlParameter("@comment_openid", SqlDbType.NVarChar,200),
					new SqlParameter("@comment", SqlDbType.NVarChar,4000),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@group_id", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.appid;
			parameters[1].Value = model.habit_id;
			parameters[2].Value = model.habit_detail_id;
			parameters[3].Value = model.openid;
			parameters[4].Value = model.comment_openid;
			parameters[5].Value = model.comment;
			parameters[6].Value = model.create_date;
			parameters[7].Value = model.is_act;
			parameters[8].Value = model.group_id;
			parameters[9].Value = model.id;

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
			strSql.Append("delete from wx_habit_comment ");
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
			strSql.Append("delete from wx_habit_comment ");
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
		public SfSoft.Model.wx_habit_comment GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,appid,habit_id,habit_detail_id,openid,comment_openid,comment,create_date,is_act,group_id from wx_habit_comment ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_habit_comment model=new SfSoft.Model.wx_habit_comment();
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
		public SfSoft.Model.wx_habit_comment DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_habit_comment model=new SfSoft.Model.wx_habit_comment();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["appid"]!=null)
				{
					model.appid=row["appid"].ToString();
				}
				if(row["habit_id"]!=null && row["habit_id"].ToString()!="")
				{
					model.habit_id=int.Parse(row["habit_id"].ToString());
				}
				if(row["habit_detail_id"]!=null && row["habit_detail_id"].ToString()!="")
				{
					model.habit_detail_id=int.Parse(row["habit_detail_id"].ToString());
				}
				if(row["openid"]!=null)
				{
					model.openid=row["openid"].ToString();
				}
				if(row["comment_openid"]!=null)
				{
					model.comment_openid=row["comment_openid"].ToString();
				}
				if(row["comment"]!=null)
				{
					model.comment=row["comment"].ToString();
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
				if(row["is_act"]!=null && row["is_act"].ToString()!="")
				{
					model.is_act=int.Parse(row["is_act"].ToString());
				}
				if(row["group_id"]!=null && row["group_id"].ToString()!="")
				{
					model.group_id=int.Parse(row["group_id"].ToString());
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
			strSql.Append("select id,appid,habit_id,habit_detail_id,openid,comment_openid,comment,create_date,is_act,group_id ");
			strSql.Append(" FROM wx_habit_comment ");
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
			strSql.Append(" id,appid,habit_id,habit_detail_id,openid,comment_openid,comment,create_date,is_act,group_id ");
			strSql.Append(" FROM wx_habit_comment ");
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
			strSql.Append("select count(1) FROM wx_habit_comment ");
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
			strSql.Append(")AS Row, T.*  from wx_habit_comment T ");
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
			parameters[0].Value = "wx_habit_comment";
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

