using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_comments
	/// </summary>
	public partial class wx_comments:Iwx_comments
	{
		public wx_comments()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_comments"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_comments");
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
		public int Add(SfSoft.Model.wx_comments model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_comments(");
			strSql.Append("pid,appid,modules,relation_id,message,sender,sender_nickname,sender_headimage,replier,replier_nickname,replier_headimage,imgs,create_date,like_quantity,is_act)");
			strSql.Append(" values (");
			strSql.Append("@pid,@appid,@modules,@relation_id,@message,@sender,@sender_nickname,@sender_headimage,@replier,@replier_nickname,@replier_headimage,@imgs,@create_date,@like_quantity,@is_act)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@pid", SqlDbType.Int,4),
					new SqlParameter("@appid", SqlDbType.NVarChar,100),
					new SqlParameter("@modules", SqlDbType.NVarChar,100),
					new SqlParameter("@relation_id", SqlDbType.Int,4),
					new SqlParameter("@message", SqlDbType.NVarChar,4000),
					new SqlParameter("@sender", SqlDbType.NVarChar,100),
					new SqlParameter("@sender_nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@sender_headimage", SqlDbType.NVarChar,300),
					new SqlParameter("@replier", SqlDbType.NVarChar,100),
					new SqlParameter("@replier_nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@replier_headimage", SqlDbType.NVarChar,300),
					new SqlParameter("@imgs", SqlDbType.NVarChar,4000),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@like_quantity", SqlDbType.Int,4),
					new SqlParameter("@is_act", SqlDbType.Int,4)};
			parameters[0].Value = model.pid;
			parameters[1].Value = model.appid;
			parameters[2].Value = model.modules;
			parameters[3].Value = model.relation_id;
			parameters[4].Value = model.message;
			parameters[5].Value = model.sender;
			parameters[6].Value = model.sender_nickname;
			parameters[7].Value = model.sender_headimage;
			parameters[8].Value = model.replier;
			parameters[9].Value = model.replier_nickname;
			parameters[10].Value = model.replier_headimage;
			parameters[11].Value = model.imgs;
			parameters[12].Value = model.create_date;
			parameters[13].Value = model.like_quantity;
			parameters[14].Value = model.is_act;

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
		public bool Update(SfSoft.Model.wx_comments model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_comments set ");
			strSql.Append("pid=@pid,");
			strSql.Append("appid=@appid,");
			strSql.Append("modules=@modules,");
			strSql.Append("relation_id=@relation_id,");
			strSql.Append("message=@message,");
			strSql.Append("sender=@sender,");
			strSql.Append("sender_nickname=@sender_nickname,");
			strSql.Append("sender_headimage=@sender_headimage,");
			strSql.Append("replier=@replier,");
			strSql.Append("replier_nickname=@replier_nickname,");
			strSql.Append("replier_headimage=@replier_headimage,");
			strSql.Append("imgs=@imgs,");
			strSql.Append("create_date=@create_date,");
			strSql.Append("like_quantity=@like_quantity,");
			strSql.Append("is_act=@is_act");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@pid", SqlDbType.Int,4),
					new SqlParameter("@appid", SqlDbType.NVarChar,100),
					new SqlParameter("@modules", SqlDbType.NVarChar,100),
					new SqlParameter("@relation_id", SqlDbType.Int,4),
					new SqlParameter("@message", SqlDbType.NVarChar,4000),
					new SqlParameter("@sender", SqlDbType.NVarChar,100),
					new SqlParameter("@sender_nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@sender_headimage", SqlDbType.NVarChar,300),
					new SqlParameter("@replier", SqlDbType.NVarChar,100),
					new SqlParameter("@replier_nickname", SqlDbType.NVarChar,100),
					new SqlParameter("@replier_headimage", SqlDbType.NVarChar,300),
					new SqlParameter("@imgs", SqlDbType.NVarChar,4000),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@like_quantity", SqlDbType.Int,4),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.pid;
			parameters[1].Value = model.appid;
			parameters[2].Value = model.modules;
			parameters[3].Value = model.relation_id;
			parameters[4].Value = model.message;
			parameters[5].Value = model.sender;
			parameters[6].Value = model.sender_nickname;
			parameters[7].Value = model.sender_headimage;
			parameters[8].Value = model.replier;
			parameters[9].Value = model.replier_nickname;
			parameters[10].Value = model.replier_headimage;
			parameters[11].Value = model.imgs;
			parameters[12].Value = model.create_date;
			parameters[13].Value = model.like_quantity;
			parameters[14].Value = model.is_act;
			parameters[15].Value = model.id;

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
			strSql.Append("delete from wx_comments ");
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
			strSql.Append("delete from wx_comments ");
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
		public SfSoft.Model.wx_comments GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,pid,appid,modules,relation_id,message,sender,sender_nickname,sender_headimage,replier,replier_nickname,replier_headimage,imgs,create_date,like_quantity,is_act from wx_comments ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_comments model=new SfSoft.Model.wx_comments();
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
		public SfSoft.Model.wx_comments DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_comments model=new SfSoft.Model.wx_comments();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["pid"]!=null && row["pid"].ToString()!="")
				{
					model.pid=int.Parse(row["pid"].ToString());
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
				if(row["message"]!=null)
				{
					model.message=row["message"].ToString();
				}
				if(row["sender"]!=null)
				{
					model.sender=row["sender"].ToString();
				}
				if(row["sender_nickname"]!=null)
				{
					model.sender_nickname=row["sender_nickname"].ToString();
				}
				if(row["sender_headimage"]!=null)
				{
					model.sender_headimage=row["sender_headimage"].ToString();
				}
				if(row["replier"]!=null)
				{
					model.replier=row["replier"].ToString();
				}
				if(row["replier_nickname"]!=null)
				{
					model.replier_nickname=row["replier_nickname"].ToString();
				}
				if(row["replier_headimage"]!=null)
				{
					model.replier_headimage=row["replier_headimage"].ToString();
				}
				if(row["imgs"]!=null)
				{
					model.imgs=row["imgs"].ToString();
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
				if(row["like_quantity"]!=null && row["like_quantity"].ToString()!="")
				{
					model.like_quantity=int.Parse(row["like_quantity"].ToString());
				}
				if(row["is_act"]!=null && row["is_act"].ToString()!="")
				{
					model.is_act=int.Parse(row["is_act"].ToString());
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
			strSql.Append("select id,pid,appid,modules,relation_id,message,sender,sender_nickname,sender_headimage,replier,replier_nickname,replier_headimage,imgs,create_date,like_quantity,is_act ");
			strSql.Append(" FROM wx_comments ");
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
			strSql.Append(" id,pid,appid,modules,relation_id,message,sender,sender_nickname,sender_headimage,replier,replier_nickname,replier_headimage,imgs,create_date,like_quantity,is_act ");
			strSql.Append(" FROM wx_comments ");
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
			strSql.Append("select count(1) FROM wx_comments ");
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
			strSql.Append(")AS Row, T.*  from wx_comments T ");
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
			parameters[0].Value = "wx_comments";
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

