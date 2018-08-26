using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Company。
    /// </summary>
    public class Pub_Company : IPub_Company
    {
        public Pub_Company()
        { }
        #region  成员方法

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Company");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.NVarChar,50)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public void Add(SfSoft.Model.Pub_Company model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Company(");
            strSql.Append("CompanyName,CompanyName_e,Logo,Email,Addr,Phone,Fax,ID)");
            strSql.Append(" values (");
            strSql.Append("@CompanyName,@CompanyName_e,@Logo,@Email,@Addr,@Phone,@Fax,@ID)");
            SqlParameter[] parameters = {
					new SqlParameter("@CompanyName", SqlDbType.NVarChar,150),
					new SqlParameter("@CompanyName_e", SqlDbType.NVarChar,150),
					new SqlParameter("@Logo", SqlDbType.NVarChar,150),
					new SqlParameter("@Email", SqlDbType.NVarChar,150),
					new SqlParameter("@Addr", SqlDbType.NVarChar,150),
					new SqlParameter("@Phone", SqlDbType.NVarChar,150),
					new SqlParameter("@Fax", SqlDbType.NVarChar,150),
					new SqlParameter("@ID", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.CompanyName;
            parameters[1].Value = model.CompanyName_e;
            parameters[2].Value = model.Logo;
            parameters[3].Value = model.Email;
            parameters[4].Value = model.Addr;
            parameters[5].Value = model.Phone;
            parameters[6].Value = model.Fax;
            parameters[7].Value = model.ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_Company model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Company set ");
            strSql.Append("CompanyName=@CompanyName,");
            strSql.Append("CompanyName_e=@CompanyName_e,");
            strSql.Append("Logo=@Logo,");
            strSql.Append("Email=@Email,");
            strSql.Append("Addr=@Addr,");
            strSql.Append("Phone=@Phone,");
            strSql.Append("Fax=@Fax");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@CompanyName", SqlDbType.NVarChar,150),
					new SqlParameter("@CompanyName_e", SqlDbType.NVarChar,150),
					new SqlParameter("@Logo", SqlDbType.NVarChar,150),
					new SqlParameter("@Email", SqlDbType.NVarChar,150),
					new SqlParameter("@Addr", SqlDbType.NVarChar,150),
					new SqlParameter("@Phone", SqlDbType.NVarChar,150),
					new SqlParameter("@Fax", SqlDbType.NVarChar,150),
					new SqlParameter("@ID", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.CompanyName;
            parameters[1].Value = model.CompanyName_e;
            parameters[2].Value = model.Logo;
            parameters[3].Value = model.Email;
            parameters[4].Value = model.Addr;
            parameters[5].Value = model.Phone;
            parameters[6].Value = model.Fax;
            parameters[7].Value = model.ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Company ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.NVarChar,50)};
            parameters[0].Value = ID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Company GetModel(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select CompanyName,CompanyName_e,Logo,Email,Addr,Phone,Fax,ID from Pub_Company ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.NVarChar,50)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_Company model = new SfSoft.Model.Pub_Company();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                model.CompanyName = ds.Tables[0].Rows[0]["CompanyName"].ToString();
                model.CompanyName_e = ds.Tables[0].Rows[0]["CompanyName_e"].ToString();
                model.Logo = ds.Tables[0].Rows[0]["Logo"].ToString();
                model.Email = ds.Tables[0].Rows[0]["Email"].ToString();
                model.Addr = ds.Tables[0].Rows[0]["Addr"].ToString();
                model.Phone = ds.Tables[0].Rows[0]["Phone"].ToString();
                model.Fax = ds.Tables[0].Rows[0]["Fax"].ToString();
                model.ID = ds.Tables[0].Rows[0]["ID"].ToString();
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
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select CompanyName,CompanyName_e,Logo,Email,Addr,Phone,Fax,ID ");
            strSql.Append(" FROM Pub_Company ");
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
            parameters[0].Value = "Pub_Company";
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

