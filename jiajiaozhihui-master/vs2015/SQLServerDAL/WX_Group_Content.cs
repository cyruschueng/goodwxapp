using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Group_Content
	/// </summary>
	public partial class WX_Group_Content:IWX_Group_Content
	{
		public WX_Group_Content()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Group_Content"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Group_Content");
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
		public int Add(SfSoft.Model.WX_Group_Content model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Group_Content(");
			strSql.Append("OpenId,GroupId,MediaType,ImgUrl,AudioUrl,VideoUrl,Resume,LikeNumber,ViewNumber,CommentNumber,CreateDate,Fileid,Rank,Owner,IsAct,IsTop)");
			strSql.Append(" values (");
			strSql.Append("@OpenId,@GroupId,@MediaType,@ImgUrl,@AudioUrl,@VideoUrl,@Resume,@LikeNumber,@ViewNumber,@CommentNumber,@CreateDate,@Fileid,@Rank,@Owner,@IsAct,@IsTop)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@GroupId", SqlDbType.Int,4),
					new SqlParameter("@MediaType", SqlDbType.Int,4),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@AudioUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@VideoUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@Resume", SqlDbType.NVarChar,50),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@ViewNumber", SqlDbType.Int,4),
					new SqlParameter("@CommentNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Fileid", SqlDbType.NVarChar,100),
					new SqlParameter("@Rank", SqlDbType.Int,4),
					new SqlParameter("@Owner", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.GroupId;
			parameters[2].Value = model.MediaType;
			parameters[3].Value = model.ImgUrl;
			parameters[4].Value = model.AudioUrl;
			parameters[5].Value = model.VideoUrl;
			parameters[6].Value = model.Resume;
			parameters[7].Value = model.LikeNumber;
			parameters[8].Value = model.ViewNumber;
			parameters[9].Value = model.CommentNumber;
			parameters[10].Value = model.CreateDate;
			parameters[11].Value = model.Fileid;
			parameters[12].Value = model.Rank;
			parameters[13].Value = model.Owner;
			parameters[14].Value = model.IsAct;
			parameters[15].Value = model.IsTop;

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
		public bool Update(SfSoft.Model.WX_Group_Content model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Group_Content set ");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("GroupId=@GroupId,");
			strSql.Append("MediaType=@MediaType,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("AudioUrl=@AudioUrl,");
			strSql.Append("VideoUrl=@VideoUrl,");
			strSql.Append("Resume=@Resume,");
			strSql.Append("LikeNumber=@LikeNumber,");
			strSql.Append("ViewNumber=@ViewNumber,");
			strSql.Append("CommentNumber=@CommentNumber,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Fileid=@Fileid,");
			strSql.Append("Rank=@Rank,");
			strSql.Append("Owner=@Owner,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("IsTop=@IsTop");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@GroupId", SqlDbType.Int,4),
					new SqlParameter("@MediaType", SqlDbType.Int,4),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@AudioUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@VideoUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@Resume", SqlDbType.NVarChar,50),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@ViewNumber", SqlDbType.Int,4),
					new SqlParameter("@CommentNumber", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Fileid", SqlDbType.NVarChar,100),
					new SqlParameter("@Rank", SqlDbType.Int,4),
					new SqlParameter("@Owner", SqlDbType.NVarChar,50),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.GroupId;
			parameters[2].Value = model.MediaType;
			parameters[3].Value = model.ImgUrl;
			parameters[4].Value = model.AudioUrl;
			parameters[5].Value = model.VideoUrl;
			parameters[6].Value = model.Resume;
			parameters[7].Value = model.LikeNumber;
			parameters[8].Value = model.ViewNumber;
			parameters[9].Value = model.CommentNumber;
			parameters[10].Value = model.CreateDate;
			parameters[11].Value = model.Fileid;
			parameters[12].Value = model.Rank;
			parameters[13].Value = model.Owner;
			parameters[14].Value = model.IsAct;
			parameters[15].Value = model.IsTop;
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
			strSql.Append("delete from WX_Group_Content ");
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
			strSql.Append("delete from WX_Group_Content ");
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
		public SfSoft.Model.WX_Group_Content GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 Id,OpenId,GroupId,MediaType,ImgUrl,AudioUrl,VideoUrl,Resume,LikeNumber,ViewNumber,CommentNumber,CreateDate,Fileid,Rank,Owner,IsAct,IsTop from WX_Group_Content ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Group_Content model=new SfSoft.Model.WX_Group_Content();
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
		public SfSoft.Model.WX_Group_Content DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Group_Content model=new SfSoft.Model.WX_Group_Content();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["GroupId"]!=null && row["GroupId"].ToString()!="")
				{
					model.GroupId=int.Parse(row["GroupId"].ToString());
				}
				if(row["MediaType"]!=null && row["MediaType"].ToString()!="")
				{
					model.MediaType=int.Parse(row["MediaType"].ToString());
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["AudioUrl"]!=null)
				{
					model.AudioUrl=row["AudioUrl"].ToString();
				}
				if(row["VideoUrl"]!=null)
				{
					model.VideoUrl=row["VideoUrl"].ToString();
				}
				if(row["Resume"]!=null)
				{
					model.Resume=row["Resume"].ToString();
				}
				if(row["LikeNumber"]!=null && row["LikeNumber"].ToString()!="")
				{
					model.LikeNumber=int.Parse(row["LikeNumber"].ToString());
				}
				if(row["ViewNumber"]!=null && row["ViewNumber"].ToString()!="")
				{
					model.ViewNumber=int.Parse(row["ViewNumber"].ToString());
				}
				if(row["CommentNumber"]!=null && row["CommentNumber"].ToString()!="")
				{
					model.CommentNumber=int.Parse(row["CommentNumber"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["Fileid"]!=null)
				{
					model.Fileid=row["Fileid"].ToString();
				}
				if(row["Rank"]!=null && row["Rank"].ToString()!="")
				{
					model.Rank=int.Parse(row["Rank"].ToString());
				}
				if(row["Owner"]!=null)
				{
					model.Owner=row["Owner"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["IsTop"]!=null && row["IsTop"].ToString()!="")
				{
					model.IsTop=int.Parse(row["IsTop"].ToString());
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
			strSql.Append("select Id,OpenId,GroupId,MediaType,ImgUrl,AudioUrl,VideoUrl,Resume,LikeNumber,ViewNumber,CommentNumber,CreateDate,Fileid,Rank,Owner,IsAct,IsTop ");
			strSql.Append(" FROM WX_Group_Content ");
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
			strSql.Append(" Id,OpenId,GroupId,MediaType,ImgUrl,AudioUrl,VideoUrl,Resume,LikeNumber,ViewNumber,CommentNumber,CreateDate,Fileid,Rank,Owner,IsAct,IsTop ");
			strSql.Append(" FROM WX_Group_Content ");
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
			strSql.Append("select count(1) FROM WX_Group_Content ");
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
			strSql.Append(")AS Row, T.*  from WX_Group_Content T ");
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
		public DataSet GetList(int PageSize,int PageIndex,string strWhere,string orderBy)
		{
			SqlParameter[] parameters = {
					new SqlParameter("@tblName", SqlDbType.VarChar, 255),
					new SqlParameter("@PageSize", SqlDbType.Int),
					new SqlParameter("@PageIndex", SqlDbType.Int),
					new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
                    new SqlParameter("@orderBy", SqlDbType.VarChar,1000),
					};
			parameters[0].Value = "WX_Group_Content";
			parameters[1].Value = PageSize;
			parameters[2].Value = PageIndex;
			parameters[3].Value = strWhere;
            parameters[4].Value = orderBy;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}

		#endregion  BasicMethod
		#region  ExtensionMethod

		#endregion  ExtensionMethod
	}
}

