using System;
namespace SfSoft.Model
{
    /// <summary>
    /// 实体类Pub_BaseData_Classc 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class Pub_BaseData_Classc
    {
        public Pub_BaseData_Classc()
        { }
        #region Model
        private int _id;
        private string _classid;
        private string _parentcid;
        private string _classname;
        private string _classtype;
        private int _isstystem;
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
        public string ClassID
        {
            set { _classid = value; }
            get { return _classid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ParentCID
        {
            set { _parentcid = value; }
            get { return _parentcid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ClassName
        {
            set { _classname = value; }
            get { return _classname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string ClassType
        {
            set { _classtype = value; }
            get { return _classtype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IsSystem
        {
            set { _isstystem = value; }
            get { return _isstystem; }
        }
        #endregion Model

    }
}

