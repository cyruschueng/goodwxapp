using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_WeiXinAccounts
	/// </summary>
	public partial class WX_WeiXinAccounts:IWX_WeiXinAccounts
	{
		public WX_WeiXinAccounts()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_WeiXinAccounts"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_WeiXinAccounts");
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
		public int Add(SfSoft.Model.WX_WeiXinAccounts model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_WeiXinAccounts(");
            strSql.Append("WeiXinID,AppID,AppSect,WeiXinName,Remark,Refresh_token,ExpiresIn,GetTokenDate)");
			strSql.Append(" values (");
            strSql.Append("@WeiXinID,@AppID,@AppSect,@WeiXinName,@Remark,@Refresh_token,@ExpiresIn,@GetTokenDate)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@WeiXinID", SqlDbType.NVarChar,100),
					new SqlParameter("@AppID", SqlDbType.NVarChar,200),
					new SqlParameter("@AppSect", SqlDbType.NVarChar,200),
					new SqlParameter("@WeiXinName", SqlDbType.NVarChar,100),
					new SqlParameter("@Remark", SqlDbType.NVarChar,1000),
                    new SqlParameter("@Refresh_token", SqlDbType.NVarChar,200),
                    new SqlParameter("@ExpiresIn", SqlDbType.Int,4),
                    new SqlParameter("@GetTokenDate", SqlDbType.DateTime)};
			parameters[0].Value = model.WeiXinID;
			parameters[1].Value = model.AppID;
			parameters[2].Value = model.AppSect;
			parameters[3].Value = model.WeiXinName;
			parameters[4].Value = model.Remark;
            parameters[5].Value = model.Refresh_token;
            parameters[6].Value = model.ExpiresIn;
            parameters[7].Value = model.GetTokenDate;

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
		public bool Update(SfSoft.Model.WX_WeiXinAccounts model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_WeiXinAccounts set ");
			strSql.Append("WeiXinID=@WeiXinID,");
			strSql.Append("AppID=@AppID,");
			strSql.Append("AppSect=@AppSect,");
			strSql.Append("WeiXinName=@WeiXinName,");
			strSql.Append("Remark=@Remark,");
            strSql.Append("Refresh_token=@Refresh_token,");
            strSql.Append("ExpiresIn=@ExpiresIn,");
            strSql.Append("GetTokenDate=@GetTokenDate");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@WeiXinID", SqlDbType.NVarChar,100),
					new SqlParameter("@AppID", SqlDbType.NVarChar,200),
					new SqlParameter("@AppSect", SqlDbType.NVarChar,200),
					new SqlParameter("@WeiXinName", SqlDbType.NVarChar,100),
					new SqlParameter("@Remark", SqlDbType.NVarChar,1000),
                    new SqlParameter("@Refresh_token", SqlDbType.NVarChar,200),
                    new SqlParameter("@ExpiresIn", SqlDbType.Int,4),
                    new SqlParameter("@GetTokenDate", SqlDbType.DateTime),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.WeiXinID;
			parameters[1].Value = model.AppID;
			parameters[2].Value = model.AppSect;
			parameters[3].Value = model.WeiXinName;
			parameters[4].Value = model.Remark;
            parameters[5].Value = model.Refresh_token;
            parameters[6].Value = model.ExpiresIn;
            parameters[7].Value = model.GetTokenDate;
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
			strSql.Append("delete from WX_WeiXinAccounts ");
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
			strSql.Append("delete from WX_WeiXinAccounts ");
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
		public SfSoft.Model.WX_WeiXinAccounts GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,WeiXinID,AppID,AppSect,WeiXinName,Remark,Refresh_token,ExpiresIn,GetTokenDate from WX_WeiXinAccounts ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_WeiXinAccounts model=new SfSoft.Model.WX_WeiXinAccounts();
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
		public SfSoft.Model.WX_WeiXinAccounts DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_WeiXinAccounts model=new SfSoft.Model.WX_WeiXinAccounts();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["WeiXinID"]!=null)
				{
					model.WeiXinID=row["WeiXinID"].ToString();
				}
				if(row["AppID"]!=null)
				{
					model.AppID=row["AppID"].ToString();
				}
				if(row["AppSect"]!=null)
				{
					model.AppSect=row["AppSect"].ToString();
				}
				if(row["WeiXinName"]!=null)
				{
					model.WeiXinName=row["WeiXinName"].ToString();
				}
				if(row["Remark"]!=null)
				{
					model.Remark=row["Remark"].ToString();
				}
                if (row["ExpiresIn"] != null && row["ExpiresIn"].ToString() != "")
                {
                    model.ExpiresIn = int.Parse(row["ExpiresIn"].ToString());
                }
                if (row["Refresh_token"] != null)
                {
                    model.Refresh_token = row["Refresh_token"].ToString();
                }
                if (row["GetTokenDate"] != null && row["GetTokenDate"].ToString() != "")
                {
                    model.GetTokenDate = DateTime.Parse(row["GetTokenDate"].ToString());
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
            strSql.Append("select ID,WeiXinID,AppID,AppSect,WeiXinName,Remark,Refresh_token,ExpiresIn,GetTokenDate ");
			strSql.Append(" FROM WX_WeiXinAccounts ");
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
            strSql.Append(" ID,WeiXinID,AppID,AppSect,WeiXinName,Remark,Refresh_token,ExpiresIn,GetTokenDate ");
			strSql.Append(" FROM WX_WeiXinAccounts ");
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
			strSql.Append("select count(1) FROM WX_WeiXinAccounts ");
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
			strSql.Append(")AS Row, T.*  from WX_WeiXinAccounts T ");
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
			parameters[0].Value = "WX_WeiXinAccounts";
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
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.WX_WeiXinAccounts GetModelByWeiXinID(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,WeiXinID,AppID,AppSect,WeiXinName,Remark,Refresh_token,ExpiresIn,GetTokenDate from WX_WeiXinAccounts ");
            strSql.Append(" where WeiXinID=@WeiXinID");
            SqlParameter[] parameters = {
					new SqlParameter("@WeiXinID", SqlDbType.NVarChar,100)
			};
            parameters[0].Value = ID;

            SfSoft.Model.WX_WeiXinAccounts model = new SfSoft.Model.WX_WeiXinAccounts();
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
		#endregion  ExtensionMethod

    }
}

