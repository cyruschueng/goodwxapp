using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Topic
	/// </summary>
	public partial class WX_Topic:IWX_Topic
	{
		public WX_Topic()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Topic"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Topic");
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
		public int Add(SfSoft.Model.WX_Topic model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Topic(");
            strSql.Append("Titel,ImgUrl,VideoUrl,Tag,OrderBy,IsTop,IsRecommend,IsAct,ReplayNumber,ViewNumber,ShareNumber,SupportNnumber,ReplayID,Openid,CreateDate,CreateID,Creator,HeaderImgUrl,Details)");
			strSql.Append(" values (");
            strSql.Append("@Titel,@ImgUrl,@VideoUrl,@Tag,@OrderBy,@IsTop,@IsRecommend,@IsAct,@ReplayNumber,@ViewNumber,@ShareNumber,@SupportNnumber,@ReplayID,@Openid,@CreateDate,@CreateID,@Creator,@HeaderImgUrl,@Details)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Titel", SqlDbType.NVarChar,50),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,150),
					new SqlParameter("@VideoUrl", SqlDbType.NVarChar,150),
					new SqlParameter("@Tag", SqlDbType.Int,4),
					new SqlParameter("@OrderBy", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4),
					new SqlParameter("@IsRecommend", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@ReplayNumber", SqlDbType.Int,4),
					new SqlParameter("@ViewNumber", SqlDbType.Int,4),
					new SqlParameter("@ShareNumber", SqlDbType.Int,4),
					new SqlParameter("@SupportNnumber", SqlDbType.Int,4),
					new SqlParameter("@ReplayID", SqlDbType.Int,4),
					new SqlParameter("@Openid", SqlDbType.NVarChar,100),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@CreateID", SqlDbType.NVarChar,100),
					new SqlParameter("@Creator", SqlDbType.NVarChar,50),
                    new SqlParameter("@HeaderImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@Details", SqlDbType.NVarChar,2000)};
			parameters[0].Value = model.Titel;
			parameters[1].Value = model.ImgUrl;
			parameters[2].Value = model.VideoUrl;
			parameters[3].Value = model.Tag;
			parameters[4].Value = model.OrderBy;
			parameters[5].Value = model.IsTop;
			parameters[6].Value = model.IsRecommend;
			parameters[7].Value = model.IsAct;
			parameters[8].Value = model.ReplayNumber;
			parameters[9].Value = model.ViewNumber;
			parameters[10].Value = model.ShareNumber;
			parameters[11].Value = model.SupportNnumber;
			parameters[12].Value = model.ReplayID;
			parameters[13].Value = model.Openid;
			parameters[14].Value = model.CreateDate;
			parameters[15].Value = model.CreateID;
			parameters[16].Value = model.Creator;
            parameters[17].Value = model.HeaderImgUrl;
            parameters[18].Value = model.Details;

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
		public bool Update(SfSoft.Model.WX_Topic model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Topic set ");
			strSql.Append("Titel=@Titel,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("VideoUrl=@VideoUrl,");
			strSql.Append("Tag=@Tag,");
			strSql.Append("OrderBy=@OrderBy,");
			strSql.Append("IsTop=@IsTop,");
			strSql.Append("IsRecommend=@IsRecommend,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("ReplayNumber=@ReplayNumber,");
			strSql.Append("ViewNumber=@ViewNumber,");
			strSql.Append("ShareNumber=@ShareNumber,");
			strSql.Append("SupportNnumber=@SupportNnumber,");
			strSql.Append("ReplayID=@ReplayID,");
			strSql.Append("Openid=@Openid,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("CreateID=@CreateID,");
			strSql.Append("Creator=@Creator,");
            strSql.Append("HeaderImgUrl=@HeaderImgUrl,");
            strSql.Append("Details=@Details");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@Titel", SqlDbType.NVarChar,50),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,150),
					new SqlParameter("@VideoUrl", SqlDbType.NVarChar,150),
					new SqlParameter("@Tag", SqlDbType.Int,4),
					new SqlParameter("@OrderBy", SqlDbType.Int,4),
					new SqlParameter("@IsTop", SqlDbType.Int,4),
					new SqlParameter("@IsRecommend", SqlDbType.Int,4),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@ReplayNumber", SqlDbType.Int,4),
					new SqlParameter("@ViewNumber", SqlDbType.Int,4),
					new SqlParameter("@ShareNumber", SqlDbType.Int,4),
					new SqlParameter("@SupportNnumber", SqlDbType.Int,4),
					new SqlParameter("@ReplayID", SqlDbType.Int,4),
					new SqlParameter("@Openid", SqlDbType.NVarChar,100),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@CreateID", SqlDbType.NVarChar,100),
					new SqlParameter("@Creator", SqlDbType.NVarChar,50),
                    new SqlParameter("@HeaderImgUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@Details", SqlDbType.NVarChar,2000),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.Titel;
			parameters[1].Value = model.ImgUrl;
			parameters[2].Value = model.VideoUrl;
			parameters[3].Value = model.Tag;
			parameters[4].Value = model.OrderBy;
			parameters[5].Value = model.IsTop;
			parameters[6].Value = model.IsRecommend;
			parameters[7].Value = model.IsAct;
			parameters[8].Value = model.ReplayNumber;
			parameters[9].Value = model.ViewNumber;
			parameters[10].Value = model.ShareNumber;
			parameters[11].Value = model.SupportNnumber;
			parameters[12].Value = model.ReplayID;
			parameters[13].Value = model.Openid;
			parameters[14].Value = model.CreateDate;
			parameters[15].Value = model.CreateID;
			parameters[16].Value = model.Creator;
            parameters[17].Value = model.HeaderImgUrl;
            parameters[18].Value = model.Details;
			parameters[19].Value = model.ID;

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
			strSql.Append("delete from WX_Topic ");
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
			strSql.Append("delete from WX_Topic ");
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
		public SfSoft.Model.WX_Topic GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,Titel,ImgUrl,VideoUrl,Tag,OrderBy,IsTop,IsRecommend,IsAct,ReplayNumber,ViewNumber,ShareNumber,SupportNnumber,ReplayID,Openid,CreateDate,CreateID,Creator,HeaderImgUrl,Details from WX_Topic ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Topic model=new SfSoft.Model.WX_Topic();
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
		public SfSoft.Model.WX_Topic DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Topic model=new SfSoft.Model.WX_Topic();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["Titel"]!=null)
				{
					model.Titel=row["Titel"].ToString();
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["VideoUrl"]!=null)
				{
					model.VideoUrl=row["VideoUrl"].ToString();
				}
				if(row["Tag"]!=null && row["Tag"].ToString()!="")
				{
					model.Tag=int.Parse(row["Tag"].ToString());
				}
				if(row["OrderBy"]!=null && row["OrderBy"].ToString()!="")
				{
					model.OrderBy=int.Parse(row["OrderBy"].ToString());
				}
				if(row["IsTop"]!=null && row["IsTop"].ToString()!="")
				{
					model.IsTop=int.Parse(row["IsTop"].ToString());
				}
				if(row["IsRecommend"]!=null && row["IsRecommend"].ToString()!="")
				{
					model.IsRecommend=int.Parse(row["IsRecommend"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["ReplayNumber"]!=null && row["ReplayNumber"].ToString()!="")
				{
					model.ReplayNumber=int.Parse(row["ReplayNumber"].ToString());
				}
				if(row["ViewNumber"]!=null && row["ViewNumber"].ToString()!="")
				{
					model.ViewNumber=int.Parse(row["ViewNumber"].ToString());
				}
				if(row["ShareNumber"]!=null && row["ShareNumber"].ToString()!="")
				{
					model.ShareNumber=int.Parse(row["ShareNumber"].ToString());
				}
				if(row["SupportNnumber"]!=null && row["SupportNnumber"].ToString()!="")
				{
					model.SupportNnumber=int.Parse(row["SupportNnumber"].ToString());
				}
				if(row["ReplayID"]!=null && row["ReplayID"].ToString()!="")
				{
					model.ReplayID=int.Parse(row["ReplayID"].ToString());
				}
				if(row["Openid"]!=null)
				{
					model.Openid=row["Openid"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["CreateID"]!=null)
				{
					model.CreateID=row["CreateID"].ToString();
				}
				if(row["Creator"]!=null)
				{
					model.Creator=row["Creator"].ToString();
				}
                if (row["HeaderImgUrl"] != null)
                {
                    model.HeaderImgUrl = row["HeaderImgUrl"].ToString();
                }
                if (row["Details"] != null)
                {
                    model.Details = row["Details"].ToString();
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
            strSql.Append("select ID,Titel,ImgUrl,VideoUrl,Tag,OrderBy,IsTop,IsRecommend,IsAct,ReplayNumber,ViewNumber,ShareNumber,SupportNnumber,ReplayID,Openid,CreateDate,CreateID,Creator,HeaderImgUrl,Details ");
			strSql.Append(" FROM WX_Topic ");
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
            strSql.Append(" ID,Titel,ImgUrl,VideoUrl,Tag,OrderBy,IsTop,IsRecommend,IsAct,ReplayNumber,ViewNumber,ShareNumber,SupportNnumber,ReplayID,Openid,CreateDate,CreateID,Creator,HeaderImgUrl,Details ");
			strSql.Append(" FROM WX_Topic ");
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
			strSql.Append("select count(1) FROM WX_Topic ");
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
			strSql.Append(")AS Row, T.*  from WX_Topic T ");
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
			parameters[0].Value = "WX_Topic";
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

