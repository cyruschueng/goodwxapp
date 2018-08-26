using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Comment
	/// </summary>
	public partial class WX_Comment:IWX_Comment
	{
		public WX_Comment()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Comment"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Comment");
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
		public int Add(SfSoft.Model.WX_Comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Comment(");
            strSql.Append("TopicID,Details,IsAct,OpenID,NickName,CreateDate,ImgUrls,CommentType,ToOpenid,HeaderImgUrl,ToID)");
			strSql.Append(" values (");
            strSql.Append("@TopicID,@Details,@IsAct,@OpenID,@NickName,@CreateDate,@ImgUrls,@CommentType,@ToOpenid,@HeaderImgUrl,@ToID)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@TopicID", SqlDbType.Int,4),
					new SqlParameter("@Details", SqlDbType.NVarChar,2000),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@ImgUrls", SqlDbType.NVarChar,1000),
					new SqlParameter("@CommentType", SqlDbType.Int,4),
					new SqlParameter("@ToOpenid", SqlDbType.NVarChar,100),
                    new SqlParameter("@HeaderImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@ToID", SqlDbType.Int,4)};
			parameters[0].Value = model.TopicID;
			parameters[1].Value = model.Details;
			parameters[2].Value = model.IsAct;
			parameters[3].Value = model.OpenID;
			parameters[4].Value = model.NickName;
			parameters[5].Value = model.CreateDate;
			parameters[6].Value = model.ImgUrls;
			parameters[7].Value = model.CommentType;
			parameters[8].Value = model.ToOpenid;
            parameters[9].Value = model.HeaderImgUrl;
            parameters[10].Value = model.ToID;

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
		public bool Update(SfSoft.Model.WX_Comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Comment set ");
			strSql.Append("TopicID=@TopicID,");
			strSql.Append("Details=@Details,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("OpenID=@OpenID,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("ImgUrls=@ImgUrls,");
			strSql.Append("CommentType=@CommentType,");
			strSql.Append("ToOpenid=@ToOpenid,");
            strSql.Append("HeaderImgUrl=@HeaderImgUrl,");
            strSql.Append("ToID=@ToID");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@TopicID", SqlDbType.Int,4),
					new SqlParameter("@Details", SqlDbType.NVarChar,2000),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@ImgUrls", SqlDbType.NVarChar,1000),
					new SqlParameter("@CommentType", SqlDbType.Int,4),
					new SqlParameter("@ToOpenid", SqlDbType.NVarChar,100),
                    new SqlParameter("@HeaderImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@ToID", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.TopicID;
			parameters[1].Value = model.Details;
			parameters[2].Value = model.IsAct;
			parameters[3].Value = model.OpenID;
			parameters[4].Value = model.NickName;
			parameters[5].Value = model.CreateDate;
			parameters[6].Value = model.ImgUrls;
			parameters[7].Value = model.CommentType;
			parameters[8].Value = model.ToOpenid;
            parameters[9].Value = model.HeaderImgUrl;
            parameters[10].Value = model.ToID;
			parameters[11].Value = model.ID;

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
			strSql.Append("delete from WX_Comment ");
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
			strSql.Append("delete from WX_Comment ");
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
		public SfSoft.Model.WX_Comment GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,TopicID,Details,IsAct,OpenID,NickName,CreateDate,ImgUrls,CommentType,ToOpenid,HeaderImgUrl,ToID from WX_Comment ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Comment model=new SfSoft.Model.WX_Comment();
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
		public SfSoft.Model.WX_Comment DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Comment model=new SfSoft.Model.WX_Comment();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["TopicID"]!=null && row["TopicID"].ToString()!="")
				{
					model.TopicID=int.Parse(row["TopicID"].ToString());
				}
				if(row["Details"]!=null)
				{
					model.Details=row["Details"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["OpenID"]!=null)
				{
					model.OpenID=row["OpenID"].ToString();
				}
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["ImgUrls"]!=null)
				{
					model.ImgUrls=row["ImgUrls"].ToString();
				}
				if(row["CommentType"]!=null && row["CommentType"].ToString()!="")
				{
					model.CommentType=int.Parse(row["CommentType"].ToString());
				}
				if(row["ToOpenid"]!=null)
				{
					model.ToOpenid=row["ToOpenid"].ToString();
				}
                if (row["HeaderImgUrl"] != null)
                {
                    model.HeaderImgUrl = row["HeaderImgUrl"].ToString();
                }
                if (row["ToID"] != null && row["ToID"].ToString() != "")
                {
                    model.ToID = int.Parse(row["ToID"].ToString());
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
            strSql.Append("select ID,TopicID,Details,IsAct,OpenID,NickName,CreateDate,ImgUrls,CommentType,ToOpenid,HeaderImgUrl,ToID ");
			strSql.Append(" FROM WX_Comment ");
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
            strSql.Append(" ID,TopicID,Details,IsAct,OpenID,NickName,CreateDate,ImgUrls,CommentType,ToOpenid,HeaderImgUrl,ToID ");
			strSql.Append(" FROM WX_Comment ");
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
			strSql.Append("select count(1) FROM WX_Comment ");
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
			strSql.Append(")AS Row, T.*  from WX_Comment T ");
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
			parameters[0].Value = "WX_Comment";
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
        public int ReplayNumber(int topicID, int toID)
        {
            string sql = "select * from WX_Comment where TopicID=" + topicID + " and ID=" +toID ;
            DataSet ds = DBUtility.DbHelperSQL.Query(sql);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows.Count;
            }
            return 0;
        }
		#endregion  ExtensionMethod
	}
}

