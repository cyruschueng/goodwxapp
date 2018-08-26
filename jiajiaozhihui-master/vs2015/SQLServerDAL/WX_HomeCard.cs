using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_HomeCard
	/// </summary>
	public partial class WX_HomeCard:IWX_HomeCard
	{
		public WX_HomeCard()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_HomeCard"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_HomeCard");
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
		public int Add(SfSoft.Model.WX_HomeCard model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_HomeCard(");
            strSql.Append("OpenId,NickName,Sex,City,Country,Province,Language,HeadimgUrl,Subscribe_Time,Unionid,name,Telephone,Birthday,Address,PostCode,Integral,CreateDate,ModifyDate,CardId,Area,Actor,Grade,UserID)");
			strSql.Append(" values (");
            strSql.Append("@OpenId,@NickName,@Sex,@City,@Country,@Province,@Language,@HeadimgUrl,@Subscribe_Time,@Unionid,@name,@Telephone,@Birthday,@Address,@PostCode,@Integral,@CreateDate,@ModifyDate,@CardId,@Area,@Actor,@Grade,@UserID)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Sex", SqlDbType.Int,4),
					new SqlParameter("@City", SqlDbType.NVarChar,50),
					new SqlParameter("@Country", SqlDbType.NVarChar,50),
					new SqlParameter("@Province", SqlDbType.NVarChar,50),
					new SqlParameter("@Language", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadimgUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@Subscribe_Time", SqlDbType.NVarChar,50),
					new SqlParameter("@Unionid", SqlDbType.NVarChar,50),
					new SqlParameter("@name", SqlDbType.VarChar,20),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,50),
					new SqlParameter("@Birthday", SqlDbType.DateTime),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@PostCode", SqlDbType.VarChar,6),
					new SqlParameter("@Integral", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@ModifyDate", SqlDbType.DateTime),
                    new SqlParameter("@CardId", SqlDbType.NVarChar,11),
                    new SqlParameter("@Area", SqlDbType.NVarChar,50),
                    new SqlParameter("@Actor", SqlDbType.Int,4),
                    new SqlParameter("@Grade", SqlDbType.Int,4),
                    new SqlParameter("@UserID", SqlDbType.NVarChar,50)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.NickName;
			parameters[2].Value = model.Sex;
			parameters[3].Value = model.City;
			parameters[4].Value = model.Country;
			parameters[5].Value = model.Province;
			parameters[6].Value = model.Language;
			parameters[7].Value = model.HeadimgUrl;
			parameters[8].Value = model.Subscribe_Time;
			parameters[9].Value = model.Unionid;
			parameters[10].Value = model.name;
			parameters[11].Value = model.Telephone;
			parameters[12].Value = model.Birthday;
			parameters[13].Value = model.Address;
			parameters[14].Value = model.PostCode;
			parameters[15].Value = model.Integral;
			parameters[16].Value = model.CreateDate;
			parameters[17].Value = model.ModifyDate;
            parameters[18].Value = model.CardId;
            parameters[19].Value = model.Area;
            parameters[20].Value = model.Actor;
            parameters[21].Value = model.Grade;
            parameters[22].Value = model.UserID;

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
		public bool Update(SfSoft.Model.WX_HomeCard model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_HomeCard set ");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("Sex=@Sex,");
			strSql.Append("City=@City,");
			strSql.Append("Country=@Country,");
			strSql.Append("Province=@Province,");
			strSql.Append("Language=@Language,");
			strSql.Append("HeadimgUrl=@HeadimgUrl,");
			strSql.Append("Subscribe_Time=@Subscribe_Time,");
			strSql.Append("Unionid=@Unionid,");
			strSql.Append("name=@name,");
			strSql.Append("Telephone=@Telephone,");
			strSql.Append("Birthday=@Birthday,");
			strSql.Append("Address=@Address,");
			strSql.Append("PostCode=@PostCode,");
			strSql.Append("Integral=@Integral,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("ModifyDate=@ModifyDate,");
            strSql.Append("CardId=@CardId,");
            strSql.Append("Area=@Area,");
            strSql.Append("Actor=@Actor,");
            strSql.Append("Grade=@Grade,");
            strSql.Append("UserID=@UserID");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Sex", SqlDbType.Int,4),
					new SqlParameter("@City", SqlDbType.NVarChar,50),
					new SqlParameter("@Country", SqlDbType.NVarChar,50),
					new SqlParameter("@Province", SqlDbType.NVarChar,50),
					new SqlParameter("@Language", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadimgUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@Subscribe_Time", SqlDbType.NVarChar,50),
					new SqlParameter("@Unionid", SqlDbType.NVarChar,50),
					new SqlParameter("@name", SqlDbType.VarChar,20),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,50),
					new SqlParameter("@Birthday", SqlDbType.DateTime),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@PostCode", SqlDbType.VarChar,6),
					new SqlParameter("@Integral", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@ModifyDate", SqlDbType.DateTime),
                    new SqlParameter("@CardId", SqlDbType.NVarChar,11),
                    new SqlParameter("@Area", SqlDbType.NVarChar,50),
                    new SqlParameter("@Actor", SqlDbType.Int,4),
                    new SqlParameter("@Grade", SqlDbType.Int,4),
                    new SqlParameter("@UserID", SqlDbType.NVarChar,50),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.NickName;
			parameters[2].Value = model.Sex;
			parameters[3].Value = model.City;
			parameters[4].Value = model.Country;
			parameters[5].Value = model.Province;
			parameters[6].Value = model.Language;
			parameters[7].Value = model.HeadimgUrl;
			parameters[8].Value = model.Subscribe_Time;
			parameters[9].Value = model.Unionid;
			parameters[10].Value = model.name;
			parameters[11].Value = model.Telephone;
			parameters[12].Value = model.Birthday;
			parameters[13].Value = model.Address;
			parameters[14].Value = model.PostCode;
			parameters[15].Value = model.Integral;
			parameters[16].Value = model.CreateDate;
			parameters[17].Value = model.ModifyDate;
            parameters[18].Value = model.CardId;
            parameters[19].Value = model.Area;
            parameters[20].Value = model.Actor;
            parameters[21].Value = model.Grade;
            parameters[22].Value = model.UserID;
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
			strSql.Append("delete from WX_HomeCard ");
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
			strSql.Append("delete from WX_HomeCard ");
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
		public SfSoft.Model.WX_HomeCard GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,OpenId,NickName,Sex,City,Country,Province,Language,HeadimgUrl,Subscribe_Time,Unionid,name,Telephone,Birthday,Address,PostCode,Integral,CreateDate,ModifyDate,CardId,Area,Actor,Grade,UserID from WX_HomeCard ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_HomeCard model=new SfSoft.Model.WX_HomeCard();
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
        public SfSoft.Model.WX_HomeCard GetModel(string openid)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,OpenId,NickName,Sex,City,Country,Province,Language,HeadimgUrl,Subscribe_Time,Unionid,name,Telephone,Birthday,Address,PostCode,Integral,CreateDate,ModifyDate,CardId,Area,Actor,Grade,UserID from WX_HomeCard ");
            strSql.Append(" where UserID=@UserID");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            SfSoft.Model.WX_HomeCard model = new SfSoft.Model.WX_HomeCard();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
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
		public SfSoft.Model.WX_HomeCard DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_HomeCard model=new SfSoft.Model.WX_HomeCard();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["Sex"]!=null && row["Sex"].ToString()!="")
				{
					model.Sex=int.Parse(row["Sex"].ToString());
				}
				if(row["City"]!=null)
				{
					model.City=row["City"].ToString();
				}
				if(row["Country"]!=null)
				{
					model.Country=row["Country"].ToString();
				}
				if(row["Province"]!=null)
				{
					model.Province=row["Province"].ToString();
				}
				if(row["Language"]!=null)
				{
					model.Language=row["Language"].ToString();
				}
				if(row["HeadimgUrl"]!=null)
				{
					model.HeadimgUrl=row["HeadimgUrl"].ToString();
				}
				if(row["Subscribe_Time"]!=null)
				{
					model.Subscribe_Time=row["Subscribe_Time"].ToString();
				}
				if(row["Unionid"]!=null)
				{
					model.Unionid=row["Unionid"].ToString();
				}
				if(row["name"]!=null)
				{
					model.name=row["name"].ToString();
				}
				if(row["Telephone"]!=null)
				{
					model.Telephone=row["Telephone"].ToString();
				}
				if(row["Birthday"]!=null && row["Birthday"].ToString()!="")
				{
					model.Birthday=DateTime.Parse(row["Birthday"].ToString());
				}
				if(row["Address"]!=null)
				{
					model.Address=row["Address"].ToString();
				}
				if(row["PostCode"]!=null)
				{
					model.PostCode=row["PostCode"].ToString();
				}
				if(row["Integral"]!=null && row["Integral"].ToString()!="")
				{
					model.Integral=int.Parse(row["Integral"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["ModifyDate"]!=null && row["ModifyDate"].ToString()!="")
				{
					model.ModifyDate=DateTime.Parse(row["ModifyDate"].ToString());
				}
                if (row["CardId"] != null)
                {
                    model.CardId = row["CardId"].ToString();
                }
                if (row["Area"] != null)
                {
                    model.Area = row["Area"].ToString();
                }
                if (row["Actor"] != null && row["Actor"].ToString() != "")
                {
                    model.Actor = int.Parse(row["Actor"].ToString());
                }
                if (row["Grade"] != null && row["Grade"].ToString() != "")
                {
                    model.Grade = int.Parse(row["Grade"].ToString());
                }
                if (row["UserID"] != null)
                {
                    model.UserID = row["UserID"].ToString();
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
            strSql.Append("select ID,OpenId,NickName,Sex,City,Country,Province,Language,HeadimgUrl,Subscribe_Time,Unionid,name,Telephone,Birthday,Address,PostCode,Integral,CreateDate,ModifyDate,CardId,Area,Actor,Grade,UserID ");
			strSql.Append(" FROM WX_HomeCard ");
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
            strSql.Append(" ID,OpenId,NickName,Sex,City,Country,Province,Language,HeadimgUrl,Subscribe_Time,Unionid,name,Telephone,Birthday,Address,PostCode,Integral,CreateDate,ModifyDate,CardId,Area,Actor,Grade,UserID ");
			strSql.Append(" FROM WX_HomeCard ");
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
			strSql.Append("select count(1) FROM WX_HomeCard ");
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
			strSql.Append(")AS Row, T.*  from WX_HomeCard T ");
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
			parameters[0].Value = "WX_HomeCard";
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


        public bool Exists(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_HomeCard");
            strSql.Append(" where UserID=@UserID");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

        public bool ExistsByAgentId(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from WX_HomeCard");
            strSql.Append(" where OpenId=@OpenId");
            SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }

        public bool Delete(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from WX_HomeCard ");
            strSql.Append(" where UserID=@UserID");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeleteByAgentId(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from WX_HomeCard ");
            strSql.Append(" where OpenId=@OpenId");
            SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            int rows = DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public Model.WX_HomeCard GetModelByAgentId(string openid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,OpenId,NickName,Sex,City,Country,Province,Language,HeadimgUrl,Subscribe_Time,Unionid,name,Telephone,Birthday,Address,PostCode,Integral,CreateDate,ModifyDate,CardId,Area,Actor,Grade,UserID from WX_HomeCard ");
            strSql.Append(" where OpenId=@OpenId");
            SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,50)
			};
            parameters[0].Value = openid;

            SfSoft.Model.WX_HomeCard model = new SfSoft.Model.WX_HomeCard();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return DataRowToModel(ds.Tables[0].Rows[0]);
            }
            else
            {
                return null;
            }
        }
    }
}

