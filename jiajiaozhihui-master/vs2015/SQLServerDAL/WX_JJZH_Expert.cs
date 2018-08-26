using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_JJZH_Expert
	/// </summary>
	public partial class WX_JJZH_Expert:IWX_JJZH_Expert
	{
		public WX_JJZH_Expert()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_JJZH_Expert"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_JJZH_Expert");
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
		public int Add(SfSoft.Model.WX_JJZH_Expert model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_JJZH_Expert(");
            strSql.Append("OpenId,NickName,HeadImgUrl,ImgUrl,UName,Intro,Detail,TelePhone,Sex,IsAct,IsRest,ExpertType,IsCheck,LikeNumber,IsDefault,Sn)");
			strSql.Append(" values (");
            strSql.Append("@OpenId,@NickName,@HeadImgUrl,@ImgUrl,@UName,@Intro,@Detail,@TelePhone,@Sex,@IsAct,@IsRest,@ExpertType,@IsCheck,@LikeNumber,@IsDefault,@Sn)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,100),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@UName", SqlDbType.NVarChar,50),
					new SqlParameter("@Intro", SqlDbType.NVarChar,500),
					new SqlParameter("@Detail", SqlDbType.Text),
					new SqlParameter("@TelePhone", SqlDbType.NVarChar,20),
					new SqlParameter("@Sex", SqlDbType.NVarChar,20),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@IsRest", SqlDbType.Int,4),
                    new SqlParameter("@ExpertType", SqlDbType.Int,4),
                    new SqlParameter("@IsCheck", SqlDbType.Int,4),
                    new SqlParameter("@LikeNumber", SqlDbType.Int,4),
                    new SqlParameter("@IsDefault", SqlDbType.Int,4),
                    new SqlParameter("@Sn", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.NickName;
			parameters[2].Value = model.HeadImgUrl;
			parameters[3].Value = model.ImgUrl;
			parameters[4].Value = model.UName;
			parameters[5].Value = model.Intro;
			parameters[6].Value = model.Detail;
			parameters[7].Value = model.TelePhone;
			parameters[8].Value = model.Sex;
			parameters[9].Value = model.IsAct;
			parameters[10].Value = model.IsRest;
            parameters[11].Value = model.ExpertType;
            parameters[12].Value = model.IsCheck;
            parameters[13].Value = model.LikeNumber;
            parameters[14].Value = model.IsDefault;
            parameters[15].Value = model.Sn;

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
		public bool Update(SfSoft.Model.WX_JJZH_Expert model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_JJZH_Expert set ");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("HeadImgUrl=@HeadImgUrl,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("UName=@UName,");
			strSql.Append("Intro=@Intro,");
			strSql.Append("Detail=@Detail,");
			strSql.Append("TelePhone=@TelePhone,");
			strSql.Append("Sex=@Sex,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("IsRest=@IsRest,");
            strSql.Append("ExpertType=@ExpertType,");
            strSql.Append("IsCheck=@IsCheck,");
            strSql.Append("LikeNumber=@LikeNumber,");
            strSql.Append("IsDefault=@IsDefault,");
            strSql.Append("Sn=@Sn");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,100),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@UName", SqlDbType.NVarChar,50),
					new SqlParameter("@Intro", SqlDbType.NVarChar,500),
					new SqlParameter("@Detail", SqlDbType.Text),
					new SqlParameter("@TelePhone", SqlDbType.NVarChar,20),
					new SqlParameter("@Sex", SqlDbType.NVarChar,20),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@IsRest", SqlDbType.Int,4),
                    new SqlParameter("@ExpertType", SqlDbType.Int,4),
                    new SqlParameter("@IsCheck", SqlDbType.Int,4),
                    new SqlParameter("@LikeNumber", SqlDbType.Int,4),
                    new SqlParameter("@IsDefault", SqlDbType.Int,4),
                    new SqlParameter("@Sn", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.NickName;
			parameters[2].Value = model.HeadImgUrl;
			parameters[3].Value = model.ImgUrl;
			parameters[4].Value = model.UName;
			parameters[5].Value = model.Intro;
			parameters[6].Value = model.Detail;
			parameters[7].Value = model.TelePhone;
			parameters[8].Value = model.Sex;
			parameters[9].Value = model.IsAct;
			parameters[10].Value = model.IsRest;
            parameters[11].Value = model.ExpertType;
            parameters[12].Value = model.IsCheck;
            parameters[13].Value = model.LikeNumber;
            parameters[14].Value = model.IsDefault;
            parameters[15].Value = model.Sn;
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
			strSql.Append("delete from WX_JJZH_Expert ");
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
			strSql.Append("delete from WX_JJZH_Expert ");
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
		public SfSoft.Model.WX_JJZH_Expert GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,OpenId,NickName,HeadImgUrl,ImgUrl,UName,Intro,Detail,TelePhone,Sex,IsAct,IsRest,ExpertType,IsCheck,LikeNumber,IsDefault,Sn from WX_JJZH_Expert ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_JJZH_Expert model=new SfSoft.Model.WX_JJZH_Expert();
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
		public SfSoft.Model.WX_JJZH_Expert DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_JJZH_Expert model=new SfSoft.Model.WX_JJZH_Expert();
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
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["HeadImgUrl"]!=null)
				{
					model.HeadImgUrl=row["HeadImgUrl"].ToString();
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["UName"]!=null)
				{
					model.UName=row["UName"].ToString();
				}
				if(row["Intro"]!=null)
				{
					model.Intro=row["Intro"].ToString();
				}
				if(row["Detail"]!=null)
				{
					model.Detail=row["Detail"].ToString();
				}
				if(row["TelePhone"]!=null)
				{
					model.TelePhone=row["TelePhone"].ToString();
				}
				if(row["Sex"]!=null)
				{
					model.Sex=row["Sex"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["IsRest"]!=null && row["IsRest"].ToString()!="")
				{
					model.IsRest=int.Parse(row["IsRest"].ToString());
				}
                if (row["ExpertType"] != null && row["ExpertType"].ToString() != "")
                {
                    model.ExpertType = int.Parse(row["ExpertType"].ToString());
                }
                if (row["IsCheck"] != null && row["IsCheck"].ToString() != "")
                {
                    model.IsCheck = int.Parse(row["IsCheck"].ToString());
                }
                if (row["LikeNumber"] != null && row["LikeNumber"].ToString() != "")
                {
                    model.LikeNumber = int.Parse(row["LikeNumber"].ToString());
                }
                if (row["IsDefault"] != null && row["IsDefault"].ToString() != "")
                {
                    model.IsDefault = int.Parse(row["IsDefault"].ToString());
                }
                if (row["Sn"] != null && row["Sn"].ToString() != "")
                {
                    model.Sn = int.Parse(row["Sn"].ToString());
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
            strSql.Append("select Id,OpenId,NickName,HeadImgUrl,ImgUrl,UName,Intro,Detail,TelePhone,Sex,IsAct,IsRest,ExpertType,IsCheck,LikeNumber,IsDefault,Sn ");
			strSql.Append(" FROM WX_JJZH_Expert ");
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
            strSql.Append(" Id,OpenId,NickName,HeadImgUrl,ImgUrl,UName,Intro,Detail,TelePhone,Sex,IsAct,IsRest,ExpertType,IsCheck,LikeNumber,IsDefault,Sn ");
			strSql.Append(" FROM WX_JJZH_Expert ");
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
			strSql.Append("select count(1) FROM WX_JJZH_Expert ");
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
			strSql.Append(")AS Row, T.*  from WX_JJZH_Expert T ");
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
			parameters[0].Value = "WX_JJZH_Expert";
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

