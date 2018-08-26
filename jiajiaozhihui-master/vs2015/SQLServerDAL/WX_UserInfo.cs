using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_UserInfo
	/// </summary>
	public partial class WX_UserInfo:IWX_UserInfo
	{
		public WX_UserInfo()
		{}
		#region  BasicMethod

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string OpenId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_UserInfo");
			strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = OpenId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_UserInfo model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_UserInfo(");
            strSql.Append("OpenId,NickName,HeadImgUrl,Province,City,Sex,RegistDate,IsSubscibe,EditeDate,AppId)");
			strSql.Append(" values (");
            strSql.Append("@OpenId,@NickName,@HeadImgUrl,@Province,@City,@Sex,@RegistDate,@IsSubscibe,@EditeDate,@AppId)");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@Sex", SqlDbType.NVarChar,20),
					new SqlParameter("@RegistDate", SqlDbType.DateTime),
                    new SqlParameter("@IsSubscibe", SqlDbType.Int,4),
                    new SqlParameter("@EditeDate", SqlDbType.DateTime),
                    new SqlParameter("@AppId", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.NickName;
			parameters[2].Value = model.HeadImgUrl;
			parameters[3].Value = model.Province;
			parameters[4].Value = model.City;
			parameters[5].Value = model.Sex;
			parameters[6].Value = model.RegistDate;
            parameters[7].Value = model.IsSubscibe;
            parameters[8].Value = model.EditeDate;
            parameters[9].Value = model.AppId;

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
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_UserInfo model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_UserInfo set ");
			strSql.Append("NickName=@NickName,");
			strSql.Append("HeadImgUrl=@HeadImgUrl,");
			strSql.Append("Province=@Province,");
			strSql.Append("City=@City,");
			strSql.Append("Sex=@Sex,");
			strSql.Append("RegistDate=@RegistDate,");
            strSql.Append("IsSubscibe=@IsSubscibe,");
            strSql.Append("EditeDate=@EditeDate,");
            strSql.Append("AppId=@AppId");
            strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@Sex", SqlDbType.NVarChar,20),
					new SqlParameter("@RegistDate", SqlDbType.DateTime),
                    new SqlParameter("@IsSubscibe", SqlDbType.Int,4),
                    new SqlParameter("@EditeDate", SqlDbType.DateTime),
                    new SqlParameter("@AppId", SqlDbType.NVarChar,100),
                    new SqlParameter("@OpenId", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.NickName;
			parameters[1].Value = model.HeadImgUrl;
			parameters[2].Value = model.Province;
			parameters[3].Value = model.City;
			parameters[4].Value = model.Sex;
			parameters[5].Value = model.RegistDate;
            parameters[6].Value = model.IsSubscibe;
            parameters[7].Value = model.EditeDate;
            parameters[8].Value = model.AppId;
            parameters[9].Value = model.OpenId;

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
		public bool Delete(string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_UserInfo ");
			strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = OpenId;

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
		public bool DeleteList(string OpenIdlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_UserInfo ");
			strSql.Append(" where OpenId in ("+OpenIdlist + ")  ");
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
		public SfSoft.Model.WX_UserInfo GetModel(string OpenId)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 OpenId,NickName,HeadImgUrl,Province,City,Sex,RegistDate,IsSubscibe,EditeDate,AppId from WX_UserInfo ");
			strSql.Append(" where OpenId=@OpenId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100)			};
			parameters[0].Value = OpenId;

			SfSoft.Model.WX_UserInfo model=new SfSoft.Model.WX_UserInfo();
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
		public SfSoft.Model.WX_UserInfo DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_UserInfo model=new SfSoft.Model.WX_UserInfo();
			if (row != null)
			{
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
				if(row["Province"]!=null)
				{
					model.Province=row["Province"].ToString();
				}
				if(row["City"]!=null)
				{
					model.City=row["City"].ToString();
				}
				if(row["Sex"]!=null)
				{
					model.Sex=row["Sex"].ToString();
				}
				if(row["RegistDate"]!=null && row["RegistDate"].ToString()!="")
				{
					model.RegistDate=DateTime.Parse(row["RegistDate"].ToString());
				}
                if (row["IsSubscibe"] != null && row["IsSubscibe"].ToString() != "")
                {
                    model.IsSubscibe = int.Parse(row["IsSubscibe"].ToString());
                }
                if (row["EditeDate"] != null && row["EditeDate"].ToString() != "")
                {
                    model.EditeDate = DateTime.Parse(row["EditeDate"].ToString());
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
            strSql.Append("select OpenId,NickName,HeadImgUrl,Province,City,Sex,RegistDate,IsSubscibe,EditeDate,AppId ");
			strSql.Append(" FROM WX_UserInfo ");
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
            strSql.Append(" OpenId,NickName,HeadImgUrl,Province,City,Sex,RegistDate,IsSubscibe,EditeDate,AppId ");
			strSql.Append(" FROM WX_UserInfo ");
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
			strSql.Append("select count(1) FROM WX_UserInfo ");
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
				strSql.Append("order by T.OpenId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_UserInfo T ");
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
		public DataSet GetList(int PageSize,int PageIndex,string strWhere)
		{
			SqlParameter[] parameters = {
					new SqlParameter("@tblName", SqlDbType.VarChar, 255),
					new SqlParameter("@fldName", SqlDbType.VarChar, 255),
					new SqlParameter("@pageSize", SqlDbType.Int),
					new SqlParameter("@pageIndex", SqlDbType.Int),
					new SqlParameter("@isReCount", SqlDbType.Bit),
					new SqlParameter("@orderBy", SqlDbType.NVarChar,1000),
					new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
					};
			parameters[0].Value = "WX_UserInfo";
			parameters[1].Value = "OpenId";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
            parameters[5].Value = "OpenId";
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}

		#endregion  BasicMethod
		#region  ExtensionMethod

		#endregion  ExtensionMethod
	}
}

