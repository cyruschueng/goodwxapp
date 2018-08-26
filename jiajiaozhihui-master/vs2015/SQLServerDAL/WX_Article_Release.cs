using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Article_Release
	/// </summary>
	public partial class WX_Article_Release:IWX_Article_Release
	{
		public WX_Article_Release()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Article_Release"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Article_Release");
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
		public int Add(SfSoft.Model.WX_Article_Release model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Article_Release(");
            strSql.Append("Caption,Resume,Detail,CoverUrl,CreateDate,IsAct,ReleaseDate,ShareImg,ShareTitle,ShareContent)");
			strSql.Append(" values (");
            strSql.Append("@Caption,@Resume,@Detail,@CoverUrl,@CreateDate,@IsAct,@ReleaseDate,@ShareImg,@ShareTitle,@ShareContent)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Caption", SqlDbType.NVarChar,100),
					new SqlParameter("@Resume", SqlDbType.NVarChar,500),
					new SqlParameter("@Detail", SqlDbType.Text),
					new SqlParameter("@CoverUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@ReleaseDate", SqlDbType.DateTime),
                    new SqlParameter("@ShareImg", SqlDbType.NVarChar,1000),
                    new SqlParameter("@ShareTitle", SqlDbType.NVarChar,100),
                    new SqlParameter("@ShareContent", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.Caption;
			parameters[1].Value = model.Resume;
			parameters[2].Value = model.Detail;
			parameters[3].Value = model.CoverUrl;
			parameters[4].Value = model.CreateDate;
			parameters[5].Value = model.IsAct;
            parameters[6].Value = model.ReleaseDate;
            parameters[7].Value = model.ShareImg;
            parameters[8].Value = model.ShareTitle;
            parameters[9].Value = model.ShareContent;

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
		public bool Update(SfSoft.Model.WX_Article_Release model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Article_Release set ");
			strSql.Append("Caption=@Caption,");
			strSql.Append("Resume=@Resume,");
			strSql.Append("Detail=@Detail,");
			strSql.Append("CoverUrl=@CoverUrl,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("IsAct=@IsAct,");
            strSql.Append("ReleaseDate=@ReleaseDate,");
            strSql.Append("ShareImg=@ShareImg,");
            strSql.Append("ShareTitle=@ShareTitle,");
            strSql.Append("ShareContent=@ShareContent");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Caption", SqlDbType.NVarChar,100),
					new SqlParameter("@Resume", SqlDbType.NVarChar,500),
					new SqlParameter("@Detail", SqlDbType.Text),
					new SqlParameter("@CoverUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@ReleaseDate", SqlDbType.DateTime),
                    new SqlParameter("@ShareImg", SqlDbType.NVarChar,1000),
                    new SqlParameter("@ShareTitle", SqlDbType.NVarChar,100),
                    new SqlParameter("@ShareContent", SqlDbType.NVarChar,200),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.Caption;
			parameters[1].Value = model.Resume;
			parameters[2].Value = model.Detail;
			parameters[3].Value = model.CoverUrl;
			parameters[4].Value = model.CreateDate;
			parameters[5].Value = model.IsAct;
            parameters[6].Value = model.ReleaseDate;
            parameters[7].Value = model.ShareImg;
            parameters[8].Value = model.ShareTitle;
            parameters[9].Value = model.ShareContent;
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
			strSql.Append("delete from WX_Article_Release ");
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
			strSql.Append("delete from WX_Article_Release ");
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
		public SfSoft.Model.WX_Article_Release GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,Caption,Resume,Detail,CoverUrl,CreateDate,IsAct,ReleaseDate,ShareImg,ShareTitle,ShareContent from WX_Article_Release ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Article_Release model=new SfSoft.Model.WX_Article_Release();
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
		public SfSoft.Model.WX_Article_Release DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Article_Release model=new SfSoft.Model.WX_Article_Release();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["Caption"]!=null)
				{
					model.Caption=row["Caption"].ToString();
				}
				if(row["Resume"]!=null)
				{
					model.Resume=row["Resume"].ToString();
				}
				if(row["Detail"]!=null)
				{
					model.Detail=row["Detail"].ToString();
				}
				if(row["CoverUrl"]!=null)
				{
					model.CoverUrl=row["CoverUrl"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
                if (row["ReleaseDate"] != null && row["ReleaseDate"].ToString() != "")
                {
                    model.ReleaseDate = DateTime.Parse(row["ReleaseDate"].ToString());
                }
                if (row["ShareImg"] != null)
                {
                    model.ShareImg = row["ShareImg"].ToString();
                }
                if (row["ShareTitle"] != null)
                {
                    model.ShareTitle = row["ShareTitle"].ToString();
                }
                if (row["ShareContent"] != null)
                {
                    model.ShareContent = row["ShareContent"].ToString();
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
            strSql.Append("select Id,Caption,Resume,Detail,CoverUrl,CreateDate,IsAct,ReleaseDate,ShareImg,ShareTitle,ShareContent ");
			strSql.Append(" FROM WX_Article_Release ");
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
            strSql.Append(" Id,Caption,Resume,Detail,CoverUrl,CreateDate,IsAct,ReleaseDate,ShareImg,ShareTitle,ShareContent ");
			strSql.Append(" FROM WX_Article_Release ");
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
			strSql.Append("select count(1) FROM WX_Article_Release ");
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
			strSql.Append(")AS Row, T.*  from WX_Article_Release T ");
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
			parameters[0].Value = "WX_Article_Release";
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

