using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_Dept 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_Dept
    {
        public Pub_Dept()
        { }
        #region Model
        private int _deptid;
        private int? _parentid;
        private string _deptno;
        private string _deptname;
        private string _managername;
        private int? _parentauditid;
        private string _contactinfo;
        private string _deptname_e;
        private int? _ischild;
        private string _auditname;
        private int? _auditid;
        private int? _managerid;
        private string _isfiliale;
        private string _filialeid;
        private string _delflag;
        /// <summary>
        /// 
        /// </summary>
        public int DeptID
        {
            set { _deptid = value; }
            get { return _deptid; }
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
        public string DeptNo
        {
            set { _deptno = value; }
            get { return _deptno; }
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
        public string ManagerName
        {
            set { _managername = value; }
            get { return _managername; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ParentAuditID
        {
            set { _parentauditid = value; }
            get { return _parentauditid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ContactInfo
        {
            set { _contactinfo = value; }
            get { return _contactinfo; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string DeptName_e
        {
            set { _deptname_e = value; }
            get { return _deptname_e; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? IsChild
        {
            set { _ischild = value; }
            get { return _ischild; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string AuditName
        {
            set { _auditname = value; }
            get { return _auditname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? AuditID
        {
            set { _auditid = value; }
            get { return _auditid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ManagerID
        {
            set { _managerid = value; }
            get { return _managerid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IsFiliale
        {
            set { _isfiliale = value; }
            get { return _isfiliale; }
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
        public string DelFlag
        {
            set { _delflag = value; }
            get { return _delflag; }
        }
        #endregion Model

    }
}

