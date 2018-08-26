using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Doublenovember_File
	/// </summary>
	public partial class WX_Doublenovember_File:IWX_Doublenovember_File
	{
		public WX_Doublenovember_File()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Doublenovember_File"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Doublenovember_File");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_Doublenovember_File model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Doublenovember_File(");
            strSql.Append("OpenID,ImgUrl,AudioUrl,Resume,Like_Number,View_Number,Create_Date,Last_Date,Fileid,Rank,Stick,Owner,IsAct,Comment_Number,BookName,PageNumber,IsTop,ThumbnailImgUrl,ImgCloudUrl,ImgMediaId,AudioCloudUrl,AudioMediaId,AudioFileId)");
			strSql.Append(" values (");
            strSql.Append("@OpenID,@ImgUrl,@AudioUrl,@Resume,@Like_Number,@View_Number,@Create_Date,@Last_Date,@Fileid,@Rank,@Stick,@Owner,@IsAct,@Comment_Number,@BookName,@PageNumber,@IsTop,@ThumbnailImgUrl,@ImgCloudUrl,@ImgMediaId,@AudioCloudUrl,@AudioMediaId,@AudioFileId)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@AudioUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@Resume", SqlDbType.NVarChar,500),
					new SqlParameter("@Like_Number", SqlDbType.Int,4),
					new SqlParameter("@View_Number", SqlDbType.Int,4),
					new SqlParameter("@Create_Date", SqlDbType.DateTime),
					new SqlParameter("@Last_Date", SqlDbType.DateTime),
                    new SqlParameter("@Fileid", SqlDbType.NVarChar,300),
                    new SqlParameter("@Rank", SqlDbType.Int,4),
                    new SqlParameter("@Stick", SqlDbType.Int,4),
                    new SqlParameter("@Owner", SqlDbType.NVarChar,10),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@Comment_Number", SqlDbType.Int,4),
                    new SqlParameter("@BookName", SqlDbType.NVarChar,100),
                    new SqlParameter("@PageNumber", SqlDbType.Int,4),
                    new SqlParameter("@IsTop", SqlDbType.Int,4),
                    new SqlParameter("@ThumbnailImgUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@ImgCloudUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@ImgMediaId", SqlDbType.NVarChar,200),
                    new SqlParameter("@AudioCloudUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@AudioMediaId", SqlDbType.NVarChar,200),
                    new SqlParameter("@AudioFileId", SqlDbType.NVarChar,300)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.ImgUrl;
			parameters[2].Value = model.AudioUrl;
			parameters[3].Value = model.Resume;
			parameters[4].Value = model.Like_Number;
			parameters[5].Value = model.View_Number;
			parameters[6].Value = model.Create_Date;
			parameters[7].Value = model.Last_Date;
            parameters[8].Value = model.Fileid;
            parameters[9].Value = model.Rank;
            parameters[10].Value = model.Stick;
            parameters[11].Value = model.Owner;
            parameters[12].Value = model.IsAct;
            parameters[13].Value = model.Comment_Number;
            parameters[14].Value = model.BookName;
            parameters[15].Value = model.PageNumber;
            parameters[16].Value = model.IsTop;
            parameters[17].Value = model.ThumbnailImgUrl;
            parameters[18].Value = model.ImgCloudUrl;
            parameters[19].Value = model.ImgMediaId;
            parameters[20].Value = model.AudioCloudUrl;
            parameters[21].Value = model.AudioMediaId;
            parameters[22].Value = model.AudioFileId;

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
		public bool Update(SfSoft.Model.WX_Doublenovember_File model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Doublenovember_File set ");
			strSql.Append("OpenID=@OpenID,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("AudioUrl=@AudioUrl,");
			strSql.Append("Resume=@Resume,");
			strSql.Append("Like_Number=@Like_Number,");
			strSql.Append("View_Number=@View_Number,");
			strSql.Append("Create_Date=@Create_Date,");
			strSql.Append("Last_Date=@Last_Date,");
            strSql.Append("Fileid=@Fileid,");
            strSql.Append("Rank=@Rank,");
            strSql.Append("Stick=@Stick,");
            strSql.Append("Owner=@Owner,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("Comment_Number=@Comment_Number,");
            strSql.Append("BookName=@BookName,");
            strSql.Append("PageNumber=@PageNumber,");
            strSql.Append("IsTop=@IsTop,");
            strSql.Append("ThumbnailImgUrl=@ThumbnailImgUrl,");
            strSql.Append("ImgCloudUrl=@ImgCloudUrl,");
            strSql.Append("ImgMediaId=@ImgMediaId,");
            strSql.Append("AudioCloudUrl=@AudioCloudUrl,");
            strSql.Append("AudioMediaId=@AudioMediaId,");
            strSql.Append("AudioFileId=@AudioFileId");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@AudioUrl", SqlDbType.NVarChar,500),
					new SqlParameter("@Resume", SqlDbType.NVarChar,500),
					new SqlParameter("@Like_Number", SqlDbType.Int,4),
					new SqlParameter("@View_Number", SqlDbType.Int,4),
					new SqlParameter("@Create_Date", SqlDbType.DateTime),
					new SqlParameter("@Last_Date", SqlDbType.DateTime),
                    new SqlParameter("@Fileid", SqlDbType.NVarChar,300),
                    new SqlParameter("@Rank", SqlDbType.Int,4),
                    new SqlParameter("@Stick", SqlDbType.Int,4),
                    new SqlParameter("@Owner", SqlDbType.NVarChar,10),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@Comment_Number", SqlDbType.Int,4),
                    new SqlParameter("@BookName", SqlDbType.NVarChar,100),
                    new SqlParameter("@PageNumber", SqlDbType.Int,4),
                    new SqlParameter("@IsTop", SqlDbType.Int,4),
                    new SqlParameter("@ThumbnailImgUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@ImgCloudUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@ImgMediaId", SqlDbType.NVarChar,200),
                    new SqlParameter("@AudioCloudUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@AudioMediaId", SqlDbType.NVarChar,200),
                    new SqlParameter("@AudioFileId", SqlDbType.NVarChar,300),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.ImgUrl;
			parameters[2].Value = model.AudioUrl;
			parameters[3].Value = model.Resume;
			parameters[4].Value = model.Like_Number;
			parameters[5].Value = model.View_Number;
			parameters[6].Value = model.Create_Date;
			parameters[7].Value = model.Last_Date;
            parameters[8].Value = model.Fileid;
            parameters[9].Value = model.Rank;
            parameters[10].Value = model.Stick;
            parameters[11].Value = model.Owner;
            parameters[12].Value = model.IsAct;
            parameters[13].Value = model.Comment_Number;
            parameters[14].Value = model.BookName;
            parameters[15].Value = model.PageNumber;
            parameters[16].Value = model.IsTop;
            parameters[17].Value = model.ThumbnailImgUrl;
            parameters[18].Value = model.ImgCloudUrl;
            parameters[19].Value = model.ImgMediaId;
            parameters[20].Value = model.AudioCloudUrl;
            parameters[21].Value = model.AudioMediaId;
            parameters[22].Value = model.AudioFileId;
			parameters[23].Value = model.ID;

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
			strSql.Append("delete from WX_Doublenovember_File ");
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
			strSql.Append("delete from WX_Doublenovember_File ");
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
		public SfSoft.Model.WX_Doublenovember_File GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,OpenID,ImgUrl,AudioUrl,Resume,Like_Number,View_Number,Create_Date,Last_Date,Fileid,Rank,Stick,Owner,IsAct,Comment_Number,BookName,PageNumber,IsTop,ThumbnailImgUrl,ImgCloudUrl,ImgMediaId,AudioCloudUrl,AudioMediaId,AudioFileId from WX_Doublenovember_File ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Doublenovember_File model=new SfSoft.Model.WX_Doublenovember_File();
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
		public SfSoft.Model.WX_Doublenovember_File DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Doublenovember_File model=new SfSoft.Model.WX_Doublenovember_File();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["OpenID"]!=null)
				{
					model.OpenID=row["OpenID"].ToString();
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["AudioUrl"]!=null)
				{
					model.AudioUrl=row["AudioUrl"].ToString();
				}
				if(row["Resume"]!=null)
				{
					model.Resume=row["Resume"].ToString();
				}
				if(row["Like_Number"]!=null && row["Like_Number"].ToString()!="")
				{
					model.Like_Number=int.Parse(row["Like_Number"].ToString());
				}
				if(row["View_Number"]!=null && row["View_Number"].ToString()!="")
				{
					model.View_Number=int.Parse(row["View_Number"].ToString());
				}
				if(row["Create_Date"]!=null && row["Create_Date"].ToString()!="")
				{
					model.Create_Date=DateTime.Parse(row["Create_Date"].ToString());
				}
				if(row["Last_Date"]!=null && row["Last_Date"].ToString()!="")
				{
					model.Last_Date=DateTime.Parse(row["Last_Date"].ToString());
				}
                if (row["Rank"] != null && row["Rank"].ToString() != "")
                {
                    model.Rank = int.Parse(row["Rank"].ToString());
                }
                if (row["Fileid"] != null)
                {
                    model.Fileid = row["Fileid"].ToString();
                }
                if (row["Stick"] != null && row["Stick"].ToString() != "")
                {
                    model.Stick = int.Parse(row["Stick"].ToString());
                }
                if (row["Owner"] != null)
                {
                    model.Owner = row["Owner"].ToString();
                }
                if (row["IsAct"] != null && row["IsAct"].ToString() != "")
                {
                    model.IsAct = int.Parse(row["IsAct"].ToString());
                }
                if (row["Comment_Number"] != null && row["Comment_Number"].ToString() != "")
                {
                    model.Comment_Number = int.Parse(row["Comment_Number"].ToString());
                }
                if (row["BookName"] != null)
                {
                    model.BookName = row["BookName"].ToString();
                }
                if (row["PageNumber"] != null && row["PageNumber"].ToString() != "")
                {
                    model.PageNumber = int.Parse(row["PageNumber"].ToString());
                }
                if (row["IsTop"] != null && row["IsTop"].ToString() != "")
                {
                    model.IsTop = int.Parse(row["IsTop"].ToString());
                }
                if (row["ThumbnailImgUrl"] != null)
                {
                    model.ThumbnailImgUrl = row["ThumbnailImgUrl"].ToString();
                }
                if (row["ImgCloudUrl"] != null)
                {
                    model.ImgCloudUrl = row["ImgCloudUrl"].ToString();
                }
                if (row["ImgMediaId"] != null)
                {
                    model.ImgMediaId = row["ImgMediaId"].ToString();
                }
                if (row["AudioCloudUrl"] != null)
                {
                    model.AudioCloudUrl = row["AudioCloudUrl"].ToString();
                }
                if (row["AudioMediaId"] != null)
                {
                    model.AudioMediaId = row["AudioMediaId"].ToString();
                }
                if (row["AudioFileId"] != null)
                {
                    model.AudioFileId = row["AudioFileId"].ToString();
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
            strSql.Append("select ID,OpenID,ImgUrl,AudioUrl,Resume,Like_Number,View_Number,Create_Date,Last_Date,Fileid,Rank,Stick,Owner,IsAct,Comment_Number,BookName,PageNumber,IsTop,ThumbnailImgUrl,ImgCloudUrl,ImgMediaId,AudioCloudUrl,AudioMediaId,AudioFileId ");
			strSql.Append(" FROM WX_Doublenovember_File ");
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
            strSql.Append(" ID,OpenID,ImgUrl,AudioUrl,Resume,Like_Number,View_Number,Create_Date,Last_Date,Fileid,Rank,Stick,Owner,IsAct,Comment_Number,BookName,PageNumber,IsTop,ThumbnailImgUrl,ImgCloudUrl,ImgMediaId,AudioCloudUrl,AudioMediaId,AudioFileId ");
			strSql.Append(" FROM WX_Doublenovember_File ");
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
			strSql.Append("select count(1) FROM WX_Doublenovember_File ");
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
			strSql.Append(")AS Row, T.*  from WX_Doublenovember_File T ");
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
			parameters[0].Value = "WX_Doublenovember_File";
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

