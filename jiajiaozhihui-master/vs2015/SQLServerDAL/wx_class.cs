using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_class
	/// </summary>
	public partial class wx_class:Iwx_class
	{
		public wx_class()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_class"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_class");
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
		public int Add(SfSoft.Model.wx_class model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_class(");
			strSql.Append("class_area,class_no,class_name,opening_date,closing_date,class_intro,create_date,is_act)");
			strSql.Append(" values (");
			strSql.Append("@class_area,@class_no,@class_name,@opening_date,@closing_date,@class_intro,@create_date,@is_act)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@class_area", SqlDbType.NVarChar,100),
					new SqlParameter("@class_no", SqlDbType.NVarChar,100),
					new SqlParameter("@class_name", SqlDbType.NVarChar,100),
					new SqlParameter("@opening_date", SqlDbType.DateTime),
					new SqlParameter("@closing_date", SqlDbType.DateTime),
					new SqlParameter("@class_intro", SqlDbType.NVarChar,4000),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@is_act", SqlDbType.Int,4)};
			parameters[0].Value = model.class_area;
			parameters[1].Value = model.class_no;
			parameters[2].Value = model.class_name;
			parameters[3].Value = model.opening_date;
			parameters[4].Value = model.closing_date;
			parameters[5].Value = model.class_intro;
			parameters[6].Value = model.create_date;
			parameters[7].Value = model.is_act;

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
		public bool Update(SfSoft.Model.wx_class model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_class set ");
			strSql.Append("class_area=@class_area,");
			strSql.Append("class_no=@class_no,");
			strSql.Append("class_name=@class_name,");
			strSql.Append("opening_date=@opening_date,");
			strSql.Append("closing_date=@closing_date,");
			strSql.Append("class_intro=@class_intro,");
			strSql.Append("create_date=@create_date,");
			strSql.Append("is_act=@is_act");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@class_area", SqlDbType.NVarChar,100),
					new SqlParameter("@class_no", SqlDbType.NVarChar,100),
					new SqlParameter("@class_name", SqlDbType.NVarChar,100),
					new SqlParameter("@opening_date", SqlDbType.DateTime),
					new SqlParameter("@closing_date", SqlDbType.DateTime),
					new SqlParameter("@class_intro", SqlDbType.NVarChar,4000),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.class_area;
			parameters[1].Value = model.class_no;
			parameters[2].Value = model.class_name;
			parameters[3].Value = model.opening_date;
			parameters[4].Value = model.closing_date;
			parameters[5].Value = model.class_intro;
			parameters[6].Value = model.create_date;
			parameters[7].Value = model.is_act;
			parameters[8].Value = model.id;

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
			strSql.Append("delete from wx_class ");
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
			strSql.Append("delete from wx_class ");
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
		public SfSoft.Model.wx_class GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,class_area,class_no,class_name,opening_date,closing_date,class_intro,create_date,is_act from wx_class ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_class model=new SfSoft.Model.wx_class();
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
		public SfSoft.Model.wx_class DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_class model=new SfSoft.Model.wx_class();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["class_area"]!=null)
				{
					model.class_area=row["class_area"].ToString();
				}
				if(row["class_no"]!=null)
				{
					model.class_no=row["class_no"].ToString();
				}
				if(row["class_name"]!=null)
				{
					model.class_name=row["class_name"].ToString();
				}
				if(row["opening_date"]!=null && row["opening_date"].ToString()!="")
				{
					model.opening_date=DateTime.Parse(row["opening_date"].ToString());
				}
				if(row["closing_date"]!=null && row["closing_date"].ToString()!="")
				{
					model.closing_date=DateTime.Parse(row["closing_date"].ToString());
				}
				if(row["class_intro"]!=null)
				{
					model.class_intro=row["class_intro"].ToString();
				}
				if(row["create_date"]!=null && row["create_date"].ToString()!="")
				{
					model.create_date=DateTime.Parse(row["create_date"].ToString());
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
			strSql.Append("select id,class_area,class_no,class_name,opening_date,closing_date,class_intro,create_date,is_act ");
			strSql.Append(" FROM wx_class ");
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
			strSql.Append(" id,class_area,class_no,class_name,opening_date,closing_date,class_intro,create_date,is_act ");
			strSql.Append(" FROM wx_class ");
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
			strSql.Append("select count(1) FROM wx_class ");
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
			strSql.Append(")AS Row, T.*  from wx_class T ");
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
			parameters[0].Value = "wx_class";
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

