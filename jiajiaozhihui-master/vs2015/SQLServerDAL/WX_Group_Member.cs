using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_Group_Member
	/// </summary>
	public partial class WX_Group_Member:IWX_Group_Member
	{
		public WX_Group_Member()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("GroupId", "WX_Group_Member"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string OpenId,int GroupId)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_Group_Member");
			strSql.Append(" where OpenId=@OpenId and GroupId=@GroupId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@GroupId", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = GroupId;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_Group_Member model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_Group_Member(");
			strSql.Append("OpenId,GroupId,PassWord,Kindred,NickName,Alias,HeadImgUrl,Tel,ChildYear,ChildMonth,ChildDay,ChildSex,Province,City,InviteOpenId,InviteMethod,JoinDate,FstUpload,CheckState,State,OnLineState,IsAlias,IsJoin)");
			strSql.Append(" values (");
            strSql.Append("@OpenId,@GroupId,@PassWord,@Kindred,@NickName,@Alias,@HeadImgUrl,@Tel,@ChildYear,@ChildMonth,@ChildDay,@ChildSex,@Province,@City,@InviteOpenId,@InviteMethod,@JoinDate,@FstUpload,@CheckState,@State,@OnLineState,@IsAlias,@IsJoin)");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@GroupId", SqlDbType.Int,4),
					new SqlParameter("@PassWord", SqlDbType.NVarChar,50),
					new SqlParameter("@Kindred", SqlDbType.NVarChar,50),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Alias", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@Tel", SqlDbType.NVarChar,50),
					new SqlParameter("@ChildYear", SqlDbType.Int,4),
					new SqlParameter("@ChildMonth", SqlDbType.Int,4),
					new SqlParameter("@ChildDay", SqlDbType.Int,4),
					new SqlParameter("@ChildSex", SqlDbType.NVarChar,20),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@InviteOpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@InviteMethod", SqlDbType.Int,4),
					new SqlParameter("@JoinDate", SqlDbType.DateTime),
					new SqlParameter("@FstUpload", SqlDbType.DateTime),
					new SqlParameter("@CheckState", SqlDbType.Int,4),
					new SqlParameter("@State", SqlDbType.Int,4),
					new SqlParameter("@OnLineState", SqlDbType.Int,4),
					new SqlParameter("@IsAlias", SqlDbType.Int,4),
                    new SqlParameter("@IsJoin", SqlDbType.Int,4)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.GroupId;
			parameters[2].Value = model.PassWord;
			parameters[3].Value = model.Kindred;
			parameters[4].Value = model.NickName;
			parameters[5].Value = model.Alias;
			parameters[6].Value = model.HeadImgUrl;
			parameters[7].Value = model.Tel;
			parameters[8].Value = model.ChildYear;
			parameters[9].Value = model.ChildMonth;
			parameters[10].Value = model.ChildDay;
			parameters[11].Value = model.ChildSex;
			parameters[12].Value = model.Province;
			parameters[13].Value = model.City;
			parameters[14].Value = model.InviteOpenId;
			parameters[15].Value = model.InviteMethod;
			parameters[16].Value = model.JoinDate;
			parameters[17].Value = model.FstUpload;
			parameters[18].Value = model.CheckState;
			parameters[19].Value = model.State;
			parameters[20].Value = model.OnLineState;
			parameters[21].Value = model.IsAlias;
            parameters[22].Value = model.IsJoin;

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
		public bool Update(SfSoft.Model.WX_Group_Member model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_Group_Member set ");
			strSql.Append("PassWord=@PassWord,");
			strSql.Append("Kindred=@Kindred,");
			strSql.Append("NickName=@NickName,");
			strSql.Append("Alias=@Alias,");
			strSql.Append("HeadImgUrl=@HeadImgUrl,");
			strSql.Append("Tel=@Tel,");
			strSql.Append("ChildYear=@ChildYear,");
			strSql.Append("ChildMonth=@ChildMonth,");
			strSql.Append("ChildDay=@ChildDay,");
			strSql.Append("ChildSex=@ChildSex,");
			strSql.Append("Province=@Province,");
			strSql.Append("City=@City,");
			strSql.Append("InviteOpenId=@InviteOpenId,");
			strSql.Append("InviteMethod=@InviteMethod,");
			strSql.Append("JoinDate=@JoinDate,");
			strSql.Append("FstUpload=@FstUpload,");
			strSql.Append("CheckState=@CheckState,");
			strSql.Append("State=@State,");
			strSql.Append("OnLineState=@OnLineState,");
			strSql.Append("IsAlias=@IsAlias,");
            strSql.Append("IsJoin=@IsJoin");
			strSql.Append(" where OpenId=@OpenId and GroupId=@GroupId ");
			SqlParameter[] parameters = {
					new SqlParameter("@PassWord", SqlDbType.NVarChar,50),
					new SqlParameter("@Kindred", SqlDbType.NVarChar,50),
					new SqlParameter("@NickName", SqlDbType.NVarChar,50),
					new SqlParameter("@Alias", SqlDbType.NVarChar,50),
					new SqlParameter("@HeadImgUrl", SqlDbType.NVarChar,300),
					new SqlParameter("@Tel", SqlDbType.NVarChar,50),
					new SqlParameter("@ChildYear", SqlDbType.Int,4),
					new SqlParameter("@ChildMonth", SqlDbType.Int,4),
					new SqlParameter("@ChildDay", SqlDbType.Int,4),
					new SqlParameter("@ChildSex", SqlDbType.NVarChar,20),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@InviteOpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@InviteMethod", SqlDbType.Int,4),
					new SqlParameter("@JoinDate", SqlDbType.DateTime),
					new SqlParameter("@FstUpload", SqlDbType.DateTime),
					new SqlParameter("@CheckState", SqlDbType.Int,4),
					new SqlParameter("@State", SqlDbType.Int,4),
					new SqlParameter("@OnLineState", SqlDbType.Int,4),
					new SqlParameter("@IsAlias", SqlDbType.Int,4),
                    new SqlParameter("@IsJoin", SqlDbType.Int,4),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@GroupId", SqlDbType.Int,4)};
			parameters[0].Value = model.PassWord;
			parameters[1].Value = model.Kindred;
			parameters[2].Value = model.NickName;
			parameters[3].Value = model.Alias;
			parameters[4].Value = model.HeadImgUrl;
			parameters[5].Value = model.Tel;
			parameters[6].Value = model.ChildYear;
			parameters[7].Value = model.ChildMonth;
			parameters[8].Value = model.ChildDay;
			parameters[9].Value = model.ChildSex;
			parameters[10].Value = model.Province;
			parameters[11].Value = model.City;
			parameters[12].Value = model.InviteOpenId;
			parameters[13].Value = model.InviteMethod;
			parameters[14].Value = model.JoinDate;
			parameters[15].Value = model.FstUpload;
			parameters[16].Value = model.CheckState;
			parameters[17].Value = model.State;
			parameters[18].Value = model.OnLineState;
			parameters[19].Value = model.IsAlias;
            parameters[20].Value = model.IsJoin;
			parameters[21].Value = model.OpenId;
			parameters[22].Value = model.GroupId;

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
		public bool Delete(string OpenId,int GroupId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_Group_Member ");
			strSql.Append(" where OpenId=@OpenId and GroupId=@GroupId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@GroupId", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = GroupId;

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
		public SfSoft.Model.WX_Group_Member GetModel(string OpenId,int GroupId)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 OpenId,GroupId,PassWord,Kindred,NickName,Alias,HeadImgUrl,Tel,ChildYear,ChildMonth,ChildDay,ChildSex,Province,City,InviteOpenId,InviteMethod,JoinDate,FstUpload,CheckState,State,OnLineState,IsAlias,IsJoin from WX_Group_Member ");
			strSql.Append(" where OpenId=@OpenId and GroupId=@GroupId ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,150),
					new SqlParameter("@GroupId", SqlDbType.Int,4)			};
			parameters[0].Value = OpenId;
			parameters[1].Value = GroupId;

			SfSoft.Model.WX_Group_Member model=new SfSoft.Model.WX_Group_Member();
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
		public SfSoft.Model.WX_Group_Member DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_Group_Member model=new SfSoft.Model.WX_Group_Member();
			if (row != null)
			{
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["GroupId"]!=null && row["GroupId"].ToString()!="")
				{
					model.GroupId=int.Parse(row["GroupId"].ToString());
				}
				if(row["PassWord"]!=null)
				{
					model.PassWord=row["PassWord"].ToString();
				}
				if(row["Kindred"]!=null)
				{
					model.Kindred=row["Kindred"].ToString();
				}
				if(row["NickName"]!=null)
				{
					model.NickName=row["NickName"].ToString();
				}
				if(row["Alias"]!=null)
				{
					model.Alias=row["Alias"].ToString();
				}
				if(row["HeadImgUrl"]!=null)
				{
					model.HeadImgUrl=row["HeadImgUrl"].ToString();
				}
				if(row["Tel"]!=null)
				{
					model.Tel=row["Tel"].ToString();
				}
				if(row["ChildYear"]!=null && row["ChildYear"].ToString()!="")
				{
					model.ChildYear=int.Parse(row["ChildYear"].ToString());
				}
				if(row["ChildMonth"]!=null && row["ChildMonth"].ToString()!="")
				{
					model.ChildMonth=int.Parse(row["ChildMonth"].ToString());
				}
				if(row["ChildDay"]!=null && row["ChildDay"].ToString()!="")
				{
					model.ChildDay=int.Parse(row["ChildDay"].ToString());
				}
				if(row["ChildSex"]!=null)
				{
					model.ChildSex=row["ChildSex"].ToString();
				}
				if(row["Province"]!=null)
				{
					model.Province=row["Province"].ToString();
				}
				if(row["City"]!=null)
				{
					model.City=row["City"].ToString();
				}
				if(row["InviteOpenId"]!=null)
				{
					model.InviteOpenId=row["InviteOpenId"].ToString();
				}
				if(row["InviteMethod"]!=null && row["InviteMethod"].ToString()!="")
				{
					model.InviteMethod=int.Parse(row["InviteMethod"].ToString());
				}
				if(row["JoinDate"]!=null && row["JoinDate"].ToString()!="")
				{
					model.JoinDate=DateTime.Parse(row["JoinDate"].ToString());
				}
				if(row["FstUpload"]!=null && row["FstUpload"].ToString()!="")
				{
					model.FstUpload=DateTime.Parse(row["FstUpload"].ToString());
				}
				if(row["CheckState"]!=null && row["CheckState"].ToString()!="")
				{
					model.CheckState=int.Parse(row["CheckState"].ToString());
				}
				if(row["State"]!=null && row["State"].ToString()!="")
				{
					model.State=int.Parse(row["State"].ToString());
				}
				if(row["OnLineState"]!=null && row["OnLineState"].ToString()!="")
				{
					model.OnLineState=int.Parse(row["OnLineState"].ToString());
				}
				if(row["IsAlias"]!=null && row["IsAlias"].ToString()!="")
				{
					model.IsAlias=int.Parse(row["IsAlias"].ToString());
				}
                if (row["IsJoin"] != null && row["IsJoin"].ToString() != "")
                {
                    model.IsJoin = int.Parse(row["IsJoin"].ToString());
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
            strSql.Append("select OpenId,GroupId,PassWord,Kindred,NickName,Alias,HeadImgUrl,Tel,ChildYear,ChildMonth,ChildDay,ChildSex,Province,City,InviteOpenId,InviteMethod,JoinDate,FstUpload,CheckState,State,OnLineState,IsAlias,IsJoin ");
			strSql.Append(" FROM WX_Group_Member ");
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
            strSql.Append(" OpenId,GroupId,PassWord,Kindred,NickName,Alias,HeadImgUrl,Tel,ChildYear,ChildMonth,ChildDay,ChildSex,Province,City,InviteOpenId,InviteMethod,JoinDate,FstUpload,CheckState,State,OnLineState,IsAlias,IsJoin ");
			strSql.Append(" FROM WX_Group_Member ");
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
			strSql.Append("select count(1) FROM WX_Group_Member ");
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
				strSql.Append("order by T.GroupId desc");
			}
			strSql.Append(")AS Row, T.*  from WX_Group_Member T ");
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
			parameters[0].Value = "WX_Group_Member";
			parameters[1].Value = "GroupId";
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

