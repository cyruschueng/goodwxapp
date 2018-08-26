using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_QA_File
	/// </summary>
	public partial class WX_QA_File:IWX_QA_File
	{
		public WX_QA_File()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_QA_File"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_QA_File");
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
		public int Add(SfSoft.Model.WX_QA_File model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_QA_File(");
            strSql.Append("AppId,OpenId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment,FileType,Title,Tag,Expert,BrowseNumber,ExpertType,IsNew)");
			strSql.Append(" values (");
            strSql.Append("@AppId,@OpenId,@LikeNumber,@CommentNumber,@CreateDate,@Sn,@IsTop,@Status,@Comment,@FileType,@Title,@Tag,@Expert,@BrowseNumber,@ExpertType,@IsNew)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@CommentNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@Comment", SqlDbType.NVarChar,100),
					new SqlParameter("@FileType", SqlDbType.Int,4),
                    new SqlParameter("@Title", SqlDbType.NVarChar,100),
                    new SqlParameter("@Tag", SqlDbType.NVarChar,300),
                    new SqlParameter("@Expert", SqlDbType.NVarChar,100),
                    new SqlParameter("@BrowseNumber", SqlDbType.Int,4),
                    new SqlParameter("@ExpertType", SqlDbType.Int,4),
                    new SqlParameter("@IsNew", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.LikeNumber;
			parameters[3].Value = model.CommentNumber;
			parameters[4].Value = model.CreateDate;
			parameters[5].Value = model.Sn;
			parameters[6].Value = model.IsTop;
			parameters[7].Value = model.Status;
			parameters[8].Value = model.Comment;
			parameters[9].Value = model.FileType;
            parameters[10].Value = model.Title;
            parameters[11].Value = model.Tag;
            parameters[12].Value = model.Expert;
            parameters[13].Value = model.BrowseNumber;
            parameters[14].Value = model.ExpertType;
            parameters[15].Value = model.IsNew;

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
		public bool Update(SfSoft.Model.WX_QA_File model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_QA_File set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("LikeNumber=@LikeNumber,");
			strSql.Append("CommentNumber=@CommentNumber,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Sn=@Sn,");
			strSql.Append("IsTop=@IsTop,");
			strSql.Append("Status=@Status,");
			strSql.Append("Comment=@Comment,");
			strSql.Append("FileType=@FileType,");
            strSql.Append("Title=@Title,");
            strSql.Append("Tag=@Tag,");
            strSql.Append("Expert=@Expert,");
            strSql.Append("BrowseNumber=@BrowseNumber,");
            strSql.Append("ExpertType=@ExpertType,");
            strSql.Append("IsNew=@IsNew");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@CommentNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@Comment", SqlDbType.NVarChar,100),
					new SqlParameter("@FileType", SqlDbType.Int,4),
                    new SqlParameter("@Title", SqlDbType.NVarChar,100),
                    new SqlParameter("@Tag", SqlDbType.NVarChar,3000),
                    new SqlParameter("@Expert", SqlDbType.NVarChar,100),
                    new SqlParameter("@BrowseNumber", SqlDbType.Int,4),
                    new SqlParameter("@ExpertType", SqlDbType.Int,4),
                    new SqlParameter("@IsNew", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.LikeNumber;
			parameters[3].Value = model.CommentNumber;
			parameters[4].Value = model.CreateDate;
			parameters[5].Value = model.Sn;
			parameters[6].Value = model.IsTop;
			parameters[7].Value = model.Status;
			parameters[8].Value = model.Comment;
			parameters[9].Value = model.FileType;
            parameters[10].Value = model.Title;
            parameters[11].Value = model.Tag;
            parameters[12].Value = model.Expert;
            parameters[13].Value = model.BrowseNumber;
            parameters[14].Value = model.ExpertType;
            parameters[15].Value = model.IsNew;
			parameters[16].Value = model.Id;

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
			strSql.Append("delete from WX_QA_File ");
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
			strSql.Append("delete from WX_QA_File ");
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
		public SfSoft.Model.WX_QA_File GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,AppId,OpenId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment,FileType,Title,Tag,Expert,BrowseNumber,ExpertType,IsNew from WX_QA_File ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_QA_File model=new SfSoft.Model.WX_QA_File();
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
		public SfSoft.Model.WX_QA_File DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_QA_File model=new SfSoft.Model.WX_QA_File();
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
				if(row["Comment"]!=null)
				{
					model.Comment=row["Comment"].ToString();
				}
				if(row["FileType"]!=null && row["FileType"].ToString()!="")
				{
					model.FileType=int.Parse(row["FileType"].ToString());
				}
                if (row["Title"] != null)
                {
                    model.Title = row["Title"].ToString();
                }
                if (row["Tag"] != null)
                {
                    model.Tag = row["Tag"].ToString();
                }
                if (row["Expert"] != null)
                {
                    model.Expert = row["Expert"].ToString();
                }
                if (row["BrowseNumber"] != null && row["BrowseNumber"].ToString() != "")
                {
                    model.BrowseNumber = int.Parse(row["BrowseNumber"].ToString());
                }
                if (row["ExpertType"] != null && row["ExpertType"].ToString() != "")
                {
                    model.ExpertType = int.Parse(row["ExpertType"].ToString());
                }
                if (row["IsNew"] != null && row["IsNew"].ToString() != "")
                {
                    model.IsNew = int.Parse(row["IsNew"].ToString());
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
            strSql.Append("select Id,AppId,OpenId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment,FileType,Title,Tag,Expert,BrowseNumber,ExpertType,IsNew ");
			strSql.Append(" FROM WX_QA_File ");
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
            strSql.Append(" Id,AppId,OpenId,LikeNumber,CommentNumber,CreateDate,Sn,IsTop,Status,Comment,FileType,Title,Tag,Expert,BrowseNumber,ExpertType,IsNew ");
			strSql.Append(" FROM WX_QA_File ");
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
			strSql.Append("select count(1) FROM WX_QA_File ");
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
			strSql.Append(")AS Row, T.*  from WX_QA_File T ");
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
        public DataSet GetList(int PageSize, int PageIndex, string orderType, string strWhere)
        {
            SqlParameter[] parameters = {
					new SqlParameter("@tblName", SqlDbType.VarChar, 255),
					new SqlParameter("@PageSize", SqlDbType.Int),
					new SqlParameter("@PageIndex", SqlDbType.Int),
					new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
                    new SqlParameter("@orderBy", SqlDbType.NVarChar,200),
					};
            parameters[0].Value = "WX_QA_File";
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

