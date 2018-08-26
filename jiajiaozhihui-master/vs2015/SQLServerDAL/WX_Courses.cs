using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Courses
	/// </summary>
	public partial class WX_Courses:IWX_Courses
	{
		public WX_Courses()
		{}
		#region  BasicMethod



		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_Courses model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Courses(");
            strSql.Append("Topic,SendStatus,Area,ArtType,ArtContent,PubDate,Creator,Enrollment,TwoDimension,modifier,mtime,IsShow,ClickNum,InfoDesc,ValidityDate,CourseUrl,IsAct,IsTele,ImgUrl,EndDate)");
			strSql.Append(" values (");
            strSql.Append("@Topic,@SendStatus,@Area,@ArtType,@ArtContent,@PubDate,@Creator,@Enrollment,@TwoDimension,@modifier,@mtime,@IsShow,@ClickNum,@InfoDesc,@ValidityDate,@CourseUrl,@IsAct,@IsTele,@ImgUrl,@EndDate)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Topic", SqlDbType.NVarChar,200),
					new SqlParameter("@SendStatus", SqlDbType.Int,4),
					new SqlParameter("@Area", SqlDbType.Int,4),
					new SqlParameter("@ArtType", SqlDbType.Int,4),
					new SqlParameter("@ArtContent", SqlDbType.NText),
					new SqlParameter("@PubDate", SqlDbType.DateTime),
					new SqlParameter("@Creator", SqlDbType.NVarChar,20),
					new SqlParameter("@Enrollment", SqlDbType.Int,4),
					new SqlParameter("@TwoDimension", SqlDbType.NVarChar,300),
					new SqlParameter("@modifier", SqlDbType.NVarChar,20),
					new SqlParameter("@mtime", SqlDbType.DateTime),
					new SqlParameter("@IsShow", SqlDbType.Int,4),
					new SqlParameter("@ClickNum", SqlDbType.Int,4),
                    new SqlParameter("@InfoDesc", SqlDbType.NVarChar,4000),
                    new SqlParameter("@ValidityDate", SqlDbType.DateTime),
                    new SqlParameter("@CourseUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@IsTele", SqlDbType.Int,4),
                    new SqlParameter("@ImgUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@EndDate", SqlDbType.DateTime)};
			parameters[0].Value = model.Topic;
			parameters[1].Value = model.SendStatus;
			parameters[2].Value = model.Area;
			parameters[3].Value = model.ArtType;
			parameters[4].Value = model.ArtContent;
			parameters[5].Value = model.PubDate;
			parameters[6].Value = model.Creator;
			parameters[7].Value = model.Enrollment;
			parameters[8].Value = model.TwoDimension;
			parameters[9].Value = model.modifier;
			parameters[10].Value = model.mtime;
			parameters[11].Value = model.IsShow;
			parameters[12].Value = model.ClickNum;
            parameters[13].Value = model.InfoDesc;
            parameters[14].Value = model.ValidityDate;
            parameters[15].Value = model.CourseUrl;
            parameters[16].Value = model.IsAct;
            parameters[17].Value = model.IsTele;
            parameters[18].Value = model.ImgUrl;
            parameters[19].Value = model.EndDate;

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
		public bool Update(SfSoft.Model.WX_Courses model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Courses set ");
			strSql.Append("Topic=@Topic,");
			strSql.Append("SendStatus=@SendStatus,");
			strSql.Append("Area=@Area,");
			strSql.Append("ArtType=@ArtType,");
			strSql.Append("ArtContent=@ArtContent,");
			strSql.Append("PubDate=@PubDate,");
			strSql.Append("Creator=@Creator,");
			strSql.Append("Enrollment=@Enrollment,");
			strSql.Append("TwoDimension=@TwoDimension,");
			strSql.Append("modifier=@modifier,");
			strSql.Append("mtime=@mtime,");
			strSql.Append("IsShow=@IsShow,");
			strSql.Append("ClickNum=@ClickNum,");
            strSql.Append("InfoDesc=@InfoDesc,");
            strSql.Append("ValidityDate=@ValidityDate,");
            strSql.Append("CourseUrl=@CourseUrl,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("IsTele=@IsTele,");
            strSql.Append("ImgUrl=@ImgUrl,");
            strSql.Append("EndDate=@EndDate");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@Topic", SqlDbType.NVarChar,200),
					new SqlParameter("@SendStatus", SqlDbType.Int,4),
					new SqlParameter("@Area", SqlDbType.Int,4),
					new SqlParameter("@ArtType", SqlDbType.Int,4),
					new SqlParameter("@ArtContent", SqlDbType.NText),
					new SqlParameter("@PubDate", SqlDbType.DateTime),
					new SqlParameter("@Creator", SqlDbType.NVarChar,20),
					new SqlParameter("@Enrollment", SqlDbType.Int,4),
					new SqlParameter("@TwoDimension", SqlDbType.NVarChar,300),
					new SqlParameter("@modifier", SqlDbType.NVarChar,20),
					new SqlParameter("@mtime", SqlDbType.DateTime),
					new SqlParameter("@IsShow", SqlDbType.Int,4),
					new SqlParameter("@ClickNum", SqlDbType.Int,4),
                    new SqlParameter("@InfoDesc", SqlDbType.NVarChar,4000),
                    new SqlParameter("@ValidityDate", SqlDbType.DateTime),
                    new SqlParameter("@CourseUrl", SqlDbType.NVarChar,200),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@IsTele", SqlDbType.Int,4),
                    new SqlParameter("@ImgUrl", SqlDbType.NVarChar,300),
                    new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.Topic;
			parameters[1].Value = model.SendStatus;
			parameters[2].Value = model.Area;
			parameters[3].Value = model.ArtType;
			parameters[4].Value = model.ArtContent;
			parameters[5].Value = model.PubDate;
			parameters[6].Value = model.Creator;
			parameters[7].Value = model.Enrollment;
			parameters[8].Value = model.TwoDimension;
			parameters[9].Value = model.modifier;
			parameters[10].Value = model.mtime;
			parameters[11].Value = model.IsShow;
			parameters[12].Value = model.ClickNum;
            parameters[13].Value = model.InfoDesc;
            parameters[14].Value = model.ValidityDate;
            parameters[15].Value = model.CourseUrl;
            parameters[16].Value = model.IsAct;
            parameters[17].Value = model.IsTele;
            parameters[18].Value = model.ImgUrl;
            parameters[19].Value = model.EndDate;
			parameters[20].Value = model.ID;

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
			strSql.Append("delete from WX_Courses ");
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
			strSql.Append("delete from WX_Courses ");
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
		public SfSoft.Model.WX_Courses GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,Topic,SendStatus,Area,ArtType,ArtContent,PubDate,Creator,Enrollment,TwoDimension,modifier,mtime,IsShow,ClickNum,InfoDesc,ValidityDate,CourseUrl,IsAct,IsTele,ImgUrl,EndDate from WX_Courses ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Courses model=new SfSoft.Model.WX_Courses();
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
		public SfSoft.Model.WX_Courses DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Courses model=new SfSoft.Model.WX_Courses();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["Topic"]!=null)
				{
					model.Topic=row["Topic"].ToString();
				}
				if(row["SendStatus"]!=null && row["SendStatus"].ToString()!="")
				{
					model.SendStatus=int.Parse(row["SendStatus"].ToString());
				}
				if(row["Area"]!=null && row["Area"].ToString()!="")
				{
					model.Area=int.Parse(row["Area"].ToString());
				}
				if(row["ArtType"]!=null && row["ArtType"].ToString()!="")
				{
					model.ArtType=int.Parse(row["ArtType"].ToString());
				}
				if(row["ArtContent"]!=null)
				{
					model.ArtContent=row["ArtContent"].ToString();
				}
				if(row["PubDate"]!=null && row["PubDate"].ToString()!="")
				{
					model.PubDate=DateTime.Parse(row["PubDate"].ToString());
				}
				if(row["Creator"]!=null)
				{
					model.Creator=row["Creator"].ToString();
				}
				if(row["Enrollment"]!=null && row["Enrollment"].ToString()!="")
				{
					model.Enrollment=int.Parse(row["Enrollment"].ToString());
				}
				if(row["TwoDimension"]!=null)
				{
					model.TwoDimension=row["TwoDimension"].ToString();
				}
				if(row["modifier"]!=null)
				{
					model.modifier=row["modifier"].ToString();
				}
				if(row["mtime"]!=null && row["mtime"].ToString()!="")
				{
					model.mtime=DateTime.Parse(row["mtime"].ToString());
				}
				if(row["IsShow"]!=null && row["IsShow"].ToString()!="")
				{
					model.IsShow=int.Parse(row["IsShow"].ToString());
				}
				if(row["ClickNum"]!=null && row["ClickNum"].ToString()!="")
				{
					model.ClickNum=int.Parse(row["ClickNum"].ToString());
				}

                if(row["InfoDesc"]!=null)
				{
					model.InfoDesc=row["InfoDesc"].ToString();
				}
                if (row["ValidityDate"] != null && row["ValidityDate"].ToString() != "")
                {
                    model.ValidityDate = DateTime.Parse(row["ValidityDate"].ToString());
                }
                if (row["CourseUrl"] != null)
                {
                    model.CourseUrl = row["CourseUrl"].ToString();
                }
                if (row["IsAct"] != null && row["IsAct"].ToString() != "")
                {
                    model.IsAct = int.Parse(row["IsAct"].ToString());
                }
                if (row["IsTele"] != null && row["IsTele"].ToString() != "")
                {
                    model.IsTele = int.Parse(row["IsTele"].ToString());
                }
                if (row["ImgUrl"] != null )
                {
                    model.ImgUrl =row["ImgUrl"].ToString();
                }
                if (row["EndDate"] != null && row["EndDate"].ToString() != "")
                {
                    model.EndDate =  DateTime.Parse(row["EndDate"].ToString());
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
            strSql.Append("select ID,Topic,SendStatus,Area,ArtType,ArtContent,PubDate,Creator,Enrollment,TwoDimension,modifier,mtime,IsShow,ClickNum,InfoDesc,ValidityDate,CourseUrl,IsAct,IsTele,ImgUrl,EndDate ");
			strSql.Append(" FROM WX_Courses ");
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
            strSql.Append(" ID,Topic,SendStatus,Area,ArtType,ArtContent,PubDate,Creator,Enrollment,TwoDimension,modifier,mtime,IsShow,ClickNum,InfoDesc,ValidityDate,CourseUrl,IsAct,IsTele,ImgUrl,EndDate ");
			strSql.Append(" FROM WX_Courses ");
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
			strSql.Append("select count(1) FROM WX_Courses ");
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
			strSql.Append(")AS Row, T.*  from WX_Courses T ");
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
			parameters[0].Value = "WX_Courses";
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

