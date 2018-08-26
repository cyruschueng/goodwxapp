using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_source_list
	/// </summary>
	public partial class wx_source_list:Iwx_source_list
	{
		public wx_source_list()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_source_list"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_source_list");
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
		public int Add(SfSoft.Model.wx_source_list model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_source_list(");
			strSql.Append("source_id,file_title,file_intro,file_size,create_date,modify_date,file_link,img_src,sn,file_type,remark,is_act)");
			strSql.Append(" values (");
			strSql.Append("@source_id,@file_title,@file_intro,@file_size,@create_date,@modify_date,@file_link,@img_src,@sn,@file_type,@remark,@is_act)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@source_id", SqlDbType.Int,4),
					new SqlParameter("@file_title", SqlDbType.NVarChar,200),
					new SqlParameter("@file_intro", SqlDbType.NVarChar,500),
					new SqlParameter("@file_size", SqlDbType.NVarChar,100),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@modify_date", SqlDbType.DateTime),
					new SqlParameter("@file_link", SqlDbType.NVarChar,800),
					new SqlParameter("@img_src", SqlDbType.NVarChar,500),
					new SqlParameter("@sn", SqlDbType.Int,4),
					new SqlParameter("@file_type", SqlDbType.NVarChar,100),
					new SqlParameter("@remark", SqlDbType.NText),
					new SqlParameter("@is_act", SqlDbType.Int,4)};
			parameters[0].Value = model.source_id;
			parameters[1].Value = model.file_title;
			parameters[2].Value = model.file_intro;
			parameters[3].Value = model.file_size;
			parameters[4].Value = model.create_date;
			parameters[5].Value = model.modify_date;
			parameters[6].Value = model.file_link;
			parameters[7].Value = model.img_src;
			parameters[8].Value = model.sn;
			parameters[9].Value = model.file_type;
			parameters[10].Value = model.remark;
			parameters[11].Value = model.is_act;

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
		public bool Update(SfSoft.Model.wx_source_list model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_source_list set ");
			strSql.Append("source_id=@source_id,");
			strSql.Append("file_title=@file_title,");
			strSql.Append("file_intro=@file_intro,");
			strSql.Append("file_size=@file_size,");
			strSql.Append("create_date=@create_date,");
			strSql.Append("modify_date=@modify_date,");
			strSql.Append("file_link=@file_link,");
			strSql.Append("img_src=@img_src,");
			strSql.Append("sn=@sn,");
			strSql.Append("file_type=@file_type,");
			strSql.Append("remark=@remark,");
			strSql.Append("is_act=@is_act");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@source_id", SqlDbType.Int,4),
					new SqlParameter("@file_title", SqlDbType.NVarChar,200),
					new SqlParameter("@file_intro", SqlDbType.NVarChar,500),
					new SqlParameter("@file_size", SqlDbType.NVarChar,100),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@modify_date", SqlDbType.DateTime),
					new SqlParameter("@file_link", SqlDbType.NVarChar,800),
					new SqlParameter("@img_src", SqlDbType.NVarChar,500),
					new SqlParameter("@sn", SqlDbType.Int,4),
					new SqlParameter("@file_type", SqlDbType.NVarChar,100),
					new SqlParameter("@remark", SqlDbType.NText),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.source_id;
			parameters[1].Value = model.file_title;
			parameters[2].Value = model.file_intro;
			parameters[3].Value = model.file_size;
			parameters[4].Value = model.create_date;
			parameters[5].Value = model.modify_date;
			parameters[6].Value = model.file_link;
			parameters[7].Value = model.img_src;
			parameters[8].Value = model.sn;
			parameters[9].Value = model.file_type;
			parameters[10].Value = model.remark;
			parameters[11].Value = model.is_act;
			parameters[12].Value = model.id;

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
			strSql.Append("delete from wx_source_list ");
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
			strSql.Append("delete from wx_source_list ");
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
		public SfSoft.Model.wx_source_list GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,source_id,file_title,file_intro,file_size,create_date,modify_date,file_link,img_src,sn,file_type,remark,is_act from wx_source_list ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_source_list model=new SfSoft.Model.wx_source_list();
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
		public SfSoft.Model.wx_source_list DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_source_list model=new SfSoft.Model.wx_source_list();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["source_id"]!=null && row["source_id"].ToString()!="")
				{
					model.source_id=int.Parse(row["source_id"].ToString());
				}
				if(row["file_title"]!=null)
				{
					model.file_title=row["file_title"].ToString();
				}
				if(row["file_intro"]!=null)
				{
					model.file_intro=row["file_intro"].ToString();
				}
				if(row["file_size"]!=null)
				{
					model.file_size=row["file_size"].ToString();
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
				}
				if(row["modify_date"]!=null && row["modify_date"].ToString()!="")
				{
					model.modify_date=DateTime.Parse(row["modify_date"].ToString());
				}
				if(row["file_link"]!=null)
				{
					model.file_link=row["file_link"].ToString();
				}
				if(row["img_src"]!=null)
				{
					model.img_src=row["img_src"].ToString();
				}
				if(row["sn"]!=null && row["sn"].ToString()!="")
				{
					model.sn=int.Parse(row["sn"].ToString());
				}
				if(row["file_type"]!=null)
				{
					model.file_type=row["file_type"].ToString();
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
			strSql.Append("select id,source_id,file_title,file_intro,file_size,create_date,modify_date,file_link,img_src,sn,file_type,remark,is_act ");
			strSql.Append(" FROM wx_source_list ");
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
			strSql.Append(" id,source_id,file_title,file_intro,file_size,create_date,modify_date,file_link,img_src,sn,file_type,remark,is_act ");
			strSql.Append(" FROM wx_source_list ");
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
			strSql.Append("select count(1) FROM wx_source_list ");
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
			strSql.Append(")AS Row, T.*  from wx_source_list T ");
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
			parameters[0].Value = "wx_source_list";
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

