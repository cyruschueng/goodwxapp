using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_RuleSet
	/// </summary>
	public partial class WX_Course_RuleSet:IWX_Course_RuleSet
	{
		public WX_Course_RuleSet()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_RuleSet"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_RuleSet");
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
		public int Add(SfSoft.Model.WX_Course_RuleSet model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_RuleSet(");
            strSql.Append("CourseId,LowLimit,UpperLimit,Ranking,GoodsId,CreateDate,IsAct)");
			strSql.Append(" values (");
            strSql.Append("@CourseId,@LowLimit,@UpperLimit,@Ranking,@GoodsId,@CreateDate,@IsAct)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@LowLimit", SqlDbType.Int,4),
					new SqlParameter("@UpperLimit", SqlDbType.Int,4),
					new SqlParameter("@Ranking", SqlDbType.Int,4),
					new SqlParameter("@GoodsId", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsAct", SqlDbType.Int,4)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.LowLimit;
			parameters[2].Value = model.UpperLimit;
			parameters[3].Value = model.Ranking;
			parameters[4].Value = model.GoodsId;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.IsAct;

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
		public bool Update(SfSoft.Model.WX_Course_RuleSet model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_RuleSet set ");
			strSql.Append("CourseId=@CourseId,");
			strSql.Append("LowLimit=@LowLimit,");
			strSql.Append("UpperLimit=@UpperLimit,");
			strSql.Append("Ranking=@Ranking,");
			strSql.Append("GoodsId=@GoodsId,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("IsAct=@IsAct");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@LowLimit", SqlDbType.Int,4),
					new SqlParameter("@UpperLimit", SqlDbType.Int,4),
					new SqlParameter("@Ranking", SqlDbType.Int,4),
					new SqlParameter("@GoodsId", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.LowLimit;
			parameters[2].Value = model.UpperLimit;
			parameters[3].Value = model.Ranking;
			parameters[4].Value = model.GoodsId;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.IsAct;
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
			strSql.Append("delete from WX_Course_RuleSet ");
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
			strSql.Append("delete from WX_Course_RuleSet ");
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
		public SfSoft.Model.WX_Course_RuleSet GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,CourseId,LowLimit,UpperLimit,Ranking,GoodsId,CreateDate,IsAct from WX_Course_RuleSet ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_RuleSet model=new SfSoft.Model.WX_Course_RuleSet();
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
		public SfSoft.Model.WX_Course_RuleSet DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_RuleSet model=new SfSoft.Model.WX_Course_RuleSet();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["CourseId"]!=null && row["CourseId"].ToString()!="")
				{
					model.CourseId=int.Parse(row["CourseId"].ToString());
				}
				if(row["LowLimit"]!=null && row["LowLimit"].ToString()!="")
				{
					model.LowLimit=int.Parse(row["LowLimit"].ToString());
				}
				if(row["UpperLimit"]!=null && row["UpperLimit"].ToString()!="")
				{
					model.UpperLimit=int.Parse(row["UpperLimit"].ToString());
				}
				if(row["Ranking"]!=null && row["Ranking"].ToString()!="")
				{
					model.Ranking=int.Parse(row["Ranking"].ToString());
				}
				if(row["GoodsId"]!=null && row["GoodsId"].ToString()!="")
				{
					model.GoodsId=int.Parse(row["GoodsId"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["IsAct"] != null && row["IsAct"].ToString() != "")
                {
                    model.IsAct = int.Parse(row["IsAct"].ToString());
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
            strSql.Append("select Id,CourseId,LowLimit,UpperLimit,Ranking,GoodsId,CreateDate,IsAct ");
			strSql.Append(" FROM WX_Course_RuleSet ");
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
            strSql.Append(" Id,CourseId,LowLimit,UpperLimit,Ranking,GoodsId,CreateDate,IsAct ");
			strSql.Append(" FROM WX_Course_RuleSet ");
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
			strSql.Append("select count(1) FROM WX_Course_RuleSet ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_RuleSet T ");
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
			parameters[0].Value = "WX_Course_RuleSet";
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

