using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Dept。

    /// </summary>
    public class Pub_Dept : IPub_Dept
    {
        public Pub_Dept()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录

        /// </summary>
        public bool Exists(int DeptID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Dept");
            strSql.Append(" where DeptID=@DeptID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DeptID", SqlDbType.Int,4)};
            parameters[0].Value = DeptID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据

        /// </summary>
        public int Add(SfSoft.Model.Pub_Dept model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Dept(");
            strSql.Append("ParentID,DeptNo,DeptName,ManagerName,ParentAuditID,ContactInfo,DeptName_e,IsChild,AuditName,AuditID,ManagerID,IsFiliale,FilialeID,DelFlag)");
            strSql.Append(" values (");
            strSql.Append("@ParentID,@DeptNo,@DeptName,@ManagerName,@ParentAuditID,@ContactInfo,@DeptName_e,@IsChild,@AuditName,@AuditID,@ManagerID,@IsFiliale,@FilialeID,@DelFlag)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@ParentID", SqlDbType.Int,4),
					new SqlParameter("@DeptNo", SqlDbType.NVarChar,30),
					new SqlParameter("@DeptName", SqlDbType.NVarChar,30),
					new SqlParameter("@ManagerName", SqlDbType.NVarChar,30),
					new SqlParameter("@ParentAuditID", SqlDbType.Int,4),
					new SqlParameter("@ContactInfo", SqlDbType.NVarChar,250),
					new SqlParameter("@DeptName_e", SqlDbType.NVarChar,80),
					new SqlParameter("@IsChild", SqlDbType.Int,4),
					new SqlParameter("@AuditName", SqlDbType.NVarChar,50),
					new SqlParameter("@AuditID", SqlDbType.Int,4),
					new SqlParameter("@ManagerID", SqlDbType.Int,4),
					new SqlParameter("@IsFiliale", SqlDbType.NVarChar,5),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@DelFlag", SqlDbType.NVarChar,5)};
            parameters[0].Value = model.ParentID;
            parameters[1].Value = model.DeptNo;
            parameters[2].Value = model.DeptName;
            parameters[3].Value = model.ManagerName;
            parameters[4].Value = model.ParentAuditID;
            parameters[5].Value = model.ContactInfo;
            parameters[6].Value = model.DeptName_e;
            parameters[7].Value = model.IsChild;
            parameters[8].Value = model.AuditName;
            parameters[9].Value = model.AuditID;
            parameters[10].Value = model.ManagerID;
            parameters[11].Value = model.IsFiliale;
            parameters[12].Value = model.FilialeID;
            parameters[13].Value = model.DelFlag;

            object obj = DbHelperSQL.GetSingle(strSql.ToString(), parameters);
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
        public void Update(SfSoft.Model.Pub_Dept model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Dept set ");
            strSql.Append("ParentID=@ParentID,");
            strSql.Append("DeptNo=@DeptNo,");
            strSql.Append("DeptName=@DeptName,");
            strSql.Append("ManagerName=@ManagerName,");
            strSql.Append("ParentAuditID=@ParentAuditID,");
            strSql.Append("ContactInfo=@ContactInfo,");
            strSql.Append("DeptName_e=@DeptName_e,");
            strSql.Append("IsChild=@IsChild,");
            strSql.Append("AuditName=@AuditName,");
            strSql.Append("AuditID=@AuditID,");
            strSql.Append("ManagerID=@ManagerID,");
            strSql.Append("IsFiliale=@IsFiliale,");
            strSql.Append("FilialeID=@FilialeID,");
            strSql.Append("DelFlag=@DelFlag");
            strSql.Append(" where DeptID=@DeptID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@ParentID", SqlDbType.Int,4),
					new SqlParameter("@DeptNo", SqlDbType.NVarChar,30),
					new SqlParameter("@DeptName", SqlDbType.NVarChar,30),
					new SqlParameter("@ManagerName", SqlDbType.NVarChar,30),
					new SqlParameter("@ParentAuditID", SqlDbType.Int,4),
					new SqlParameter("@ContactInfo", SqlDbType.NVarChar,250),
					new SqlParameter("@DeptName_e", SqlDbType.NVarChar,80),
					new SqlParameter("@IsChild", SqlDbType.Int,4),
					new SqlParameter("@AuditName", SqlDbType.NVarChar,50),
					new SqlParameter("@AuditID", SqlDbType.Int,4),
					new SqlParameter("@ManagerID", SqlDbType.Int,4),
					new SqlParameter("@IsFiliale", SqlDbType.NVarChar,5),
					new SqlParameter("@FilialeID", SqlDbType.NVarChar,5),
					new SqlParameter("@DelFlag", SqlDbType.NVarChar,5)};
            parameters[0].Value = model.DeptID;
            parameters[1].Value = model.ParentID;
            parameters[2].Value = model.DeptNo;
            parameters[3].Value = model.DeptName;
            parameters[4].Value = model.ManagerName;
            parameters[5].Value = model.ParentAuditID;
            parameters[6].Value = model.ContactInfo;
            parameters[7].Value = model.DeptName_e;
            parameters[8].Value = model.IsChild;
            parameters[9].Value = model.AuditName;
            parameters[10].Value = model.AuditID;
            parameters[11].Value = model.ManagerID;
            parameters[12].Value = model.IsFiliale;
            parameters[13].Value = model.FilialeID;
            parameters[14].Value = model.DelFlag;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据

        /// </summary>
        public void Delete(int DeptID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Dept ");
            strSql.Append(" where DeptID=@DeptID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DeptID", SqlDbType.Int,4)};
            parameters[0].Value = DeptID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体

        /// </summary>
        public SfSoft.Model.Pub_Dept GetModel(int DeptID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 DeptID,ParentID,DeptNo,DeptName,ManagerName,ParentAuditID,ContactInfo,DeptName_e,IsChild,AuditName,AuditID,ManagerID,IsFiliale,FilialeID,DelFlag from Pub_Dept ");
            strSql.Append(" where DeptID=@DeptID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DeptID", SqlDbType.Int,4)};
            parameters[0].Value = DeptID;

            SfSoft.Model.Pub_Dept model = new SfSoft.Model.Pub_Dept();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["DeptID"].ToString() != "")
                {
                    model.DeptID = int.Parse(ds.Tables[0].Rows[0]["DeptID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ParentID"].ToString() != "")
                {
                    model.ParentID = int.Parse(ds.Tables[0].Rows[0]["ParentID"].ToString());
                }
                model.DeptNo = ds.Tables[0].Rows[0]["DeptNo"].ToString();
                model.DeptName = ds.Tables[0].Rows[0]["DeptName"].ToString();
                model.ManagerName = ds.Tables[0].Rows[0]["ManagerName"].ToString();
                if (ds.Tables[0].Rows[0]["ParentAuditID"].ToString() != "")
                {
                    model.ParentAuditID = int.Parse(ds.Tables[0].Rows[0]["ParentAuditID"].ToString());
                }
                model.ContactInfo = ds.Tables[0].Rows[0]["ContactInfo"].ToString();
                model.DeptName_e = ds.Tables[0].Rows[0]["DeptName_e"].ToString();
                if (ds.Tables[0].Rows[0]["IsChild"].ToString() != "")
                {
                    model.IsChild = int.Parse(ds.Tables[0].Rows[0]["IsChild"].ToString());
                }
                model.AuditName = ds.Tables[0].Rows[0]["AuditName"].ToString();
                if (ds.Tables[0].Rows[0]["AuditID"].ToString() != "")
                {
                    model.AuditID = int.Parse(ds.Tables[0].Rows[0]["AuditID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["ManagerID"].ToString() != "")
                {
                    model.ManagerID = int.Parse(ds.Tables[0].Rows[0]["ManagerID"].ToString());
                }
                model.IsFiliale = ds.Tables[0].Rows[0]["IsFiliale"].ToString();
                model.FilialeID = ds.Tables[0].Rows[0]["FilialeID"].ToString();
                model.DelFlag = ds.Tables[0].Rows[0]["DelFlag"].ToString();
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
            strSql.Append("select DeptID,ParentID,DeptNo,DeptName,ManagerName,ParentAuditID,ContactInfo,DeptName_e,IsChild,AuditName,AuditID,ManagerID,IsFiliale,FilialeID,DelFlag ");
            strSql.Append(" FROM Pub_Dept ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where DelFlag<>'Y' and " + strWhere);
            }
            else
            {
                strSql.Append(" where DelFlag<>'Y' ");
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
            parameters[0].Value = "Pub_Dept";
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

