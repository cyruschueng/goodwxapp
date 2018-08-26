using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_ZXS_PlayerTask
	/// </summary>
	public partial class WX_ZXS_PlayerTask:IWX_ZXS_PlayerTask
	{
		public WX_ZXS_PlayerTask()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_ZXS_PlayerTask"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_ZXS_PlayerTask");
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
		public int Add(SfSoft.Model.WX_ZXS_PlayerTask model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_ZXS_PlayerTask(");
            strSql.Append("AppId,OpenId,ThemeId,Week,TaskId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment)");
			strSql.Append(" values (");
            strSql.Append("@AppId,@OpenId,@ThemeId,@Week,@TaskId,@LikeNumber,@CommentNumber,@CreateDate,@Sn,@IsTop,@Status,@Comment)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ThemeId", SqlDbType.Int,4),
					new SqlParameter("@Week", SqlDbType.Int,4),
					new SqlParameter("@TaskId", SqlDbType.Int,4),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@CommentNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
                    new SqlParameter("@Comment", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.ThemeId;
			parameters[3].Value = model.Week;
			parameters[4].Value = model.TaskId;
			parameters[5].Value = model.LikeNumber;
			parameters[6].Value = model.CommentNumber;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.Sn;
			parameters[9].Value = model.IsTop;
			parameters[10].Value = model.Status;
            parameters[11].Value = model.Comment;

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
		public bool Update(SfSoft.Model.WX_ZXS_PlayerTask model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_ZXS_PlayerTask set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("ThemeId=@ThemeId,");
			strSql.Append("Week=@Week,");
			strSql.Append("TaskId=@TaskId,");
			strSql.Append("LikeNumber=@LikeNumber,");
			strSql.Append("CommentNumber=@CommentNumber,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Sn=@Sn,");
			strSql.Append("IsTop=@IsTop,");
			strSql.Append("Status=@Status,");
            strSql.Append("Comment=@Comment");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ThemeId", SqlDbType.Int,4),
					new SqlParameter("@Week", SqlDbType.Int,4),
					new SqlParameter("@TaskId", SqlDbType.Int,4),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@CommentNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
                    new SqlParameter("@Comment", SqlDbType.NVarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.ThemeId;
			parameters[3].Value = model.Week;
			parameters[4].Value = model.TaskId;
			parameters[5].Value = model.LikeNumber;
			parameters[6].Value = model.CommentNumber;
			parameters[7].Value = model.CreateDate;
			parameters[8].Value = model.Sn;
			parameters[9].Value = model.IsTop;
			parameters[10].Value = model.Status;
            parameters[11].Value = model.Comment;
			parameters[12].Value = model.Id;

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
			strSql.Append("delete from WX_ZXS_PlayerTask ");
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
			strSql.Append("delete from WX_ZXS_PlayerTask ");
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
		public SfSoft.Model.WX_ZXS_PlayerTask GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,AppId,OpenId,ThemeId,Week,TaskId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment from WX_ZXS_PlayerTask ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_ZXS_PlayerTask model=new SfSoft.Model.WX_ZXS_PlayerTask();
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
		public SfSoft.Model.WX_ZXS_PlayerTask DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_ZXS_PlayerTask model=new SfSoft.Model.WX_ZXS_PlayerTask();
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
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["ThemeId"]!=null && row["ThemeId"].ToString()!="")
				{
					model.ThemeId=int.Parse(row["ThemeId"].ToString());
				}
				if(row["Week"]!=null && row["Week"].ToString()!="")
				{
					model.Week=int.Parse(row["Week"].ToString());
				}
				if(row["TaskId"]!=null && row["TaskId"].ToString()!="")
				{
					model.TaskId=int.Parse(row["TaskId"].ToString());
				}
				if(row["LikeNumber"]!=null && row["LikeNumber"].ToString()!="")
				{
					model.LikeNumber=int.Parse(row["LikeNumber"].ToString());
				}
				if(row["CommentNumber"]!=null && row["CommentNumber"].ToString()!="")
				{
					model.CommentNumber=int.Parse(row["CommentNumber"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["Sn"]!=null && row["Sn"].ToString()!="")
				{
					model.Sn=int.Parse(row["Sn"].ToString());
				}
				if(row["IsTop"]!=null && row["IsTop"].ToString()!="")
				{
					model.IsTop=int.Parse(row["IsTop"].ToString());
				}
				if(row["Status"]!=null && row["Status"].ToString()!="")
				{
					model.Status=int.Parse(row["Status"].ToString());
				}
                if (row["Comment"] != null)
                {
                    model.Comment = row["Comment"].ToString();
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
            strSql.Append("select Id,AppId,OpenId,ThemeId,Week,TaskId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment ");
			strSql.Append(" FROM WX_ZXS_PlayerTask ");
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
            strSql.Append(" Id,AppId,OpenId,ThemeId,Week,TaskId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment ");
			strSql.Append(" FROM WX_ZXS_PlayerTask ");
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
			strSql.Append("select count(1) FROM WX_ZXS_PlayerTask ");
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
			strSql.Append(")AS Row, T.*  from WX_ZXS_PlayerTask T ");
			if (!string.IsNullOrEmpty(strWhere.Trim()))
			{
				strSql.Append(" WHERE " + strWhere);
			}
			strSql.Append(" ) TT");
			strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
			return DbHelperSQL.Query(strSql.ToString());
		}

		
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetList(int PageSize,int PageIndex,string orderType, string strWhere)
		{
			SqlParameter[] parameters = {
					new SqlParameter("@tblName", SqlDbType.VarChar, 255),
					new SqlParameter("@PageSize", SqlDbType.Int),
					new SqlParameter("@PageIndex", SqlDbType.Int),
					new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
                    new SqlParameter("@orderBy", SqlDbType.NVarChar,200),
					};
			parameters[0].Value = "WX_ZXS_PlayerTask";
			parameters[1].Value = PageSize;
			parameters[2].Value = PageIndex;
			parameters[3].Value = strWhere;
            parameters[4].Value = orderType;
            return DbHelperSQL.RunProcedure("UP_GetRecordByPage", parameters, "ds");
		}

		#endregion  BasicMethod
		#region  ExtensionMethod

		#endregion  ExtensionMethod
	}
}

