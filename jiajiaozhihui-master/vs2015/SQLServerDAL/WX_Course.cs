using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Course
	/// </summary>
	public partial class WX_Course:IWX_Course
	{
		public WX_Course()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("Id", "WX_Course"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int Id)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Course");
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
		public int Add(SfSoft.Model.WX_Course model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Course(");
            strSql.Append("ParentId,ProviderId,ImgUrl,Duration,Lecturer,Intro,Details,Reward,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,LearnNumber,OnLineDateTime,SaleState,LearnState,LearnDate,CommentState,Name,Theme,Start,[End],CourseType,IsFree,IsBags,MiniImgUrl,MediaType,ExercisesId)");
			strSql.Append(" values (");
            strSql.Append("@ParentId,@ProviderId,@ImgUrl,@Duration,@Lecturer,@Intro,@Details,@Reward,@OriginalPrice,@PreferentialPrice,@BuyNumber,@BuyNumber1,@LearnNumber,@OnLineDateTime,@SaleState,@LearnState,@LearnDate,@CommentState,@Name,@Theme,@Start,@End,@CourseType,@IsFree,@IsBags,@MiniImgUrl,@MediaType,@ExercisesId)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@ParentId", SqlDbType.Int,4),
					new SqlParameter("@ProviderId", SqlDbType.Int,4),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Duration", SqlDbType.Float,8),
					new SqlParameter("@Lecturer", SqlDbType.NVarChar,100),
					new SqlParameter("@Intro", SqlDbType.NVarChar,200),
					new SqlParameter("@Details", SqlDbType.Text),
					new SqlParameter("@Reward", SqlDbType.NVarChar,100),
					new SqlParameter("@OriginalPrice", SqlDbType.Money,8),
					new SqlParameter("@PreferentialPrice", SqlDbType.Money,8),
					new SqlParameter("@BuyNumber", SqlDbType.Int,4),
					new SqlParameter("@BuyNumber1", SqlDbType.Int,4),
					new SqlParameter("@LearnNumber", SqlDbType.Int,4),
					new SqlParameter("@OnLineDateTime", SqlDbType.DateTime),
					new SqlParameter("@SaleState", SqlDbType.Int,4),
					new SqlParameter("@LearnState", SqlDbType.Int,4),
					new SqlParameter("@LearnDate", SqlDbType.NVarChar,4000),
					new SqlParameter("@CommentState", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
                    new SqlParameter("@Theme", SqlDbType.Int,4),
                    new SqlParameter("@Start", SqlDbType.DateTime),
                    new SqlParameter("@End", SqlDbType.DateTime),
                    new SqlParameter("@CourseType", SqlDbType.Int,4),
                    new SqlParameter("@IsFree", SqlDbType.Int,4),
                    new SqlParameter("@IsBags", SqlDbType.Int,4),
                    new SqlParameter("@MiniImgUrl", SqlDbType.NVarChar,500),
                    new SqlParameter("@MediaType", SqlDbType.Int,4),
                    new SqlParameter("@ExercisesId", SqlDbType.NVarChar,100)};
			parameters[0].Value = model.ParentId;
			parameters[1].Value = model.ProviderId;
			parameters[2].Value = model.ImgUrl;
			parameters[3].Value = model.Duration;
			parameters[4].Value = model.Lecturer;
			parameters[5].Value = model.Intro;
			parameters[6].Value = model.Details;
			parameters[7].Value = model.Reward;
			parameters[8].Value = model.OriginalPrice;
			parameters[9].Value = model.PreferentialPrice;
			parameters[10].Value = model.BuyNumber;
			parameters[11].Value = model.BuyNumber1;
			parameters[12].Value = model.LearnNumber;
			parameters[13].Value = model.OnLineDateTime;
			parameters[14].Value = model.SaleState;
			parameters[15].Value = model.LearnState;
			parameters[16].Value = model.LearnDate;
			parameters[17].Value = model.CommentState;
			parameters[18].Value = model.Name;
            parameters[19].Value = model.Theme;
            parameters[20].Value = model.Start;
            parameters[21].Value = model.End;
            parameters[22].Value = model.CourseType;
            parameters[23].Value = model.IsFree;
            parameters[24].Value = model.IsBags;
            parameters[25].Value = model.MiniImgUrl;
            parameters[26].Value = model.MediaType;
            parameters[27].Value = model.ExercisesId;

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
		public bool Update(SfSoft.Model.WX_Course model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Course set ");
			strSql.Append("ParentId=@ParentId,");
			strSql.Append("ProviderId=@ProviderId,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("Duration=@Duration,");
			strSql.Append("Lecturer=@Lecturer,");
			strSql.Append("Intro=@Intro,");
			strSql.Append("Details=@Details,");
			strSql.Append("Reward=@Reward,");
			strSql.Append("OriginalPrice=@OriginalPrice,");
			strSql.Append("PreferentialPrice=@PreferentialPrice,");
			strSql.Append("BuyNumber=@BuyNumber,");
			strSql.Append("BuyNumber1=@BuyNumber1,");
			strSql.Append("LearnNumber=@LearnNumber,");
			strSql.Append("OnLineDateTime=@OnLineDateTime,");
			strSql.Append("SaleState=@SaleState,");
			strSql.Append("LearnState=@LearnState,");
			strSql.Append("LearnDate=@LearnDate,");
			strSql.Append("CommentState=@CommentState,");
			strSql.Append("Name=@Name,");
            strSql.Append("Theme=@Theme,");
            strSql.Append("Start=@Start,");
            strSql.Append("[End]=@End,");
            strSql.Append("CourseType=@CourseType,");
            strSql.Append("IsFree=@IsFree,");
            strSql.Append("IsBags=@IsBags,");
            strSql.Append("MiniImgUrl=@MiniImgUrl,");
            strSql.Append("MediaType=@MediaType,");
            strSql.Append("ExercisesId=@ExercisesId");
            strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@ParentId", SqlDbType.Int,4),
					new SqlParameter("@ProviderId", SqlDbType.Int,4),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,200),
					new SqlParameter("@Duration", SqlDbType.Float,8),
					new SqlParameter("@Lecturer", SqlDbType.NVarChar,100),
					new SqlParameter("@Intro", SqlDbType.NVarChar,200),
					new SqlParameter("@Details", SqlDbType.Text),
					new SqlParameter("@Reward", SqlDbType.NVarChar,100),
					new SqlParameter("@OriginalPrice", SqlDbType.Money,8),
					new SqlParameter("@PreferentialPrice", SqlDbType.Money,8),
					new SqlParameter("@BuyNumber", SqlDbType.Int,4),
					new SqlParameter("@BuyNumber1", SqlDbType.Int,4),
					new SqlParameter("@LearnNumber", SqlDbType.Int,4),
					new SqlParameter("@OnLineDateTime", SqlDbType.DateTime),
					new SqlParameter("@SaleState", SqlDbType.Int,4),
					new SqlParameter("@LearnState", SqlDbType.Int,4),
					new SqlParameter("@LearnDate", SqlDbType.NVarChar,4000),
					new SqlParameter("@CommentState", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
                    new SqlParameter("@Theme", SqlDbType.Int,4),
                    new SqlParameter("@Start", SqlDbType.DateTime),
                    new SqlParameter("@End", SqlDbType.DateTime),
                    new SqlParameter("@CourseType", SqlDbType.Int,4),
                    new SqlParameter("@IsFree", SqlDbType.Int,4),
                    new SqlParameter("@IsBags", SqlDbType.Int,4),
                    new SqlParameter("@MiniImgUrl", SqlDbType.NVarChar,500),
                    new SqlParameter("@MediaType", SqlDbType.Int,4),
                    new SqlParameter("@ExercisesId", SqlDbType.NVarChar,100),
                    new SqlParameter("@Id", SqlDbType.Int,4)};
			parameters[0].Value = model.ParentId;
			parameters[1].Value = model.ProviderId;
			parameters[2].Value = model.ImgUrl;
			parameters[3].Value = model.Duration;
			parameters[4].Value = model.Lecturer;
			parameters[5].Value = model.Intro;
			parameters[6].Value = model.Details;
			parameters[7].Value = model.Reward;
			parameters[8].Value = model.OriginalPrice;
			parameters[9].Value = model.PreferentialPrice;
			parameters[10].Value = model.BuyNumber;
			parameters[11].Value = model.BuyNumber1;
			parameters[12].Value = model.LearnNumber;
			parameters[13].Value = model.OnLineDateTime;
			parameters[14].Value = model.SaleState;
			parameters[15].Value = model.LearnState;
			parameters[16].Value = model.LearnDate;
			parameters[17].Value = model.CommentState;
			parameters[18].Value = model.Name;
            parameters[19].Value = model.Theme;
            parameters[20].Value = model.Start;
            parameters[21].Value = model.End;
            parameters[22].Value = model.CourseType;
            parameters[23].Value = model.IsFree;
            parameters[24].Value = model.IsBags;
            parameters[25].Value = model.MiniImgUrl;
            parameters[26].Value = model.MediaType;
            parameters[27].Value = model.ExercisesId;
            parameters[28].Value = model.Id;

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
			strSql.Append("delete from WX_Course ");
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
			strSql.Append("delete from WX_Course ");
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
		public SfSoft.Model.WX_Course GetModel(int Id)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 Id,ParentId,ProviderId,ImgUrl,Duration,Lecturer,Intro,Details,Reward,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,LearnNumber,OnLineDateTime,SaleState,LearnState,LearnDate,CommentState,Name,Theme,Start,[End],CourseType,IsFree,IsBags,MiniImgUrl,MediaType,ExercisesId from WX_Course ");
			strSql.Append(" where Id=@Id");
			SqlParameter[] parameters = {
					new SqlParameter("@Id", SqlDbType.Int,4)
			};
			parameters[0].Value = Id;

			SfSoft.Model.WX_Course model=new SfSoft.Model.WX_Course();
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
		public SfSoft.Model.WX_Course DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Course model=new SfSoft.Model.WX_Course();
			if (row != null)
			{
				if(row["Id"]!=null && row["Id"].ToString()!="")
				{
					model.Id=int.Parse(row["Id"].ToString());
				}
				if(row["ParentId"]!=null && row["ParentId"].ToString()!="")
				{
					model.ParentId=int.Parse(row["ParentId"].ToString());
				}
				if(row["ProviderId"]!=null && row["ProviderId"].ToString()!="")
				{
					model.ProviderId=int.Parse(row["ProviderId"].ToString());
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["Duration"]!=null && row["Duration"].ToString()!="")
				{
					model.Duration=decimal.Parse(row["Duration"].ToString());
				}
				if(row["Lecturer"]!=null)
				{
					model.Lecturer=row["Lecturer"].ToString();
				}
				if(row["Intro"]!=null)
				{
					model.Intro=row["Intro"].ToString();
				}
				if(row["Details"]!=null)
				{
					model.Details=row["Details"].ToString();
				}
				if(row["Reward"]!=null)
				{
					model.Reward=row["Reward"].ToString();
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
				if(row["LearnNumber"]!=null && row["LearnNumber"].ToString()!="")
				{
					model.LearnNumber=int.Parse(row["LearnNumber"].ToString());
				}
				if(row["OnLineDateTime"]!=null && row["OnLineDateTime"].ToString()!="")
				{
					model.OnLineDateTime=DateTime.Parse(row["OnLineDateTime"].ToString());
				}
				if(row["SaleState"]!=null && row["SaleState"].ToString()!="")
				{
					model.SaleState=int.Parse(row["SaleState"].ToString());
				}
				if(row["LearnState"]!=null && row["LearnState"].ToString()!="")
				{
					model.LearnState=int.Parse(row["LearnState"].ToString());
				}
				if(row["LearnDate"]!=null)
				{
					model.LearnDate=row["LearnDate"].ToString();
				}
				if(row["CommentState"]!=null && row["CommentState"].ToString()!="")
				{
					model.CommentState=int.Parse(row["CommentState"].ToString());
				}
				if(row["Name"]!=null)
				{
					model.Name=row["Name"].ToString();
				}
                if (row["Theme"] != null && row["Theme"].ToString() != "")
                {
                    model.Theme = int.Parse(row["Theme"].ToString());
                }
                if (row["Start"] != null && row["Start"].ToString() != "")
                {
                    model.Start = DateTime.Parse(row["Start"].ToString());
                }
                if (row["End"] != null && row["End"].ToString() != "")
                {
                    model.End = DateTime.Parse(row["End"].ToString());
                }
                if (row["CourseType"] != null && row["CourseType"].ToString() != "")
                {
                    model.CourseType = int.Parse(row["CourseType"].ToString());
                }
                if (row["IsFree"] != null && row["IsFree"].ToString() != "")
                {
                    model.IsFree = int.Parse(row["IsFree"].ToString());
                }
                if (row["IsBags"] != null && row["IsBags"].ToString() != "")
                {
                    model.IsBags = int.Parse(row["IsBags"].ToString());
                }
                if (row["MiniImgUrl"] != null)
                {
                    model.MiniImgUrl = row["MiniImgUrl"].ToString();
                }
                if (row["MediaType"] != null && row["MediaType"].ToString() != "")
                {
                    model.MediaType = int.Parse(row["MediaType"].ToString());
                }
                if (row["ExercisesId"] != null)
                {
                    model.ExercisesId = row["ExercisesId"].ToString();
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
            strSql.Append("select Id,ParentId,ProviderId,ImgUrl,Duration,Lecturer,Intro,Details,Reward,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,LearnNumber,OnLineDateTime,SaleState,LearnState,LearnDate,CommentState,Name,Theme,Start,[End],CourseType,IsFree,IsBags,MiniImgUrl,MediaType,ExercisesId ");
			strSql.Append(" FROM WX_Course ");
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
            strSql.Append(" Id,ParentId,ProviderId,ImgUrl,Duration,Lecturer,Intro,Details,Reward,OriginalPrice,PreferentialPrice,BuyNumber,BuyNumber1,LearnNumber,OnLineDateTime,SaleState,LearnState,LearnDate,CommentState,Name,Theme,Start,[End],CourseType,IsFree,IsBags,MiniImgUrl,MediaType,ExercisesId ");
			strSql.Append(" FROM WX_Course ");
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
			strSql.Append("select count(1) FROM WX_Course ");
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
			strSql.Append(")AS Row, T.*  from WX_Course T ");
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
			parameters[0].Value = "WX_Course";
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

