using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course_SetBag
	/// </summary>
	public partial class WX_Course_SetBag:IWX_Course_SetBag
	{
		public WX_Course_SetBag()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course_SetBag"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course_SetBag");
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
		public int Add(SfSoft.Model.WX_Course_SetBag model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course_SetBag(");
            strSql.Append("BagName,ImgUrl,IsAct,CreateDate,Lecturer,Intro,Details,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,ReadNumber,MiniImgUrl,MediaType)");
			strSql.Append(" values (");
            strSql.Append("@BagName,@ImgUrl,@IsAct,@CreateDate,@Lecturer,@Intro,@Details,@OriginalPrice,@PreferentialPrice,@BuyNumber,@BuyNumber1,@ReadNumber,@MiniImgUrl,@MediaType)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@BagName", SqlDbType.NVarChar,100),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Lecturer", SqlDbType.Int,4),
					new SqlParameter("@Intro", SqlDbType.NVarChar,1000),
					new SqlParameter("@Details", SqlDbType.Text),
					new SqlParameter("@OriginalPrice", SqlDbType.Money,8),
					new SqlParameter("@PreferentialPrice", SqlDbType.Money,8),
					new SqlParameter("@BuyNumber", SqlDbType.Int,4),
					new SqlParameter("@BuyNumber1", SqlDbType.Int,4),
					new SqlParameter("@ReadNumber", SqlDbType.Int,4),
                    new SqlParameter("@MiniImgUrl", SqlDbType.NVarChar,500),
                    new SqlParameter("@MediaType", SqlDbType.Int,4)};
			parameters[0].Value = model.BagName;
			parameters[1].Value = model.ImgUrl;
			parameters[2].Value = model.IsAct;
			parameters[3].Value = model.CreateDate;
			parameters[4].Value = model.Lecturer;
			parameters[5].Value = model.Intro;
			parameters[6].Value = model.Details;
			parameters[7].Value = model.OriginalPrice;
			parameters[8].Value = model.PreferentialPrice;
			parameters[9].Value = model.BuyNumber;
			parameters[10].Value = model.BuyNumber1;
			parameters[11].Value = model.ReadNumber;
            parameters[12].Value = model.MiniImgUrl;
            parameters[13].Value = model.MediaType;

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
		public bool Update(SfSoft.Model.WX_Course_SetBag model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course_SetBag set ");
			strSql.Append("BagName=@BagName,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Lecturer=@Lecturer,");
			strSql.Append("Intro=@Intro,");
			strSql.Append("Details=@Details,");
			strSql.Append("OriginalPrice=@OriginalPrice,");
			strSql.Append("PreferentialPrice=@PreferentialPrice,");
			strSql.Append("BuyNumber=@BuyNumber,");
			strSql.Append("BuyNumber1=@BuyNumber1,");
			strSql.Append("ReadNumber=@ReadNumber,");
            strSql.Append("MiniImgUrl=@MiniImgUrl,");
            strSql.Append("MediaType=@MediaType");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@BagName", SqlDbType.NVarChar,100),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,100),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Lecturer", SqlDbType.Int,4),
					new SqlParameter("@Intro", SqlDbType.NVarChar,1000),
					new SqlParameter("@Details", SqlDbType.Text),
					new SqlParameter("@OriginalPrice", SqlDbType.Money,8),
					new SqlParameter("@PreferentialPrice", SqlDbType.Money,8),
					new SqlParameter("@BuyNumber", SqlDbType.Int,4),
					new SqlParameter("@BuyNumber1", SqlDbType.Int,4),
					new SqlParameter("@ReadNumber", SqlDbType.Int,4),
                    new SqlParameter("@MiniImgUrl", SqlDbType.NVarChar,500),
                    new SqlParameter("@MediaType", SqlDbType.Int,4),
					new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.BagName;
			parameters[1].Value = model.ImgUrl;
			parameters[2].Value = model.IsAct;
			parameters[3].Value = model.CreateDate;
			parameters[4].Value = model.Lecturer;
			parameters[5].Value = model.Intro;
			parameters[6].Value = model.Details;
			parameters[7].Value = model.OriginalPrice;
			parameters[8].Value = model.PreferentialPrice;
			parameters[9].Value = model.BuyNumber;
			parameters[10].Value = model.BuyNumber1;
			parameters[11].Value = model.ReadNumber;
            parameters[12].Value = model.MiniImgUrl;
            parameters[13].Value = model.MediaType;
			parameters[14].Value = model.Id;

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
			strSql.Append("delete from WX_Course_SetBag ");
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
			strSql.Append("delete from WX_Course_SetBag ");
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
		public SfSoft.Model.WX_Course_SetBag GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,BagName,ImgUrl,IsAct,CreateDate,Lecturer,Intro,Details,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,ReadNumber,MiniImgUrl,MediaType from WX_Course_SetBag ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course_SetBag model=new SfSoft.Model.WX_Course_SetBag();
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
		public SfSoft.Model.WX_Course_SetBag DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course_SetBag model=new SfSoft.Model.WX_Course_SetBag();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["BagName"]!=null)
				{
					model.BagName=row["BagName"].ToString();
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["Lecturer"]!=null && row["Lecturer"].ToString()!="")
				{
					model.Lecturer=int.Parse(row["Lecturer"].ToString());
				}
				if(row["Intro"]!=null)
				{
					model.Intro=row["Intro"].ToString();
				}
				if(row["Details"]!=null)
				{
					model.Details=row["Details"].ToString();
				}
				if(row["OriginalPrice"]!=null && row["OriginalPrice"].ToString()!="")
				{
					model.OriginalPrice=decimal.Parse(row["OriginalPrice"].ToString());
				}
				if(row["PreferentialPrice"]!=null && row["PreferentialPrice"].ToString()!="")
				{
					model.PreferentialPrice=decimal.Parse(row["PreferentialPrice"].ToString());
				}
				if(row["BuyNumber"]!=null && row["BuyNumber"].ToString()!="")
				{
					model.BuyNumber=int.Parse(row["BuyNumber"].ToString());
				}
				if(row["BuyNumber1"]!=null && row["BuyNumber1"].ToString()!="")
				{
					model.BuyNumber1=int.Parse(row["BuyNumber1"].ToString());
				}
				if(row["ReadNumber"]!=null && row["ReadNumber"].ToString()!="")
				{
					model.ReadNumber=int.Parse(row["ReadNumber"].ToString());
				}
                if (row["MiniImgUrl"] != null)
                {
                    model.MiniImgUrl = row["MiniImgUrl"].ToString();
                }
                if (row["MediaType"] != null && row["MediaType"].ToString() != "")
                {
                    model.MediaType = int.Parse(row["MediaType"].ToString());
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
            strSql.Append("select Id,BagName,ImgUrl,IsAct,CreateDate,Lecturer,Intro,Details,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,ReadNumber,MiniImgUrl,MediaType ");
			strSql.Append(" FROM WX_Course_SetBag ");
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
            strSql.Append(" Id,BagName,ImgUrl,IsAct,CreateDate,Lecturer,Intro,Details,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,ReadNumber,MiniImgUrl,MediaType ");
			strSql.Append(" FROM WX_Course_SetBag ");
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
			strSql.Append("select count(1) FROM WX_Course_SetBag ");
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
			strSql.Append(")AS Row, T.*  from WX_Course_SetBag T ");
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
			parameters[0].Value = "WX_Course_SetBag";
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

