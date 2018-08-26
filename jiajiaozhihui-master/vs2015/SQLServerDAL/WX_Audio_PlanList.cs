using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Audio_PlanList
	/// </summary>
	public partial class WX_Audio_PlanList:IWX_Audio_PlanList
	{
		public WX_Audio_PlanList()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("PlanId", "WX_Audio_PlanList"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int PlanId,int AudioId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Audio_PlanList");
			strSql.Append(" where PlanId=@PlanId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@PlanId", SqlDbType.Int,4),
					new SqlParameter("@AudioId", SqlDbType.Int,4)			};
			parameters[0].Value = PlanId;
			parameters[1].Value = AudioId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Audio_PlanList model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Audio_PlanList(");
			strSql.Append("PlanId,AudioId,PlanNumber)");
			strSql.Append(" values (");
			strSql.Append("@PlanId,@AudioId,@PlanNumber)");
			SqlParameter[] parameters = {
					new SqlParameter("@PlanId", SqlDbType.Int,4),
					new SqlParameter("@AudioId", SqlDbType.Int,4),
					new SqlParameter("@PlanNumber", SqlDbType.Int,4)};
			parameters[0].Value = model.PlanId;
			parameters[1].Value = model.AudioId;
			parameters[2].Value = model.PlanNumber;

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
		public bool Update(SfSoft.Model.WX_Audio_PlanList model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Audio_PlanList set ");
			strSql.Append("PlanNumber=@PlanNumber");
			strSql.Append(" where PlanId=@PlanId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@PlanNumber", SqlDbType.Int,4),
					new SqlParameter("@PlanId", SqlDbType.Int,4),
					new SqlParameter("@AudioId", SqlDbType.Int,4)};
			parameters[0].Value = model.PlanNumber;
			parameters[1].Value = model.PlanId;
			parameters[2].Value = model.AudioId;

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
		public bool Delete(int PlanId,int AudioId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Audio_PlanList ");
			strSql.Append(" where PlanId=@PlanId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@PlanId", SqlDbType.Int,4),
					new SqlParameter("@AudioId", SqlDbType.Int,4)			};
			parameters[0].Value = PlanId;
			parameters[1].Value = AudioId;

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
		public SfSoft.Model.WX_Audio_PlanList GetModel(int PlanId,int AudioId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 PlanId,AudioId,PlanNumber from WX_Audio_PlanList ");
			strSql.Append(" where PlanId=@PlanId and AudioId=@AudioId ");
			SqlParameter[] parameters = {
					new SqlParameter("@PlanId", SqlDbType.Int,4),
					new SqlParameter("@AudioId", SqlDbType.Int,4)			};
			parameters[0].Value = PlanId;
			parameters[1].Value = AudioId;

			SfSoft.Model.WX_Audio_PlanList model=new SfSoft.Model.WX_Audio_PlanList();
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
		public SfSoft.Model.WX_Audio_PlanList DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Audio_PlanList model=new SfSoft.Model.WX_Audio_PlanList();
			if (row != null)
			{
				if(row["PlanId"]!=null && row["PlanId"].ToString()!="")
				{
					model.PlanId=int.Parse(row["PlanId"].ToString());
				}
				if(row["AudioId"]!=null && row["AudioId"].ToString()!="")
				{
					model.AudioId=int.Parse(row["AudioId"].ToString());
				}
				if(row["PlanNumber"]!=null && row["PlanNumber"].ToString()!="")
				{
					model.PlanNumber=int.Parse(row["PlanNumber"].ToString());
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
			strSql.Append("select PlanId,AudioId,PlanNumber ");
			strSql.Append(" FROM WX_Audio_PlanList ");
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
			strSql.Append(" PlanId,AudioId,PlanNumber ");
			strSql.Append(" FROM WX_Audio_PlanList ");
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
			strSql.Append("select count(1) FROM WX_Audio_PlanList ");
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
			strSql.Append(")AS Row, T.*  from WX_Audio_PlanList T ");
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
			parameters[0].Value = "WX_Audio_PlanList";
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

