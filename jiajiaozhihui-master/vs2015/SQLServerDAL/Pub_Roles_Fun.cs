using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Roles_Fun。


    /// </summary>
    public class Pub_Roles_Fun : IPub_Roles_Fun
    {
        public Pub_Roles_Fun()
        { }
        #region  成员方法

        /// <summary>
        /// 增加一条数据


        /// </summary>
        public void Add(SfSoft.Model.Pub_Roles_Fun model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Roles_Fun(");
            strSql.Append("RolesID,FunID)");
            strSql.Append(" values (");
            strSql.Append("@RolesID,@FunID)");
            SqlParameter[] parameters = {
					new SqlParameter("@RolesID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@FunID", SqlDbType.NVarChar,30)};
            parameters[0].Value = model.RolesID;
            parameters[1].Value = model.FunID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 删除一条数据


        /// </summary>
        public void Delete(Guid RolesID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Roles_Fun ");
            strSql.Append(" where RolesID=@RolesID ");
            SqlParameter[] parameters = {
					new SqlParameter("@RolesID", SqlDbType.UniqueIdentifier),
					 };
            parameters[0].Value = RolesID;
 

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体


        /// </summary>
        public SfSoft.Model.Pub_Roles_Fun GetModel(Guid RolesID, string FunID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select RolesID,FunID from Pub_Roles_Fun ");
            strSql.Append(" where RolesID=@RolesID and FunID=@FunID ");
            SqlParameter[] parameters = {
					new SqlParameter("@RolesID", SqlDbType.UniqueIdentifier),
					new SqlParameter("@FunID", SqlDbType.NVarChar,50)};
            parameters[0].Value = RolesID;
            parameters[1].Value = FunID;

            SfSoft.Model.Pub_Roles_Fun model = new SfSoft.Model.Pub_Roles_Fun();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["RolesID"].ToString() != "")
                {
                    model.RolesID = new Guid(ds.Tables[0].Rows[0]["RolesID"].ToString());
                }
                model.FunID = ds.Tables[0].Rows[0]["FunID"].ToString();
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
            strSql.Append("select RolesID,FunID ");
            strSql.Append(" FROM Pub_Roles_Fun ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 取的用户ID
        /// </summary>
        /// <param name="UsersID"></param>
        /// <returns></returns>
        public DataSet GetUsersIDByUserName(string UserName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * from Pub_Roles_Fun where RolesID in ( select RoleId from aspnet_UsersInRoles  ");

            if (UserName.Trim() != "")
            {
                strSql.Append(" where UserName='" + UserName + "')");
                return DbHelperSQL.Query(strSql.ToString());
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 取的用户权限
        /// </summary>
        /// <param name="UsersID"></param>
        /// <returns></returns>
        public DataSet GetUsersFun(string UsersID, string FilialeID)
        {
            StringBuilder strSql = new StringBuilder();
            if ((FilialeID == null) || (FilialeID == ""))
            {
                FilialeID = "-2";
            }
            strSql.Append("select DISTINCT funid from Pub_Roles_Fun where RolesID in ( select RoleId from aspnet_UsersInRoles where RoleID in (select RoleID from Pub_Roles_Company where FilialeID='" + FilialeID + "')");

            if (UsersID.Trim() != "")
            {
                strSql.Append(" and UserId='" + UsersID + "')");
                return DbHelperSQL.Query(strSql.ToString());
            }
            else
            {
                return null;
            }
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
            parameters[0].Value = "Pub_Roles_Fun";
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

