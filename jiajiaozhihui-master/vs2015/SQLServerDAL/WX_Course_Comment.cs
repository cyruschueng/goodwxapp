using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Comment
	/// </summary>
	public partial class WX_Course_Comment:IWX_Course_Comment
	{
		public WX_Course_Comment()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Comment"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Comment");
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
		public int Add(SfSoft.Model.WX_Course_Comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Comment(");
            strSql.Append("CourseId,CommentOpenId,CommentName,ReplyOpenId,ReplayName,Content,CreateDate,IsCheck,Grade,HeadImgUrl)");
			strSql.Append(" values (");
            strSql.Append("@CourseId,@CommentOpenId,@CommentName,@ReplyOpenId,@ReplayName,@Content,@CreateDate,@IsCheck,@Grade,@HeadImgUrl)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@CommentOpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@CommentName", SqlDbType.NVarChar,100),
					new SqlParameter("@ReplyOpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ReplayName", SqlDbType.NVarChar,100),
					new SqlParameter("@Content", SqlDbType.NVarChar,200),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@IsCheck", SqlDbType.Int,4),
					new SqlParameter("@Grade", SqlDbType.NVarChar,50),
                    new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.CommentOpenId;
			parameters[2].Value = model.CommentName;
			parameters[3].Value = model.ReplyOpenId;
			parameters[4].Value = model.ReplayName;
			parameters[5].Value = model.Content;
			parameters[6].Value = model.CreateDate;
			parameters[7].Value = model.IsCheck;
			parameters[8].Value = model.Grade;
            parameters[9].Value = model.HeadImgUrl;

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
		public bool Update(SfSoft.Model.WX_Course_Comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Comment set ");
			strSql.Append("CourseId=@CourseId,");
			strSql.Append("CommentOpenId=@CommentOpenId,");
			strSql.Append("CommentName=@CommentName,");
			strSql.Append("ReplyOpenId=@ReplyOpenId,");
			strSql.Append("ReplayName=@ReplayName,");
			strSql.Append("Content=@Content,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("IsCheck=@IsCheck,");
			strSql.Append("Grade=@Grade,");
            strSql.Append("HeadImgUrl=@HeadImgUrl");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@CommentOpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@CommentName", SqlDbType.NVarChar,100),
					new SqlParameter("@ReplyOpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ReplayName", SqlDbType.NVarChar,100),
					new SqlParameter("@Content", SqlDbType.NVarChar,200),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@IsCheck", SqlDbType.Int,4),
					new SqlParameter("@Grade", SqlDbType.NVarChar,50),
                    new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.CommentOpenId;
			parameters[2].Value = model.CommentName;
			parameters[3].Value = model.ReplyOpenId;
			parameters[4].Value = model.ReplayName;
			parameters[5].Value = model.Content;
			parameters[6].Value = model.CreateDate;
			parameters[7].Value = model.IsCheck;
			parameters[8].Value = model.Grade;
            parameters[9].Value = model.HeadImgUrl;
			parameters[10].Value = model.Id;

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
			strSql.Append("delete from WX_Course_Comment ");
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
			strSql.Append("delete from WX_Course_Comment ");
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
		public SfSoft.Model.WX_Course_Comment GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,CourseId,CommentOpenId,CommentName,ReplyOpenId,ReplayName,Content,CreateDate,IsCheck,Grade,HeadImgUrl from WX_Course_Comment ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Comment model=new SfSoft.Model.WX_Course_Comment();
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
		public SfSoft.Model.WX_Course_Comment DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Comment model=new SfSoft.Model.WX_Course_Comment();
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
				if(row["CommentOpenId"]!=null)
				{
					model.CommentOpenId=row["CommentOpenId"].ToString();
				}
				if(row["CommentName"]!=null)
				{
					model.CommentName=row["CommentName"].ToString();
				}
				if(row["ReplyOpenId"]!=null)
				{
					model.ReplyOpenId=row["ReplyOpenId"].ToString();
				}
				if(row["ReplayName"]!=null)
				{
					model.ReplayName=row["ReplayName"].ToString();
				}
				if(row["Content"]!=null)
				{
					model.Content=row["Content"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["IsCheck"]!=null && row["IsCheck"].ToString()!="")
				{
					model.IsCheck=int.Parse(row["IsCheck"].ToString());
				}
				if(row["Grade"]!=null)
				{
					model.Grade=row["Grade"].ToString();
				}
                if (row["HeadImgUrl"] != null)
                {
                    model.HeadImgUrl = row["HeadImgUrl"].ToString();
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
            strSql.Append("select Id,CourseId,CommentOpenId,CommentName,ReplyOpenId,ReplayName,Content,CreateDate,IsCheck,Grade,HeadImgUrl ");
			strSql.Append(" FROM WX_Course_Comment ");
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
            strSql.Append(" Id,CourseId,CommentOpenId,CommentName,ReplyOpenId,ReplayName,Content,CreateDate,IsCheck,Grade,HeadImgUrl ");
			strSql.Append(" FROM WX_Course_Comment ");
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
			strSql.Append("select count(1) FROM WX_Course_Comment ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Comment T ");
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
			parameters[0].Value = "WX_Course_Comment";
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

