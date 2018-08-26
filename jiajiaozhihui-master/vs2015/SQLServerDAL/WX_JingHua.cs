using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_JingHua
	/// </summary>
	public partial class WX_JingHua:IWX_JingHua
	{
		public WX_JingHua()
		{}
		#region  BasicMethod



		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_JingHua model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_JingHua(");
            strSql.Append("Title,ArticleUrl,ImgUrl,GroupTitle,[Order],CreateDate,IsHead,ArticleType,[Year],[Month],Week,Detail,ReleaseDate)");
			strSql.Append(" values (");
            strSql.Append("@Title,@ArticleUrl,@ImgUrl,@GroupTitle,@Order,@CreateDate,@IsHead,@ArticleType,@Year,@Month,@Week,@Detail,@ReleaseDate)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Title", SqlDbType.NVarChar,200),
					new SqlParameter("@ArticleUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@GroupTitle", SqlDbType.NVarChar,200),
					new SqlParameter("@Order", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsHead", SqlDbType.Int,4),
                    new SqlParameter("@ArticleType", SqlDbType.Int,4),
                    new SqlParameter("@Year", SqlDbType.Int,4),
                    new SqlParameter("@Month", SqlDbType.Int,4),
                    new SqlParameter("@Week", SqlDbType.Int,4),
                    new SqlParameter("@Detail", SqlDbType.Text),
                    new SqlParameter("@ReleaseDate", SqlDbType.DateTime)};
			parameters[0].Value = model.Title;
			parameters[1].Value = model.ArticleUrl;
			parameters[2].Value = model.ImgUrl;
			parameters[3].Value = model.GroupTitle;
			parameters[4].Value = model.Order;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.IsHead;
            parameters[7].Value = model.ArticleType;
            parameters[8].Value = model.Year;
            parameters[9].Value = model.Month;
            parameters[10].Value = model.Week;
            parameters[11].Value = model.Detail;
            parameters[12].Value = model.ReleaseDate;

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
		public bool Update(SfSoft.Model.WX_JingHua model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_JingHua set ");
			strSql.Append("Title=@Title,");
			strSql.Append("ArticleUrl=@ArticleUrl,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("GroupTitle=@GroupTitle,");
			strSql.Append("[Order]=@Order,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("IsHead=@IsHead,");
            strSql.Append("ArticleType=@ArticleType,");
            strSql.Append("[Year]=@Year,");
            strSql.Append("[Month]=@Month,");
            strSql.Append("Week=@Week,");
            strSql.Append("Detail=@Detail,");
            strSql.Append("ReleaseDate=@ReleaseDate");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@Title", SqlDbType.NVarChar,200),
					new SqlParameter("@ArticleUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@GroupTitle", SqlDbType.NVarChar,200),
					new SqlParameter("@Order", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@IsHead", SqlDbType.Int,4),
                    new SqlParameter("@ArticleType", SqlDbType.Int,4),
                    new SqlParameter("@Year", SqlDbType.Int,4),
                    new SqlParameter("@Month", SqlDbType.Int,4),
                    new SqlParameter("@Week", SqlDbType.Int,4),
                    new SqlParameter("@Detail", SqlDbType.Text),
                    new SqlParameter("@ReleaseDate", SqlDbType.DateTime),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.Title;
			parameters[1].Value = model.ArticleUrl;
			parameters[2].Value = model.ImgUrl;
			parameters[3].Value = model.GroupTitle;
			parameters[4].Value = model.Order;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.IsHead;
            parameters[7].Value = model.ArticleType;
            parameters[8].Value = model.Year;
            parameters[9].Value = model.Month;
            parameters[10].Value = model.Week;
            parameters[11].Value = model.Detail;
            parameters[12].Value = model.ReleaseDate;
			parameters[13].Value = model.ID;

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
			strSql.Append("delete from WX_JingHua ");
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
			strSql.Append("delete from WX_JingHua ");
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
		public SfSoft.Model.WX_JingHua GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,Title,ArticleUrl,ImgUrl,GroupTitle,[Order],CreateDate,IsHead,ArticleType,[Year],[Month],Week,Detail,ReleaseDate from WX_JingHua ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_JingHua model=new SfSoft.Model.WX_JingHua();
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
		public SfSoft.Model.WX_JingHua DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_JingHua model=new SfSoft.Model.WX_JingHua();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["Title"]!=null)
				{
					model.Title=row["Title"].ToString();
				}
				if(row["ArticleUrl"]!=null)
				{
					model.ArticleUrl=row["ArticleUrl"].ToString();
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["GroupTitle"]!=null)
				{
					model.GroupTitle=row["GroupTitle"].ToString();
				}
				if(row["Order"]!=null && row["Order"].ToString()!="")
				{
					model.Order=int.Parse(row["Order"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["IsHead"] != null && row["IsHead"].ToString() != "")
                {
                    model.IsHead = int.Parse(row["IsHead"].ToString());
                }
                if (row["ArticleType"] != null && row["ArticleType"].ToString() != "")
                {
                    model.ArticleType = int.Parse(row["ArticleType"].ToString());
                }
                if (row["Year"] != null && row["Year"].ToString() != "")
                {
                    model.Year = int.Parse(row["Year"].ToString());
                }
                if (row["Month"] != null && row["Month"].ToString() != "")
                {
                    model.Month = int.Parse(row["Month"].ToString());
                }
                if (row["Week"] != null && row["Week"].ToString() != "")
                {
                    model.Week = int.Parse(row["Week"].ToString());
                }
                if (row["Detail"] != null)
                {
                    model.Detail = row["Detail"].ToString();
                }
                if (row["ReleaseDate"] != null && row["ReleaseDate"].ToString() != "")
                {
                    model.ReleaseDate = DateTime.Parse(row["ReleaseDate"].ToString());
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
            strSql.Append("select ID,Title,ArticleUrl,ImgUrl,GroupTitle,[Order],CreateDate,IsHead,ArticleType,[Year],[Month],Week,Detail,ReleaseDate ");
			strSql.Append(" FROM WX_JingHua ");
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
            strSql.Append(" ID,Title,ArticleUrl,ImgUrl,GroupTitle,[Order],CreateDate,IsHead,ArticleType,[Year],[Month],Week,Detail,ReleaseDate ");
			strSql.Append(" FROM WX_JingHua ");
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
			strSql.Append("select count(1) FROM WX_JingHua ");
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
			strSql.Append(")AS Row, T.*  from WX_JingHua T ");
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
			parameters[0].Value = "WX_JingHua";
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
	}
}

