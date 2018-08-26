using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:wx_gardenia_user_detail
	/// </summary>
	public partial class wx_gardenia_user_detail:Iwx_gardenia_user_detail
	{
		public wx_gardenia_user_detail()
		{}
		#region  BasicMethod

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string openid)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from wx_gardenia_user_detail");
			strSql.Append(" where openid=@openid ");
			SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar,100)			};
			parameters[0].Value = openid;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.wx_gardenia_user_detail model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into wx_gardenia_user_detail(");
			strSql.Append("openid,parent_name,parent_age,profession,city,child_sex,child_age,child_grade)");
			strSql.Append(" values (");
			strSql.Append("@openid,@parent_name,@parent_age,@profession,@city,@child_sex,@child_age,@child_grade)");
			SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar,100),
					new SqlParameter("@parent_name", SqlDbType.NVarChar,100),
					new SqlParameter("@parent_age", SqlDbType.Int,4),
					new SqlParameter("@profession", SqlDbType.NVarChar,100),
					new SqlParameter("@city", SqlDbType.NVarChar,100),
					new SqlParameter("@child_sex", SqlDbType.NVarChar,100),
					new SqlParameter("@child_age", SqlDbType.Int,4),
					new SqlParameter("@child_grade", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.openid;
			parameters[1].Value = model.parent_name;
			parameters[2].Value = model.parent_age;
			parameters[3].Value = model.profession;
			parameters[4].Value = model.city;
			parameters[5].Value = model.child_sex;
			parameters[6].Value = model.child_age;
			parameters[7].Value = model.child_grade;

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
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.wx_gardenia_user_detail model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update wx_gardenia_user_detail set ");
			strSql.Append("parent_name=@parent_name,");
			strSql.Append("parent_age=@parent_age,");
			strSql.Append("profession=@profession,");
			strSql.Append("city=@city,");
			strSql.Append("child_sex=@child_sex,");
			strSql.Append("child_age=@child_age,");
			strSql.Append("child_grade=@child_grade");
			strSql.Append(" where openid=@openid ");
			SqlParameter[] parameters = {
					new SqlParameter("@parent_name", SqlDbType.NVarChar,100),
					new SqlParameter("@parent_age", SqlDbType.Int,4),
					new SqlParameter("@profession", SqlDbType.NVarChar,100),
					new SqlParameter("@city", SqlDbType.NVarChar,100),
					new SqlParameter("@child_sex", SqlDbType.NVarChar,100),
					new SqlParameter("@child_age", SqlDbType.Int,4),
					new SqlParameter("@child_grade", SqlDbType.NVarChar,100),
					new SqlParameter("@openid", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.parent_name;
			parameters[1].Value = model.parent_age;
			parameters[2].Value = model.profession;
			parameters[3].Value = model.city;
			parameters[4].Value = model.child_sex;
			parameters[5].Value = model.child_age;
			parameters[6].Value = model.child_grade;
			parameters[7].Value = model.openid;

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
		public bool Delete(string openid)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from wx_gardenia_user_detail ");
			strSql.Append(" where openid=@openid ");
			SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar,100)			};
			parameters[0].Value = openid;

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
		public bool DeleteList(string openidlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from wx_gardenia_user_detail ");
			strSql.Append(" where openid in ("+openidlist + ")  ");
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
		public SfSoft.Model.wx_gardenia_user_detail GetModel(string openid)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 openid,parent_name,parent_age,profession,city,child_sex,child_age,child_grade from wx_gardenia_user_detail ");
			strSql.Append(" where openid=@openid ");
			SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar,100)			};
			parameters[0].Value = openid;

			SfSoft.Model.wx_gardenia_user_detail model=new SfSoft.Model.wx_gardenia_user_detail();
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
		public SfSoft.Model.wx_gardenia_user_detail DataRowToModel(DataRow row)
		{
			SfSoft.Model.wx_gardenia_user_detail model=new SfSoft.Model.wx_gardenia_user_detail();
			if (row != null)
			{
				if(row["openid"]!=null)
				{
					model.openid=row["openid"].ToString();
				}
				if(row["parent_name"]!=null)
				{
					model.parent_name=row["parent_name"].ToString();
				}
				if(row["parent_age"]!=null && row["parent_age"].ToString()!="")
				{
					model.parent_age=int.Parse(row["parent_age"].ToString());
				}
				if(row["profession"]!=null)
				{
					model.profession=row["profession"].ToString();
				}
				if(row["city"]!=null)
				{
					model.city=row["city"].ToString();
				}
				if(row["child_sex"]!=null)
				{
					model.child_sex=row["child_sex"].ToString();
				}
				if(row["child_age"]!=null && row["child_age"].ToString()!="")
				{
					model.child_age=int.Parse(row["child_age"].ToString());
				}
				if(row["child_grade"]!=null)
				{
					model.child_grade=row["child_grade"].ToString();
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
			strSql.Append("select openid,parent_name,parent_age,profession,city,child_sex,child_age,child_grade ");
			strSql.Append(" FROM wx_gardenia_user_detail ");
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
			strSql.Append(" openid,parent_name,parent_age,profession,city,child_sex,child_age,child_grade ");
			strSql.Append(" FROM wx_gardenia_user_detail ");
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
			strSql.Append("select count(1) FROM wx_gardenia_user_detail ");
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
				strSql.Append("order by T.openid desc");
			}
			strSql.Append(")AS Row, T.*  from wx_gardenia_user_detail T ");
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
			parameters[0].Value = "wx_gardenia_user_detail";
			parameters[1].Value = "openid";
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

