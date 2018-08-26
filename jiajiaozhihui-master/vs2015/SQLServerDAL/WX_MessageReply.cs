using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_MessageReply
	/// </summary>
	public partial class WX_MessageReply:IWX_MessageReply
	{
		public WX_MessageReply()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_MessageReply"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_MessageReply");
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
		public int Add(SfSoft.Model.WX_MessageReply model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_MessageReply(");
            strSql.Append("KeyWord,MsgType,Title,Description,PicUrl,NewsUrl,MusicURL,HQMusicUrl,MediaId,Content,Class,[Order],AuthUrl,Tags,IsReadWeixinService,AppId)");
			strSql.Append(" values (");
            strSql.Append("@KeyWord,@MsgType,@Title,@Description,@PicUrl,@NewsUrl,@MusicURL,@HQMusicUrl,@MediaId,@Content,@Class,@Order,@AuthUrl,@Tags,@IsReadWeixinService,@AppId)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@KeyWord", SqlDbType.NVarChar,50),
					new SqlParameter("@MsgType", SqlDbType.NVarChar,50),
					new SqlParameter("@Title", SqlDbType.NVarChar,50),
					new SqlParameter("@Description", SqlDbType.NVarChar,500),
					new SqlParameter("@PicUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@NewsUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@MusicURL", SqlDbType.NVarChar,300),
					new SqlParameter("@HQMusicUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@MediaId", SqlDbType.NVarChar,100),
					new SqlParameter("@Content", SqlDbType.NVarChar,4000),
                    new SqlParameter("@Class", SqlDbType.NVarChar,100),
                    new SqlParameter("@Order", SqlDbType.Int,4),
                    new SqlParameter("@AuthUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@Tags", SqlDbType.NVarChar,2000),
                    new SqlParameter("@IsReadWeixinService", SqlDbType.Int,4),
                    new SqlParameter("@AppId", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.KeyWord;
			parameters[1].Value = model.MsgType;
			parameters[2].Value = model.Title;
			parameters[3].Value = model.Description;
			parameters[4].Value = model.PicUrl;
			parameters[5].Value = model.NewsUrl;
			parameters[6].Value = model.MusicURL;
			parameters[7].Value = model.HQMusicUrl;
			parameters[8].Value = model.MediaId;
			parameters[9].Value = model.Content;
            parameters[10].Value = model.Class;
            parameters[11].Value = model.Order;
            parameters[12].Value = model.AuthUrl;
            parameters[13].Value = model.Tags;
            parameters[14].Value = model.IsReadWeixinService;
            parameters[15].Value = model.AppId;

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
		public bool Update(SfSoft.Model.WX_MessageReply model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_MessageReply set ");
			strSql.Append("KeyWord=@KeyWord,");
			strSql.Append("MsgType=@MsgType,");
			strSql.Append("Title=@Title,");
			strSql.Append("Description=@Description,");
			strSql.Append("PicUrl=@PicUrl,");
			strSql.Append("NewsUrl=@NewsUrl,");
			strSql.Append("MusicURL=@MusicURL,");
			strSql.Append("HQMusicUrl=@HQMusicUrl,");
			strSql.Append("MediaId=@MediaId,");
			strSql.Append("Content=@Content,");
            strSql.Append("Class=@Class,");
            strSql.Append("[Order]=@Order,");
            strSql.Append("[AuthUrl]=@AuthUrl,");
            strSql.Append("Tags=@Tags,");
            strSql.Append("IsReadWeixinService=@IsReadWeixinService,");
            strSql.Append("AppId=@AppId");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@KeyWord", SqlDbType.NVarChar,50),
					new SqlParameter("@MsgType", SqlDbType.NVarChar,50),
					new SqlParameter("@Title", SqlDbType.NVarChar,50),
					new SqlParameter("@Description", SqlDbType.NVarChar,500),
					new SqlParameter("@PicUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@NewsUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@MusicURL", SqlDbType.NVarChar,300),
					new SqlParameter("@HQMusicUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@MediaId", SqlDbType.NVarChar,100),
					new SqlParameter("@Content", SqlDbType.NVarChar,4000),
                    new SqlParameter("@Class", SqlDbType.NVarChar,100),
                    new SqlParameter("@Order", SqlDbType.Int,4),
                    new SqlParameter("@AuthUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@Tags", SqlDbType.NVarChar,2000),
                    new SqlParameter("@IsReadWeixinService", SqlDbType.Int,4),
                    new SqlParameter("@AppId", SqlDbType.NVarChar,100),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.KeyWord;
			parameters[1].Value = model.MsgType;
			parameters[2].Value = model.Title;
			parameters[3].Value = model.Description;
			parameters[4].Value = model.PicUrl;
			parameters[5].Value = model.NewsUrl;
			parameters[6].Value = model.MusicURL;
			parameters[7].Value = model.HQMusicUrl;
			parameters[8].Value = model.MediaId;
			parameters[9].Value = model.Content;
            parameters[10].Value = model.Class;
            parameters[11].Value = model.Order;
            parameters[12].Value = model.AuthUrl;
            parameters[13].Value = model.Tags;
            parameters[14].Value = model.IsReadWeixinService;
            parameters[15].Value = model.AppId;
			parameters[16].Value = model.ID;

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
			strSql.Append("delete from WX_MessageReply ");
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
			strSql.Append("delete from WX_MessageReply ");
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
		public SfSoft.Model.WX_MessageReply GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,KeyWord,MsgType,Title,Description,PicUrl,NewsUrl,MusicURL,HQMusicUrl,MediaId,Content,Class,[Order],AuthUrl,Tags,IsReadWeixinService,AppId from WX_MessageReply ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_MessageReply model=new SfSoft.Model.WX_MessageReply();
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
		public SfSoft.Model.WX_MessageReply DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_MessageReply model=new SfSoft.Model.WX_MessageReply();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["KeyWord"]!=null)
				{
					model.KeyWord=row["KeyWord"].ToString();
				}
				if(row["MsgType"]!=null)
				{
					model.MsgType=row["MsgType"].ToString();
				}
				if(row["Title"]!=null)
				{
					model.Title=row["Title"].ToString();
				}
				if(row["Description"]!=null)
				{
					model.Description=row["Description"].ToString();
				}
				if(row["PicUrl"]!=null)
				{
					model.PicUrl=row["PicUrl"].ToString();
				}
				if(row["NewsUrl"]!=null)
				{
					model.NewsUrl=row["NewsUrl"].ToString();
				}
				if(row["MusicURL"]!=null)
				{
					model.MusicURL=row["MusicURL"].ToString();
				}
				if(row["HQMusicUrl"]!=null)
				{
					model.HQMusicUrl=row["HQMusicUrl"].ToString();
				}
				if(row["MediaId"]!=null)
				{
					model.MediaId=row["MediaId"].ToString();
				}
				if(row["Content"]!=null)
				{
					model.Content=row["Content"].ToString();
				}
                if (row["Class"] != null)
                {
                    model.Class = row["Class"].ToString();
                }
                if (row["Order"] != null && row["Order"].ToString() != "")
                {
                    model.Order = int.Parse(row["Order"].ToString());
                }
                if (row["AuthUrl"] != null)
                {
                    model.AuthUrl = row["AuthUrl"].ToString();
                }
                if (row["Tags"] != null)
                {
                    model.Tags = row["Tags"].ToString();
                }
                if (row["IsReadWeixinService"] != null && row["IsReadWeixinService"].ToString() != "")
                {
                    model.IsReadWeixinService = int.Parse(row["IsReadWeixinService"].ToString());
                }
                if (row["AppId"] != null)
                {
                    model.AppId = row["AppId"].ToString();
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
            strSql.Append("select ID,KeyWord,MsgType,Title,Description,PicUrl,NewsUrl,MusicURL,HQMusicUrl,MediaId,Content,Class,[Order],AuthUrl,Tags,IsReadWeixinService,AppId ");
			strSql.Append(" FROM WX_MessageReply ");
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
            strSql.Append(" ID,KeyWord,MsgType,Title,Description,PicUrl,NewsUrl,MusicURL,HQMusicUrl,MediaId,Content,Class,[Order],AuthUrl,Tags,IsReadWeixinService,AppId ");
			strSql.Append(" FROM WX_MessageReply ");
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
			strSql.Append("select count(1) FROM WX_MessageReply ");
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
			strSql.Append(")AS Row, T.*  from WX_MessageReply T ");
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
			parameters[0].Value = "WX_MessageReply";
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

