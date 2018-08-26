using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_QA_Expert
	/// </summary>
	public partial class WX_QA_Expert:IWX_QA_Expert
	{
		public WX_QA_Expert()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ExpertId", "WX_QA_Expert"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ExpertId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_QA_Expert");
			strSql.Append(" where ExpertId=@ExpertId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ExpertId", SqlDbType.Int,4)			};
			parameters[0].Value = ExpertId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_QA_Expert model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_QA_Expert(");
			strSql.Append("ExpertId,Sn,LikeNumber,InitLikeNumber,IsDefault,IsSystem)");
			strSql.Append(" values (");
			strSql.Append("@ExpertId,@Sn,@LikeNumber,@InitLikeNumber,@IsDefault,@IsSystem)");
			SqlParameter[] parameters = {
					new SqlParameter("@ExpertId", SqlDbType.Int,4),
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@InitLikeNumber", SqlDbType.Int,4),
					new SqlParameter("@IsDefault", SqlDbType.Int,4),
					new SqlParameter("@IsSystem", SqlDbType.Int,4)};
			parameters[0].Value = model.ExpertId;
			parameters[1].Value = model.Sn;
			parameters[2].Value = model.LikeNumber;
			parameters[3].Value = model.InitLikeNumber;
			parameters[4].Value = model.IsDefault;
			parameters[5].Value = model.IsSystem;

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
		public bool Update(SfSoft.Model.WX_QA_Expert model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_QA_Expert set ");
			strSql.Append("Sn=@Sn,");
			strSql.Append("LikeNumber=@LikeNumber,");
			strSql.Append("InitLikeNumber=@InitLikeNumber,");
			strSql.Append("IsDefault=@IsDefault,");
			strSql.Append("IsSystem=@IsSystem");
			strSql.Append(" where ExpertId=@ExpertId ");
			SqlParameter[] parameters = {
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@InitLikeNumber", SqlDbType.Int,4),
					new SqlParameter("@IsDefault", SqlDbType.Int,4),
					new SqlParameter("@IsSystem", SqlDbType.Int,4),
					new SqlParameter("@ExpertId", SqlDbType.Int,4)};
			parameters[0].Value = model.Sn;
			parameters[1].Value = model.LikeNumber;
			parameters[2].Value = model.InitLikeNumber;
			parameters[3].Value = model.IsDefault;
			parameters[4].Value = model.IsSystem;
			parameters[5].Value = model.ExpertId;

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
		public bool Delete(int ExpertId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_QA_Expert ");
			strSql.Append(" where ExpertId=@ExpertId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ExpertId", SqlDbType.Int,4)			};
			parameters[0].Value = ExpertId;

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
		public bool DeleteList(string ExpertIdlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_QA_Expert ");
			strSql.Append(" where ExpertId in ("+ExpertIdlist + ")  ");
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
		public SfSoft.Model.WX_QA_Expert GetModel(int ExpertId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ExpertId,Sn,LikeNumber,InitLikeNumber,IsDefault,IsSystem from WX_QA_Expert ");
			strSql.Append(" where ExpertId=@ExpertId ");
			SqlParameter[] parameters = {
					new SqlParameter("@ExpertId", SqlDbType.Int,4)			};
			parameters[0].Value = ExpertId;

			SfSoft.Model.WX_QA_Expert model=new SfSoft.Model.WX_QA_Expert();
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
		public SfSoft.Model.WX_QA_Expert DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_QA_Expert model=new SfSoft.Model.WX_QA_Expert();
			if (row != null)
			{
				if(row["ExpertId"]!=null && row["ExpertId"].ToString()!="")
				{
					model.ExpertId=int.Parse(row["ExpertId"].ToString());
				}
				if(row["Sn"]!=null && row["Sn"].ToString()!="")
				{
					model.Sn=int.Parse(row["Sn"].ToString());
				}
				if(row["LikeNumber"]!=null && row["LikeNumber"].ToString()!="")
				{
					model.LikeNumber=int.Parse(row["LikeNumber"].ToString());
				}
				if(row["InitLikeNumber"]!=null && row["InitLikeNumber"].ToString()!="")
				{
					model.InitLikeNumber=int.Parse(row["InitLikeNumber"].ToString());
				}
				if(row["IsDefault"]!=null && row["IsDefault"].ToString()!="")
				{
					model.IsDefault=int.Parse(row["IsDefault"].ToString());
				}
				if(row["IsSystem"]!=null && row["IsSystem"].ToString()!="")
				{
					model.IsSystem=int.Parse(row["IsSystem"].ToString());
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
			strSql.Append("select ExpertId,Sn,LikeNumber,InitLikeNumber,IsDefault,IsSystem ");
			strSql.Append(" FROM WX_QA_Expert ");
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
			strSql.Append(" ExpertId,Sn,LikeNumber,InitLikeNumber,IsDefault,IsSystem ");
			strSql.Append(" FROM WX_QA_Expert ");
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
			strSql.Append("select count(1) FROM WX_QA_Expert ");
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
				strSql.Append("order by T.ExpertId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_QA_Expert T ");
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
			parameters[0].Value = "WX_QA_Expert";
			parameters[1].Value = "ExpertId";
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

