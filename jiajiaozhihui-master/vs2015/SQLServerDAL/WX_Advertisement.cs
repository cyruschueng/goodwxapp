using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Advertisement
	/// </summary>
	public partial class WX_Advertisement:IWX_Advertisement
	{
		public WX_Advertisement()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_Advertisement"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Advertisement");
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
		public int Add(SfSoft.Model.WX_Advertisement model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Advertisement(");
            strSql.Append("Name,TextContent,ImgUrl,MediaUrl,Positions,Own,CreateDate,Resume,IsAct,OuterLink,ShareTitle,ShareDesc)");
			strSql.Append(" values (");
            strSql.Append("@Name,@TextContent,@ImgUrl,@MediaUrl,@Positions,@Own,@CreateDate,@Resume,@IsAct,@OuterLink,@ShareTitle,@ShareDesc)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
					new SqlParameter("@TextContent", SqlDbType.Text),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@MediaUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@Positions", SqlDbType.NVarChar,100),
					new SqlParameter("@Own", SqlDbType.NVarChar,300),
                    new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Resume", SqlDbType.NVarChar,2000),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@OuterLink", SqlDbType.NVarChar,300),
                    new SqlParameter("@ShareTitle", SqlDbType.NVarChar,150),
                    new SqlParameter("@ShareDesc", SqlDbType.NVarChar,300)};
			parameters[0].Value = model.Name;
			parameters[1].Value = model.TextContent;
			parameters[2].Value = model.ImgUrl;
			parameters[3].Value = model.MediaUrl;
			parameters[4].Value = model.Positions;
			parameters[5].Value = model.Own;
            parameters[6].Value = model.CreateDate;
            parameters[7].Value = model.Resume;
            parameters[8].Value = model.IsAct;
            parameters[9].Value = model.OuterLink;
            parameters[10].Value = model.ShareTitle;
            parameters[11].Value = model.ShareDesc;

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
		public bool Update(SfSoft.Model.WX_Advertisement model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Advertisement set ");
			strSql.Append("Name=@Name,");
			strSql.Append("TextContent=@TextContent,");
			strSql.Append("ImgUrl=@ImgUrl,");
			strSql.Append("MediaUrl=@MediaUrl,");
			strSql.Append("Positions=@Positions,");
			strSql.Append("Own=@Own,");
            strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("Resume=@Resume,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("OuterLink=@OuterLink,");
            strSql.Append("ShareTitle=@ShareTitle,");
            strSql.Append("ShareDesc=@ShareDesc");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@Name", SqlDbType.NVarChar,100),
					new SqlParameter("@TextContent", SqlDbType.Text),
					new SqlParameter("@ImgUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@MediaUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@Positions", SqlDbType.NVarChar,100),
					new SqlParameter("@Own", SqlDbType.NVarChar,300),
                    new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Resume", SqlDbType.NVarChar,2000),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@OuterLink", SqlDbType.NVarChar,300),
                    new SqlParameter("@ShareTitle", SqlDbType.NVarChar,150),
                    new SqlParameter("@ShareDesc", SqlDbType.NVarChar,300),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.Name;
			parameters[1].Value = model.TextContent;
			parameters[2].Value = model.ImgUrl;
			parameters[3].Value = model.MediaUrl;
			parameters[4].Value = model.Positions;
			parameters[5].Value = model.Own;
            parameters[6].Value = model.CreateDate;
            parameters[7].Value = model.Resume;
            parameters[8].Value = model.IsAct;
            parameters[9].Value = model.OuterLink;
            parameters[10].Value = model.ShareTitle;
            parameters[11].Value = model.ShareDesc;
			parameters[12].Value = model.ID;

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
			strSql.Append("delete from WX_Advertisement ");
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
			strSql.Append("delete from WX_Advertisement ");
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
		public SfSoft.Model.WX_Advertisement GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,Name,TextContent,ImgUrl,MediaUrl,Positions,Own,CreateDate,Resume,IsAct,OuterLink,ShareTitle,ShareDesc from WX_Advertisement ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_Advertisement model=new SfSoft.Model.WX_Advertisement();
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
		public SfSoft.Model.WX_Advertisement DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Advertisement model=new SfSoft.Model.WX_Advertisement();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["Name"]!=null)
				{
					model.Name=row["Name"].ToString();
				}
				if(row["TextContent"]!=null)
				{
					model.TextContent=row["TextContent"].ToString();
				}
				if(row["ImgUrl"]!=null)
				{
					model.ImgUrl=row["ImgUrl"].ToString();
				}
				if(row["MediaUrl"]!=null)
				{
					model.MediaUrl=row["MediaUrl"].ToString();
				}
				if(row["Positions"]!=null)
				{
					model.Positions=row["Positions"].ToString();
				}
				if(row["Own"]!=null)
				{
					model.Own=row["Own"].ToString();
				}
                if (row["CreateDate"] != null && row["CreateDate"].ToString() != "")
                {
                    model.CreateDate = DateTime.Parse(row["CreateDate"].ToString());
                }
                if (row["Resume"] != null)
                {
                    model.Resume = row["Resume"].ToString();
                }
                if (row["IsAct"] != null && row["IsAct"].ToString() != "")
                {
                    model.IsAct = int.Parse(row["IsAct"].ToString());
                }
                if (row["OuterLink"] != null)
                {
                    model.OuterLink = row["OuterLink"].ToString();
                }
                if (row["ShareTitle"] != null)
                {
                    model.ShareTitle = row["ShareTitle"].ToString();
                }
                if (row["ShareDesc"] != null)
                {
                    model.ShareDesc = row["ShareDesc"].ToString();
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
            strSql.Append("select ID,Name,TextContent,ImgUrl,MediaUrl,Positions,Own,CreateDate,Resume,IsAct,OuterLink,ShareTitle,ShareDesc ");
			strSql.Append(" FROM WX_Advertisement ");
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
            strSql.Append(" ID,Name,TextContent,ImgUrl,MediaUrl,Positions,Own,CreateDate,Resume,IsAct,OuterLink,ShareTitle,ShareDesc ");
			strSql.Append(" FROM WX_Advertisement ");
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
			strSql.Append("select count(1) FROM WX_Advertisement ");
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
			strSql.Append(")AS Row, T.*  from WX_Advertisement T ");
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
			parameters[0].Value = "WX_Advertisement";
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

