using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Audio_Favorite
	/// </summary>
	public partial class WX_Audio_Favorite:IWX_Audio_Favorite
	{
		public WX_Audio_Favorite()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("AudioId", "WX_Audio_Favorite"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string AppId,string OpenId,int AudioId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Audio_Favorite");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@AudioId", SqlDbType.Int,4)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;
			parameters[2].Value = AudioId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Audio_Favorite model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Audio_Favorite(");
			strSql.Append("AppId,OpenId,AudioId,CreateDate)");
			strSql.Append(" values (");
			strSql.Append("@AppId,@OpenId,@AudioId,@CreateDate)");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@AudioId", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.AudioId;
			parameters[3].Value = model.CreateDate;

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
		public bool Update(SfSoft.Model.WX_Audio_Favorite model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Audio_Favorite set ");
			strSql.Append("CreateDate=@CreateDate");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@AudioId", SqlDbType.Int,4)};
			parameters[0].Value = model.CreateDate;
			parameters[1].Value = model.AppId;
			parameters[2].Value = model.OpenId;
			parameters[3].Value = model.AudioId;

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
		public bool Delete(string AppId,string OpenId,int AudioId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Audio_Favorite ");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@AudioId", SqlDbType.Int,4)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;
			parameters[2].Value = AudioId;

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
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_Audio_Favorite GetModel(string AppId,string OpenId,int AudioId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 AppId,OpenId,AudioId,CreateDate from WX_Audio_Favorite ");
			strSql.Append(" where AppId=@AppId and OpenId=@OpenId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@AudioId", SqlDbType.Int,4)			};
			parameters[0].Value = AppId;
			parameters[1].Value = OpenId;
			parameters[2].Value = AudioId;

			SfSoft.Model.WX_Audio_Favorite model=new SfSoft.Model.WX_Audio_Favorite();
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
		public SfSoft.Model.WX_Audio_Favorite DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Audio_Favorite model=new SfSoft.Model.WX_Audio_Favorite();
			if (row != null)
			{
				if(row["AppId"]!=null)
				{
					model.AppId=row["AppId"].ToString();
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["AudioId"]!=null && row["AudioId"].ToString()!="")
				{
					model.AudioId=int.Parse(row["AudioId"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
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
			strSql.Append("select AppId,OpenId,AudioId,CreateDate ");
			strSql.Append(" FROM WX_Audio_Favorite ");
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
			strSql.Append(" AppId,OpenId,AudioId,CreateDate ");
			strSql.Append(" FROM WX_Audio_Favorite ");
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
			strSql.Append("select count(1) FROM WX_Audio_Favorite ");
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
				strSql.Append("order by T.AudioId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Audio_Favorite T ");
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
			parameters[0].Value = "WX_Audio_Favorite";
			parameters[1].Value = "AudioId";
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

