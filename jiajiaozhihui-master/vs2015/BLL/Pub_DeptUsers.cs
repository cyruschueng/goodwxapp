using System;
using System.Data;
using System.Text;
using SfSoft.DALFactory;
using SfSoft.IDAL;
using System.Data.SqlClient;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_DeptUsers 的摘要说明。
    /// </summary>
    public class Pub_DeptUsers
    {
        private readonly IPub_DeptUsers dal = DataAccess.CreatePub_DeptUsers();
        public Pub_DeptUsers()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            return dal.Exists(ID);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_DeptUsers model)
        {
            return dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_DeptUsers model)
        {
            dal.Update(model);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int UserID, int FilialeID)
        {
            dal.Delete(UserID, FilialeID);
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {
            dal.Delete(ID);
        }
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_DeptUsers GetModel(int ID)
        {
            return dal.GetModel(ID);
        }
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_DeptUsers GetModelByUserID(int UserID)
        {
            return dal.GetModelByUserID(UserID);
        }
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_DeptUsers GetModelByUserID(int UserID, int FilialeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,DeptID,UserID,FilialeID,UserDeptKind from Pub_DeptUsers ");
            strSql.Append(" where UserID=@UserID and FilialeID=@FilialeID and UserDeptKind='1' ");
            SqlParameter[] parameters = {
					new SqlParameter("@UserID", SqlDbType.Int,4),
                      new SqlParameter("@FilialeID", SqlDbType.Int,4),                  
                                        };
            parameters[0].Value = UserID;
            parameters[1].Value = FilialeID;
            SfSoft.Model.Pub_DeptUsers model = new SfSoft.Model.Pub_DeptUsers();
            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(strSql.ToString(), parameters);
            
            
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
                return model;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 得到一个对象实体，从缓存中。
        /// </summary>
        public SfSoft.Model.Pub_DeptUsers GetModelByCache(int ID)
        {
            string CacheKey = "Pub_DeptUsersModel-" + ID;
            object objModel = SfSoft.Common.DataCache.GetCache(CacheKey);
            if (objModel == null)
            {
                try
                {
                    objModel = dal.GetModel(ID);
                    if (objModel != null)
                    {
                        int ModelCache = SfSoft.Common.ConfigHelper.GetConfigInt("ModelCache");
                        SfSoft.Common.DataCache.SetCache(CacheKey, objModel, DateTime.Now.AddMinutes(ModelCache), TimeSpan.Zero);
                    }
                }
                catch { }
            }
            return (SfSoft.Model.Pub_DeptUsers)objModel;
        }

        
        /// <summary>
        /// 获得兼职人员列表
        /// </summary>
        public DataSet GetPluraList(string strWhere)
        {
            return dal.GetPluraList(strWhere);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            return dal.GetList(strWhere);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetAllList()
        {
            return GetList("");
        }
        /// <summary>
        /// 获得部门信息
        /// </summary>
        public DataSet GetDeptInfoByUserInfo(string strWhere)
        {
            return dal.GetDeptInfoByUserInfo(strWhere);
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        //public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        //{
        //return dal.GetList(PageSize,PageIndex,strWhere);
        //}

        #endregion  成员方法
    }
}

