using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:Emc_Msg_Interface
	/// </summary>
	public partial class Emc_Msg_Interface:IEmc_Msg_Interface
	{
		public Emc_Msg_Interface()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Emc_Msg_Interface"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Emc_Msg_Interface");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)			};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public bool Add(SfSoft.Model.Emc_Msg_Interface model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into Emc_Msg_Interface(");
			strSql.Append("sendurl,parmlname,parmpwd,parmtel,parmcontent,parmcId,backstatus,resulmark,lname,cId,pwd,remark,balanceurl,bremark,editurl,eremark,isdefault,msglength,maxcount,islist)");
			strSql.Append(" values (");
			strSql.Append("@sendurl,@parmlname,@parmpwd,@parmtel,@parmcontent,@parmcId,@backstatus,@resulmark,@lname,@cId,@pwd,@remark,@balanceurl,@bremark,@editurl,@eremark,@isdefault,@msglength,@maxcount,@islist)");
			SqlParameter[] parameters = {
					new SqlParameter("@sendurl", SqlDbType.NVarChar,200),
					new SqlParameter("@parmlname", SqlDbType.NVarChar,100),
					new SqlParameter("@parmpwd", SqlDbType.NVarChar,20),
					new SqlParameter("@parmtel", SqlDbType.NVarChar,20),
					new SqlParameter("@parmcontent", SqlDbType.NVarChar,20),
					new SqlParameter("@parmcId", SqlDbType.NVarChar,10),
					new SqlParameter("@backstatus", SqlDbType.NVarChar,100),
					new SqlParameter("@resulmark", SqlDbType.NVarChar,500),
					new SqlParameter("@lname", SqlDbType.NVarChar,20),
					new SqlParameter("@cId", SqlDbType.NVarChar,20),
					new SqlParameter("@pwd", SqlDbType.NVarChar,100),
					new SqlParameter("@remark", SqlDbType.NVarChar,20),
					new SqlParameter("@balanceurl", SqlDbType.NVarChar,200),
					new SqlParameter("@bremark", SqlDbType.NVarChar,500),
					new SqlParameter("@editurl", SqlDbType.NVarChar,200),
					new SqlParameter("@eremark", SqlDbType.NVarChar,500),
					new SqlParameter("@isdefault", SqlDbType.Int,4),
					new SqlParameter("@msglength", SqlDbType.Int,4),
					new SqlParameter("@maxcount", SqlDbType.Int,4),
					new SqlParameter("@islist", SqlDbType.Int,4)};
			parameters[0].Value = model.sendurl;
			parameters[1].Value = model.parmlname;
			parameters[2].Value = model.parmpwd;
			parameters[3].Value = model.parmtel;
			parameters[4].Value = model.parmcontent;
			parameters[5].Value = model.parmcId;
			parameters[6].Value = model.backstatus;
			parameters[7].Value = model.resulmark;
			parameters[8].Value = model.lname;
			parameters[9].Value = model.cId;
			parameters[10].Value = model.pwd;
			parameters[11].Value = model.remark;
			parameters[12].Value = model.balanceurl;
			parameters[13].Value = model.bremark;
			parameters[14].Value = model.editurl;
			parameters[15].Value = model.eremark;
			parameters[16].Value = model.isdefault;
			parameters[17].Value = model.msglength;
            parameters[18].Value = model.maxcount;
            parameters[19].Value = model.IsList;

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
		public bool Update(SfSoft.Model.Emc_Msg_Interface model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update Emc_Msg_Interface set ");
			strSql.Append("sendurl=@sendurl,");
			strSql.Append("parmlname=@parmlname,");
			strSql.Append("parmpwd=@parmpwd,");
			strSql.Append("parmtel=@parmtel,");
			strSql.Append("parmcontent=@parmcontent,");
			strSql.Append("parmcId=@parmcId,");
			strSql.Append("backstatus=@backstatus,");
			strSql.Append("resulmark=@resulmark,");
			strSql.Append("lname=@lname,");
			strSql.Append("cId=@cId,");
			strSql.Append("pwd=@pwd,");
			strSql.Append("remark=@remark,");
			strSql.Append("balanceurl=@balanceurl,");
			strSql.Append("bremark=@bremark,");
			strSql.Append("editurl=@editurl,");
			strSql.Append("eremark=@eremark,");
			strSql.Append("isdefault=@isdefault,");
			strSql.Append("msglength=@msglength,");
            strSql.Append("maxcount=@maxcount,");
            strSql.Append("islist=@islist");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@sendurl", SqlDbType.NVarChar,200),
					new SqlParameter("@parmlname", SqlDbType.NVarChar,100),
					new SqlParameter("@parmpwd", SqlDbType.NVarChar,20),
					new SqlParameter("@parmtel", SqlDbType.NVarChar,20),
					new SqlParameter("@parmcontent", SqlDbType.NVarChar,20),
					new SqlParameter("@parmcId", SqlDbType.NVarChar,10),
					new SqlParameter("@backstatus", SqlDbType.NVarChar,100),
					new SqlParameter("@resulmark", SqlDbType.NVarChar,500),
					new SqlParameter("@lname", SqlDbType.NVarChar,20),
					new SqlParameter("@cId", SqlDbType.NVarChar,20),
					new SqlParameter("@pwd", SqlDbType.NVarChar,100),
					new SqlParameter("@remark", SqlDbType.NVarChar,20),
					new SqlParameter("@balanceurl", SqlDbType.NVarChar,200),
					new SqlParameter("@bremark", SqlDbType.NVarChar,500),
					new SqlParameter("@editurl", SqlDbType.NVarChar,200),
					new SqlParameter("@eremark", SqlDbType.NVarChar,500),
					new SqlParameter("@isdefault", SqlDbType.Int,4),
					new SqlParameter("@msglength", SqlDbType.Int,4),
					new SqlParameter("@maxcount", SqlDbType.Int,4),
					new SqlParameter("@islist", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.sendurl;
			parameters[1].Value = model.parmlname;
			parameters[2].Value = model.parmpwd;
			parameters[3].Value = model.parmtel;
			parameters[4].Value = model.parmcontent;
			parameters[5].Value = model.parmcId;
			parameters[6].Value = model.backstatus;
			parameters[7].Value = model.resulmark;
			parameters[8].Value = model.lname;
			parameters[9].Value = model.cId;
			parameters[10].Value = model.pwd;
			parameters[11].Value = model.remark;
			parameters[12].Value = model.balanceurl;
			parameters[13].Value = model.bremark;
			parameters[14].Value = model.editurl;
			parameters[15].Value = model.eremark;
			parameters[16].Value = model.isdefault;
			parameters[17].Value = model.msglength;
            parameters[18].Value = model.maxcount;
            parameters[19].Value = model.IsList;
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
			strSql.Append("delete from Emc_Msg_Interface ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)			};
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
        /// 修改一条数据
        /// </summary>
        public bool updatestatus(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("update  Emc_Msg_Interface set isdefault=4 ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)			};
            parameters[0].Value = ID;

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


		/// <summary>
		/// 批量删除数据
		/// </summary>
		public bool DeleteList(string IDlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from Emc_Msg_Interface ");
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
		public SfSoft.Model.Emc_Msg_Interface GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select  top 1 ID,sendurl,parmlname,parmpwd,parmtel,parmcontent,parmcId,backstatus,resulmark,lname,cId,pwd,remark,balanceurl,bremark,editurl,eremark,isdefault,msglength,maxcount,islist from Emc_Msg_Interface ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)			};
			parameters[0].Value = ID;

			SfSoft.Model.Emc_Msg_Interface model=new SfSoft.Model.Emc_Msg_Interface();
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
		public SfSoft.Model.Emc_Msg_Interface DataRowToModel(DataRow row)
		{
			SfSoft.Model.Emc_Msg_Interface model=new SfSoft.Model.Emc_Msg_Interface();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
                if (row["islist"] != null && row["islist"].ToString() != "")
                {
                    model.IsList = int.Parse(row["islist"].ToString());
                }
				if(row["sendurl"]!=null && row["sendurl"].ToString()!="")
				{
                    model.sendurl = row["sendurl"].ToString();
				}
				if(row["parmlname"]!=null && row["parmlname"].ToString()!="")
				{
                    model.parmlname = row["parmlname"].ToString();
				}
				if(row["parmpwd"]!=null)
				{
					model.parmpwd=row["parmpwd"].ToString();
				}
				if(row["parmtel"]!=null)
				{
					model.parmtel=row["parmtel"].ToString();
				}
				if(row["parmcontent"]!=null)
				{
					model.parmcontent=row["parmcontent"].ToString();
				}
				if(row["parmcId"]!=null)
				{
					model.parmcId=row["parmcId"].ToString();
				}
				if(row["backstatus"]!=null)
				{
					model.backstatus=row["backstatus"].ToString();
				}
				if(row["resulmark"]!=null)
				{
					model.resulmark=row["resulmark"].ToString();
				}
				if(row["lname"]!=null)
				{
					model.lname=row["lname"].ToString();
				}
				if(row["cId"]!=null)
				{
					model.cId=row["cId"].ToString();
				}
				if(row["pwd"]!=null)
				{
					model.pwd=row["pwd"].ToString();
				}
				if(row["remark"]!=null)
				{
					model.remark=row["remark"].ToString();
				}
				if(row["balanceurl"]!=null)
				{
					model.balanceurl=row["balanceurl"].ToString();
				}
				if(row["bremark"]!=null)
				{
					model.bremark=row["bremark"].ToString();
				}
				if(row["editurl"]!=null)
				{
					model.editurl=row["editurl"].ToString();
				}
				if(row["eremark"]!=null)
				{
					model.eremark=row["eremark"].ToString();
				}
				if(row["isdefault"]!=null && row["isdefault"].ToString()!="")
				{
					model.isdefault=int.Parse(row["isdefault"].ToString());
				}
				if(row["msglength"]!=null && row["msglength"].ToString()!="")
				{
					model.msglength=int.Parse(row["msglength"].ToString());
				}
				if(row["maxcount"]!=null && row["maxcount"].ToString()!="")
				{
					model.maxcount=int.Parse(row["maxcount"].ToString());
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
			strSql.Append("select ID,sendurl,parmlname,parmpwd,parmtel,parmcontent,parmcId,backstatus,resulmark,lname,cId,pwd,remark,balanceurl,bremark,editurl,eremark,isdefault,msglength,maxcount,islist ");
			strSql.Append(" FROM Emc_Msg_Interface ");
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
			strSql.Append(" ID,sendurl,parmlname,parmpwd,parmtel,parmcontent,parmcId,backstatus,resulmark,lname,cId,pwd,remark,balanceurl,bremark,editurl,eremark,isdefault,msglength,maxcount,islist ");
			strSql.Append(" FROM Emc_Msg_Interface ");
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
			strSql.Append("select count(1) FROM Emc_Msg_Interface ");
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
			strSql.Append(")AS Row, T.*  from Emc_Msg_Interface T ");
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
			parameters[0].Value = "Emc_Msg_Interface";
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

