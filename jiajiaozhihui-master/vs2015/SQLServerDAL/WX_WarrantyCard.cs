using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_WarrantyCard
	/// </summary>
	public partial class WX_WarrantyCard:IWX_WarrantyCard
	{
		public WX_WarrantyCard()
		{}
		#region  BasicMethod

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(string MachineCode)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_WarrantyCard");
			strSql.Append(" where MachineCode=@MachineCode ");
			SqlParameter[] parameters = {
					new SqlParameter("@MachineCode", SqlDbType.NVarChar,200)			};
			parameters[0].Value = MachineCode;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.WX_WarrantyCard model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_WarrantyCard(");
            strSql.Append("MachineCode,OpenId,UserName,Telephone,Province,City,Address,District,OrderDate,IsAct,CreateDate,Latitude,Longitude)");
			strSql.Append(" values (");
            strSql.Append("@MachineCode,@OpenId,@UserName,@Telephone,@Province,@City,@Address,@District,@OrderDate,@IsAct,@CreateDate,@Latitude,@Longitude)");
			SqlParameter[] parameters = {
					new SqlParameter("@MachineCode", SqlDbType.NVarChar,200),
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,20),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@District", SqlDbType.NVarChar,100),
					new SqlParameter("@OrderDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Latitude", SqlDbType.Decimal,10),
                    new SqlParameter("@Longitude", SqlDbType.Decimal,10)};
			parameters[0].Value = model.MachineCode;
			parameters[1].Value = model.OpenId;
			parameters[2].Value = model.UserName;
			parameters[3].Value = model.Telephone;
			parameters[4].Value = model.Province;
			parameters[5].Value = model.City;
			parameters[6].Value = model.Address;
			parameters[7].Value = model.District;
			parameters[8].Value = model.OrderDate;
			parameters[9].Value = model.IsAct;
            parameters[10].Value = model.CreateDate;
            parameters[11].Value = model.Latitude;
            parameters[12].Value = model.Longitude;
            
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
		public bool Update(SfSoft.Model.WX_WarrantyCard model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_WarrantyCard set ");
			strSql.Append("OpenId=@OpenId,");
			strSql.Append("UserName=@UserName,");
			strSql.Append("Telephone=@Telephone,");
			strSql.Append("Province=@Province,");
			strSql.Append("City=@City,");
			strSql.Append("Address=@Address,");
			strSql.Append("District=@District,");
			strSql.Append("OrderDate=@OrderDate,");
			strSql.Append("IsAct=@IsAct,");
			strSql.Append("CreateDate=@CreateDate,");
            strSql.Append("Latitude=@Latitude,");
            strSql.Append("Longitude=@Longitude");
			strSql.Append(" where MachineCode=@MachineCode ");
			SqlParameter[] parameters = {
					new SqlParameter("@OpenId", SqlDbType.NVarChar,100),
					new SqlParameter("@UserName", SqlDbType.NVarChar,50),
					new SqlParameter("@Telephone", SqlDbType.NVarChar,20),
					new SqlParameter("@Province", SqlDbType.NVarChar,20),
					new SqlParameter("@City", SqlDbType.NVarChar,20),
					new SqlParameter("@Address", SqlDbType.NVarChar,100),
					new SqlParameter("@District", SqlDbType.NVarChar,100),
					new SqlParameter("@OrderDate", SqlDbType.DateTime),
					new SqlParameter("@IsAct", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
                    new SqlParameter("@Latitude", SqlDbType.Decimal,10),
                    new SqlParameter("@Longitude", SqlDbType.Decimal,10),
					new SqlParameter("@MachineCode", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.OpenId;
			parameters[1].Value = model.UserName;
			parameters[2].Value = model.Telephone;
			parameters[3].Value = model.Province;
			parameters[4].Value = model.City;
			parameters[5].Value = model.Address;
			parameters[6].Value = model.District;
			parameters[7].Value = model.OrderDate;
			parameters[8].Value = model.IsAct;
			parameters[9].Value = model.CreateDate;
            parameters[10].Value = model.Latitude;
            parameters[11].Value = model.Longitude;
			parameters[12].Value = model.MachineCode;

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
		public bool Delete(string MachineCode)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_WarrantyCard ");
			strSql.Append(" where MachineCode=@MachineCode ");
			SqlParameter[] parameters = {
					new SqlParameter("@MachineCode", SqlDbType.NVarChar,200)			};
			parameters[0].Value = MachineCode;

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
		public bool DeleteList(string MachineCodelist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_WarrantyCard ");
			strSql.Append(" where MachineCode in ("+MachineCodelist + ")  ");
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
		public SfSoft.Model.WX_WarrantyCard GetModel(string MachineCode)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 MachineCode,OpenId,UserName,Telephone,Province,City,Address,District,OrderDate,IsAct,CreateDate,Latitude,Longitude from WX_WarrantyCard ");
			strSql.Append(" where MachineCode=@MachineCode ");
			SqlParameter[] parameters = {
					new SqlParameter("@MachineCode", SqlDbType.NVarChar,200)			};
			parameters[0].Value = MachineCode;

			SfSoft.Model.WX_WarrantyCard model=new SfSoft.Model.WX_WarrantyCard();
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
		public SfSoft.Model.WX_WarrantyCard DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_WarrantyCard model=new SfSoft.Model.WX_WarrantyCard();
			if (row != null)
			{
				if(row["MachineCode"]!=null)
				{
					model.MachineCode=row["MachineCode"].ToString();
				}
				if(row["OpenId"]!=null)
				{
					model.OpenId=row["OpenId"].ToString();
				}
				if(row["UserName"]!=null)
				{
					model.UserName=row["UserName"].ToString();
				}
				if(row["Telephone"]!=null)
				{
					model.Telephone=row["Telephone"].ToString();
				}
				if(row["Province"]!=null)
				{
					model.Province=row["Province"].ToString();
				}
				if(row["City"]!=null)
				{
					model.City=row["City"].ToString();
				}
				if(row["Address"]!=null)
				{
					model.Address=row["Address"].ToString();
				}
				if(row["District"]!=null)
				{
					model.District=row["District"].ToString();
				}
				if(row["OrderDate"]!=null && row["OrderDate"].ToString()!="")
				{
					model.OrderDate=DateTime.Parse(row["OrderDate"].ToString());
				}
				if(row["IsAct"]!=null && row["IsAct"].ToString()!="")
				{
					model.IsAct=int.Parse(row["IsAct"].ToString());
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
                if (row["Latitude"] != null && row["Latitude"].ToString() != "")
                {
                    model.Latitude =decimal.Parse(row["Latitude"].ToString());
                }
                if (row["Longitude"] != null && row["Longitude"].ToString() != "")
                {
                    model.Longitude = decimal.Parse(row["Longitude"].ToString());
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
            strSql.Append("select MachineCode,OpenId,UserName,Telephone,Province,City,Address,District,OrderDate,IsAct,CreateDate,Latitude,Longitude ");
			strSql.Append(" FROM WX_WarrantyCard ");
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
            strSql.Append(" MachineCode,OpenId,UserName,Telephone,Province,City,Address,District,OrderDate,IsAct,CreateDate,Latitude,Longitude ");
			strSql.Append(" FROM WX_WarrantyCard ");
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
			strSql.Append("select count(1) FROM WX_WarrantyCard ");
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
				strSql.Append("order by T.MachineCode desc");
			}
			strSql.Append(")AS Row, T.*  from WX_WarrantyCard T ");
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
			parameters[0].Value = "WX_WarrantyCard";
			parameters[1].Value = "MachineCode";
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

