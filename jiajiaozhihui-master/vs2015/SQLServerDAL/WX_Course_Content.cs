using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_Content
	/// </summary>
	public partial class WX_Course_Content:IWX_Course_Content
	{
		public WX_Course_Content()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_Content"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_Content");
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
		public int Add(SfSoft.Model.WX_Course_Content model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_Content(");
            strSql.Append("CourseId,Type,Duration,Url,Content,Sn,IsAct,Isiframe,Cover,Responsive,SectionId,Roles,Cname,CreateDate,Interval,Already,AtOnceShow)");
			strSql.Append(" values (");
            strSql.Append("@CourseId,@Type,@Duration,@Url,@Content,@Sn,@IsAct,@Isiframe,@Cover,@Responsive,@SectionId,@Roles,@Cname,@CreateDate,@Interval,@Already,@AtOnceShow)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@Type", SqlDbType.Int,4),
					new SqlParameter("@Duration", SqlDbType.Float,8),
					new SqlParameter("@Url", SqlDbType.NVarChar,1000),
					new SqlParameter("@Content", SqlDbType.Text),
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Isiframe", SqlDbType.Int,4),
					new SqlParameter("@Cover", SqlDbType.NVarChar,300),
					new SqlParameter("@Responsive", SqlDbType.NVarChar,100),
					new SqlParameter("@SectionId", SqlDbType.NVarChar,100),
					new SqlParameter("@Roles", SqlDbType.NVarChar,50),
					new SqlParameter("@Cname", SqlDbType.NVarChar,50),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Interval", SqlDbType.Int,4),
                    new SqlParameter("@Already", SqlDbType.Int,4),
                    new SqlParameter("@AtOnceShow", SqlDbType.Int,4)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.Type;
			parameters[2].Value = model.Duration;
			parameters[3].Value = model.Url;
			parameters[4].Value = model.Content;
			parameters[5].Value = model.Sn;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.Isiframe;
			parameters[8].Value = model.Cover;
			parameters[9].Value = model.Responsive;
			parameters[10].Value = model.SectionId;
			parameters[11].Value = model.Roles;
			parameters[12].Value = model.Cname;
			parameters[13].Value = model.CreateDate;
			parameters[14].Value = model.Interval;
            parameters[15].Value = model.Already;
            parameters[16].Value = model.AtOnceShow;

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
		public bool Update(SfSoft.Model.WX_Course_Content model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_Content set ");
			strSql.Append("CourseId=@CourseId,");
			strSql.Append("Type=@Type,");
			strSql.Append("Duration=@Duration,");
			strSql.Append("Url=@Url,");
			strSql.Append("Content=@Content,");
			strSql.Append("Sn=@Sn,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("Isiframe=@Isiframe,");
			strSql.Append("Cover=@Cover,");
			strSql.Append("Responsive=@Responsive,");
			strSql.Append("SectionId=@SectionId,");
			strSql.Append("Roles=@Roles,");
			strSql.Append("Cname=@Cname,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Interval=@Interval,");
            strSql.Append("Already=@Already,");
            strSql.Append("AtOnceShow=@AtOnceShow");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@CourseId", SqlDbType.Int,4),
					new SqlParameter("@Type", SqlDbType.Int,4),
					new SqlParameter("@Duration", SqlDbType.Float,8),
					new SqlParameter("@Url", SqlDbType.NVarChar,1000),
					new SqlParameter("@Content", SqlDbType.Text),
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Isiframe", SqlDbType.Int,4),
					new SqlParameter("@Cover", SqlDbType.NVarChar,300),
					new SqlParameter("@Responsive", SqlDbType.NVarChar,100),
					new SqlParameter("@SectionId", SqlDbType.NVarChar,100),
					new SqlParameter("@Roles", SqlDbType.NVarChar,50),
					new SqlParameter("@Cname", SqlDbType.NVarChar,50),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Interval", SqlDbType.Int,4),
                    new SqlParameter("@Already", SqlDbType.Int,4),
                    new SqlParameter("@AtOnceShow", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.CourseId;
			parameters[1].Value = model.Type;
			parameters[2].Value = model.Duration;
			parameters[3].Value = model.Url;
			parameters[4].Value = model.Content;
			parameters[5].Value = model.Sn;
			parameters[6].Value = model.IsAct;
			parameters[7].Value = model.Isiframe;
			parameters[8].Value = model.Cover;
			parameters[9].Value = model.Responsive;
			parameters[10].Value = model.SectionId;
			parameters[11].Value = model.Roles;
			parameters[12].Value = model.Cname;
			parameters[13].Value = model.CreateDate;
			parameters[14].Value = model.Interval;
            parameters[15].Value = model.Already;
            parameters[16].Value = model.AtOnceShow;
			parameters[17].Value = model.Id;

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
			strSql.Append("delete from WX_Course_Content ");
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
			strSql.Append("delete from WX_Course_Content ");
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
		public SfSoft.Model.WX_Course_Content GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,CourseId,Type,Duration,Url,Content,Sn,IsAct,Isiframe,Cover,Responsive,SectionId,Roles,Cname,CreateDate,Interval,Already,AtOnceShow from WX_Course_Content ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_Content model=new SfSoft.Model.WX_Course_Content();
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
		public SfSoft.Model.WX_Course_Content DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_Content model=new SfSoft.Model.WX_Course_Content();
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
				if(row["Type"]!=null && row["Type"].ToString()!="")
				{
					model.Type=int.Parse(row["Type"].ToString());
				}
				if(row["Duration"]!=null && row["Duration"].ToString()!="")
				{
					model.Duration=decimal.Parse(row["Duration"].ToString());
				}
				if(row["Url"]!=null)
				{
					model.Url=row["Url"].ToString();
				}
				if(row["Content"]!=null)
				{
					model.Content=row["Content"].ToString();
				}
				if(row["Sn"]!=null && row["Sn"].ToString()!="")
				{
					model.Sn=int.Parse(row["Sn"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["Isiframe"]!=null && row["Isiframe"].ToString()!="")
				{
					model.Isiframe=int.Parse(row["Isiframe"].ToString());
				}
				if(row["Cover"]!=null)
				{
					model.Cover=row["Cover"].ToString();
				}
				if(row["Responsive"]!=null)
				{
					model.Responsive=row["Responsive"].ToString();
				}
				if(row["SectionId"]!=null)
				{
					model.SectionId=row["SectionId"].ToString();
				}
				if(row["Roles"]!=null)
				{
					model.Roles=row["Roles"].ToString();
				}
				if(row["Cname"]!=null)
				{
					model.Cname=row["Cname"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["Interval"]!=null && row["Interval"].ToString()!="")
				{
					model.Interval=int.Parse(row["Interval"].ToString());
				}
                if (row["Already"] != null && row["Already"].ToString() != "")
                {
                    model.Already = int.Parse(row["Already"].ToString());
                }
                if (row["AtOnceShow"] != null && row["AtOnceShow"].ToString() != "")
                {
                    model.AtOnceShow = int.Parse(row["AtOnceShow"].ToString());
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
            strSql.Append("select Id,CourseId,Type,Duration,Url,Content,Sn,IsAct,Isiframe,Cover,Responsive,SectionId,Roles,Cname,CreateDate,Interval,Already,AtOnceShow ");
			strSql.Append(" FROM WX_Course_Content ");
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
            strSql.Append(" Id,CourseId,Type,Duration,Url,Content,Sn,IsAct,Isiframe,Cover,Responsive,SectionId,Roles,Cname,CreateDate,Interval,Already,AtOnceShow ");
			strSql.Append(" FROM WX_Course_Content ");
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
			strSql.Append("select count(1) FROM WX_Course_Content ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_Content T ");
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
			parameters[0].Value = "WX_Course_Content";
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

