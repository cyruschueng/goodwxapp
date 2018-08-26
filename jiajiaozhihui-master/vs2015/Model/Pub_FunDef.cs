using System;
namespace SfSoft.Model
{
    /// <summary>
    /// Pub_FunDef:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class Pub_FunDef
    {
        public Pub_FunDef()
        { }
        #region Model
        private int _id;
        private string _funid;
        private string _funname;
        private string _funtype;
        private string _isact;
        private int? _orderid;
        private int? _parentid;
        private string _flag;
        private string _isapprove;
        private string _boname;
        private string _pagepath;
        private string _filialeid;
        private string _formtype;
        private int? _formcol;
        private string _formdesc;
        private string _parentbo;
        private string _ismaster;
        private string _creator;
        private DateTime? _createdate;
        private string _calltype;
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
        public string FunID
        {
            set { _funid = value; }
            get { return _funid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FunName
        {
            set { _funname = value; }
            get { return _funname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FunType
        {
            set { _funtype = value; }
            get { return _funtype; }
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
        public int? OrderID
        {
            set { _orderid = value; }
            get { return _orderid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ParentID
        {
            set { _parentid = value; }
            get { return _parentid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Flag
        {
            set { _flag = value; }
            get { return _flag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IsApprove
        {
            set { _isapprove = value; }
            get { return _isapprove; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string BoName
        {
            set { _boname = value; }
            get { return _boname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string PagePath
        {
            set { _pagepath = value; }
            get { return _pagepath; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FilialeID
        {
            set { _filialeid = value; }
            get { return _filialeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FormType
        {
            set { _formtype = value; }
            get { return _formtype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? FormCol
        {
            set { _formcol = value; }
            get { return _formcol; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string FormDesc
        {
            set { _formdesc = value; }
            get { return _formdesc; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ParentBo
        {
            set { _parentbo = value; }
            get { return _parentbo; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IsMaster
        {
            set { _ismaster = value; }
            get { return _ismaster; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Creator
        {
            set { _creator = value; }
            get { return _creator; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateDate
        {
            set { _createdate = value; }
            get { return _createdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string CallType
        {
            set { _calltype = value; }
            get { return _calltype; }
        }
        #endregion Model

    }
}

