using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_DeptUsers。
    /// </summary>
    public class Pub_DeptUsers : IPub_DeptUsers
    {
        public Pub_DeptUsers()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_DeptUsers");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_DeptUsers model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_DeptUsers(");
            strSql.Append("DeptID,UserID,FilialeID,UserDeptKind,PostID,PostName)");
            strSql.Append(" values (");
            strSql.Append("@DeptID,@UserID,@FilialeID,@UserDeptKind,@PostID,@PostName)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.Int,4),
					new SqlParameter("@UserDeptKind", SqlDbType.NVarChar,5),
					new SqlParameter("@PostID", SqlDbType.NVarChar,30),
					new SqlParameter("@PostName", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.DeptID;
            parameters[1].Value = model.UserID;
            parameters[2].Value = model.FilialeID;
            parameters[3].Value = model.UserDeptKind;
            parameters[4].Value = model.PostID;
            parameters[5].Value = model.PostName;

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
        public void Update(SfSoft.Model.Pub_DeptUsers model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_DeptUsers set ");
            strSql.Append("DeptID=@DeptID,");
            strSql.Append("UserID=@UserID,");
            strSql.Append("FilialeID=@FilialeID,");
            strSql.Append("UserDeptKind=@UserDeptKind,");
            strSql.Append("PostID=@PostID,");
            strSql.Append("PostName=@PostName");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@DeptID", SqlDbType.Int,4),
					new SqlParameter("@UserID", SqlDbType.Int,4),
					new SqlParameter("@FilialeID", SqlDbType.Int,4),
					new SqlParameter("@UserDeptKind", SqlDbType.NVarChar,5),
					new SqlParameter("@PostID", SqlDbType.NVarChar,30),
					new SqlParameter("@PostName", SqlDbType.NVarChar,50)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.DeptID;
            parameters[2].Value = model.UserID;
            parameters[3].Value = model.FilialeID;
            parameters[4].Value = model.UserDeptKind;
            parameters[5].Value = model.PostID;
            parameters[6].Value = model.PostName;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int UserID, int FilialeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_DeptUsers ");
            strSql.Append(" where UserID=@UserID and FilialeID=@FilialeID");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.Int,4),
                    new SqlParameter("@FilialeID", SqlDbType.Int,4),
            };
            parameters[0].Value = UserID;
            parameters[1].Value = FilialeID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_DeptUsers ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
            };
            parameters[0].Value = ID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_DeptUsers GetModelByUserID(int UserID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,DeptID,UserID,FilialeID,UserDeptKind,PostID,PostName from Pub_DeptUsers ");
            strSql.Append(" where UserID=@UserID and UserDeptKind='1' ");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.Int,4)};
            parameters[0].Value = UserID;

            SfSoft.Model.Pub_DeptUsers model = new SfSoft.Model.Pub_DeptUsers();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["DeptID"].ToString() != "")
                {
                    model.DeptID = int.Parse(ds.Tables[0].Rows[0]["DeptID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["FilialeID"].ToString() != "")
                {
                    model.FilialeID = int.Parse(ds.Tables[0].Rows[0]["FilialeID"].ToString());
                }
                model.PostID = ds.Tables[0].Rows[0]["PostID"].ToString();
                model.PostName = ds.Tables[0].Rows[0]["PostName"].ToString();
                model.UserDeptKind = ds.Tables[0].Rows[0]["UserDeptKind"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_DeptUsers GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,DeptID,UserID,FilialeID,UserDeptKind,PostID,PostName from Pub_DeptUsers ");
            strSql.Append(" where ID=@ID");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_DeptUsers model = new SfSoft.Model.Pub_DeptUsers();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["DeptID"].ToString() != "")
                {
                    model.DeptID = int.Parse(ds.Tables[0].Rows[0]["DeptID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["FilialeID"].ToString() != "")
                {
                    model.FilialeID = int.Parse(ds.Tables[0].Rows[0]["FilialeID"].ToString());
                }
                model.UserDeptKind = ds.Tables[0].Rows[0]["UserDeptKind"].ToString();
                model.PostID = ds.Tables[0].Rows[0]["PostID"].ToString();
                model.PostName = ds.Tables[0].Rows[0]["PostName"].ToString();
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
            strSql.Append("select ID,DeptID,UserID,FilialeID,UserDeptKind,PostID,PostName  ");
            strSql.Append(" FROM Pub_DeptUsers ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 取兼职人员列表
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        public DataSet GetPluraList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select a.ID,b.CnName,c.DeptName,d.CompanyName,a.FilialeID,a.PostID,a.PostName  from Pub_DeptUsers as a left join Pub_EmpInfo as b on a.UserID=b.ID ");
            strSql.Append(" left join Pub_Dept as c on a.DeptID = c.DeptID ");
            strSql.Append(" left join (select DeptName as CompanyName,FilialeID from Pub_Dept where IsFiliale='0' or IsFiliale='1') as d ");
            strSql.Append(" on a.FilialeID=d.FilialeID  ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 取的部门信息根据用户信息
        /// </summary>
        /// <param name="strWhere"></param>
        /// <returns></returns>
        public DataSet GetDeptInfoByUserInfo(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select a.UserDeptKind,b.DeptID,b.DeptName,a.FilialeID,a.PostID,a.PostName  ");
            strSql.Append(" FROM Pub_DeptUsers as a left join Pub_Dept as b on a.DeptID=b.DeptID ");
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
            parameters[0].Value = "Pub_DeptUsers";
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

