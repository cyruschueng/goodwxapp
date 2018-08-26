﻿using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_QA_Comment
	/// </summary>
	public partial class WX_QA_Comment:IWX_QA_Comment
	{
		public WX_QA_Comment()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_QA_Comment"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_QA_Comment");
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
		public int Add(SfSoft.Model.WX_QA_Comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_QA_Comment(");
            strSql.Append("AppId,ReadFileId,OpenId,Details,NickName,HeadImgUrl,CreateDate,ExpertType,Sex,ExpertId,IsAgent)");
			strSql.Append(" values (");
            strSql.Append("@AppId,@ReadFileId,@OpenId,@Details,@NickName,@HeadImgUrl,@CreateDate,@ExpertType,@Sex,@ExpertId,@IsAgent)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@ReadFileId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@Details", SqlDbType.NVarChar,500),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@ExpertType", SqlDbType.Int,4),
                    new SqlParameter("@Sex", SqlDbType.NVarChar,10),
                    new SqlParameter("@ExpertId", SqlDbType.Int,4),
                    new SqlParameter("@IsAgent", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.ReadFileId;
			parameters[2].Value = model.OpenId;
			parameters[3].Value = model.Details;
			parameters[4].Value = model.NickName;
			parameters[5].Value = model.HeadImgUrl;
            parameters[6].Value = model.CreateDate;
            parameters[7].Value = model.ExpertType;
            parameters[8].Value = model.Sex;
            parameters[9].Value = model.ExpertId;
            parameters[10].Value = model.IsAgent;

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
		public bool Update(SfSoft.Model.WX_QA_Comment model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_QA_Comment set ");
			strSql.Append("AppId=@AppId,");
			strSql.Append("ReadFileId=@ReadFileId,");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("Details=@Details,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("HeadImgUrl=@HeadImgUrl,");
            strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("ExpertType=@ExpertType,");
            strSql.Append("Sex=@Sex,");
            strSql.Append("ExpertId=@ExpertId,");
            strSql.Append("IsAgent=@IsAgent");
            strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@AppId", SqlDbType.NVarChar,50),
					new SqlParameter("@ReadFileId", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@Details", SqlDbType.NVarChar,500),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@ExpertType", SqlDbType.Int,4),
                    new SqlParameter("@Sex", SqlDbType.NVarChar,10),
                    new SqlParameter("@ExpertId", SqlDbType.Int,4),
                    new SqlParameter("@IsAgent", SqlDbType.Int,4),
                    new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.AppId;
			parameters[1].Value = model.ReadFileId;
			parameters[2].Value = model.OpenId;
			parameters[3].Value = model.Details;
			parameters[4].Value = model.NickName;
			parameters[5].Value = model.HeadImgUrl;
            parameters[6].Value = model.CreateDate;
            parameters[7].Value = model.ExpertType;
            parameters[8].Value = model.Sex;
            parameters[9].Value = model.ExpertId;
            parameters[10].Value = model.IsAgent;
            parameters[11].Value = model.Id;

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
			strSql.Append("delete from WX_QA_Comment ");
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
			strSql.Append("delete from WX_QA_Comment ");
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
		public SfSoft.Model.WX_QA_Comment GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,AppId,ReadFileId,OpenId,Details,NickName,HeadImgUrl,CreateDate,ExpertType,Sex,ExpertId,IsAgent from WX_QA_Comment ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_QA_Comment model=new SfSoft.Model.WX_QA_Comment();
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
		public SfSoft.Model.WX_QA_Comment DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_QA_Comment model=new SfSoft.Model.WX_QA_Comment();
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
				if(row["ReadFileId"]!=null && row["ReadFileId"].ToString()!="")
				{
					model.ReadFileId=int.Parse(row["ReadFileId"].ToString());
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["Details"]!=null)
				{
					model.Details=row["Details"].ToString();
				}
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["HeadImgUrl"]!=null)
				{
					model.HeadImgUrl=row["HeadImgUrl"].ToString();
				}
                if (row["CreateDate"] != null && row["CreateDate"].ToString() != "")
                {
                    model.CreateDate = DateTime.Parse(row["CreateDate"].ToString());
                }
                if (row["ExpertType"] != null && row["ExpertType"].ToString() != "")
                {
                    model.ExpertType = int.Parse(row["ExpertType"].ToString());
                }
                if (row["Sex"] != null)
                {
                    model.Sex = row["Sex"].ToString();
                }
                if (row["ExpertId"] != null && row["ExpertId"].ToString() != "")
                {
                    model.ExpertId = int.Parse(row["ExpertId"].ToString());
                }
                if (row["IsAgent"] != null && row["IsAgent"].ToString() != "")
                {
                    model.IsAgent = int.Parse(row["IsAgent"].ToString());
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
            strSql.Append("select Id,AppId,ReadFileId,OpenId,Details,NickName,HeadImgUrl,CreateDate,ExpertType,Sex,ExpertId,IsAgent ");
			strSql.Append(" FROM WX_QA_Comment ");
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
            strSql.Append(" Id,AppId,ReadFileId,OpenId,Details,NickName,HeadImgUrl,CreateDate,ExpertType,Sex,ExpertId,IsAgent ");
			strSql.Append(" FROM WX_QA_Comment ");
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
			strSql.Append("select count(1) FROM WX_QA_Comment ");
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
			strSql.Append(")AS Row, T.*  from WX_QA_Comment T ");
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
			parameters[0].Value = "WX_QA_Comment";
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
