using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_class_courses
	/// </summary>
	public partial class wx_class_courses:Iwx_class_courses
	{
		public wx_class_courses()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_class_courses"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_class_courses");
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
		public int Add(SfSoft.Model.wx_class_courses model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_class_courses(");
			strSql.Append("class_id,scource_id,role,starting_date,year,month,day,week,is_act,is_public)");
			strSql.Append(" values (");
			strSql.Append("@class_id,@scource_id,@role,@starting_date,@year,@month,@day,@week,@is_act,@is_public)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@class_id", SqlDbType.Int,4),
					new SqlParameter("@scource_id", SqlDbType.Int,4),
					new SqlParameter("@role", SqlDbType.NVarChar,50),
					new SqlParameter("@starting_date", SqlDbType.DateTime),
					new SqlParameter("@year", SqlDbType.Int,4),
					new SqlParameter("@month", SqlDbType.Int,4),
					new SqlParameter("@day", SqlDbType.Int,4),
					new SqlParameter("@week", SqlDbType.Int,4),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@is_public", SqlDbType.Int,4)};
			parameters[0].Value = model.class_id;
			parameters[1].Value = model.scource_id;
			parameters[2].Value = model.role;
			parameters[3].Value = model.starting_date;
			parameters[4].Value = model.year;
			parameters[5].Value = model.month;
			parameters[6].Value = model.day;
			parameters[7].Value = model.week;
			parameters[8].Value = model.is_act;
			parameters[9].Value = model.is_public;

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
		public bool Update(SfSoft.Model.wx_class_courses model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_class_courses set ");
			strSql.Append("class_id=@class_id,");
			strSql.Append("scource_id=@scource_id,");
			strSql.Append("role=@role,");
			strSql.Append("starting_date=@starting_date,");
			strSql.Append("year=@year,");
			strSql.Append("month=@month,");
			strSql.Append("day=@day,");
			strSql.Append("week=@week,");
			strSql.Append("is_act=@is_act,");
			strSql.Append("is_public=@is_public");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@class_id", SqlDbType.Int,4),
					new SqlParameter("@scource_id", SqlDbType.Int,4),
					new SqlParameter("@role", SqlDbType.NVarChar,50),
					new SqlParameter("@starting_date", SqlDbType.DateTime),
					new SqlParameter("@year", SqlDbType.Int,4),
					new SqlParameter("@month", SqlDbType.Int,4),
					new SqlParameter("@day", SqlDbType.Int,4),
					new SqlParameter("@week", SqlDbType.Int,4),
					new SqlParameter("@is_act", SqlDbType.Int,4),
					new SqlParameter("@is_public", SqlDbType.Int,4),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.class_id;
			parameters[1].Value = model.scource_id;
			parameters[2].Value = model.role;
			parameters[3].Value = model.starting_date;
			parameters[4].Value = model.year;
			parameters[5].Value = model.month;
			parameters[6].Value = model.day;
			parameters[7].Value = model.week;
			parameters[8].Value = model.is_act;
			parameters[9].Value = model.is_public;
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
			strSql.Append("delete from wx_class_courses ");
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
			strSql.Append("delete from wx_class_courses ");
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
		public SfSoft.Model.wx_class_courses GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,class_id,scource_id,role,starting_date,year,month,day,week,is_act,is_public from wx_class_courses ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_class_courses model=new SfSoft.Model.wx_class_courses();
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
		public SfSoft.Model.wx_class_courses DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_class_courses model=new SfSoft.Model.wx_class_courses();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["class_id"]!=null && row["class_id"].ToString()!="")
				{
					model.class_id=int.Parse(row["class_id"].ToString());
				}
				if(row["scource_id"]!=null && row["scource_id"].ToString()!="")
				{
					model.scource_id=int.Parse(row["scource_id"].ToString());
				}
				if(row["role"]!=null)
				{
					model.role=row["role"].ToString();
				}
				if(row["starting_date"]!=null && row["starting_date"].ToString()!="")
				{
					model.starting_date=DateTime.Parse(row["starting_date"].ToString());
				}
				if(row["year"]!=null && row["year"].ToString()!="")
				{
					model.year=int.Parse(row["year"].ToString());
				}
				if(row["month"]!=null && row["month"].ToString()!="")
				{
					model.month=int.Parse(row["month"].ToString());
				}
				if(row["day"]!=null && row["day"].ToString()!="")
				{
					model.day=int.Parse(row["day"].ToString());
				}
				if(row["week"]!=null && row["week"].ToString()!="")
				{
					model.week=int.Parse(row["week"].ToString());
				}
				if(row["is_act"]!=null && row["is_act"].ToString()!="")
				{
					model.is_act=int.Parse(row["is_act"].ToString());
				}
				if(row["is_public"]!=null && row["is_public"].ToString()!="")
				{
					model.is_public=int.Parse(row["is_public"].ToString());
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
			strSql.Append("select id,class_id,scource_id,role,starting_date,year,month,day,week,is_act,is_public ");
			strSql.Append(" FROM wx_class_courses ");
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
			strSql.Append(" id,class_id,scource_id,role,starting_date,year,month,day,week,is_act,is_public ");
			strSql.Append(" FROM wx_class_courses ");
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
			strSql.Append("select count(1) FROM wx_class_courses ");
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
			strSql.Append(")AS Row, T.*  from wx_class_courses T ");
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
			parameters[0].Value = "wx_class_courses";
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

