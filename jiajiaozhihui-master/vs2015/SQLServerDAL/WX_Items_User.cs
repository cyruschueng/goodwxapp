using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Items_User
	/// </summary>
	public partial class WX_Items_User:IWX_Items_User
	{
		public WX_Items_User()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ItemsId", "WX_Items_User"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string OpenId,int ItemsId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Items_User");
			strSql.Append(" where OpenId=@OpenId and ItemsId=@ItemsId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ItemsId", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = ItemsId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Items_User model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Items_User(");
			strSql.Append("OpenId,ItemsId,NickName,Sex,Province,City,Country,HeadImgUrl,Privilege,JoinDate,Longitude,Latitude,IsAct)");
			strSql.Append(" values (");
			strSql.Append("@OpenId,@ItemsId,@NickName,@Sex,@Province,@City,@Country,@HeadImgUrl,@Privilege,@JoinDate,@Longitude,@Latitude,@IsAct)");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ItemsId", SqlDbType.Int,4),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Sex", SqlDbType.Int,4),
					new SqlParameter("@Province", SqlDbType.NVarChar,50),
					new SqlParameter("@City", SqlDbType.NVarChar,50),
					new SqlParameter("@Country", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Privilege", SqlDbType.NVarChar,4000),
					new SqlParameter("@JoinDate", SqlDbType.DateTime),
					new SqlParameter("@Longitude", SqlDbType.Float,8),
					new SqlParameter("@Latitude", SqlDbType.Float,8),
					new SqlParameter("@IsAct", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.ItemsId;
			parameters[2].Value = model.NickName;
			parameters[3].Value = model.Sex;
			parameters[4].Value = model.Province;
			parameters[5].Value = model.City;
			parameters[6].Value = model.Country;
			parameters[7].Value = model.HeadImgUrl;
			parameters[8].Value = model.Privilege;
			parameters[9].Value = model.JoinDate;
			parameters[10].Value = model.Longitude;
			parameters[11].Value = model.Latitude;
			parameters[12].Value = model.IsAct;

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
		public bool Update(SfSoft.Model.WX_Items_User model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Items_User set ");
			strSql.Append("NickName=@NickName,");
			strSql.Append("Sex=@Sex,");
			strSql.Append("Province=@Province,");
			strSql.Append("City=@City,");
			strSql.Append("Country=@Country,");
			strSql.Append("HeadImgUrl=@HeadImgUrl,");
			strSql.Append("Privilege=@Privilege,");
			strSql.Append("JoinDate=@JoinDate,");
			strSql.Append("Longitude=@Longitude,");
			strSql.Append("Latitude=@Latitude,");
			strSql.Append("IsAct=@IsAct");
			strSql.Append(" where OpenId=@OpenId and ItemsId=@ItemsId ");
			SqlParameter[] parameters = {
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Sex", SqlDbType.Int,4),
					new SqlParameter("@Province", SqlDbType.NVarChar,50),
					new SqlParameter("@City", SqlDbType.NVarChar,50),
					new SqlParameter("@Country", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Privilege", SqlDbType.NVarChar,4000),
					new SqlParameter("@JoinDate", SqlDbType.DateTime),
					new SqlParameter("@Longitude", SqlDbType.Float,8),
					new SqlParameter("@Latitude", SqlDbType.Float,8),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ItemsId", SqlDbType.Int,4)};
			parameters[0].Value = model.NickName;
			parameters[1].Value = model.Sex;
			parameters[2].Value = model.Province;
			parameters[3].Value = model.City;
			parameters[4].Value = model.Country;
			parameters[5].Value = model.HeadImgUrl;
			parameters[6].Value = model.Privilege;
			parameters[7].Value = model.JoinDate;
			parameters[8].Value = model.Longitude;
			parameters[9].Value = model.Latitude;
			parameters[10].Value = model.IsAct;
			parameters[11].Value = model.OpenId;
			parameters[12].Value = model.ItemsId;

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
		public bool Delete(string OpenId,int ItemsId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Items_User ");
			strSql.Append(" where OpenId=@OpenId and ItemsId=@ItemsId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ItemsId", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = ItemsId;

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
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_Items_User GetModel(string OpenId,int ItemsId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 OpenId,ItemsId,NickName,Sex,Province,City,Country,HeadImgUrl,Privilege,JoinDate,Longitude,Latitude,IsAct from WX_Items_User ");
			strSql.Append(" where OpenId=@OpenId and ItemsId=@ItemsId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@ItemsId", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = ItemsId;

			SfSoft.Model.WX_Items_User model=new SfSoft.Model.WX_Items_User();
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
		public SfSoft.Model.WX_Items_User DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Items_User model=new SfSoft.Model.WX_Items_User();
			if (row != null)
			{
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["ItemsId"]!=null && row["ItemsId"].ToString()!="")
				{
					model.ItemsId=int.Parse(row["ItemsId"].ToString());
				}
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["Sex"]!=null && row["Sex"].ToString()!="")
				{
					model.Sex=int.Parse(row["Sex"].ToString());
				}
				if(row["Province"]!=null)
				{
					model.Province=row["Province"].ToString();
				}
				if(row["City"]!=null)
				{
					model.City=row["City"].ToString();
				}
				if(row["Country"]!=null)
				{
					model.Country=row["Country"].ToString();
				}
				if(row["HeadImgUrl"]!=null)
				{
					model.HeadImgUrl=row["HeadImgUrl"].ToString();
				}
				if(row["Privilege"]!=null)
				{
					model.Privilege=row["Privilege"].ToString();
				}
				if(row["JoinDate"]!=null && row["JoinDate"].ToString()!="")
				{
					model.JoinDate=DateTime.Parse(row["JoinDate"].ToString());
				}
				if(row["Longitude"]!=null && row["Longitude"].ToString()!="")
				{
					model.Longitude=decimal.Parse(row["Longitude"].ToString());
				}
				if(row["Latitude"]!=null && row["Latitude"].ToString()!="")
				{
					model.Latitude=decimal.Parse(row["Latitude"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
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
			strSql.Append("select OpenId,ItemsId,NickName,Sex,Province,City,Country,HeadImgUrl,Privilege,JoinDate,Longitude,Latitude,IsAct ");
			strSql.Append(" FROM WX_Items_User ");
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
			strSql.Append(" OpenId,ItemsId,NickName,Sex,Province,City,Country,HeadImgUrl,Privilege,JoinDate,Longitude,Latitude,IsAct ");
			strSql.Append(" FROM WX_Items_User ");
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
			strSql.Append("select count(1) FROM WX_Items_User ");
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
				strSql.Append("order by T.ItemsId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Items_User T ");
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
			parameters[0].Value = "WX_Items_User";
			parameters[1].Value = "ItemsId";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/


		#endregion  BasicMethod
		#region  ExtensionMethod
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        public void AddUpdate(SfSoft.Model.WX_Items_User model)
        {
            SqlParameter[] parameters = {
					new SqlParameter("@openid", SqlDbType.NVarChar, 100),
					new SqlParameter("@itemsid", SqlDbType.Int, 4),
					new SqlParameter("@nickname", SqlDbType.NVarChar,50),
					new SqlParameter("@sex", SqlDbType.Int,4),
					new SqlParameter("@province", SqlDbType.NVarChar,50),
					new SqlParameter("@city", SqlDbType.NVarChar,50),
					new SqlParameter("@country", SqlDbType.NVarChar,50),
                    new SqlParameter("@headimgurl", SqlDbType.NVarChar,200),
                    new SqlParameter("@privilege", SqlDbType.NVarChar,2000),
                    new SqlParameter("@longitude", SqlDbType.Float,14),
                    new SqlParameter("@latitude", SqlDbType.Float,14),
                    new SqlParameter("@isact", SqlDbType.Int,4)
					};
            parameters[0].Value =model.OpenId;
            parameters[1].Value = model.ItemsId;
            parameters[2].Value = model.NickName;
            parameters[3].Value = model.Sex;
            parameters[4].Value = model.Province;
            parameters[5].Value = model.City;
            parameters[6].Value = model.Country;
            parameters[7].Value = model.HeadImgUrl;
            parameters[8].Value = model.Longitude;
            parameters[9].Value = model.Latitude;
            parameters[10].Value = model.IsAct;
            DbHelperSQL.RunProcedure("pro_ItemUserRegister", parameters);
        }
		#endregion  ExtensionMethod
	}
}

