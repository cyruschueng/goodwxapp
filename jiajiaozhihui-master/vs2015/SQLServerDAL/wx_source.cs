using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_source
	/// </summary>
	public partial class wx_source:Iwx_source
	{
		public wx_source()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_source"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_source");
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
		public int Add(SfSoft.Model.wx_source model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_source(");
			strSql.Append("title,intro,detail,create_date,modify_date,expert_id,img_src,small_img_src,remark,is_act)");
			strSql.Append(" values (");
			strSql.Append("@title,@intro,@detail,@create_date,@modify_date,@expert_id,@img_src,@small_img_src,@remark,@is_act)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@title", SqlDbType.NVarChar,200),
					new SqlParameter("@intro", SqlDbType.NVarChar,4000),
					new SqlParameter("@detail", SqlDbType.NText),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@modify_date", SqlDbType.DateTime),
					new SqlParameter("@expert_id", SqlDbType.NVarChar,100),
					new SqlParameter("@img_src", SqlDbType.NVarChar,500),
					new SqlParameter("@small_img_src", SqlDbType.NVarChar,500),
					new SqlParameter("@remark", SqlDbType.NText),
					new SqlParameter("@is_act", SqlDbType.Int,4)};
			parameters[0].Value = model.title;
			parameters[1].Value = model.intro;
			parameters[2].Value = model.detail;
			parameters[3].Value = model.create_date;
			parameters[4].Value = model.modify_date;
			parameters[5].Value = model.expert_id;
			parameters[6].Value = model.img_src;
			parameters[7].Value = model.small_img_src;
			parameters[8].Value = model.remark;
			parameters[9].Value = model.is_act;

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
		public bool Update(SfSoft.Model.wx_source model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_source set ");
			strSql.Append("title=@title,");
			strSql.Append("intro=@intro,");
			strSql.Append("detail=@detail,");
			strSql.Append("create_date=@create_date,");
			strSql.Append("modify_date=@modify_date,");
			strSql.Append("expert_id=@expert_id,");
			strSql.Append("img_src=@img_src,");
			strSql.Append("small_img_src=@small_img_src,");
			strSql.Append("remark=@remark,");
			strSql.Append("is_act=@is_act");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@title", SqlDbType.NVarChar,200),
					new SqlParameter("@intro", SqlDbType.NVarChar,4000),
					new SqlParameter("@detail", SqlDbType.NText),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@modify_date", SqlDbType.DateTime),
					new SqlParameter("@expert_id", SqlDbType.NVarChar,100),
					new SqlParameter("@img_src", SqlDbType.NVarChar,500),
					new SqlParameter("@small_img_src", SqlDbType.NVarChar,500),
					new SqlParameter("@remark", SqlDbType.NText),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.title;
			parameters[1].Value = model.intro;
			parameters[2].Value = model.detail;
			parameters[3].Value = model.create_date;
			parameters[4].Value = model.modify_date;
			parameters[5].Value = model.expert_id;
			parameters[6].Value = model.img_src;
			parameters[7].Value = model.small_img_src;
			parameters[8].Value = model.remark;
			parameters[9].Value = model.is_act;
			parameters[10].Value = model.id;

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
			strSql.Append("delete from wx_source ");
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
			strSql.Append("delete from wx_source ");
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
		public SfSoft.Model.wx_source GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,title,intro,detail,create_date,modify_date,expert_id,img_src,small_img_src,remark,is_act from wx_source ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_source model=new SfSoft.Model.wx_source();
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
		public SfSoft.Model.wx_source DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_source model=new SfSoft.Model.wx_source();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["title"]!=null)
				{
					model.title=row["title"].ToString();
				}
				if(row["intro"]!=null)
				{
					model.intro=row["intro"].ToString();
				}
				if(row["detail"]!=null)
				{
					model.detail=row["detail"].ToString();
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
				if(row["modify_date"]!=null && row["modify_date"].ToString()!="")
				{
					model.modify_date=DateTime.Parse(row["modify_date"].ToString());
				}
				if(row["expert_id"]!=null)
				{
					model.expert_id=row["expert_id"].ToString();
				}
				if(row["img_src"]!=null)
				{
					model.img_src=row["img_src"].ToString();
				}
				if(row["small_img_src"]!=null)
				{
					model.small_img_src=row["small_img_src"].ToString();
				}
				if(row["remark"]!=null)
				{
					model.remark=row["remark"].ToString();
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
			strSql.Append("select id,title,intro,detail,create_date,modify_date,expert_id,img_src,small_img_src,remark,is_act ");
			strSql.Append(" FROM wx_source ");
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
			strSql.Append(" id,title,intro,detail,create_date,modify_date,expert_id,img_src,small_img_src,remark,is_act ");
			strSql.Append(" FROM wx_source ");
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
			strSql.Append("select count(1) FROM wx_source ");
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
			strSql.Append(")AS Row, T.*  from wx_source T ");
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
			parameters[0].Value = "wx_source";
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

