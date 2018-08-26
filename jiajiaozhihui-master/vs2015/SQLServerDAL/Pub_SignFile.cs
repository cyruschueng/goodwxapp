using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Pub_SignFile。
	/// </summary>
	public class Pub_SignFile:IPub_SignFile
	{
		public Pub_SignFile()
		{}
		#region  成员方法

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "Pub_SignFile"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_SignFile");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.Pub_SignFile model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into Pub_SignFile(");
			strSql.Append("MID,DocID,Signs,SignsID,Status,SignsDate,Remark)");
			strSql.Append(" values (");
			strSql.Append("@MID,@DocID,@Signs,@SignsID,@Status,@SignsDate,@Remark)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@DocID", SqlDbType.NVarChar,20),
					new SqlParameter("@Signs", SqlDbType.NVarChar,20),
					new SqlParameter("@SignsID", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.NVarChar,20),
					new SqlParameter("@SignsDate", SqlDbType.DateTime),
					new SqlParameter("@Remark", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.MID;
			parameters[1].Value = model.DocID;
			parameters[2].Value = model.Signs;
			parameters[3].Value = model.SignsID;
			parameters[4].Value = model.Status;
			parameters[5].Value = model.SignsDate;
			parameters[6].Value = model.Remark;

			object obj = DbHelperSQL.GetSingle(strSql.ToString(),parameters);
			if (obj == null)
			{
				return 1;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 更新一条数据
		/// </summary>
		public void Update(SfSoft.Model.Pub_SignFile model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update Pub_SignFile set ");
			strSql.Append("MID=@MID,");
			strSql.Append("DocID=@DocID,");
			strSql.Append("Signs=@Signs,");
			strSql.Append("SignsID=@SignsID,");
			strSql.Append("Status=@Status,");
			strSql.Append("SignsDate=@SignsDate,");
			strSql.Append("Remark=@Remark");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@MID", SqlDbType.NVarChar,50),
					new SqlParameter("@DocID", SqlDbType.NVarChar,20),
					new SqlParameter("@Signs", SqlDbType.NVarChar,20),
					new SqlParameter("@SignsID", SqlDbType.Int,4),
					new SqlParameter("@Status", SqlDbType.NVarChar,20),
					new SqlParameter("@SignsDate", SqlDbType.DateTime),
					new SqlParameter("@Remark", SqlDbType.NVarChar,200)};
			parameters[0].Value = model.ID;
			parameters[1].Value = model.MID;
			parameters[2].Value = model.DocID;
			parameters[3].Value = model.Signs;
			parameters[4].Value = model.SignsID;
			parameters[5].Value = model.Status;
			parameters[6].Value = model.SignsDate;
			parameters[7].Value = model.Remark;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public void Delete(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete Pub_SignFile ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
		}
        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(string  DocID, string MID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_SignFile ");
            strSql.Append(" where DocID=@DocID and MID=@MID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DocID", SqlDbType.NVarChar,10),
                    new SqlParameter("@MID", SqlDbType.NVarChar ,80)
            };
            parameters[0].Value = DocID;
            parameters[1].Value = MID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.Pub_SignFile GetModel(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ID,MID,DocID,Signs,SignsID,Status,SignsDate,Remark from Pub_SignFile ");
			strSql.Append(" where ID=@ID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = ID;

			SfSoft.Model.Pub_SignFile model=new SfSoft.Model.Pub_SignFile();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				if(ds.Tables[0].Rows[0]["ID"].ToString()!="")
				{
					model.ID=int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
				}
				model.MID=ds.Tables[0].Rows[0]["MID"].ToString();
				model.DocID=ds.Tables[0].Rows[0]["DocID"].ToString();
				model.Signs=ds.Tables[0].Rows[0]["Signs"].ToString();
				if(ds.Tables[0].Rows[0]["SignsID"].ToString()!="")
				{
					model.SignsID=int.Parse(ds.Tables[0].Rows[0]["SignsID"].ToString());
				}
				model.Status=ds.Tables[0].Rows[0]["Status"].ToString();
				if(ds.Tables[0].Rows[0]["SignsDate"].ToString()!="")
				{
					model.SignsDate=DateTime.Parse(ds.Tables[0].Rows[0]["SignsDate"].ToString());
				}
				model.Remark=ds.Tables[0].Rows[0]["Remark"].ToString();
				return model;
			}
			else
			{
			return null;
			}
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ID,MID,DocID,Signs,SignsID,Status,SignsDate,Remark ");
			strSql.Append(" FROM Pub_SignFile ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			return DbHelperSQL.Query(strSql.ToString());
		}

        /// <summary>
        /// 获得待签数据列表
        /// </summary>
        public DataSet GetSignsList(string strWhere, string TablesName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select a.*,b.ID as SID,b.Status as SignStatus,b.Signs as SignsName,b.SignsID,b.SignsDate,b.Remark  from " + TablesName + " as a left join Pub_SignFile as b on a.ID=b.DocID  ");

            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
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
			parameters[0].Value = "Pub_SignFile";
			parameters[1].Value = "ID";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/

		#endregion  成员方法
	}
}

