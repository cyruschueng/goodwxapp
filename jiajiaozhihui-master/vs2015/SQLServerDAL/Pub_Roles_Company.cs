using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Roles_Company。
    /// </summary>
    public class Pub_Roles_Company : IPub_Roles_Company
    {
        public Pub_Roles_Company()
        { }
        #region  成员方法

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(Guid RoleId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Roles_Company");
            strSql.Append(" where RoleId=@RoleId ");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier)};
            parameters[0].Value = RoleId;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public void Add(SfSoft.Model.Pub_Roles_Company model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Roles_Company(");
            strSql.Append("RoleId,FilialeID)");
            strSql.Append(" values (");
            strSql.Append("@RoleId,@FilialeID)");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5)};
            parameters[0].Value = model.RoleId;
            parameters[1].Value = model.FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_Roles_Company model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Roles_Company set ");
            strSql.Append("FilialeID=@FilialeID");
            strSql.Append(" where RoleId=@RoleId ");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5)};
            parameters[0].Value = model.RoleId;
            parameters[1].Value = model.FilialeID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(Guid RoleId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Roles_Company ");
            strSql.Append(" where RoleId=@RoleId ");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier)};
            parameters[0].Value = RoleId;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Roles_Company GetModel(Guid RoleId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select RoleId,FilialeID from Pub_Roles_Company ");
            strSql.Append(" where RoleId=@RoleId ");
            SqlParameter[] parameters = {
					new SqlParameter("@RoleId", SqlDbType.UniqueIdentifier)};
            parameters[0].Value = RoleId;

            SfSoft.Model.Pub_Roles_Company model = new SfSoft.Model.Pub_Roles_Company();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["RoleId"].ToString() != "")
                {
                    model.RoleId = new Guid(ds.Tables[0].Rows[0]["RoleId"].ToString());
                }
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
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
            strSql.Append("select RoleId,FilialeID ");
            strSql.Append(" FROM Pub_Roles_Company ");
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
            parameters[0].Value = "Pub_Roles_Company";
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

