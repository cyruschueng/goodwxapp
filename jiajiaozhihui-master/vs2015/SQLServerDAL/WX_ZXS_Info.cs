using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_ZXS_Info
	/// </summary>
	public partial class WX_ZXS_Info:IWX_ZXS_Info
	{
		public WX_ZXS_Info()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_ZXS_Info"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_ZXS_Info");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_ZXS_Info model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_ZXS_Info(");
			strSql.Append("AppId,Title,LogoUrl,Introduction,JoinNumber,PothuntNumber,CreateDate,Status)");
			strSql.Append(" values (");
            strSql.Append("@AppId,@Title,@LogoUrl,@Introduction,@JoinNumber,@PothuntNumber,@CreateDate,@Status)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@Title", SqlDbType.NVarChar,100),
					new SqlParameter("@LogoUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Introduction", SqlDbType.Text),
					new SqlParameter("@JoinNumber", SqlDbType.Int,4),
					new SqlParameter("@PothuntNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Status", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.Title;
			parameters[2].Value = model.LogoUrl;
			parameters[3].Value = model.Introduction;
			parameters[4].Value = model.JoinNumber;
			parameters[5].Value = model.PothuntNumber;
			parameters[6].Value = model.CreateDate;
            parameters[7].Value = model.Status;

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
		public bool Update(SfSoft.Model.WX_ZXS_Info model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_ZXS_Info set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("Title=@Title,");
			strSql.Append("LogoUrl=@LogoUrl,");
			strSql.Append("Introduction=@Introduction,");
			strSql.Append("JoinNumber=@JoinNumber,");
			strSql.Append("PothuntNumber=@PothuntNumber,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("Status=@Status");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@Title", SqlDbType.NVarChar,100),
					new SqlParameter("@LogoUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Introduction", SqlDbType.Text),
					new SqlParameter("@JoinNumber", SqlDbType.Int,4),
					new SqlParameter("@PothuntNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Status", SqlDbType.Int),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.Title;
			parameters[2].Value = model.LogoUrl;
			parameters[3].Value = model.Introduction;
			parameters[4].Value = model.JoinNumber;
			parameters[5].Value = model.PothuntNumber;
			parameters[6].Value = model.CreateDate;
            parameters[7].Value = model.Status;
			parameters[8].Value = model.Id;

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
		public bool Delete(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_ZXS_Info ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

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
		public bool DeleteList(string Idlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_ZXS_Info ");
			strSql.Append(" where Id in ("+Idlist + ")  ");
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
		public SfSoft.Model.WX_ZXS_Info GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,AppId,Title,LogoUrl,Introduction,JoinNumber,PothuntNumber,CreateDate,Status from WX_ZXS_Info ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_ZXS_Info model=new SfSoft.Model.WX_ZXS_Info();
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
		public SfSoft.Model.WX_ZXS_Info DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_ZXS_Info model=new SfSoft.Model.WX_ZXS_Info();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["AppId"]!=null)
				{
					model.AppId=row["AppId"].ToString();
				}
				if(row["Title"]!=null)
				{
					model.Title=row["Title"].ToString();
				}
				if(row["LogoUrl"]!=null)
				{
					model.LogoUrl=row["LogoUrl"].ToString();
				}
				if(row["Introduction"]!=null)
				{
					model.Introduction=row["Introduction"].ToString();
				}
				if(row["JoinNumber"]!=null && row["JoinNumber"].ToString()!="")
				{
					model.JoinNumber=int.Parse(row["JoinNumber"].ToString());
				}
				if(row["PothuntNumber"]!=null && row["PothuntNumber"].ToString()!="")
				{
					model.PothuntNumber=int.Parse(row["PothuntNumber"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["Status"] != null && row["Status"].ToString() != "")
                {
                    model.Status = int.Parse(row["Status"].ToString());
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
            strSql.Append("select Id,AppId,Title,LogoUrl,Introduction,JoinNumber,PothuntNumber,CreateDate,Status ");
			strSql.Append(" FROM WX_ZXS_Info ");
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
            strSql.Append(" Id,AppId,Title,LogoUrl,Introduction,JoinNumber,PothuntNumber,CreateDate,Status ");
			strSql.Append(" FROM WX_ZXS_Info ");
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
			strSql.Append("select count(1) FROM WX_ZXS_Info ");
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
				strSql.Append("order by T.Id desc");
			}
			strSql.Append(")AS Row, T.*  from WX_ZXS_Info T ");
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
			parameters[0].Value = "WX_ZXS_Info";
			parameters[1].Value = "Id";
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

