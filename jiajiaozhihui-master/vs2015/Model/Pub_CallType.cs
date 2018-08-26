using System;
namespace SfSoft.Model
{
    /// <summary>
    /// Pub_CallType:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class Pub_CallType
    {
        public Pub_CallType()
        { }
        #region Model
        private int _id;
        private string _appid;
        private string _modulesid;
        private string _docid;
        private int? _calltype;
        private decimal? _recalltime;
        private decimal? _calltime;
        /// <summary>
        /// 
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string AppID
        {
            set { _appid = value; }
            get { return _appid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ModulesID
        {
            set { _modulesid = value; }
            get { return _modulesid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DocID
        {
            set { _docid = value; }
            get { return _docid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? CallType
        {
            set { _calltype = value; }
            get { return _calltype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? ReCallTime
        {
            set { _recalltime = value; }
            get { return _recalltime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public decimal? CallTime
        {
            set { _calltime = value; }
            get { return _calltime; }
        }
        #endregion Model

    }
}

