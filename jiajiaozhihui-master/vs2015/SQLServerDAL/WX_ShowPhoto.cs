using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_ShowPhoto
	/// </summary>
	public partial class WX_ShowPhoto:IWX_ShowPhoto
	{
		public WX_ShowPhoto()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_ShowPhoto"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_ShowPhoto");
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
		public int Add(SfSoft.Model.WX_ShowPhoto model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_ShowPhoto(");
            strSql.Append("ActivityID,OpenID,NickName,HeadImgUrl,UpLoadImgUrl,CreateDate,ShareNumber,IsUpload,Province,City,Address,Telephone,UserName,IsSend )");
			strSql.Append(" values (");
            strSql.Append("@ActivityID,@OpenID,@NickName,@HeadImgUrl,@UpLoadImgUrl,@CreateDate,@ShareNumber,@IsUpload,@Province,@City,@Address,@Telephone,@UserName,@IsSend )");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ActivityID", SqlDbType.Int,4),
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@UpLoadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@ShareNumber", SqlDbType.Int,4),
                    new SqlParameter("@IsUpload", SqlDbType.Int,4),
                    new SqlParameter("@Province", SqlDbType.Int,4),
                    new SqlParameter("@City", SqlDbType.Int,4),
                    new SqlParameter("@Address", SqlDbType.NVarChar,200),
                    new SqlParameter("@Telephone", SqlDbType.NVarChar,100),
                    new SqlParameter("@UserName", SqlDbType.NVarChar,100),
                    new SqlParameter("@IsSend", SqlDbType.Int,4)};
			parameters[0].Value = model.ActivityID;
			parameters[1].Value = model.OpenID;
			parameters[2].Value = model.NickName;
			parameters[3].Value = model.HeadImgUrl;
			parameters[4].Value = model.UpLoadImgUrl;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.ShareNumber;
            parameters[7].Value = model.IsUpload;
            parameters[8].Value = model.Province;
            parameters[9].Value = model.City;
            parameters[10].Value = model.Address;
            parameters[11].Value = model.Telephone;
            parameters[12].Value = model.UserName;
            parameters[13].Value = model.IsSend;

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
		public bool Update(SfSoft.Model.WX_ShowPhoto model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_ShowPhoto set ");
			strSql.Append("ActivityID=@ActivityID,");
			strSql.Append("OpenID=@OpenID,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("HeadImgUrl=@HeadImgUrl,");
			strSql.Append("UpLoadImgUrl=@UpLoadImgUrl,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("ShareNumber=@ShareNumber,");
            strSql.Append("IsUpload=@IsUpload,");
            strSql.Append("Province=@Province,");
            strSql.Append("City=@City,");
            strSql.Append("Address=@Address,");
            strSql.Append("Telephone=@Telephone,");
            strSql.Append("UserName=@UserName,");
            strSql.Append("IsSend=@IsSend");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ActivityID", SqlDbType.Int,4),
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@UpLoadImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@ShareNumber", SqlDbType.Int,4),
                    new SqlParameter("@IsUpload", SqlDbType.Int,4),
                    new SqlParameter("@Province", SqlDbType.Int,4),
                    new SqlParameter("@City", SqlDbType.Int,4),
                    new SqlParameter("@Address", SqlDbType.NVarChar,200),
                    new SqlParameter("@Telephone", SqlDbType.NVarChar,100),
                    new SqlParameter("@UserName", SqlDbType.NVarChar,100),
                    new SqlParameter("@IsSend", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.ActivityID;
			parameters[1].Value = model.OpenID;
			parameters[2].Value = model.NickName;
			parameters[3].Value = model.HeadImgUrl;
			parameters[4].Value = model.UpLoadImgUrl;
			parameters[5].Value = model.CreateDate;
            parameters[6].Value = model.ShareNumber;
            parameters[7].Value = model.IsUpload;
            parameters[8].Value = model.Province;
            parameters[9].Value = model.City;
            parameters[10].Value = model.Address;
            parameters[11].Value = model.Telephone;
            parameters[12].Value = model.UserName;
            parameters[13].Value = model.IsSend;
			parameters[14].Value = model.ID;

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
			strSql.Append("delete from WX_ShowPhoto ");
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
			strSql.Append("delete from WX_ShowPhoto ");
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
		public SfSoft.Model.WX_ShowPhoto GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,ActivityID,OpenID,NickName,HeadImgUrl,UpLoadImgUrl,CreateDate,ShareNumber,IsUpload,Province,City,Address,Telephone,UserName,IsSend  from WX_ShowPhoto ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_ShowPhoto model=new SfSoft.Model.WX_ShowPhoto();
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
        public SfSoft.Model.WX_ShowPhoto GetModel(string openid)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,ActivityID,OpenID,NickName,HeadImgUrl,UpLoadImgUrl,CreateDate,ShareNumber,IsUpload,Province,City,Address,Telephone,UserName,IsSend  from WX_ShowPhoto ");
            strSql.Append(" where OpenID=@OpenID");
            SqlParameter[] parameters = {
					new SqlParameter("@OpenID", SqlDbType.NVarChar,100)
			};
            parameters[0].Value = openid;

            SfSoft.Model.WX_ShowPhoto model = new SfSoft.Model.WX_ShowPhoto();
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
		public SfSoft.Model.WX_ShowPhoto DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_ShowPhoto model=new SfSoft.Model.WX_ShowPhoto();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["ActivityID"]!=null && row["ActivityID"].ToString()!="")
				{
					model.ActivityID=int.Parse(row["ActivityID"].ToString());
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
				if(row["UpLoadImgUrl"]!=null)
				{
					model.UpLoadImgUrl=row["UpLoadImgUrl"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["ShareNumber"] != null && row["ShareNumber"].ToString() != "")
                {
                    model.ShareNumber = int.Parse(row["ShareNumber"].ToString());
                }
                if (row["IsUpload"] != null && row["IsUpload"].ToString() != "")
                {
                    model.IsUpload = int.Parse(row["IsUpload"].ToString());
                }

                if (row["Province"] != null && row["Province"].ToString() != "")
                {
                    model.Province = int.Parse(row["Province"].ToString());
                }

                if (row["City"] != null && row["City"].ToString() != "")
                {
                    model.City = int.Parse(row["City"].ToString());
                }

                if (row["Address"] != null)
                {
                    model.Address = row["Address"].ToString();
                }

                if (row["Telephone"] != null)
                {
                    model.Telephone = row["Telephone"].ToString();
                }
                if (row["UserName"] != null)
                {
                    model.UserName = row["UserName"].ToString();
                }
                if (row["IsSend"] != null && row["IsSend"].ToString() != "")
                {
                    model.IsSend = int.Parse(row["IsSend"].ToString());
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
            strSql.Append("select ID,ActivityID,OpenID,NickName,HeadImgUrl,UpLoadImgUrl,CreateDate,ShareNumber,IsUpload,Province,City,Address,Telephone,UserName,IsSend  ");
			strSql.Append(" FROM WX_ShowPhoto ");
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
            strSql.Append(" ID,ActivityID,OpenID,NickName,HeadImgUrl,UpLoadImgUrl,CreateDate,ShareNumber,IsUpload,Province,City,Address,Telephone,UserName,IsSend  ");
			strSql.Append(" FROM WX_ShowPhoto ");
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
			strSql.Append("select count(1) FROM WX_ShowPhoto ");
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
			strSql.Append(")AS Row, T.*  from WX_ShowPhoto T ");
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
			parameters[0].Value = "WX_ShowPhoto";
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

