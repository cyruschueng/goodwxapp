using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_gardenia
	/// </summary>
	public partial class wx_gardenia:Iwx_gardenia
	{
		public wx_gardenia()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("id", "wx_gardenia"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_gardenia");
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
		public int Add(SfSoft.Model.wx_gardenia model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_gardenia(");
			strSql.Append("gardenia_name,intro,detail,logo,builder_date,initiator,create_date)");
			strSql.Append(" values (");
			strSql.Append("@gardenia_name,@intro,@detail,@logo,@builder_date,@initiator,@create_date)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@gardenia_name", SqlDbType.NVarChar,100),
					new SqlParameter("@intro", SqlDbType.NVarChar,500),
					new SqlParameter("@detail", SqlDbType.Text),
					new SqlParameter("@logo", SqlDbType.NVarChar,300),
					new SqlParameter("@builder_date", SqlDbType.DateTime),
					new SqlParameter("@initiator", SqlDbType.NVarChar,1000),
					new SqlParameter("@create_date", SqlDbType.DateTime)};
			parameters[0].Value = model.gardenia_name;
			parameters[1].Value = model.intro;
			parameters[2].Value = model.detail;
			parameters[3].Value = model.logo;
			parameters[4].Value = model.builder_date;
			parameters[5].Value = model.initiator;
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
		public bool Update(SfSoft.Model.wx_gardenia model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_gardenia set ");
			strSql.Append("gardenia_name=@gardenia_name,");
			strSql.Append("intro=@intro,");
			strSql.Append("detail=@detail,");
			strSql.Append("logo=@logo,");
			strSql.Append("builder_date=@builder_date,");
			strSql.Append("initiator=@initiator,");
			strSql.Append("create_date=@create_date");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@gardenia_name", SqlDbType.NVarChar,100),
					new SqlParameter("@intro", SqlDbType.NVarChar,500),
					new SqlParameter("@detail", SqlDbType.Text),
					new SqlParameter("@logo", SqlDbType.NVarChar,300),
					new SqlParameter("@builder_date", SqlDbType.DateTime),
					new SqlParameter("@initiator", SqlDbType.NVarChar,1000),
					new SqlParameter("@create_date", SqlDbType.DateTime),
					new SqlParameter("@id", SqlDbType.Int,4)};
			parameters[0].Value = model.gardenia_name;
			parameters[1].Value = model.intro;
			parameters[2].Value = model.detail;
			parameters[3].Value = model.logo;
			parameters[4].Value = model.builder_date;
			parameters[5].Value = model.initiator;
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
			strSql.Append("delete from wx_gardenia ");
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
			strSql.Append("delete from wx_gardenia ");
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
		public SfSoft.Model.wx_gardenia GetModel(int id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 id,gardenia_name,intro,detail,logo,builder_date,initiator,create_date from wx_gardenia ");
			strSql.Append(" where id=@id");
			SqlParameter[] parameters = {
					new SqlParameter("@id", SqlDbType.Int,4)
			};
			parameters[0].Value = id;

			SfSoft.Model.wx_gardenia model=new SfSoft.Model.wx_gardenia();
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
		public SfSoft.Model.wx_gardenia DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_gardenia model=new SfSoft.Model.wx_gardenia();
			if (row != null)
			{
				if(row["id"]!=null && row["id"].ToString()!="")
				{
					model.id=int.Parse(row["id"].ToString());
				}
				if(row["gardenia_name"]!=null)
				{
					model.gardenia_name=row["gardenia_name"].ToString();
				}
				if(row["intro"]!=null)
				{
					model.intro=row["intro"].ToString();
				}
				if(row["detail"]!=null)
				{
					model.detail=row["detail"].ToString();
				}
				if(row["logo"]!=null)
				{
					model.logo=row["logo"].ToString();
				}
				if(row["builder_date"]!=null && row["builder_date"].ToString()!="")
				{
					model.builder_date=DateTime.Parse(row["builder_date"].ToString());
				}
				if(row["initiator"]!=null)
				{
					model.initiator=row["initiator"].ToString();
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
			strSql.Append("select id,gardenia_name,intro,detail,logo,builder_date,initiator,create_date ");
			strSql.Append(" FROM wx_gardenia ");
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
			strSql.Append(" id,gardenia_name,intro,detail,logo,builder_date,initiator,create_date ");
			strSql.Append(" FROM wx_gardenia ");
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
			strSql.Append("select count(1) FROM wx_gardenia ");
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
			strSql.Append(")AS Row, T.*  from wx_gardenia T ");
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
			parameters[0].Value = "wx_gardenia";
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

