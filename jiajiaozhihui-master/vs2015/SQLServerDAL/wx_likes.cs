using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_likes
	/// </summary>
	public partial class wx_likes:Iwx_likes
	{
		public wx_likes()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_likes"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_likes");
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
		public int Add(SfSoft.Model.wx_likes model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_likes(");
			strSql.Append("appid,modules,relation_id,liker,liker_nickname,liker_headimage,create_date)");
			strSql.Append(" values (");
			strSql.Append("@appid,@modules,@relation_id,@liker,@liker_nickname,@liker_headimage,@create_date)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@appid", SqlDbType.NVarChar,100),
					new SqlParameter("@modules", SqlDbType.NVarChar,100),
					new SqlParameter("@relation_id", SqlDbType.Int,4),
					new SqlParameter("@liker", SqlDbType.NVarChar,100),
					new SqlParameter("@liker_nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@liker_headimage", SqlDbType.NVarChar,300),
					new SqlParameter("@create_date", SqlDbType.DateTime)};
			parameters[0].Value = model.appid;
			parameters[1].Value = model.modules;
			parameters[2].Value = model.relation_id;
			parameters[3].Value = model.liker;
			parameters[4].Value = model.liker_nickname;
			parameters[5].Value = model.liker_headimage;
			parameters[6].Value = model.create_date;

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
		public bool Update(SfSoft.Model.wx_likes model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_likes set ");
			strSql.Append("appid=@appid,");
			strSql.Append("modules=@modules,");
			strSql.Append("relation_id=@relation_id,");
			strSql.Append("liker=@liker,");
			strSql.Append("liker_nickname=@liker_nickname,");
			strSql.Append("liker_headimage=@liker_headimage,");
			strSql.Append("create_date=@create_date");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@appid", SqlDbType.NVarChar,100),
					new SqlParameter("@modules", SqlDbType.NVarChar,100),
					new SqlParameter("@relation_id", SqlDbType.Int,4),
					new SqlParameter("@liker", SqlDbType.NVarChar,100),
					new SqlParameter("@liker_nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@liker_headimage", SqlDbType.NVarChar,300),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.appid;
			parameters[1].Value = model.modules;
			parameters[2].Value = model.relation_id;
			parameters[3].Value = model.liker;
			parameters[4].Value = model.liker_nickname;
			parameters[5].Value = model.liker_headimage;
			parameters[6].Value = model.create_date;
			parameters[7].Value = model.id;

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
			strSql.Append("delete from wx_likes ");
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
			strSql.Append("delete from wx_likes ");
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
		public SfSoft.Model.wx_likes GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,appid,modules,relation_id,liker,liker_nickname,liker_headimage,create_date from wx_likes ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_likes model=new SfSoft.Model.wx_likes();
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
		public SfSoft.Model.wx_likes DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_likes model=new SfSoft.Model.wx_likes();
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
				if(row["modules"]!=null)
				{
					model.modules=row["modules"].ToString();
				}
				if(row["relation_id"]!=null && row["relation_id"].ToString()!="")
				{
					model.relation_id=int.Parse(row["relation_id"].ToString());
				}
				if(row["liker"]!=null)
				{
					model.liker=row["liker"].ToString();
				}
				if(row["liker_nickname"]!=null)
				{
					model.liker_nickname=row["liker_nickname"].ToString();
				}
				if(row["liker_headimage"]!=null)
				{
					model.liker_headimage=row["liker_headimage"].ToString();
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
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
			strSql.Append("select id,appid,modules,relation_id,liker,liker_nickname,liker_headimage,create_date ");
			strSql.Append(" FROM wx_likes ");
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
			strSql.Append(" id,appid,modules,relation_id,liker,liker_nickname,liker_headimage,create_date ");
			strSql.Append(" FROM wx_likes ");
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
			strSql.Append("select count(1) FROM wx_likes ");
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
			strSql.Append(")AS Row, T.*  from wx_likes T ");
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
			parameters[0].Value = "wx_likes";
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

