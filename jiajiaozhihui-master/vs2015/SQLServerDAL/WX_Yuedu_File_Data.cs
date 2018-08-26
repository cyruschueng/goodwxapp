using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Yuedu_File_Data
	/// </summary>
	public partial class WX_Yuedu_File_Data:IWX_Yuedu_File_Data
	{
		public WX_Yuedu_File_Data()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Yuedu_File_Data"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Yuedu_File_Data");
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
		public int Add(SfSoft.Model.WX_Yuedu_File_Data model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Yuedu_File_Data(");
			strSql.Append("AppId,ReadFileId,TemporaryUrl,CloudUrl,UrlType,MediaId,FileId)");
			strSql.Append(" values (");
			strSql.Append("@AppId,@ReadFileId,@TemporaryUrl,@CloudUrl,@UrlType,@MediaId,@FileId)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@ReadFileId", SqlDbType.Int,4),
					new SqlParameter("@TemporaryUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@CloudUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@UrlType", SqlDbType.Int,4),
					new SqlParameter("@MediaId", SqlDbType.NVarChar,200),
					new SqlParameter("@FileId", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.ReadFileId;
			parameters[2].Value = model.TemporaryUrl;
			parameters[3].Value = model.CloudUrl;
			parameters[4].Value = model.UrlType;
			parameters[5].Value = model.MediaId;
			parameters[6].Value = model.FileId;

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
		public bool Update(SfSoft.Model.WX_Yuedu_File_Data model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Yuedu_File_Data set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("ReadFileId=@ReadFileId,");
			strSql.Append("TemporaryUrl=@TemporaryUrl,");
			strSql.Append("CloudUrl=@CloudUrl,");
			strSql.Append("UrlType=@UrlType,");
			strSql.Append("MediaId=@MediaId,");
			strSql.Append("FileId=@FileId");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@ReadFileId", SqlDbType.Int,4),
					new SqlParameter("@TemporaryUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@CloudUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@UrlType", SqlDbType.Int,4),
					new SqlParameter("@MediaId", SqlDbType.NVarChar,200),
					new SqlParameter("@FileId", SqlDbType.NVarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.ReadFileId;
			parameters[2].Value = model.TemporaryUrl;
			parameters[3].Value = model.CloudUrl;
			parameters[4].Value = model.UrlType;
			parameters[5].Value = model.MediaId;
			parameters[6].Value = model.FileId;
			parameters[7].Value = model.Id;

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
			strSql.Append("delete from WX_Yuedu_File_Data ");
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
			strSql.Append("delete from WX_Yuedu_File_Data ");
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
		public SfSoft.Model.WX_Yuedu_File_Data GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,AppId,ReadFileId,TemporaryUrl,CloudUrl,UrlType,MediaId,FileId from WX_Yuedu_File_Data ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Yuedu_File_Data model=new SfSoft.Model.WX_Yuedu_File_Data();
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
		public SfSoft.Model.WX_Yuedu_File_Data DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Yuedu_File_Data model=new SfSoft.Model.WX_Yuedu_File_Data();
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
				if(row["ReadFileId"]!=null && row["ReadFileId"].ToString()!="")
				{
					model.ReadFileId=int.Parse(row["ReadFileId"].ToString());
				}
				if(row["TemporaryUrl"]!=null)
				{
					model.TemporaryUrl=row["TemporaryUrl"].ToString();
				}
				if(row["CloudUrl"]!=null)
				{
					model.CloudUrl=row["CloudUrl"].ToString();
				}
				if(row["UrlType"]!=null && row["UrlType"].ToString()!="")
				{
					model.UrlType=int.Parse(row["UrlType"].ToString());
				}
				if(row["MediaId"]!=null)
				{
					model.MediaId=row["MediaId"].ToString();
				}
				if(row["FileId"]!=null)
				{
					model.FileId=row["FileId"].ToString();
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
			strSql.Append("select Id,AppId,ReadFileId,TemporaryUrl,CloudUrl,UrlType,MediaId,FileId ");
			strSql.Append(" FROM WX_Yuedu_File_Data ");
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
			strSql.Append(" Id,AppId,ReadFileId,TemporaryUrl,CloudUrl,UrlType,MediaId,FileId ");
			strSql.Append(" FROM WX_Yuedu_File_Data ");
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
			strSql.Append("select count(1) FROM WX_Yuedu_File_Data ");
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
			strSql.Append(")AS Row, T.*  from WX_Yuedu_File_Data T ");
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
			parameters[0].Value = "WX_Yuedu_File_Data";
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

