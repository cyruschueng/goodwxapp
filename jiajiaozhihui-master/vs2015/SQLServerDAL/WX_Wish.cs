using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Wish
	/// </summary>
	public partial class WX_Wish:IWX_Wish
	{
		public WX_Wish()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Wish"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Wish");
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
		public int Add(SfSoft.Model.WX_Wish model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Wish(");
			strSql.Append("OpenID,NickName,HeadImgUrl,Mobile,QQ,WeiXin,Address,Detail,CreateDate,Days,Remark,IsAnonym,IsHelp,IsAct,Status,LikeNumber,AttentionNumber)");
			strSql.Append(" values (");
			strSql.Append("@OpenID,@NickName,@HeadImgUrl,@Mobile,@QQ,@WeiXin,@Address,@Detail,@CreateDate,@Days,@Remark,@IsAnonym,@IsHelp,@IsAct,@Status,@LikeNumber,@AttentionNumber)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.VarChar,50),
					new SqlParameter("@NickName", SqlDbType.VarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.VarChar,200),
					new SqlParameter("@Mobile", SqlDbType.VarChar,11),
					new SqlParameter("@QQ", SqlDbType.VarChar,20),
					new SqlParameter("@WeiXin", SqlDbType.VarChar,50),
					new SqlParameter("@Address", SqlDbType.VarChar,200),
					new SqlParameter("@Detail", SqlDbType.VarChar,2000),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Days", SqlDbType.Int,4),
					new SqlParameter("@Remark", SqlDbType.VarChar,200),
					new SqlParameter("@IsAnonym", SqlDbType.Int,4),
					new SqlParameter("@IsHelp", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@AttentionNumber", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.NickName;
			parameters[2].Value = model.HeadImgUrl;
			parameters[3].Value = model.Mobile;
			parameters[4].Value = model.QQ;
			parameters[5].Value = model.WeiXin;
			parameters[6].Value = model.Address;
			parameters[7].Value = model.Detail;
			parameters[8].Value = model.CreateDate;
			parameters[9].Value = model.Days;
			parameters[10].Value = model.Remark;
			parameters[11].Value = model.IsAnonym;
			parameters[12].Value = model.IsHelp;
			parameters[13].Value = model.IsAct;
			parameters[14].Value = model.Status;
			parameters[15].Value = model.LikeNumber;
			parameters[16].Value = model.AttentionNumber;

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
		public bool Update(SfSoft.Model.WX_Wish model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Wish set ");
			strSql.Append("OpenID=@OpenID,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("HeadImgUrl=@HeadImgUrl,");
			strSql.Append("Mobile=@Mobile,");
			strSql.Append("QQ=@QQ,");
			strSql.Append("WeiXin=@WeiXin,");
			strSql.Append("Address=@Address,");
			strSql.Append("Detail=@Detail,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Days=@Days,");
			strSql.Append("Remark=@Remark,");
			strSql.Append("IsAnonym=@IsAnonym,");
			strSql.Append("IsHelp=@IsHelp,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("Status=@Status,");
			strSql.Append("LikeNumber=@LikeNumber,");
			strSql.Append("AttentionNumber=@AttentionNumber");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.VarChar,50),
					new SqlParameter("@NickName", SqlDbType.VarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.VarChar,200),
					new SqlParameter("@Mobile", SqlDbType.VarChar,11),
					new SqlParameter("@QQ", SqlDbType.VarChar,20),
					new SqlParameter("@WeiXin", SqlDbType.VarChar,50),
					new SqlParameter("@Address", SqlDbType.VarChar,200),
					new SqlParameter("@Detail", SqlDbType.VarChar,2000),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Days", SqlDbType.Int,4),
					new SqlParameter("@Remark", SqlDbType.VarChar,200),
					new SqlParameter("@IsAnonym", SqlDbType.Int,4),
					new SqlParameter("@IsHelp", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.Int,4),
					new SqlParameter("@LikeNumber", SqlDbType.Int,4),
					new SqlParameter("@AttentionNumber", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenID;
			parameters[1].Value = model.NickName;
			parameters[2].Value = model.HeadImgUrl;
			parameters[3].Value = model.Mobile;
			parameters[4].Value = model.QQ;
			parameters[5].Value = model.WeiXin;
			parameters[6].Value = model.Address;
			parameters[7].Value = model.Detail;
			parameters[8].Value = model.CreateDate;
			parameters[9].Value = model.Days;
			parameters[10].Value = model.Remark;
			parameters[11].Value = model.IsAnonym;
			parameters[12].Value = model.IsHelp;
			parameters[13].Value = model.IsAct;
			parameters[14].Value = model.Status;
			parameters[15].Value = model.LikeNumber;
			parameters[16].Value = model.AttentionNumber;
			parameters[17].Value = model.ID;

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
			strSql.Append("delete from WX_Wish ");
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
			strSql.Append("delete from WX_Wish ");
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
		public SfSoft.Model.WX_Wish GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,OpenID,NickName,HeadImgUrl,Mobile,QQ,WeiXin,Address,Detail,CreateDate,Days,Remark,IsAnonym,IsHelp,IsAct,Status,LikeNumber,AttentionNumber from WX_Wish ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Wish model=new SfSoft.Model.WX_Wish();
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
		public SfSoft.Model.WX_Wish DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Wish model=new SfSoft.Model.WX_Wish();
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
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["HeadImgUrl"]!=null)
				{
					model.HeadImgUrl=row["HeadImgUrl"].ToString();
				}
				if(row["Mobile"]!=null)
				{
					model.Mobile=row["Mobile"].ToString();
				}
				if(row["QQ"]!=null)
				{
					model.QQ=row["QQ"].ToString();
				}
				if(row["WeiXin"]!=null)
				{
					model.WeiXin=row["WeiXin"].ToString();
				}
				if(row["Address"]!=null)
				{
					model.Address=row["Address"].ToString();
				}
				if(row["Detail"]!=null)
				{
					model.Detail=row["Detail"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["Days"]!=null && row["Days"].ToString()!="")
				{
					model.Days=int.Parse(row["Days"].ToString());
				}
				if(row["Remark"]!=null)
				{
					model.Remark=row["Remark"].ToString();
				}
				if(row["IsAnonym"]!=null && row["IsAnonym"].ToString()!="")
				{
					model.IsAnonym=int.Parse(row["IsAnonym"].ToString());
				}
				if(row["IsHelp"]!=null && row["IsHelp"].ToString()!="")
				{
					model.IsHelp=int.Parse(row["IsHelp"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["Status"]!=null && row["Status"].ToString()!="")
				{
					model.Status=int.Parse(row["Status"].ToString());
				}
				if(row["LikeNumber"]!=null && row["LikeNumber"].ToString()!="")
				{
					model.LikeNumber=int.Parse(row["LikeNumber"].ToString());
				}
				if(row["AttentionNumber"]!=null && row["AttentionNumber"].ToString()!="")
				{
					model.AttentionNumber=int.Parse(row["AttentionNumber"].ToString());
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
			strSql.Append("select ID,OpenID,NickName,HeadImgUrl,Mobile,QQ,WeiXin,Address,Detail,CreateDate,Days,Remark,IsAnonym,IsHelp,IsAct,Status,LikeNumber,AttentionNumber ");
			strSql.Append(" FROM WX_Wish ");
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
			strSql.Append(" ID,OpenID,NickName,HeadImgUrl,Mobile,QQ,WeiXin,Address,Detail,CreateDate,Days,Remark,IsAnonym,IsHelp,IsAct,Status,LikeNumber,AttentionNumber ");
			strSql.Append(" FROM WX_Wish ");
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
			strSql.Append("select count(1) FROM WX_Wish ");
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
			strSql.Append(")AS Row, T.*  from WX_Wish T ");
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
			parameters[0].Value = "WX_Wish";
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

