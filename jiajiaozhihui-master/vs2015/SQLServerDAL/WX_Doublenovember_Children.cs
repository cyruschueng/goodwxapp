using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Doublenovember_Children
	/// </summary>
	public partial class WX_Doublenovember_Children:IWX_Doublenovember_Children
	{
		public WX_Doublenovember_Children()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Doublenovember_Children"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Doublenovember_Children");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_Doublenovember_Children model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Doublenovember_Children(");
            strSql.Append("OpenID,Sex,Year,Month,Day,FirstWorksDateTime,Alias,IsAlias)");
			strSql.Append(" values (");
            strSql.Append("@OpenID,@Sex,@Year,@Month,@Day,@FirstWorksDateTime,@Alias,@IsAlias)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@Sex", SqlDbType.NVarChar,10),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4),
					new SqlParameter("@Day", SqlDbType.Int,4),
                    new SqlParameter("@FirstWorksDateTime", SqlDbType.DateTime),
                    new SqlParameter("@Alias", SqlDbType.NVarChar,100),
                    new SqlParameter("@IsAlias", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.Sex;
			parameters[2].Value = model.Year;
			parameters[3].Value = model.Month;
			parameters[4].Value = model.Day;
            parameters[5].Value = model.FirstWorksDateTime;
            parameters[6].Value = model.Alias;
            parameters[7].Value = model.IsAlias;

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
		public bool Update(SfSoft.Model.WX_Doublenovember_Children model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Doublenovember_Children set ");
			strSql.Append("OpenID=@OpenID,");
			strSql.Append("Sex=@Sex,");
			strSql.Append("Year=@Year,");
			strSql.Append("Month=@Month,");
			strSql.Append("Day=@Day,");
            strSql.Append("FirstWorksDateTime=@FirstWorksDateTime,");
            strSql.Append("Alias=@Alias,");
            strSql.Append("IsAlias=@IsAlias");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@Sex", SqlDbType.NVarChar,10),
					new SqlParameter("@Year", SqlDbType.Int,4),
					new SqlParameter("@Month", SqlDbType.Int,4),
					new SqlParameter("@Day", SqlDbType.Int,4),
                    new SqlParameter("@FirstWorksDateTime", SqlDbType.DateTime),
                    new SqlParameter("@Alias", SqlDbType.NVarChar,100),
                    new SqlParameter("@IsAlias", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.Sex;
			parameters[2].Value = model.Year;
			parameters[3].Value = model.Month;
			parameters[4].Value = model.Day;
            parameters[5].Value = model.FirstWorksDateTime;
            parameters[6].Value = model.Alias;
            parameters[7].Value = model.IsAlias;
			parameters[8].Value = model.ID;

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
		public bool Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Doublenovember_Children ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

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
		public bool DeleteList(string IDlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Doublenovember_Children ");
			strSql.Append(" where ID in ("+IDlist + ")  ");
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
		public SfSoft.Model.WX_Doublenovember_Children GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,OpenID,Sex,Year,Month,Day,FirstWorksDateTime,Alias,IsAlias from WX_Doublenovember_Children ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Doublenovember_Children model=new SfSoft.Model.WX_Doublenovember_Children();
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
		public SfSoft.Model.WX_Doublenovember_Children DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Doublenovember_Children model=new SfSoft.Model.WX_Doublenovember_Children();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["OpenID"]!=null)
				{
					model.OpenID=row["OpenID"].ToString();
				}
				if(row["Sex"]!=null)
				{
					model.Sex=row["Sex"].ToString();
				}
				if(row["Year"]!=null && row["Year"].ToString()!="")
				{
					model.Year=int.Parse(row["Year"].ToString());
				}
				if(row["Month"]!=null && row["Month"].ToString()!="")
				{
					model.Month=int.Parse(row["Month"].ToString());
				}
				if(row["Day"]!=null && row["Day"].ToString()!="")
				{
					model.Day=int.Parse(row["Day"].ToString());
				}
                if (row["FirstWorksDateTime"] != null && row["FirstWorksDateTime"].ToString() != "")
                {
                    model.FirstWorksDateTime =DateTime.Parse(row["FirstWorksDateTime"].ToString());
                }
                if (row["Alias"] != null)
                {
                    model.Alias = row["Alias"].ToString();
                }
                if (row["IsAlias"] != null && row["IsAlias"].ToString() != "")
                {
                    model.IsAlias = int.Parse(row["IsAlias"].ToString());
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
            strSql.Append("select ID,OpenID,Sex,Year,Month,Day,FirstWorksDateTime,Alias,IsAlias ");
			strSql.Append(" FROM WX_Doublenovember_Children ");
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
            strSql.Append(" ID,OpenID,Sex,Year,Month,Day,FirstWorksDateTime,Alias,IsAlias ");
			strSql.Append(" FROM WX_Doublenovember_Children ");
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
			strSql.Append("select count(1) FROM WX_Doublenovember_Children ");
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
				strSql.Append("order by T.ID desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Doublenovember_Children T ");
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
			parameters[0].Value = "WX_Doublenovember_Children";
			parameters[1].Value = "ID";
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


        public Model.WX_Doublenovember_Children GetModel(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,OpenID,Sex,Year,Month,Day,FirstWorksDateTime,Alias,IsAlias from WX_Doublenovember_Children ");
            strSql.Append(" where OpenID=@OpenID");
            SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100)
			};
            parameters[0].Value = openid;

            SfSoft.Model.WX_Doublenovember_Children model = new SfSoft.Model.WX_Doublenovember_Children();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return DataRowToModel(ds.Tables[0].Rows[0]);
            }
            else
            {
                return null;
            }
        }
    }
}

