using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Audio_Category
	/// </summary>
	public partial class WX_Audio_Category:IWX_Audio_Category
	{
		public WX_Audio_Category()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Audio_Category"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Audio_Category");
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
		public int Add(SfSoft.Model.WX_Audio_Category model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Audio_Category(");
            strSql.Append("AppId,Pid,FullName,ShortName,IsAct,MiniImgUrl,MaxImgUrl)");
			strSql.Append(" values (");
            strSql.Append("@AppId,@Pid,@FullName,@ShortName,@IsAct,@MiniImgUrl,@MaxImgUrl)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@Pid", SqlDbType.Int,4),
					new SqlParameter("@FullName", SqlDbType.NVarChar,100),
					new SqlParameter("@ShortName", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@MiniImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@MaxImgUrl", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.Pid;
			parameters[2].Value = model.FullName;
			parameters[3].Value = model.ShortName;
			parameters[4].Value = model.IsAct;
            parameters[5].Value = model.MiniImgUrl;
            parameters[6].Value = model.MaxImgUrl;

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
		public bool Update(SfSoft.Model.WX_Audio_Category model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Audio_Category set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("Pid=@Pid,");
			strSql.Append("FullName=@FullName,");
			strSql.Append("ShortName=@ShortName,");
			strSql.Append("IsAct=@IsAct,");
            strSql.Append("MiniImgUrl=@MiniImgUrl,");
            strSql.Append("MaxImgUrl=@MaxImgUrl");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@Pid", SqlDbType.Int,4),
					new SqlParameter("@FullName", SqlDbType.NVarChar,100),
					new SqlParameter("@ShortName", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@MiniImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@MaxImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.Pid;
			parameters[2].Value = model.FullName;
			parameters[3].Value = model.ShortName;
			parameters[4].Value = model.IsAct;
            parameters[5].Value = model.MiniImgUrl;
            parameters[6].Value = model.MaxImgUrl;
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
			strSql.Append("delete from WX_Audio_Category ");
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
			strSql.Append("delete from WX_Audio_Category ");
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
		public SfSoft.Model.WX_Audio_Category GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,AppId,Pid,FullName,ShortName,IsAct,MiniImgUrl,MaxImgUrl from WX_Audio_Category ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Audio_Category model=new SfSoft.Model.WX_Audio_Category();
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
		public SfSoft.Model.WX_Audio_Category DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Audio_Category model=new SfSoft.Model.WX_Audio_Category();
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
				if(row["Pid"]!=null && row["Pid"].ToString()!="")
				{
					model.Pid=int.Parse(row["Pid"].ToString());
				}
				if(row["FullName"]!=null)
				{
					model.FullName=row["FullName"].ToString();
				}
				if(row["ShortName"]!=null)
				{
					model.ShortName=row["ShortName"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
                if (row["MiniImgUrl"] != null)
                {
                    model.MiniImgUrl = row["MiniImgUrl"].ToString();
                }
                if (row["MaxImgUrl"] != null)
                {
                    model.MaxImgUrl = row["MaxImgUrl"].ToString();
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
            strSql.Append("select Id,AppId,Pid,FullName,ShortName,IsAct,MiniImgUrl,MaxImgUrl ");
			strSql.Append(" FROM WX_Audio_Category ");
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
            strSql.Append(" Id,AppId,Pid,FullName,ShortName,IsAct,MiniImgUrl,MaxImgUrl ");
			strSql.Append(" FROM WX_Audio_Category ");
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
			strSql.Append("select count(1) FROM WX_Audio_Category ");
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
			strSql.Append(")AS Row, T.*  from WX_Audio_Category T ");
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
			parameters[0].Value = "WX_Audio_Category";
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

