using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_User
	/// </summary>
	public partial class WX_Course_User:IWX_Course_User
	{
		public WX_Course_User()
		{}
		#region  BasicMethod

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string OpenId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_User");
			strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = OpenId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Course_User model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_User(");
			strSql.Append("OpenId,UserName,UserType,Telephone,Age,Birthday,Sex,RegionDate,Remark,IsAct)");
			strSql.Append(" values (");
			strSql.Append("@OpenId,@UserName,@UserType,@Telephone,@Age,@Birthday,@Sex,@RegionDate,@Remark,@IsAct)");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@UserType", SqlDbType.Int,4),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,20),
					new SqlParameter("@Age", SqlDbType.Int,4),
					new SqlParameter("@Birthday", SqlDbType.DateTime),
					new SqlParameter("@Sex", SqlDbType.NVarChar,20),
					new SqlParameter("@RegionDate", SqlDbType.DateTime),
					new SqlParameter("@Remark", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.UserName;
			parameters[2].Value = model.UserType;
			parameters[3].Value = model.Telephone;
			parameters[4].Value = model.Age;
			parameters[5].Value = model.Birthday;
			parameters[6].Value = model.Sex;
			parameters[7].Value = model.RegionDate;
			parameters[8].Value = model.Remark;
			parameters[9].Value = model.IsAct;

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
		public bool Update(SfSoft.Model.WX_Course_User model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_User set ");
			strSql.Append("UserName=@UserName,");
			strSql.Append("UserType=@UserType,");
			strSql.Append("Telephone=@Telephone,");
			strSql.Append("Age=@Age,");
			strSql.Append("Birthday=@Birthday,");
			strSql.Append("Sex=@Sex,");
			strSql.Append("RegionDate=@RegionDate,");
			strSql.Append("Remark=@Remark,");
			strSql.Append("IsAct=@IsAct");
			strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@UserType", SqlDbType.Int,4),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,20),
					new SqlParameter("@Age", SqlDbType.Int,4),
					new SqlParameter("@Birthday", SqlDbType.DateTime),
					new SqlParameter("@Sex", SqlDbType.NVarChar,20),
					new SqlParameter("@RegionDate", SqlDbType.DateTime),
					new SqlParameter("@Remark", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.UserName;
			parameters[1].Value = model.UserType;
			parameters[2].Value = model.Telephone;
			parameters[3].Value = model.Age;
			parameters[4].Value = model.Birthday;
			parameters[5].Value = model.Sex;
			parameters[6].Value = model.RegionDate;
			parameters[7].Value = model.Remark;
			parameters[8].Value = model.IsAct;
			parameters[9].Value = model.OpenId;

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
		public bool Delete(string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_User ");
			strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = OpenId;

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
		public bool DeleteList(string OpenIdlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Course_User ");
			strSql.Append(" where OpenId in ("+OpenIdlist + ")  ");
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
		public SfSoft.Model.WX_Course_User GetModel(string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 OpenId,UserName,UserType,Telephone,Age,Birthday,Sex,RegionDate,Remark,IsAct from WX_Course_User ");
			strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = OpenId;

			SfSoft.Model.WX_Course_User model=new SfSoft.Model.WX_Course_User();
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
		public SfSoft.Model.WX_Course_User DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_User model=new SfSoft.Model.WX_Course_User();
			if (row != null)
			{
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["UserName"]!=null)
				{
					model.UserName=row["UserName"].ToString();
				}
				if(row["UserType"]!=null && row["UserType"].ToString()!="")
				{
					model.UserType=int.Parse(row["UserType"].ToString());
				}
				if(row["Telephone"]!=null)
				{
					model.Telephone=row["Telephone"].ToString();
				}
				if(row["Age"]!=null && row["Age"].ToString()!="")
				{
					model.Age=int.Parse(row["Age"].ToString());
				}
				if(row["Birthday"]!=null && row["Birthday"].ToString()!="")
				{
					model.Birthday=DateTime.Parse(row["Birthday"].ToString());
				}
				if(row["Sex"]!=null)
				{
					model.Sex=row["Sex"].ToString();
				}
				if(row["RegionDate"]!=null && row["RegionDate"].ToString()!="")
				{
					model.RegionDate=DateTime.Parse(row["RegionDate"].ToString());
				}
				if(row["Remark"]!=null)
				{
					model.Remark=row["Remark"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
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
			strSql.Append("select OpenId,UserName,UserType,Telephone,Age,Birthday,Sex,RegionDate,Remark,IsAct ");
			strSql.Append(" FROM WX_Course_User ");
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
			strSql.Append(" OpenId,UserName,UserType,Telephone,Age,Birthday,Sex,RegionDate,Remark,IsAct ");
			strSql.Append(" FROM WX_Course_User ");
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
			strSql.Append("select count(1) FROM WX_Course_User ");
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
				strSql.Append("order by T.OpenId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Course_User T ");
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
			parameters[0].Value = "WX_Course_User";
			parameters[1].Value = "OpenId";
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

