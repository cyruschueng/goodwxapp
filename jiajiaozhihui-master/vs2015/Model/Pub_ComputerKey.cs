using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_ComputerKey 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public class Pub_ComputerKey
    {
        public Pub_ComputerKey()
        { }
        #region Model
        private int _id;
        private int? _userid;
        private string _username;
        private string _cnname;
        private string _deptname;
        private int? _deptid;
        private string _idcard;
        private string _computerkind;
        private string _computerid;
        private string _remark;
        private string _brand;
        private string _computertype;
        private string _computersn;
        private string _status;
        private DateTime? _submitdate;
        private DateTime? _canceldate;
        private DateTime? _appdate;
        private string _approval;
        private string _appremark;
        private int? _flag;
        private int? _filialeid;
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
        public int? UserID
        {
            set { _userid = value; }
            get { return _userid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserName
        {
            set { _username = value; }
            get { return _username; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string CnName
        {
            set { _cnname = value; }
            get { return _cnname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DeptName
        {
            set { _deptname = value; }
            get { return _deptname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DeptID
        {
            set { _deptid = value; }
            get { return _deptid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IDCard
        {
            set { _idcard = value; }
            get { return _idcard; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ComputerKind
        {
            set { _computerkind = value; }
            get { return _computerkind; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ComputerID
        {
            set { _computerid = value; }
            get { return _computerid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Remark
        {
            set { _remark = value; }
            get { return _remark; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Brand
        {
            set { _brand = value; }
            get { return _brand; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ComputerType
        {
            set { _computertype = value; }
            get { return _computertype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ComputerSn
        {
            set { _computersn = value; }
            get { return _computersn; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Status
        {
            set { _status = value; }
            get { return _status; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? SubmitDate
        {
            set { _submitdate = value; }
            get { return _submitdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CancelDate
        {
            set { _canceldate = value; }
            get { return _canceldate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? AppDate
        {
            set { _appdate = value; }
            get { return _appdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Approval
        {
            set { _approval = value; }
            get { return _approval; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string AppRemark
        {
            set { _appremark = value; }
            get { return _appremark; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Flag
        {
            set { _flag = value; }
            get { return _flag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? FilialeID
        {
            set { _filialeid = value; }
            get { return _filialeid; }
        }
        #endregion Model

    }
}

