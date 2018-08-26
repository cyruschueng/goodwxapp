using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_BaseData 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_BaseData
    {
        public Pub_BaseData()
        { }
        #region Model
        private int _refid;
        private int _refpid;
        private string _refobj;
        private string _refvaluecode;
        private string _refvalue_e;
        private string _refvalue;
        private string _issystem;
        private string _isact;
        private int _orderid;
        private string _filialeid;
        /// <summary>
        /// 
        /// </summary>
        public int RefID
        {
            set { _refid = value; }
            get { return _refid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int RefPID
        {
            set { _refpid = value; }
            get { return _refpid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string RefObj
        {
            set { _refobj = value; }
            get { return _refobj; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string RefValueCode
        {
            set { _refvaluecode = value; }
            get { return _refvaluecode; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string RefValue_e
        {
            set { _refvalue_e = value; }
            get { return _refvalue_e; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string RefValue
        {
            set { _refvalue = value; }
            get { return _refvalue; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IsSystem
        {
            set { _issystem = value; }
            get { return _issystem; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IsAct
        {
            set { _isact = value; }
            get { return _isact; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int OrderID
        {
            set { _orderid = value; }
            get { return _orderid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FilialeID
        {
            set { _filialeid = value; }
            get { return _filialeid; }
        }
        #endregion Model

    }
}

