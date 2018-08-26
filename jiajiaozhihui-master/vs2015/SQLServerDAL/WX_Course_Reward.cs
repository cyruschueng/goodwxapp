using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Reward
	/// </summary>
	public partial class WX_Course_Reward:IWX_Course_Reward
	{
		public WX_Course_Reward()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Reward"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Reward");
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
		public int Add(SfSoft.Model.WX_Course_Reward model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Reward(");
            strSql.Append("Class,StartNumber,EndNumber,Rate,Type,Sort,IsAct )");
			strSql.Append(" values (");
            strSql.Append("@Class,@StartNumber,@EndNumber,@Rate,@Type,@Sort,@IsAct )");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Class", SqlDbType.NVarChar,50),
					new SqlParameter("@StartNumber", SqlDbType.Int,4),
					new SqlParameter("@EndNumber", SqlDbType.Int,4),
					new SqlParameter("@Rate", SqlDbType.Float,8),
					new SqlParameter("@Type", SqlDbType.Int,4),
                    new SqlParameter("@Sort", SqlDbType.Int,4),
                    new SqlParameter("@IsAct", SqlDbType.Int,4)};
			parameters[0].Value = model.Class;
			parameters[1].Value = model.StartNumber;
			parameters[2].Value = model.EndNumber;
			parameters[3].Value = model.Rate;
			parameters[4].Value = model.Type;
            parameters[5].Value = model.Sort;
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
		public bool Update(SfSoft.Model.WX_Course_Reward model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Reward set ");
            strSql.Append("Class=@Class,");
			strSql.Append("StartNumber=@StartNumber,");
			strSql.Append("EndNumber=@EndNumber,");
			strSql.Append("Rate=@Rate,");
			strSql.Append("Type=@Type,");
            strSql.Append("Sort=@Sort,");
            strSql.Append("IsAct=@IsAct");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Class", SqlDbType.NVarChar,50),
					new SqlParameter("@StartNumber", SqlDbType.Int,4),
					new SqlParameter("@EndNumber", SqlDbType.Int,4),
					new SqlParameter("@Rate", SqlDbType.Float,8),
					new SqlParameter("@Type", SqlDbType.Int,4),
                    new SqlParameter("@Sort", SqlDbType.Int,4),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.Class;
			parameters[1].Value = model.StartNumber;
			parameters[2].Value = model.EndNumber;
			parameters[3].Value = model.Rate;
			parameters[4].Value = model.Type;
            parameters[5].Value = model.Sort;
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
			strSql.Append("delete from WX_Course_Reward ");
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
			strSql.Append("delete from WX_Course_Reward ");
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
		public SfSoft.Model.WX_Course_Reward GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,Class,StartNumber,EndNumber,Rate,Type,Sort,IsAct from WX_Course_Reward ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Reward model=new SfSoft.Model.WX_Course_Reward();
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
		public SfSoft.Model.WX_Course_Reward DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Reward model=new SfSoft.Model.WX_Course_Reward();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
                if (row["Class"] != null)
				{
                    model.Class = row["Class"].ToString();
				}
				if(row["StartNumber"]!=null && row["StartNumber"].ToString()!="")
				{
					model.StartNumber=int.Parse(row["StartNumber"].ToString());
				}
				if(row["EndNumber"]!=null && row["EndNumber"].ToString()!="")
				{
					model.EndNumber=int.Parse(row["EndNumber"].ToString());
				}
				if(row["Rate"]!=null && row["Rate"].ToString()!="")
				{
					model.Rate=decimal.Parse(row["Rate"].ToString());
				}
				if(row["Type"]!=null && row["Type"].ToString()!="")
				{
					model.Type=int.Parse(row["Type"].ToString());
				}
                if (row["Sort"] != null && row["Sort"].ToString() != "")
                {
                    model.Sort = int.Parse(row["Sort"].ToString());
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
            strSql.Append("select Id,Class,StartNumber,EndNumber,Rate,Type,Sort,IsAct ");
			strSql.Append(" FROM WX_Course_Reward ");
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
            strSql.Append(" Id,Class,StartNumber,EndNumber,Rate,Type,Sort,IsAct ");
			strSql.Append(" FROM WX_Course_Reward ");
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
			strSql.Append("select count(1) FROM WX_Course_Reward ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Reward T ");
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
			parameters[0].Value = "WX_Course_Reward";
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

