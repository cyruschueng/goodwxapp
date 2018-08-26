using System;
using System.Data;
using System.Collections.Generic;
using SfSoft.Common;
using SfSoft.Model;
using SfSoft.DALFactory;
using SfSoft.IDAL;
namespace SfSoft.BLL
{
    /// <summary>
    /// 业务逻辑类Pub_ComputerKey 的摘要说明。
    /// </summary>
    public class Pub_ComputerKey
    {
        private readonly IPub_ComputerKey dal = DataAccess.CreatePub_ComputerKey();
        public Pub_ComputerKey()
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
        public int Add(SfSoft.Model.Pub_ComputerKey model)
        {
            return dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_ComputerKey model)
        {
            dal.Update(model);
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
        public SfSoft.Model.Pub_ComputerKey GetModel(int ID)
        {

            return dal.GetModel(ID);
        }

        /// <summary>
        /// 得到一个对象实体，从缓存中。
        /// </summary>
        public SfSoft.Model.Pub_ComputerKey GetModelByCache(int ID)
        {

            string CacheKey = "Pub_ComputerKeyModel-" + ID;
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
            return (SfSoft.Model.Pub_ComputerKey)objModel;
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            return dal.GetList(strWhere);
        }
        /// <summary>
        /// 获得前几行数据
        /// </summary>
        public DataSet GetList(int Top, string strWhere, string filedOrder)
        {
            return dal.GetList(Top, strWhere, filedOrder);
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public List<SfSoft.Model.Pub_ComputerKey> GetModelList(string strWhere)
        {
            DataSet ds = dal.GetList(strWhere);
            return DataTableToList(ds.Tables[0]);
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public List<SfSoft.Model.Pub_ComputerKey> DataTableToList(DataTable dt)
        {
            List<SfSoft.Model.Pub_ComputerKey> modelList = new List<SfSoft.Model.Pub_ComputerKey>();
            int rowsCount = dt.Rows.Count;
            if (rowsCount > 0)
            {
                SfSoft.Model.Pub_ComputerKey model;
                for (int n = 0; n < rowsCount; n++)
                {
                    model = new SfSoft.Model.Pub_ComputerKey();
                    if (dt.Rows[n]["ID"].ToString() != "")
                    {
                        model.ID = int.Parse(dt.Rows[n]["ID"].ToString());
                    }
                    if (dt.Rows[n]["UserID"].ToString() != "")
                    {
                        model.UserID = int.Parse(dt.Rows[n]["UserID"].ToString());
                    }
                    model.CnName = dt.Rows[n]["CnName"].ToString();
                    model.IDCard = dt.Rows[n]["IDCard"].ToString();
                    model.ComputerKind = dt.Rows[n]["ComputerKind"].ToString();
                    model.ComputerID = dt.Rows[n]["ComputerID"].ToString();
                    model.Remark = dt.Rows[n]["Remark"].ToString();
                    model.Brand = dt.Rows[n]["Brand"].ToString();
                    model.ComputerType = dt.Rows[n]["ComputerType"].ToString();
                    model.ComputerSn = dt.Rows[n]["ComputerSn"].ToString();
                    model.Status = dt.Rows[n]["Status"].ToString();
                    if (dt.Rows[n]["SubmitDate"].ToString() != "")
                    {
                        model.SubmitDate = DateTime.Parse(dt.Rows[n]["SubmitDate"].ToString());
                    }
                    if (dt.Rows[n]["CancelDate"].ToString() != "")
                    {
                        model.CancelDate = DateTime.Parse(dt.Rows[n]["CancelDate"].ToString());
                    }
                    if (dt.Rows[n]["AppDate"].ToString() != "")
                    {
                        model.AppDate = DateTime.Parse(dt.Rows[n]["AppDate"].ToString());
                    }
                    model.Approval = dt.Rows[n]["Approval"].ToString();
                    model.AppRemark = dt.Rows[n]["AppRemark"].ToString();
                    modelList.Add(model);
                }
            }
            return modelList;
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetAllList()
        {
            return GetList("");
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

